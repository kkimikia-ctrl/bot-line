export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: 'Nenhum texto enviado.' });
  }

  const termoLimpo = texto.trim();

  try {
    const temJapones = /[ぁ-んァ-ン一-龥]/.test(termoLimpo);
    const sl = temJapones ? 'ja' : 'pt';
    const tl = temJapones ? 'pt' : 'ja';

    // Busca a tradução e também a romanização (parâmetro de transliteração do Google)
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&dt=rm&q=${encodeURIComponent(termoLimpo)}`;

    const respostaApi = await fetch(url);
    const dados = await respostaApi.json();

    if (dados && dados[0] && dados[0][0]) {
      let traducaoPrincipal = dados[0][0][0];
      let romaji = "";

      // Procura o Romaji na resposta estruturada do tradutor
      if (dados[0]) {
        for (let i = 0; i < dados[0].length; i++) {
          if (dados[0][i][3]) {
            romaji = dados[0][i][3];
            break;
          }
        }
      }

      // Se traduziu para o japonês e encontrou o Romaji, exibe ambos lado a lado
      let resultadoFinal = traducaoPrincipal;
      if (!temJapones && romaji && romaji !== traducaoPrincipal) {
        resultadoFinal = `${traducaoPrincipal} (${romaji})`;
      }

      return res.status(200).json({ traducao: resultadoFinal });
    }

    return res.status(200).json({ traducao: "Não foi possível traduzir este termo." });

  } catch (e) {
    return res.status(200).json({ traducao: "Erro ao processar a tradução." });
  }
}
