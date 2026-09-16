/* =========================================================

   PETTON - SISTEMA CENTRAL

   Espécie + características + crescimento + cuidados

========================================================= */

const PETTON_STORAGE = "petton_dados_v2";

/* =========================================================

   OPÇÕES DE CARACTERÍSTICAS

========================================================= */

const PETTON_ESPECIES = [

    "gato",

    "cachorro",

    "coelho"

];

const PETTON_CORES = {

    gato: [

        "branco",

        "preto",

        "cinza",

        "laranja",

        "marrom",

        "creme",

        "cinza_claro",

        "cinza_escuro",

        "preto_branco",

        "laranja_branco",

        "marrom_branco"

    ],

    cachorro: [

        "branco",

        "preto",

        "caramelo",

        "marrom",

        "creme",

        "cinza",

        "dourado",

        "preto_branco",

        "marrom_branco",

        "caramelo_branco"

    ],

    coelho: [

        "branco",

        "preto",

        "cinza",

        "marrom",

        "creme",

        "caramelo",

        "cinza_claro",

        "preto_branco",

        "marrom_branco"

    ]

};

const PETTON_PADROES = {

    gato: [

        "sem_manchas",

        "tabby",

        "listrado",

        "manchas",

        "peito_branco",

        "patas_brancas",

        "rosto_bicolor",

        "mancha_no_nariz",

        "tigrado"

    ],

    cachorro: [

        "sem_manchas",

        "manchas",

        "peito_branco",

        "patas_brancas",

        "rosto_bicolor",

        "orelha_diferente",

        "mancha_no_olho",

        "pintinhas"

    ],

    coelho: [

        "sem_manchas",

        "manchas",

        "peito_branco",

        "patas_brancas",

        "rosto_bicolor",

        "orelha_diferente",

        "nariz_manchado"

    ]

};

const PETTON_OLHOS = {

    gato: [

        "azuis",

        "verdes",

        "amarelos",

        "castanhos",

        "cinza",

        "azul_claro",

        "dourados"

    ],

    cachorro: [

        "castanhos",

        "azuis",

        "pretos",

        "mel",

        "cinza",

        "verdes"

    ],

    coelho: [

        "castanhos",

        "azuis",

        "vermelhos",

        "pretos",

        "cinza",

        "mel"

    ]

};

const PETTON_RABOS = {

    gato: [

        "curto",

        "medio",

        "longo",

        "fofinho",

        "listrado",

        "ponta_branca",

        "curvado"

    ],

    cachorro: [

        "curto",

        "medio",

        "longo",

        "fofinho",

        "curvado",

        "levantado",

        "ponta_branca"

    ],

    coelho: [

        "pequeno",

        "fofinho",

        "redondo",

        "branco",

        "cinza",

        "marrom"

    ]

};

const PETTON_ORELHAS = {

    gato: [

        "pequenas",

        "medias",

        "grandes",

        "pontudas",

        "arredondadas"

    ],

    cachorro: [

        "caidas",

        "semi_caidas",

        "levantadas",

        "grandes",

        "pequenas",

        "arredondadas"

    ],

    coelho: [

        "curtas",

        "medias",

        "longas",

        "muito_longas",

        "arredondadas"

    ]

};

const PETTON_PESO_RARIDADE = {

    comum: 65,

    incomum: 23,

    raro: 9,

    especial: 3

};

/* =========================================================

   FUNÇÕES AUXILIARES

========================================================= */

function copiar(objeto) {

    return JSON.parse(JSON.stringify(objeto));

}

function escolher(lista) {

    return lista[Math.floor(Math.random() * lista.length)];

}

function limitar(valor, minimo = 0, maximo = 100) {

    return Math.max(minimo, Math.min(maximo, valor));

}

/* =========================================================

   RARIDADE

========================================================= */

function sortearRaridade() {

    const numero = Math.random() * 100;

    if (numero < PETTON_PESO_RARIDADE.comum) {

        return "comum";

    }

    if (

        numero <

        PETTON_PESO_RARIDADE.comum +

        PETTON_PESO_RARIDADE.incomum

    ) {

        return "incomum";

    }

    if (

        numero <

        PETTON_PESO_RARIDADE.comum +

        PETTON_PESO_RARIDADE.incomum +

        PETTON_PESO_RARIDADE.raro

    ) {

        return "raro";

    }

    return "especial";

}

/* =========================================================

   GERAR IDENTIDADE

========================================================= */

function gerarCaracteristicas(especie) {

    return {

        cor: escolher(

            PETTON_CORES[especie]

        ),

        padrao: escolher(

            PETTON_PADROES[especie]

        ),

        olhos: escolher(

            PETTON_OLHOS[especie]

        ),

        rabo: escolher(

            PETTON_RABOS[especie]

        ),

        orelhas: escolher(

            PETTON_ORELHAS[especie]

        ),

        patas: escolher([

            "normais",

            "brancas",

            "escuras",

            "manchadas",

            "peludas"

        ]),

        nariz: escolher([

            "rosa",

            "preto",

            "marrom",

            "cinza"

        ]),

        raridade: sortearRaridade()

    };

}

/* =========================================================

   PETTON PADRÃO

========================================================= */

const PETTON_PADRAO = {

    nome: "Mimi",

    especie: null,

    fase: "ovo",

    dataNascimento: null,

    dataOvo: null,

    caracteristicas: null,

    caracteristicasVisiveis: {

        cor: false,

        padrao: false,

        olhos: false,

        rabo: false,

        orelhas: false,

        patas: false,

        nariz: false

    },

    fome: 80,

    felicidade: 90,

    energia: 100,

    saude: 100,

    higiene: 100,

    sujeiras: 0,

    doente: false,

    comCarie: false,

    moedas: 30,

    nivel: 1,

    xp: 0,

    pontos: 0,

    inventario: {

        comida: [],

        brinquedos: [],

        moveis: [],

        acessorios: [],

        decoracoes: []

    },

    quarto: {

        piso: "madeira_clara",

        parede: "creme",

        moveis: [],

        decoracoes: []

    },

    album: [],

    conquistas: [],

    ultimaAlimentacao: null,

    ultimoBanho: null,

    ultimaLimpeza: null,

    ultimaInteracao: null,

    ultimaAtualizacao: Date.now(),

    ultimoBonus: ""

};

/* =========================================================

   CARREGAMENTO

========================================================= */

function criarNovoPetton() {

    const novo = copiar(PETTON_PADRAO);

    novo.dataOvo = Date.now();

    /*

       A espécie é escolhida agora,

       mas permanece escondida do jogador

       até o nascimento.

    */

    novo.especie =

        escolher(PETTON_ESPECIES);

    novo.caracteristicas =

        gerarCaracteristicas(

            novo.especie

        );

    salvarPettonObjeto(novo);

    return novo;

}

function salvarPettonObjeto(dados) {

    try {

        dados.ultimaAtualizacao =

            Date.now();

        localStorage.setItem(

            PETTON_STORAGE,

            JSON.stringify(dados)

        );

        return true;

    } catch (erro) {

        console.error(

            "Erro ao salvar Petton:",

            erro

        );

        return false;

    }

}

function carregarPetton() {

    try {

        const salvo =

            localStorage.getItem(

                PETTON_STORAGE

            );

        if (!salvo) {

            return criarNovoPetton();

        }

        const dados =

            JSON.parse(salvo);

        let resultado = {

            ...copiar(PETTON_PADRAO),

            ...dados,

            caracteristicas: {

                ...(dados.caracteristicas || {})

            },

            caracteristicasVisiveis: {

                ...copiar(

                    PETTON_PADRAO

                ).caracteristicasVisiveis,

                ...(dados.caracteristicasVisiveis || {})

            },

            inventario: {

                ...copiar(

                    PETTON_PADRAO

                ).inventario,

                ...(dados.inventario || {})

            },

            quarto: {

                ...copiar(

                    PETTON_PADRAO

                ).quarto,

                ...(dados.quarto || {})

            }

        };

        /*

         * Compatibilidade com Pettons antigos.

         */

        if (!resultado.especie) {

            resultado.especie =

                escolher(PETTON_ESPECIES);

        }

        if (!resultado.caracteristicas ||

            !resultado.caracteristicas.cor) {

            resultado.caracteristicas =

                gerarCaracteristicas(

                    resultado.especie

                );

        }

        atualizarTempo();

        verificarCrescimento();

        atualizarCaracteristicasVisiveis();

        salvarPettonObjeto(resultado);

        return resultado;

    } catch (erro) {

        console.error(

            "Erro ao carregar Petton:",

            erro

        );

        return criarNovoPetton();

    }

}

let petton = null;

/* =========================================================

   SALVAR

========================================================= */

function salvarPetton() {

    return salvarPettonObjeto(

        petton

    );

}

/* =========================================================

   IDADE

========================================================= */

function idadeDias() {

    if (!petton.dataNascimento) {

        return 0;

    }

    const agora =

        Date.now();

    const nascimento =

        new Date(

            petton.dataNascimento

        ).getTime();

    const diferenca =

        agora - nascimento;

    if (diferenca <= 0) {

        return 0;

    }

    return Math.floor(

        diferenca /

        (1000 * 60 * 60 * 24)

    );

}

function idadeTexto() {

    if (petton.fase === "ovo") {

        return "Ainda no ovo";

    }

    const dias =

        idadeDias();

    if (dias === 0) {

        return "Nasceu hoje";

    }

    if (dias === 1) {

        return "1 dia";

    }

    if (dias < 30) {

        return dias + " dias";

    }

    const meses =

        Math.floor(

            dias / 30

        );

    if (meses === 1) {

        return "1 mês";

    }

    return meses + " meses";

}

/* =========================================================

   FASE

========================================================= */

function nomeFase() {

    switch (petton.fase) {

        case "ovo":

            return "Ovo";

        case "bebe":

            return "Bebê";

        case "crianca":

            return "Criança";

        case "adulto":

            return "Adulto";

        default:

            return "Petton";

    }

}

/* =========================================================

   CRESCIMENTO

========================================================= */

function verificarCrescimento() {

    if (!petton.dataNascimento) {

        return;

    }

    const dias =

        idadeDias();

    let novaFase =

        petton.fase;

    if (dias < 30) {

        novaFase = "bebe";

    } else if (dias < 90) {

        novaFase = "crianca";

    } else {

        novaFase = "adulto";

    }

    if (

        novaFase !== petton.fase

    ) {

        petton.fase =

            novaFase;

        registrarAlbumAutomatico();

        salvarPetton();

    }

    atualizarCaracteristicasVisiveis();

}

/* =========================================================

   CARACTERÍSTICAS APARECENDO

========================================================= */

function atualizarCaracteristicasVisiveis() {

    if (petton.fase === "ovo") {

        return;

    }

    const dias =

        idadeDias();

    /*

     * O bebê não mostra tudo de uma vez.

     */

    petton.caracteristicasVisiveis.cor =

        dias >= 1;

    petton.caracteristicasVisiveis.padrao =

        dias >= 3;

    petton.caracteristicasVisiveis.olhos =

        dias >= 2;

    petton.caracteristicasVisiveis.orelhas =

        dias >= 1;

    petton.caracteristicasVisiveis.patas =

        dias >= 4;

    petton.caracteristicasVisiveis.rabo =

        dias >= 5;

    petton.caracteristicasVisiveis.nariz =

        dias >= 1;

    salvarPetton();

}

/* =========================================================

   NASCIMENTO

========================================================= */

function nascerPetton() {

    if (petton.fase !== "ovo") {

        return false;

    }

    if (!petton.especie) {

        petton.especie =

            escolher(

                PETTON_ESPECIES

            );

    }

    if (

        !petton.caracteristicas

    ) {

        petton.caracteristicas =

            gerarCaracteristicas(

                petton.especie

            );

    }

    petton.fase =

        "bebe";

    petton.dataNascimento =

        Date.now();

    petton.fome =

        70;

    petton.felicidade =

        100;

    petton.energia =

        100;

    petton.saude =

        100;

    petton.higiene =

        100;

    petton.sujeiras =

        0;

    petton.caracteristicasVisiveis =

        {

            cor: false,

            padrao: false,

            olhos: false,

            rabo: false,

            orelhas: false,

            patas: false,

            nariz: false

        };

    registrarAlbumAutomatico();

    salvarPetton();

    return true;

}

/* =========================================================

   TEMPO

========================================================= */

function atualizarTempo() {

    if (!petton.ultimaAtualizacao) {

        petton.ultimaAtualizacao =

            Date.now();

        return;

    }

    const agora =

        Date.now();

    const diferenca =

        agora -

        petton.ultimaAtualizacao;

    const minutos =

        Math.floor(

            diferenca /

            (1000 * 60)

        );

    if (minutos <= 0) {

        return;

    }

    if (

        petton.fase !== "ovo"

    ) {

        petton.fome =

            limitar(

                petton.fome -

                minutos * 0.08

            );

        petton.energia =

            limitar(

                petton.energia -

                minutos * 0.03

            );

        petton.higiene =

            limitar(

                petton.higiene -

                minutos * 0.02

            );

        petton.felicidade =

            limitar(

                petton.felicidade -

                minutos * 0.015

            );

        if (minutos >= 60) {

            const novasSujeiras =

                Math.floor(

                    minutos / 120

                );

            petton.sujeiras =

                limitar(

                    petton.sujeiras +

                    novasSujeiras,

                    0,

                    5

                );

        }

    }

    petton.ultimaAtualizacao =

        agora;

}

/* =========================================================

   ALIMENTAÇÃO

========================================================= */

function alimentarPetton(valor = 15) {

    if (

        petton.fase === "ovo"

    ) {

        return false;

    }

    petton.fome =

        limitar(

            petton.fome + valor

        );

    petton.felicidade =

        limitar(

            petton.felicidade + 3

        );

    petton.ultimaAlimentacao =

        Date.now();

    ganharXP(5);

    salvarPetton();

    return true;

}

/* =========================================================

   BRINCAR

========================================================= */

function brincarPetton(valor = 5) {

    if (

        petton.fase === "ovo"

    ) {

        return false;

    }

    petton.felicidade =

        limitar(

            petton.felicidade + valor

        );

    petton.energia =

        limitar(

            petton.energia - 2

        );

    petton.ultimaInteracao =

        Date.now();

    ganharXP(3);

    salvarPetton();

    return true;

}

/* =========================================================

   BANHO

========================================================= */

function banhoPetton() {

    if (

        petton.fase === "ovo"

    ) {

        return false;

    }

    petton.higiene =

        100;

    petton.felicidade =

        limitar(

            petton.felicidade + 5

        );

    petton.ultimoBanho =

        Date.now();

    ganharXP(5);

    salvarPetton();

    return true;

}

/* =========================================================

   LIMPEZA

========================================================= */

function limparPetton() {

    if (

        petton.fase === "ovo"

    ) {

        return false;

    }

    petton.sujeiras =

        0;

    petton.higiene =

        limitar(

            petton.higiene + 20

        );

    petton.ultimaLimpeza =

        Date.now();

    ganharXP(3);

    salvarPetton();

    return true;

}

/* =========================================================

   DORMIR

========================================================= */

function dormirPetton() {

    if (

        petton.fase === "ovo"

    ) {

        return false;

    }

    petton.energia =

        100;

    petton.saude =

        limitar(

            petton.saude + 5

        );

    salvarPetton();

    return true;

}

/* =========================================================

   XP

========================================================= */

function ganharXP(valor = 1) {

    petton.xp += valor;

    let necessario =

        100 +

        ((petton.nivel - 1) * 50);

    while (

        petton.xp >= necessario

    ) {

        petton.xp -=

            necessario;

        petton.nivel++;

        petton.moedas += 10;

        necessario =

            100 +

            ((petton.nivel - 1) * 50);

    }

    salvarPetton();

}

/* =========================================================

   MOEDAS

========================================================= */

function adicionarMoedas(valor) {

    petton.moedas += valor;

    if (petton.moedas < 0) {

        petton.moedas = 0;

    }

    salvarPetton();

}

/* =========================================================

   LOJA

========================================================= */

function comprarItem(item) {

    if (!item) {

        return false;

    }

    const preco =

        Number(

            item.preco || 0

        );

    if (

        petton.moedas < preco

    ) {

        return false;

    }

    petton.moedas -=

        preco;

    const categoria =

        item.categoria ||

        "decoracoes";

    if (

        !petton.inventario[

            categoria

        ]

    ) {

        petton.inventario[

            categoria

        ] = [];

    }

    petton.inventario[

        categoria

    ].push({

        id: item.id,

        nome: item.nome,

        compradoEm: Date.now()

    });

    ganharXP(2);

    salvarPetton();

    return true;

}

/* =========================================================

   ÁLBUM

========================================================= */

function registrarAlbumAutomatico() {

    if (

        petton.fase === "ovo"

    ) {

        return;

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

    /*

     * Registra somente os marcos

     * que já foram alcançados.

     */

    momentos.forEach(

        function(momento) {

            if (

                dias < momento

            ) {

                return;

            }

            const jaExiste =

                petton.album.some(

                    foto =>

                        foto.dia === momento

                );

            if (jaExiste) {

                return;

            }

            petton.album.push({

                id:

                    "dia-" +

                    momento,

                dia:

                    momento,

                fase:

                    petton.fase,

                nome:

                    petton.nome,

                especie:

                    petton.especie,

                caracteristicas:

                    copiar(

                        petton.caracteristicas

                    ),

                data:

                    Date.now()

            });

        }

    );

    salvarPetton();

}

/* =========================================================

   CONQUISTAS

========================================================= */

function adicionarConquista(

    id,

    nome

) {

    const existe =

        petton.conquistas.some(

            item =>

                item.id === id

        );

    if (existe) {

        return false;

    }

    petton.conquistas.push({

        id,

        nome,

        data:

            Date.now()

    });

    salvarPetton();

    return true;

}

/* =========================================================

   BÔNUS DIÁRIO

========================================================= */

function bonusDiario() {

    const hoje =

        new Date()

            .toISOString()

            .slice(0, 10);

    if (

        petton.ultimoBonus ===

        hoje

    ) {

        return 0;

    }

    const recompensa =

        10;

    petton.moedas +=

        recompensa;

    petton.ultimoBonus =

        hoje;

    adicionarConquista(

        "primeiro_bonus",

        "Primeiro bônus diário"

    );

    salvarPetton();

    return recompensa;

}

/* =========================================================

   RENOMEAR

========================================================= */

function renomearPetton(

    novoNome

) {

    if (!novoNome) {

        return false;

    }

    novoNome =

        String(novoNome)

            .trim();

    if (

        novoNome.length < 1

    ) {

        return false;

    }

    if (

        novoNome.length > 20

    ) {

        novoNome =

            novoNome.substring(

                0,

                20

            );

    }

    petton.nome =

        novoNome;

    salvarPetton();

    return true;

}

/* =========================================================

   INFORMAÇÕES DA IDENTIDADE

========================================================= */

function especieTexto() {

    switch (

        petton.especie

    ) {

        case "gato":

            return "Gato";

        case "cachorro":

            return "Cachorro";

        case "coelho":

            return "Coelho";

        default:

            return "Petton";

    }

}

function raridadeTexto() {

    switch (

        petton.caracteristicas?.raridade

    ) {

        case "comum":

            return "Comum";

        case "incomum":

            return "Incomum";

        case "raro":

            return "Raro";

        case "especial":

            return "Especial";

        default:

            return "Comum";

    }

}

function obterIdentidade() {

    return {

        especie:

            petton.especie,

        especieNome:

            especieTexto(),

        raridade:

            petton.caracteristicas?.raridade,

        raridadeNome:

            raridadeTexto(),

        caracteristicas:

            copiar(

                petton.caracteristicas

            ),

        visiveis:

            copiar(

                petton.caracteristicasVisiveis

            )

    };

}

/* =========================================================

   STATUS

========================================================= */

function obterStatusPetton() {

    atualizarTempo();

    verificarCrescimento();

    return {

        nome:

            petton.nome,

        especie:

            petton.especie,

        especieNome:

            especieTexto(),

        raridade:

            petton.caracteristicas?.raridade,

        raridadeNome:

            raridadeTexto(),

        fase:

            nomeFase(),

        idade:

            idadeTexto(),

        dias:

            idadeDias(),

        fome:

            Math.round(

                petton.fome

            ),

        felicidade:

            Math.round(

                petton.felicidade

            ),

        energia:

            Math.round(

                petton.energia

            ),

        saude:

            Math.round(

                petton.saude

            ),

        higiene:

            Math.round(

                petton.higiene

            ),

        moedas:

            petton.moedas,

        nivel:

            petton.nivel,

        xp:

            petton.xp,

        sujeiras:

            petton.sujeiras,

        doente:

            petton.doente,

        faseCodigo:

            petton.fase,

        caracteristicas:

            copiar(

                petton.caracteristicas

            ),

        caracteristicasVisiveis:

            copiar(

                petton.caracteristicasVisiveis

            )

    };

}

/* =========================================================

   INICIALIZAÇÃO

========================================================= */

petton =

    carregarPetton();

/* =========================================================

   ATUALIZAÇÃO AUTOMÁTICA

========================================================= */

setInterval(

    function() {

        atualizarTempo();

        verificarCrescimento();

        registrarAlbumAutomatico();

        salvarPetton();

    },

    60000

);

/* =========================================================

   API DO PETTON

========================================================= */

window.Petton = {

    get dados() {

        return petton;

    },

    salvar:

        salvarPetton,

    carregar:

        carregarPetton,

    status:

        obterStatusPetton,

    identidade:

        obterIdentidade,

    idadeDias:

        idadeDias,

    idadeTexto:

        idadeTexto,

    nomeFase:

        nomeFase,

    nascer:

        nascerPetton,

    alimentar:

        alimentarPetton,

    brincar:

        brincarPetton,

    banho:

        banhoPetton,

    limpar:

        limparPetton,

    dormir:

        dormirPetton,

    comprar:

        comprarItem,

    moedas:

        adicionarMoedas,

    renomear:

        renomearPetton,

    bonusDiario:

        bonusDiario,

    conquista:

        adicionarConquista,

    registrarAlbum:

        registrarAlbumAutomatico,

    crescer:

        verificarCrescimento,

    atualizarCaracteristicas:

        atualizarCaracteristicasVisiveis

};
