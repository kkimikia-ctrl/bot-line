const https = require('https');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'ok', message: 'Webhook ativo e pronto!' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const events = body && body.events;

  if (!events || !Array.isArray(events)) {
    return res.status(200).json({ status: 'ok' });
  }

  for (const event of events) {
    if (event.type === 'message' && event.message.type === 'text') {
      const userMessage = event.message.text.trim();
      const lowerMsg = userMessage.toLowerCase();
      const replyToken = event.replyToken;

      if (lowerMsg.includes('tradutor')) {
        await replyText(replyToken, "Modo Tradutor ativado! Envie o texto para traduzirmos.");
      } else {
        await replyText(replyToken, `Mensagem recebida: "${userMessage}"`);
      }
    }
  }

  return res.status(200).json({ status: 'success' });
};

async function replyText(replyToken, textMessage) {
  const token = process.env.LINE_ACCESS_TOKEN;
  const payload = JSON.stringify({
    replyToken: replyToken,
    messages: [{ type: "text", text: textMessage }]
  });

  const options = {
    hostname: 'api.line.me',
    path: '/v2/bot/message/reply',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', error => reject(error));
    req.write(payload);
    req.end();
  });
}
