export default async function handler(req, res) {

  /* =========================================================
     HEADERS
  ========================================================= */

  res.setHeader(
    'Access-Control-Allow-Origin',
    '*'
  );

  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, OPTIONS'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type'
  );

  res.setHeader(
    'Cache-Control',
    'no-store'
  );

  /* =========================================================
     OPTIONS
  ========================================================= */

  if (req.method === 'OPTIONS') {

    return res
      .status(204)
      .end();

  }

  /* =========================================================
     SOMENTE POST
  ========================================================= */

  if (req.method !== 'POST') {

    return res
      .status(405)
      .json({
        ok: false,
        error: 'Método não permitido',
        erro: 'Método não permitido'
      });

  }

  try {

    /* =======================================================
       BODY
    ======================================================= */

    let body = req.body;

    if (typeof body === 'string') {

      try {

        body = JSON.parse(body);

      } catch {

        return res
          .status(400)
          .json({
            ok: false,
            error: 'JSON inválido.',
            erro: 'JSON inválido.'
          });

      }

    }

    const texto =
      body?.q ||
      body?.texto;

    if (
      typeof texto !== 'string' ||
      !texto.trim()
    ) {

      return res
        .status(400)
        .json({
          ok: false,
          error: 'Nenhum texto enviado.',
          erro: 'Nenhum texto enviado.'
        });

    }

    const termo =
      texto.trim();

    if (
      termo.length > 5000
    ) {

      return res
        .status(413)
        .json({
          ok: false,
          error: 'Texto muito grande.',
          erro: 'Texto muito grande.'
        });

    }

    /* =======================================================
       DETECTAR IDIOMA
    ======================================================= */

    const temJapones =
      /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(
        termo
      );

    const sl =
      temJapones
        ? 'ja'
        : 'pt';

    const tl =
      temJapones
        ? 'pt'
        : 'ja';

    /* =======================================================
       TRADUÇÃO PRINCIPAL
    ======================================================= */

    const urlTraducao =
      'https://translate.googleapis.com/translate_a/single' +
      '?client=gtx' +
      `&sl=${sl}` +
      `&tl=${tl}` +
      '&dt=t' +
      `&q=${encodeURIComponent(termo)}`;

    const respostaGoogle =
      await fetch(
        urlTraducao,
        {
          method: 'GET'
        }
      );

    const textoGoogle =
      await respostaGoogle.text();

    if (
      !respostaGoogle.ok
    ) {

      console.error(
        'Erro Google Translate:',
        respostaGoogle.status,
        textoGoogle.substring(
          0,
          300
        )
      );

      return res
        .status(502)
        .json({
          ok: false,
          error: 'Falha ao consultar o serviço de tradução.',
          erro: 'Falha ao consultar o serviço de tradução.'
        });

    }

    let dados;

    try {

      dados =
        JSON.parse(
          textoGoogle
        );

    } catch {

      return res
        .status(502)
        .json({
          ok: false,
          error: 'Resposta inválida do serviço de tradução.',
          erro: 'Resposta inválida do serviço de tradução.'
        });

    }

    let traducao =
      '';

    if (
      Array.isArray(
        dados?.[0]
      )
    ) {

      for (
        const parte of dados[0]
      ) {

        if (
          Array.isArray(parte) &&
          typeof parte[0] === 'string'
        ) {

          traducao +=
            parte[0];

        }

      }

    }

    traducao =
      traducao.trim();

    if (
      !traducao
    ) {

      return res
        .status(502)
        .json({
          ok: false,
          error: 'O serviço não retornou uma tradução.',
          erro: 'O serviço não retornou uma tradução.'
        });

    }

    /* =======================================================
       TEXTO JAPONÊS
    ======================================================= */

    const japones =
      sl === 'ja'
        ? termo
        : traducao;

    /* =======================================================
       ROMAJI
       SE DER ERRO, NÃO QUEBRA A TRADUÇÃO
    ======================================================= */

    let romaji =
      '';

    try {

      romaji =
        await buscarRomaji(
          japones
        );

    } catch (erroRomaji) {

      console.error(
        'Erro ao buscar romaji:',
        erroRomaji
      );

      romaji =
        '';

    }

    /* =======================================================
       RESPOSTA
       MANTÉM COMPATIBILIDADE COM O CÓDIGO ANTIGO
    ======================================================= */

    return res
      .status(200)
      .json({

        ok:
          true,

        traducao:
          traducao,

        translatedText:
          traducao,

        origem:
          sl,

        destino:
          tl,

        japones:
          japones,

        romaji:
          romaji

      });

  } catch (erro) {

    console.error(
      'Erro no tradutor:',
      erro
    );

    return res
      .status(500)
      .json({
        ok: false,
        error: 'Erro interno no tradutor.',
        erro: 'Erro interno no tradutor.'
      });

  }

}


/* =========================================================
   BUSCAR ROMAJI
========================================================= */

async function buscarRomaji(
  japones
) {

  if (
    typeof japones !== 'string' ||
    !japones.trim()
  ) {

    return '';

  }

  const termo =
    japones.trim();

  const urlRomaji =
    'https://translate.googleapis.com/translate_a/single' +
    '?client=gtx' +
    '&sl=ja' +
    '&tl=ja' +
    '&dt=t' +
    '&dt=rm' +
    `&q=${encodeURIComponent(termo)}`;

  const resposta =
    await fetch(
      urlRomaji,
      {
        method: 'GET'
      }
    );

  if (
    !resposta.ok
  ) {

    return '';

  }

  const textoResposta =
    await resposta.text();

  let dados;

  try {

    dados =
      JSON.parse(
        textoResposta
      );

  } catch {

    return '';

  }

  return extrairRomaji(
    dados,
    termo
  );

}


/* =========================================================
   EXTRAIR ROMAJI
========================================================= */

function extrairRomaji(
  dados,
  japones
) {

  const candidatos =
    [];

  procurarStrings(
    dados,
    candidatos
  );

  const filtrados =
    candidatos
      .map(
        valor =>
          String(valor).trim()
      )
      .filter(
        valor =>
          valor.length > 2
      )
      .filter(
        valor =>
          valor !== japones
      )
      .filter(
        valor => {

          const temLatino =
            /[A-Za-z]/.test(
              valor
            );

          const temJapones =
            /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(
              valor
            );

          return (
            temLatino &&
            !temJapones
          );

        }
      )
      .filter(
        valor => {

          const minusculo =
            valor.toLowerCase();

          return ![
            'ja',
            'pt',
            'en',
            'japanese',
            'portuguese'
          ].includes(
            minusculo
          );

        }
      );

  if (
    filtrados.length === 0
  ) {

    return '';

  }

  filtrados.sort(
    (
      a,
      b
    ) => {

      const pontosA =
        pontuarRomaji(a);

      const pontosB =
        pontuarRomaji(b);

      if (
        pontosA !== pontosB
      ) {

        return (
          pontosB -
          pontosA
        );

      }

      return (
        b.length -
        a.length
      );

    }
  );

  return limparRomaji(
    filtrados[0]
  );

}


/* =========================================================
   PROCURAR STRINGS
========================================================= */

function procurarStrings(
  valor,
  lista
) {

  if (
    Array.isArray(
      valor
    )
  ) {

    valor.forEach(
      item => {

        procurarStrings(
          item,
          lista
        );

      }
    );

    return;

  }

  if (
    valor &&
    typeof valor === 'object'
  ) {

    Object.values(
      valor
    ).forEach(
      item => {

        procurarStrings(
          item,
          lista
        );

      }
    );

    return;

  }

  if (
    typeof valor === 'string'
  ) {

    lista.push(
      valor
    );

  }

}


/* =========================================================
   PONTUAR POSSÍVEL ROMAJI
========================================================= */

function pontuarRomaji(
  texto
) {

  let pontos =
    0;

  if (
    /[A-Za-z]/.test(
      texto
    )
  ) {

    pontos +=
      5;

  }

  if (
    /\s/.test(
      texto
    )
  ) {

    pontos +=
      4;

  }

  if (
    texto.length > 6
  ) {

    pontos +=
      2;

  }

  if (
    texto.length > 12
  ) {

    pontos +=
      2;

  }

  if (
    /^[A-Za-zÀ-ÿ0-9\s.,!?'"()\-āīūēōĀĪŪĒŌ]+$/.test(
      texto
    )
  ) {

    pontos +=
      5;

  }

  return pontos;

}


/* =========================================================
   LIMPAR ROMAJI
========================================================= */

function limparRomaji(
  texto
) {

  let resultado =
    String(
      texto
    )
      .replace(
        /\s+/g,
        ' '
      )
      .trim();

  if (
    !resultado
  ) {

    return '';

  }

  resultado =
    resultado.charAt(0).toUpperCase() +
    resultado.slice(1);

  return resultado;

}
