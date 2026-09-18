/* =========================================================

   PETTON 🐾

   Sistema principal do Petton

   ========================================================= */

const PETTON_CHAVE = "petton_dados_v3";

/* =========================================================

   CONFIGURAÇÕES DO OVO

   ========================================================= */

const PETTON_INCUBACAO_MS = 24 * 60 * 60 * 1000; // 24 horas

const PETTON_AQUECEDOR_DURACAO_MS = 2 * 60 * 1000; // 2 minutos

const PETTON_AQUECEDOR_MULTIPLICADOR = 5;

/* =========================================================

   FUNÇÕES AUXILIARES

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

   CRIAR PETTON

   ========================================================= */

function criarPettonNovo() {

    const agora = Date.now();

    return {

        especie: escolherEspecie(),

        nome: "Mimi",

        fase: "ovo",

        dateNascimento: null,

        dataCriacao: new Date(agora).toISOString(),

        /* INCUBAÇÃO */

        incubacaoRestanteMs: PETTON_INCUBACAO_MS,

        incubacaoAtualizadaEm: agora,

        aquecedorAte: null,

        /* NECESSIDADES */

        fome: 70,

        felicidade: 100,

        energia: 100,

        higiene: 100,

        saude: 100,

        /* PROGRESSO */

        moedas: 100,

        pontos: 0,

        nivel: 1,

        /* CARACTERÍSTICAS */

        caracteristicas: {

            cor: false,

            orelhas: false,

            olhos: false,

            nariz: false,

            padrao: false,

            patas: false,

            cauda: false

        },

        /* ÁLBUM */

        album: []

    };

}

/* =========================================================

   CARREGAR PETTON

   ========================================================= */

function carregarPetton() {

    const salvo =

        localStorage.getItem(PETTON_CHAVE);

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

        /* -------------------------

           MIGRAÇÃO

        ------------------------- */

        if (!dados.dateNascimento) {

            dados.fase = "ovo";

            if (

                typeof dados.incubacaoRestanteMs !== "number" ||

                !Number.isFinite(dados.incubacaoRestanteMs)

            ) {

                dados.incubacaoRestanteMs =

                    PETTON_INCUBACAO_MS;

            }

            if (

                typeof dados.incubacaoAtualizadaEm !== "number" ||

                !Number.isFinite(dados.incubacaoAtualizadaEm)

            ) {

                /*

                 * Se existe data de criação,

                 * usamos ela como referência.

                 */

                if (dados.dataCriacao) {

                    const criacao =

                        new Date(

                            dados.dataCriacao

                        ).getTime();

                    if (Number.isFinite(criacao)) {

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

        /* CARACTERÍSTICAS */

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

        /* ÁLBUM */

        if (!Array.isArray(dados.album)) {

            dados.album = [];

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

    /* Já nasceu */

    if (dados.dateNascimento) {

        return dados;

    }

    const agora =

        Date.now();

    /*

     * Garante um timestamp válido.

     */

    if (

        typeof dados.incubacaoAtualizadaEm !== "number" ||

        !Number.isFinite(dados.incubacaoAtualizadaEm)

    ) {

        dados.incubacaoAtualizadaEm =

            agora;

    }

    /*

     * Tempo real passado.

     */

    let tempoPassado =

        agora -

        dados.incubacaoAtualizadaEm;

    if (

        !Number.isFinite(tempoPassado) ||

        tempoPassado < 0

    ) {

        tempoPassado = 0;

    }

    /*

     * Aquecedor.

     */

    const aquecedorLigado =

        dados.aquecedorAte &&

        dados.aquecedorAte > agora;

    /*

     * Se terminou, desliga.

     */

    if (

        dados.aquecedorAte &&

        dados.aquecedorAte <= agora

    ) {

        dados.aquecedorAte = null;

    }

    /*

     * Multiplicador.

     */

    const multiplicador =

        aquecedorLigado

            ? PETTON_AQUECEDOR_MULTIPLICADOR

            : 1;

    /*

     * DESCONTA O TEMPO REAL.

     */

    const desconto =

        tempoPassado *

        multiplicador;

    dados.incubacaoRestanteMs =

        Math.max(

            0,

            dados.incubacaoRestanteMs -

            desconto

        );

    /*

     * IMPORTANTE:

     * marca exatamente o momento desta atualização.

     */

    dados.incubacaoAtualizadaEm =

        agora;

    /*

     * Nasceu.

     */

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

    /*

     * Escolhe a espécie no nascimento.

     */

    dados.especie =

        escolherEspecie();

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

   NASCER — API

   ========================================================= */

function nascerPetton() {

    const dados =

        carregarPetton();

    if (dados.dateNascimento) {

        return dados;

    }

    dados.incubacaoRestanteMs =

        0;

    nascerPettonInterno(dados);

    return carregarPetton();

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

            (1000 * 60 * 60 * 24)

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

    const dias =

        idadeDias();

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

   NECESSIDADES

   ========================================================= */

function atualizarTempo() {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

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

   LIMPAR

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

   STATUS

   ========================================================= */

function statusPetton() {

    const dados =

        atualizarIncubacao();

    verificarCrescimento();

    return carregarPetton();

}

/* =========================================================

   IDENTIDADE

   ========================================================= */

function identidadePetton() {

    const dados =

        carregarPetton();

    return {

        especie: dados.especie,

        nome: dados.nome,

        fase: dados.fase,

        idadeDias: idadeDias()

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

    momentos.forEach(function (dia) {

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

                        new Date().toISOString(),

                    especie:

                        dados.especie,

                    fase:

                        dados.fase

                });

            }

        }

    });

    salvarPetton(dados);

    return dados.album;

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

    fase: function () {

        return carregarPetton().fase;

    },

    album: function () {

        return atualizarAlbum();

    },

    /* OVO */

    incubacaoRestante: function () {

        return tempoIncubacaoRestante();

    },

    /* AQUECEDOR */

    ligarAquecedor: function () {

        return ligarAquecedor();

    },

    aquecedorAtivo: function () {

        return aquecedorAtivo();

    },

    aquecedorRestante: function () {

        return tempoAquecedorRestante();

    },

    /* RESET */

    resetar: function () {

        return resetarPetton();

    }

};

/* =========================================================

   ATUALIZAÇÃO AUTOMÁTICA

   ========================================================= */

setInterval(function () {

    try {

        const dados =

            atualizarIncubacao();

        if (dados.dateNascimento) {

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

}, 60 * 1000);

/* =========================================================

   INICIALIZAÇÃO

   ========================================================= */

try {

    atualizarIncubacao();

    verificarCrescimento();

    atualizarAlbum();

} catch (erro) {

    console.error(

        "Erro ao iniciar Petton:",

        erro

    );

}
