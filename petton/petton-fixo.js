/* =========================================================

   PETTON FIXO 🐾

   Tela visual fixa do Petton

   Usa o mesmo estado do petton.js

   ========================================================= */

(function () {

    "use strict";

    /* =====================================================

       CONFIGURAÇÕES

       ===================================================== */

    const INTERVALO = 1000;

    /* =====================================================

       GARANTIR CONTAINER

       ===================================================== */

    function criarContainer() {

        let container =

            document.getElementById("petton-fixo");

        if (container) {

            return container;

        }

        container = document.createElement("div");

        container.id = "petton-fixo";

        container.innerHTML = `

            <div id="petton-fixo-cabecalho">

                <div id="petton-fixo-identidade">

                    <span id="petton-fixo-nome">

                        Petton

                    </span>

                </div>

                <div id="petton-fixo-status">

                    <span id="petton-fixo-fase">

                        🥚 Ovo

                    </span>

                </div>

            </div>

            <div id="petton-fixo-cena">

                <div id="petton-fixo-casa">

                    🏠

                </div>

                <div id="petton-fixo-pet">

                    🥚

                </div>

                <div id="petton-fixo-coco">

                    💩

                </div>

                <div id="petton-fixo-carie">

                    🦷

                </div>

                <div id="petton-fixo-doente">

                    🤒

                </div>

                <div id="petton-fixo-escova">

                    🪥

                </div>

                <div id="petton-fixo-vassoura">

                    🧹

                </div>

                <div id="petton-fixo-hospital">

                    🏥

                </div>

            </div>

            <div id="petton-fixo-info">

                <div class="petton-fixo-barra">

                    <span>🍖</span>

                    <div>

                        <div class="petton-fixo-barra-fundo">

                            <div id="petton-fixo-fome"

                                 class="petton-fixo-barra-preenchimento">

                            </div>

                        </div>

                    </div>

                </div>

                <div class="petton-fixo-barra">

                    <span>❤️</span>

                    <div>

                        <div class="petton-fixo-barra-fundo">

                            <div id="petton-fixo-felicidade"

                                 class="petton-fixo-barra-preenchimento">

                            </div>

                        </div>

                    </div>

                </div>

                <div class="petton-fixo-barra">

                    <span>⚡</span>

                    <div>

                        <div class="petton-fixo-barra-fundo">

                            <div id="petton-fixo-energia"

                                 class="petton-fixo-barra-preenchimento">

                            </div>

                        </div>

                    </div>

                </div>

                <div class="petton-fixo-barra">

                    <span>🧼</span>

                    <div>

                        <div class="petton-fixo-barra-fundo">

                            <div id="petton-fixo-higiene"

                                 class="petton-fixo-barra-preenchimento">

                            </div>

                        </div>

                    </div>

                </div>

                <div class="petton-fixo-barra">

                    <span>💚</span>

                    <div>

                        <div class="petton-fixo-barra-fundo">

                            <div id="petton-fixo-saude"

                                 class="petton-fixo-barra-preenchimento">

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div id="petton-fixo-mensagem"></div>

        `;

        document.body.appendChild(container);

        return container;

    }

    /* =====================================================

       CSS

       ===================================================== */

    function adicionarCSS() {

        if (

            document.getElementById(

                "petton-fixo-estilo"

            )

        ) {

            return;

        }

        const style =

            document.createElement("style");

        style.id =

            "petton-fixo-estilo";

        style.textContent = `

            #petton-fixo {

                position: fixed;

                top: 0;

                left: 0;

                right: 0;

                width: 100%;

                z-index: 99999;

                background:

                    rgba(255,255,255,0.97);

                box-shadow:

                    0 2px 10px

                    rgba(0,0,0,0.15);

                font-family:

                    -apple-system,

                    BlinkMacSystemFont,

                    "Segoe UI",

                    sans-serif;

                padding:

                    7px 8px 6px;

                box-sizing:

                    border-box;

            }

            #petton-fixo-cabecalho {

                display:

                    flex;

                justify-content:

                    space-between;

                align-items:

                    center;

                margin-bottom:

                    3px;

            }

            #petton-fixo-identidade {

                font-size:

                    13px;

                font-weight:

                    700;

            }

            #petton-fixo-status {

                font-size:

                    11px;

                font-weight:

                    600;

            }

            #petton-fixo-cena {

                position:

                    relative;

                height:

                    72px;

                border-radius:

                    12px;

                overflow:

                    hidden;

                background:

                    linear-gradient(

                        to bottom,

                        #dff3ff 0%,

                        #dff3ff 60%,

                        #bde58c 60%,

                        #9bd36c 100%

                    );

                border:

                    1px solid

                    rgba(0,0,0,0.08);

            }

            #petton-fixo-casa {

                position:

                    absolute;

                left:

                    8px;

                bottom:

                    5px;

                font-size:

                    30px;

                z-index:

                    2;

            }

            #petton-fixo-pet {

                position:

                    absolute;

                left:

                    50%;

                bottom:

                    5px;

                transform:

                    translateX(-50%);

                font-size:

                    47px;

                line-height:

                    1;

                z-index:

                    5;

                transition:

                    left 0.8s linear,

                    transform 0.3s ease;

            }

            #petton-fixo-coco,

            #petton-fixo-carie,

            #petton-fixo-doente,

            #petton-fixo-escova,

            #petton-fixo-vassoura,

            #petton-fixo-hospital {

                position:

                    absolute;

                display:

                    none;

                z-index:

                    10;

            }

            #petton-fixo-coco {

                left:

                    calc(50% + 25px);

                bottom:

                    4px;

                font-size:

                    20px;

            }

            #petton-fixo-carie {

                left:

                    calc(50% + 19px);

                bottom:

                    42px;

                font-size:

                    17px;

            }

            #petton-fixo-doente {

                left:

                    calc(50% + 15px);

                top:

                    2px;

                font-size:

                    22px;

            }

            #petton-fixo-escova {

                left:

                    0;

                bottom:

                    18px;

                font-size:

                    25px;

            }

            #petton-fixo-vassoura {

                right:

                    0;

                bottom:

                    4px;

                font-size:

                    27px;

            }

            #petton-fixo-hospital {

                left:

                    50%;

                top:

                    5px;

                transform:

                    translateX(-50%);

                font-size:

                    25px;

            }

            #petton-fixo-info {

                display:

                    grid;

                grid-template-columns:

                    repeat(5, 1fr);

                gap:

                    5px;

                margin-top:

                    5px;

            }

            .petton-fixo-barra {

                display:

                    flex;

                align-items:

                    center;

                gap:

                    2px;

                font-size:

                    10px;

            }

            .petton-fixo-barra > div {

                flex:

                    1;

            }

            .petton-fixo-barra-fundo {

                width:

                    100%;

                height:

                    5px;

                background:

                    #e5e5e5;

                border-radius:

                    10px;

                overflow:

                    hidden;

            }

            .petton-fixo-barra-preenchimento {

                width:

                    0%;

                height:

                    100%;

                background:

                    #55b96b;

                border-radius:

                    10px;

                transition:

                    width 0.3s ease;

            }

            #petton-fixo-mensagem {

                text-align:

                    center;

                font-size:

                    10px;

                font-weight:

                    600;

                min-height:

                    13px;

                margin-top:

                    2px;

            }

            /* =================================================

               OVO

               ================================================= */

            #petton-fixo.petton-ovo

            #petton-fixo-pet {

                animation:

                    petton-ovo 1.5s

                    infinite ease-in-out;

            }

            @keyframes petton-ovo {

                0% {

                    transform:

                        translateX(-50%)

                        translateY(0);

                }

                50% {

                    transform:

                        translateX(-50%)

                        translateY(-3px);

                }

                100% {

                    transform:

                        translateX(-50%)

                        translateY(0);

                }

            }

            /* =================================================

               PASSEIO

               ================================================= */

            #petton-fixo.petton-passeando

            #petton-fixo-pet {

                left:

                    85%;

            }

            /* =================================================

               ESCOVAÇÃO

               ================================================= */

            #petton-fixo.petton-escovando

            #petton-fixo-escova {

                display:

                    block;

                animation:

                    petton-escovar

                    0.45s

                    infinite alternate;

            }

            @keyframes petton-escovar {

                from {

                    left:

                        40%;

                    transform:

                        rotate(-25deg);

                }

                to {

                    left:

                        62%;

                    transform:

                        rotate(25deg);

                }

            }

            /* =================================================

               VASSOURA

               ================================================= */

            #petton-fixo.petton-limpando

            #petton-fixo-vassoura {

                display:

                    block;

                animation:

                    petton-varrer

                    0.45s

                    infinite alternate;

            }

            @keyframes petton-varrer {

                from {

                    right:

                        5%;

                    transform:

                        rotate(-15deg);

                }

                to {

                    right:

                        25%;

                    transform:

                        rotate(15deg);

                }

            }

            /* =================================================

               HOSPITAL

               ================================================= */

            #petton-fixo.petton-hospital

            #petton-fixo-hospital {

                display:

                    block;

                animation:

                    petton-hospital

                    0.6s

                    infinite alternate;

            }

            @keyframes petton-hospital {

                from {

                    transform:

                        translateX(-50%)

                        scale(1);

                }

                to {

                    transform:

                        translateX(-50%)

                        scale(1.15);

                }

            }

            /* =================================================

               RESPONSIVO

               ================================================= */

            @media (max-width: 380px) {

                #petton-fixo {

                    padding:

                        5px 6px;

                }

                #petton-fixo-cena {

                    height:

                        65px;

                }

                #petton-fixo-pet {

                    font-size:

                        42px;

                }

                #petton-fixo-casa {

                    font-size:

                        27px;

                }

                #petton-fixo-info {

                    gap:

                        3px;

                }

                .petton-fixo-barra {

                    font-size:

                        9px;

                }

            }

        `;

        document.head.appendChild(style);

    }

    /* =====================================================

       UTILITÁRIOS

       ===================================================== */

    function limitar(valor) {

        valor =

            Number(valor);

        if (!Number.isFinite(valor)) {

            return 0;

        }

        return Math.max(

            0,

            Math.min(100, valor)

        );

    }

    function formatarTempo(ms) {

        ms =

            Math.max(

                0,

                Number(ms) || 0

            );

        const totalSegundos =

            Math.ceil(

                ms / 1000

            );

        const horas =

            Math.floor(

                totalSegundos / 3600

            );

        const minutos =

            Math.floor(

                (totalSegundos % 3600) / 60

            );

        const segundos =

            totalSegundos % 60;

        if (horas > 0) {

            return (

                String(horas)

                    .padStart(2, "0")

                + ":"

                +

                String(minutos)

                    .padStart(2, "0")

                + ":"

                +

                String(segundos)

                    .padStart(2, "0")

            );

        }

        return (

            String(minutos)

                .padStart(2, "0")

            + ":"

            +

            String(segundos)

                .padStart(2, "0")

        );

    }

    /* =====================================================

       IMAGEM DO PETTON

       ===================================================== */

    function obterImagem(especie) {

        if (especie === "gato") {

            return "petton-original.png";

        }

        if (especie === "cachorro") {

            return "FBC04FD9-CEFC-4D6D-AE9B-C77174DEB4E5.png";

        }

        /*

         * COELHO

         *

         * Trocaremos pelo nome correto

         * da imagem quando você colocar

         * o arquivo no GitHub.

         */

        if (especie === "coelho") {

            return null;

        }

        return null;

    }

    /* =====================================================

       MOSTRAR PET COMO IMAGEM

       ===================================================== */

    function mostrarPet(container, dados) {

        const pet =

            container.querySelector(

                "#petton-fixo-pet"

            );

        if (!dados.dateNascimento) {

            pet.textContent =

                "🥚";

            pet.style.backgroundImage =

                "none";

            pet.style.width =

                "";

            pet.style.height =

                "";

            pet.style.fontSize =

                "47px";

            return;

        }

        const imagem =

            obterImagem(

                dados.especie

            );

        if (!imagem) {

            pet.style.backgroundImage =

                "none";

            pet.textContent =

                dados.especie === "coelho"

                    ? "🐰"

                    : "🐾";

            pet.style.fontSize =

                "47px";

            return;

        }

        pet.textContent =

            "";

        pet.style.backgroundImage =

            `url("${imagem}")`;

        pet.style.backgroundSize =

            "contain";

        pet.style.backgroundRepeat =

            "no-repeat";

        pet.style.backgroundPosition =

            "center";

        pet.style.width =

            "58px";

        pet.style.height =

            "58px";

        pet.style.fontSize =

            "0";

    }

    /* =====================================================

       ATUALIZAR BARRAS

       ===================================================== */

    function atualizarBarra(id, valor) {

        const elemento =

            document.getElementById(id);

        if (!elemento) {

            return;

        }

        elemento.style.width =

            limitar(valor) + "%";

    }

    /* =====================================================

       ATUALIZAR TELA

       ===================================================== */

    function atualizar() {

        if (

            !window.Petton

        ) {

            return;

        }

        const container =

            criarContainer();

        let dados;

        try {

            dados =

                Petton.status();

        } catch (erro) {

            console.error(

                "Erro ao atualizar Petton fixo:",

                erro

            );

            return;

        }

        /* =================================================

           OVO

           ================================================= */

        if (!dados.dateNascimento) {

            container.classList.add(

                "petton-ovo"

            );

            container.classList.remove(

                "petton-doente",

                "petton-passeando",

                "petton-escovando",

                "petton-hospital"

            );

            mostrarPet(

                container,

                dados

            );

            const fase =

                document.getElementById(

                    "petton-fixo-fase"

                );

            const nome =

                document.getElementById(

                    "petton-fixo-nome"

                );

            const mensagem =

                document.getElementById(

                    "petton-fixo-mensagem"

                );

            if (nome) {

                nome.textContent =

                    "Petton";

            }

            if (fase) {

                const restante =

                    typeof Petton.incubacaoRestante ===

                    "function"

                        ? Petton.incubacaoRestante()

                        : 0;

                fase.textContent =

                    "🥚 " +

                    formatarTempo(

                        restante

                    );

            }

            if (mensagem) {

                const aquecedor =

                    typeof Petton.aquecedorAtivo ===

                    "function"

                        ? Petton.aquecedorAtivo()

                        : false;

                if (aquecedor) {

                    mensagem.textContent =

                        "🔥 Aquecedor ligado";

                } else {

                    mensagem.textContent =

                        "🥚 Seu Petton está se preparando para nascer";

                }

            }

            atualizarBarra(

                "petton-fixo-fome",

                0

            );

            atualizarBarra(

                "petton-fixo-felicidade",

                0

            );

            atualizarBarra(

                "petton-fixo-energia",

                0

            );

            atualizarBarra(

                "petton-fixo-higiene",

                0

            );

            atualizarBarra(

                "petton-fixo-saude",

                0

            );

            return;

        }

        /* =================================================

           NASCEU

           ================================================= */

        container.classList.remove(

            "petton-ovo"

        );

        mostrarPet(

            container,

            dados

        );

        /* =================================================

           IDENTIDADE

           ================================================= */

        const nome =

            document.getElementById(

                "petton-fixo-nome"

            );

        const fase =

            document.getElementById(

                "petton-fixo-fase"

            );

        if (nome) {

            nome.textContent =

                dados.nome

                    ? dados.nome

                    : "Petton";

        }

        if (fase) {

            let texto =

                dados.especie === "gato"

                    ? "🐱 Gato"

                    : dados.especie === "cachorro"

                        ? "🐶 Cachorro"

                        : "🐰 Coelho";

            fase.textContent =

                texto;

        }

        /* =================================================

           BARRAS

           ================================================= */

        atualizarBarra(

            "petton-fixo-fome",

            dados.fome

        );

        atualizarBarra(

            "petton-fixo-felicidade",

            dados.felicidade

        );

        atualizarBarra(

            "petton-fixo-energia",

            dados.energia

        );

        atualizarBarra(

            "petton-fixo-higiene",

            dados.higiene

        );

        atualizarBarra(

            "petton-fixo-saude",

            dados.saude

        );

        /* =================================================

           ESTADOS

           ================================================= */

        const coco =

            document.getElementById(

                "petton-fixo-coco"

            );

        const carie =

            document.getElementById(

                "petton-fixo-carie"

            );

        const doente =

            document.getElementById(

                "petton-fixo-doente"

            );

        const mensagem =

            document.getElementById(

                "petton-fixo-mensagem"

            );

        /* COCÔ */

        if (

            dados.cocoAtivo

        ) {

            coco.style.display =

                "block";

        } else {

            coco.style.display =

                "none";

        }

        /* CÁRIE */

        if (

            dados.carieAtiva

        ) {

            carie.style.display =

                "block";

        } else {

            carie.style.display =

                "none";

        }

        /* DOENTE */

        if (

            dados.doente

        ) {

            doente.style.display =

                "block";

            container.classList.add(

                "petton-doente"

            );

        } else {

            doente.style.display =

                "none";

            container.classList.remove(

                "petton-doente"

            );

        }

        /* =================================================

           PASSEIO

           ================================================= */

        if (

            dados.passeandoAte &&

            dados.passeandoAte >

            Date.now()

        ) {

            container.classList.add(

                "petton-passeando"

            );

        } else {

            container.classList.remove(

                "petton-passeando"

            );

        }

        /* =================================================

           ESCOVAÇÃO

           ================================================= */

        if (

            dados.escovandoAte &&

            dados.escovandoAte >

            Date.now()

        ) {

            container.classList.add(

                "petton-escovando"

            );

        } else {

            container.classList.remove(

                "petton-escovando"

            );

        }

        /* =================================================

           HOSPITAL

           ================================================= */

        if (

            dados.hospitalAte &&

            dados.hospitalAte >

            Date.now()

        ) {

            container.classList.add(

                "petton-hospital"

            );

        } else {

            container.classList.remove(

                "petton-hospital"

            );

        }

        /* =================================================

           MENSAGEM

           ================================================= */

        if (mensagem) {

            if (

                dados.hospitalAte &&

                dados.hospitalAte >

                Date.now()

            ) {

                const restante =

                    Math.max(

                        0,

                        dados.hospitalAte -

                        Date.now()

                    );

                mensagem.textContent =

                    "🏥 Tratando Petton... " +

                    formatarTempo(

                        restante

                    );

            } else if (

                dados.escovandoAte &&

                dados.escovandoAte >

                Date.now()

            ) {

                mensagem.textContent =

                    "🪥 Escovando os dentes...";

            } else if (

                dados.passeandoAte &&

                dados.passeandoAte >

                Date.now()

            ) {

                mensagem.textContent =

                    "🚶 Petton está passeando...";

            } else if (

                dados.doente

            ) {

                mensagem.textContent =

                    "🤒 Petton está doente!";

            } else if (

                dados.cocoAtivo

            ) {

                mensagem.textContent =

                    "💩 Petton fez cocô!";

            } else if (

                dados.carieAtiva

            ) {

                mensagem.textContent =

                    "🦷 Petton precisa escovar os dentes!";

            } else {

                mensagem.textContent =

                    "";

            }

        }

    }

    /* =====================================================

       INICIALIZAR

       ===================================================== */

    function iniciar() {

        adicionarCSS();

        criarContainer();

        /*

         * Espera o petton.js carregar.

         */

        let tentativas = 0;

        const esperarPetton =

            setInterval(

                function () {

                    tentativas++;

                    if (

                        window.Petton

                    ) {

                        clearInterval(

                            esperarPetton

                        );

                        atualizar();

                        setInterval(

                            atualizar,

                            INTERVALO

                        );

                    }

                    if (

                        tentativas >= 20

                    ) {

                        clearInterval(

                            esperarPetton

                        );

                    }

                },

                100

            );

    }

    /* =====================================================

       INICIAR QUANDO A PÁGINA ESTIVER PRONTA

       ===================================================== */

    if (

        document.readyState ===

        "loading"

    ) {

        document.addEventListener(

            "DOMContentLoaded",

            iniciar

        );

    } else {

        iniciar();

    }

})();
