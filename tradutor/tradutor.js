/* =========================================================
   AJUDA JP
   TRADUTOR RÁPIDO
   FRONT-END
   USA /api/traduzir
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

            console.error(
                "Tradutor rápido: elementos não encontrados."
            );

            return;

        }

        botao.addEventListener(
            "click",
            traduzirTexto
        );

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

                const resposta =
                    await fetch(
                        "/api/traduzir",
                        {
                            method:
                                "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    {
                                        texto:
                                            texto
                                    }
                                )
                        }
                    );

                let dados =
                    null;

                try {

                    dados =
                        await resposta.json();

                } catch (
                    erroJson
                ) {

                    console.error(
                        "Resposta JSON inválida:",
                        erroJson
                    );

                }

                if (
                    !resposta.ok
                ) {

                    throw new Error(
                        dados?.erro ||
                        dados?.error ||
                        "Erro HTTP " +
                        resposta.status
                    );

                }

                if (
                    !dados ||
                    dados.ok !== true
                ) {

                    throw new Error(
                        dados?.erro ||
                        dados?.error ||
                        "Resposta inválida"
                    );

                }

                resultado.classList.remove(
                    "erro"
                );

                if (
                    dados.origem ===
                    "pt"
                ) {

                    resultado.innerHTML =
                        montarResultadoPortuguesParaJapones(
                            dados.japones ||
                            dados.traducao ||
                            "",
                            dados.romaji ||
                            ""
                        );

                } else {

                    resultado.innerHTML =
                        montarResultadoJaponesParaPortugues(
                            dados.traducao ||
                            "",
                            dados.japones ||
                            texto,
                            dados.romaji ||
                            ""
                        );

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

        function montarResultadoPortuguesParaJapones(
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

        function montarResultadoJaponesParaPortugues(
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
