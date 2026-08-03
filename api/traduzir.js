export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: 'Nenhum texto enviado.' });
  }

  const termoLimpo = texto.trim();
  const temJapones = /[ぁ-んァ-ン一-龥]/.test(termoLimpo);
  const source = temJapones ? 'ja' : 'pt';
  const target = temJapones ? 'pt' : 'ja';

  try {
    // Usando a API pública do LibreTranslate (altamente estável)
    const respostaApi = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      body: JSON.stringify({
        q: termoLimpo,
        source: source,
        target: target,
        format: 'text'
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    const dados = await respostaApi.json();

    if (dados && dados.translatedText) {
      return res.status(200).json({
        original: texto,
        traducao: dados.translatedText
      });
    }

    // Fallback caso a API falhe
    return res.status(200).json({
      original: texto,
      traducao: temJapones ? "Não foi possível traduzir." : "翻訳できませんでした"
    });

  } catch (e) {
    return res.status(500).json({ error: 'Erro ao processar a tradução.' });
  }
}
