const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new line.Client(config);

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 200, body: 'Bot is running!' };
  }

  try {
    const body = event.body;
    const data = JSON.parse(body);

    // Se o LINE mandar um evento de teste (com array de eventos vazio), responde 200 direto
    if (data.events && data.events.length === 0) {
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
    return { statusCode: 200, body: JSON.stringify({ error: err.toString() }) };
  }
};