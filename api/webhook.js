const crypto = require('crypto');
const https = require('https');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'ok', message: 'Endpoint ativo' });
  }

  const const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
const events = body && body.events;
  if (!events || !Array.isArray(events)) {
    return res.status(200).json({ status: 'ok' });
  }

  for (const event of events) {
    if (event.type === 'message' && event.message.type === 'text') {
      const userMessage = event.message.text.trim().toLowerCase();
      const replyToken = event.replyToken;

      // Responde quando o usuário mandar "tradutor" ou "ajuda"
      if (userMessage === 'tradutor' || userMessage === 'chamar tradutor' || userMessage === 'ajuda') {
        await sendQuestionnaire(replyToken);
      }
    }
  }

  return res.status(200).json({ status: 'success' });
};

async function sendQuestionnaire(replyToken) {
  const token = process.env.LINE_ACCESS_TOKEN;
  
  const payload = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "template",
        altText: "Chamada de Tradutor - Escolha o local",
        template: {
          type: "buttons",
          title: "AjudaJP - Tradutor",
          text: "Onde será o atendimento?",
          actions: [
            { type: "message", label: "Prefeitura", text: "Local: Prefeitura" },
            { type: "message", label: "Imigração", text: "Local: Imigração" },
            { type: "message", label: "Escola", text: "Local: Escola" },
            { type: "message", label: "Outros", text: "Local: Outros" }
          ]
        }
      }
    ]
  });

  const options = {
    hostname: 'api.line.me',
    path: '/v2/bot/message/reply',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  return new Promise((resolve) => {
    const lineReq = https.request(options, (lineRes) => {
      let data = '';
      lineRes.on('data', chunk => data += chunk);
      lineRes.on('end', () => resolve(data));
    });
    lineReq.on('error', () => resolve(null));
    lineReq.write(payload);
    lineReq.end();
  });
}
