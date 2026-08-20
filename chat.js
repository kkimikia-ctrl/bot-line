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
const listaSalas = document.getElementById('salas-lista');

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
const qMensagens = query(collection(db, "mensagens"), orderBy("data", "asc"));
onSnapshot(qMensagens, (snapshot) => {
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
            } catch (e) {
                console.error("Erro ao criar sala: ", e);
                alert("Erro ao criar sala.");
            }
        }
    });
}

// 🔄 Sincronização em tempo real das salas criadas
const qSalas = query(collection(db, "salas"), orderBy("criadoEm", "asc"));
onSnapshot(qSalas, (snapshot) => {
    listaSalas.innerHTML = "";
    snapshot.forEach((doc) => {
        const sala = doc.data();
        const btnSala = document.createElement('button');
        btnSala.classList.add('sala-tag');
        btnSala.textContent = `# ${sala.nome}`;
        btnSala.addEventListener('click', () => {
            alert(`Você entrou na sala: ${sala.nome}`);
        });
        listaSalas.appendChild(btnSala);
    });
});
