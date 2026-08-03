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

    // 1. Traduz o texto normalmente
    const urlTraducao = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(termoLimpo)}`;
    const respTrad = await fetch(urlTraducao);
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

    // Se o usuário digitou em japonês e quer ver em português, retorna só a tradução
    if (temJapones) {
      return res.status(200).json({ traducao: traducaoPrincipal });
    }

    // 2. Se o usuário digitou em português, buscamos especificamente o Romaji da frase traduzida
    let romaji = "";
    try {
      const urlRomaji = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ja&tl=en&dt=rm&q=${encodeURIComponent(traducaoPrincipal)}`;
      const respRomaji = await fetch(urlRomaji);
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

    // Monta o resultado final: Japonês + Romaji entre parênteses
    let resultadoFinal = traducaoPrincipal;
    if (romaji && romaji.toLowerCase() !== traducaoPrincipal.toLowerCase()) {
      resultadoFinal = `${traducaoPrincipal} (${romaji})`;
    }

    return res.status(200).json({ traducao: resultadoFinal });

  } catch (e) {
    return res.status(200).json({ traducao: "Erro ao processar a tradução." });
  }
}
