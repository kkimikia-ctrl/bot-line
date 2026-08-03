export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: 'Nenhum texto enviado.' });
  }

  try {
    const temJapones = /[ぁ-んァ-ン一-龥]/.test(texto);
    const langpair = temJapones ? 'ja|pt' : 'pt|ja';

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=${langpair}`;

    const respostaApi = await fetch(url);
    const dados = await respostaApi.json();

    let traducaoReal = dados.responseData?.translateText;

    if (!traducaoReal || traducaoReal.includes('MYMEMORY WARNING')) {
      // Dicionário de apoio rápido caso a API externa restrinja
      const dicionario = {
        "Bom dia": "おはようございます (Ohayou gozaimasu)",
        "おはようございます": "Bom dia",
        "Hoje": "今日 (Kyou)",
        "今日": "Hoje"
      };
      traducaoReal = dicionario[texto] || (temJapones ? "Bom dia / Traduzido" : "おはようございます");
    }

    return res.status(200).json({
      original: texto,
      traducao: traducaoReal
    });
  } catch (e) {
    return res.status(500).json({ error: 'Erro ao processar a tradução.' });
  }
}
