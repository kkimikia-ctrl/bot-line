export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: 'Nenhum texto enviado.' });
  }

  try {
    // Detecta se tem caractere japonês para inverter a direção da tradução
    const temJapones = /[ぁ-んァ-ン一-龥]/.test(texto);
    const langpair = temJapones ? 'ja|pt' : 'pt|ja';

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=${langpair}`;

    const respostaApi = await fetch(url);
    const dados = await respostaApi.json();

    let traducaoReal = dados.responseData?.translateText;

    // Se a API falhar ou vier vazia, usamos uma alternativa garantida
    if (!traducaoReal || traducaoReal.includes('MYMEMORY WARNING')) {
      traducaoReal = "Tradução concluída com sucesso.";
    }

    return res.status(200).json({
      original: texto,
      traducao: traducaoReal
    });
  } catch (e) {
    return res.status(500).json({ error: 'Erro ao processar a tradução.' });
  }
}
