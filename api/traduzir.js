export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: 'Nenhum texto enviado.' });
  }

  const termoLimpo = texto.trim();

  // Dicionário rápido e infalível para termos comuns (PT-JP e JP-PT)
  const dicionarioGarantido = {
    "calor": "暑い (Atsui)",
    "frio": "寒い (Samui)",
    "hoje": "今日 (Kyou)",
    "amanhã": "明日 (Ashita)",
    "ontem": "昨日 (Kinou)",
    "bom dia": "おはようございます (Ohayou gozaimasu)",
    "boa tarde": "こんにちは (Konnichiwa)",
    "boa noite": "こんばんは (Konbanwa)",
    "obrigado": "ありがとうございます (Arigatou gozaimasu)",
    "sim": "はい (Hai)",
    "não": "いいえ (Iie)",
    "ajuda": "助けて / ヘルプ (Tasukete / Herupu)",
    // Japonês para Português
    "今日": "Hoje",
    "明日": "Amanhã",
    "昨日": "Ontem",
    "暑い": "Calor / Quente",
    "寒い": "Frio",
    "おはようございます": "Bom dia",
    "こんにちは": "Boa tarde / Olá",
    "こんばんは": "Boa noite",
    "ありがとうございます": "Obrigado"
  };

  // Verifica se a palavra exata está no dicionário (ignorando maiúsculas/minúsculas)
  const termoLower = termoLimpo.toLowerCase();
  if (dicionarioGarantido[termoLower]) {
    return res.status(200).json({
      original: texto,
      traducao: dicionarioGarantido[termoLower]
    });
  }

  try {
    const temJapones = /[ぁ-んァ-ン一-龥]/.test(termoLimpo);
    const langpair = temJapones ? 'ja|pt' : 'pt|ja';

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(termoLimpo)}&langpair=${langpair}`;

    const respostaApi = await fetch(url);
    const dados = await respostaApi.json();

    let traducaoReal = dados.responseData?.translateText;

    if (!traducaoReal || traducaoReal.includes('MYMEMORY WARNING') || traducaoReal.includes('QUERY LENGTH')) {
      traducaoReal = temJapones ? "Tradução não encontrada no momento." : "翻訳できませんでした";
    }

    return res.status(200).json({
      original: texto,
      traducao: traducaoReal
    });
  } catch (e) {
    return res.status(500).json({ error: 'Erro ao processar a tradução.' });
  }
}
