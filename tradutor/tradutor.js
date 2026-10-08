/* =========================================================
   AJUDA JP
   TRADUTOR RÁPIDO PT ↔ JP

   - Tradução via /api/traduzir
   - Estatísticas no Firebase
   - NÃO salva o texto traduzido
========================================================= */


/* =========================================================
   CONFIGURAÇÃO FIREBASE
========================================================= */

const firebaseConfigTradutor = {

    apiKey:
        "AIzaSyCTQTWEyj8f-Ddkj6PD9Fe8JHCVVjmkS_o",

    authDomain:
        "ajuda-jp.firebaseapp.com",

    projectId:
        "ajuda-jp",

    storageBucket:
        "ajuda-jp.firebasestorage.app",

    messagingSenderId:
        "40121072206",

    appId:
        "1:40121072206:web:8a844e632f004f61d0a11f"

};


/* =========================================================
   FIREBASE
========================================================= */

let firestoreTradutorPromise =
    null;


async function obterFirestoreTradutor() {

    if (
        firestoreTradutorPromise
    ) {

        return firestoreTradutorPromise;

    }


    firestoreTradutorPromise =
        (async function() {

            const firebaseApp =
                await import(
                    "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
                );

            const firebaseFirestore =
                await import(
                    "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"
                );


            let app;


            if (
                firebaseApp.getApps().length > 0
            ) {

                app =
                    firebaseApp.getApp();

            } else {

                app =
                    firebaseApp.initializeApp(
                        firebaseConfigTradutor
                    );

            }


            const db =
                firebaseFirestore.getFirestore(
                    app
                );


            return {

                db,

                collection:
                    firebaseFirestore.collection,

                addDoc:
                    firebaseFirestore.addDoc,

                serverTimestamp:
                    firebaseFirestore.serverTimestamp

            };

        })();


    return firestoreTradutorPromise;

}


/* =========================================================
   INÍCIO
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


        /* =================================================
           TRADUZIR
        ================================================= */

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


                /* =========================================
                   PORTUGUÊS → JAPONÊS
                ========================================= */

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

                }


                /* =========================================
                   JAPONÊS → PORTUGUÊS
                ========================================= */

                else {

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


                /* =========================================
                   REGISTRAR ESTATÍSTICA

                   Não esperamos terminar.
                   Assim não atrasa a tradução.
                ========================================= */

                registrarEstatisticaTradutor(
                    {

                        quantidadeCaracteres:
                            texto.length,

                        origem:
                            dados.origem ||
                            "",

                        destino:
                            dados.destino ||
                            "",

                        teveRomaji:
                            Boolean(
                                dados.romaji
                            )

                    }
                ).catch(
                    function(erro) {

                        console.warn(
                            "Não foi possível registrar estatística do tradutor:",
                            erro
                        );

                    }
                );


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

    }
);


/* =========================================================
   REGISTRAR ESTATÍSTICA
========================================================= */

async function registrarEstatisticaTradutor(
    dadosUso
) {

    try {

        const firebase =
            await obterFirestoreTradutor();


        const usuario =
            await obterIdentificadorUsuario();


        const agora =
            new Date();


        const ano =
            agora.getFullYear();


        const mesNumero =
            String(
                agora.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const diaNumero =
            String(
                agora.getDate()
            ).padStart(
                2,
                "0"
            );


        const data =
            `${ano}-${mesNumero}-${diaNumero}`;


        const mes =
            `${ano}-${mesNumero}`;


        await firebase.addDoc(

            firebase.collection(
                firebase.db,
                "tradutor_estatisticas"
            ),

            {

                usuarioId:
                    usuario.id,

                tipoUsuario:
                    usuario.tipo,

                caracteres:
                    Number(
                        dadosUso.quantidadeCaracteres ||
                        0
                    ),

                origem:
                    dadosUso.origem ||
                    "",

                destino:
                    dadosUso.destino ||
                    "",

                romaji:
                    Boolean(
                        dadosUso.teveRomaji
                    ),

                data:
                    data,

                mes:
                    mes,

                timestamp:
                    firebase.serverTimestamp()

            }

        );


        console.log(
            "Estatística do tradutor registrada."
        );


    } catch (
        erro
    ) {

        /*
           IMPORTANTE:

           Se o Firebase tiver algum problema,
           a tradução continua funcionando.

           Só a estatística deixa de ser registrada.
        */

        console.warn(
            "Erro ao salvar estatística:",
            erro
        );

    }

}


/* =========================================================
   IDENTIFICAR USUÁRIO
========================================================= */

async function obterIdentificadorUsuario() {

    /*
       Primeiro tenta pegar o usuário LINE
       que o Ajuda JP já salva.
    */

    let lineUserId =
        localStorage.getItem(
            "line_user_id"
        );


    if (
        !lineUserId
    ) {

        lineUserId =
            localStorage.getItem(
                "lineUserId"
            );

    }


    /*
       Se ainda não encontrou,
       tenta pegar diretamente do LIFF.
    */

    if (
        !lineUserId &&
        window.liff
    ) {

        try {

            if (
                window.liff.isLoggedIn &&
                window.liff.isLoggedIn()
            ) {

                const perfil =
                    await window.liff.getProfile();


                if (
                    perfil &&
                    perfil.userId
                ) {

                    lineUserId =
                        perfil.userId;


                    localStorage.setItem(
                        "line_user_id",
                        lineUserId
                    );

                }

            }

        } catch (
            erro
        ) {

            console.warn(
                "Não foi possível identificar usuário LINE.",
                erro
            );

        }

    }


    /*
       Se encontrou LINE ID,
       usamos um HASH.

       Assim o Firestore NÃO precisa
       guardar o LINE ID original.
    */

    if (
        lineUserId
    ) {

        const idProtegido =
            await criarHashUsuario(
                lineUserId
            );


        return {

            id:
                idProtegido,

            tipo:
                "line"

        };

    }


    /*
       Se não estiver dentro do LINE,
       cria um identificador anônimo.

       Ele fica salvo neste navegador.
    */

    let anonimo =
        localStorage.getItem(
            "ajudajp_tradutor_anonimo"
        );


    if (
        !anonimo
    ) {

        anonimo =
            criarIdAnonimo();


        localStorage.setItem(
            "ajudajp_tradutor_anonimo",
            anonimo
        );

    }


    return {

        id:
            anonimo,

        tipo:
            "anonimo"

    };

}


/* =========================================================
   CRIAR HASH DO LINE ID
========================================================= */

async function criarHashUsuario(
    valor
) {

    try {

        if (
            window.crypto &&
            window.crypto.subtle
        ) {

            const encoder =
                new TextEncoder();


            const dados =
                encoder.encode(
                    valor
                );


            const hashBuffer =
                await window.crypto.subtle.digest(
                    "SHA-256",
                    dados
                );


            const hashArray =
                Array.from(
                    new Uint8Array(
                        hashBuffer
                    )
                );


            const hashHex =
                hashArray
                    .map(
                        byte =>
                            byte
                                .toString(
                                    16
                                )
                                .padStart(
                                    2,
                                    "0"
                                )
                    )
                    .join(
                        ""
                    );


            return hashHex;

        }

    } catch (
        erro
    ) {

        console.warn(
            "Hash não disponível:",
            erro
        );

    }


    /*
       Fallback.
       Não usa o LINE ID original.
    */

    let fallback =
        localStorage.getItem(
            "ajudajp_tradutor_id"
        );


    if (
        !fallback
    ) {

        fallback =
            criarIdAnonimo();


        localStorage.setItem(
            "ajudajp_tradutor_id",
            fallback
        );

    }


    return fallback;

}


/* =========================================================
   CRIAR ID ANÔNIMO
========================================================= */

function criarIdAnonimo() {

    if (
        window.crypto &&
        window.crypto.randomUUID
    ) {

        return window.crypto.randomUUID();

    }


    return (

        "anon_" +

        Date.now() +

        "_" +

        Math.random()
            .toString(
                36
            )
            .substring(
                2,
                12
            )

    );

}


/* =========================================================
   RESULTADO
   PORTUGUÊS → JAPONÊS
========================================================= */

function montarResultadoPortuguesParaJapones(
    japones,
    romaji
) {

    let html =
        "";


    html +=
        '<div style="' +
        'font-size:11px;' +
        'font-weight:800;' +
        'color:#047857;' +
        'margin-bottom:3px;' +
        '">' +
        '日本語' +
        '</div>';


    html +=
        '<div style="' +
        'font-size:16px;' +
        'font-weight:700;' +
        'line-height:1.45;' +
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
            'margin-top:8px;' +
            'padding-top:7px;' +
            'border-top:1px solid #a7f3d0;' +
            '">';


        html +=
            '<div style="' +
            'font-size:11px;' +
            'font-weight:800;' +
            'color:#047857;' +
            'margin-bottom:3px;' +
            '">' +
            'Romaji' +
            '</div>';


        html +=
            '<div style="' +
            'font-size:13px;' +
            'line-height:1.4;' +
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


/* =========================================================
   RESULTADO
   JAPONÊS → PORTUGUÊS
========================================================= */

function montarResultadoJaponesParaPortugues(
    portugues,
    japones,
    romaji
) {

    let html =
        "";


    html +=
        '<div style="' +
        'font-size:11px;' +
        'font-weight:800;' +
        'color:#047857;' +
        'margin-bottom:3px;' +
        '">' +
        'Português' +
        '</div>';


    html +=
        '<div style="' +
        'font-size:16px;' +
        'font-weight:700;' +
        'line-height:1.45;' +
        'color:#065f46;' +
        '">' +

        escaparHtml(
            portugues
        ) +

        '</div>';


    html +=
        '<div style="' +
        'margin-top:8px;' +
        'padding-top:7px;' +
        'border-top:1px solid #a7f3d0;' +
        '">';


    html +=
        '<div style="' +
        'font-size:11px;' +
        'font-weight:800;' +
        'color:#047857;' +
        'margin-bottom:3px;' +
        '">' +
        '日本語' +
        '</div>';


    html +=
        '<div style="' +
        'font-size:14px;' +
        'line-height:1.45;' +
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
            'font-size:11px;' +
            'font-weight:800;' +
            'color:#047857;' +
            'margin-top:7px;' +
            'margin-bottom:3px;' +
            '">' +
            'Romaji' +
            '</div>';


        html +=
            '<div style="' +
            'font-size:13px;' +
            'line-height:1.4;' +
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


/* =========================================================
   ESCAPAR HTML
========================================================= */

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
