// ⚙️ Importações do Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

// Variável para controlar em qual sala o usuário está atualmente
let salaAtualId = "geral"; 

// 💬 Envio de mensagens vinculado à sala atual
botaoEnviar.addEventListener('click', async () => {
    const texto = inputMensagem.value.trim();
    if (texto === "") return;

    try {
        await addDoc(collection(db, "mensagens"), {
            texto: texto,
            salaId: salaAtualId,
            data: new Date().getTime() // Usando número para evitar erros de índice
        });
        inputMensagem.value = "";
    } catch (e) {
        console.error("Erro ao enviar mensagem: ", e);
        alert("Erro ao enviar mensagem.");
    }
});

// 🔄 Sincronização em tempo real das mensagens por sala
function carregarMensagens(idSala) {
    salaAtualId = idSala;
    
    // Consulta simplificada apenas com o filtro (não exige índice composto no Firebase)
    const qMensagens = query(
        collection(db, "mensagens"), 
        where("salaId", "==", idSala)
    );
    
    onSnapshot(qMensagens, (snapshot) => {
        listaMensagens.innerHTML = ""; 
        if (snapshot.empty) {
            listaMensagens.innerHTML = '<div class="mensagem-balao mensagem-recebida">Nenhuma mensagem nesta sala ainda. Seja o primeiro a escrever!</div>';
            return;
        }
        
        // Organiza as mensagens localmente por data para evitar erros
        const mensagensArray = [];
        snapshot.forEach((doc) => {
            mensagensArray.push(doc.data());
        });
        mensagensArray.sort((a, b) => a.data - b.data);

        mensagensArray.forEach((mensagem) => {
            const divBalao = document.createElement('div');
            divBalao.classList.add('mensagem-balao', 'mensagem-recebida');
            divBalao.textContent = mensagem.texto;
            listaMensagens.appendChild(divBalao);
        });
        
        listaMensagens.scrollTop = listaMensagens.scrollHeight;
    });
}

// Carregar o chat geral ao abrir a página
carregarMensagens("geral");

// 📁 Criação de novas salas de chat
if (botaoCriarSala) {
    botaoCriarSala.addEventListener('click', async () => {
        const nomeSala = prompt("Digite o nome da nova sala:");
        if (nomeSala && nomeSala.trim() !== "") {
            try {
                await addDoc(collection(db, "salas"), {
                    nome: nomeSala.trim(),
                    criadoEm: new Date().getTime()
                });
            } catch (e) {
                console.error("Erro ao criar sala: ", e);
                alert("Erro ao criar sala.");
            }
        }
    });
}

// 🔄 Sincronização das salas criadas no topo
const qSalas = collection(db, "salas");
onSnapshot(qSalas, (snapshot) => {
    listaSalas.innerHTML = "";
    const salasArray = [];
    snapshot.forEach((doc) => {
        const dados = doc.data();
        salasArray.push({ id: doc.id, ...dados });
    });
    salasArray.sort((a, b) => a.criadoEm - b.criadoEm);

    salasArray.forEach((sala) => {
        const btnSala = document.createElement('button');
        btnSala.classList.add('sala-tag');
        btnSala.textContent = `# ${sala.nome}`;
        
        btnSala.addEventListener('click', () => {
            carregarMensagens(sala.id);
            document.querySelectorAll('.sala-tag').forEach(b => b.style.background = "#ffffff");
            btnSala.style.background = "#e2e8f0";
        });
        
        listaSalas.appendChild(btnSala);
    });
});
