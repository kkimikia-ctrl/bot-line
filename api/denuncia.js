const line = require('@line/bot-sdk');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');

    return res.status(405).json({
      error: 'Método não permitido'
    });
  }

  try {
    /* =====================================================
       VARIÁVEIS DE AMBIENTE
    ===================================================== */

    const channelAccessToken =
      process.env.LINE_ACCESS_TOKEN;

    const channelSecret =
      process.env.LINE_CHANNEL_SECRET;

    const adminUserId =
      process.env.LINE_ADMIN_USER_ID;

    if (
      !channelAccessToken ||
      !channelSecret ||
      !adminUserId
    ) {
      console.error(
        'Variáveis do LINE não configuradas corretamente.'
      );

      return res.status(500).json({
        error: 'Erro de configuração do servidor.'
      });
    }

    /* =====================================================
       CLIENTE LINE
    ===================================================== */

    const client = new line.Client({
      channelAccessToken,
      channelSecret
    });

    /* =====================================================
       BODY
    ===================================================== */

    let body = req.body || {};

    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          error: 'JSON inválido.'
        });
      }
    }

    /* =====================================================
       FUNÇÃO DE LIMPEZA
    ===================================================== */

    function limparTexto(valor, limite = 300) {
      if (typeof valor !== 'string') {
        return '';
      }

      return valor
        .trim()
        .replace(/\0/g, '')
        .slice(0, limite);
    }

    /* =====================================================
       DADOS DA DENÚNCIA
    ===================================================== */

    const userId =
      limparTexto(
        body.userId ||
        body.user_id ||
        body.uid,
        100
      );

    let userName =
      limparTexto(
        body.userName ||
        body.user_name ||
        body.nome,
        100
      );

    const liveTitle =
      limparTexto(
        body.liveTitle ||
        body.title ||
        body.titulo,
        150
      ) || 'Live não informada';

    const creator =
      limparTexto(
        body.creator ||
        body.author ||
        body.criador,
        150
      ) || 'Criador não informado';

    const motivo =
      limparTexto(
        body.motivo ||
        body.reason,
        150
      ) || 'Outro';

    const detalhes =
      limparTexto(
        body.detalhes ||
        body.details ||
        body.message,
        1000
      ) || 'Sem detalhes adicionais';

    /* =====================================================
       TENTA OBTER NOME PELO LINE
    ===================================================== */

    if (
      (!userName ||
        userName === 'Usuário Anônimo') &&
      userId &&
      /^U[a-zA-Z0-9]+$/.test(userId)
    ) {
      try {
        const profile =
          await client.getProfile(userId);

        if (profile?.displayName) {
          userName =
            limparTexto(
              profile.displayName,
              100
            );
        }

      } catch (profileError) {
        console.warn(
          'Não foi possível obter perfil do LINE:',
          profileError?.message
        );
      }
    }

    if (!userName) {
      userName = 'Usuário do Ajuda JP';
    }

    /* =====================================================
       TEXTO PARA ADMINISTRADOR
    ===================================================== */

    const mensagemAdmin =
      `🛡️ NOVA DENÚNCIA — AJUDA JP\n\n` +
      `👤 Quem denunciou: ${userName}\n` +
      `📌 Live: ${liveTitle}\n` +
      `🎬 Criador: ${creator}\n` +
      `⚠️ Motivo: ${motivo}\n` +
      `📝 Detalhes: ${detalhes}`;

    /* =====================================================
       ENVIA SOMENTE AO ADMINISTRADOR
    ===================================================== */

    await client.pushMessage(
      adminUserId,
      {
        type: 'text',
        text: mensagemAdmin
      }
    );

    /* =====================================================
       RESPOSTA PARA O APP
    ===================================================== */

    return res.status(200).json({
      success: true,
      message:
        'Denúncia recebida. Agradecemos o contato e iremos analisar o caso.'
    });

  } catch (error) {
    console.error(
      'Erro ao processar denúncia:',
      error
    );

    return res.status(500).json({
      error:
        'Não foi possível enviar a denúncia.'
    });
  }
};
