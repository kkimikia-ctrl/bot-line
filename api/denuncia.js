const line = require('@line/bot-sdk');

// Configuração do cliente do LINE com as variáveis de ambiente
const client = new line.Client({
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
});

// Exportação direta padrão para Serverless Function na Vercel
module.exports = async (req, res) => {
  // Garante que a requisição é POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const body = req.body || {};
    
    // Captura os dados do corpo ou define valores padrão para não ficar N/A
    const userId = body.userId || body.user_id || body.uid;
    const liveTitle = body.liveTitle || body.title || 'Truques de Mágica';
    const creator = body.creator || body.author || 'Mágico Hiro';
    const motivo = body.motivo || body.reason || 'Outro';
    const detalhes = body.detalhes || body.details || body.message || 'Denúncia realizada pelo app';

    const adminUserId = process.env.LINE_ADMIN_USER_ID;

    if (!adminUserId) {
      console.error('LINE_ADMIN_USER_ID não configurado.');
      return res.status(500).json({ error: 'Erro de configuração do administrador.' });
    }

    // Formata o UserID para exibição e cria um link clicável válido (se o ID existir)
    let userIdDisplay = 'Não informado';
    if (userId && typeof userId === 'string' && userId.startsWith('U')) {
      // O LINE permite links em Markdown. O link abaixo direciona para o perfil/chat do usuário ou serve de atalho.
      userIdDisplay = `[${userId}](https://line.me/R/oaMessage/@bot/?${userId})`;
    }

    // 1. Envia o alerta para o Administrador com o ID clicável
    await client.pushMessage(adminUserId, [
      {
        type: 'text',
        text: `🚨 NOVA DENÚNCIA 🚨\n\n📌 Live: ${liveTitle}\n👤 Criador: ${creator}\n⚠️ Motivo: ${motivo}\n📝 Detalhes: ${detalhes}\n🆔 UserID: ${userIdDisplay}`
      }
    ]);

    // 2. Responde automaticamente para o usuário se o ID for válido
    if (userId && typeof userId === 'string' && userId.startsWith('U')) {
      try {
        await client.pushMessage(userId, [
          {
            type: 'text',
            text: 'Recebemos a sua denúncia. Agradecemos o contato, iremos analisar o caso em breve!'
          }
        ]);
      } catch (userError) {
        console.warn('Não foi possível enviar mensagem para o usuário:', userError.message);
      }
    }

    return res.status(200).json({ success: true, message: 'Denúncia processada com sucesso!' });
  } catch (error) {
    console.error('Erro ao processar denúncia:', error);
    return res.status(500).json({ error: 'Erro ao enviar denúncia para o servidor.' });
  }
};
