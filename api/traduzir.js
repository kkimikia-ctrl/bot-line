export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método não permitido'
    });
  }

  try {
    let body = req.body;

    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const texto = body?.q || body?.texto;

    if (!texto) {
      return res.status(400).json({
        error: 'Nenhum texto enviado.'
      });
    }

    const termo = texto.trim();

    const temJapones = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(termo);

    const sl = temJapones ? 'ja' : 'pt';
    const tl = temJapones ? 'pt' : 'ja';

    const urlTraducao =
      `https://translate.googleapis.com/translate_a/single` +
      `?client=gtx` +
      `&sl=${sl}` +
      `&tl=${tl}` +
      `&dt=t` +
      `&q=${encodeURIComponent(termo)}`;

    const respostaGoogle = await fetch(urlTraducao);

    const textoGoogle = await respostaGoogle.text();

    if (!respostaGoogle.ok) {
      return res.status(200).json({
        error: `Google respondeu HTTP ${respostaGoogle.status}`,
        detalhe: textoGoogle.substring(0, 500)
      });
    }

    let dados;

    try {
      dados = JSON.parse(textoGoogle);
    } catch {
      return res.status(200).json({
        error: 'Google não retornou JSON válido.',
        detalhe: textoGoogle.substring(0, 500)
      });
    }

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
        error: 'Google não retornou uma tradução.',
        detalhe: JSON.stringify(dados).substring(0, 500)
      });
    }

    return res.status(200).json({
      traducao: traducao,
      translatedText: traducao
    });

  } catch (erro) {
    console.error('Erro no tradutor:', erro);

    return res.status(500).json({
      error: 'Erro interno no tradutor.',
      detalhe: erro?.message || String(erro)
    });
  }
}
