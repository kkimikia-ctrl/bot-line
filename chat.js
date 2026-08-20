// ⚙️ Importações do Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 🔑 Configuração do projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCTQTWEyj8f-Ddkj6PD9Fe8JHCVVjmkS_o",
  authDomain: "ajuda-jp.firebaseapp.com",
  projectId: "ajuda-jp",
  storageBucket: "ajuda-jp.firebasestorage.app",
  messagingSenderId: "40121072206",
  appId: "1:40121072206:web:8a844e632f004f61d0a11f"
};

// 🚀 Inicialização
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 📱 Captura de elementos da interface
const inputMensagem = document.getElementById('mensagem-input');
const botaoEnviar = document.getElementById('enviar-btn');
const listaMensagens = document.getElementById('mensagens-lista');
const botaoCriarSala = document.getElementById('btn-criar-sala');

// 💬 Envio de mensagens para o Firestore
botaoEnviar.addEventListener('click', async () => {
    const texto = inputMensagem.value.trim();
    if (texto === "") return;

    try {
        await addDoc(collection(db, "mensagens"), {
            texto: texto,
            data: new Date()
        });
        inputMensagem.value = "";
    } catch (e) {
        console.error("Erro ao enviar mensagem: ", e);
        alert("Erro ao enviar mensagem.");
    }
});

// 🔄 Sincronização em tempo real das mensagens
const q = query(collection(db, "mensagens"), orderBy("data", "asc"));
onSnapshot(q, (snapshot) => {
    listaMensagens.innerHTML = ""; 
    snapshot.forEach((doc) => {
        const mensagem = doc.data();
        const divBalao = document.createElement('div');
        divBalao.classList.add('mensagem-balao', 'mensagem-recebida');
        divBalao.textContent = mensagem.texto;
        listaMensagens.appendChild(divBalao);
    });
    listaMensagens.scrollTop = listaMensagens.scrollHeight;
});

// 📁 Criação de novas salas de chat
if (botaoCriarSala) {
    botaoCriarSala.addEventListener('click', async () => {
        const nomeSala = prompt("Digite o nome da nova sala:");
        if (nomeSala && nomeSala.trim() !== "") {
            try {
                await addDoc(collection(db, "salas"), {
                    nome: nomeSala.trim(),
                    criadoEm: new Date()
                });
                alert(`Sala "${nomeSala}" criada com sucesso!`);
            } catch (e) {
                console.error("Erro ao criar sala: ", e);
            }
        }
    });
}
