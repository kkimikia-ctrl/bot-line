const listaKaraoke = [
    // --- Pop & Rock Nacional (Novos e Modernos) ---
    { categoria: "Pop & Rock Nacional", titulo: "Piloto - Jão", link: "https://www.youtube.com/watch?v=watch_pop1" },
    { categoria: "Pop & Rock Nacional", titulo: "Idiota - Jão", link: "https://www.youtube.com/watch?v=watch_pop2" },
    { categoria: "Pop & Rock Nacional", titulo: "Pupila - Vitor Kley & ANAVITÓRIA", link: "https://www.youtube.com/watch?v=watch_pop3" },
    { categoria: "Pop & Rock Nacional", titulo: "Dona Cismada - Lagum", link: "https://www.youtube.com/watch?v=watch_pop4" },
    { categoria: "Pop & Rock Nacional", titulo: "Me Desculpa Jay Z - Djonga", link: "https://www.youtube.com/watch?v=watch_pop5" },
    { categoria: "Pop & Rock Nacional", titulo: "Mal Feito - Hugo & Guilherme ft. Marília Mendonça", link: "https://www.youtube.com/watch?v=watch_pop6" },
    { categoria: "Pop & Rock Nacional", titulo: "Café e Amor - Gusttavo Lima", link: "https://www.youtube.com/watch?v=watch_pop7" },
    { categoria: "Pop & Rock Nacional", titulo: "Modo Avião - Luísa Sonza", link: "https://www.youtube.com/watch?v=watch_pop8" },
    { categoria: "Pop & Rock Nacional", titulo: "Deixa - ANAVITÓRIA ft. Matheus & Kauan", link: "https://www.youtube.com/watch?v=watch_pop9" },

    // --- Pop & Rock Nacional (Clássicos e Anos 2000) ---
    { categoria: "Pop & Rock Nacional", titulo: "Pais e Filhos - Legião Urbana", link: "https://www.youtube.com/watch?v=5s30W0wZt3o" },
    { categoria: "Pop & Rock Nacional", titulo: "Sutilmente - Skank", link: "https://www.youtube.com/watch?v=Gk5X3aK1N6M" },
    { categoria: "Pop & Rock Nacional", titulo: "Vou Deixar - Skank", link: "https://www.youtube.com/watch?v=watch_skank1" },
    { categoria: "Pop & Rock Nacional", titulo: "Pelados em Santos - Mamonas Assassinas", link: "https://www.youtube.com/watch?v=b1QZ6sD_w6c" },
    { categoria: "Pop & Rock Nacional", titulo: "Pro Dia Descer Feliz - Barão Vermelho", link: "https://www.youtube.com/watch?v=watch_barao1" },
    { categoria: "Pop & Rock Nacional", titulo: "O Sol - Jota Quest", link: "https://www.youtube.com/watch?v=watch_jota1" },
    { categoria: "Pop & Rock Nacional", titulo: "Fácil - Jota Quest", link: "https://www.youtube.com/watch?v=watch_jota2" },
    { categoria: "Pop & Rock Nacional", titulo: "Natiruts - Reggae Power", link: "https://www.youtube.com/watch?v=watch_nati1" },
    { categoria: "Pop & Rock Nacional", titulo: "Pitty - Equalize", link: "https://www.youtube.com/watch?v=watch_pitty1" },
    { categoria: "Pop & Rock Nacional", titulo: "Pitty - Teto de Vidro", link: "https://www.youtube.com/watch?v=watch_pitty2" },
    { categoria: "Pop & Rock Nacional", titulo: "Charlie Brown Jr. - Só os Loucos Sabem", link: "https://www.youtube.com/watch?v=watch_cbjr1" },
    { categoria: "Pop & Rock Nacional", titulo: "Charlie Brown Jr. - Zóio de Lula", link: "https://www.youtube.com/watch?v=watch_cbjr2" },
    { categoria: "Pop & Rock Nacional", titulo: "Capital Inicial - Natasha", link: "https://www.youtube.com/watch?v=watch_cap1" },
    { categoria: "Pop & Rock Nacional", titulo: "Capital Inicial - Rota Principal", link: "https://www.youtube.com/watch?v=watch_cap2" },
    { categoria: "Pop & Rock Nacional", titulo: "Legião Urbana - Eduardo e Mônica", link: "https://www.youtube.com/watch?v=watch_leg1" },
    { categoria: "Pop & Rock Nacional", titulo: "Engenheiros do Hawaii - Infinita Highway", link: "https://www.youtube.com/watch?v=watch_eng1" },

    // --- Hits Recentes & Atuais ---
    { categoria: "Hits Recentes", titulo: "Let's Bora - Israel & Rodolffo ft. Ana Castela", link: "https://www.youtube.com/watch?v=watch_novo1" },
    { categoria: "Hits Recentes", titulo: "Nosso Quadro - Ana Castela", link: "https://www.youtube.com/watch?v=watch_novo2" },
    { categoria: "Hits Recentes", titulo: "Erro Gostoso - Simone Mendes", link: "https://www.youtube.com/watch?v=watch_novo3" },
    { categoria: "Hits Recentes", titulo: "Zona de Perigo - Léo Santana", link: "https://www.youtube.com/watch?v=watch_novo5" },

    // --- Sertanejo & Modão ---
    { categoria: "Sertanejo & Modão", titulo: "Evidências - Chitãozinho & Xororó", link: "https://www.youtube.com/watch?v=e9Z6x4g36Ao" },
    { categoria: "Sertanejo & Modão", titulo: "Dormir na Praça - Bruno & Marrone", link: "https://www.youtube.com/watch?v=7zM6W6a1L9o" },
    { categoria: "Sertanejo & Modão", titulo: "Infiel - Marília Mendonça", link: "https://www.youtube.com/watch?v=5Xp_2Wy6W2E" },
    { categoria: "Sertanejo & Modão", titulo: "Telefone Mudo - Trio Parada Dura", link: "https://www.youtube.com/watch?v=watch_exemplo2" },

    // --- Pagode & Axé ---
    { categoria: "Pagode & Axé", titulo: "Cheia de Manias - Raça Negra", link: "https://www.youtube.com/watch?v=6P3M8nZ0F2M" },
    { categoria: "Pagode & Axé", titulo: "Deixa Acontecer - Grupo Revelação", link: "https://www.youtube.com/watch?v=watch_exemplo4" },
    { categoria: "Pagode & Axé", titulo: "Cilada - Molejo", link: "https://www.youtube.com/watch?v=watch_exemplo6" },

    // --- Anos 80 & 90 (Clássicos) ---
    { categoria: "Anos 80 & 90", titulo: "Fera Ferida - Roberto Carlos", link: "https://www.youtube.com/watch?v=3S1xZ8v9x2A" },
    { categoria: "Anos 80 & 90", titulo: "Olhos Coloridos - Sandra de Sá", link: "https://www.youtube.com/watch?v=1Z3xZ8v9x2A" },
    { categoria: "Anos 80 & 90", titulo: "Malandragem - Cássia Eller", link: "https://www.youtube.com/watch?v=8K1xZ8v9x2A" },

    // --- MPB & Românticas ---
    { categoria: "MPB & Românticas", titulo: "Oceano - Djavan", link: "https://www.youtube.com/watch?v=9L1xZ8v9x2A" },
    { categoria: "MPB & Românticas", titulo: "Como É Grande O Meu Amor Por Você - Roberto Carlos", link: "https://www.youtube.com/watch?v=watch_exemplo12" }
];
