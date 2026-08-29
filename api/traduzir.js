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
    const sl = temJapones ? 'ja' : 'pt';
    const tl = temJapones ? 'pt' : 'ja';

    const urlTraducao = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(termoLimpo)}`;

    const respTrad = await fetch(urlTraducao, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!respTrad.ok) {
      return res.status(200).json({ traducao: "Erro ao acessar o Google.", translatedText: "Erro ao acessar o Google." });
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
      return res.status(200).json({ traducao: "Não foi possível traduzir.", translatedText: "Não foi possível traduzir." });
    }

    let resultadoFinal = traducaoPrincipal;

    // Se traduziu do português para o japonês, busca o Romaji do Google
    if (!temJapones) {
      try {
        const urlRomaji = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ja&tl=en&dt=rm&q=${encodeURIComponent(traducaoPrincipal)}`;
        const respRomaji = await fetch(urlRomaji, {
          headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const dadosRomaji = await respRomaji.json();

        let romaji = "";
        if (dadosRomaji && dadosRomaji[0]) {
          for (let i = 0; i < dadosRomaji[0].length; i++) {
            if (dadosRomaji[0][i][3]) {
              romaji += (romaji ? " " : "") + dadosRomaji[0][i][3];
            }
          }
        }

        if (romaji && romaji.toLowerCase() !== traducaoPrincipal.toLowerCase()) {
          resultadoFinal = `${traducaoPrincipal} (${romaji})`;
        }
      } catch (err) {
        // Se falhar o romaji, mantém apenas a tradução limpa
      }
    }

    return res.status(200).json({ 
      traducao: resultadoFinal, 
      translatedTest: resultadoFinal,
      translatedText: resultadoFinal 
    });

  } catch (e) {
    return res.status(200).json({ traducao: "Erro interno no tradutor.", translatedText: "Erro interno no tradutor." });
  }
}
