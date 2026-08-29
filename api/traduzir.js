export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Só aceita POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método não permitido'
    });
  }

  try {
    // Pega o corpo enviado pelo HTML
    let body = req.body;

    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          error: 'JSON inválido.'
        });
      }
    }

    // Aceita "q" ou "texto"
    const texto = body?.q || body?.texto;

    if (!texto || typeof texto !== 'string') {
      return res.status(400).json({
        error: 'Nenhum texto enviado.'
      });
    }

    const termo = texto.trim();

    if (!termo) {
      return res.status(400).json({
        error: 'Nenhum texto enviado.'
      });
    }

    // Detecta japonês
    const temJapones = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(termo);

    const sl = temJapones ? 'ja' : 'pt';
    const tl = temJapones ? 'pt' : 'ja';

    // Google Translate
    const urlTraducao =
      `https://translate.googleapis.com/translate_a/single` +
      `?client=gtx` +
      `&sl=${sl}` +
      `&tl=${tl}` +
      `&dt=t` +
      `&q=${encodeURIComponent(termo)}`;

    const respostaGoogle = await fetch(urlTraducao, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!respostaGoogle.ok) {
      return res.status(502).json({
        error: 'Erro ao acessar o serviço de tradução.'
      });
    }

    const dados = await respostaGoogle.json();

    let traducao = '';

    if (dados?.[0]) {
      for (const parte of dados[0]) {
        if (parte?.[0]) {
          traducao += parte[0];
        }
      }
    }

    if (!traducao) {
      return res.status(200).json({
        translatedText: 'Não foi possível traduzir.',
        traducao: 'Não foi possível traduzir.'
      });
    }

    let resultadoFinal = traducao;

    // Português → Japonês: tenta adicionar Romaji
    if (!temJapones) {
      try {
        const urlRomaji =
          `https://translate.googleapis.com/translate_a/single` +
          `?client=gtx` +
          `&sl=ja` +
          `&tl=en` +
          `&dt=rm` +
          `&q=${encodeURIComponent(traducao)}`;

        const respostaRomaji = await fetch(urlRomaji, {
          headers: {
            'User-Agent': 'Mozilla/5.0'
          }
        });

        if (respostaRomaji.ok) {
          const dadosRomaji = await respostaRomaji.json();

          let romaji = '';

          if (dadosRomaji?.[0]) {
            for (const parte of dadosRomaji[0]) {
              if (parte?.[3]) {
                romaji += (romaji ? ' ' : '') + parte[3];
              }
            }
          }

          if (
            romaji &&
            romaji.toLowerCase() !== traducao.toLowerCase()
          ) {
            resultadoFinal = `${traducao} (${romaji})`;
          }
        }
      } catch {
        // Se o Romaji falhar, mantém a tradução japonesa.
      }
    }

    // Resposta para o HTML
    return res.status(200).json({
      traducao: resultadoFinal,
      translatedText: resultadoFinal
    });

  } catch (erro) {
    console.error('Erro no tradutor:', erro);

    return res.status(500).json({
      error: 'Erro interno no tradutor.',
      translatedText: 'Erro interno no tradutor.'
    });
  }
}
