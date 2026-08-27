// Arquivo: api/traduzir.js (para rodar na Vercel ou ambiente Node.js)
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ erro: 'Método não permitido' });
    }

    const { texto } = req.body;

    if (!texto || !texto.trim()) {
        return res.status(400).json({ erro: 'Texto não fornecido' });
    }

    try {
        const contemJapones = /[\u3040-\u30ff\u4e00-\u9faf]/.test(texto);
        const langPair = contemJapones ? 'ja|pt' : 'pt|ja';
        
        const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=${langPair}`;
        
        const respostaExterna = await fetch(apiUrl);
        const dados = await respostaExterna.json();

        if (dados && dados.responseData && dados.responseData.translatedText) {
            return res.status(200).json({ traducao: dados.responseData.translatedText });
        } else {
            return res.status(500).json({ erro: 'Não foi possível traduzir' });
        }
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno ao processar a tradução' });
    }
}
