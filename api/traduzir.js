export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: 'Nenhum texto enviado.' });
  }

  const termoLimpo = texto.trim();

  try {
    // Detecta se tem caracteres japoneses para inverter a direção da tradução
    const temJapones = /[ぁ-んァ-ン一-龥]/.test(termoLimpo);
    const sl = temJapones ? 'ja' : 'pt';
    const tl = temJapones ? 'pt' : 'ja';

    // Rota pública de tradução direta e estável
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(termoLimpo)}`;

    const respostaApi = await fetch(url);
    const dados = await respostaApi.json();

    // Extrai o texto traduzido do retorno do tradutor
    if (dados && dados[0] && dados[0][0] && dados[0][0][0]) {
      const traducaoFinal = dados[0][0][0];
      return res.status(200).json({ traducao: traducaoFinal });
    }

    return res.status(200).json({ traducao: "Não foi possível traduzir este termo." });

  } catch (e) {
    return res.status(200).json({ traducao: "Erro ao processar a tradução." });
  }
}
