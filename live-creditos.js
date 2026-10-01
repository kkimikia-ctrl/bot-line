/* =========================================================

   AJUDA JP

   LIVE - CRÉDITOS E PRESENTES

   Arquivo: live-creditos.js

========================================================= */

import {

    getFirestore,

    doc,

    collection,

    runTransaction,

    serverTimestamp,

    onSnapshot

}

from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

/* =========================================================

   VARIÁVEIS INTERNAS

========================================================= */

let db = null;

let usuarioAtual = {

    id:"",

    nome:"Usuário"

};

let obterLiveAtual = null;

let unsubscribeCarteira = null;

let enviandoPresente = false;

/* =========================================================

   CONFIGURAÇÃO

========================================================= */

/*

   O lives.html chama esta função uma única vez.

   Recebemos:

   - Firestore

   - usuário do LINE

   - função que informa qual Live está aberta

*/

export function iniciarSistemaCreditos(config){

    db = config.db;

    usuarioAtual =

        config.usuarioAtual || {

            id:"",

            nome:"Usuário"

        };

    obterLiveAtual =

        config.obterLiveAtual;

    iniciarMonitoramentoCarteira();

}

/* =========================================================

   FORMATAR PONTOS

========================================================= */

function formatarSaldo(valor){

    const numero =

        Number(valor) || 0;

    return numero.toLocaleString(

        "pt-BR"

    );

}

/* =========================================================

   MOSTRAR SALDO NA TELA

========================================================= */

function atualizarSaldoNaTela(valor){

    const saldo =

        formatarSaldo(valor);

    const saldoHome =

        document.getElementById(

            "user-wallet"

        );

    const saldoLive =

        document.getElementById(

            "user-wallet-live"

        );

    if(saldoHome){

        saldoHome.innerText =

            saldo;

    }

    if(saldoLive){

        saldoLive.innerText =

            saldo;

    }

}

/* =========================================================

   CARTEIRA EM TEMPO REAL

========================================================= */

function iniciarMonitoramentoCarteira(){

    if(unsubscribeCarteira){

        unsubscribeCarteira();

        unsubscribeCarteira =

            null;

    }

    if(

        !db ||

        !usuarioAtual.id

    ){

        atualizarSaldoNaTela(0);

        return;

    }

    const carteiraRef =

        doc(

            db,

            "creditos_usuario",

            usuarioAtual.id

        );

    unsubscribeCarteira =

        onSnapshot(

            carteiraRef,

            snapshot => {

                if(!snapshot.exists()){

                    atualizarSaldoNaTela(0);

                    return;

                }

                const dados =

                    snapshot.data();

                atualizarSaldoNaTela(

                    dados.saldo || 0

                );

            },

            error => {

                console.error(

                    "Erro ao carregar carteira:",

                    error

                );

            }

        );

}

/* =========================================================

   ENVIAR PRESENTE

========================================================= */

export async function enviarPresente(

    nome,

    valor

){

    if(enviandoPresente){

        return;

    }

    if(!db){

        alert(

            "A carteira ainda não foi carregada."

        );

        return;

    }

    if(!usuarioAtual.id){

        alert(

            "Não foi possível identificar seu usuário do LINE."

        );

        return;

    }

    /* =====================================================

       DESCOBRIR A LIVE ATUAL

    ===================================================== */

    const liveAtual =

        typeof obterLiveAtual === "function"

        ?

        obterLiveAtual()

        :

        null;

    if(

        !liveAtual ||

        !liveAtual.id

    ){

        alert(

            "Nenhuma Live está aberta."

        );

        return;

    }

    if(!liveAtual.criadorId){

        alert(

            "Não foi possível identificar o criador da Live."

        );

        return;

    }

    /* =====================================================

       NÃO PODE PRESENTEAR A SI MESMO

    ===================================================== */

    if(

        liveAtual.criadorId ===

        usuarioAtual.id

    ){

        alert(

            "Você não pode enviar presente para sua própria Live."

        );

        return;

    }

    /* =====================================================

       VALIDAR VALOR

    ===================================================== */

    const valorPresente =

        Number(valor);

    const valoresPermitidos = [

        50,

        100,

        200,

        300,

        500

    ];

    if(

        !valoresPermitidos.includes(

            valorPresente

        )

    ){

        alert(

            "Valor de presente inválido."

        );

        return;

    }

    /* =====================================================

       DIVISÃO

       70% CRIADOR

       30% AJUDA JP

    ===================================================== */

    const valorCriador =

        Math.floor(

            valorPresente * 0.70

        );

    const valorAjudaJP =

        valorPresente -

        valorCriador;

    /* =====================================================

       CONFIRMAÇÃO

    ===================================================== */

    const confirmar =

        window.confirm(

            "Enviar "

            +

            nome

            +

            " por "

            +

            valorPresente

            +

            " pontos?"

        );

    if(!confirmar){

        return;

    }

    enviandoPresente =

        true;

    try{

        /* =================================================

           REFERÊNCIAS

        ================================================= */

        const carteiraEspectadorRef =

            doc(

                db,

                "creditos_usuario",

                usuarioAtual.id

            );

        const carteiraCriadorRef =

            doc(

                db,

                "creditos_usuario",

                liveAtual.criadorId

            );

        const presenteRef =

            doc(

                collection(

                    db,

                    "presentesLive"

                )

            );

        /* =================================================

           TRANSAÇÃO

        ================================================= */

        await runTransaction(

            db,

            async transaction => {

                /*

                   IMPORTANTE:

                   fazemos as leituras primeiro.

                */

                const carteiraEspectador =

                    await transaction.get(

                        carteiraEspectadorRef

                    );

                const carteiraCriador =

                    await transaction.get(

                        carteiraCriadorRef

                    );

                /* =========================================

                   CARTEIRA DO ESPECTADOR

                ========================================= */

                if(

                    !carteiraEspectador.exists()

                ){

                    throw new Error(

                        "CARTEIRA_NAO_ENCONTRADA"

                    );

                }

                const saldoEspectador =

                    Number(

                        carteiraEspectador

                            .data()

                            .saldo

                        || 0

                    );

                /* =========================================

                   VERIFICAR SALDO

                ========================================= */

                if(

                    saldoEspectador <

                    valorPresente

                ){

                    throw new Error(

                        "SALDO_INSUFICIENTE"

                    );

                }

                /* =========================================

                   DESCONTAR DO ESPECTADOR

                ========================================= */

                transaction.update(

                    carteiraEspectadorRef,

                    {

                        saldo:

                            saldoEspectador

                            -

                            valorPresente

                    }

                );

                /* =========================================

                   CREDITAR 70% AO CRIADOR

                ========================================= */

                if(

                    carteiraCriador.exists()

                ){

                    const saldoCriador =

                        Number(

                            carteiraCriador

                                .data()

                                .saldo

                            || 0

                        );

                    transaction.update(

                        carteiraCriadorRef,

                        {

                            saldo:

                                saldoCriador

                                +

                                valorCriador

                        }

                    );

                }

                else{

                    /*

                       Se o criador ainda não possuir

                       carteira, cria uma.

                    */

                    transaction.set(

                        carteiraCriadorRef,

                        {

                            saldo:

                                valorCriador

                        }

                    );

                }

                /* =========================================

                   REGISTRAR O PRESENTE

                ========================================= */

                transaction.set(

                    presenteRef,

                    {

                        liveId:

                            liveAtual.id,

                        liveTitulo:

                            liveAtual.titulo || "",

                        presenteNome:

                            nome,

                        valorTotal:

                            valorPresente,

                        /* divisão */

                        valorCriador:

                            valorCriador,

                        valorAjudaJP:

                            valorAjudaJP,

                        percentualCriador:

                            70,

                        percentualAjudaJP:

                            30,

                        /* quem enviou */

                        remetenteId:

                            usuarioAtual.id,

                        remetenteNome:

                            usuarioAtual.nome

                            || "Usuário",

                        /* quem recebeu */

                        criadorId:

                            liveAtual.criadorId,

                        criadorNome:

                            liveAtual.criadorNome

                            || "Criador",

                        criadoEm:

                            serverTimestamp()

                    }

                );

            }

        );

        /* =================================================

           REGISTRAR NO CHAT

        ================================================= */

        try{

            const mensagemRef =

                doc(

                    collection(

                        db,

                        "mensagensLive"

                    )

                );

            await runTransaction(

                db,

                async transaction => {

                    transaction.set(

                        mensagemRef,

                        {

                            liveId:

                                liveAtual.id,

                            usuarioId:

                                usuarioAtual.id,

                            usuarioNome:

                                usuarioAtual.nome

                                || "Usuário",

                            mensagem:

                                "enviou "

                                +

                                nome

                                +

                                " 🎁",

                            tipo:

                                "presente",

                            valorPresente:

                                valorPresente,

                            criadaEm:

                                serverTimestamp()

                        }

                    );

                }

            );

        }

        catch(errorChat){

            /*

               O presente já foi processado.

               Uma falha no chat não deve

               cobrar novamente.

            */

            console.error(

                "Presente enviado, mas não apareceu no chat:",

                errorChat

            );

        }

        /* =================================================

           SUCESSO

        ================================================= */

        alert(

            "🎁 Presente enviado!\n\n"

            +

            nome

            +

            "\n"

            +

            valorPresente

            +

            " pontos"

        );

    }

    catch(error){

        console.error(

            "Erro ao enviar presente:",

            error

        );

        if(

            error.message ===

            "SALDO_INSUFICIENTE"

        ){

            alert(

                "Você não tem pontos suficientes."

            );

        }

        else if(

            error.message ===

            "CARTEIRA_NAO_ENCONTRADA"

        ){

            alert(

                "Sua carteira não foi encontrada."

            );

        }

        else{

            alert(

                "Não foi possível enviar o presente."

            );

        }

    }

    finally{

        enviandoPresente =

            false;

    }

}

/* =========================================================

   ENCERRAR LISTENER DA CARTEIRA

========================================================= */

export function pararSistemaCreditos(){

    if(unsubscribeCarteira){

        unsubscribeCarteira();

        unsubscribeCarteira =

            null;

    }

}
