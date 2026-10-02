export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método não permitido'
    });
  }

  try {
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

    const texto = body?.q || body?.texto;

    if (typeof texto !== 'string' || !texto.trim()) {
      return res.status(400).json({
        error: 'Nenhum texto enviado.'
      });
    }

    const termo = texto.trim();

    if (termo.length > 5000) {
      return res.status(413).json({
        error: 'Texto muito grande.'
      });
    }

    const temJapones =
      /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(termo);

    const sl = temJapones ? 'ja' : 'pt';
    const tl = temJapones ? 'pt' : 'ja';

    const urlTraducao =
      'https://translate.googleapis.com/translate_a/single' +
      '?client=gtx' +
      `&sl=${sl}` +
      `&tl=${tl}` +
      '&dt=t' +
      `&q=${encodeURIComponent(termo)}`;

    const respostaGoogle = await fetch(urlTraducao);

    const textoGoogle = await respostaGoogle.text();

    if (!respostaGoogle.ok) {
      console.error(
        'Erro Google Translate:',
        respostaGoogle.status,
        textoGoogle.substring(0, 300)
      );

      return res.status(502).json({
        error: 'Falha ao consultar o serviço de tradução.'
      });
    }

    let dados;

    try {
      dados = JSON.parse(textoGoogle);
    } catch {
      return res.status(502).json({
        error: 'Resposta inválida do serviço de tradução.'
      });
    }

    let traducao = '';

    if (Array.isArray(dados?.[0])) {
      for (const parte of dados[0]) {
        if (parte?.[0]) {
          traducao += parte[0];
        }
      }
    }

    if (!traducao) {
      return res.status(502).json({
        error: 'O serviço não retornou uma tradução.'
      });
    }

    return res.status(200).json({
      traducao,
      translatedText: traducao,
      origem: sl,
      destino: tl
    });

  } catch (erro) {
    console.error('Erro no tradutor:', erro);

    return res.status(500).json({
      error: 'Erro interno no tradutor.'
    });
  }
}
