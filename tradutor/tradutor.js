/* =========================================================
   AJUDA JP
   TRADUTOR RÁPIDO
   PORTUGUÊS ↔ JAPONÊS + ROMAJI
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const textarea =
            document.getElementById(
                "textoInput"
            );

        const resultado =
            document.getElementById(
                "resultadoBox"
            );

        const botao =
            document.getElementById(
                "btnTraduzirTexto"
            );

        if (
            !textarea ||
            !resultado ||
            !botao
        ) {

            console.warn(
                "Tradutor rápido: elementos não encontrados."
            );

            return;

        }

        botao.addEventListener(
            "click",
            traduzirTexto
        );

        /* =====================================================
           TRADUZIR
        ===================================================== */

        async function traduzirTexto() {

            const texto =
                textarea.value.trim();

            if (
                !texto
            ) {

                resultado.style.display =
                    "block";

                resultado.classList.add(
                    "erro"
                );

                resultado.textContent =
                    "Digite uma frase para traduzir.";

                return;

            }

            resultado.style.display =
                "block";

            resultado.classList.remove(
                "erro"
            );

            resultado.textContent =
                "Traduzindo...";

            botao.disabled =
                true;

            botao.textContent =
                "Traduzindo...";

            try {

                const temJapones =
                    /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(
                        texto
                    );

                const origem =
                    temJapones
                        ? "ja"
                        : "pt";

                const destino =
                    temJapones
                        ? "pt"
                        : "ja";

                /* =============================================
                   TRADUÇÃO PRINCIPAL
                   MESMO FORMATO QUE JÁ FUNCIONAVA
                ============================================= */

                const traducao =
                    await buscarTraducao(
                        texto,
                        origem,
                        destino
                    );

                if (
                    !traducao
                ) {

                    throw new Error(
                        "Tradução vazia"
                    );

                }

                resultado.classList.remove(
                    "erro"
                );

                /* =============================================
                   PORTUGUÊS → JAPONÊS
                ============================================= */

                if (
                    origem ===
                    "pt"
                ) {

                    const japones =
                        traducao;

                    resultado.innerHTML =
                        montarResultadoJapones(
                            japones,
                            ""
                        );

                    /* =========================================
                       TENTA PEGAR ROMAJI SEPARADAMENTE

                       SE DER ERRO,
                       NÃO QUEBRA A TRADUÇÃO
                    ========================================= */

                    try {

                        const romaji =
                            await buscarRomaji(
                                japones
                            );

                        if (
                            romaji
                        ) {

                            resultado.innerHTML =
                                montarResultadoJapones(
                                    japones,
                                    romaji
                                );

                        }

                    } catch (
                        erroRomaji
                    ) {

                        console.warn(
                            "Romaji indisponível:",
                            erroRomaji
                        );

                    }

                }

                /* =============================================
                   JAPONÊS → PORTUGUÊS
                ============================================= */

                else {

                    const japones =
                        texto;

                    resultado.innerHTML =
                        montarResultadoPortugues(
                            traducao,
                            japones,
                            ""
                        );

                    try {

                        const romaji =
                            await buscarRomaji(
                                japones
                            );

                        if (
                            romaji
                        ) {

                            resultado.innerHTML =
                                montarResultadoPortugues(
                                    traducao,
                                    japones,
                                    romaji
                                );

                        }

                    } catch (
                        erroRomaji
                    ) {

                        console.warn(
                            "Romaji indisponível:",
                            erroRomaji
                        );

                    }

                }

            } catch (
                erro
            ) {

                console.error(
                    "Erro tradução:",
                    erro
                );

                resultado.classList.add(
                    "erro"
                );

                resultado.textContent =
                    "Não foi possível traduzir agora. Tente novamente.";

            } finally {

                botao.disabled =
                    false;

                botao.textContent =
                    "Traduzir agora";

            }

        }

        /* =====================================================
           BUSCAR TRADUÇÃO
        ===================================================== */

        async function buscarTraducao(
            texto,
            origem,
            destino
        ) {

            const url =
                "https://translate.googleapis.com/translate_a/single" +
                "?client=gtx" +
                "&sl=" +
                origem +
                "&tl=" +
                destino +
                "&dt=t" +
                "&q=" +
                encodeURIComponent(
                    texto
                );

            const resposta =
                await fetch(
                    url,
                    {
                        method:
                            "GET",

                        cache:
                            "no-store"
                    }
                );

            if (
                !resposta.ok
            ) {

                throw new Error(
                    "HTTP " +
                    resposta.status
                );

            }

            const dados =
                await resposta.json();

            if (
                !Array.isArray(
                    dados
                ) ||
                !Array.isArray(
                    dados[0]
                )
            ) {

                throw new Error(
                    "Resposta inválida"
                );

            }

            let traducao =
                "";

            dados[0].forEach(
                parte => {

                    if (
                        Array.isArray(
                            parte
                        ) &&
                        typeof parte[0] ===
                        "string"
                    ) {

                        traducao +=
                            parte[0];

                    }

                }
            );

            return traducao.trim();

        }

        /* =====================================================
           BUSCAR ROMAJI

           CHAMADA SEPARADA PARA NÃO QUEBRAR
           A TRADUÇÃO PRINCIPAL
        ===================================================== */

        async function buscarRomaji(
            japones
        ) {

            if (
                !japones
            ) {

                return "";

            }

            const url =
                "https://translate.googleapis.com/translate_a/single" +
                "?client=gtx" +
                "&sl=ja" +
                "&tl=en" +
                "&dt=t" +
                "&dt=rm" +
                "&q=" +
                encodeURIComponent(
                    japones
                );

            const resposta =
                await fetch(
                    url,
                    {
                        method:
                            "GET",

                        cache:
                            "no-store"
                    }
                );

            if (
                !resposta.ok
            ) {

                return "";

            }

            const dados =
                await resposta.json();

            return extrairRomaji(
                dados,
                japones
            );

        }

        /* =====================================================
           EXTRAIR ROMAJI
        ===================================================== */

        function extrairRomaji(
            dados,
            japones
        ) {

            if (
                !Array.isArray(
                    dados
                )
            ) {

                return "";

            }

            let candidatos =
                [];

            /* =============================================
               PRIMEIRO:
               PROCURA NAS PARTES DA RESPOSTA
            ============================================= */

            if (
                Array.isArray(
                    dados[0]
                )
            ) {

                dados[0].forEach(
                    parte => {

                        if (
                            !Array.isArray(
                                parte
                            )
                        ) {

                            return;

                        }

                        for (
                            let i = 1;
                            i < parte.length;
                            i++
                        ) {

                            if (
                                typeof parte[i] ===
                                "string"
                            ) {

                                candidatos.push(
                                    parte[i]
                                );

                            }

                        }

                    }
                );

            }

            /* =============================================
               DEPOIS:
               PROCURA NO RESTO DA RESPOSTA
            ============================================= */

            procurarStrings(
                dados,
                candidatos
            );

            candidatos =
                candidatos
                    .map(
                        valor =>
                            String(
                                valor
                            ).trim()
                    )
                    .filter(
                        valor =>
                            valor.length >
                            1
                    );

            /* =============================================
               REMOVE O PRÓPRIO JAPONÊS
            ============================================= */

            candidatos =
                candidatos.filter(
                    valor =>
                        valor !==
                        japones
                );

            /* =============================================
               QUEREMOS TEXTO LATINO
            ============================================= */

            candidatos =
                candidatos.filter(
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
                );

            /* =============================================
               REMOVE COISAS CURTAS OU CÓDIGOS
            ============================================= */

            candidatos =
                candidatos.filter(
                    valor => {

                        if (
                            valor ===
                            "ja" ||
                            valor ===
                            "en" ||
                            valor ===
                            "pt"
                        ) {

                            return false;

                        }

                        return (
                            valor.length >
                            2
                        );

                    }
                );

            if (
                candidatos.length ===
                0
            ) {

                return "";

            }

            /* =============================================
               PREFERE O CANDIDATO MAIS PARECIDO
               COM UMA FRASE ROMANIZADA
            ============================================= */

            candidatos.sort(
                (
                    a,
                    b
                ) => {

                    const scoreA =
                        pontuarRomaji(
                            a
                        );

                    const scoreB =
                        pontuarRomaji(
                            b
                        );

                    if (
                        scoreA !==
                        scoreB
                    ) {

                        return (
                            scoreB -
                            scoreA
                        );

                    }

                    return (
                        b.length -
                        a.length
                    );

                }
            );

            const melhor =
                candidatos[0];

            if (
                !melhor
            ) {

                return "";

            }

            return limparRomaji(
                melhor
            );

        }

        /* =====================================================
           PROCURAR STRINGS
        ===================================================== */

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
                typeof valor ===
                "string"
            ) {

                lista.push(
                    valor
                );

            }

        }

        /* =====================================================
           PONTUAR CANDIDATO
        ===================================================== */

        function pontuarRomaji(
            texto
        ) {

            let score =
                0;

            if (
                /[A-Za-z]/.test(
                    texto
                )
            ) {

                score +=
                    5;

            }

            if (
                /\s/.test(
                    texto
                )
            ) {

                score +=
                    4;

            }

            if (
                texto.length >
                10
            ) {

                score +=
                    3;

            }

            if (
                /^[A-Za-zÀ-ÿ0-9\s.,!?'"()\-āīūēōĀĪŪĒŌ]+$/.test(
                    texto
                )
            ) {

                score +=
                    5;

            }

            return score;

        }

        /* =====================================================
           LIMPAR ROMAJI
        ===================================================== */

        function limparRomaji(
            texto
        ) {

            let romaji =
                String(
                    texto
                )
                    .replace(
                        /\s+/g,
                        " "
                    )
                    .trim();

            if (
                romaji
            ) {

                romaji =
                    romaji.charAt(
                        0
                    ).toUpperCase() +
                    romaji.slice(
                        1
                    );

            }

            return romaji;

        }

        /* =====================================================
           RESULTADO PT → JP
        ===================================================== */

        function montarResultadoJapones(
            japones,
            romaji
        ) {

            let html =
                "";

            html +=
                '<div style="' +
                'font-size:12px;' +
                'font-weight:800;' +
                'color:#047857;' +
                'margin-bottom:4px;' +
                '">' +
                '日本語' +
                '</div>';

            html +=
                '<div style="' +
                'font-size:18px;' +
                'font-weight:700;' +
                'line-height:1.6;' +
                'color:#065f46;' +
                '">' +
                escaparHtml(
                    japones
                ) +
                '</div>';

            if (
                romaji
            ) {

                html +=
                    '<div style="' +
                    'margin-top:11px;' +
                    'padding-top:10px;' +
                    'border-top:1px solid #a7f3d0;' +
                    '">';

                html +=
                    '<div style="' +
                    'font-size:12px;' +
                    'font-weight:800;' +
                    'color:#047857;' +
                    'margin-bottom:4px;' +
                    '">' +
                    'Romaji' +
                    '</div>';

                html +=
                    '<div style="' +
                    'font-size:14px;' +
                    'line-height:1.55;' +
                    'color:#356859;' +
                    'font-style:italic;' +
                    '">' +
                    escaparHtml(
                        romaji
                    ) +
                    '</div>';

                html +=
                    '</div>';

            }

            return html;

        }

        /* =====================================================
           RESULTADO JP → PT
        ===================================================== */

        function montarResultadoPortugues(
            portugues,
            japones,
            romaji
        ) {

            let html =
                "";

            html +=
                '<div style="' +
                'font-size:12px;' +
                'font-weight:800;' +
                'color:#047857;' +
                'margin-bottom:4px;' +
                '">' +
                'Português' +
                '</div>';

            html +=
                '<div style="' +
                'font-size:18px;' +
                'font-weight:700;' +
                'line-height:1.55;' +
                'color:#065f46;' +
                '">' +
                escaparHtml(
                    portugues
                ) +
                '</div>';

            html +=
                '<div style="' +
                'margin-top:11px;' +
                'padding-top:10px;' +
                'border-top:1px solid #a7f3d0;' +
                '">';

            html +=
                '<div style="' +
                'font-size:12px;' +
                'font-weight:800;' +
                'color:#047857;' +
                'margin-bottom:4px;' +
                '">' +
                '日本語' +
                '</div>';

            html +=
                '<div style="' +
                'font-size:15px;' +
                'line-height:1.6;' +
                'color:#356859;' +
                '">' +
                escaparHtml(
                    japones
                ) +
                '</div>';

            if (
                romaji
            ) {

                html +=
                    '<div style="' +
                    'font-size:12px;' +
                    'font-weight:800;' +
                    'color:#047857;' +
                    'margin-top:9px;' +
                    'margin-bottom:4px;' +
                    '">' +
                    'Romaji' +
                    '</div>';

                html +=
                    '<div style="' +
                    'font-size:14px;' +
                    'line-height:1.55;' +
                    'color:#356859;' +
                    'font-style:italic;' +
                    '">' +
                    escaparHtml(
                        romaji
                    ) +
                    '</div>';

            }

            html +=
                '</div>';

            return html;

        }

        /* =====================================================
           ESCAPAR HTML
        ===================================================== */

        function escaparHtml(
            texto
        ) {

            return String(
                texto
            )
                .replace(
                    /&/g,
                    "&amp;"
                )
                .replace(
                    /</g,
                    "&lt;"
                )
                .replace(
                    />/g,
                    "&gt;"
                )
                .replace(
                    /"/g,
                    "&quot;"
                )
                .replace(
                    /'/g,
                    "&#039;"
                );

        }

    }
);
