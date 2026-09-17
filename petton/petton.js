/* =========================================================
PETTON - SISTEMA CENTRAL
Identidade + características + nascimento + crescimento
========================================================= */

const PETTON_CHAVE = “petton_dados_v3”;
const PETTON_CHAVE_ANTIGA = “petton_dados_v2”;
const PETTON_CHAVE_ANTIGA_2 = “petton_dados_v1”;

const PETTON_ESPECIES = [
“gato”,
“cachorro”,
“coelho”
];

const CARACTERISTICAS = {

gato: {
    cores: [
        "branco",
        "preto",
        "cinza",
        "cinza_claro",
        "cinza_escuro",
        "laranja",
        "marrom",
        "creme",
        "caramelo",
        "dourado",
        "preto_branco",
        "laranja_branco",
        "marrom_branco"
    ],
    padroes: [
        "sem_manchas",
        "tabby",
        "listrado",
        "manchas",
        "peito_branco",
        "patas_brancas",
        "rosto_bicolor",
        "mancha_no_olho",
        "mancha_no_nariz",
        "pintinhas"
    ],
    olhos: [
        "azuis",
        "verdes",
        "amarelos",
        "dourados",
        "castanhos",
        "mel",
        "pretos",
        "cinza"
    ],
    rabos: [
        "curto",
        "medio",
        "longo",
        "fofinho",
        "curvado",
        "levantado",
        "ponta_branca"
    ],
    orelhas: [
        "pequenas",
        "medias",
        "grandes",
        "pontudas",
        "arredondadas"
    ],
    patas: [
        "normais",
        "escuras",
        "brancas",
        "manchadas",
        "peludas"
    ],
    narizes: [
        "rosa",
        "preto",
        "marrom"
    ]
},
cachorro: {
    cores: [
        "branco",
        "preto",
        "cinza",
        "cinza_claro",
        "marrom",
        "creme",
        "caramelo",
        "dourado",
        "preto_branco",
        "marrom_branco",
        "caramelo_branco"
    ],
    padroes: [
        "sem_manchas",
        "manchas",
        "pintinhas",
        "peito_branco",
        "patas_brancas",
        "rosto_bicolor",
        "mancha_no_olho",
        "mancha_no_nariz"
    ],
    olhos: [
        "azuis",
        "castanhos",
        "mel",
        "dourados",
        "pretos",
        "cinza"
    ],
    rabos: [
        "curto",
        "medio",
        "longo",
        "fofinho",
        "curvado",
        "levantado",
        "ponta_branca"
    ],
    orelhas: [
        "pequenas",
        "medias",
        "grandes",
        "caidas",
        "semi_caidas",
        "levantadas",
        "arredondadas"
    ],
    patas: [
        "normais",
        "escuras",
        "brancas",
        "manchadas",
        "peludas"
    ],
    narizes: [
        "preto",
        "marrom",
        "rosa"
    ]
},
coelho: {
    cores: [
        "branco",
        "preto",
        "cinza",
        "cinza_claro",
        "cinza_escuro",
        "marrom",
        "creme",
        "caramelo",
        "dourado",
        "preto_branco",
        "marrom_branco"
    ],
    padroes: [
        "sem_manchas",
        "manchas",
        "pintinhas",
        "peito_branco",
        "patas_brancas",
        "rosto_bicolor",
        "mancha_no_olho"
    ],
    olhos: [
        "azuis",
        "verdes",
        "vermelhos",
        "castanhos",
        "dourados",
        "pretos",
        "cinza"
    ],
    rabos: [
        "pequeno",
        "redondo",
        "fofinho"
    ],
    orelhas: [
        "longas",
        "muito_longas"
    ],
    patas: [
        "normais",
        "brancas",
        "escuras",
        "peludas"
    ],
    narizes: [
        "rosa",
        "preto",
        "marrom"
    ]
}

};

/* =========================================================
FUNÇÕES BÁSICAS
========================================================= */

function escolher(lista) {

if (!lista || !lista.length) {
    return null;
}
return lista[
    Math.floor(
        Math.random() * lista.length
    )
];

}

function limitar(valor) {

return Math.max(
    0,
    Math.min(
        100,
        Number(valor) || 0
    )
);

}

function sortearRaridade() {

const numero =
    Math.random() * 100;
if (numero < 65) {
    return "comum";
}
if (numero < 88) {
    return "incomum";
}
if (numero < 97) {
    return "raro";
}
return "especial";

}

/* =========================================================
CARACTERÍSTICAS
========================================================= */

function gerarCaracteristicas(especie) {

const pool =
    CARACTERISTICAS[especie] ||
    CARACTERISTICAS.gato;
return {
    cor: escolher(pool.cores),
    padrao: escolher(pool.padroes),
    olhos: escolher(pool.olhos),
    rabo: escolher(pool.rabos),
    orelhas: escolher(pool.orelhas),
    patas: escolher(pool.patas),
    nariz: escolher(pool.narizes),
    raridade: sortearRaridade()
};

}

/* =========================================================
IDADE
========================================================= */

function obterIdadeDias(dados) {

if (
    !dados ||
    !dados.dateNascimento
) {
    return 0;
}
const nascimento =
    new Date(dados.dateNascimento);
if (
    isNaN(
        nascimento.getTime()
    )
) {
    return 0;
}
const agora =
    new Date();
const diferenca =
    agora.getTime() -
    nascimento.getTime();
return Math.max(
    0,
    diferenca / 86400000
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
CARACTERÍSTICAS VISÍVEIS
========================================================= */

function criarCaracteristicasVisiveis(dados) {

const dias =
    obterIdadeDias(dados);
return {
    cor: dias >= 0,
    olhos: dias >= 2,
    padrao: dias >= 3,
    orelhas: dias >= 0,
    patas: dias >= 4,
    rabo: dias >= 5,
    nariz: dias >= 0
};

}

/* =========================================================
CRIAR PETTON NOVO
========================================================= */

function criarPettonNovo() {

const especie =
    escolher(PETTON_ESPECIES);
const caracteristicas =
    gerarCaracteristicas(especie);
return {
    nome: "Mimi",
    especie: especie,
    caracteristicas:
        caracteristicas,
    caracteristicasVisiveis: {
        cor: false,
        olhos: false,
        padrao: false,
        orelhas: false,
        patas: false,
        rabo: false,
        nariz: false
    },
    fase: "ovo",
    dateNascimento: null,
    dataCriacao:
        new Date().toISOString(),
    fome: 70,
    felicidade: 100,
    energia: 100,
    higiene: 100,
    saude: 100,
    moedas: 100,
    pontos: 0,
    nivel: 1,
    ultimaAtualizacao:
        new Date().toISOString(),
    ultimoBonus: null,
    conquistas: [],
    album: []
};

}

/* =========================================================
CARREGAR PETTON
========================================================= */

function carregarPetton() {

let salvo = null;
try {
    salvo =
        localStorage.getItem(
            PETTON_CHAVE
        );
} catch (erro) {
    console.error(
        "Erro localStorage:",
        erro
    );
}
if (!salvo) {
    try {
        salvo =
            localStorage.getItem(
                PETTON_CHAVE_ANTIGA
            );
    } catch (erro) {
        console.error(erro);
    }
}
if (!salvo) {
    try {
        salvo =
            localStorage.getItem(
                PETTON_CHAVE_ANTIGA_2
            );
    } catch (erro) {
        console.error(erro);
    }
}
if (!salvo) {
    const novo =
        criarPettonNovo();
    salvarPettonObjeto(novo);
    return novo;
}
let resultado;
try {
    resultado =
        JSON.parse(salvo);
} catch (erro) {
    console.error(
        "Dados inválidos.",
        erro
    );
    resultado =
        criarPettonNovo();
}
/* =====================================================
   MIGRAÇÃO DOS DADOS ANTIGOS
===================================================== */
if (!resultado.especie) {
    resultado.especie =
        escolher(PETTON_ESPECIES);
}
if (!resultado.caracteristicas) {
    resultado.caracteristicas =
        gerarCaracteristicas(
            resultado.especie
        );
}
if (
    !resultado.caracteristicasVisiveis
) {
    resultado.caracteristicasVisiveis =
        criarCaracteristicasVisiveis(
            resultado
        );
}
/*
   CORREÇÃO PRINCIPAL:
   Se existe dateNascimento,
   o Petton JÁ NASCEU.
   Portanto nunca podemos deixar
   a fase como "ovo".
*/
if (resultado.dateNascimento) {
    const dias =
        obterIdadeDias(resultado);
    if (
        !resultado.fase ||
        resultado.fase === "ovo"
    ) {
        resultado.fase =
            descobrirFase(dias);
    }
    if (
        resultado.fase === "ovo"
    ) {
        resultado.fase =
            descobrirFase(dias);
    }
} else {
    resultado.fase =
        "ovo";
}
/* STATUS */
if (
    resultado.fome === undefined
) {
    resultado.fome = 70;
}
if (
    resultado.felicidade === undefined
) {
    resultado.felicidade = 100;
}
if (
    resultado.energia === undefined
) {
    resultado.energia = 100;
}
if (
    resultado.higiene === undefined
) {
    resultado.higiene = 100;
}
if (
    resultado.saude === undefined
) {
    resultado.saude = 100;
}
if (
    resultado.moedas === undefined
) {
    resultado.moedas = 100;
}
if (
    resultado.pontos === undefined
) {
    resultado.pontos = 0;
}
if (
    resultado.nivel === undefined
) {
    resultado.nivel = 1;
}
if (!resultado.album) {
    resultado.album = [];
}
if (!resultado.conquistas) {
    resultado.conquistas = [];
}
petton =
    resultado;
atualizarTempo();
verificarCrescimento();
atualizarCaracteristicasVisiveis();
atualizarAlbum();
salvarPetton();
return petton;

}

/* =========================================================
VARIÁVEL PRINCIPAL
========================================================= */

let petton = null;

/* =========================================================
SALVAR
========================================================= */

function salvarPettonObjeto(dados) {

try {
    localStorage.setItem(
        PETTON_CHAVE,
        JSON.stringify(dados)
    );
} catch (erro) {
    console.error(
        "Erro ao salvar Petton:",
        erro
    );
}

}

function salvarPetton() {

if (!petton) {
    return;
}
salvarPettonObjeto(
    petton
);

}

/* =========================================================
TEMPO / NECESSIDADES
========================================================= */

function atualizarTempo() {

if (!petton) {
    return;
}
const agora =
    new Date();
const ultima =
    petton.ultimaAtualizacao
        ? new Date(
            petton.ultimaAtualizacao
        )
        : agora;
let minutos =
    (
        agora.getTime() -
        ultima.getTime()
    ) / 60000;
minutos =
    Math.max(
        0,
        Math.min(
            minutos,
            1440
        )
    );
petton.fome =
    limitar(
        petton.fome -
        (minutos * 0.025)
    );
petton.energia =
    limitar(
        petton.energia -
        (minutos * 0.015)
    );
petton.higiene =
    limitar(
        petton.higiene -
        (minutos * 0.01)
    );
petton.felicidade =
    limitar(
        petton.felicidade -
        (minutos * 0.008)
    );
petton.ultimaAtualizacao =
    agora.toISOString();

}

/* =========================================================
CRESCIMENTO
========================================================= */

function verificarCrescimento() {

if (!petton) {
    return;
}
/*
   SEM DATA DE NASCIMENTO = OVO
*/
if (!petton.dateNascimento) {
    petton.fase =
        "ovo";
    return;
}
/*
   COM DATA DE NASCIMENTO = NASCEU
*/
const dias =
    obterIdadeDias(
        petton
    );
const faseAnterior =
    petton.fase;
const novaFase =
    descobrirFase(dias);
petton.fase =
    novaFase;
if (
    faseAnterior !== novaFase
) {
    adicionarConquista(
        "crescimento_" +
        novaFase
    );
}

}

/* =========================================================
CARACTERÍSTICAS VISÍVEIS
========================================================= */

function atualizarCaracteristicasVisiveis() {

if (!petton) {
    return;
}
/*
   Antes do nascimento:
   nada aparece.
*/
if (!petton.dateNascimento) {
    petton.caracteristicasVisiveis = {
        cor: false,
        olhos: false,
        padrao: false,
        orelhas: false,
        patas: false,
        rabo: false,
        nariz: false
    };
    return;
}
const dias =
    obterIdadeDias(
        petton
    );
petton.caracteristicasVisiveis = {
    cor: true,
    olhos: dias >= 2,
    padrao: dias >= 3,
    orelhas: true,
    patas: dias >= 4,
    rabo: dias >= 5,
    nariz: true
};

}

/* =========================================================
NASCIMENTO
========================================================= */

function nascerPetton() {

if (!petton) {
    return false;
}
/*
   Se já nasceu,
   não nasce novamente.
*/
if (petton.dateNascimento) {
    /*
       Corrige automaticamente caso
       algum dado antigo tenha ficado
       como "ovo".
    */
    if (petton.fase === "ovo") {
        petton.fase =
            descobrirFase(
                obterIdadeDias(
                    petton
                )
            );
        salvarPetton();
    }
    return false;
}
if (!petton.especie) {
    petton.especie =
        escolher(
            PETTON_ESPECIES
        );
}
if (!petton.caracteristicas) {
    petton.caracteristicas =
        gerarCaracteristicas(
            petton.especie
        );
}
/*
   AQUI ACONTECE O NASCIMENTO.
*/
petton.dateNascimento =
    new Date().toISOString();
/*
   IMPORTANTE:
   depois de nascer, a fase
   nunca é "ovo".
*/
petton.fase =
    "bebe";
petton.fome = 80;
petton.felicidade = 100;
petton.energia = 100;
petton.higiene = 100;
petton.saude = 100;
petton.caracteristicasVisiveis = {
    cor: true,
    olhos: false,
    padrao: false,
    orelhas: true,
    patas: false,
    rabo: false,
    nariz: true
};
adicionarConquista(
    "nascimento"
);
criarFotoAlbum(0);
salvarPetton();
return true;

}

/* =========================================================
ALIMENTAÇÃO
========================================================= */

function alimentar(valor) {

if (!petton) {
    return false;
}
if (
    petton.fase === "ovo"
) {
    return false;
}
valor =
    Number(valor) || 10;
petton.fome =
    limitar(
        petton.fome + valor
    );
petton.felicidade =
    limitar(
        petton.felicidade + 2
    );
petton.pontos += 2;
salvarPetton();
return true;

}

/* =========================================================
BRINCAR
========================================================= */

function brincar(valor) {

if (!petton) {
    return false;
}
if (
    petton.fase === "ovo"
) {
    return false;
}
if (
    petton.energia < 10
) {
    return false;
}
valor =
    Number(valor) || 8;
petton.felicidade =
    limitar(
        petton.felicidade + 12
    );
petton.energia =
    limitar(
        petton.energia - valor
    );
petton.fome =
    limitar(
        petton.fome - 3
    );
petton.pontos += 5;
salvarPetton();
return true;

}

/* =========================================================
CARINHO
========================================================= */

function carinho() {

if (!petton) {
    return false;
}
if (
    petton.fase === "ovo"
) {
    return false;
}
petton.felicidade =
    limitar(
        petton.felicidade + 5
    );
petton.pontos += 1;
salvarPetton();
return true;

}

/* =========================================================
DORMIR
========================================================= */

function dormir() {

if (!petton) {
    return false;
}
if (
    petton.fase === "ovo"
) {
    return false;
}
petton.energia =
    limitar(
        petton.energia + 25
    );
petton.felicidade =
    limitar(
        petton.felicidade + 3
    );
salvarPetton();
return true;

}

/* =========================================================
STATUS
========================================================= */

function obterStatusPetton() {

if (!petton) {
    return null;
}
atualizarTempo();
verificarCrescimento();
atualizarCaracteristicasVisiveis();
atualizarAlbum();
salvarPetton();
return {
    fome:
        petton.fome,
    felicidade:
        petton.felicidade,
    energia:
        petton.energia,
    higiene:
        petton.higiene,
    saude:
        petton.saude,
    idadeDias:
        obterIdadeDias(
            petton
        ),
    fase:
        petton.fase
};

}

/* =========================================================
IDENTIDADE
========================================================= */

function obterIdentidade() {

if (!petton) {
    return null;
}
return {
    especie:
        petton.especie,
    caracteristicas:
        petton.caracteristicas,
    visiveis:
        petton.caracteristicasVisiveis,
    raridade:
        petton.caracteristicas
            ? petton.caracteristicas.raridade
            : "comum"
};

}

/* =========================================================
CONQUISTAS
========================================================= */

function adicionarConquista(id) {

if (!petton) {
    return;
}
if (!petton.conquistas) {
    petton.conquistas = [];
}
if (
    !petton.conquistas.includes(id)
) {
    petton.conquistas.push(id);
}
salvarPetton();

}

/* =========================================================
ÁLBUM
========================================================= */

const MARCOS_ALBUM = [
0,
3,
7,
15,
30,
60,
90,
120
];

function criarFotoAlbum(dia) {

if (!petton) {
    return;
}
if (!petton.album) {
    petton.album = [];
}
const existe =
    petton.album.some(
        foto =>
            Number(foto.dia) ===
            Number(dia)
    );
if (existe) {
    return;
}
petton.album.push({
    dia: dia,
    data:
        new Date().toISOString(),
    nome:
        petton.nome,
    especie:
        petton.especie,
    caracteristicas:
        JSON.parse(
            JSON.stringify(
                petton.caracteristicas
            )
        )
});
salvarPetton();

}

function atualizarAlbum() {

if (!petton) {
    return;
}
if (!petton.dateNascimento) {
    return;
}
const dias =
    obterIdadeDias(
        petton
    );
MARCOS_ALBUM.forEach(
    function(marco) {
        if (
            dias >= marco
        ) {
            criarFotoAlbum(
                marco
            );
        }
    }
);

}

/* =========================================================
API PETTON
========================================================= */

const Petton = {

get dados() {
    return petton;
},
carregar() {
    if (!petton) {
        petton =
            carregarPetton();
    } else {
        atualizarTempo();
        verificarCrescimento();
        atualizarCaracteristicasVisiveis();
        atualizarAlbum();
        salvarPetton();
    }
    return petton;
},
salvar() {
    salvarPetton();
    return true;
},
nascer() {
    return nascerPetton();
},
alimentar(valor) {
    return alimentar(valor);
},
brincar(valor) {
    return brincar(valor);
},
carinho() {
    return carinho();
},
dormir() {
    return dormir();
},
status() {
    return obterStatusPetton();
},
identidade() {
    return obterIdentidade();
},
atualizarCaracteristicas() {
    atualizarCaracteristicasVisiveis();
    return petton
        ? petton.caracteristicasVisiveis
        : null;
},
idadeDias() {
    return petton
        ? obterIdadeDias(
            petton
        )
        : 0;
},
fase() {
    return petton
        ? petton.fase
        : "ovo";
},
album() {
    atualizarAlbum();
    return petton
        ? petton.album
        : [];
}

};

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

    if (!petton) {
        return;
    }
    atualizarTempo();
    verificarCrescimento();
    atualizarCaracteristicasVisiveis();
    atualizarAlbum();
    salvarPetton();
},
60000

);
