export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    const texto = body?.texto || body?.q;

    if (!texto) {
      return res.status(400).json({ error: 'Nenhum texto enviado.' });
    }

    const termoLimpo = texto.trim();
    const temJapones = /[ぁ-んァ-ン一-龥]/.test(termoLimpo);
    const source = temJapones ? 'ja' : 'pt';
    const target = temJapones ? 'pt' : 'ja';

    // Usando uma API pública alternativa (LibreTranslate / instância livre)
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: termoLimpo,
        source: source,
        target: target,
        format: "text"
      }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();

    if (data && data.translatedText) {
      return res.status(200).json({ 
        traducao: data.translatedText, 
        translatedText: data.translatedText 
      });
    } else {
      return res.status(200).json({ traducao: "Erro ao traduzir.", translatedText: "Erro ao traduzir." });
    }

  } catch (e) {
    return res.status(200).json({ traducao: "Erro interno ao traduzir.", translatedText: "Erro interno ao traduzir." });
  }
}
