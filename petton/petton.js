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

   ESPÉCIES

   ========================================================= */

function escolherEspecie() {

    const especies = [

        "gato",

        "cachorro",

        "coelho"

    ];

    return especies[

        Math.floor(

            Math.random() * especies.length

        )

    ];

}

/* =========================================================

   UTILITÁRIOS VISUAIS

   ========================================================= */

function escolherItem(lista) {

    if (!Array.isArray(lista) || !lista.length) {

        return null;

    }

    return lista[

        Math.floor(

            Math.random() * lista.length

        )

    ];

}

function gerarIdVisual() {

    return (

        "petton-" +

        Date.now().toString(36) +

        "-" +

        Math.random()

            .toString(36)

            .substring(2, 10)

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

    /*

     * O DNA é sorteado uma única vez.

     * Depois fica salvo no Petton.

     */

    const identidade = {

        id: gerarIdVisual(),

        /*

         * Seed permanente.

         * Serve para futuras gerações de imagens

         * manterem o mesmo personagem.

         */

        seed:

            Date.now().toString(36) +

            "-" +

            Math.random()

                .toString(36)

                .substring(2, 12),

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

        /*

         * Marca exclusiva.

         */

        marca:

            escolherItem([

                "nenhuma marca especial",

                "pequena mancha na testa",

                "pequena mancha na bochecha",

                "pequena mancha perto do olho",

                "pequena marca no peito",

                "pequena mancha na orelha"

            ]),

        /*

         * Acessório não é obrigatório.

         */

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

        /*

         * Expressão característica.

         */

        expressao:

            escolherItem([

                "fofa",

                "curiosa",

                "alegre",

                "tranquila",

                "brincalhona",

                "carinhosa"

            ]),

        /*

         * Formato geral permanece Petton.

         */

        estiloBase:

            "Petton fofo, corpo compacto, aparência infantil e amigável",

        /*

         * Imagens das fases.

         *

         * Inicialmente ficam vazias.

         * Serão preenchidas quando as imagens

         * individuais forem geradas.

         */

        imagens: {

            ovo: null,

            bebe: null,

            filhote: null,

            jovem: null,

            adulto: null

        },

        /*

         * Prompt/base visual permanente.

         */

        descricaoBase: null

    };

    identidade.descricaoBase =

        criarDescricaoVisualPetton(

            identidade

        );

    return identidade;

}

/* =========================================================

   DESCRIÇÃO VISUAL DO PETTON

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

        identidade.marca || "nenhuma marca especial";

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

        ". " +

        "Manter exatamente essas características " +

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

    if (!dados || !dados.dateNascimento) {

        return dados;

    }

    /*

     * Petton antigo sem identidade.

     */

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

    /*

     * Compatibilidade com versões antigas.

     */

    if (!identidade.id) {

        identidade.id =

            gerarIdVisual();

    }

    if (!identidade.seed) {

        identidade.seed =

            Date.now().toString(36) +

            "-" +

            Math.random()

                .toString(36)

                .substring(2, 12);

    }

    if (!identidade.especie) {

        identidade.especie =

            dados.especie;

    }

    if (!identidade.cor) {

        identidade.cor = "branco";

    }

    if (!identidade.corSecundaria) {

        identidade.corSecundaria =

            "branco";

    }

    if (!identidade.padrao) {

        identidade.padrao =

            "liso";

    }

    if (!identidade.olhos) {

        identidade.olhos =

            "grandes";

    }

    if (!identidade.orelhas) {

        identidade.orelhas =

            "arredondadas";

    }

    if (!identidade.nariz) {

        identidade.nariz =

            "pequeno";

    }

    if (!identidade.patas) {

        identidade.patas =

            "fofinhas";

    }

    if (!identidade.cauda) {

        identidade.cauda =

            "fofa";

    }

    if (!identidade.pelagem) {

        identidade.pelagem =

            "macia";

    }

    if (!identidade.marca) {

        identidade.marca =

            "nenhuma marca especial";

    }

    if (!identidade.acessorio) {

        identidade.acessorio =

            "nenhum";

    }

    if (!identidade.expressao) {

        identidade.expressao =

            "fofa";

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

   CRIAR PETTON

   ========================================================= */

function criarPettonNovo() {

    const agora = Date.now();

    return {

        especie: null,

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

        moedas: 100,

        pontos: 0,

        nivel: 1,

        /*

         * Identidade visual vazia

         * enquanto ainda é ovo.

         */

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

}

/* =========================================================

   GARANTIR NOVOS CAMPOS

   ========================================================= */

function garantirCamposNovos(dados) {

    if (typeof dados.doente !== "boolean") {

        dados.doente = false;

    }

    if (

        typeof dados.doenteDesde ===

        "undefined"

    ) {

        dados.doenteDesde = null;

    }

    if (

        typeof dados.hospitalAte ===

        "undefined"

    ) {

        dados.hospitalAte = null;

    }

    if (

        typeof dados.cocoAtivo !==

        "boolean"

    ) {

        dados.cocoAtivo = false;

    }

    if (

        typeof dados.cocoNasceuEm ===

        "undefined"

    ) {

        dados.cocoNasceuEm = null;

    }

    if (

        typeof dados.carieAtiva !==

        "boolean"

    ) {

        dados.carieAtiva = false;

    }

    if (

        typeof dados.carieNasceuEm ===

        "undefined"

    ) {

        dados.carieNasceuEm = null;

    }

    if (

        typeof dados.ultimaAlimentacaoEm ===

        "undefined"

    ) {

        dados.ultimaAlimentacaoEm = null;

    }

    if (

        typeof dados.passeandoAte ===

        "undefined"

    ) {

        dados.passeandoAte = null;

    }

    if (

        typeof dados.escovandoAte ===

        "undefined"

    ) {

        dados.escovandoAte = null;

    }

    if (

        typeof dados.identidadeVisual ===

        "undefined"

    ) {

        dados.identidadeVisual = null;

    }

    return dados;

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

        localStorage.setItem(

            PETTON_CHAVE,

            JSON.stringify(novo)

        );

        return novo;

    }

    try {

        const dados =

            JSON.parse(salvo);

        if (!dados.dateNascimento) {

            dados.fase = "ovo";

            dados.especie = null;

            dados.nome = null;

            dados.identidadeVisual = null;

            if (

                typeof dados.incubacaoRestanteMs !== "number" ||

                !Number.isFinite(

                    dados.incubacaoRestanteMs

                )

            ) {

                dados.incubacaoRestanteMs =

                    PETTON_INCUBACAO_MS;

            }

            if (

                typeof dados.incubacaoAtualizadaEm !== "number" ||

                !Number.isFinite(

                    dados.incubacaoAtualizadaEm

                )

            ) {

                if (dados.dataCriacao) {

                    const criacao =

                        new Date(

                            dados.dataCriacao

                        ).getTime();

                    if (

                        Number.isFinite(

                            criacao

                        )

                    ) {

                        dados.incubacaoAtualizadaEm =

                            criacao;

                    } else {

                        dados.incubacaoAtualizadaEm =

                            Date.now();

                    }

                } else {

                    dados.incubacaoAtualizadaEm =

                        Date.now();

                }

            }

            if (

                typeof dados.aquecedorAte ===

                "undefined"

            ) {

                dados.aquecedorAte = null;

            }

        }

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

        garantirCamposNovos(dados);

        /*

         * Se já nasceu, garante identidade.

         */

        if (dados.dateNascimento) {

            garantirIdentidadeVisual(

                dados

            );

        }

        return dados;

    } catch (erro) {

        console.error(

            "Erro ao carregar Petton:",

            erro

        );

        const novo =

            criarPettonNovo();

        localStorage.setItem(

            PETTON_CHAVE,

            JSON.stringify(novo)

        );

        return novo;

    }

}

/* =========================================================

   SALVAR

   ========================================================= */

function salvarPetton(dados) {

    localStorage.setItem(

        PETTON_CHAVE,

        JSON.stringify(dados)

    );

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

        typeof dados.incubacaoAtualizadaEm !==

        "number" ||

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

        !Number.isFinite(

            tempoPassado

        ) ||

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

            dados.incubacaoRestanteMs -

            desconto

        );

    dados.incubacaoAtualizadaEm =

        agora;

    if (

        dados.incubacaoRestanteMs <= 0

    ) {

        dados.incubacaoRestanteMs = 0;

        nascerPettonInterno(dados);

        return dados;

    }

    salvarPetton(dados);

    return dados;

}

/* =========================================================

   NASCIMENTO

   ========================================================= */

function nascerPettonInterno(dados) {

    dados.especie =

        escolherEspecie();

    /*

     * CRIA O DNA VISUAL UMA ÚNICA VEZ.

     */

    dados.identidadeVisual =

        criarIdentidadeVisual(

            dados.especie

        );

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

    dados.doente = false;

    dados.doenteDesde = null;

    dados.hospitalAte = null;

    dados.cocoAtivo = false;

    dados.cocoNasceuEm = null;

    dados.carieAtiva = false;

    dados.carieNasceuEm = null;

    dados.ultimaAlimentacaoEm = null;

    dados.passeandoAte = null;

    dados.escovandoAte = null;

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

}

/* =========================================================

   NASCER — API REAL

   ========================================================= */

function nascerPetton() {

    const dados =

        carregarPetton();

    if (dados.dateNascimento) {

        garantirIdentidadeVisual(

            dados

        );

        salvarPetton(dados);

        return dados;

    }

    dados.incubacaoRestanteMs =

        0;

    nascerPettonInterno(dados);

    return carregarPetton();

}

/* =========================================================

   🧪 TESTAR NASCIMENTO

   ========================================================= */

function testarNascimentoPetton() {

    const dados =

        carregarPetton();

    if (dados.dateNascimento) {

        return dados;

    }

    dados.incubacaoRestanteMs =

        0;

    dados.aquecedorAte = null;

    dados.incubacaoAtualizadaEm =

        Date.now();

    salvarPetton(dados);

    return nascerPetton();

}

/* =========================================================

   ESCOLHER NOME

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

            nome.substring(0, 20);

    }

    dados.nome =

        nome;

    salvarPetton(dados);

    return dados;

}

/* =========================================================

   LIGAR AQUECEDOR

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

/* =========================================================

   AQUECEDOR ATIVO

   ========================================================= */

function aquecedorAtivo() {

    const dados =

        atualizarIncubacao();

    if (dados.dateNascimento) {

        return false;

    }

    return !!(

        dados.aquecedorAte &&

        dados.aquecedorAte >

        Date.now()

    );

}

/* =========================================================

   TEMPO AQUECEDOR

   ========================================================= */

function tempoAquecedorRestante() {

    const dados =

        atualizarIncubacao();

    if (!dados.aquecedorAte) {

        return 0;

    }

    return Math.max(

        0,

        dados.aquecedorAte -

        Date.now()

    );

}

/* =========================================================

   TEMPO INCUBAÇÃO

   ========================================================= */

function tempoIncubacaoRestante() {

    const dados =

        atualizarIncubacao();

    if (dados.dateNascimento) {

        return 0;

    }

    return Math.max(

        0,

        dados.incubacaoRestanteMs

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

    if (!dados.dateNascimento) {

        return 0;

    }

    const nascimento =

        new Date(

            dados.dateNascimento

        ).getTime();

    const agora =

        Date.now();

    const diferenca =

        agora -

        nascimento;

    return Math.max(

        0,

        Math.floor(

            diferenca /

            (

                1000 *

                60 *

                60 *

                24

            )

        )

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

    /*

     * A identidade nunca é recriada.

     */

    garantirIdentidadeVisual(

        dados

    );

    const dias =

        idadeDias();

    dados.fase =

        descobrirFase(dias);

    salvarPetton(dados);

    atualizarCaracteristicasVisiveis();

    return dados;

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

    const dias =

        idadeDias();

    /*

     * A identidade já existe desde o nascimento.

     * Aqui controlamos apenas quais elementos

     * aparecem conforme o crescimento.

     */

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

   VERIFICAR DOENÇA

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

            dados.doente = true;

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

    if (

        dados.saude <= 10

    ) {

        dados.doente = true;

        dados.doenteDesde =

            dados.doenteDesde ||

            Date.now();

    }

    return dados;

}

/* =========================================================

   VERIFICAR CÁRIE

   ========================================================= */

function verificarCarie(dados) {

    if (!dados.dateNascimento) {

        return dados;

    }

    if (dados.carieAtiva) {

        return dados;

    }

    if (

        dados.ultimaAlimentacaoEm &&

        !dados.carieAtiva

    ) {

        const tempoDesdeComida =

            Date.now() -

            dados.ultimaAlimentacaoEm;

        if (

            tempoDesdeComida >=

            PETTON_CARIE_APOS_COMER_MS

        ) {

            if (Math.random() < 0.45) {

                dados.carieAtiva = true;

                dados.carieNasceuEm =

                    Date.now();

                dados.ultimaAlimentacaoEm =

                    null;

            } else {

                dados.ultimaAlimentacaoEm =

                    null;

            }

        }

    }

    return dados;

}

/* =========================================================

   FINALIZAR HOSPITAL

   ========================================================= */

function finalizarHospital(dados) {

    dados.hospitalAte = null;

    dados.doente = false;

    dados.doenteDesde = null;

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

/* =========================================================

   ATUALIZAR HOSPITAL

   ========================================================= */

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

   ATUALIZAR PASSEIO

   ========================================================= */

function atualizarPasseio(dados) {

    if (

        dados.passeandoAte &&

        Date.now() >=

        dados.passeandoAte

    ) {

        dados.passeandoAte = null;

        salvarPetton(dados);

    }

    return dados;

}

/* =========================================================

   ATUALIZAR ESCOVAÇÃO

   ========================================================= */

function atualizarEscovacao(dados) {

    if (

        dados.escovandoAte &&

        Date.now() >=

        dados.escovandoAte

    ) {

        dados.escovandoAte = null;

        dados.carieAtiva = false;

        dados.carieNasceuEm = null;

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

        salvarPetton(dados);

    }

    return dados;

}

/* =========================================================

   NECESSIDADES / TEMPO

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

    dados.ultimaAlimentacaoEm =

        Date.now();

    if (!dados.cocoAtivo) {

        dados.cocoAtivo = true;

        dados.cocoNasceuEm =

            Date.now();

    }

    salvarPetton(dados);

    return true;

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

    dados.pontos += 5;

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

   LIMPAR HIGIENE NORMAL

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

    dados.cocoAtivo = false;

    dados.cocoNasceuEm = null;

    dados.higiene =

        Math.min(

            100,

            dados.higiene + 20

        );

    dados.pontos += 5;

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

        carregarPetton();

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

    atualizarIncubacao();

    verificarCrescimento();

    const dados =

        carregarPetton();

    garantirIdentidadeVisual(

        dados

    );

    verificarDoenca(dados);

    verificarCarie(dados);

    atualizarHospital(dados);

    atualizarPasseio(dados);

    atualizarEscovacao(dados);

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

    salvarPetton(dados);

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

            idadeDias(),

        identidadeVisual:

            dados.identidadeVisual,

        /*

         * Descrição visual completa.

         */

        descricaoVisual:

            dados.identidadeVisual

                ? dados.identidadeVisual.descricaoBase

                : null,

        caracteristicas:

            dados.caracteristicas,

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

        idadeDias();

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

                            return (

                                foto.dia ===

                                dia

                            );

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

                        /*

                         * Guarda a imagem correspondente

                         * à fase, quando existir.

                         */

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

   DEFINIR IMAGEM GERADA

   ========================================================= */

function definirImagemGerada(

    fase,

    imagem

) {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return false;

    }

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

        !fasesValidas.includes(fase)

    ) {

        return false;

    }

    if (

        typeof imagem !== "string" ||

        !imagem.trim()

    ) {

        return false;

    }

    dados.identidadeVisual.imagens[fase] =

        imagem.trim();

    salvarPetton(dados);

    return true;

}

/* =========================================================

   OBTER IMAGEM DA FASE

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

    return (

        dados.identidadeVisual.imagens[fase] ||

        null

    );

}

/* =========================================================

   PROMPT VISUAL

   ========================================================= */

function obterPromptVisual(fase) {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return "";

    }

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

    salvar: function () {

        const dados =

            carregarPetton();

        salvarPetton(dados);

        return dados;

    },

    carregar: function () {

        return carregarPetton();

    },

    nascer: function () {

        return nascerPetton();

    },

    /* 🧪 TESTE */

    testarNascimento: function () {

        return testarNascimentoPetton();

    },

    /* NOME */

    definirNome: function (nome) {

        return definirNome(nome);

    },

    /* CUIDADOS */

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

    /* COCÔ */

    limparCoco: function () {

        return limparCoco();

    },

    temCoco: function () {

        return temCoco();

    },

    /* DENTES */

    escovarDentes: function () {

        return escovarDentes();

    },

    temCarie: function () {

        return temCarie();

    },

    estaEscovando: function () {

        return estaEscovando();

    },

    /* PASSEIO */

    passear: function () {

        return passear();

    },

    estaPasseando: function () {

        return estaPasseando();

    },

    /* HOSPITAL */

    levarHospital: function () {

        return levarHospital();

    },

    estaDoente: function () {

        return estaDoente();

    },

    estaNoHospital: function () {

        return estaNoHospital();

    },

    /* STATUS */

    status: function () {

        return statusPetton();

    },

    identidade: function () {

        return identidadePetton();

    },

    verificarCrescimento: function () {

        return verificarCrescimento();

    },

    atualizarCaracteristicas:

        function () {

            return atualizarCaracteristicasVisiveis();

        },

    idadeDias: function () {

        return idadeDias();

    },

    fase: function () {

        return carregarPetton().fase;

    },

    album: function () {

        return atualizarAlbum();

    },

    /* =====================================================

       IDENTIDADE VISUAL

       ===================================================== */

    identidadeVisual:

        function () {

            const dados =

                carregarPetton();

            garantirIdentidadeVisual(

                dados

            );

            salvarPetton(dados);

            return dados.identidadeVisual;

        },

    /* =====================================================

       DESCRIÇÃO VISUAL

       ===================================================== */

    descricaoVisual:

        function () {

            const dados =

                carregarPetton();

            garantirIdentidadeVisual(

                dados

            );

            if (

                !dados.identidadeVisual

            ) {

                return null;

            }

            return criarDescricaoVisualPetton(

                dados.identidadeVisual

            );

        },

    /* =====================================================

       PROMPT DE CADA FASE

       ===================================================== */

    promptVisual:

        function (fase) {

            return obterPromptVisual(

                fase

            );

        },

    /* =====================================================

       IMAGENS

       ===================================================== */

    definirImagem:

        function (fase, imagem) {

            return definirImagemGerada(

                fase,

                imagem

            );

        },

    obterImagem:

        function (fase) {

            return obterImagemFase(

                fase

            );

        },

    /* =====================================================

       OVO

       ===================================================== */

    incubacaoRestante:

        function () {

            return tempoIncubacaoRestante();

        },

    /* =====================================================

       AQUECEDOR

       ===================================================== */

    ligarAquecedor:

        function () {

            return ligarAquecedor();

        },

    aquecedorAtivo:

        function () {

            return aquecedorAtivo();

        },

    aquecedorRestante:

        function () {

            return tempoAquecedorRestante();

        },

    /* =====================================================

       RESET

       ===================================================== */

    resetar:

        function () {

            return resetarPetton();

        }

    };

};

/* =========================================================

   ATUALIZAÇÃO AUTOMÁTICA

   ========================================================= */

setInterval(

    function () {

        try {

            const dados =

                atualizarIncubacao();

            if (dados.dateNascimento) {

                garantirIdentidadeVisual(

                    dados

                );

                atualizarTempo();

                verificarCrescimento();

                atualizarAlbum();

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

    atualizarIncubacao();

    verificarCrescimento();

    atualizarAlbum();

    const dadosInicial =

        carregarPetton();

    if (dadosInicial.dateNascimento) {

        garantirIdentidadeVisual(

            dadosInicial

        );

        verificarDoenca(

            dadosInicial

        );

        verificarCarie(

            dadosInicial

        );

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

    }

} catch (erro) {

    console.error(

        "Erro ao iniciar Petton:",

        erro

    );

}
