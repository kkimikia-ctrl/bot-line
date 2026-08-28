export default async function handler(req, res) {
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

    const texto = body?.texto;

    if (!texto) {
      return res.status(400).json({ error: 'Nenhum texto enviado.' });
    }

    const termoLimpo = texto.trim();
    const temJapones = /[ぁ-んァ-ン一-龥]/.test(termoLimpo);
    const langpair = temJapones ? 'ja|pt' : 'pt|ja';

    // Usando a API livre do MyMemory otimizada para servidores
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(termoLimpo)}&langpair=${langpair}`;
    
    const respostaExterna = await fetch(apiUrl);
    const dados = await respostaExterna.json();

    if (dados && dados.responseData && dados.responseData.translatedText) {
      return res.status(200).json({ traducao: dados.responseData.translatedText });
    } else {
      return res.status(200).json({ traducao: "Não foi possível traduzir." });
    }

  } catch (e) {
    return res.status(200).json({ traducao: "Erro ao processar a tradução." });
  }
}
