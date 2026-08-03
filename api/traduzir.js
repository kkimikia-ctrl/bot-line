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
    const temJapones = /[ぁ-んァ-ン一-龥]/.test(termoLimpo);
    const sl = temJapones ? 'ja' : 'pt';
    const tl = temJapones ? 'pt' : 'ja';

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&dt=rm&q=${encodeURIComponent(termoLimpo)}`;

    const respostaApi = await fetch(url);
    const dados = await respostaApi.json();

    if (dados && dados[0]) {
      let traducaoPrincipal = "";
      let romajiCompleto = "";

      // Junta todas as partes da frase traduzida e do romaji
      for (let i = 0; i < dados[0].length; i++) {
        if (dados[0][i][0]) {
          traducaoPrincipal += dados[0][i][0];
        }
        if (dados[0][i][3]) {
          romajiCompleto += (romajiCompleto ? " " : "") + dados[0][i][3];
        }
      }

      let resultadoFinal = traducaoPrincipal;

      // Se traduziu para japonês e encontrou o romaji, adiciona entre parênteses
      if (!temJapones && romajiCompleto && romajiCompleto.toLowerCase() !== traducaoPrincipal.toLowerCase()) {
        resultadoFinal = `${traducaoPrincipal} (${romajiCompleto})`;
      }

      return res.status(200).json({ traducao: resultadoFinal });
    }

    return res.status(200).json({ traducao: "Não foi possível traduzir." });

  } catch (e) {
    return res.status(200).json({ traducao: "Erro ao processar a tradução." });
  }
}
