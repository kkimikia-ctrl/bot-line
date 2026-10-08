/* =========================================================
   AJUDA JP
   TRADUTOR RÁPIDO PT ↔ JP

   Esta versão mantém a mesma lógica
   que funcionava antes no index.html
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
                            parte[0]
                        ) {

                            traducao +=
                                parte[0];
                        }

                    }
                );

                if (
                    !traducao.trim()
                ) {

                    throw new Error(
                        "Tradução vazia"
                    );
                }

                resultado.classList.remove(
                    "erro"
                );

                resultado.textContent =
                    traducao;

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
            }

            finally {

                botao.disabled =
                    false;

                botao.textContent =
                    "Traduzir agora";
            }

        }

    }
);
