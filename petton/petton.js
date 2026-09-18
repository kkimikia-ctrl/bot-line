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

/* Quanto tempo o cocô pode ficar antes de começar a prejudicar */

const PETTON_COCO_ALERTA_MS = 10 * 60 * 1000;

/* Quanto tempo o cocô pode ficar antes de deixar doente */

const PETTON_COCO_DOENCA_MS = 30 * 60 * 1000;

/* Tempo depois de comer para poder aparecer cárie */

const PETTON_CARIE_APOS_COMER_MS = 5 * 60 * 1000;

/* Tempo do tratamento no hospital */

const PETTON_HOSPITAL_MS = 5 * 1000;

/* Tempo do passeio */

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

        Math.floor(Math.random() * especies.length)

    ];

}

/* =========================================================

   CRIAR PETTON

   ========================================================= */

function criarPettonNovo() {

    const agora = Date.now();

    return {

        /* ESPÉCIE E NOME FICAM SECRETOS NO OVO */

        especie: null,

        nome: null,

        fase: "ovo",

        dateNascimento: null,

        dataCriacao: new Date(agora).toISOString(),

        /* INCUBAÇÃO */

        incubacaoRestanteMs:

            PETTON_INCUBACAO_MS,

        incubacaoAtualizadaEm:

            agora,

        aquecedorAte: null,

        /* NECESSIDADES */

        fome: 70,

        felicidade: 100,

        energia: 100,

        higiene: 100,

        saude: 100,

        /* =================================================

           NOVOS ESTADOS DE CUIDADO

           ================================================= */

        /* DOENÇA */

        doente: false,

        doenteDesde: null,

        hospitalAte: null,

        /* COCÔ */

        cocoAtivo: false,

        cocoNasceuEm: null,

        /* CÁRIE */

        carieAtiva: false,

        carieNasceuEm: null,

        ultimaAlimentacaoEm: null,

        /* PASSEIO */

        passeandoAte: null,

        /* ESCOVAÇÃO */

        escovandoAte: null,

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

   GARANTIR NOVOS CAMPOS

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

    return dados;

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

        /* =================================================

           MIGRAÇÃO

           ================================================= */

        if (!dados.dateNascimento) {

            dados.fase = "ovo";

            /*

             * Enquanto estiver no ovo,

             * não revelar espécie nem nome.

             */

            dados.especie = null;

            dados.nome = null;

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

        /* =================================================

           CARACTERÍSTICAS

           ================================================= */

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

        /* =================================================

           ÁLBUM

           ================================================= */

        if (!Array.isArray(dados.album)) {

            dados.album = [];

        }

        /* =================================================

           NOVOS CAMPOS

           ================================================= */

        garantirCamposNovos(dados);

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

    /* JÁ NASCEU */

    if (dados.dateNascimento) {

        return dados;

    }

    const agora =

        Date.now();

    /* GARANTIR TIMESTAMP */

    if (

        typeof dados.incubacaoAtualizadaEm !== "number" ||

        !Number.isFinite(

            dados.incubacaoAtualizadaEm

        )

    ) {

        dados.incubacaoAtualizadaEm =

            agora;

    }

    /* TEMPO PASSADO */

    let tempoPassado =

        agora -

        dados.incubacaoAtualizadaEm;

    if (

        !Number.isFinite(tempoPassado) ||

        tempoPassado < 0

    ) {

        tempoPassado = 0;

    }

    /* AQUECEDOR */

    const aquecedorLigado =

        dados.aquecedorAte &&

        dados.aquecedorAte > agora;

    /* DESLIGAR AQUECEDOR VENCIDO */

    if (

        dados.aquecedorAte &&

        dados.aquecedorAte <= agora

    ) {

        dados.aquecedorAte = null;

    }

    /* MULTIPLICADOR */

    const multiplicador =

        aquecedorLigado

            ? PETTON_AQUECEDOR_MULTIPLICADOR

            : 1;

    /* DESCONTO */

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

    /* =================================================

       NASCIMENTO

       ================================================= */

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

     * O animal é sorteado somente no nascimento.

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

    /*

     * O NOME CONTINUA VAZIO.

     */

    dados.nome = null;

    /* NOVOS ESTADOS */

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

   ESCOLHER NOME

   ========================================================= */

function definirNome(nome) {

    const dados =

        carregarPetton();

    if (!dados.dateNascimento) {

        return false;

    }

    /*

     * Não permitir nome enquanto

     * estiver em tratamento.

     */

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

        /*

         * Se ficou muito tempo sem limpar,

         * começa a prejudicar a saúde.

         */

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

        /*

         * Depois de bastante tempo,

         * Petton fica doente.

         */

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

    /*

     * Segurança adicional:

     * saúde muito baixa também pode

     * deixar o Petton doente.

     */

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

        /*

         * Depois de alguns minutos,

         * pode aparecer a cárie.

         */

        if (

            tempoDesdeComida >=

            PETTON_CARIE_APOS_COMER_MS

        ) {

            /*

             * 45% de chance.

             * A alimentação seguinte poderá

             * criar outra oportunidade.

             */

            if (Math.random() < 0.45) {

                dados.carieAtiva = true;

                dados.carieNasceuEm =

                    Date.now();

                dados.ultimaAlimentacaoEm =

                    null;

            } else {

                /*

                 * Não fica verificando

                 * infinitamente a mesma refeição.

                 */

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

        Date.now() >= dados.hospitalAte

    ) {

        return finalizarHospital(dados);

    }

    return dados;

}

/* =========================================================

   ATUALIZAR PASSEIO

   ========================================================= */

function atualizarPasseio(dados) {

    if (

        dados.passeandoAte &&

        Date.now() >= dados.passeandoAte

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

        Date.now() >= dados.escovandoAte

    ) {

        dados.escovandoAte = null;

        /*

         * Só remove a cárie quando

         * a animação termina.

         */

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

    /* PROCESSOS ESPECIAIS */

    verificarDoenca(dados);

    verificarCarie(dados);

    atualizarHospital(dados);

    atualizarPasseio(dados);

    atualizarEscovacao(dados);

    /*

     * Se estiver doente, as necessidades

     * continuam caindo um pouco.

     */

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

    /* NECESSIDADES NORMAIS */

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

    /*

     * Não pode alimentar no ovo.

     */

    if (!dados.dateNascimento) {

        return false;

    }

    /*

     * DOENTE NÃO PODE COMER.

     */

    if (dados.doente) {

        return false;

    }

    /*

     * NÃO PODE COMER DURANTE TRATAMENTO.

     */

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

    /*

     * Registrar alimentação.

     * A cárie poderá aparecer depois.

     */

    dados.ultimaAlimentacaoEm =

        Date.now();

    /*

     * Se não existe cocô,

     * cria um novo.

     */

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

    /*

     * Mesmo doente, pode limpar.

     */

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

    /*

     * O cocô desaparece.

     */

    dados.cocoAtivo = false;

    dados.cocoNasceuEm = null;

    /*

     * Limpar melhora higiene,

     * mas NÃO cura doença.

     */

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

    /*

     * Já está escovando.

     */

    if (dados.escovandoAte) {

        return false;

    }

    /*

     * A cárie NÃO desaparece agora.

     * Ela só desaparece quando

     * a animação terminar.

     */

    dados.escovandoAte =

        Date.now() +

        3000;

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

    /*

     * DOENTE NÃO PODE PASSEAR.

     */

    if (dados.doente) {

        return false;

    }

    if (dados.hospitalAte) {

        return false;

    }

    /*

     * Já está passeando.

     */

    if (

        dados.passeandoAte &&

        dados.passeandoAte > Date.now()

    ) {

        return false;

    }

    /*

     * Inicia o passeio.

     * O index.html poderá usar esse estado

     * para mostrar a animação.

     */

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

    /*

     * Passear pode deixar o Petton

     * um pouquinho sujo.

     */

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

    /*

     * Só precisa ir ao hospital

     * se estiver doente.

     */

    if (!dados.doente) {

        return false;

    }

    /*

     * Já está em tratamento.

     */

    if (dados.hospitalAte) {

        return false;

    }

    /*

     * Inicia tratamento.

     */

    dados.hospitalAte =

        Date.now() +

        PETTON_HOSPITAL_MS;

    salvarPetton(dados);

    return true;

}

/* =========================================================

   ESTÁ DOENTE

   ========================================================= */

function estaDoente() {

    const dados =

        carregarPetton();

    return !!dados.doente;

}

/* =========================================================

   TEM COCÔ

   ========================================================= */

function temCoco() {

    const dados =

        carregarPetton();

    return !!dados.cocoAtivo;

}

/* =========================================================

   TEM CÁRIE

   ========================================================= */

function temCarie() {

    const dados =

        carregarPetton();

    return !!dados.carieAtiva;

}

/* =========================================================

   ESTÁ PASSEANDO

   ========================================================= */

function estaPasseando() {

    const dados =

        carregarPetton();

    atualizarPasseio(dados);

    return !!(

        dados.passeandoAte &&

        dados.passeandoAte > Date.now()

    );

}

/* =========================================================

   ESTÁ ESCOVANDO

   ========================================================= */

function estaEscovando() {

    const dados =

        carregarPetton();

    atualizarEscovacao(dados);

    return !!(

        dados.escovandoAte &&

        dados.escovandoAte > Date.now()

    );

}

/* =========================================================

   ESTÁ NO HOSPITAL

   ========================================================= */

function estaNoHospital() {

    const dados =

        carregarPetton();

    atualizarHospital(dados);

    return !!(

        dados.hospitalAte &&

        dados.hospitalAte > Date.now()

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

    return {

        especie:

            dados.especie,

        nome:

            dados.nome,

        fase:

            dados.fase,

        idadeDias:

            idadeDias(),

        doente:

            dados.doente,

        cocoAtivo:

            dados.cocoAtivo,

        carieAtiva:

            dados.carieAtiva,

        passeando:

            !!(

                dados.passeandoAte &&

                dados.passeandoAte > Date.now()

            ),

        noHospital:

            !!(

                dados.hospitalAte &&

                dados.hospitalAte > Date.now()

            ),

        escovando:

            !!(

                dados.escovandoAte &&

                dados.escovandoAte > Date.now()

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

    /* =====================================================

       OVO

       ===================================================== */

    incubacaoRestante: function () {

        return tempoIncubacaoRestante();

    },

    /* =====================================================

       AQUECEDOR

       ===================================================== */

    ligarAquecedor: function () {

        return ligarAquecedor();

    },

    aquecedorAtivo: function () {

        return aquecedorAtivo();

    },

    aquecedorRestante: function () {

        return tempoAquecedorRestante();

    },

    /* =====================================================

       RESET

       ===================================================== */

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

    /*

     * Atualizar estados especiais

     * logo ao abrir a página.

     */

    const dadosInicial =

        carregarPetton();

    if (dadosInicial.dateNascimento) {

        verificarDoenca(dadosInicial);

        verificarCarie(dadosInicial);

        atualizarHospital(dadosInicial);

        atualizarPasseio(dadosInicial);

        atualizarEscovacao(dadosInicial);

        salvarPetton(dadosInicial);

    }

} catch (erro) {

    console.error(

        "Erro ao iniciar Petton:",

        erro

    );

}
