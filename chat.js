// Importando o Firebase SDK necessário para o chat
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuração do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCTQTWEyj8f-Ddkj6PD9Fe8JHCVVjmkS_o",
  authDomain: "ajuda-jp.firebaseapp.com",
  projectId: "ajuda-jp",
  storageBucket: "ajuda-jp.firebasestorage.app",
  messagingSenderId: "40121072206",
  appId: "1:40121072206:web:8a844e632f004f61d0a11f"
};

// Inicializando o Firebase e o Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Capturando os elementos da tela
const inputMensagem = document.getElementById('mensagem-input');
const botaoEnviar = document.getElementById('enviar-btn');
const listaMensagens = document.getElementById('mensagens-lista');

// Evento de clique para enviar a mensagem
botaoEnviar.addEventListener('click', async () => {
    const texto = inputMensagem.value;
    
    if (texto.trim() === "") {
        alert("Digite uma mensagem antes de enviar!");
        return;
    }

    try {
        // Salvando a mensagem na coleção "mensagens" do Firestore
        await addDoc(collection(db, "mensagens"), {
            texto: texto,
            data: new Date()
        });

        // Limpando o campo de texto após enviar
        inputMensagem.value = "";
    } catch (e) {
        console.error("Erro ao enviar mensagem: ", e);
        alert("Erro ao enviar mensagem. Tente novamente.");
    }
});
