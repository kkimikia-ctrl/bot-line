// Importa o Firebase dinamicamente se necessário
if (typeof firebase === 'undefined') {
    const scriptApp = document.createElement('script');
    scriptApp.src = "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js";
    document.head.appendChild(scriptApp);
    const scriptFs = document.createElement('script');
    scriptFs.src = "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js";
    document.head.appendChild(scriptFs);
}

// A função agora recebe a categoria que queremos mostrar na página (ex: 'semanames', 'jogos', etc.)
function carregarCarrosselAnuncios(categoriaDesejada = 'semanames') {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    setTimeout(() => {
        // Inicializa o Firebase (substitua pelas suas credenciais reais)
        if (!firebase.apps.length) {
            const firebaseConfig = {
                apiKey: "SUA_API_KEY",
                authDomain: "SEU_DOMINIO.firebaseapp.com",
                projectId: "SEU_PROJECT_ID",
                storageBucket: "SEU_BUCKET.appspot.com",
                messagingSenderId: "SUA_MESSAGING_SENDER_ID",
                appId: "SUA_APP_ID"
            };
            firebase.initializeApp(firebaseConfig);
        }

        const db = firebase.firestore();
        const hojeStr = new Date().toISOString().split('T')[0];

        // Busca no Firestore apenas os anúncios da categoria escolhida
        db.collection("anuncios")
          .where("categoria", "==", categoriaDesejada)
          .get()
          .then((querySnapshot) => {
            let listaAnunciosDinamica = [];

            querySnapshot.forEach((doc) => {
                const dado = doc.data();
                // Verifica se o anúncio ainda está dentro do prazo de 1 mês
                if (dado.dataExpiracao >= hojeStr) {
                    listaAnunciosDinamica.push({
                        imagem: dado.imagemUrl,
                        link: dado.linkDestino || "#",
                        titulo: `📢 ${dado.nomeAnunciante}`
                    });
                }
            });

            // Se não houver anúncios válidos, exibe um aviso padrão
            if (listaAnunciosDinamica.length === 0) {
                track.innerHTML = `<div style="padding: 10px; font-size: 0.8rem; color: #64748b;">Espaço para Anúncios</div>`;
                return;
            }

            track.innerHTML = "";

            // Renderiza os anúncios vindos do Firebase com a mesma estrutura que já tinha
            listaAnunciosDinamica.forEach(anuncio => {
                track.innerHTML += `
                    <a href="${anuncio.link}" target="_blank">
                        <img src="${anuncio.imagem}" alt="Anúncio" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <span style="display:none;">${anuncio.titulo}</span>
                    </a>
                `;
            });

            // Mantém a sua lógica original do carrossel infinito
            const items = Array.from(track.children);
            items.forEach(item => {
                const clone = item.cloneNode(true);
                track.appendChild(clone);
            });

            const totalWidth = track.scrollWidth / 2;
            track.style.setProperty('--scroll-amount', `-${totalWidth}px`);
        }).catch(err => {
            console.error("Erro ao carregar anúncios do Firebase: ", err);
        });
    }, 500);
}

// Ao carregar a página, chamamos a função definindo qual categoria exibir (ex: 'semanames')
window.addEventListener('load', () => carregarCarrosselAnuncios('semanames'));
