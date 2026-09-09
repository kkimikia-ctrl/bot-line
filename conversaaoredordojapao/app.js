// Seleção dos elementos das telas
const screenRules = document.getElementById('screen-rules');
const screenLobby = document.getElementById('screen-lobby');
const screenRoulette = document.getElementById('screen-roulette');
const screenChat = document.getElementById('screen-chat');

// Botões e textos
const btnAcceptRules = document.getElementById('btn-accept-rules');
const btnSpin = document.getElementById('btn-spin');
const btnReport = document.getElementById('btn-report');
const rouletteText = document.getElementById('roulette-text');
const chatCountdown = document.getElementById('chat-countdown');

// Controle de chances do usuário
let chancesRestantes = 2;

// 1. Ação do botão de aceitar as regras
btnAcceptRules.addEventListener('click', () => {
    screenRules.classList.add('hidden');
    screenLobby.classList.remove('hidden');
});

// 2. Ação de girar a roleta
btnSpin.addEventListener('click', () => {
    if (chancesRestantes <= 0) {
        alert('Você esgotou suas chances deste ciclo! Aguarde o kyukei (descanso).');
        return;
    }

    // Esconde o lobby e mostra a roleta de suspense
    screenLobby.classList.add('hidden');
    screenRoulette.classList.remove('hidden');

    // Textos de suspense mudando em tempo real
    setTimeout(() => {
        rouletteText.innerText = "Procurando alguém pelo Japão...";
    }, 1000);

    setTimeout(() => {
        rouletteText.innerText = "Quem será que está online agora?";
    }, 2000);

    setTimeout(() => {
        rouletteText.innerText = "Conectado! Entrando na conversa...";
    }, 3500);

    // Após 4.5 segundos, entra na tela de chat
    setTimeout(() => {
        screenRoulette.classList.add('hidden');
        screenChat.classList.remove('hidden');
        
        // Reduz 1 chance
        chancesRestantes--;
        document.getElementById('remaining-chances').innerText = chancesRestantes;

        // Inicia o cronômetro de 15 minutos (900 segundos)
        iniciarCronometroChat(900);
    }, 4500);
});

// 3. Função do cronômetro de 15 minutos do chat
function iniciarCronometroChat(tempoEmSegundos) {
    let tempoRestante = tempoEmSegundos;

    const intervalo = setInterval(() => {
        let minutos = Math.floor(tempoRestante / 60);
        let segundos = tempoRestante % 60;

        // Formata para ficar sempre com dois dígitos (ex: 15:05)
        minutos = minutos < 10 ? '0' + minutos : minutos;
        segundos = segundos < 10 ? '0' + segundos : segundos;

        chatCountdown.innerText = `${minutos}:${segundos}`;

        if (tempoRestante <= 0) {
            clearInterval(intervalo);
            alert('O tempo de 15 minutos acabou! A conversa foi encerrada.');
            fecharChat();
        }

        tempoRestante--;
    }, 1000);
}

// 4. Botão de Denunciar / Sair antecipadamente
btnReport.addEventListener('click', () => {
    const confirmar = confirm('Tem certeza que deseja sair ou denunciar? Você perderá esta chance e o chat será encerrado.');
    if (confirmar) {
        alert('Chat encerrado. Atenção: sair antes do tempo consome sua chance.');
        fecharChat();
    }
});

// Função para voltar ao lobby após o término do chat
function fecharChat() {
    screenChat.classList.add('hidden');
    screenLobby.classList.remove('hidden');
    
    // Se as chances acabarem, aqui no futuro entra a lógica de ativar o kyukei de 60 min
    if (chancesRestantes === 0) {
        document.getElementById('cooldown-timer').classList.remove('hidden');
        btnSpin.style.opacity = '0.5';
    }
}
