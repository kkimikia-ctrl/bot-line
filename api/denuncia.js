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
    
    // Captura os dados enviados pelo front-end
    const userId = body.userId || body.user_id || body.uid;
    let userName = body.userName;
    const liveTitle = body.liveTitle || body.title || 'Truques de Mágica';
    const creator = body.creator || body.author || 'Mágico Hiro';
    const motivo = body.motivo || body.reason || 'Outro';
    const detalhes = body.detalhes || body.details || body.message || 'Denúncia realizada pelo app';

    const adminUserId = process.env.LINE_ADMIN_USER_ID;

    if (!adminUserId) {
      console.error('LINE_ADMIN_USER_ID não configurado.');
      return res.status(500).json({ error: 'Erro de configuração do administrador.' });
    }

    // Se o front-end não mandou o nome, mas temos o userId, busca o perfil direto na API do LINE!
    if ((!userName || userName === 'Usuário Anônimo') && userId && userId.startsWith('U')) {
      try {
        const profile = await client.getProfile(userId);
        if (profile && profile.displayName) {
          userName = profile.displayName;
        }
      } catch (profileError) {
        console.warn('Não foi possível buscar o perfil do LINE:', profileError.message);
      }
    }

    // Se mesmo assim não achar, define um fallback limpo
    userName = userName || 'Usuário do App';

    // 1. Envia o alerta para o Administrador mostrando o NOME de quem denunciou
    await client.pushMessage(adminUserId, [
      {
        type: 'text',
        text: `🚨 NOVA DENÚNCIA 🚨\n\n👤 Quem denunciou: ${userName}\n📌 Live: ${liveTitle}\n🎬 Criador: ${creator}\n⚠️ Motivo: ${motivo}\n📝 Detalhes: ${detalhes}`
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
