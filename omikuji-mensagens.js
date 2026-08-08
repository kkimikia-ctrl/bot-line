const listaOmikuji = [
    {
        titulo: "🌸 Dai-Kichi: A Aurora da Grande Prosperidade",
        texto: "Este é um dos augúrios mais auspiciosos do cosmos. Uma onda de energias altamente renovadoras está banhando o seu caminho, limpando obstáculos antigos e abrindo portas que pareciam trancadas. É o momento ideal para plantar novas sementes em projetos pessoais ou profissionais. Confie plenamente na sua intuição, pois ela guiará você diretamente para escolhas prósperas. A alegria e a harmonia familiar caminham lado a lado com o seu sucesso hoje."
    },
    {
        titulo: "⭐ Kichi: A Harmonia e a Força da União",
        texto: "O dia reserva momentos de profunda paz interior e sincera conexão com as pessoas ao seu redor. As arestas de antigos mal-entendidos tendem a se dissolver com facilidade e compreensão mútua. Cultive a paciência e valorize os pequenos gestos de carinho e afeto vindos de quem você ama. No campo das realizações, a cooperação coletiva trará resultados muito superiores aos esperados. Compartilhe seus sonhos com quem torce por você."
    },
    {
        titulo: "🍀 Sho-Kichi: O Desabrochar do Talento Oculto",
        texto: "Sua dedicação silenciosa e o seu esforço diário começam finalmente a chamar a atenção de forças positivas ao seu redor. Este é um período em que a sua criatividade estará em evidência, permitindo solucionar problemas complexos com elegância e facilidade. Não tenha receio de assumir a liderança em tarefas importantes. O reconhecimento merecido está se aproximando rapidamente, trazendo recompensas gratificantes para o seu espírito."
    },
    {
        titulo: "☀️ Kin-Un Kichi: O Fluxo Abundante da Fortuna",
        texto: "Os ventos sopram fortemente a favor da sua estabilidade e expansão financeira. O momento é propício para reorganizar investimentos, planejar o futuro com sabedoria ou receber notícias animadoras sobre ganhos inesperados. No entanto, lembre-se de que a verdadeira riqueza reside também na generosidade e no equilíbrio. Desfrute desta fase de maré alta com gratidão e discernimento, pois boas surpresas materiais estão logo ali."
    },
    {
        titulo: "🕊️ Hei-Kichi: A Calma que Constrói Conquistas",
        texto: "Nem todas as vitórias fazem barulho; algumas chegam em completo silêncio, trazendo a serenidade de que você tanto precisava. Este dia convida ao recolhimento estratégico, ao descanso mental e à organização das ideias. Não force situações que exigem tempo para amadurecer. Deixe que o rio da vida corra no seu ritmo natural. Ao manter a mente tranquila, você perceberá oportunidades valiosas que passariam despercebidas na pressa."
    },
    {
        titulo: "🔥 Shō-Yū: A Coragem de Romper Barreiras",
        texto: "Uma centelha de energia audaciosa desperta dentro de você neste dia. Se havia alguma hesitação em dar o primeiro passo rumo a um objetivo ousado, o momento de agir chegou. A sorte favorece os determinados e aqueles que ousam sair da zona de conforto com planejamento e valentia. Desafios que pareciam gigantescos perderão a força diante da sua nova postura firme e decidida. Avance sem medo."
    },
    {
        titulo: "🌊 Sui-Kichi: A Fluidez que Supera Obstáculos",
        texto: "Assim como a água contorna a rocha implacável até encontrar o seu caminho, você terá hoje uma capacidade admirável de contornar adversidades. Problemas que pareciam intransponíveis dissolverão diante de uma abordagem flexível e inteligente. Confie na sua capacidade de adaptação. Relacionamentos interpessoais ganham um tom de leveza e compreensão profunda, tornando o ambiente ao seu redor muito mais agradável e acolhedor."
    },
    {
        titulo: "🌱 Ki-Kichi: O Crescimento Silencioso e Fértil",
        texto: "As bases que você construiu com tanto suor e paciência no passado começam agora a gerar raízes profundas e folhas verdes. Este é um dia de estabilidade e calmaria construtiva. Cuide da sua saúde física e mental, invista tempo no autoconhecimento e fortaleça os laços com a terra e com o lar. Pequenos progressos diários somam-se hoje para formar um alicerce indestrutível para o seu futuro próximo."
    },
    {
        titulo: "💎 Hō-Kichi: O Brilho da Autenticidade",
        texto: "Sua verdadeira essência brilha intensamente hoje, atraindo olhares de admiração e respeito genuíno. É um dia excelente para expressar suas opiniões, mostrar seu trabalho criativo ou tomar decisões que dependem estritamente da sua individualidade. Não tente se moldar às expectativas alheias; o seu diferencial é exatamente aquilo que o torna único. A sorte caminha ao lado daqueles que ousam ser autênticos e verdadeiros."
    },
    {
        titulo: "🌙 Yū-Kichi: A Sabedoria da Intuição Noturna",
        texto: "As respostas que você tem buscado com tanta ansiedade nos últimos tempos não estão nos ruídos do mundo externo, mas sim na quietude dos seus pensamentos. Reserve alguns momentos do dia para o silêncio, a meditação ou a reflexão íntima. Um insight poderoso cruzará a sua mente, clareando decisões importantes sobre o seu futuro. Siga sua intuição sem reservas; ela está mais afiada do que nunca."
    },
    {
        titulo: "⚡ Den-Kichi: A Inspiração Relâmpago",
        texto: "Prepare-se para uma rajada repentina de criatividade e clareza mental. Ideias brilhantes surgirão nos momentos mais improváveis do dia, trazendo soluções práticas para velhos dilemas que tiravam o seu sono. Anote tudo o que vier à mente e não hesite em colocar planos em prática rapidamente. A energia elétrica da inovação está ao seu favor, transformando o ordinário em algo extraordinário."
    },
    {
        titulo: "🧭 Michi-Kichi: O Encontro com o Propósito",
        texto: "Você se sentirá hoje profundamente alinhado com o seu verdadeiro caminho de vida. Aquelas dúvidas persistentes sobre qual direção tomar começam a se dissipar, revelando uma rota clara, segura e cheia de significado. É um dia excelente para traçar metas de longo prazo, reavaliar prioridades e caminhar com passos firmes rumo às suas maiores aspirações. O universo apoia cada passo dado com intenção sincera."
    },
    {
        titulo: "🛡️ Mamoru-Kichi: A Proteção Invisível",
        texto: "Uma redoma de boas energias ampara os seus passos ao longo de todo o dia, afastando energias densas, mal-entendidos e imprevistos desagradáveis. Sinta-se seguro para realizar suas tarefas rotineiras e interagir com o público. É um momento propício para resolver pendências burocráticas ou legais, pois a clareza e a justiça estarão do seu lado. Relaxe e desfrute da paz de espírito proporcionada por esta blindagem sutil."
    },
    {
        titulo: "🍂 Aki-Kichi: A Colheita dos Frutos Maduros",
        texto: "Tudo o que você plantou com dedicação nos meses anteriores começa agora a dar frutos doces e abundantes. Este é um período de justa recompensa, onde o esforço persistente se converte em conquistas tangíveis e motivos legítimos de celebração. Olhe para trás com orgulho da sua trajetória e permita-se saborear o momento presente sem pressa. Novos ciclos prósperos logo se iniciarão a partir desta base sólida."
    },
    {
        titulo: "🌟 Hoshi-Kichi: O Despertar do Carisma Pessoal",
        texto: "Sua luz natural está intensificada, fazendo com que você exerça uma influência magnética e positiva sobre todos ao seu redor. É um dia espetacular para reuniões, negociações, apresentações em público ou para estreitar laços afetivos importantes. As pessoas estarão mais receptivas às suas ideias e dispostas a colaborar com seus projetos. Use esse encanto natural com sabedoria e generosidade."
    },
    {
        titulo: "🕊️ Wa-Kichi: A Paz que Restaura as Forças",
        texto: "O estresse e a correria dos dias anteriores dão lugar a um refúgio de tranquilidade e calmaria profunda. Aproveite este dia para desacelerar o ritmo, cuidar do seu templo físico e desfrutar da companhia de pessoas que lhe tragam paz de alma. A cura para o cansaço mental reside na simplicidade dos pequenos momentos de silêncio e contemplação. Suas energias serão totalmente recarregadas."
    },
    {
        titulo: "🔮 Gen-Kichi: A Mágica das Coincidências Boas",
        texto: "O dia será marcado por sincronicidades impressionantes e pequenos 'milagres' cotidianos que mostrarão que você está exatamente no lugar certo e na hora certa. Esteja atento aos sinais sutis, encontros inesperados e mensagens que parecem vir na hora exata em que você mais precisava. O universo está conspirando ativamente a favor da sua felicidade e do seu bem-estar geral."
    },
    {
        titulo: "🏛️ Chi-Kichi: A Força da Sabedoria Ancestral",
        texto: "Conselhos valiosos vindos de pessoas mais experientes ou de velhas lições aprendidas no passado serão a chave mestra para resolver um dilema atual. Esteja com a mente aberta para ouvir e absorver conhecimentos que parecem simples, mas carregam profundas verdades. A prudência e o bom senso serão seus melhores conselheiros ao longo de toda esta jornada diária."
    },
    {
        titulo: "🎨 Ge-Kichi: A Expressão que Liberta a Alma",
        texto: "Sua veia artística, criativa ou expressiva está pulsando forte hoje. Encontre tempo para canalizar seus sentimentos através de alguma atividade manual, escrita, música ou design. Transformar emoções reprimidas em algo belo trará um alívio imenso e uma sensação revigorante de liberdade interior. Deixe sua imaginação voar sem amarras ou julgamentos prévios."
    },
    {
        titulo: "⚓ Tei-Kichi: A Âncora da Estabilidade Emocional",
        texto: "Mesmo que o mundo ao redor pareça agitado ou imprevisível, você possuirá hoje um centro inabalável de paz e equilíbrio emocional. Nenhuma palavra impensada ou circunstância passageira terá o poder de tirar a sua serenidade. Essa postura firme e centrada inspirará confiança em todos os que dependem da sua liderança ou conselho. Você é o porto seguro de alguém hoje."
    },
    {
        titulo: "🎯 Moku-Kichi: A Precisão nos Seus Alvos",
        texto: "Seu foco mental estará afiado como uma lâmina neste dia. Tarefas que exigem concentração extrema, planejamento detalhado ou tomada de decisões críticas serão executadas com perfeição cirúrgica. Elimine distrações superficiais e concentre suas energias naquilo que realmente importa para o seu progresso. O acerto será certeiro e os resultados trarão enorme orgulho."
    },
    {
        titulo: "🎪 Kō-Kichi: A Alegria dos Encontros Festivos",
        texto: "O otimismo e a descontração tomam conta do seu dia, tornando-o perfeito para momentos de confraternização, risadas e lazer com amigos ou familiares queridos. Deixe de lado temporariamente as preocupações sérias e permita-se viver a leveza do momento presente. O bom humor será contagioso e atrairá conexões humanas muito ricas e memoráveis para a sua memória."
    },
    {
        titulo: "🚪 Mon-Kichi: Portas Abertas para Novas Fases",
        texto: "Uma transição importante se aproxima e o dia de hoje traz o empurrãozinho cósmico que faltava para você cruzar essa nova soleira com confiança. Ciclos desgastados encerram-se de forma natural, abrindo espaço para experiências inéditas, aprendizados estimulantes e horizontes repletos de esperança. Não olhe para trás com nostalgia; o melhor está logo adiante."
    },
    {
        titulo: "🍯 Mitsu-Kichi: A Doçura nas Relações Humanas",
        texto: "Suas palavras terão hoje um poder especial de cura, conciliação e encanto. Se houver alguma rusga pendente em seu círculo social ou profissional, esta é a oportunidade de ouro para usar a diplomacia e a doçura para harmonizar o ambiente. O afeto que você demonstrar aos outros retornará multiplicado para o seu próprio coração, gerando um dia extremamente acolhedor."
    },
    {
        titulo: "🦅 Taka-Kichi: A Visão Panorâmica dos Seus Planos",
        texto: "Você conseguirá hoje enxergar o panorama geral de sua vida com uma clareza impressionante, distanciando-se de picuinhas e problemas menores. Essa perspectiva elevada permitirá redefinir estratégias de longo prazo com sabedoria, identificando gargalos invisíveis que atrapalhavam o seu avanço. Voe alto e planeje seu futuro com a certeza de quem domina o próprio destino."
    },
    {
        titulo: "💎 Shō-Kichi: O Valor do Esforço Contínuo",
        texto: "Pequenos hábitos diários construídos com disciplina começam a render dividendos visíveis e muito satisfatórios. Não subestime o poder de fazer o básico bem feito todos os dias. O dia de hoje traz a comprovação reconfortante de que você está no caminho correto, construindo degrau por degrau uma muralha inabalável de conquistas duradouras. Continue firme e constante."
    },
    {
        titulo: "🌿 Sō-Kichi: A Cura através da Simplicidade",
        texto: "O antídoto para qualquer cansaço ou ansiedade recente está na reconexão com a simplicidade da natureza e dos elementos puros. Caminhe ao ar livre, respire fundo, cuide de plantas ou simplesmente tire alguns minutos para contemplar o céu. O corpo e a mente pedirão pausas regeneradoras que trarão clareza e bem-estar instantâneos para a sua rotina."
    },
    {
        titulo: "🔮 Ne-Kichi: A Gestação de Grandes Projetos",
        texto: "Ideias revolucionárias estão se formando nos bastidores da sua mente, aguardando o momento certo para vir à luz. Não tenha pressa em expor seus planos antes que eles estejam maduros o suficiente. Use o dia de hoje para planejar, estruturar e proteger suas visões mais ambiciosas. O silêncio estratégico será seu maior aliado para garantir o sucesso futuro."
    },
    {
        titulo: "🌈 Niji-Kichi: A Promessa após a Tempestade",
        texto: "Se os dias recentes foram marcados por tribulações ou incertezas, o dia de hoje traz a promessa nítida de bonança, alívio e renovação de esperanças. As nuvens pesadas se dissipam, revelando um cenário colorido e cheio de novas possibilidades para você e sua família. Celebre essa virada de chave energética com um sorriso no rosto e o coração leve."
    },
    {
        titulo: "🏆 Kan-Kichi: A Conquista do Reconhecimento",
        texto: "Seu esforço persistente nos bastidores finalmente ganha os holofotes que merece. Uma conquista importante, elogio sincero ou validação profissional elevará a sua autoestima e confirmará o seu valor. Aproveite este momento de glória sem falsa modestia, mas mantenha a humildade que sempre caracterizou a sua jornada rumo ao topo."
    },
    {
        titulo: "🕯️ Tomoshibi-Kichi: A Luz que Ilumina o Escuro",
        texto: "Mesmo que algum setor da sua vida pareça incerto, você será hoje o farol que guiará não apenas a si mesmo, mas também inspirará pessoas ao seu redor. Sua sabedoria inata e resiliência servirão de exemplo reconfortante para quem atravessa momentos difíceis. Compartilhe sua luz sem medo de esvaziar-se; ela só tende a brilhar com mais intensidade."
    },
    {
        titulo: "🌊 Nami-Kichi: A Força Renovadora das Ondas",
        texto: "A vida é feita de ciclos dinâmicos, e hoje você sentirá uma onda revigorante de energia limpando velhos padrões e estagnações. Permita-se surfar essa maré de mudanças com flexibilidade e entusiasmo. O que for para ir embora, irá com leveza; o que for verdadeiro e bom para o seu crescimento, permanecerá ancorado com ainda mais força."
    },
    {
        titulo: "🍇 Mi-Kichi: O Sabor Doce da Perseverança",
        texto: "A paciência cultivada diante de longas esperas começa a render frutos deliciosos. O dia reserva uma grata surpresa relacionada a algo que você aguardava com expectativa moderada. A sensação de dever cumprido trará um sorriso largo e a certeza íntima de que cada gota de suor derramada no passado valeu imensamente a pena."
    },
    {
        titulo: "🦉 Hō-Kichi: A Intuição e a Clareza Mental",
        texto: "Sua percepção sobre as intenções alheias e sobre os rumos de suas negociações estará impecável. Nenhuma ilusão ou falsidade conseguirá passar despercebida pelo seu radar interno. Use essa sabedoria com discrição para proteger seus interesses, guiar decisões contratuais e escolher com precisão quem merece caminhar ao seu lado."
    },
    {
        titulo: "🧱 Kabe-Kichi: A Solidez dos Alicerces",
        texto: "Sua segurança material e emocional ganha reforços estruturais importantes hoje. É um dia excelente para fechar acordos de longo prazo, cuidar de reformas, imóveis ou consolidação de parcerias sólidas. A solidez do que você constrói agora resistirá bravamente a qualquer intempérie futura. Durma com a tranquilidade do dever bem executado."
    },
    {
        titulo: "📜 Fumi-Kichi: A Palavra Empenhada que Vale Ouro",
        texto: "Sua reputação de honestidade, ética e cumprimento de acordos trará excelentes dividendos morais e práticos neste dia. Pessoas influentes notarão a sua seriedade, abrindo portas para parcerias de alto nível baseadas na confiança mútua. Honre sua palavra e colha a paz de ter uma consciência absolutamente limpa."
    },
    {
        titulo: "💎 Kō-Kichi: O Lapidar do Diamante Interior",
        texto: "As pequenas pressões ou desafios recentes não vieram para destruí-lo, mas sim para lapidar as suas melhores qualidades, transformando-o em uma versão muito mais forte e resiliente de si mesmo. Olhe para os obstáculos recentes como ferramentas de aprimoramento pessoal. O resultado desse processo é um brilho interior único e indestrutível."
    },
    {
        titulo: "🕊️ Hato-Kichi: A Mensagem de Paz e Conciliação",
        texto: "Se houveram mal-entendidos recentes com amigos ou familiares, o dia de hoje traz o clima ideal para o perdão, o abraço sincero e o reatamento de laços preciosos. A energia da paz reina soberana, facilitando diálogos que antes pareciam difíceis ou espinhosos. Escolha a harmonia acima da razão e seja feliz."
    },
    {
        titulo: "🌟 Ryū-Kichi: A Força Imparável da Determinação",
        texto: "Uma coragem quase mítica invadirá o seu ser, dando fôlego renovado para enfrentar metas ambiciosas e resolver pendências complexas. Nada parecerá grande demais ou difícil demais para a sua capacidade atual de realização. Avance com garra, pois o sucesso coroa aqueles que unem força de vontade e estratégia inteligente."
    },
    {
        titulo: "🌾 Ino-Kichi: A Abundância da Terra Fértil",
        texto: "O sustento, o conforto material e a tranquilidade doméstica estarão em total harmonia ao longo do seu dia. É um momento de agradecer pelas provisões diárias, desfrutar de boas refeições em família e sentir a segurança de que o essencial nunca faltará na sua mesa. A fartura é reflexo direto do seu trabalho honesto."
    },
    {
        titulo: "🎪 Shō-Kichi: A Surpresa Divertida do Destino",
        texto: "Quebre a monotonia da rotina com uma pitada de espontaneidade e bom humor. O dia reserva encontros inusitados, piadas espontâneas e momentos de descontração genuína que arrancarão gargalhadas sinceras do fundo da sua alma. A alegria compartilhada tem o poder mágico de dissolver qualquer peso desnecessário."
    },
    {
        titulo: "🧭 Kaze-Kichi: Os Ventos da Mudança Positiva",
        texto: "Uma brisa fresca de novidades começa a soprar na sua direção, trazendo ares de renovação para o seu ambiente de trabalho ou lar. Não tenha medo de reorganizar espaços, mudar rotinas ou experimentar novas abordagens. A mudança trará um dinamismo revigorante que eliminará qualquer sensação de tédio ou estagnação."
    },
    {
        titulo: "🛡️ Tate-Kichi: O Escudo contra Energias Negativas",
        texto: "Sua aura estará protegida contra fofocas, negatividade alheia ou ambientes tóxicos. Mantenha o seu foco interno inabalável e não permita que o pessimismo dos outros contaminate o seu otimismo natural. Você sairá ileso de qualquer situação desafiadora graças à sua blindagem emocional elevada."
    },
    {
        titulo: "💧 Mizu-Kichi: A Hidratação da Alma e da Mente",
        texto: "O dia pede recolhimento leve, hidratação, banhos relaxantes e momentos de introspecção regeneradora. Desconecte-se um pouco do barulho digital e ouça o som da sua própria respiração. Cuidar de si mesmo não é egoísmo, é a chave fundamental para manter sua energia em alta performance."
    },
    {
        titulo: "🔥 Hi-Kichi: O Fogo Sagrado da Motivação",
        texto: "A chama da paixão pelos seus projetos pessoais arde com intensidade renovada hoje. Sinta essa energia calorosa impulsionando você para frente com entusiasmo contagiante. Use esse fogo interno para finalizar tarefas atrasadas e inspirar todos aqueles que trabalham ou convivem diretamente com você."
    },
    {
        titulo: "🌸 Hana-Kichi: O Desabrochar da Beleza Cotidiana",
        texto: "Abra os olhos para os detalhes simples e belos que cercam o seu dia a dia: o aroma do café, o sorriso de um estranho, a luz do sol batendo na janela. A felicidade genuína não habita grandes eventos futuros, mas sim a capacidade de apreciar a poesia escondida nos pequenos instantes presentes."
    },
    {
        titulo: "🌙 Tsuki-Kichi: A Magia da Calma Noturna",
        texto: "As horas que antecedem o descanso trarão uma paz profunda e reparadora para a sua mente. Aproveite a noite para relaxar sem culpa, organizar pensamentos e agradecer pelas pequenas vitórias conquistadas ao longo das últimas horas. Seu sono será profundo e revigorante."
    },
    {
        titulo: "⭐ Hoshi-Kichi: O Brilho Próprio que Ninguém Apaga",
        texto: "Não importa o tamanho dos desafios ao seu redor, a sua estrela interior brilha com uma intensidade única e inconfundível. Confie no seu brilho natural, exponha suas ideias com segurança e caminhe com a cabeça erguida. O mundo está pronto para aplaudir a sua autenticidade."
    },
    {
        titulo: "🚪 Tobi-Kichi: O Salto Rumo ao Desconhecido Fértil",
        texto: "O destino convida você hoje a dar um voto de fé em si mesmo e dar um passo ousado rumo ao novo. Mesmo sem enxergar todo o cenário adiante, confie que a rede de segurança invisível do universo se abrirá para sustentá-lo. A ousadia prudente será ricamente recompensada."
    },
    {
        titulo: "☀️ Taiyō-Kichi: O Sol da Alegria e da Vitalidade",
        texto: "Uma energia solar e radiante preenche cada célula do seu corpo hoje, dissipando o cansaço e trazendo disposição de sobra para realizar grandes feitos. Aproveite este dia ensolarado, seja por fora ou por dentro, para irradiar otimismo, espalhar bondade e colher sorrisos por onde passar."
    },
    {
        titulo: "🦁 Shishi-Kichi: A Bravura do Coração Valente",
        texto: "Você descobre hoje uma reserva oculta de coragem e audácia dentro de si. Questões que exigiam pulso firme ou enfrentamento de velhos medos serão superadas com uma postura majestosa e segura. Lidere sua própria jornada com orgulho e mostre ao mundo a sua verdadeira força interior."
    },
    {
        titulo: "🎋 Take-Kichi: A Flexibilidade do Bambu",
        texto: "Os ventos das circunstâncias sopram com força, mas a sua maior virtude hoje será a flexibilidade. Assim como o bambu enverga mas nunca quebra diante da tempestade, você se adaptará com genialidade a qualquer imprevisto, saindo fortalecido de qualquer situação inesperada."
    },
    {
        titulo: "🔮 Omu-Kichi: O Oráculo da Respostas Claras",
        texto: "Uma névoa mental que durava semanas começa a se dissipar por completo. Respostas que pareciam ocultas revelam-se com uma nitidez cristalina, permitindo que você tome rumos definitivos e muito mais assertivos em sua trajetória pessoal e profissional."
    },
    {
        titulo: "☕ Kahi-Kichi: O Ponto de Equilíbrio e Pausa",
        texto: "Faça uma pausa consciente na sua maratona diária. O dia pede que você desacelere para saborear o momento, alinhar as ideias e recarregar o espírito com leveza. As grandes sacadas do dia surgirão justamente quando você parar de correr atrás do tempo."
    },
    {
        titulo: "🎨 Kuru-Kichi: O Tino Comercial e Criativo",
        texto: "Sua capacidade de negociar, criar soluções e transformar ideias simples em excelentes oportunidades comerciais estará no ápice. Confie no seu poder de argumentação e na sua visão comercial aguçada para fechar acordos vantajosos hoje."
    },
    {
        titulo: "🪞 Kagami-Kichi: O Espelho da Auto-Reflexão",
        texto: "O dia convida a um olhar profundo para dentro de si mesmo. Reconhecer seus pontos fortes e aceitar com carinho o que precisa ser ajustado trará uma maturidade emocional admirável e um salto quântico na sua evolução pessoal."
    },
    {
        titulo: "🗝️ Kagi-Kichi: A Chave dos Segredos Revelados",
        texto: "Um mistério antigo ou uma informação crucial que estava faltando no seu quebra-cabeça diário finalmente virá à tona. Essa revelação abrirá portas antes inimagináveis, simplificando trâmites burocráticos ou profissionais complexos."
    },
    {
        titulo: "🏹 Ya-Kichi: A Flecha Disparada com Certeza",
        texto: "Quando uma flecha é lançada por um arqueiro focado, ela atinge o alvo sem desvios. É exatamente assim que será o seu dia: focado, certeiro e altamente produtivo. Suas metas diárias serão alcançadas com uma facilidade impressionante."
    },
    {
        titulo: "🛎️ Suzu-Kichi: O Som que Afasta a Negatividade",
        texto: "O tilintar alegre da sorte afasta qualquer vibração densa ou pensamento limitante do seu campo energético. Mantenha o sorriso no rosto e o coração aberto, pois a leveza será sua melhor armadura contra qualquer contratempo."
    },
    {
        titulo: "📜 Maki-Kichi: O Pergaminho dos Bons Negócios",
        texto: "Assinaturas de contratos, acordos amigáveis ou acertos financeiros importantes são favorecidos por esta energia auspiciosa. A palavra dada terá valor absoluto e trará imensa tranquilidade jurídica e contratual para o seu futuro."
    },
    {
        titulo: "🏮 Chōchin-Kichi: A Lanterna que Guia o Viajante",
        texto: "Mesmo em caminhos desconhecidos, você não tropeçará. Uma luz suave e constante guiará suas decisões e escolhas ao longo de todo o dia, garantindo que você chegue exatamente onde deseja com total segurança e conforto."
    },
    {
        titulo: "🧵 Ito-Kichi: Os Fios Invisíveis do Destino",
        texto: "Você perceberá hoje como as conexões humanas e as pequenas coincidências formam uma tapeçaria perfeita em sua vida. Um encontro casual ou uma mensagem inesperada trará um significado lindo e reconfortante para o seu momento atual."
    },
    {
        titulo: "🍵 Ocha-Kichi: A Hospitalidade e o Bem-Viver",
        texto: "O dia é perfeito para estreitar laços com amigos, receber visitas queridas ou simplesmente desfrutar de momentos acolhedores no aconchego do lar. A partilha de um bom momento trará uma sensação indescritível de paz à alma."
    },
    {
        titulo: "🏔️ Yama-Kichi: A Majestade da Montanha Firme",
        texto: "Inabalável como uma grande montanha, você resistirá com classe a qualquer tentativa de abalar a sua estrutura emocional. Sua estabilidade servirá de inspiração para todos que o cercam nos momentos de decisão."
    },
    {
        titulo: "🌊 Umi-Kichi: A Imensidão de Oportunidades",
        texto: "Assim como o oceano guarda tesouros imensos em suas profundezas, o dia de hoje reserva oportunidades fascinantes para quem estiver disposto a explorar novos horizontes com coragem e curiosidade saudável."
    },
    {
        titulo: "🍃 Kaze-Kichi: A Leveza que Leva o Peso Embora",
        texto: "Deixe que o vento leve embora todas as preocupações e ansiedades acumuladas nos últimos dias. O momento pede leveza, desapego do que não funciona e uma respiração funda rumo a um recomeço revigorante."
    },
    {
        titulo: "🪵 Ki-Kichi: A Senda da Resiliência Natural",
        texto: "Sua capacidade de absorver impactos e continuar crescendo em direção ao sol será testada e aprovada com louvor. Obstáculos passageiros servirão apenas para comprovar o quão profundas e fortes são as suas raízes."
    },
    {
        titulo: "🌑 Getsu-Kichi: O Poder da Gestação Silenciosa",
        texto: "A lua nova traz a energia perfeita para planejar no silêncio dos bastidores. Não alardeie seus próximos passos; deixe que a força do seu planejamento silencioso fale por si mesma quando chegar a hora certa."
    },
    {
        titulo: "💫 Hoshi-Kichi: O Desejo Atendido pelas Estrelas",
        texto: "Uma aspiração secreta que você guardava com carinho no fundo do coração começa a receber o sopro favorável do destino. Continue acreditando nos seus sonhos mais genuínos, pois o universo está trabalhando a seu favor."
    },
    {
        titulo: "🔥 Taki-Kichi: A Força da Cascata Purificadora",
        texto: "Uma verdadeira lavagem energética renovará as suas forças hoje. Tudo o que estava estagnado ou pesado é levado embora pela correnteza da renovação, abrindo espaço para um ciclo de extrema vitalidade e clareza."
    },
    {
        titulo: "🌸 Sakura-Kichi: A Beleza Efêmera do Presente",
        texto: "Aprecie a beleza exata de cada segundo que passa. O dia convida a viver o presente com intensidade, celebrando as pequenas belezas cotidianas sem a pressa constante de correr para o futuro."
    },
    {
        titulo: "🐢 Kame-Kichi: A Sabedoria da Constância",
        texto: "Lembre-se da fábula: devagar e sempre é como se alcançam as maiores distâncias. Não tenha pressa de ver resultados imediatos; sua constância diária garantirá uma vitória sólida, segura e definitiva a longo prazo."
    },
    {
        titulo: "🕊️ Tsuru-Kichi: A Longevidade e a Paz Plena",
        texto: "Augúrio de longas estradas cheias de saúde, paz de espírito e harmonia familiar. O dia traz uma sensação reconfortante de que a sua vida caminha em um ritmo abençoado, equilibrado e protegido."
    },
    {
        titulo: "🦊 Kine-Kichi: A Astúcia e a Solução Inteligente",
        texto: "Diante de um enigma prático ou profissional, sua mente funcionará com uma rapidez brilhante. Você encontrará soluções engenhosas que pouparão tempo e dinheiro, surpreendendo positivamente todos ao seu redor."
    },
    {
        titulo: "🎋 Sasa-Kichi: O Sussurro dos Bons Augúrios",
        texto: "Preste atenção aos sussurros da intuição e aos conselhos gentis que receber ao longo do dia. Pequenos detalhes carinhosos farão uma diferença gigantesca na forma como você conduzirá seus compromissos."
    },
    {
        titulo: "🍉 Natsu-Kichi: A Alegria e o Vigor da Estação",
        texto: "Uma energia solar, vibrante e contagiante invade o seu dia. É hora de colocar cor nos seus planos, sorrir mais, interagir com pessoas queridas e aproveitar a vida com entusiasmo e alto astral."
    },
    {
        titulo: "🍵 Chawan-Kichi: O Aconchego das Coisas Simples",
        texto: "A verdadeira felicidade se esconde nos hábitos mais simples: uma boa conversa, um ambiente limpo e organizado, uma xícara de chá ou café apreciada sem pressa. Valorize o seu refúgio e encontre paz nele."
    },
    {
        titulo: "🏮 Matsuri-Kichi: A Celebração das Conquistas",
        texto: "Mesmo as pequenas vitórias da semana merecem ser celebradas com alegria. O clima ao seu redor convida à festividade, à boa comida, ao descanso merecido e ao reconhecimento do seu próprio valor."
    },
    {
        titulo: "⛩️ Torii-Kichi: A Passagem para um Portal de Sorte",
        texto: "Você está cruzando um limiar importante em direção a uma fase muito mais feliz e equilibrada da sua vida. Deixe para trás velhos pesos e atravesse este portal com o coração leve e esperançoso."
    },
    {
        titulo: "🌊 Sazanami-Kichi: As Marolas da Tranquilidade",
        texto: "Nenhuma tempestade agitará o seu dia; no máximo, pequenas marolas pacíficas que apenas lembrarão você da beleza de estar vivo e em paz. Desfrute de um dia calmo, produtivo e harmonioso."
    }
];
