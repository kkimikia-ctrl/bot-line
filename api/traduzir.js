export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: 'Nenhum texto enviado.' });
  }

  const termoLimpo = texto.trim();
  const termoLower = termoLimpo.toLowerCase();

  // Dicionário amplo e robusto para o dia a dia no Japão
  const dicionario = {
    // Português -> Japonês
    "carro": "車 (Kuruma)",
    "casa": "家 (Ie)",
    "trabalho": "仕事 (Shigoto)",
    "hospital": "病院 (Byouin)",
    "médico": "医者 (Isha)",
    "farmácia": "薬局 (Yakkyoku)",
    "remédio": "薬 (Kusuri)",
    "prefeitura": "役所 / 市役所 (Yakusho / Shiyakusho)",
    "polícia": "警察 (Keisatsu)",
    "emergência": "緊急 (Kinkyuu)",
    "ajuda": "助けて (Tasukete)",
    "calor": "暑い (Atsui)",
    "frio": "寒い (Samui)",
    "hoje": "今日 (Kyou)",
    "amanhã": "明日 (Ashita)",
    "ontem": "昨日 (Kinou)",
    "bom dia": "おはようございます (Ohayou gozaimasu)",
    "boa tarde": "こんにちは (Konnichiwa)",
    "boa noite": "こんばんは (Konbanwa)",
    "obrigado": "ありがとうございます (Arigatou gozaimasu)",
    "estou cansado demais": "とても疲れています (Totemo tsukarete imasu)",
    "estou cansado": "疲れています (Tsukarete imasu)",
    "não estou me sentindo bem": "気分が悪いです (Kibun ga warui desu)",
    "sim": "はい (Hai)",
    "não": "いいえ (Iie)",

    // Japonês -> Português
    "車": "Carro (Kuruma)",
    "家": "Casa (Ie)",
    "仕事": "Trabalho (Shigoto)",
    "病院": "Hospital (Byouin)",
    "医者": "Médico (Isha)",
    "薬局": "Farmácia (Yakkyoku)",
    "薬": "Remédio (Kusuri)",
    "役所": "Prefeitura (Yakusho)",
    "市役所": "Prefeitura (Shiyakusho)",
    "警察": "Polícia (Keisatsu)",
    "今日": "Hoje",
    "明日": "Amanhã",
    "昨日": "Ontem",
    "暑い": "Calor / Quente",
    "寒い": "Frio",
    "疲れた": "Cansado",
    "疲れています": "Estou cansado",
    "おはようございます": "Bom dia",
    "こんにちは": "Boa tarde / Olá",
    "こんばんは": "Boa noite",
    "ありがとうございます": "Obrigado",
    "気分が悪いです": "Não estou me sentindo bem"
  };

  // Verifica se a palavra está cadastrada no dicionário
  if (dicionario[termoLower]) {
    return res.status(200).json({ traducao: dicionario[termoLower] });
  }
  if (dicionario[termoLimpo]) {
    return res.status(200).json({ traducao: dicionario[termoLimpo] });
  }

  // Se não estiver na lista, tenta a API externa com segurança
  try {
    const temJapones = /[ぁ-んァ-ン一-龥]/.test(termoLimpo);
    const langpair = temJapones ? 'ja|pt' : 'pt|ja';

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(termoLimpo)}&langpair=${langpair}`;
    const respostaApi = await fetch(url);
    const dados = await respostaApi.json();

    let traducaoReal = dados.responseData?.translateText;

    if (!traducaoReal || traducaoReal.includes('MYMEMORY WARNING') || traducaoReal.includes('QUERY LENGTH')) {
      return res.status(200).json({ 
        traducao: temJapones ? "Termo não cadastrado. Tente outra palavra." : "登録されていない言葉です (Termo não cadastrado)" 
      });
    }

    return res.status(200).json({ traducao: traducaoReal });
  } catch (e) {
    return res.status(200).json({ 
      traducao: "Serviço temporariamente ocupado. Tente novamente em instantes." 
    });
  }
}


    
