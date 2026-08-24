// Backend (Node.js / Vercel) - Módulo de Denúncias
const line = require('@line/bot-sdk');

// Configuração do cliente do LINE com as variáveis de ambiente
const client = new line.Client({
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
});

// Função que processa a denúncia vinda do app
async function handleDenuncia(req, res) {
  const { userId, liveTitle, creator, motivo, detalhes } = req.body;
  const adminUserId = process.env.LINE_ADMIN_USER_ID;

  try {
    // 1. Validação essencial das credenciais do admin
    if (!adminUserId) {
      console.error('LINE_ADMIN_USER_ID não está configurado nas variáveis de ambiente.');
      return res.status(500).json({ error: 'Erro de configuração do administrador.' });
    }

    // 2. Envia o alerta detalhado para o Administrador (você)
    await client.pushMessage(adminUserId, [
      {
        type: 'text',
        text: `🚨 NOVA DENÚNCIA 🚨\n\n📌 Live: ${liveTitle || 'N/A'}\n👤 Criador: ${creator || 'N/A'}\n⚠️ Motivo: ${motivo || 'N/A'}\n📝 Detalhes: ${detalhes || 'N/A'}\n🆔 UserID: ${userId || 'Não informado'}`
      }
    ]);

    // 3. Responde automaticamente para o usuário apenas se ele possuir um ID válido do LINE
    if (userId && typeof userId === 'string' && userId.startsWith('U')) {
      try {
        await client.pushMessage(userId, [
          {
            type: 'text',
            text: 'Recebemos a sua denúncia. Agradecemos o contato, iremos analisar o caso em breve!'
          }
        ]);
      } catch (userError) {
        // Apenas registra o aviso caso o usuário tenha bloqueado o bot ou o ID seja inválido
        console.warn('Não foi possível enviar mensagem de confirmação para o usuário:', userError.message);
      }
    }

    return res.status(200).json({ success: true, message: 'Denúncia enviada e processada com sucesso!' });
  } catch (error) {
    console.error('Erro ao processar denúncia:', error);
    return res.status(500).json({ error: 'Erro ao enviar denúncia para o servidor.' });
  }
}

module.exports = { handleDenuncia };
