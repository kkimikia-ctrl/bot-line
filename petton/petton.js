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
    const especies = ["gato", "cachorro", "coelho"];
    return especies[Math.floor(Math.random() * especies.length)];
}


function criarPettonNovo() {

    return {
        especie: escolherEspecie(),

        nome: "Mimi",

        fase: "ovo",

        dateNascimento: null,

        dataCriacao: new Date().toISOString(),

        /* -------------------------
           INCUBAÇÃO
        ------------------------- */

        incubacaoRestanteMs: PETTON_INCUBACAO_MS,

        incubacaoAtualizadaEm: Date.now(),

        aquecedorAte: null,

        /* -------------------------
           NECESSIDADES
        ------------------------- */

        fome: 70,

        felicidade: 100,

        energia: 100,

        higiene: 100,

        saude: 100,

        /* -------------------------
           PROGRESSO
        ------------------------- */

        moedas: 100,

        pontos: 0,

        nivel: 1,

        /* -------------------------
           CARACTERÍSTICAS
        ------------------------- */

        caracteristicas: {
            cor: false,
            orelhas: false,
            olhos: false,
            nariz: false,
            padrao: false,
            patas: false,
            cauda: false
        },

        /* -------------------------
           ÁLBUM
        ------------------------- */

        album: []
    };
}


/* =========================================================
   CARREGAR PETTON
   ========================================================= */

function carregarPetton() {

    const salvo = localStorage.getItem(PETTON_CHAVE);

    if (!salvo) {

        const novo = criarPettonNovo();

        localStorage.setItem(
            PETTON_CHAVE,
            JSON.stringify(novo)
        );

        return novo;
    }

    try {

        const dados = JSON.parse(salvo);

        /*
         * Migração para o sistema novo de incubação.
         */

        if (!dados.dateNascimento) {

            if (
                typeof dados.incubacaoRestanteMs !== "number"
            ) {
                dados.incubacaoRestanteMs =
                    PETTON_INCUBACAO_MS;
            }

            if (
                typeof dados.incubacaoAtualizadaEm !== "number"
            ) {
                dados.incubacaoAtualizadaEm =
                    Date.now();
            }

            if (
                typeof dados.aquecedorAte === "undefined"
            ) {
                dados.aquecedorAte = null;
            }

            dados.fase = "ovo";
        }

        /*
         * Garante que características antigas
         * não quebrem o Petton.
         */

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

    } catch (erro) {

        console.error(
            "Erro ao carregar Petton:",
            erro
        );

        const novo = criarPettonNovo();

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

    const dados = carregarPetton();

    /*
     * Se já nasceu, não existe mais incubação.
     */

    if (dados.dateNascimento) {
        return dados;
    }

    const agora = Date.now();

    /*
     * Se não houver timestamp, cria um.
     */

    if (
        typeof dados.incubacaoAtualizadaEm !== "number"
    ) {

        dados.incubacaoAtualizadaEm = agora;
    }

    /*
     * Quanto tempo real passou desde a última atualização?
     */

    let tempoPassado =
        agora - dados.incubacaoAtualizadaEm;

    if (tempoPassado < 0) {
        tempoPassado = 0;
    }

    /*
     * Descobre se o aquecedor está ligado.
     */

    const aquecedorLigado =
        dados.aquecedorAte &&
        dados.aquecedorAte > agora;

    /*
     * Se o aquecedor acabou, desliga.
     */

    if (
        dados.aquecedorAte &&
        dados.aquecedorAte <= agora
    ) {

        dados.aquecedorAte = null;
    }

    /*
     * Velocidade da incubação.
     */

    const multiplicador =
        aquecedorLigado
            ? PETTON_AQUECEDOR_MULTIPLICADOR
            : 1;

    /*
     * Diminui o tempo restante.
     */

    dados.incubacaoRestanteMs -=
        tempoPassado * multiplicador;

    dados.incubacaoAtualizadaEm = agora;

    /*
     * Nasceu!
     */

    if (dados.incubacaoRestanteMs <= 0) {

        dados.incubacaoRestanteMs = 0;

        nascerPettonInterno(dados);

    }

    salvarPetton(dados);

    return dados;
}


/* =========================================================
   NASCIMENTO
   ========================================================= */

function nascerPettonInterno(dados) {

    /*
     * Escolhe a espécie somente no nascimento.
     */

    dados.especie = escolherEspecie();

    dados.dateNascimento =
        new Date().toISOString();

    dados.fase = "bebe";

    dados.aquecedorAte = null;

    dados.incubacaoRestanteMs = 0;

    /*
     * Começa com poucas características visíveis.
     */

    dados.caracteristicas = {

        cor: true,

        orelhas: true,

        olhos: false,

        nariz: true,

        padrao: false,

        patas: false,

        cauda: false
    };

    /*
     * Garante que o álbum comece vazio.
     */

    if (!Array.isArray(dados.album)) {
        dados.album = [];
    }

    salvarPetton(dados);
}


/* =========================================================
   NASCER — API PÚBLICA
   ========================================================= */

function nascerPetton() {

    const dados = carregarPetton();

    if (dados.dateNascimento) {
        return dados;
    }

    dados.incubacaoRestanteMs = 0;

    nascerPettonInterno(dados);

    return carregarPetton();
}


/* =========================================================
   LIGAR AQUECEDOR
   ========================================================= */

function ligarAquecedor() {

    let dados = atualizarIncubacao();

    /*
     * Se já nasceu, não pode aquecer.
     */

    if (dados.dateNascimento) {
        return false;
    }

    const agora = Date.now();

    /*
     * Liga por 2 minutos.
     */

    dados.aquecedorAte =
        agora + PETTON_AQUECEDOR_DURACAO_MS;

    dados.incubacaoAtualizadaEm = agora;

    salvarPetton(dados);

    return true;
}


/* =========================================================
   AQUECEDOR ATIVO?
   ========================================================= */

function aquecedorAtivo() {

    const dados = atualizarIncubacao();

    if (dados.dateNascimento) {
        return false;
    }

    return (
        dados.aquecedorAte &&
        dados.aquecedorAte > Date.now()
    );
}


/* =========================================================
   TEMPO RESTANTE DO AQUECEDOR
   ========================================================= */

function tempoAquecedorRestante() {

    const dados = atualizarIncubacao();

    if (!dados.aquecedorAte) {
        return 0;
    }

    const restante =
        dados.aquecedorAte - Date.now();

    return Math.max(0, restante);
}


/* =========================================================
   TEMPO RESTANTE DA INCUBAÇÃO
   ========================================================= */

function tempoIncubacaoRestante() {

    const dados = atualizarIncubacao();

    if (dados.dateNascimento) {
        return 0;
    }

    return Math.max(
        0,
        dados.incubacaoRestanteMs
    );
}


/* =========================================================
   DESCOBRIR FASE
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
   IDADE EM DIAS
   ========================================================= */

function idadeDias() {

    const dados = carregarPetton();

    if (!dados.dateNascimento) {
        return 0;
    }

    const nascimento =
        new Date(dados.dateNascimento);

    const agora = new Date();

    const diferenca =
        agora.getTime() -
        nascimento.getTime();

    return Math.max(
        0,
        Math.floor(
            diferenca / (1000 * 60 * 60 * 24)
        )
    );
}


/* =========================================================
   VERIFICAR CRESCIMENTO
   ========================================================= */

function verificarCrescimento() {

    let dados = atualizarIncubacao();

    /*
     * Ainda é ovo.
     */

    if (!dados.dateNascimento) {

        dados.fase = "ovo";

        salvarPetton(dados);

        return dados;
    }

    const dias = idadeDias();

    const novaFase =
        descobrirFase(dias);

    dados.fase = novaFase;

    salvarPetton(dados);

    atualizarCaracteristicasVisiveis();

    return dados;
}


/* =========================================================
   CARACTERÍSTICAS VISÍVEIS
   ========================================================= */

function atualizarCaracteristicasVisiveis() {

    const dados = carregarPetton();

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

    const dias = idadeDias();

    dados.caracteristicas.cor = true;

    dados.caracteristicas.orelhas = true;

    dados.caracteristicas.nariz = true;

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
   ATUALIZAR NECESSIDADES
   ========================================================= */

function atualizarTempo() {

    const dados = carregarPetton();

    /*
     * O ovo ainda não possui necessidades.
     */

    if (!dados.dateNascimento) {
        return dados;
    }

    dados.fome =
        Math.max(0, dados.fome - 1);

    dados.felicidade =
        Math.max(0, dados.felicidade - 0.5);

    dados.energia =
        Math.max(0, dados.energia - 0.3);

    dados.higiene =
        Math.max(0, dados.higiene - 0.3);

    /*
     * Saúde diminui somente se necessidades
     * estiverem muito baixas.
     */

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

    const dados = carregarPetton();

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

    const dados = carregarPetton();

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

    const dados = carregarPetton();

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

    const dados = carregarPetton();

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
   BANHO / HIGIENE
   ========================================================= */

function limpar() {

    const dados = carregarPetton();

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

    const dados = atualizarIncubacao();

    verificarCrescimento();

    return carregarPetton();
}


/* =========================================================
   IDENTIDADE
   ========================================================= */

function identidadePetton() {

    const dados = carregarPetton();

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

    const dados = carregarPetton();

    if (!dados.dateNascimento) {
        return dados.album || [];
    }

    const dias = idadeDias();

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
                dados.album.some(function (foto) {
                    return foto.dia === dia;
                });

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
   RESETAR PETTON
   ========================================================= */

function resetarPetton() {

    /*
     * Cria um Petton completamente novo.
     * O novo ovo começa novamente com 24 horas.
     */

    const novo = criarPettonNovo();

    novo.fase = "ovo";

    novo.dateNascimento = null;

    novo.incubacaoRestanteMs =
        PETTON_INCUBACAO_MS;

    novo.incubacaoAtualizadaEm =
        Date.now();

    novo.aquecedorAte = null;

    salvarPetton(novo);

    return novo;
}


/* =========================================================
   API PETTON
   ========================================================= */

window.Petton = {

    /* dados */

    get dados() {
        return carregarPetton();
    },

    /* salvar */

    salvar: function () {

        const dados =
            carregarPetton();

        salvarPetton(dados);

        return dados;
    },

    /* carregar */

    carregar: function () {

        return carregarPetton();
    },

    /* nascimento */

    nascer: function () {

        return nascerPetton();
    },

    /* alimentação */

    alimentar: function () {

        return alimentar();
    },

    /* brincar */

    brincar: function () {

        return brincar();
    },

    /* carinho */

    carinho: function () {

        return carinho();
    },

    /* dormir */

    dormir: function () {

        return dormir();
    },

    /* limpar */

    limpar: function () {

        return limpar();
    },

    /* status */

    status: function () {

        return statusPetton();
    },

    /* identidade */

    identidade: function () {

        return identidadePetton();
    },

    /* crescimento */

    verificarCrescimento: function () {

        return verificarCrescimento();
    },

    /* características */

    atualizarCaracteristicas: function () {

        return atualizarCaracteristicasVisiveis();
    },

    /* idade */

    idadeDias: function () {

        return idadeDias();
    },

    /* fase */

    fase: function () {

        return carregarPetton().fase;
    },

    /* álbum */

    album: function () {

        return atualizarAlbum();
    },

    /* =========================
       OVO
       ========================= */

    incubacaoRestante: function () {

        return tempoIncubacaoRestante();
    },

    /* =========================
       AQUECEDOR
       ========================= */

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

setInterval(function () {

    try {

        const dados =
            atualizarIncubacao();

        /*
         * Necessidades dos pets nascidos.
         */

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
