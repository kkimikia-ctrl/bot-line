// Exemplo da lógica no backend (Node.js / Vercel)
const line = require('@line/bot-sdk');

// Suas credenciais já configuradas nas variáveis de ambiente
const client = new line.Client({
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
});

// Função que processa a denúncia vinda do app
async function handleDenuncia(req, res) {
  const { userId, liveTitle, creator, motivo, detalhes } = req.body;
  const adminUserId = process.env.LINE_ADMIN_USER_ID;

  try {
    // 1. Envia o alerta detalhado para o Administrador (você)
    await client.pushMessage(adminUserId, [
      {
        type: 'text',
        text: `🚨 NOVA DENÚNCIA 🚨\n\n📌 Live: ${liveTitle}\n👤 Criador: ${creator}\n⚠️ Motivo: ${motivo}\n📝 Detalhes: ${detalhes}\n🆔 UserID: ${userId}`
      }
    ]);

    // 2. Responde automaticamente para o usuário que fez a denúncia
    if (userId) {
      await client.pushMessage(userId, [
        {
          type: 'text',
          text: 'Recebemos a sua denúncia. Agradecemos o contato, iremos analisar o caso em breve!'
        }
      ]);
    }

    return res.status(200).json({ success: true, message: 'Denúncia enviada e usuário notificado!' });
  } catch (error) {
    console.error('Erro ao processar denúncia:', error);
    return res.status(500).json({ error: 'Erro ao enviar denúncia' });
  }
}
