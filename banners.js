// banners.js - Injeta o Cabeçalho e o Carrossel Infinito em qualquer página
function carregarSistemaDeBanners(tituloPagina = "Central de Jogos", voltarUrl = "entretenimento.html") {
    
    // 1. Injeta o CSS padrão necessário para o topo e o carrossel
    const styleId = "sistema-banners-css";
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            body {
                padding-top: 135px !important;
                margin: 0;
            }
            .top-header {
                background-color: #1e40af;
                color: white;
                padding: 10px 12px;
                text-align: center;
                font-weight: bold;
                font-size: 15px;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 3001;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
            }
            .top-header span {
                font-size: 15px;
                font-weight: bold;
                flex-grow: 1;
                text-align: center;
            }
            .back-btn {
                background: rgba(255,255,255,0.2);
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: bold;
                text-decoration: none;
                cursor: pointer;
            }
            .banner-carousel {
                position: fixed;
                top: 41px;
                left: 0;
                width: 100%;
                background: rgba(30, 64, 175, 0.95);
                backdrop-filter: blur(5px);
                padding: 8px 0;
                z-index: 3000;
                overflow-x: auto;
                display: flex;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                -webkit-overflow-scrolling: touch;
                box-sizing: border-box;
            }
            .banner-carousel::-webkit-scrollbar {
                display: none;
            }
            .carousel-track {
                display: flex;
                gap: 10px;
                width: max-content;
                padding: 0 10px;
                animation: rolarInfinito 35s linear infinite;
            }
            .banner-carousel:hover .carousel-track,
            .banner-carousel:active .carousel-track {
                animation-play-state: paused;
            }
            .ad-banner-card {
                flex: 0 0 150px;
                height: 90px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
                border: 2px dashed #b0bec5;
                cursor: pointer;
            }
            .ad-banner-card img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                position: absolute;
                top: 0;
                left: 0;
            }
            .ad-placeholder-text {
                font-size: 11px;
                color: #555;
                font-weight: bold;
                z-index: 2;
                text-align: center;
                padding: 0 5px;
                background: rgba(255, 255, 255, 0.85);
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
            }
            @keyframes rolarInfinito {
                0% { transform: translateX(0); }
                100% { transform: translateX(var(--scroll-amount)); }
            }
        `;
        document.head.appendChild(style);
    }

    // 2. Cria e insere o HTML do Cabeçalho e do Carrossel no topo do Body
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="top-header">
            <a href="${voltarUrl}" class="back-btn">⬅ Voltar</a>
            <span>${tituloPagina}</span>
            <div style="width: 50px;"></div>
        </div>

        <div class="banner-carousel">
            <div class="carousel-track" id="carouselTrack">
                <div class="ad-banner-card" onclick="registrarCliqueBanner('banner-jogo-1', 'fale-conosco.html')">
                    <div class="ad-placeholder-text"><span>🖼️ Anuncie Aqui</span><span style="font-size: 9px; color: #888; margin-top: 2px;">Jogo 1</span></div>
                </div>
                <div class="ad-banner-card" onclick="registrarCliqueBanner('banner-jogo-2', 'fale-conosco.html')">
                    <div class="ad-placeholder-text"><span>🖼️ Anuncie Aqui</span><span style="font-size: 9px; color: #888; margin-top: 2px;">Jogo 2</span></div>
                </div>
                <div class="ad-banner-card" onclick="registrarCliqueBanner('banner-jogo-3', 'fale-conosco.html')">
                    <div class="ad-placeholder-text"><span>🖼️ Anuncie Aqui</span><span style="font-size: 9px; color: #888; margin-top: 2px;">Jogo 3</span></div>
                </div>
                <div class="ad-banner-card" onclick="registrarCliqueBanner('banner-jogo-4', 'fale-conosco.html')">
                    <div class="ad-placeholder-text"><span>🖼️ Anuncie Aqui</span><span style="font-size: 9px; color: #888; margin-top: 2px;">Jogo 4</span></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertBefore(wrapper, document.body.firstChild);

    // 3. Ativa a animação do carrossel infinito
    const track = document.getElementById('carouselTrack');
    if (track && !track.dataset.initialized) {
        const items = Array.from(track.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
        const totalWidth = track.scrollWidth / 2;
        track.style.setProperty('--scroll-amount', `-${totalWidth}px`);
        track.dataset.initialized = "true";
    }
}
