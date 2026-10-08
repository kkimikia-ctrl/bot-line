/* =========================================================
   AJUDA JP
   TRADUTOR RÁPIDO PT ↔ JP + ROMAJI
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
                "Tradutor: elementos da tela não encontrados."
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

                const url =
                    "https://translate.googleapis.com/translate_a/single" +
                    "?client=gtx" +
                    "&sl=" +
                    origem +
                    "&tl=" +
                    destino +
                    "&dt=t" +
                    "&dt=rm" +
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

                traducao =
                    traducao.trim();

                if (
                    !traducao
                ) {

                    throw new Error(
                        "Tradução vazia"
                    );

                }

                let japones =
                    "";

                let romaji =
                    "";

                if (
                    origem ===
                    "pt"
                ) {

                    japones =
                        traducao;

                    romaji =
                        extrairRomanizacao(
                            dados
                        );

                } else {

                    japones =
                        texto;

                    romaji =
                        extrairRomanizacao(
                            dados
                        );

                }

                resultado.classList.remove(
                    "erro"
                );

                if (
                    origem ===
                    "pt"
                ) {

                    resultado.innerHTML =
                        criarResultadoPortuguesParaJapones(
                            traducao,
                            romaji
                        );

                } else {

                    resultado.innerHTML =
                        criarResultadoJaponesParaPortugues(
                            traducao,
                            japones,
                            romaji
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

        function extrairRomanizacao(
            dados
        ) {

            let candidatos =
                [];

            procurarStringsRomanizacao(
                dados,
                candidatos
            );

            candidatos =
                candidatos
                    .map(
                        texto =>
                            String(
                                texto
                            ).trim()
                    )
                    .filter(
                        texto =>
                            texto &&
                            /[a-zA-Z]/.test(
                                texto
                            )
                    );

            if (
                candidatos.length ===
                0
            ) {

                return "";

            }

            const ignorar = [

                "pt",
                "ja",
                "Portuguese",
                "Japanese"

            ];

            candidatos =
                candidatos.filter(
                    texto =>
                        !ignorar.includes(
                            texto
                        )
                );

            candidatos.sort(
                (
                    a,
                    b
                ) =>
                    b.length -
                    a.length
            );

            return (
                candidatos[0] ||
                ""
            );

        }

        function procurarStringsRomanizacao(
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

                        procurarStringsRomanizacao(
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

                const texto =
                    valor.trim();

                if (
                    texto.length >
                    1
                ) {

                    lista.push(
                        texto
                    );

                }

            }

        }

        function criarResultadoPortuguesParaJapones(
            traducao,
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
                'font-size:17px;' +
                'font-weight:700;' +
                'line-height:1.6;' +
                'color:#065f46;' +
                '">' +
                escaparHtml(
                    traducao
                ) +
                '</div>';

            if (
                romaji
            ) {

                html +=
                    '<div style="' +
                    'margin-top:10px;' +
                    'padding-top:9px;' +
                    'border-top:1px solid #a7f3d0;' +
                    '">';

                html +=
                    '<div style="' +
                    'font-size:12px;' +
                    'font-weight:800;' +
                    'color:#047857;' +
                    'margin-bottom:3px;' +
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

        function criarResultadoJaponesParaPortugues(
            traducao,
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
                'font-size:17px;' +
                'font-weight:700;' +
                'line-height:1.55;' +
                'color:#065f46;' +
                '">' +
                escaparHtml(
                    traducao
                ) +
                '</div>';

            html +=
                '<div style="' +
                'margin-top:10px;' +
                'padding-top:9px;' +
                'border-top:1px solid #a7f3d0;' +
                '">';

            html +=
                '<div style="' +
                'font-size:12px;' +
                'font-weight:800;' +
                'color:#047857;' +
                'margin-bottom:3px;' +
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
                    'margin-top:8px;' +
                    'margin-bottom:3px;' +
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
