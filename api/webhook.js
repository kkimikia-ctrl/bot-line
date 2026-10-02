const line = require('@line/bot-sdk');

const client = new line.Client({
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método não permitido'
    });
  }

  try {
    const channelSecret = process.env.LINE_CHANNEL_SECRET;
    const channelAccessToken = process.env.LINE_ACCESS_TOKEN;

    if (!channelSecret || !channelAccessToken) {
      console.error('Variáveis do LINE não configuradas.');

      return res.status(500).json({
        error: 'Erro de configuração do servidor.'
      });
    }

    const signature =
      req.headers['x-line-signature'] ||
      req.headers['X-Line-Signature'];

    if (!signature) {
      console.warn('Webhook recebido sem assinatura.');

      return res.status(401).json({
        error: 'Assinatura ausente.'
      });
    }

    /*
      IMPORTANTE:
      A assinatura do LINE precisa ser validada usando
      exatamente o corpo original recebido.

      Em algumas execuções da Vercel, req.body pode já vir
      como string; em outras, pode vir como objeto.
    */

    let rawBody;

    if (typeof req.body === 'string') {
      rawBody = req.body;
    } else if (Buffer.isBuffer(req.body)) {
      rawBody = req.body.toString('utf8');
    } else {
      /*
        Fallback para o projeto atual.
        Se a Vercel tiver alterado o corpo antes daqui,
        a validação pode falhar.
      */
      rawBody = JSON.stringify(req.body || {});
    }

    const assinaturaValida = line.validateSignature(
      rawBody,
      channelSecret,
      signature
    );

    if (!assinaturaValida) {
      console.warn('Assinatura LINE inválida.');

      return res.status(401).json({
        error: 'Assinatura inválida.'
      });
    }

    let body;

    if (typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
      body = req.body;
    } else {
      try {
        body = JSON.parse(rawBody);
      } catch {
        return res.status(400).json({
          error: 'JSON inválido.'
        });
      }
    }

    const events = Array.isArray(body?.events)
      ? body.events
      : [];

    /*
      O LINE pode enviar:
      {
        "events": []
      }

      durante o teste do webhook.
      Nesse caso precisamos devolver HTTP 200.
    */

    if (events.length === 0) {
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

      const userMessage = String(
        event.message.text || ''
      ).trim();

      if (!userMessage) {
        continue;
      }

      const replyToken = event.replyToken;

      if (!replyToken) {
        continue;
      }

      const lowerMsg = userMessage.toLowerCase();

      let resposta;

      if (lowerMsg.includes('tradutor')) {
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
    console.error('Erro no webhook:', error);

    return res.status(500).json({
      error: 'Erro interno no webhook.'
    });
  }
};
