const line = require('@line/bot-sdk');

const client = new line.Client({
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
});

/*
  IMPORTANTE:
  Desliga o body parser automático para conseguirmos
  pegar o corpo ORIGINAL enviado pelo LINE.
*/
module.exports.config = {
  api: {
    bodyParser: false
  }
};

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on('data', chunk => {
      chunks.push(
        Buffer.isBuffer(chunk)
          ? chunk
          : Buffer.from(chunk)
      );
    });

    req.on('end', () => {
      resolve(Buffer.concat(chunks));
    });

    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método não permitido'
    });
  }

  try {
    const channelSecret =
      process.env.LINE_CHANNEL_SECRET;

    const channelAccessToken =
      process.env.LINE_ACCESS_TOKEN;

    if (!channelSecret || !channelAccessToken) {
      console.error(
        'Variáveis do LINE não configuradas.'
      );

      return res.status(500).json({
        error: 'Erro de configuração do servidor.'
      });
    }

    const signature =
      req.headers['x-line-signature'];

    if (!signature) {
      console.warn(
        'Webhook recebido sem assinatura.'
      );

      return res.status(401).json({
        error: 'Assinatura ausente.'
      });
    }

    /*
      Pega exatamente os bytes enviados pelo LINE.
    */
    const rawBodyBuffer = await getRawBody(req);

    const rawBody =
      rawBodyBuffer.toString('utf8');

    /*
      Valida a assinatura ANTES de fazer JSON.parse().
    */
    const assinaturaValida =
      line.validateSignature(
        rawBody,
        channelSecret,
        signature
      );

    if (!assinaturaValida) {
      console.warn(
        'Assinatura LINE inválida.'
      );

      return res.status(401).json({
        error: 'Assinatura inválida.'
      });
    }

    let body;

    try {
      body = JSON.parse(rawBody);
    } catch (error) {
      console.error(
        'Erro ao converter JSON:',
        error
      );

      return res.status(400).json({
        error: 'JSON inválido.'
      });
    }

    const events =
      Array.isArray(body.events)
        ? body.events
        : [];

    /*
      O botão Verify do LINE normalmente envia
      events: []

      Nesse caso precisamos responder 200.
    */
    if (events.length === 0) {
      console.log(
        'Verificação do webhook recebida com sucesso.'
      );

      return res.status(200).json({
        status: 'ok'
      });
    }

    for (const event of events) {
      if (
        event?.type !== 'message' ||
        event?.message?.type !== 'text'
      ) {
        continue;
      }

      const userMessage =
        String(
          event.message.text || ''
        ).trim();

      if (!userMessage) {
        continue;
      }

      const replyToken =
        event.replyToken;

      if (!replyToken) {
        continue;
      }

      const lowerMsg =
        userMessage.toLowerCase();

      let resposta;

      if (
        lowerMsg.includes('tradutor')
      ) {
        resposta =
          'Modo Tradutor ativado! Envie o texto para traduzirmos.';
      } else {
        resposta =
          `Mensagem recebida: "${userMessage}"`;
      }

      try {
        await client.replyMessage(
          replyToken,
          {
            type: 'text',
            text: resposta
          }
        );
      } catch (replyError) {
        console.error(
          'Erro ao responder mensagem do LINE:',
          replyError
        );
      }
    }

    return res.status(200).json({
      status: 'success'
    });

  } catch (error) {
    console.error(
      'Erro no webhook:',
      error
    );

    return res.status(500).json({
      error: 'Erro interno no webhook.'
    });
  }
};
