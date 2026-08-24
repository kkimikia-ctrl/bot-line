export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    try {
        const { motivo, detalhes, live, criador, data } = req.body;

        const mensagemTexto = `🚨 NOVA DENÚNCIA DE LIVE 🚨\n\n` +
            `📌 Live: ${live}\n` +
            `👤 Criador: ${criador}\n` +
            `⚠️ Motivo: ${motivo}\n` +
            `📝 Detalhes: ${detalhes}\n` +
            `🕒 Data: ${data}`;

        const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN || process.env.LINE_CHANNEL_ACCESS_TOKEN;
        const MEU_USER_ID_LINE = process.env.LINE_ADMIN_USER_ID; 

        if (!LINE_ACCESS_TOKEN || !MEU_USER_ID_LINE) {
            console.error('ERRO: Variáveis de ambiente do LINE não configuradas na Vercel.');
            return res.status(500).json({ error: 'Configuração do LINE ausente no servidor.' });
        }

        const response = await fetch('https://api.line.me/v2/bot/message/push', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                to: MEU_USER_ID_LINE,
                messages: [{ type: 'text', text: mensagemTexto }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('ERRO DETALHADO DO LINE:', JSON.stringify(errorData));
            return res.status(500).json({ error: 'Erro ao enviar para o LINE', detalhesLine: errorData });
        }

        return res.status(200).json({ success: true, message: 'Denúncia processada e enviada ao LINE com sucesso!' });
    } catch (error) {
        console.error('Erro interno:', error);
        return res.status(500).json({ error: 'Erro interno ao processar denúncia' });
    }
}
