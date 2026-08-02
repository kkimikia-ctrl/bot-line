const crypto = require('crypto');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'ok', message: 'Endpoint ativo para o LINE' });
  }

  const events = req.body.events;
  if (!events || !Array.isArray(events)) {
    return res.status(200).json({ status: 'ok' });
  }

  for (const event of events) {
    // Aqui é onde o bot identifica o que o usuário fez (mandou mensagem, clicou em botão, etc.)
    if (event.type === 'message' && event.message.type === 'text') {
      const userMessage = event.message.text.trim();
      const replyToken = event.replyToken;

      // Exemplo simples: Se o cliente mandar "tradutor" ou "ajuda", o bot inicia o fluxo
      if (userMessage.toLowerCase() === 'tradutor' || userMessage.toLowerCase() === 'chamar tradutor') {
        // Aqui vamos enviar as opções do questionário (Prefeitura, Escola, Imigração, etc.)
        await sendQuestionnaire(replyToken);
      }
    }
  }

  return res.status(200).json({ status: 'success' });
};

// Função para enviar o questionário (usaremos a API do LINE para responder)
async function sendQuestionnaire(replyToken) {
  // Vamos configurar as perguntas e botões interativos aqui
  console.log('Enviando questionário para o token:', replyToken);
}
