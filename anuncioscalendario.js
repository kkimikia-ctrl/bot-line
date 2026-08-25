// Lista centralizada dos anúncios do pacote (Semana e Mês)
const listaAnuncios = [
    { imagem: "mini-banner-1.jpg", link: "mes.html", titulo: "📢 Anúncio 01" },
    { imagem: "mini-banner-2.jpg", link: "mes.html", titulo: "📢 Anúncio 02" },
    { imagem: "mini-banner-3.jpg", link: "mes.html", titulo: "📢 Anúncio 03" },
    { imagem: "mini-banner-4.jpg", link: "mes.html", titulo: "📢 Anúncio 04" }
];

function carregarCarrosselAnuncios() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    track.innerHTML = "";

    listaAnuncios.forEach(anuncio => {
        track.innerHTML += `
            <a href="${anuncio.link}">
                <img src="${anuncio.imagem}" alt="Anúncio" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <span style="display:none;">${anuncio.titulo}</span>
            </a>
        `;
    });

    const items = Array.from(track.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    const totalWidth = track.scrollWidth / 2;
    track.style.setProperty('--scroll-amount', `-${totalWidth}px`);
}

window.addEventListener('load', carregarCarrosselAnuncios);
