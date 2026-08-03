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

  // Dicionário com Romaji garantido para termos frequentes
  const dicionarioComRomaji = {
    "carro": "車 (Kuruma)",
    "casa": "家 (Ie)",
    "trabalho": "仕事 (Shigoto)",
    "hospital": "病院 (Byouin)",
    "médico": "医者 (Isha)",
    "cadeira": "椅子 (Isu)",
    "dormir": "寝る (Neru)",
    "falar": "話す (Hanasu)",
    "água": "水 (Mizu)",
    "comida": "食べ物 (Tabemono)",
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
    "não": "いいえ (Iie)"
  };

  if (dicionarioComRomaji[termoLower]) {
    return res.status(200).json({ traducao: dicionarioComRomaji[termoLower] });
  }

  try {
    const temJapones = /[ぁ-んァ-ン一-龥]/.test(termoLimpo);
    const sl = temJapones ? 'ja' : 'pt';
    const tl = temJapones ? 'pt' : 'ja';

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&dt=rm&q=${encodeURIComponent(termoLimpo)}`;

    const respostaApi = await fetch(url);
    const dados = await respostaApi.json();

    if (dados && dados[0] && dados[0][0]) {
      let traducaoPrincipal = dados[0][0][0];
      let romaji = "";

      if (dados[0]) {
        for (let i = 0; i < dados[0].length; i++) {
          if (dados[0][i][3]) {
            romaji = dados[0][i][3];
            break;
          }
        }
      }

      let resultadoFinal = traducaoPrincipal;
      if (!temJapones && romaji && romaji.toLowerCase() !== traducaoPrincipal.toLowerCase()) {
        resultadoFinal = `${traducaoPrincipal} (${romaji})`;
      }

      return res.status(200).json({ traducao: resultadoFinal });
    }

    return res.status(200).json({ traducao: "Não foi possível traduzir." });

  } catch (e) {
    return res.status(200).json({ traducao: "Erro ao processar a tradução." });
  }
}
