const line = require('@line/bot-sdk');

const {
  validateSignature
} = line;

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return Response.json(
        {
          status: 'ok',
          message: 'Webhook ativo e pronto!'
        },
        {
          status: 200
        }
      );
    }

    try {
      const channelSecret =
        process.env.LINE_CHANNEL_SECRET;

      const channelAccessToken =
        process.env.LINE_ACCESS_TOKEN;

      if (
        !channelSecret ||
        !channelAccessToken
      ) {
        console.error(
          'Variáveis do LINE não configuradas.'
        );

        return Response.json(
          {
            error:
              'Erro de configuração do servidor.'
          },
          {
            status: 500
          }
        );
      }

      /* ============================================
         CORPO BRUTO
      ============================================ */

      const rawBody =
        await request.text();

      /* ============================================
         ASSINATURA DO LINE
      ============================================ */

      const signature =
        request.headers.get(
          'x-line-signature'
        );

      if (!signature) {
        console.warn(
          'Webhook recebido sem assinatura.'
        );

        return Response.json(
          {
            error:
              'Assinatura ausente.'
          },
          {
            status: 401
          }
        );
      }

      const assinaturaValida =
        validateSignature(
          rawBody,
          channelSecret,
          signature
        );

      if (!assinaturaValida) {
        console.warn(
          'Assinatura LINE inválida.'
        );

        return Response.json(
          {
            error:
              'Assinatura inválida.'
          },
          {
            status: 401
          }
        );
      }

      /* ============================================
         JSON
      ============================================ */

      let body;

      try {
        body =
          JSON.parse(rawBody);
      } catch {
        return Response.json(
          {
            error:
              'JSON inválido.'
          },
          {
            status: 400
          }
        );
      }

      const events =
        Array.isArray(body?.events)
          ? body.events
          : [];

      /*
        A LINE envia events: []
        quando testa o webhook.

        Precisamos responder 200.
      */

      if (events.length === 0) {
        return Response.json(
          {
            status: 'ok'
          },
          {
            status: 200
          }
        );
      }

      /* ============================================
         CLIENTE LINE
      ============================================ */

      const client =
        new line.Client({
          channelAccessToken,
          channelSecret
        });

      /* ============================================
         EVENTOS
      ============================================ */

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

        const lowerMsg =
          userMessage.toLowerCase();

        let resposta;

        if (
          lowerMsg.includes(
            'tradutor'
          )
        ) {
          resposta =
            'Modo Tradutor ativado! Envie o texto para traduzirmos.';
        } else {
          resposta =
            `Mensagem recebida: "${userMessage}"`;
        }

        if (!event.replyToken) {
          continue;
        }

        try {
          await client.replyMessage(
            event.replyToken,
            {
              type: 'text',
              text: resposta
            }
          );
        } catch (replyError) {
          console.error(
            'Erro ao responder no LINE:',
            replyError
          );
        }
      }

      return Response.json(
        {
          status: 'success'
        },
        {
          status: 200
        }
      );

    } catch (error) {
      console.error(
        'Erro no webhook:',
        error
      );

      return Response.json(
        {
          error:
            'Erro interno no webhook.'
        },
        {
          status: 500
        }
      );
    }
  }
};
