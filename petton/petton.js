/* =========================================================

   PETTON - SISTEMA CENTRAL

   Este arquivo guarda os dados principais do Petton.

   As outras páginas poderão usar os mesmos dados.

   ========================================================= */

const PETTON_STORAGE = "petton_dados_v1";

/* ---------------------------------------------------------

   DADOS PADRÃO

   --------------------------------------------------------- */

const PETTON_PADRAO = {

    nome: "Mimi",

    // ovo / bebe / crianca / adulto

    fase: "ovo",

    // Data em que o Petton nasceu

    dataNascimento: null,

    // Data em que o ovo foi criado

    dataOvo: null,

    // Características individuais

    caracteristicas: {

        cor: "laranja_branco",

        olhos: "azuis",

        rabo: "medio",

        formatoRabo: "curvado",

        manchas: "tabby",

        patas: "brancas",

        nariz: "rosa"

    },

    // Necessidades

    fome: 80,

    felicidade: 90,

    energia: 100,

    saude: 100,

    higiene: 100,

    // Sujeiras

    sujeiras: 0,

    // Estado

    doente: false,

    comCarie: false,

    // Economia

    moedas: 30,

    // Sistema de nível

    nivel: 1,

    xp: 0,

    // Pontos gerais do jogo

    pontos: 0,

    // Inventário

    inventario: {

        comida: [],

        brinquedos: [],

        moveis: [],

        acessorios: [],

        decoracoes: []

    },

    // Objetos colocados no quarto

    quarto: {

        piso: "madeira_clara",

        parede: "creme",

        moveis: [],

        decoracoes: []

    },

    // Álbum

    album: [],

    // Conquistas

    conquistas: [],

    // Últimas atividades

    ultimaAlimentacao: null,

    ultimoBanho: null,

    ultimaLimpeza: null,

    ultimaInteracao: null,

    // Controle de tempo

    ultimaAtualizacao: Date.now(),

    // Bônus diário

    ultimoBonus: ""

};

/* ---------------------------------------------------------

   COPIAR OBJETO

   --------------------------------------------------------- */

function copiarPetton(objeto) {

    return JSON.parse(JSON.stringify(objeto));

}

/* ---------------------------------------------------------

   SALVAR

   --------------------------------------------------------- */

function salvarPetton() {

    try {

        petton.ultimaAtualizacao = Date.now();

        localStorage.setItem(

            PETTON_STORAGE,

            JSON.stringify(petton)

        );

        return true;

    } catch (erro) {

        console.error("Erro ao salvar Petton:", erro);

        return false;

    }

}

/* ---------------------------------------------------------

   CARREGAR

   --------------------------------------------------------- */

function carregarPetton() {

    try {

        const salvo = localStorage.getItem(PETTON_STORAGE);

        if (!salvo) {

            const novo = copiarPetton(PETTON_PADRAO);

            // O ovo começa a existir quando o jogo é iniciado

            novo.dataOvo = Date.now();

            petton = novo;

            salvarPetton();

            return petton;

        }

        const dados = JSON.parse(salvo);

        // Junta os dados antigos com os novos

        petton = {

            ...copiarPetton(PETTON_PADRAO),

            ...dados,

            caracteristicas: {

                ...copiarPetton(PETTON_PADRAO).caracteristicas,

                ...(dados.caracteristicas || {})

            },

            inventario: {

                ...copiarPetton(PETTON_PADRAO).inventario,

                ...(dados.inventario || {})

            },

            quarto: {

                ...copiarPetton(PETTON_PADRAO).quarto,

                ...(dados.quarto || {})

            }

        };

        atualizarTempo();

        verificarCrescimento();

        salvarPetton();

        return petton;

    } catch (erro) {

        console.error("Erro ao carregar Petton:", erro);

        petton = copiarPetton(PETTON_PADRAO);

        return petton;

    }

}

/* ---------------------------------------------------------

   PETTON ATUAL

   --------------------------------------------------------- */

let petton = carregarPetton();

/* ---------------------------------------------------------

   LIMITAR VALORES

   --------------------------------------------------------- */

function limitar(valor, minimo = 0, maximo = 100) {

    return Math.max(

        minimo,

        Math.min(maximo, valor)

    );

}

/* ---------------------------------------------------------

   IDADE DO PETTON

   --------------------------------------------------------- */

function idadeDias() {

    if (!petton.dataNascimento) {

        return 0;

    }

    const agora = Date.now();

    const nascimento = new Date(

        petton.dataNascimento

    ).getTime();

    const diferenca = agora - nascimento;

    if (diferenca <= 0) {

        return 0;

    }

    return Math.floor(

        diferenca / (1000 * 60 * 60 * 24)

    );

}

/* ---------------------------------------------------------

   IDADE EM TEXTO

   --------------------------------------------------------- */

function idadeTexto() {

    if (petton.fase === "ovo") {

        return "Ainda no ovo";

    }

    const dias = idadeDias();

    if (dias === 0) {

        return "Nasceu hoje";

    }

    if (dias === 1) {

        return "1 dia";

    }

    if (dias < 30) {

        return dias + " dias";

    }

    const meses = Math.floor(dias / 30);

    if (meses === 1) {

        return "1 mês";

    }

    return meses + " meses";

}

/* ---------------------------------------------------------

   FASE DO PETTON

   --------------------------------------------------------- */

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

/* ---------------------------------------------------------

   CRESCIMENTO POR TEMPO REAL

   --------------------------------------------------------- */

/*

   O Petton NÃO cresce por cliques.

   O crescimento será baseado na idade real:

   0 dias      → bebê recém-nascido

   4 dias      → bebê

   15 dias     → bebê maior

   30 dias     → criança

   60 dias     → criança desenvolvida

   90 dias     → adulto

   Depois poderemos ajustar esses períodos.

*/

function verificarCrescimento() {

    if (!petton.dataNascimento) {

        return;

    }

    const dias = idadeDias();

    let novaFase = petton.fase;

    if (dias < 30) {

        novaFase = "bebe";

    } else if (dias < 90) {

        novaFase = "crianca";

    } else {

        novaFase = "adulto";

    }

    if (novaFase !== petton.fase) {

        petton.fase = novaFase;

        registrarAlbumAutomatico();

        salvarPetton();

    }

}

/* ---------------------------------------------------------

   NASCER

   --------------------------------------------------------- */

function nascerPetton() {

    if (petton.fase !== "ovo") {

        return false;

    }

    petton.fase = "bebe";

    petton.dataNascimento = Date.now();

    petton.fome = 70;

    petton.felicidade = 100;

    petton.energia = 100;

    petton.saude = 100;

    petton.higiene = 100;

    petton.sujeiras = 0;

    petton.ultimaAtualizacao = Date.now();

    registrarAlbumAutomatico();

    salvarPetton();

    return true;

}

/* ---------------------------------------------------------

   PASSAGEM DO TEMPO

   --------------------------------------------------------- */

function atualizarTempo() {

    if (!petton.ultimaAtualizacao) {

        petton.ultimaAtualizacao = Date.now();

        return;

    }

    const agora = Date.now();

    const diferenca =

        agora - petton.ultimaAtualizacao;

    const minutos =

        Math.floor(diferenca / (1000 * 60));

    if (minutos <= 0) {

        return;

    }

    /*

       A cada período sem abrir o jogo,

       as necessidades mudam um pouco.

    */

    if (petton.fase !== "ovo") {

        // Fome aumenta

        petton.fome = limitar(

            petton.fome - (minutos * 0.08)

        );

        // Energia diminui lentamente

        petton.energia = limitar(

            petton.energia - (minutos * 0.03)

        );

        // Higiene diminui

        petton.higiene = limitar(

            petton.higiene - (minutos * 0.02)

        );

        // Felicidade diminui lentamente

        petton.felicidade = limitar(

            petton.felicidade - (minutos * 0.015)

        );

        /*

           Pequena sujeira com o passar do tempo.

        */

        if (minutos >= 60) {

            const novasSujeiras =

                Math.floor(minutos / 120);

            petton.sujeiras =

                limitar(

                    petton.sujeiras + novasSujeiras,

                    0,

                    5

                );

        }

    }

    petton.ultimaAtualizacao = agora;

}

/* ---------------------------------------------------------

   ALIMENTAÇÃO

   --------------------------------------------------------- */

function alimentarPetton(valor = 15) {

    if (petton.fase === "ovo") {

        return false;

    }

    petton.fome = limitar(

        petton.fome + valor

    );

    petton.felicidade = limitar(

        petton.felicidade + 3

    );

    petton.ultimaAlimentacao = Date.now();

    ganharXP(5);

    salvarPetton();

    return true;

}

/* ---------------------------------------------------------

   CARINHO / INTERAÇÃO

   --------------------------------------------------------- */

function brincarPetton(valor = 5) {

    if (petton.fase === "ovo") {

        return false;

    }

    petton.felicidade = limitar(

        petton.felicidade + valor

    );

    petton.energia = limitar(

        petton.energia - 2

    );

    petton.ultimaInteracao = Date.now();

    ganharXP(3);

    salvarPetton();

    return true;

}

/* ---------------------------------------------------------

   BANHO

   --------------------------------------------------------- */

function banhoPetton() {

    if (petton.fase === "ovo") {

        return false;

    }

    petton.higiene = 100;

    petton.felicidade = limitar(

        petton.felicidade + 5

    );

    petton.ultimoBanho = Date.now();

    ganharXP(5);

    salvarPetton();

    return true;

}

/* ---------------------------------------------------------

   LIMPAR SUJEIRA

   --------------------------------------------------------- */

function limparPetton() {

    if (petton.fase === "ovo") {

        return false;

    }

    petton.sujeiras = 0;

    petton.higiene = limitar(

        petton.higiene + 20

    );

    petton.ultimaLimpeza = Date.now();

    ganharXP(3);

    salvarPetton();

    return true;

}

/* ---------------------------------------------------------

   DORMIR

   --------------------------------------------------------- */

function dormirPetton() {

    if (petton.fase === "ovo") {

        return false;

    }

    petton.energia = 100;

    petton.saude = limitar(

        petton.saude + 5

    );

    salvarPetton();

    return true;

}

/* ---------------------------------------------------------

   EXPERIÊNCIA

   --------------------------------------------------------- */

function ganharXP(valor = 1) {

    petton.xp += valor;

    const necessario =

        100 + ((petton.nivel - 1) * 50);

    while (petton.xp >= necessario) {

        petton.xp -= necessario;

        petton.nivel++;

        petton.moedas += 10;

    }

    salvarPetton();

}

/* ---------------------------------------------------------

   MOEDAS

   --------------------------------------------------------- */

function adicionarMoedas(valor) {

    petton.moedas += valor;

    if (petton.moedas < 0) {

        petton.moedas = 0;

    }

    salvarPetton();

}

/* ---------------------------------------------------------

   COMPRAR

   --------------------------------------------------------- */

function comprarItem(item) {

    if (!item) {

        return false;

    }

    const preco =

        Number(item.preco || 0);

    if (petton.moedas < preco) {

        return false;

    }

    petton.moedas -= preco;

    const categoria =

        item.categoria || "decoracoes";

    if (!petton.inventario[categoria]) {

        petton.inventario[categoria] = [];

    }

    petton.inventario[categoria].push({

        id: item.id,

        nome: item.nome,

        compradoEm: Date.now()

    });

    ganharXP(2);

    salvarPetton();

    return true;

}

/* ---------------------------------------------------------

   ÁLBUM

   --------------------------------------------------------- */

function registrarAlbumAutomatico() {

    if (petton.fase === "ovo") {

        return;

    }

    const dias = idadeDias();

    const momentos = [

        0,

        3,

        7,

        15,

        30,

        60,

        90

    ];

    if (!momentos.includes(dias)) {

        return;

    }

    const jaExiste =

        petton.album.some(

            foto => foto.dia === dias

        );

    if (jaExiste) {

        return;

    }

    petton.album.push({

        id: "dia-" + dias,

        dia: dias,

        fase: petton.fase,

        nome: petton.nome,

        caracteristicas:

            copiarPetton(

                petton.caracteristicas

            ),

        data: Date.now()

    });

    salvarPetton();

}

/* ---------------------------------------------------------

   CONQUISTAS

   --------------------------------------------------------- */

function adicionarConquista(id, nome) {

    const existe =

        petton.conquistas.some(

            item => item.id === id

        );

    if (existe) {

        return false;

    }

    petton.conquistas.push({

        id: id,

        nome: nome,

        data: Date.now()

    });

    salvarPetton();

    return true;

}

/* ---------------------------------------------------------

   BONUS DIÁRIO

   --------------------------------------------------------- */

function bonusDiario() {

    const hoje =

        new Date().toISOString().slice(0, 10);

    if (petton.ultimoBonus === hoje) {

        return 0;

    }

    const recompensa = 10;

    petton.moedas += recompensa;

    petton.ultimoBonus = hoje;

    adicionarConquista(

        "primeiro_bonus",

        "Primeiro bônus diário"

    );

    salvarPetton();

    return recompensa;

}

/* ---------------------------------------------------------

   RENOMEAR PETTON

   --------------------------------------------------------- */

function renomearPetton(novoNome) {

    if (!novoNome) {

        return false;

    }

    novoNome = String(novoNome).trim();

    if (novoNome.length < 1) {

        return false;

    }

    if (novoNome.length > 20) {

        novoNome = novoNome.substring(0, 20);

    }

    petton.nome = novoNome;

    salvarPetton();

    return true;

}

/* ---------------------------------------------------------

   OBTER STATUS

   --------------------------------------------------------- */

function obterStatusPetton() {

    atualizarTempo();

    verificarCrescimento();

    return {

        nome: petton.nome,

        fase: nomeFase(),

        idade: idadeTexto(),

        dias: idadeDias(),

        fome: Math.round(petton.fome),

        felicidade: Math.round(

            petton.felicidade

        ),

        energia: Math.round(

            petton.energia

        ),

        saude: Math.round(

            petton.saude

        ),

        higiene: Math.round(

            petton.higiene

        ),

        moedas: petton.moedas,

        nivel: petton.nivel,

        xp: petton.xp,

        sujeiras: petton.sujeiras,

        doente: petton.doente,

        faseCodigo: petton.fase

    };

}

/* ---------------------------------------------------------

   ATUALIZAÇÃO AUTOMÁTICA

   --------------------------------------------------------- */

setInterval(function() {

    atualizarTempo();

    verificarCrescimento();

    salvarPetton();

}, 60000);

/* ---------------------------------------------------------

   DISPONIBILIZAR PARA OUTRAS PÁGINAS

   --------------------------------------------------------- */

window.Petton = {

    get dados() {

        return petton;

    },

    salvar: salvarPetton,

    carregar: carregarPetton,

    status: obterStatusPetton,

    idadeDias: idadeDias,

    idadeTexto: idadeTexto,

    nomeFase: nomeFase,

    nascer: nascerPetton,

    alimentar: alimentarPetton,

    brincar: brincarPetton,

    banho: banhoPetton,

    limpar: limparPetton,

    dormir: dormirPetton,

    comprar: comprarItem,

    moedas: adicionarMoedas,

    renomear: renomearPetton,

    bonusDiario: bonusDiario,

    conquista: adicionarConquista,

    registrarAlbum: registrarAlbumAutomatico,

    crescer: verificarCrescimento

};
