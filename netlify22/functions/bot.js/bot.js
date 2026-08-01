const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'SEU_CHANNEL_ACCESS_TOKEN_AQUI',
  channelSecret: 'SEU_CHANNEL_SECRET_AQUI'
};

const client = new line.Client(config);

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 200, body: 'Bot is running!' };
  }

  try {
    const body = event.body;
    const data = JSON.parse(body);

    if (!data.events || data.events.length === 0) {
      return { statusCode: 200, body: JSON.stringify({ status: 'ok' }) };
    }

    const events = data.events;

    await Promise.all(events.map(async (webhookEvent) => {
      if (webhookEvent.type === 'message' && webhookEvent.message.type === 'text') {
        const echo = { type: 'text', text: 'Recebi: ' + webhookEvent.message.text };
        return client.replyMessage(webhookEvent.replyToken, echo);
      }
    }));

    return { statusCode: 200, body: JSON.stringify({ status: 'success' }) };
  } catch (err) {
    return { statusCode: 200, body: JSON.stringify({ status: 'ok' }) };
  }
};