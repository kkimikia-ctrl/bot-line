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
    const sl = temJapones ? 'ja' : 'pt';
    const tl = temJapones ? 'pt' : 'ja';

    // Rota oficial do Google Tradutor otimizada com cabeçalhos de navegador completo
    const urlTraducao = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(termoLimpo)}`;
    
    const respTrad = await fetch(urlTraducao, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
      }
    });

    if (!respTrad.ok) {
      return res.status(200).json({ traducao: "Erro ao acessar o Google Tradutor." });
    }

    const dadosTrad = await respTrad.json();

    let traducaoPrincipal = "";
    if (dadosTrad && dadosTrad[0]) {
      for (let i = 0; i < dadosTrad[0].length; i++) {
        if (dadosTrad[0][i][0]) {
          traducaoPrincipal += dadosTrad[0][i][0];
        }
      }
    }

    if (!traducaoPrincipal) {
      return res.status(200).json({ traducao: "Não foi possível traduzir." });
    }

    if (temJapones) {
      return res.status(200).json({ traducao: traducaoPrincipal });
    }

    // Busca o Romaji (pronúncia) oficial do Google
    let romaji = "";
    try {
      const urlRomaji = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ja&tl=en&dt=rm&q=${encodeURIComponent(traducaoPrincipal)}`;
      const respRomaji = await fetch(urlRomaji, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      const dadosRomaji = await respRomaji.json();

      if (dadosRomaji && dadosRomaji[0]) {
        for (let i = 0; i < dadosRomaji[0].length; i++) {
          if (dadosRomaji[0][i][3]) {
            romaji += (romaji ? " " : "") + dadosRomaji[0][i][3];
          }
        }
      }
    } catch (err) {
      // Ignora erro secundário de romaji se houver
    }

    let resultadoFinal = traducaoPrincipal;
    if (romaji && romaji.toLowerCase() !== traducaoPrincipal.toLowerCase()) {
      resultadoFinal = `${traducaoPrincipal} (${romaji})`;
    }

    return res.status(200).json({ traducao: resultadoFinal });

  } catch (e) {
    return res.status(200).json({ traducao: "Erro ao processar a tradução." });
  }
}
