export default async function handler(req, res) {
    // Permite apenas requisições POST
    if (req.method !== 'POST') {
        return res.status(405.4).json({ error: 'Método não permitido' });
    }

    try {
        const { motivo, detalhes, live, criador, data } = req.body;

        // Monta a mensagem que vai chegar no seu LINE
        const mensagemTexto = `🚨 NOVA DENÚNCIA DE LIVE 🚨\n\n` +
            `📌 Live: ${live}\n` +
            `👤 Criador: ${criador}\n` +
            `⚠️ Motivo: ${motivo}\n` +
            `📝 Detalhes: ${detalhes}\n` +
            `🕒 Data: ${data}`;

        // Se você já tiver o token do LINE configurado nas variáveis de ambiente da Vercel:
        const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
        const MEU_USER_ID_LINE = process.env.LINE_ADMIN_USER_ID; // Seu ID de usuário no LINE para receber o aviso

        if (LINE_CHANNEL_ACCESS_TOKEN && MEU_USER_ID_LINE) {
            await fetch('https://api.line.me/v2/bot/message/push', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`
                },
                body: JSON.stringify({
                    to: MEU_USER_ID_LINE,
                    messages: [{ type: 'text', text: mensagemTexto }]
                })
            });
        }

        return res.status(200).json({ success: true, message: 'Denúncia processada com sucesso!' });
    } catch (error) {
        console.error('Erro ao processar denúncia:', error);
        return res.status(500).json({ error: 'Erro interno ao processar denúncia' });
    }
}
