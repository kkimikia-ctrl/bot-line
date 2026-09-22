/* =========================================================

   PETTON 🐾

   Sistema principal do Petton

   ========================================================= */

const PETTON_CHAVE = "petton_dados_v3";

/* =========================================================

   CONFIGURAÇÕES DO OVO

   ========================================================= */

const PETTON_INCUBACAO_MS = 24 * 60 * 60 * 1000;

const PETTON_AQUECEDOR_DURACAO_MS = 2 * 60 * 1000;

const PETTON_AQUECEDOR_MULTIPLICADOR = 5;

/* =========================================================

   CONFIGURAÇÕES DOS CUIDADOS

   ========================================================= */

const PETTON_COCO_ALERTA_MS = 10 * 60 * 1000;

const PETTON_COCO_DOENCA_MS = 30 * 60 * 1000;

const PETTON_CARIE_APOS_COMER_MS = 5 * 60 * 1000;

const PETTON_HOSPITAL_MS = 5 * 1000;

const PETTON_PASSEIO_MS = 8 * 1000;
/* =========================================================

   TEMPO REAL DOS STATUS

========================================================= */

const PETTON_TEMPO_FOME_MS = 30 * 60 * 1000;

const PETTON_TEMPO_FELICIDADE_MS = 60 * 60 * 1000;

const PETTON_TEMPO_ENERGIA_MS = 45 * 60 * 1000;

const PETTON_TEMPO_HIGIENE_MS = 60 * 60 * 1000;

const PETTON_TEMPO_SAUDE_RISCO_MS = 60 * 60 * 1000;

const PETTON_TEMPO_DOENTE_MS = 60 * 60 * 1000;

const PETTON_TEMPO_COCO_HIGIENE_MS = 60 * 60 * 1000;
/* =========================================================

   RECOMPENSAS

   ========================================================= */

const PETTON_MOEDAS_ALIMENTAR = 5;

const PETTON_MOEDAS_BRINCAR = 5;

const PETTON_MOEDAS_CARINHO = 2;

const PETTON_MOEDAS_LIMPAR = 3;

const PETTON_MOEDAS_LIMPAR_COCO = 5;

const PETTON_MOEDAS_ESCOVAR = 3;

const PETTON_MOEDAS_PASSEAR = 5;

/* =========================================================

   ESPÉCIES

   ========================================================= */

function escolherEspecie() {

    const especies = [

        "gato",

        "cachorro",

        "coelho"

    ];

    return especies[

        Math.floor(Math.random() * especies.length)

    ];

}

/* =========================================================

   UTILITÁRIOS

   ========================================================= */

function escolherItem(lista) {

    if (!Array.isArray(lista) || !lista.length) {

        return null;

    }

    return lista[

        Math.floor(Math.random() * lista.length)

    ];

}

function gerarIdVisual() {

    return (

        "petton-" +

        Date.now().toString(36) +

        "-" +

        Math.random().toString(36).substring(2, 10)

    );

}


/* =========================================================

   DNA VISUAL

   ========================================================= */

function criarIdentidadeVisual(especie) {

    const identidades = {

        gato: {

            cores: [

                "branco",

                "preto",

                "cinza",

                "laranja",

                "creme",

                "marrom",

                "cinza-azulado",

                "bege"

            ],

            coresSecundarias: [

                "branco",

                "creme",

                "cinza",

                "marrom",

                "preto"

            ],

            padroes: [

                "liso",

                "listrado",

                "manchado",

                "bicolor",

                "malhado",

                "com manchas no rosto"

            ],

            olhos: [

                "redondos",

                "grandes",

                "ovais",

                "brilhantes",

                "grandes e brilhantes"

            ],

            orelhas: [

                "pontudas",

                "arredondadas",

                "pequenas e pontudas",

                "grandes e pontudas"

            ],

            narizes: [

                "pequeno",

                "redondo",

                "pequeno e delicado"

            ],

            patas: [

                "pequenas",

                "fofinhas",

                "delicadas",

                "curtinhas"

            ],

            caudas: [

                "longa",

                "curta",

                "fofa",

                "longa e fofa"

            ],

            pelagens: [

                "curta e macia",

                "fofinha",

                "sedosa",

                "macia",

                "levemente felpuda"

            ]

        },

        cachorro: {

            cores: [

                "branco",

                "preto",

                "caramelo",

                "marrom",

                "cinza",

                "creme",

                "bege",

                "marrom-claro"

            ],

            coresSecundarias: [

                "branco",

                "creme",

                "caramelo",

                "marrom",

                "preto"

            ],

            padroes: [

                "liso",

                "manchado",

                "bicolor",

                "malhado",

                "com manchas no rosto",

                "com uma mancha no olho"

            ],

            olhos: [

                "redondos",

                "grandes",

                "ovais",

                "brilhantes",

                "grandes e brilhantes"

            ],

            orelhas: [

                "caídas",

                "pontudas",

                "arredondadas",

                "grandes e caídas",

                "pequenas e caídas"

            ],

            narizes: [

                "pequeno",

                "redondo",

                "escuro",

                "pequeno e escuro"

            ],

            patas: [

                "pequenas",

                "fofinhas",

                "fortes",

                "curtinhas",

                "grandes e fofinhas"

            ],

            caudas: [

                "longa",

                "curta",

                "enrolada",

                "fofa",

                "longa e fofa"

            ],

            pelagens: [

                "curta e macia",

                "fofinha",

                "macia",

                "levemente felpuda",

                "sedosa"

            ]

        },

        coelho: {

            cores: [

                "branco",

                "cinza",

                "marrom",

                "creme",

                "preto",

                "caramelo",

                "bege",

                "cinza-claro"

            ],

            coresSecundarias: [

                "branco",

                "creme",

                "cinza",

                "marrom",

                "caramelo"

            ],

            padroes: [

                "liso",

                "manchado",

                "bicolor",

                "malhado",

                "com manchas no rosto",

                "com uma mancha no olho"

            ],

            olhos: [

                "redondos",

                "grandes",

                "brilhantes",

                "grandes e brilhantes",

                "ovais"

            ],

            orelhas: [

                "longas",

                "muito longas",

                "arredondadas",

                "longas e fofinhas"

            ],

            narizes: [

                "pequeno",

                "redondo",

                "pequeno e delicado"

            ],

            patas: [

                "pequenas",

                "fofinhas",

                "delicadas",

                "curtinhas",

                "grandes e fofinhas"

            ],

            caudas: [

                "pequena",

                "fofa",

                "redonda",

                "pequena e redonda"

            ],

            pelagens: [

                "fofinha",

                "macia",

                "sedosa",

                "levemente felpuda",

                "muito fofinha"

            ]

        }

    };

    const opcoes =

        identidades[especie] ||

        identidades.gato;

    const identidade = {

        id: gerarIdVisual(),

        seed:

            Date.now().toString(36) +

            "-" +

            Math.random().toString(36).substring(2, 12),

        especie: especie,

        cor:

            escolherItem(opcoes.cores),

        corSecundaria:

            escolherItem(opcoes.coresSecundarias),

        padrao:

            escolherItem(opcoes.padroes),

        olhos:

            escolherItem(opcoes.olhos),

        orelhas:

            escolherItem(opcoes.orelhas),

        nariz:

            escolherItem(opcoes.narizes),

        patas:

            escolherItem(opcoes.patas),

        cauda:

            escolherItem(opcoes.caudas),

        pelagem:

            escolherItem(opcoes.pelagens),

        marca:

            escolherItem([

                "nenhuma marca especial",

                "pequena mancha na testa",

                "pequena mancha na bochecha",

                "pequena mancha perto do olho",

                "pequena marca no peito",

                "pequena mancha na orelha"

            ]),

        acessorio:

            escolherItem([

                "nenhum",

                "nenhum",

                "nenhum",

                "coleira simples",

                "lacinho pequeno",

                "pingente pequeno",

                "lenço pequeno"

            ]),

        expressao:

            escolherItem([

                "fofa",

                "curiosa",

                "alegre",

                "tranquila",

                "brincalhona",

                "carinhosa"

            ]),

        estiloBase:

            "Petton fofo, corpo compacto, aparência infantil e amigável",

        imagens: {

            ovo: null,

            bebe: null,

            filhote: null,

            jovem: null,

            adulto: null

        },

        descricaoBase: null

    };

    identidade.descricaoBase =

        criarDescricaoVisualPetton(identidade);

    return identidade;

}

/* =========================================================

   DESCRIÇÃO VISUAL

   ========================================================= */

function criarDescricaoVisualPetton(identidade) {

    if (!identidade) {

        return "";

    }

    const especie =

        identidade.especie || "gato";

    const cor =

        identidade.cor || "fofo";

    const corSecundaria =

        identidade.corSecundaria || "branco";

    const padrao =

        identidade.padrao || "liso";

    const olhos =

        identidade.olhos || "grandes";

    const orelhas =

        identidade.orelhas || "fofinhas";

    const nariz =

        identidade.nariz || "pequeno";

    const patas =

        identidade.patas || "fofinhas";

    const cauda =

        identidade.cauda || "fofa";

    const pelagem =

        identidade.pelagem || "macia";

    const marca =

        identidade.marca ||

        "nenhuma marca especial";

    const acessorio =

        identidade.acessorio || "nenhum";

    const expressao =

        identidade.expressao || "fofa";

    return (

        "Personagem Petton original, espécie " +

        especie +

        ", corpo compacto e extremamente fofo, " +

        "estilo visual Petton consistente, " +

        "cor principal " +

        cor +

        ", cor secundária " +

        corSecundaria +

        ", padrão " +

        padrao +

        ", olhos " +

        olhos +

        ", orelhas " +

        orelhas +

        ", nariz " +

        nariz +

        ", patas " +

        patas +

        ", cauda " +

        cauda +

        ", pelagem " +

        pelagem +

        ", " +

        marca +

        ", acessório " +

        acessorio +

        ", expressão " +

        expressao +

        ". Manter exatamente essas características " +

        "em todas as fases de crescimento."

    );

}

/* =========================================================

   PROMPT POR FASE

   ========================================================= */

function criarPromptFasePetton(fase) {

    const dados =

        carregarPetton();

    garantirIdentidadeVisual(dados);

    if (!dados.identidadeVisual) {

        return "";

    }

    const identidade =

        dados.identidadeVisual;

    let descricaoFase = "";

    switch (fase) {

        case "ovo":

            descricaoFase =

                "ovo Petton fofo, antes do nascimento";

            break;

        case "bebe":

            descricaoFase =

                "bebê Petton recém-nascido, pequeno, fofo e delicado";

            break;

        case "filhote":

            descricaoFase =

                "filhote Petton crescendo, mantendo exatamente a mesma identidade";

            break;

        case "jovem":

            descricaoFase =

                "Petton jovem, maior e mais desenvolvido, mantendo exatamente a mesma identidade";

            break;

        case "adulto":

            descricaoFase =

                "Petton adulto, corpo desenvolvido, mantendo exatamente a mesma identidade";

            break;

        default:

            descricaoFase =

                "Petton mantendo exatamente a mesma identidade visual";

    }

    return (

        identidade.descricaoBase +

        " " +

        descricaoFase +

        ". " +

        "Não trocar espécie, cor, padrão, olhos, orelhas, " +

        "nariz, patas, cauda, pelagem, marca ou acessório. " +

        "O personagem deve continuar reconhecível como o mesmo Petton."

    );

}

/* =========================================================

   GARANTIR IDENTIDADE VISUAL

   ========================================================= */

function garantirIdentidadeVisual(dados) {

    if (!dados) {

        return dados;

    }

    if (!dados.identidadeVisual) {

        if (!dados.especie) {

            dados.especie =

                escolherEspecie();

        }

        dados.identidadeVisual =

            criarIdentidadeVisual(

                dados.especie

            );

    }

    const identidade =

        dados.identidadeVisual;

    if (!identidade.id) {

        identidade.id =

            gerarIdVisual();

    }

    if (!identidade.seed) {

        identidade.seed =

            Date.now().toString(36) +

            "-" +

            Math.random().toString(36).substring(2, 12);

    }

    if (!identidade.especie) {

        identidade.especie =

            dados.especie ||

            escolherEspecie();

    }

    if (!dados.especie) {

        dados.especie =

            identidade.especie;

    }

    if (!identidade.cor) {

        identidade.cor = "branco";

    }

    if (!identidade.corSecundaria) {

        identidade.corSecundaria = "branco";

    }

    if (!identidade.padrao) {

        identidade.padrao = "liso";

    }

    if (!identidade.olhos) {

        identidade.olhos = "grandes";

    }

    if (!identidade.orelhas) {

        identidade.orelhas = "arredondadas";

    }

    if (!identidade.nariz) {

        identidade.nariz = "pequeno";

    }

    if (!identidade.patas) {

        identidade.patas = "fofinhas";

    }

    if (!identidade.cauda) {

        identidade.cauda = "fofa";

    }

    if (!identidade.pelagem) {

        identidade.pelagem = "macia";

    }

    if (!identidade.marca) {

        identidade.marca =

            "nenhuma marca especial";

    }

    if (!identidade.acessorio) {

        identidade.acessorio = "nenhum";

    }

    if (!identidade.expressao) {

        identidade.expressao = "fofa";

    }

    if (!identidade.estiloBase) {

        identidade.estiloBase =

            "Petton fofo, corpo compacto, aparência infantil e amigável";

    }

    if (!identidade.imagens) {

        identidade.imagens = {

            ovo: null,

            bebe: null,

            filhote: null,

            jovem: null,

            adulto: null

        };

    } else {

        if (!("ovo" in identidade.imagens)) {

            identidade.imagens.ovo = null;

        }

        if (!("bebe" in identidade.imagens)) {

            identidade.imagens.bebe = null;

        }

        if (!("filhote" in identidade.imagens)) {

            identidade.imagens.filhote = null;

        }

        if (!("jovem" in identidade.imagens)) {

            identidade.imagens.jovem = null;

        }

        if (!("adulto" in identidade.imagens)) {

            identidade.imagens.adulto = null;

        }

    }

    if (!identidade.descricaoBase) {

        identidade.descricaoBase =

            criarDescricaoVisualPetton(

                identidade

            );

    }

    return dados;

}

/* =========================================================

   ACESSÓRIOS

   ========================================================= */

const PETTON_TIPOS_ACESSORIOS = [

    "chapeu",

    "oculos",

    "lacinho",

    "coroa",

    "lenco"

];

function garantirAcessorios(dados) {

    if (!dados) {

        return dados;

    }

    if (

        !dados.acessorios ||

        typeof dados.acessorios !== "object" ||

        Array.isArray(dados.acessorios)

    ) {

        dados.acessorios = {};

    }

    PETTON_TIPOS_ACESSORIOS.forEach(

        function (tipo) {

            if (

                !Object.prototype.hasOwnProperty.call(

                    dados.acessorios,

                    tipo

                )

            ) {

                dados.acessorios[tipo] = null;

            }

        }

    );

    return dados;

}

function tipoAcessorioValido(tipo) {

    return PETTON_TIPOS_ACESSORIOS.includes(

        String(tipo || "").toLowerCase()

    );

}

function equiparAcessorio(tipo, id) {

    tipo =

        String(tipo || "").toLowerCase().trim();

    if (!tipoAcessorioValido(tipo)) {

        return false;

    }

    const dados =

        carregarPetton();

    garantirAcessorios(dados);

    if (

        id === null ||

        typeof id === "undefined" ||

        id === ""

    ) {

        dados.acessorios[tipo] = null;

    } else {

        dados.acessorios[tipo] =

            String(id);

    }

    salvarPetton(dados);

    return dados.acessorios;

}

function removerAcessorio(tipo) {

    tipo =

        String(tipo || "").toLowerCase().trim();

    if (!tipoAcessorioValido(tipo)) {

        return false;

    }

    const dados =

        carregarPetton();

    garantirAcessorios(dados);

    dados.acessorios[tipo] = null;

    salvarPetton(dados);

    return true;

}

function obterAcessoriosPetton() {

    const dados =

        carregarPetton();

    garantirAcessorios(dados);

    salvarPetton(dados);

    return dados.acessorios;

}

function obterAcessorioPetton(tipo) {

    tipo =

        String(tipo || "").toLowerCase().trim();

    if (!tipoAcessorioValido(tipo)) {

        return null;

    }

    const dados =

        carregarPetton();

    garantirAcessorios(dados);

    return dados.acessorios[tipo] || null;

}

/* =========================================================

   POSIÇÃO DOS ACESSÓRIOS

   =========================================================

   Os valores são percentuais relativos à imagem do Petton.

   Isso permite que Principal e Quarto usem exatamente

   a mesma posição para o mesmo Petton.

   A posição pode ser ajustada depois sem alterar

   o sistema de compra/equipamento.

   ========================================================= */

function obterPosicaoAcessorio(tipo, especie, fase) {

    tipo =

        String(tipo || "").toLowerCase();

    especie =

        String(especie || "gato").toLowerCase();

    fase =

        String(fase || "bebe").toLowerCase();

    const posicoesBase = {

        gato: {

            chapeu: {

                top: "3%",

                left: "50%",

                width: "38%",

                transform: "translateX(-50%)"

            },

            oculos: {

                top: "34%",

                left: "50%",

                width: "32%",

                transform: "translateX(-50%)"

            },

            lacinho: {

                top: "28%",

                left: "72%",

                width: "20%",

                transform: "translateX(-50%)"

            },

            coroa: {

                top: "0%",

                left: "50%",

                width: "30%",

                transform: "translateX(-50%)"

            },

            lenco: {

                top: "63%",

                left: "50%",

                width: "32%",

                transform: "translateX(-50%)"

            }

        },

        cachorro: {

            chapeu: {

                top: "4%",

                left: "50%",

                width: "40%",

                transform: "translateX(-50%)"

            },

            oculos: {

                top: "34%",

                left: "50%",

                width: "34%",

                transform: "translateX(-50%)"

            },

            lacinho: {

                top: "30%",

                left: "72%",

                width: "21%",

                transform: "translateX(-50%)"

            },

            coroa: {

                top: "1%",

                left: "50%",

                width: "32%",

                transform: "translateX(-50%)"

            },

            lenco: {

                top: "62%",

                left: "50%",

                width: "34%",

                transform: "translateX(-50%)"

            }

        },

        coelho: {

            chapeu: {

                top: "2%",

                left: "50%",

                width: "36%",

                transform: "translateX(-50%)"

            },

            oculos: {

                top: "31%",

                left: "50%",

                width: "30%",

                transform: "translateX(-50%)"

            },

            lacinho: {

                top: "24%",

                left: "70%",

                width: "20%",

                transform: "translateX(-50%)"

            },

            coroa: {

                top: "0%",

                left: "50%",

                width: "28%",

                transform: "translateX(-50%)"

            },

            lenco: {

                top: "59%",

                left: "50%",

                width: "31%",

                transform: "translateX(-50%)"

            }

        }

    };

    const especieBase =

        posicoesBase[especie] ||

        posicoesBase.gato;

    const posicao =

        especieBase[tipo] ||

        especieBase.chapeu;

    const ajusteFase = {

        ovo: {

            top: 0,

            width: 1

        },

        bebe: {

            top: 0,

            width: 1

        },

        filhote: {

            top: 0,

            width: 1

        },

        jovem: {

            top: 0,

            width: 1

        },

        adulto: {

            top: 0,

            width: 1

        }

    };

    const ajuste =

        ajusteFase[fase] ||

        ajusteFase.bebe;

    return {

        top:

            posicao.top,

        left:

            posicao.left,

        width:

            posicao.width,

        transform:

            posicao.transform,

        fase:

            fase,

        especie:

            especie,

        tipo:

            tipo

    };

}

function posicaoAcessorioPetton(

    tipo,

    fase

) {

    const dados =

        carregarPetton();

    garantirIdentidadeVisual(dados);

    const especie =

        dados.especie ||

        (

            dados.identidadeVisual

                ? dados.identidadeVisual.especie

                : "gato"

        );

    const faseAtual =

        fase ||

        dados.fase ||

        "bebe";

    return obterPosicaoAcessorio(

        tipo,

        especie,

        faseAtual

    );

}

/* =========================================================

   CRIAR PETTON

   ========================================================= */

function criarPettonNovo() {

    const agora =

        Date.now();

    const especie =

        escolherEspecie();

    const novo = {

        especie: especie,

        nome: null,

        fase: "ovo",

        dateNascimento: null,

        dataCriacao:

            new Date(agora).toISOString(),

        incubacaoRestanteMs:

            PETTON_INCUBACAO_MS,

        incubacaoAtualizadaEm:

            agora,

        aquecedorAte: null,

        fome: 70,

        felicidade: 100,

        energia: 100,

        higiene: 100,

        saude: 100,

        doente: false,

        doenteDesde: null,

        hospitalAte: null,

        cocoAtivo: false,

        cocoNasceuEm: null,

        carieAtiva: false,

        carieNasceuEm: null,

        ultimaAlimentacaoEm: null,

        passeandoAte: null,

        escovandoAte: null,

        /* MOEDAS */

        moedas: 100,

        /* PONTOS */

        pontos: 0,

        nivel: 1,

        /* =================================================

           ACESSÓRIOS EQUIPADOS

           ================================================= */

        acessorios: {

            chapeu: null,

            oculos: null,

            lacinho: null,

            coroa: null,

            lenco: null

        },

        identidadeVisual: null,

        caracteristicas: {

            cor: false,

            orelhas: false,

            olhos: false,

            nariz: false,

            padrao: false,

            patas: false,

            cauda: false

        },

        album: []

    };

    garantirIdentidadeVisual(novo);

    garantirAcessorios(novo);

    return novo;

}

/* =========================================================

   CAMPOS NOVOS

   ========================================================= */

function garantirCamposNovos(dados) {

    if (typeof dados.doente !== "boolean") {

        dados.doente = false;

    }

    if (typeof dados.doenteDesde === "undefined") {

        dados.doenteDesde = null;

    }

    if (typeof dados.hospitalAte === "undefined") {

        dados.hospitalAte = null;

    }

    if (typeof dados.cocoAtivo !== "boolean") {

        dados.cocoAtivo = false;

    }

    if (typeof dados.cocoNasceuEm === "undefined") {

        dados.cocoNasceuEm = null;

    }

    if (typeof dados.carieAtiva !== "boolean") {

        dados.carieAtiva = false;

    }

    if (typeof dados.carieNasceuEm === "undefined") {

        dados.carieNasceuEm = null;

    }

    if (typeof dados.ultimaAlimentacaoEm === "undefined") {

        dados.ultimaAlimentacaoEm = null;

    }

    if (typeof dados.passeandoAte === "undefined") {

        dados.passeandoAte = null;

    }

    if (typeof dados.escovandoAte === "undefined") {

        dados.escovandoAte = null;

    }

    if (typeof dados.identidadeVisual === "undefined") {

        dados.identidadeVisual = null;

    }

    /* =====================================================

       ACESSÓRIOS

    ===================================================== */

    garantirAcessorios(dados);

    /* =====================================================

       MOEDAS

    ===================================================== */

    if (

        typeof dados.moedas !== "number" ||

        !Number.isFinite(dados.moedas)

    ) {

        dados.moedas = 100;

    }

    dados.moedas =

        Math.max(

            0,

            Math.floor(dados.moedas)

        );

    /* =====================================================

       PONTOS

    ===================================================== */

    if (

        typeof dados.pontos !== "number" ||

        !Number.isFinite(dados.pontos)

    ) {

        dados.pontos = 0;

    }

    dados.pontos =

        Math.max(

            0,

            Math.floor(dados.pontos)

        );

    if (!dados.caracteristicas) {

        dados.caracteristicas = {

            cor: false,

            orelhas: false,

            olhos: false,

            nariz: false,

            padrao: false,

            patas: false,

            cauda: false

        };

    }

    if (!Array.isArray(dados.album)) {

        dados.album = [];

    }

    return dados;

}

/* =========================================================

   IDADE DIRETA

   ========================================================= */

function calcularIdadeDiasDireto(dados) {

    if (!dados || !dados.dateNascimento) {

        return 0;

    }

    const nascimento =

        new Date(

            dados.dateNascimento

        ).getTime();

    if (!Number.isFinite(nascimento)) {

        return 0;

    }

    const diferenca =

        Date.now() -

        nascimento;

    return Math.max(

        0,

        Math.floor(

            diferenca /

            (1000 * 60 * 60 * 24)

        )

    );

}

/* =========================================================

   TEXTO DA IDADE

   ========================================================= */

function obterIdadeTexto(dados) {

    if (!dados) {

        return "🥚 Carregando Petton...";

    }

    if (!dados.dateNascimento) {

        const restante =

            Number(

                dados.incubacaoRestanteMs

            );

        if (

            Number.isFinite(restante) &&

            restante > 0

        ) {

            const totalSegundos =

                Math.ceil(

                    restante / 1000

                );

            const horas =

                Math.floor(

                    totalSegundos / 3600

                );

            const minutos =

                Math.floor(

                    (totalSegundos % 3600) / 60

                );

            if (horas > 0) {

                return (

                    "🥚 Nascimento em " +

                    horas +

                    "h"

                );

            }

            if (minutos > 0) {

                return (

                    "🥚 Nascimento em " +

                    minutos +

                    " min"

                );

            }

            return "🥚 Nascimento em breve";

        }

        return "🥚 Ainda no ovo";

    }

    const dias =

        calcularIdadeDiasDireto(

            dados

        );

    if (dias <= 0) {

        return "Recém-nascido 🐣";

    }

    if (dias === 1) {

        return "1 dia";

    }

    return dias + " dias";

}

/* =========================================================

   ATUALIZAR INCUBAÇÃO

   ========================================================= */

function atualizarIncubacao() {

    const dados =

        carregarPetton();

    if (dados.dateNascimento) {

        return dados;

    }

    const agora =

        Date.now();

    if (

        typeof dados.incubacaoAtualizadaEm !== "number" ||

        !Number.isFinite(

            dados.incubacaoAtualizadaEm

        )

    ) {

        dados.incubacaoAtualizadaEm =

            agora;

    }

    let tempoPassado =

        agora -

        dados.incubacaoAtualizadaEm;

    if (

        !Number.isFinite(tempoPassado) ||

        tempoPassado < 0

    ) {

        tempoPassado = 0;

    }

    const aquecedorLigado =

        dados.aquecedorAte &&

        dados.aquecedorAte > agora;

    if (

        dados.aquecedorAte &&

        dados.aquecedorAte <= agora

    ) {

        dados.aquecedorAte = null;

    }

    const multiplicador =

        aquecedorLigado

            ? PETTON_AQUECEDOR_MULTIPLICADOR

            : 1;

    const desconto =

        tempoPassado *

        multiplicador;

    dados.incubacaoRestanteMs =

        Math.max(

            0,

            Number(

                dados.incubacaoRestanteMs || 0

            ) -

            desconto

        );

    dados.incubacaoAtualizadaEm =

        agora;

    if (

        dados.incubacaoRestanteMs <= 0

    ) {

        dados.incubacaoRestanteMs = 0;

        nascerPettonInterno(

            dados

        );

        return dados;

    }

    salvarPetton(dados);

    return dados;

}

/* =========================================================

   NASCIMENTO

   ========================================================= */

function nascerPettonInterno(dados) {

    if (dados.dateNascimento) {

        return dados;

    }

    garantirIdentidadeVisual(dados);

    garantirAcessorios(dados);

    dados.dateNascimento =

        new Date().toISOString();

    dados.fase =

        "bebe";

    dados.aquecedorAte =

        null;

    dados.incubacaoRestanteMs =

        0;

    dados.incubacaoAtualizadaEm =

        Date.now();

    dados.nome =

        null;

    dados.doente =

        false;

    dados.doenteDesde =

        null;

    dados.hospitalAte =

        null;

    dados.cocoAtivo =

        false;

    dados.cocoNasceuEm =

        null;

    dados.carieAtiva =

        false;

    dados.carieNasceuEm =

        null;

    dados.ultimaAlimentacaoEm =

        null;

    dados.passeandoAte =

        null;

    dados.escovandoAte =

        null;

    dados.caracteristicas = {

        cor: true,

        orelhas: true,

        olhos: false,

        nariz: true,

        padrao: false,

        patas: false,

        cauda: false

    };

    if (!Array.isArray(dados.album)) {

        dados.album = [];

    }

    salvarPetton(dados);

    return dados;

}

/* =========================================================

   NASCER API

   ========================================================= */

function nascerPetton() {

    const dados =

        carregarPetton();

    if (dados.dateNascimento) {

        garantirIdentidadeVisual(

            dados

        );

        garantirAcessorios(dados);

        salvarPetton(dados);

        return dados;

    }

    dados.incubacaoRestanteMs =

        0;

    dados.aquecedorAte =

        null;

    dados.incubacaoAtualizadaEm =

        Date.now();

    nascerPettonInterno(dados);

    return carregarPetton();

}

/* =========================================================

   TESTAR NASCIMENTO

   ========================================================= */

function testarNascimentoPetton() {

    const dados =

        carregarPetton();

    if (dados.dateNascimento) {

        return dados;

    }

    dados.incubacaoRestanteMs =

        0;

    dados.aquecedorAte =

        null;

    dados.incubacaoAtualizadaEm =

        Date.now();

    salvarPetton(dados);

    return nascerPetton();

}

/* =========================================================

   CARREGAR PETTON

   ========================================================= */

function carregarPetton() {

    const salvo =

        localStorage.getItem(

            PETTON_CHAVE

        );

    if (!salvo) {

        const novo =

            criarPettonNovo();

        salvarPetton(novo);

        return novo;

    }

    try {

        const dados =

            JSON.parse(salvo);

        garantirCamposNovos(

            dados

        );

        if (

            !dados.dataCriacao &&

            dados.criadoEm

        ) {

            dados.dataCriacao =

                dados.criadoEm;

        }

        if (

            typeof dados.incubacaoRestanteMs !== "number" ||

            !Number.isFinite(

                dados.incubacaoRestanteMs

            )

        ) {

            if (!dados.dateNascimento) {

                dados.incubacaoRestanteMs =

                    PETTON_INCUBACAO_MS;

            } else {

                dados.incubacaoRestanteMs =

                    0;

            }

        }

        if (

            typeof dados.incubacaoAtualizadaEm !== "number" ||

            !Number.isFinite(

                dados.incubacaoAtualizadaEm

            )

        ) {

            const criacao =

                dados.dataCriacao

                    ? new Date(

                        dados.dataCriacao

                    ).getTime()

                    : Date.now();

            dados.incubacaoAtualizadaEm =

                Number.isFinite(criacao)

                    ? criacao

                    : Date.now();

        }

        if (!dados.dateNascimento) {

            dados.fase =

                "ovo";

            if (!dados.especie) {

                dados.especie =

                    escolherEspecie();

            }

            garantirIdentidadeVisual(

                dados

            );

        } else {

            garantirIdentidadeVisual(

                dados

            );

        }

        garantirAcessorios(dados);

        const dias =

            calcularIdadeDiasDireto(

                dados

            );

        dados.nascido =

            !!dados.dateNascimento;

        dados.idadeDias =

            dias;

        dados.idadeTexto =

            obterIdadeTexto(

                dados

            );

        dados.faseAtual =

            dados.fase ||

            (

                dados.dateNascimento

                    ? descobrirFase(dias)

                    : "ovo"

            );

        return dados;

    } catch (erro) {

        console.error(

            "Erro ao carregar Petton:",

            erro

        );

        const novo =

            criarPettonNovo();

        salvarPetton(novo);

        return novo;

    }

}

/* =========================================================

   SALVAR

   ========================================================= */

function salvarPetton(dados) {

    if (!dados) {

        return null;

    }

    garantirCamposNovos(dados);

    garantirIdentidadeVisual(dados);

    garantirAcessorios(dados);

    const copia =

        JSON.parse(

            JSON.stringify(dados)

        );

    delete copia.nascido;

    delete copia.idadeDias;

    delete copia.idadeTexto;

    delete copia.faseAtual;

    localStorage.setItem(

        PETTON_CHAVE,

        JSON.stringify(copia)

    );

    tentarAvisarTela(

        dados

    );

    return dados;

}

/* =========================================================

   AVISAR TELA

   ========================================================= */

function tentarAvisarTela(dados) {

    try {

        if (

            typeof window !== "undefined" &&

            typeof window.dispatchEvent === "function"

        ) {

            window.dispatchEvent(

                new CustomEvent(

                    "petton-atualizado",

                    {

                        detail: dados

                    }

                )

            );

        }

    } catch (erro) {

        console.warn(

            "Aviso visual do Petton não disponível:",

            erro

        );

    }

}

/* =========================================================

   MOEDAS

   ========================================================= */

function obterMoedasPetton() {

    const dados =

        carregarPetton();

    let moedas =

        Number(dados.moedas);

    if (

        !Number.isFinite(moedas) ||

        moedas < 0

    ) {

        moedas = 0;

        dados.moedas = 0;

        salvarPetton(dados);

    }

    return Math.floor(moedas);

}

/* =========================================================

   ADICIONAR MOEDAS

   ========================================================= */

function adicionarMoedasPetton(valor) {

    const quantidade =

        Number(valor);

    if (

        !Number.isFinite(quantidade) ||

        quantidade <= 0

    ) {

        return false;

    }

    const dados =

        carregarPetton();

    dados.moedas =

        Math.max(

            0,

            Math.floor(

                Number(dados.moedas || 0)

            )

        );

    dados.moedas +=

        Math.floor(quantidade);

    salvarPetton(dados);

    return dados.moedas;

}

/* =========================================================

   GASTAR MOEDAS

   ========================================================= */

function gastarMoedasPetton(valor) {

    const quantidade =

        Number(valor);

    if (

        !Number.isFinite(quantidade) ||

        quantidade <= 0

    ) {

        return false;

    }

    const dados =

        carregarPetton();

    dados.moedas =

        Math.max(

            0,

            Math.floor(

                Number(dados.moedas || 0)

            )

        );

    const preco =

        Math.floor(

            quantidade

        );

    if (

        dados.moedas < preco

    ) {

        return false;

    }

    dados.moedas -=

        preco;

    salvarPetton(dados);

    return true;

}

/* =========================================================

   RECOMPENSA

   ========================================================= */

function darRecompensa(

    dados,

    pontos,

    moedas

) {

    if (!dados) {

        return;

    }

    if (

        Number.isFinite(

            Number(pontos)

        )

    ) {

        dados.pontos =

            Math.max(

                0,

                Math.floor(

                    Number(

                        dados.pontos || 0

                    )

                ) +

                Math.floor(

                    Number(pontos)

                )

            );

    }

    if (

        Number.isFinite(

            Number(moedas)

        )

    ) {

        dados.moedas =

            Math.max(

                0,

                Math.floor(

                    Number(

                        dados.moedas || 0

                    )

                ) +

                Math.floor(

                    Number(moedas)

                )

            );

    }

}

/* =========================================================

   NOME

   ========================================================= */

function definirNome(nome) {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return false;

    }

    if (dados.hospitalAte) {

        return false;

    }

    if (typeof nome !== "string") {

        return false;

    }

    nome =

        nome.trim();

    if (!nome) {

        return false;

    }

    if (nome.length > 20) {

        nome =

            nome.substring(

                0,

                20

            );

    }

    dados.nome =

        nome;

    salvarPetton(dados);

    return dados;

}

/* =========================================================

   AQUECEDOR

   ========================================================= */

function ligarAquecedor() {

    let dados =

        atualizarIncubacao();

    if (dados.dateNascimento) {

        return false;

    }

    const agora =

        Date.now();

    dados.aquecedorAte =

        agora +

        PETTON_AQUECEDOR_DURACAO_MS;

    dados.incubacaoAtualizadaEm =

        agora;

    salvarPetton(dados);

    return true;

}

function aquecedorAtivo() {

    const dados =

        carregarPetton();

    if (dados.dateNascimento) {

        return false;

    }

    return !!(

        dados.aquecedorAte &&

        dados.aquecedorAte >

        Date.now()

    );

}

function tempoAquecedorRestante() {

    const dados =

        carregarPetton();

    if (!dados.aquecedorAte) {

        return 0;

    }

    return Math.max(

        0,

        dados.aquecedorAte -

        Date.now()

    );

}

function tempoIncubacaoRestante() {

    const dados =

        atualizarIncubacao();

    if (dados.dateNascimento) {

        return 0;

    }

    return Math.max(

        0,

        Number(

            dados.incubacaoRestanteMs ||

            0

        )

    );

}

/* =========================================================

   FASE

   ========================================================= */

function descobrirFase(dias) {

    if (dias < 1) {

        return "bebe";

    }

    if (dias < 8) {

        return "bebe";

    }

    if (dias < 31) {

        return "filhote";

    }

    if (dias < 91) {

        return "jovem";

    }

    return "adulto";

}

/* =========================================================

   IDADE

   ========================================================= */

function idadeDias() {

    const dados =

        carregarPetton();

    return calcularIdadeDiasDireto(

        dados

    );

}

/* =========================================================

   CRESCIMENTO

   ========================================================= */

function verificarCrescimento() {

    let dados =

        atualizarIncubacao();

    if (!dados.dateNascimento) {

        dados.fase =

            "ovo";

        salvarPetton(dados);

        return dados;

    }

    garantirIdentidadeVisual(

        dados

    );

    garantirAcessorios(dados);

    const dias =

        calcularIdadeDiasDireto(

            dados

        );

    dados.fase =

        descobrirFase(

            dias

        );

    salvarPetton(dados);

    atualizarCaracteristicasVisiveis();

    return carregarPetton();

}

/* =========================================================

   CARACTERÍSTICAS

   ========================================================= */

function atualizarCaracteristicasVisiveis() {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        dados.caracteristicas = {

            cor: false,

            orelhas: false,

            olhos: false,

            nariz: false,

            padrao: false,

            patas: false,

            cauda: false

        };

        salvarPetton(dados);

        return dados;

    }

    garantirIdentidadeVisual(

        dados

    );

    garantirAcessorios(dados);

    const dias =

        calcularIdadeDiasDireto(

            dados

        );

    dados.caracteristicas.cor =

        true;

    dados.caracteristicas.orelhas =

        true;

    dados.caracteristicas.nariz =

        true;

    dados.caracteristicas.olhos =

        dias >= 2;

    dados.caracteristicas.padrao =

        dias >= 3;

    dados.caracteristicas.patas =

        dias >= 4;

    dados.caracteristicas.cauda =

        dias >= 5;

    salvarPetton(dados);

    return dados;

}

/* =========================================================

   DOENÇA

   ========================================================= */

function verificarDoenca(dados) {

    if (!dados.dateNascimento) {

        return dados;

    }

    if (dados.doente) {

        return dados;

    }

    if (

        dados.cocoAtivo &&

        dados.cocoNasceuEm

    ) {

        const tempoCoco =

            Date.now() -

            dados.cocoNasceuEm;

        if (

            tempoCoco >=

            PETTON_COCO_ALERTA_MS

        ) {

            dados.higiene =

                Math.max(

                    0,

                    dados.higiene - 1

                );

            dados.saude =

                Math.max(

                    0,

                    dados.saude - 0.5

                );

        }

        if (

            tempoCoco >=

            PETTON_COCO_DOENCA_MS

        ) {

            dados.doente =

                true;

            dados.doenteDesde =

                Date.now();

            dados.saude =

                Math.min(

                    dados.saude,

                    35

                );

            dados.felicidade =

                Math.min(

                    dados.felicidade,

                    40

                );

        }

    }

    if (dados.saude <= 10) {

        dados.doente =

            true;

        dados.doenteDesde =

            dados.doenteDesde ||

            Date.now();

    }

    return dados;

}

/* =========================================================

   CÁRIE

   ========================================================= */

function verificarCarie(dados) {

    if (!dados.dateNascimento) {

        return dados;

    }

    if (dados.carieAtiva) {

        return dados;

    }

    if (dados.ultimaAlimentacaoEm) {

        const tempoDesdeComida =

            Date.now() -

            dados.ultimaAlimentacaoEm;

        if (

            tempoDesdeComida >=

            PETTON_CARIE_APOS_COMER_MS

        ) {

            if (

                Math.random() < 0.45

            ) {

                dados.carieAtiva =

                    true;

                dados.carieNasceuEm =

                    Date.now();

            }

            dados.ultimaAlimentacaoEm =

                null;

        }

    }

    return dados;

}

/* =========================================================

   HOSPITAL

   ========================================================= */

function finalizarHospital(dados) {

    dados.hospitalAte =

        null;

    dados.doente =

        false;

    dados.doenteDesde =

        null;

    dados.saude =

        Math.max(

            80,

            dados.saude

        );

    dados.felicidade =

        Math.min(

            100,

            dados.felicidade + 10

        );

    salvarPetton(dados);

    return dados;

}

function atualizarHospital(dados) {

    if (

        dados.hospitalAte &&

        Date.now() >=

        dados.hospitalAte

    ) {

        return finalizarHospital(

            dados

        );

    }

    return dados;

}

/* =========================================================

   PASSEIO

   ========================================================= */

function atualizarPasseio(dados) {

    if (

        dados.passeandoAte &&

        Date.now() >=

        dados.passeandoAte

    ) {

        dados.passeandoAte =

            null;

        salvarPetton(dados);

    }

    return dados;

}

/* =========================================================

   ESCOVAÇÃO

   ========================================================= */

function atualizarEscovacao(dados) {

    if (

        dados.escovandoAte &&

        Date.now() >=

        dados.escovandoAte

    ) {

        dados.escovandoAte =

            null;

        dados.carieAtiva =

            false;

        dados.carieNasceuEm =

            null;

        dados.higiene =

            Math.min(

                100,

                dados.higiene + 10

            );

        dados.saude =

            Math.min(

                100,

                dados.saude + 2

            );

        dados.pontos += 3;

        dados.moedas =

            Math.max(

                0,

                Number(

                    dados.moedas || 0

                )

            );

        dados.moedas +=

            PETTON_MOEDAS_ESCOVAR;

        salvarPetton(dados);

    }

    return dados;

}

/* =========================================================

   TEMPO

   ========================================================= */

function atualizarTempo() {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return dados;

    }

    verificarDoenca(dados);

    verificarCarie(dados);

    atualizarHospital(dados);

    atualizarPasseio(dados);

    atualizarEscovacao(dados);

    if (dados.doente) {

        dados.felicidade =

            Math.max(

                0,

                dados.felicidade - 1

            );

        dados.energia =

            Math.max(

                0,

                dados.energia - 0.5

            );

        dados.saude =

            Math.max(

                0,

                dados.saude - 0.3

            );

        salvarPetton(dados);

        return dados;

    }

    dados.fome =

        Math.max(

            0,

            dados.fome - 1

        );

    dados.felicidade =

        Math.max(

            0,

            dados.felicidade - 0.5

        );

    dados.energia =

        Math.max(

            0,

            dados.energia - 0.3

        );

    dados.higiene =

        Math.max(

            0,

            dados.higiene - 0.3

        );

    if (

        dados.fome < 20 ||

        dados.higiene < 20

    ) {

        dados.saude =

            Math.max(

                0,

                dados.saude - 0.2

            );

    }

    salvarPetton(dados);

    return dados;

}

/* =========================================================

   ALIMENTAR

   ========================================================= */

function alimentar() {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return false;

    }

    if (dados.doente) {

        return false;

    }

    if (dados.hospitalAte) {

        return false;

    }

    dados.fome =

        Math.min(

            100,

            dados.fome + 20

        );

    dados.saude =

        Math.min(

            100,

            dados.saude + 2

        );

    dados.pontos += 5;

    dados.moedas =

        Math.max(

            0,

            Number(

                dados.moedas || 0

            )

        );

    dados.moedas +=

        PETTON_MOEDAS_ALIMENTAR;

    dados.ultimaAlimentacaoEm =

        Date.now();

    salvarPetton(dados);

    return true;

}

/* =========================================================

   PRODUZIR COCÔ DEPOIS DA COMIDA

   ========================================================= */

function verificarCoco() {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return dados;

    }

    if (dados.cocoAtivo) {

        return dados;

    }

    if (!dados.ultimaAlimentacaoEm) {

        return dados;

    }

    const tempo =

        Date.now() -

        dados.ultimaAlimentacaoEm;

    if (

        tempo >=

        10 * 60 * 1000

    ) {

        dados.cocoAtivo =

            true;

        dados.cocoNasceuEm =

            Date.now();

        dados.ultimaAlimentacaoEm =

            null;

        salvarPetton(dados);

    }

    return dados;

}

/* =========================================================

   BRINCAR

   ========================================================= */

function brincar() {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return false;

    }

    if (dados.doente) {

        return false;

    }

    if (dados.hospitalAte) {

        return false;

    }

    dados.felicidade =

        Math.min(

            100,

            dados.felicidade + 20

        );

    dados.energia =

        Math.max(

            0,

            dados.energia - 10

        );

    dados.higiene =

        Math.max(

            0,

            dados.higiene - 1

        );

    dados.pontos += 5;

    dados.moedas =

        Math.max(

            0,

            Number(

                dados.moedas || 0

            )

        );

    dados.moedas +=

        PETTON_MOEDAS_BRINCAR;

    salvarPetton(dados);

    return true;

}

/* =========================================================

   CARINHO

   ========================================================= */

function carinho() {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return false;

    }

    if (dados.doente) {

        return false;

    }

    if (dados.hospitalAte) {

        return false;

    }

    dados.felicidade =

        Math.min(

            100,

            dados.felicidade + 10

        );

    dados.pontos += 2;

    dados.moedas =

        Math.max(

            0,

            Number(

                dados.moedas || 0

            )

        );

    dados.moedas +=

        PETTON_MOEDAS_CARINHO;

    salvarPetton(dados);

    return true;

}

/* =========================================================

   DORMIR

   ========================================================= */

function dormir() {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return false;

    }

    if (dados.doente) {

        return false;

    }

    if (dados.hospitalAte) {

        return false;

    }

    dados.energia =

        Math.min(

            100,

            dados.energia + 30

        );

    dados.felicidade =

        Math.min(

            100,

            dados.felicidade + 5

        );

    salvarPetton(dados);

    return true;

}

/* =========================================================

   LIMPAR / BANHO

   ========================================================= */

function limpar() {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return false;

    }

    dados.higiene =

        Math.min(

            100,

            dados.higiene + 30

        );

    dados.saude =

        Math.min(

            100,

            dados.saude + 5

        );

    dados.pontos += 3;

    dados.moedas =

        Math.max(

            0,

            Number(

                dados.moedas || 0

            )

        );

    dados.moedas +=

        PETTON_MOEDAS_LIMPAR;

    salvarPetton(dados);

    return true;

}

/* =========================================================

   LIMPAR COCÔ

   ========================================================= */

function limparCoco() {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return false;

    }

    if (!dados.cocoAtivo) {

        return false;

    }

    dados.cocoAtivo =

        false;

    dados.cocoNasceuEm =

        null;

    dados.higiene =

        Math.min(

            100,

            dados.higiene + 20

        );

    dados.pontos += 5;

    dados.moedas =

        Math.max(

            0,

            Number(

                dados.moedas || 0

            )

        );

    dados.moedas +=

        PETTON_MOEDAS_LIMPAR_COCO;

    salvarPetton(dados);

    return true;

}

/* =========================================================

   ESCOVAR DENTES

   ========================================================= */

function escovarDentes() {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return false;

    }

    if (!dados.carieAtiva) {

        return false;

    }

    if (dados.escovandoAte) {

        return false;

    }

    dados.escovandoAte =

        Date.now() + 3000;

    salvarPetton(dados);

    return true;

}

/* =========================================================

   PASSEAR

   ========================================================= */

function passear() {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return false;

    }

    if (dados.doente) {

        return false;

    }

    if (dados.hospitalAte) {

        return false;

    }

    if (

        dados.passeandoAte &&

        dados.passeandoAte >

        Date.now()

    ) {

        return false;

    }

    dados.passeandoAte =

        Date.now() +

        PETTON_PASSEIO_MS;

    dados.felicidade =

        Math.min(

            100,

            dados.felicidade + 15

        );

    dados.energia =

        Math.max(

            0,

            dados.energia - 8

        );

    dados.higiene =

        Math.max(

            0,

            dados.higiene - 2

        );

    dados.pontos += 5;

    dados.moedas =

        Math.max(

            0,

            Number(

                dados.moedas || 0

            )

        );

    dados.moedas +=

        PETTON_MOEDAS_PASSEAR;

    salvarPetton(dados);

    return true;

}

/* =========================================================

   HOSPITAL

   ========================================================= */

function levarHospital() {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return false;

    }

    if (!dados.doente) {

        return false;

    }

    if (dados.hospitalAte) {

        return false;

    }

    dados.hospitalAte =

        Date.now() +

        PETTON_HOSPITAL_MS;

    salvarPetton(dados);

    return true;

}

/* =========================================================

   ESTADOS

   ========================================================= */

function estaDoente() {

    const dados =

        carregarPetton();

    return !!dados.doente;

}

function temCoco() {

    const dados =

        verificarCoco();

    return !!dados.cocoAtivo;

}

function temCarie() {

    const dados =

        carregarPetton();

    return !!dados.carieAtiva;

}

function estaPasseando() {

    const dados =

        carregarPetton();

    atualizarPasseio(dados);

    return !!(

        dados.passeandoAte &&

        dados.passeandoAte >

        Date.now()

    );

}

function estaEscovando() {

    const dados =

        carregarPetton();

    atualizarEscovacao(dados);

    return !!(

        dados.escovandoAte &&

        dados.escovandoAte >

        Date.now()

    );

}

function estaNoHospital() {

    const dados =

        carregarPetton();

    atualizarHospital(dados);

    return !!(

        dados.hospitalAte &&

        dados.hospitalAte >

        Date.now()

    );

}

/* =========================================================

   STATUS

   ========================================================= */

function statusPetton() {

    let dados =

        atualizarIncubacao();

    dados =

        carregarPetton();

    garantirIdentidadeVisual(

        dados

    );

    garantirAcessorios(dados);

    verificarCoco();

    verificarDoenca(

        dados

    );

    verificarCarie(

        dados

    );

    atualizarHospital(

        dados

    );

    atualizarPasseio(

        dados

    );

    atualizarEscovacao(

        dados

    );

    const dias =

        calcularIdadeDiasDireto(

            dados

        );

    dados.nascido =

        !!dados.dateNascimento;

    dados.idadeDias =

        dias;

    dados.idadeTexto =

        obterIdadeTexto(

            dados

        );

    if (dados.dateNascimento) {

        dados.fase =

            descobrirFase(

                dias

            );

    } else {

        dados.fase =

            "ovo";

    }

    salvarPetton(dados);

    return carregarPetton();

}

/* =========================================================

   IDENTIDADE

   ========================================================= */

function identidadePetton() {

    const dados =

        carregarPetton();

    garantirIdentidadeVisual(

        dados

    );

    garantirAcessorios(dados);

    salvarPetton(dados);

    const dias =

        calcularIdadeDiasDireto(

            dados

        );

    return {

        id:

            dados.identidadeVisual

                ? dados.identidadeVisual.id

                : null,

        seed:

            dados.identidadeVisual

                ? dados.identidadeVisual.seed

                : null,

        especie:

            dados.especie,

        nome:

            dados.nome,

        fase:

            dados.fase,

        idadeDias:

            dias,

        idadeTexto:

            obterIdadeTexto(

                dados

            ),

        nascido:

            !!dados.dateNascimento,

        identidadeVisual:

            dados.identidadeVisual,

        descricaoVisual:

            dados.identidadeVisual

                ? dados.identidadeVisual.descricaoBase

                : null,

        caracteristicas:

            dados.caracteristicas,

        /* ACESSÓRIOS */

        acessorios:

            dados.acessorios,

        moedas:

            Number(

                dados.moedas || 0

            ),

        pontos:

            Number(

                dados.pontos || 0

            ),

        doente:

            dados.doente,

        cocoAtivo:

            dados.cocoAtivo,

        carieAtiva:

            dados.carieAtiva,

        passeando:

            !!(

                dados.passeandoAte &&

                dados.passeandoAte >

                Date.now()

            ),

        noHospital:

            !!(

                dados.hospitalAte &&

                dados.hospitalAte >

                Date.now()

            ),

        escovando:

            !!(

                dados.escovandoAte &&

                dados.escovandoAte >

                Date.now()

            )

    };

}

/* =========================================================

   ÁLBUM

   ========================================================= */

function atualizarAlbum() {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return dados.album || [];

    }

    const dias =

        calcularIdadeDiasDireto(

            dados

        );

    const momentos = [

        0,

        3,

        7,

        15,

        30,

        60,

        90,

        120

    ];

    if (!Array.isArray(dados.album)) {

        dados.album = [];

    }

    momentos.forEach(

        function (dia) {

            if (dias >= dia) {

                const jaExiste =

                    dados.album.some(

                        function (foto) {

                            return foto.dia === dia;

                        }

                    );

                if (!jaExiste) {

                    dados.album.push({

                        dia: dia,

                        data:

                            new Date()

                                .toISOString(),

                        especie:

                            dados.especie,

                        fase:

                            dados.fase,

                        identidadeVisual:

                            dados.identidadeVisual,

                        imagem:

                            dados.identidadeVisual &&

                            dados.identidadeVisual.imagens

                                ? dados.identidadeVisual

                                    .imagens[

                                        dados.fase

                                    ] || null

                                : null

                    });

                }

            }

        }

    );

    salvarPetton(dados);

    return dados.album;

}

/* =========================================================

   DEFINIR IMAGEM

   ========================================================= */

function definirImagemGerada(

    fase,

    imagem

) {

    const dados =

        carregarPetton();

    garantirIdentidadeVisual(

        dados

    );

    if (

        !dados.identidadeVisual ||

        !dados.identidadeVisual.imagens

    ) {

        return false;

    }

    const fasesValidas = [

        "ovo",

        "bebe",

        "filhote",

        "jovem",

        "adulto"

    ];

    if (

        !fasesValidas.includes(

            fase

        )

    ) {

        return false;

    }

    if (

        typeof imagem !== "string" ||

        !imagem.trim()

    ) {

        return false;

    }

    dados.identidadeVisual.imagens[

        fase

    ] =

        imagem.trim();

    salvarPetton(dados);

    return true;

}

/* =========================================================

   OBTER IMAGEM

   ========================================================= */

function obterImagemFase(fase) {

    const dados =

        carregarPetton();

    garantirIdentidadeVisual(

        dados

    );

    if (

        !dados.identidadeVisual ||

        !dados.identidadeVisual.imagens

    ) {

        return null;

    }

    return dados.identidadeVisual.imagens[

        fase

    ] || null;

}

/* =========================================================

   PROMPT VISUAL

   ========================================================= */

function obterPromptVisual(fase) {

    const dados =

        carregarPetton();

    garantirIdentidadeVisual(

        dados

    );

    return criarPromptFasePetton(

        fase || dados.fase

    );

}

/* =========================================================

   RESETAR

   ========================================================= */

function resetarPetton() {

    const novo =

        criarPettonNovo();

    salvarPetton(novo);

    return novo;

}

/* =========================================================

   API PETTON

   ========================================================= */

window.Petton = {

    get dados() {

        return carregarPetton();

    },

    salvar: function (dados) {

        const atual =

            dados ||

            carregarPetton();

        salvarPetton(atual);

        return atual;

    },

    carregar: function () {

        return carregarPetton();

    },

    carregarPetton: function () {

        return carregarPetton();

    },

    nascer: function () {

        return nascerPetton();

    },

    testarNascimento: function () {

        return testarNascimentoPetton();

    },

    definirNome: function (nome) {

        return definirNome(nome);

    },

    /* =========================

       CUIDADOS

    ========================= */

    alimentar: function () {

        return alimentar();

    },

    brincar: function () {

        return brincar();

    },

    carinho: function () {

        return carinho();

    },

    dormir: function () {

        return dormir();

    },

    limpar: function () {

        return limpar();

    },

    limparCoco: function () {

        return limparCoco();

    },

    temCoco: function () {

        return temCoco();

    },

    escovarDentes: function () {

        return escovarDentes();

    },

    temCarie: function () {

        return temCarie();

    },

    estaEscovando: function () {

        return estaEscovando();

    },

    passear: function () {

        return passear();

    },

    estaPasseando: function () {

        return estaPasseando();

    },

    levarHospital: function () {

        return levarHospital();

    },

    estaDoente: function () {

        return estaDoente();

    },

    estaNoHospital: function () {

        return estaNoHospital();

    },

    /* =========================

       STATUS

    ========================= */

    status: function () {

        return statusPetton();

    },

    identidade: function () {

        return identidadePetton();

    },

    verificarCrescimento: function () {

        return verificarCrescimento();

    },

    atualizarCaracteristicas: function () {

        return atualizarCaracteristicasVisiveis();

    },

    idadeDias: function () {

        return idadeDias();

    },

    idadeTexto: function () {

        return obterIdadeTexto(

            carregarPetton()

        );

    },

    fase: function () {

        return carregarPetton().fase;

    },

    /* =========================

       MOEDAS

    ========================= */

    moedas: function () {

        return obterMoedasPetton();

    },

    adicionarMoedas: function (valor) {

        return adicionarMoedasPetton(

            valor

        );

    },

    gastarMoedas: function (valor) {

        return gastarMoedasPetton(

            valor

        );

    },

    /* =========================

       ÁLBUM

    ========================= */

    album: function () {

        return atualizarAlbum();

    },

    /* =========================

       IDENTIDADE VISUAL

    ========================= */

    identidadeVisual: function () {

        const dados =

            carregarPetton();

        garantirIdentidadeVisual(

            dados

        );

        salvarPetton(dados);

        return dados.identidadeVisual;

    },

    descricaoVisual: function () {

        const dados =

            carregarPetton();

        garantirIdentidadeVisual(

            dados

        );

        if (!dados.identidadeVisual) {

            return null;

        }

        return criarDescricaoVisualPetton(

            dados.identidadeVisual

        );

    },

    promptVisual: function (fase) {

        return obterPromptVisual(

            fase

        );

    },

    definirImagem: function (

        fase,

        imagem

    ) {

        return definirImagemGerada(

            fase,

            imagem

        );

    },

    obterImagem: function (fase) {

        return obterImagemFase(

            fase

        );

    },

    /* =========================

       ACESSÓRIOS

    ========================= */

    acessorios: function () {

        return obterAcessoriosPetton();

    },

    acessorio: function (tipo) {

        return obterAcessorioPetton(

            tipo

        );

    },

    equiparAcessorio: function (

        tipo,

        id

    ) {

        return equiparAcessorio(

            tipo,

            id

        );

    },

    removerAcessorio: function (

        tipo

    ) {

        return removerAcessorio(

            tipo

        );

    },

    posicaoAcessorio: function (

        tipo,

        fase

    ) {

        return posicaoAcessorioPetton(

            tipo,

            fase

        );

    },

    tiposAcessorios: function () {

        return PETTON_TIPOS_ACESSORIOS.slice();

    },

    /* =========================

       INCUBAÇÃO

    ========================= */

    incubacaoRestante: function () {

        return tempoIncubacaoRestante();

    },

    ligarAquecedor: function () {

        return ligarAquecedor();

    },

    aquecedorAtivo: function () {

        return aquecedorAtivo();

    },

    aquecedorRestante: function () {

        return tempoAquecedorRestante();

    },

    /* =========================

       RESET

    ========================= */

    resetar: function () {

        return resetarPetton();

    }

};

/* =========================================================

   ATUALIZAÇÃO AUTOMÁTICA

   ========================================================= */

setInterval(

    function () {

        try {

            let dados =

                atualizarIncubacao();

            dados =

                carregarPetton();

            garantirIdentidadeVisual(

                dados

            );

            garantirAcessorios(dados);

            verificarCoco();

            if (dados.dateNascimento) {

                atualizarTempo();

                verificarCrescimento();

                atualizarAlbum();

            } else {

                dados.fase =

                    "ovo";

                salvarPetton(

                    dados

                );

            }

        } catch (erro) {

            console.error(

                "Erro na atualização automática:",

                erro

            );

        }

    },

    60 * 1000

);

/* =========================================================

   INICIALIZAÇÃO

   ========================================================= */

try {

    let dadosInicial =

        carregarPetton();

    garantirIdentidadeVisual(

        dadosInicial

    );

    garantirAcessorios(

        dadosInicial

    );

    dadosInicial =

        atualizarIncubacao();

    dadosInicial =

        carregarPetton();

    if (

        dadosInicial.dateNascimento

    ) {

        verificarCrescimento();

        atualizarAlbum();

        dadosInicial =

            carregarPetton();

        verificarDoenca(

            dadosInicial

        );

        verificarCarie(

            dadosInicial

        );

        verificarCoco();

        atualizarHospital(

            dadosInicial

        );

        atualizarPasseio(

            dadosInicial

        );

        atualizarEscovacao(

            dadosInicial

        );

        salvarPetton(

            dadosInicial

        );

    } else {

        dadosInicial.fase =

            "ovo";

        salvarPetton(

            dadosInicial

        );

    }

} catch (erro) {

    console.error(

        "Erro ao iniciar Petton:",

        erro

    );

}
/* =========================================================

   PETTON - CONTROLE DE TEMPO REAL CORRIGIDO

========================================================= */

function limitarStatusPetton(valor) {

    valor = Number(valor);

    if (!Number.isFinite(valor)) {

        return 0;

    }

    return Math.max(0, Math.min(100, valor));

}

function calcularPassosTempoPetton(

    agora,

    ultimo,

    intervalo

) {

    ultimo = Number(ultimo);

    if (

        !Number.isFinite(ultimo) ||

        ultimo <= 0 ||

        ultimo > agora

    ) {

        return {

            passos: 0,

            novoUltimo: agora

        };

    }

    const diferenca =

        Math.max(0, agora - ultimo);

    const passos =

        Math.floor(

            diferenca / intervalo

        );

    return {

        passos: passos,

        novoUltimo:

            ultimo +

            (passos * intervalo)

    };

}

function garantirControleTempoPetton(dados) {

    if (!dados) {

        return dados;

    }

    const agora = Date.now();

    if (

        !dados.tempoStatusV2 ||

        typeof dados.tempoStatusV2 !== "object" ||

        Array.isArray(dados.tempoStatusV2)

    ) {

        dados.tempoStatusV2 = {

            fome: agora,

            felicidade: agora,

            energia: agora,

            higiene: agora,

            saudeRisco: agora,

            doente: agora,

            cocoHigiene: agora

        };

        return dados;

    }

    const campos = [

        "fome",

        "felicidade",

        "energia",

        "higiene",

        "saudeRisco",

        "doente",

        "cocoHigiene"

    ];

    campos.forEach(function (campo) {

        if (

            typeof dados.tempoStatusV2[campo] !== "number" ||

            !Number.isFinite(

                dados.tempoStatusV2[campo]

            ) ||

            dados.tempoStatusV2[campo] <= 0 ||

            dados.tempoStatusV2[campo] > agora

        ) {

            dados.tempoStatusV2[campo] =

                agora;

        }

    });

    return dados;

}

/* =========================================================

   DOENÇA CORRIGIDA

========================================================= */

verificarDoenca = function (dados) {

    if (

        !dados ||

        !dados.dateNascimento

    ) {

        return dados;

    }

    const agora = Date.now();

    if (

        !dados.doente &&

        dados.cocoAtivo &&

        dados.cocoNasceuEm

    ) {

        const tempoCoco =

            agora -

            Number(dados.cocoNasceuEm);

        if (

            Number.isFinite(tempoCoco) &&

            tempoCoco >=

                PETTON_COCO_DOENCA_MS

        ) {

            dados.doente = true;

            dados.doenteDesde =

                agora;

            dados.saude =

                Math.min(

                    limitarStatusPetton(

                        dados.saude

                    ),

                    35

                );

            dados.felicidade =

                Math.min(

                    limitarStatusPetton(

                        dados.felicidade

                    ),

                    40

                );

            garantirControleTempoPetton(

                dados

            );

            dados.tempoStatusV2.doente =

                agora;

        }

    }

    if (

        !dados.doente &&

        limitarStatusPetton(

            dados.saude

        ) <= 10

    ) {

        dados.doente = true;

        dados.doenteDesde =

            dados.doenteDesde ||

            agora;

        garantirControleTempoPetton(

            dados

        );

        dados.tempoStatusV2.doente =

            agora;

    }

    return dados;

};

/* =========================================================

   TEMPO REAL

========================================================= */

atualizarTempo = function () {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return dados;

    }

    garantirControleTempoPetton(

        dados

    );

    const agora = Date.now();

    const tempo =

        dados.tempoStatusV2;

    let calculo =

        calcularPassosTempoPetton(

            agora,

            tempo.fome,

            PETTON_TEMPO_FOME_MS

        );

    if (calculo.passos > 0) {

        dados.fome =

            limitarStatusPetton(

                Number(

                    dados.fome || 0

                ) -

                calculo.passos

            );

        tempo.fome =

            calculo.novoUltimo;

    }

    calculo =

        calcularPassosTempoPetton(

            agora,

            tempo.felicidade,

            PETTON_TEMPO_FELICIDADE_MS

        );

    if (calculo.passos > 0) {

        dados.felicidade =

            limitarStatusPetton(

                Number(

                    dados.felicidade || 0

                ) -

                calculo.passos

            );

        tempo.felicidade =

            calculo.novoUltimo;

    }

    calculo =

        calcularPassosTempoPetton(

            agora,

            tempo.energia,

            PETTON_TEMPO_ENERGIA_MS

        );

    if (calculo.passos > 0) {

        dados.energia =

            limitarStatusPetton(

                Number(

                    dados.energia || 0

                ) -

                calculo.passos

            );

        tempo.energia =

            calculo.novoUltimo;

    }

    calculo =

        calcularPassosTempoPetton(

            agora,

            tempo.higiene,

            PETTON_TEMPO_HIGIENE_MS

        );

    if (calculo.passos > 0) {

        dados.higiene =

            limitarStatusPetton(

                Number(

                    dados.higiene || 0

                ) -

                calculo.passos

            );

        tempo.higiene =

            calculo.novoUltimo;

    }

    /* COCÔ */

    if (

        dados.cocoAtivo &&

        dados.cocoNasceuEm

    ) {

        const nascimentoCoco =

            Number(

                dados.cocoNasceuEm

            );

        const inicioPenalidade =

            nascimentoCoco +

            PETTON_COCO_ALERTA_MS;

        if (

            Number.isFinite(

                nascimentoCoco

            ) &&

            agora >= inicioPenalidade

        ) {

            let ultimoCoco =

                Number(

                    tempo.cocoHigiene

                );

            if (

                !Number.isFinite(

                    ultimoCoco

                ) ||

                ultimoCoco <

                    inicioPenalidade

            ) {

                ultimoCoco =

                    inicioPenalidade;

            }

            const calculoCoco =

                calcularPassosTempoPetton(

                    agora,

                    ultimoCoco,

                    PETTON_TEMPO_COCO_HIGIENE_MS

                );

            if (

                calculoCoco.passos > 0

            ) {

                dados.higiene =

                    limitarStatusPetton(

                        Number(

                            dados.higiene ||

                            0

                        ) -

                        calculoCoco.passos

                    );

                tempo.cocoHigiene =

                    calculoCoco.novoUltimo;

            }

        }

    } else {

        tempo.cocoHigiene =

            agora;

    }

    /* SAÚDE */

    const emRisco =

        Number(dados.fome) < 20 ||

        Number(dados.higiene) < 20;

    if (emRisco) {

        const calculoSaude =

            calcularPassosTempoPetton(

                agora,

                tempo.saudeRisco,

                PETTON_TEMPO_SAUDE_RISCO_MS

            );

        if (

            calculoSaude.passos > 0

        ) {

            dados.saude =

                limitarStatusPetton(

                    Number(

                        dados.saude || 0

                    ) -

                    calculoSaude.passos

                );

            tempo.saudeRisco =

                calculoSaude.novoUltimo;

        }

    } else {

        tempo.saudeRisco =

            agora;

    }

    verificarDoenca(dados);

    /* DOENTE */

    if (dados.doente) {

        const calculoDoente =

            calcularPassosTempoPetton(

                agora,

                tempo.doente,

                PETTON_TEMPO_DOENTE_MS

            );

        if (

            calculoDoente.passos > 0

        ) {

            dados.felicidade =

                limitarStatusPetton(

                    Number(

                        dados.felicidade ||

                        0

                    ) -

                    calculoDoente.passos

                );

            dados.energia =

                limitarStatusPetton(

                    Number(

                        dados.energia || 0

                    ) -

                    calculoDoente.passos

                );

            dados.saude =

                limitarStatusPetton(

                    Number(

                        dados.saude || 0

                    ) -

                    calculoDoente.passos

                );

            tempo.doente =

                calculoDoente.novoUltimo;

        }

    } else {

        tempo.doente =

            agora;

    }

    verificarCarie(dados);

    atualizarHospital(dados);

    atualizarPasseio(dados);

    atualizarEscovacao(dados);

    salvarPetton(dados);

    return dados;

};

/* =========================================================

   REGRAS DAS AÇÕES

========================================================= */

alimentar = function () {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return false;

    }

    if (

        dados.doente ||

        dados.hospitalAte

    ) {

        return false;

    }

    if (

        Number(dados.fome) >= 90

    ) {

        return false;

    }

    dados.fome =

        Math.min(

            100,

            Number(

                dados.fome || 0

            ) + 20

        );

    dados.saude =

        Math.min(

            100,

            Number(

                dados.saude || 0

            ) + 2

        );

    darRecompensa(

        dados,

        5,

        PETTON_MOEDAS_ALIMENTAR

    );

    dados.ultimaAlimentacaoEm =

        Date.now();

    salvarPetton(dados);

    return true;

};

brincar = function () {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return false;

    }

    if (

        dados.doente ||

        dados.hospitalAte

    ) {

        return false;

    }

    if (

        Number(

            dados.felicidade

        ) >= 90

    ) {

        return false;

    }

    if (

        Number(

            dados.energia

        ) < 15

    ) {

        return false;

    }

    dados.felicidade =

        Math.min(

            100,

            Number(

                dados.felicidade || 0

            ) + 20

        );

    dados.energia =

        Math.max(

            0,

            Number(

                dados.energia || 0

            ) - 10

        );

    dados.higiene =

        Math.max(

            0,

            Number(

                dados.higiene || 0

            ) - 1

        );

    darRecompensa(

        dados,

        5,

        PETTON_MOEDAS_BRINCAR

    );

    salvarPetton(dados);

    return true;

};

carinho = function () {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return false;

    }

    if (

        dados.doente ||

        dados.hospitalAte

    ) {

        return false;

    }

    if (

        Number(

            dados.felicidade

        ) >= 95

    ) {

        return false;

    }

    dados.felicidade =

        Math.min(

            100,

            Number(

                dados.felicidade || 0

            ) + 10

        );

    darRecompensa(

        dados,

        2,

        PETTON_MOEDAS_CARINHO

    );

    salvarPetton(dados);

    return true;

};

dormir = function () {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return false;

    }

    if (

        dados.doente ||

        dados.hospitalAte

    ) {

        return false;

    }

    if (

        Number(

            dados.energia

        ) >= 90

    ) {

        return false;

    }

    dados.energia =

        Math.min(

            100,

            Number(

                dados.energia || 0

            ) + 30

        );

    dados.felicidade =

        Math.min(

            100,

            Number(

                dados.felicidade || 0

            ) + 5

        );

    salvarPetton(dados);

    return true;

};

limpar = function () {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return false;

    }

    if (dados.hospitalAte) {

        return false;

    }

    if (

        Number(

            dados.higiene

        ) >= 90

    ) {

        return false;

    }

    dados.higiene =

        Math.min(

            100,

            Number(

                dados.higiene || 0

            ) + 30

        );

    dados.saude =

        Math.min(

            100,

            Number(

                dados.saude || 0

            ) + 5

        );

    darRecompensa(

        dados,

        3,

        PETTON_MOEDAS_LIMPAR

    );

    salvarPetton(dados);

    return true;

};

passear = function () {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return false;

    }

    if (

        dados.doente ||

        dados.hospitalAte

    ) {

        return false;

    }

    if (

        dados.passeandoAte &&

        dados.passeandoAte >

            Date.now()

    ) {

        return false;

    }

    if (

        Number(

            dados.energia

        ) < 20

    ) {

        return false;

    }

    if (

        Number(

            dados.felicidade

        ) >= 90

    ) {

        return false;

    }

    dados.passeandoAte =

        Date.now() +

        PETTON_PASSEIO_MS;

    dados.felicidade =

        Math.min(

            100,

            Number(

                dados.felicidade || 0

            ) + 15

        );

    dados.energia =

        Math.max(

            0,

            Number(

                dados.energia || 0

            ) - 8

        );

    dados.higiene =

        Math.max(

            0,

            Number(

                dados.higiene || 0

            ) - 2

        );

    darRecompensa(

        dados,

        5,

        PETTON_MOEDAS_PASSEAR

    );

    salvarPetton(dados);

    return true;

};

/* =========================================================

   INICIAR CONTROLE DE TEMPO

========================================================= */

try {

    const dadosTempoInicial =

        carregarPetton();

    if (

        dadosTempoInicial.dateNascimento

    ) {

        garantirControleTempoPetton(

            dadosTempoInicial

        );

        salvarPetton(

            dadosTempoInicial

        );

        atualizarTempo();

    }

} catch (erro) {

    console.error(

        "Erro ao iniciar tempo real V2:",

        erro

    );

}
