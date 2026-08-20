// Importações básicas para o funcionamento do chat
console.log("Arquivo chat.js carregado com sucesso!");

// Capturando os elementos da tela
const inputMensagem = document.getElementById('mensagem-input');
const botaoEnviar = document.getElementById('enviar-btn');
const listaMensagens = document.getElementById('mensagens-lista');

// Evento de clique no botão Enviar
botaoEnviar.addEventListener('click', () => {
    const texto = inputMensagem.value;
    
    if (texto.trim() === "") {
        alert("Digite uma mensagem antes de enviar!");
        return;
    }

    // Criando o elemento visual da mensagem enviada na tela
    const novoBalao = document.createElement('div');
    novoBalao.classList.add('mensagem-balao', 'mensagem-enviada');
    novoBalao.textContent = texto;
    
    listaMensagens.appendChild(novoBalao);
    
    // Limpando o campo de texto
    inputMensagem.value = "";
    
    // Rolando a tela para a mensagem mais recente
    listaMensagens.scrollTop = listaMensagens.scrollHeight;
});
