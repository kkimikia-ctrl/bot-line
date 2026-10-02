export default async function handler(req, res) {
    try {
        if (req.method !== "GET") {
            return res.status(405).json({
                error: "Método não permitido"
            });
        }

        const apiKey = process.env.METERED_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                error: "METERED_API_KEY não configurada"
            });
        }

        const url =
            "https://ajudajp.metered.live/api/v1/turn/credentials?apiKey=" +
            encodeURIComponent(apiKey);

        const response = await fetch(url);

        if (!response.ok) {
            const texto = await response.text();

            console.error(
                "Erro Metered:",
                response.status,
                texto
            );

            return res.status(response.status).json({
                error: "Erro ao buscar servidores TURN"
            });
        }

        const iceServers = await response.json();

        return res.status(200).json(iceServers);

    } catch (error) {
        console.error("Erro /api/turn:", error);

        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
}
