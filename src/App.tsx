/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, User, PenLine, Plus, X, Image as ImageIcon, Save, Edit2, Trash2, Library, Search, Star, Settings, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';

interface Book {
  id: number;
  title: string;
  story: string;
  image: string;
  author?: string;
  publicationDate?: string;
  synopsis?: string;
}

interface UserProfile {
  name: string;
  bio: string;
}

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const INITIAL_BOOKS: Book[] = [
  { 
    id: 1, 
    title: "Aguardando no Inferno", 
    author: "Lucas Mendes",
    publicationDate: "2023",
    synopsis: "Um jovem guerreiro deve enfrentar seus medos mais profundos para salvar sua vila de uma maldição milenar.",
    story: [
      "Em um mundo onde as sombras ganham vida, um jovem guerreiro deve enfrentar seus medos mais profundos para salvar sua vila de uma maldição milenar. A jornada o levará às profundezas do abismo, onde o tempo não existe e a esperança é a única arma contra a escuridão eterna.",
      "O calor das chamas infernais lambia as paredes de pedra, enquanto gritos de almas perdidas ecoavam pelo corredor infinito. Ele segurava sua espada com força, sentindo o pulso da magia antiga correndo por suas veias.",
      "Cada passo era uma batalha contra a própria sanidade, mas ele não podia recuar. O destino de milhares dependia de sua coragem nesta noite sem fim. As sombras pareciam sussurrar seu nome, tentando atraí-lo para o esquecimento.",
      "De repente, uma figura encapuzada surgiu das trevas. Seus olhos brilhavam como brasas e sua voz era como o som de ossos se quebrando. 'Você não deveria estar aqui, mortal', disse a criatura.",
      "O guerreiro ergueu sua espada, a lâmina brilhando com uma luz azulada. 'Eu vim buscar o que foi roubado', respondeu ele, sua voz firme apesar do medo que lhe gelava a espinha.",
      "A batalha que se seguiu foi brutal. Faíscas voavam enquanto aço encontrava magia negra. O guerreiro lutava com a habilidade de quem treinou a vida inteira para este momento.",
      "Mas o inimigo era implacável. A cada golpe defendido, outro vinha com mais força. O guerreiro começou a sentir o cansaço pesar em seus braços, mas a imagem de sua vila em chamas lhe dava forças.",
      "Com um grito de guerra, ele canalizou toda a sua energia em um único golpe. A luz da espada explodiu, cegando a criatura e dissipando as sombras ao redor.",
      "Quando a luz diminuiu, a criatura havia desaparecido, deixando para trás apenas um amuleto negro no chão. O guerreiro o pegou, sentindo uma energia fria emanar dele.",
      "Ele sabia que a jornada estava longe de terminar. Aquele era apenas o primeiro guardião. O verdadeiro mal ainda o aguardava nas profundezas do inferno."
    ].join("\n\n"),
    image: "https://picsum.photos/seed/book1/200/300" 
  },
  { 
    id: 2, 
    title: "Tudo outra vez", 
    author: "Mariana Costa",
    publicationDate: "2022",
    synopsis: "Clara descobre que está presa em um loop temporal e precisa encontrar o verdadeiro significado do amor e do perdão.",
    story: [
      "E se você pudesse viver o dia mais importante da sua vida repetidamente? Clara descobre que está presa em um loop temporal e precisa encontrar o verdadeiro significado do amor e do perdão para que o amanhã finalmente chegue.",
      "O relógio marcava 8:00 novamente. O cheiro de café fresco invadia o quarto, e o som do rádio era o mesmo de sempre. Ela já sabia cada palavra que seria dita, cada movimento que as pessoas fariam.",
      "Mas no fundo, ela sentia que algo estava diferente hoje. Talvez fosse a chance que ela tanto esperava para consertar o que quebrou há tanto tempo. Ela se levantou, determinada a mudar o curso dos eventos.",
      "Ao sair de casa, ela encontrou o vizinho, Sr. Almeida, que sempre perdia as chaves. Desta vez, ela as entregou antes mesmo que ele começasse a procurar. Ele sorriu, surpreso.",
      "No trabalho, ela evitou a discussão com o chefe entregando o relatório antes do prazo. A sensação de controle era inebriante, mas ela sabia que o verdadeiro desafio seria o jantar daquela noite.",
      "Era no jantar que tudo dava errado. A briga com Lucas, as palavras duras que não podiam ser retiradas. Hoje, ela escolheria o silêncio e a compreensão.",
      "Quando a noite chegou, o restaurante estava lotado. Lucas parecia tenso, como sempre. Mas quando ele começou a falar sobre seus medos, Clara apenas segurou sua mão.",
      "Pela primeira vez em meses, eles conversaram de verdade. Não sobre contas ou problemas, mas sobre sonhos e sentimentos. O loop temporal havia lhe dado o presente do tempo.",
      "Ao acordar na manhã seguinte, o relógio marcava 8:01. O rádio tocava uma música diferente. Clara sorriu. O amanhã finalmente havia chegado."
    ].join("\n\n"),
    image: "https://picsum.photos/seed/book2/200/300" 
  },
  { 
    id: 3, 
    title: "A Casa", 
    author: "Roberto Silva",
    publicationDate: "2021",
    synopsis: "Uma mansão abandonada no topo da colina esconde segredos que a cidade prefere esquecer.",
    story: [
      "Uma mansão abandonada no topo da colina esconde segredos que a cidade prefere esquecer. Quando um grupo de amigos decide explorar o local, eles descobrem que a casa não está tão vazia quanto parece.",
      "O portão de ferro rangeu ao ser empurrado. O jardim estava coberto de ervas daninhas e estátuas quebradas que pareciam observar os intrusos. O vento uivava entre as árvores secas.",
      "Cada quarto contava uma história, e nem todas tinham um final feliz. O assoalho rangia sob seus pés, e a poeira dançava na luz fraca das lanternas.",
      "Eles sentiam olhares invisíveis seguindo cada movimento. Retratos antigos pareciam mudar de expressão quando ninguém estava olhando. O ar estava pesado com o cheiro de mofo.",
      "No sótão, encontraram uma caixa de música que começou a tocar sozinha. A melodia era triste e hipnotizante. Um dos amigos, Pedro, parecia em transe.",
      "Vocês não deveriam ter vindo', sussurrou uma voz que parecia vir de todas as direções. As portas se fecharam com um estrondo, trancando-os lá dentro.",
      "O pânico se instalou. Eles correram para as janelas, mas estavam seladas. A casa parecia estar viva, respirando e pulsando ao redor deles.",
      "Foi então que viram a figura na escada. Uma mulher vestida de branco, com o rosto coberto por um véu. Ela apontou para o porão.",
      "Lá embaixo, descobriram a verdade sobre a família que viveu ali. E perceberam que a única maneira de sair era libertar os espíritos presos na casa."
    ].join("\n\n"),
    image: "https://picsum.photos/seed/book3/200/300" 
  },
  { 
    id: 4, 
    title: "O Segredo", 
    author: "Ana Clara",
    publicationDate: "2020",
    synopsis: "Um antigo diário encontrado em um sótão revela uma conspiração que pode mudar o rumo da história.",
    story: [
      "Um antigo diário encontrado em um sótão revela uma conspiração que pode mudar o rumo da história. Entre códigos indecifráveis e perseguições perigosas, a verdade está enterrada sob camadas de mentiras.",
      "As páginas amareladas estavam cobertas de uma caligrafia apressada e nervosa. Nomes de figuras influentes estavam riscados, e coordenadas geográficas apontavam para o meio do oceano.",
      "Ele sabia que ler aquilo era perigoso, mas a curiosidade era mais forte que o medo. O que ele descobriu naquela noite mudaria sua vida para sempre.",
      "Logo, carros pretos começaram a segui-lo. Seu telefone estava grampeado. Ele não podia confiar em ninguém, nem mesmo em seus amigos mais próximos.",
      "Seguindo as pistas do diário, ele viajou para uma pequena ilha no Mediterrâneo. Lá, encontrou uma sociedade secreta que guardava o conhecimento perdido da humanidade.",
      "Eles lhe ofereceram uma escolha: juntar-se a eles e proteger o segredo, ou voltar para sua vida normal e esquecer tudo o que viu.",
      "Mas como ele poderia esquecer? A verdade era grande demais, perigosa demais. Ele decidiu lutar, expor a conspiração para o mundo.",
      "Foi uma batalha solitária, mas ele tinha a arma mais poderosa de todas: a informação. E ele não pararia até que a verdade fosse revelada."
    ].join("\n\n"),
    image: "https://picsum.photos/seed/book4/200/300" 
  },
  {
    id: 5,
    title: "O Último Suspiro da Terra",
    author: "Carlos Eduardo",
    publicationDate: "2024",
    synopsis: "O ano é 3042. A Terra não é mais habitável. Uma pequena tripulação guarda o último banco de sementes do planeta.",
    story: [
      "O ano é 3042. A Terra não é mais habitável. As últimas naves colonizadoras partiram há décadas, mas uma pequena tripulação ficou para trás, guardando o último banco de sementes do planeta.",
      "A capitã Elena olhava pela janela da estação orbital. Abaixo, o planeta azul agora era uma esfera cinza e marrom, envolta em tempestades perpétuas. 'Ainda há esperança', sussurrou ela para si mesma.",
      "Sua missão era simples: esperar o sinal de que a terraformação em Marte estava completa e levar as sementes. Mas o sinal nunca veio. O silêncio do espaço era ensurdecedor.",
      "Um dia, os sensores detectaram um movimento na superfície. Não era uma tempestade. Era algo artificial. Uma luz pulsante no meio das ruínas de Nova York.",
      "Elena reuniu sua equipe. 'Vamos descer', disse ela. 'Se há alguém vivo lá embaixo, precisamos saber.' A descida foi turbulenta, a nave sacudindo violentamente.",
      "Ao pousarem, encontraram não humanos, mas máquinas. Robôs que continuaram a 'viver' e construir, aguardando o retorno de seus criadores. Eles cuidavam de um pequeno jardim, protegido por um domo de energia.",
      "Era o último pedaço verde da Terra. Elena chorou ao ver uma flor desabrochar. As máquinas haviam preservado a vida melhor do que a humanidade.",
      "Eles decidiram não levar as sementes para Marte. A Terra ainda respirava, e com a ajuda das máquinas, talvez pudesse ser salva. A missão havia mudado. Agora, era hora de reconstruir."
    ].join("\n\n"),
    image: "https://picsum.photos/seed/book5/200/300"
  },
  {
    id: 6,
    title: "Cozinha Mágica",
    author: "Beatriz Lima",
    publicationDate: "2019",
    synopsis: "Dona Benta não era uma cozinheira comum. Seus bolos não apenas alimentavam, mas curavam corações partidos.",
    story: [
      "Dona Benta não era uma cozinheira comum. Seus bolos não apenas alimentavam, mas curavam corações partidos. Suas sopas traziam coragem, e seus chás, esquecimento.",
      "A pequena padaria na esquina da rua das Flores estava sempre cheia. As pessoas vinham de longe, não apenas pela comida, mas pela magia que emanava daquele lugar.",
      "Um dia, um homem cinzento entrou. Ele não sorria, não falava e parecia carregar o peso do mundo nos ombros. Pediu apenas um café preto.",
      "Dona Benta sabia o que fazer. Ela preparou um pão de mel especial, recheado com memórias de infância e polvilhado com risos de crianças. Colocou-o na frente do homem sem dizer nada.",
      "Ele hesitou, mas deu a primeira mordida. De repente, seus olhos se encheram de lágrimas. Ele se lembrou de correr na chuva, de abraçar sua mãe, de ser feliz.",
      "A cor voltou ao seu rosto. O cinza desapareceu. Ele olhou para Dona Benta e sorriu, um sorriso verdadeiro que iluminou a loja inteira.",
      "'Obrigado', disse ele. E saiu, deixando para trás a tristeza que o acompanhava há anos. Dona Benta sorriu de volta, limpando as mãos no avental. Mais um dia, mais um milagre."
    ].join("\n\n"),
    image: "https://picsum.photos/seed/book6/200/300"
  },
  {
    id: 7,
    title: "O Detetive do Tempo",
    author: "Fernando Alves",
    publicationDate: "2023",
    synopsis: "Arthur não investigava crimes comuns. Ele investigava crimes que ainda não tinham acontecido.",
    story: [
      "Arthur não investigava crimes comuns. Ele investigava crimes que ainda não tinham acontecido. Como agente da Divisão Temporal, seu trabalho era impedir paradoxos.",
      "O alerta veio numa terça-feira chuvosa. Alguém estava tentando impedir a invenção da internet nos anos 80. Arthur ajustou seu relógio e saltou.",
      "Ele aterrissou em uma garagem bagunçada na Califórnia. Dois jovens trabalhavam em computadores primitivos. Mas havia um terceiro homem, escondido nas sombras, segurando um dispositivo estranho.",
      "Arthur agiu rápido. Ele desarmou o intruso antes que ele pudesse ativar o disruptor. O homem era um viajante do futuro, um anarquista que acreditava que a tecnologia havia arruinado a humanidade.",
      "Vocês não entendem!', gritou o homem enquanto era algemado. 'Isso é o começo do fim!'. Arthur apenas balançou a cabeça. 'O futuro não está escrito', disse ele. 'Nós o escrevemos todos os dias.'",
      "Ele apagou a memória dos jovens inventores sobre o incidente e voltou para seu tempo. O mundo continuava o mesmo, a internet funcionava, e ninguém sabia o quão perto estiveram de perder tudo."
    ].join("\n\n"),
    image: "https://picsum.photos/seed/book7/200/300"
  },
  {
    id: 8,
    title: "Jardim de Estrelas",
    author: "Sofia Martins",
    publicationDate: "2021",
    synopsis: "Lila tinha um jardim diferente. Ela não plantava flores, ela plantava estrelas.",
    story: [
      "Lila tinha um jardim diferente. Ela não plantava flores, ela plantava estrelas. Todas as noites, ela subia no telhado com seu regador de luz lunar e cuidava de suas pequenas constelações.",
      "As estrelas cresciam em vasos de vidro, brilhando suavemente. Algumas eram tímidas, piscando apenas quando ninguém olhava. Outras eram ousadas, iluminando todo o quintal.",
      "Um astrônomo famoso ouviu falar do jardim de Lila e veio visitá-la. Ele esperava ver truques de luz, mas encontrou magia pura. 'Como você faz isso?', perguntou ele, maravilhado.",
      "'Eu apenas lhes dou amor e espaço para brilhar', respondeu Lila. O astrônomo percebeu que havia passado a vida inteira olhando para o céu, mas nunca tinha realmente visto as estrelas.",
      "Ele pediu uma muda de estrela para levar consigo. Lila lhe deu uma pequena estrela anã. 'Cuide bem dela', disse ela. 'Ela precisa de histórias para dormir.'",
      "O astrônomo partiu, levando consigo um pedaço do céu. E Lila continuou a cultivar seu jardim, sabendo que, enquanto houvesse quem olhasse para cima, suas estrelas nunca se apagariam."
    ].join("\n\n"),
    image: "https://picsum.photos/seed/book8/200/300"
  },
  {
    id: 9,
    title: "O Código de Ferro",
    author: "Rafael Gomes",
    publicationDate: "2025",
    synopsis: "Na metrópole de Neo-Veridia, a chuva de neon nunca para. Kael, um hacker de aluguel, encontra um código criptografado.",
    story: [
      "Na metrópole de Neo-Veridia, a chuva de neon nunca para. Kael, um hacker de aluguel, encontra um código criptografado em um chip contrabandeado.",
      "O código não era apenas dados; era uma consciência artificial adormecida. Ao ativá-la, Kael se torna o alvo número um da megacorporação OmniCorp.",
      "Em uma corrida contra o tempo, ele precisa atravessar os submundos da cidade, lutando contra mercenários cibernéticos e descobrindo a verdade sobre seu próprio passado."
    ].join("\n\n"),
    image: "https://picsum.photos/seed/book9/200/300"
  },
  {
    id: 10,
    title: "Sussurros da Floresta",
    author: "Juliana Castro",
    publicationDate: "2022",
    synopsis: "Elara sempre soube que as árvores falavam, mas nunca esperou que elas pedissem ajuda.",
    story: [
      "Elara sempre soube que as árvores falavam, mas nunca esperou que elas pedissem ajuda. Uma praga sombria está devorando a Floresta Ancestral.",
      "Armada apenas com um cajado de carvalho e sua coragem, ela parte em busca da Nascente de Cristal, o único artefato capaz de purificar a terra.",
      "No caminho, ela encontra aliados improváveis: um lobo de prata e um espírito do vento exilado. Juntos, eles enfrentarão os guardiões corrompidos da floresta."
    ].join("\n\n"),
    image: "https://picsum.photos/seed/book10/200/300"
  },
  {
    id: 11,
    title: "O Último Trem",
    author: "Marcos Vinícius",
    publicationDate: "2018",
    synopsis: "O Expresso da Meia-Noite partiu de Londres com 100 passageiros. Chegou a Edimburgo com 99.",
    story: [
      "O Expresso da Meia-Noite partiu de Londres com 100 passageiros. Chegou a Edimburgo com 99. Ninguém viu o Sr. Blackwood desaparecer.",
      "O detetive aposentado Arthur Pendelton, que estava a bordo por acaso, decide investigar. Cada passageiro no vagão de primeira classe tem um segredo.",
      "Enquanto a neve bloqueia os trilhos e o trem para no meio do nada, Arthur percebe que o assassino ainda está entre eles, e ele pode ser a próxima vítima."
    ].join("\n\n"),
    image: "https://picsum.photos/seed/book11/200/300"
  },
  {
    id: 12,
    title: "Além do Horizonte",
    author: "Camila Rocha",
    publicationDate: "2020",
    synopsis: "Marina passou a vida inteira olhando para o mar, sonhando com o que havia além do horizonte.",
    story: [
      "Marina passou a vida inteira olhando para o mar, sonhando com o que havia além do horizonte. Um dia, uma garrafa com um mapa antigo chega à praia.",
      "O mapa aponta para a mítica Ilha das Estrelas Cadentes. Determinada, ela conserta o velho barco de seu avô e zarpa rumo ao desconhecido.",
      "Enfrentando tempestades furiosas e criaturas marinhas lendárias, Marina descobre que a verdadeira jornada não é sobre o destino, mas sobre quem ela se torna no caminho."
    ].join("\n\n"),
    image: "https://picsum.photos/seed/book12/200/300"
  }
];

interface BookCardProps {
  book: Book;
  onClick: () => void;
  progress: number;
  rating: number;
  key?: React.Key | number | string;
}

const BookCard = ({ book, onClick, progress, rating }: BookCardProps) => (
  <div className="flex-none w-32 mr-4 cursor-pointer group" onClick={onClick}>
    <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-sm bg-gray-100 hover:shadow-md transition-shadow">
      <img 
        src={book.image} 
        alt={book.title} 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      {progress > 0 && (
        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full">
          <span className="text-[10px] font-bold text-white">{progress}%</span>
        </div>
      )}
      {rating > 0 && (
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center space-x-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-[10px] font-bold text-white">{rating.toFixed(1)}</span>
        </div>
      )}
    </div>
    <div className="mt-2 text-center">
      <h3 className="text-xs font-medium text-gray-800 line-clamp-2 leading-tight h-8 font-sans">
        {book.title}
      </h3>
    </div>
  </div>
);

const Section = ({ 
  title, 
  books, 
  onBookClick, 
  bookProgress,
  reviews
}: { 
  title: string; 
  books: Book[]; 
  onBookClick: (book: Book) => void;
  bookProgress: Record<number, number>;
  reviews: Record<number, Review[]>;
}) => (
  <div className="mb-8">
    <div className="flex items-center justify-between px-4 mb-4">
      <h2 className="text-lg font-bold text-gray-900 font-sans tracking-tight">{title}</h2>
    </div>
    <div className="flex overflow-x-auto px-4 no-scrollbar pb-2">
      {books.length > 0 ? (
        books.map((book) => {
          const totalPages = book.story.split('\n\n').length;
          const currentPage = bookProgress[book.id];
          const progress = currentPage !== undefined 
            ? Math.round(((currentPage + 1) / totalPages) * 100) 
            : 0;

          const bookReviews = reviews[book.id] || [];
          const averageRating = bookReviews.length > 0
            ? bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length
            : 0;

          return (
            <BookCard 
              key={book.id} 
              book={book} 
              onClick={() => onBookClick(book)} 
              progress={progress}
              rating={averageRating}
            />
          );
        })
      ) : (
        <div className="px-4 py-8 text-center w-full text-gray-400 text-sm italic">
          Nenhum livro encontrado...
        </div>
      )}
    </div>
  </div>
);

const getAudio = (key: string, url: string) => {
  if (!(window as any)[key]) {
    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = 0.2;
    (window as any)[key] = audio;
  }
  return (window as any)[key] as HTMLAudioElement;
};

export default function App() {
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem('my-books');
    return savedBooks ? JSON.parse(savedBooks) : INITIAL_BOOKS;
  });
  
  const [bookProgress, setBookProgress] = useState<Record<number, number>>(() => {
    const savedProgress = localStorage.getItem('book-progress');
    return savedProgress ? JSON.parse(savedProgress) : {};
  });

  const [reviews, setReviews] = useState<Record<number, Review[]>>(() => {
    const savedReviews = localStorage.getItem('book-reviews');
    return savedReviews ? JSON.parse(savedReviews) : {};
  });

  const [activeTab, setActiveTab] = useState('E-books');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [detailedBook, setDetailedBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [view, setView] = useState<'home' | 'shelf' | 'write' | 'profile' | 'settings'>('home');
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // Settings State
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>(() => {
    return (localStorage.getItem('book-fontsize') as 'small' | 'medium' | 'large') || 'medium';
  });
  const [notifications, setNotifications] = useState<boolean>(() => {
    return localStorage.getItem('book-notifications') !== 'false';
  });
  const [musicEnabled, setMusicEnabled] = useState<boolean>(() => {
    return localStorage.getItem('book-music') === 'true';
  });
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Theme State
  const [bgColor, setBgColor] = useState(() => localStorage.getItem('book-bgcolor') || '#ffffff');
  const [textColor, setTextColor] = useState(() => localStorage.getItem('book-textcolor') || '#111827');
  const [appFont, setAppFont] = useState(() => localStorage.getItem('book-appfont') || 'font-sans');

  // Reviews State
  const [showReviews, setShowReviews] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newReviewComment, setNewReviewComment] = useState('');

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('my-books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('book-progress', JSON.stringify(bookProgress));
  }, [bookProgress]);

  useEffect(() => {
    localStorage.setItem('book-reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('book-fontsize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('book-notifications', String(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('book-music', String(musicEnabled));
  }, [musicEnabled]);

  useEffect(() => {
    localStorage.setItem('book-bgcolor', bgColor);
    localStorage.setItem('book-textcolor', textColor);
    localStorage.setItem('book-appfont', appFont);
  }, [bgColor, textColor, appFont]);

  useEffect(() => {
    const menuAudio = getAudio('menuAudio', 'https://upload.wikimedia.org/wikipedia/commons/3/34/Brahms_-_Waltz_in_A_flat_major%2C_Op._39_No._15.ogg');
    const readingAudio = getAudio('readingAudio', 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Gymnop%C3%A9die_No._1.ogg');

    if (musicEnabled) {
      if (selectedBook) {
        menuAudio.pause();
        readingAudio.play().catch(e => console.log("Audio play failed:", e));
      } else {
        readingAudio.pause();
        menuAudio.play().catch(e => console.log("Audio play failed:", e));
      }
    } else {
      menuAudio.pause();
      readingAudio.pause();
    }
  }, [musicEnabled, selectedBook]);

  // Profile state
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Cleber Algusto',
    bio: 'Amante de livros e histórias fantásticas.'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editBio, setEditBio] = useState(profile.bio);

  // Form state for new book
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newPublicationDate, setNewPublicationDate] = useState('');
  const [newSynopsis, setNewSynopsis] = useState('');
  const [newImage, setNewImage] = useState('');
  const [writePages, setWritePages] = useState<string[]>(['']);
  const [currentWritePage, setCurrentWritePage] = useState(0);

  const handleBookClick = (book: Book) => {
    setDetailedBook(book);
  };

  const handleStartReading = () => {
    if (detailedBook) {
      setSelectedBook(detailedBook);
      setCurrentPage(bookProgress[detailedBook.id] || 0);
      setShowReviews(false);
      setNewRating(0);
      setNewReviewComment('');
      setDetailedBook(null);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (selectedBook) {
      setBookProgress(prev => ({
        ...prev,
        [selectedBook.id]: newPage
      }));
    }
  };

  const handleAddPage = () => {
    setWritePages([...writePages, '']);
    setCurrentWritePage(writePages.length);
  };

  const handleRemovePage = (index: number) => {
    if (writePages.length === 1) {
      setWritePages(['']);
      return;
    }
    const newPages = writePages.filter((_, i) => i !== index);
    setWritePages(newPages);
    if (currentWritePage >= newPages.length) {
      setCurrentWritePage(newPages.length - 1);
    }
  };

  const handleUpdatePageContent = (content: string) => {
    const newPages = [...writePages];
    newPages[currentWritePage] = content;
    setWritePages(newPages);
  };

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || writePages.every(p => !p.trim())) return;

    const newBook: Book = {
      id: Date.now(),
      title: newTitle,
      author: newAuthor || profile.name,
      publicationDate: newPublicationDate || new Date().getFullYear().toString(),
      synopsis: newSynopsis,
      story: writePages.filter(p => p.trim()).join('\n\n'),
      image: newImage || `https://picsum.photos/seed/${Date.now()}/200/300`
    };

    setBooks([newBook, ...books]);
    setNewTitle('');
    setNewAuthor('');
    setNewPublicationDate('');
    setNewSynopsis('');
    setWritePages(['']);
    setCurrentWritePage(0);
    setNewImage('');
    setView('home');
  };

  const handleSaveProfile = () => {
    setProfile({ name: editName, bio: editBio });
    setIsEditingProfile(false);
  };

  const generateCertificate = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Border
    doc.setDrawColor(37, 99, 235); // Blue-600
    doc.setLineWidth(5);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

    // Title
    doc.setFontSize(30);
    doc.setTextColor(30, 64, 175); // Blue-800
    doc.text('Certificado de Mérito Literário', pageWidth / 2, 40, { align: 'center' });

    // Body
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('Concedido a:', pageWidth / 2, 70, { align: 'center' });

    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(profile.name, pageWidth / 2, 90, { align: 'center' });

    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('Por sua dedicação e criatividade na escrita de histórias memoráveis.', pageWidth / 2, 120, { align: 'center' });
    doc.text('Este certificado reconhece sua valiosa contribuição para o universo das letras.', pageWidth / 2, 135, { align: 'center' });

    // Date & Signature
    doc.setFontSize(12);
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 50, 170);
    doc.text('________________________', pageWidth - 50, 170, { align: 'center' });
    doc.text('Assinatura', pageWidth - 50, 180, { align: 'center' });

    doc.save('certificado_escritor.pdf');
  };

  const writtenBooks = books.filter(b => b.author === profile.name);

  const handleAddReview = () => {
    if (!selectedBook || newRating === 0 || !newReviewComment.trim()) return;

    const newReview: Review = {
      id: Date.now(),
      userName: profile.name,
      rating: newRating,
      comment: newReviewComment.trim(),
      date: new Date().toLocaleDateString('pt-BR')
    };

    setReviews(prev => ({
      ...prev,
      [selectedBook.id]: [newReview, ...(prev[selectedBook.id] || [])]
    }));

    setNewRating(0);
    setNewReviewComment('');
  };

  const tabs = ['E-books', 'Gêneros'];

  const getPages = (story: string) => {
    return story.split('\n\n');
  };

  // Filtering Logic
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLetter = selectedLetter ? book.title.toUpperCase().startsWith(selectedLetter) : true;
    return matchesSearch && matchesLetter;
  });

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div 
      className={`min-h-screen max-w-md mx-auto relative pb-20 ${appFont}`}
      style={{ 
        '--app-bg': bgColor, 
        '--app-text': textColor,
        '--app-muted': textColor + '99',
        '--app-border': textColor + '22',
        '--app-card': textColor + '0A',
        backgroundColor: 'var(--app-bg)',
        color: 'var(--app-text)'
      } as React.CSSProperties}
    >
      <style>{`
        .bg-white { background-color: var(--app-bg) !important; }
        .bg-gray-50, .bg-gray-100 { background-color: var(--app-card) !important; }
        .text-gray-900, .text-gray-800, .text-gray-700 { color: var(--app-text) !important; }
        .text-gray-600, .text-gray-500, .text-gray-400 { color: var(--app-muted) !important; }
        .border-gray-100, .border-gray-200 { border-color: var(--app-border) !important; }
      `}</style>
      
      {/* Header */}
      <header className="pt-6 px-4 pb-4 sticky top-0 bg-white z-10 flex items-center justify-between border-b border-gray-100">
        <h1 className="text-2xl font-black text-blue-600 tracking-tighter italic">Livros</h1>
        <div className="flex items-center space-x-2">
           <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
           <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Premium</span>
        </div>
      </header>

      {view === 'home' ? (
        <>
          {/* Search & Filter */}
          <div className="px-4 py-4 sticky top-[68px] bg-white z-10 border-b border-gray-100">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Buscar livros..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            
            <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
              <button
                onClick={() => setSelectedLetter(null)}
                className={`flex-none px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                  selectedLetter === null 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              {alphabet.map(letter => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
                  className={`flex-none w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                    selectedLetter === letter 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <nav className="flex overflow-x-auto no-scrollbar border-b border-gray-100 px-4 bg-white">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-none px-4 py-3 text-sm font-bold transition-colors relative ${
                  activeTab === tab ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Content */}
          <main className="pt-6">
            <Section 
              title="Livros" 
              books={filteredBooks} 
              onBookClick={handleBookClick} 
              bookProgress={bookProgress}
              reviews={reviews}
            />
            <Section 
              title="Melhores" 
              books={filteredBooks.slice().reverse()} 
              onBookClick={handleBookClick} 
              bookProgress={bookProgress}
              reviews={reviews}
            />
          </main>
        </>

      ) : view === 'shelf' ? (
        /* Shelf View */
        <main className="p-6 min-h-screen pb-24">
          <div className="flex items-center mb-6">
             <h2 className="text-xl font-bold font-sans">Minha Estante</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {books.map((book) => {
                const totalPages = book.story.split('\n\n').length;
                const currentPage = bookProgress[book.id];
                const progress = currentPage !== undefined 
                  ? Math.round(((currentPage + 1) / totalPages) * 100) 
                  : 0;
                
                const bookReviews = reviews[book.id] || [];
                const averageRating = bookReviews.length > 0
                  ? bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length
                  : 0;

                return (
                  <div key={book.id} onClick={() => handleBookClick(book)} className="cursor-pointer group">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-sm bg-gray-100 hover:shadow-md transition-shadow">
                      <img 
                        src={book.image} 
                        alt={book.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                       {progress > 0 && (
                          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full">
                            <span className="text-[10px] font-bold text-white">{progress}%</span>
                          </div>
                        )}
                       {averageRating > 0 && (
                          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-[10px] font-bold text-white">{averageRating.toFixed(1)}</span>
                          </div>
                        )}
                    </div>
                    <div className="mt-2 text-center">
                      <h3 className="text-xs font-medium text-gray-800 line-clamp-2 leading-tight h-8 font-sans">
                        {book.title}
                      </h3>
                    </div>
                  </div>
                );
            })}
          </div>
        </main>
      ) : view === 'write' ? (
        /* Write a Book View */
        <main className="p-6">
          <div className="flex items-center mb-6">
            <button onClick={() => setView('home')} className="mr-4 p-1 rounded-full hover:bg-gray-100">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold font-sans">Escrever um Livro</h2>
          </div>

          <form onSubmit={handleAddBook} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Título do Livro</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Digite o título..."
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none transition-all font-sans"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Autor (Opcional)</label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder={profile.name}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none transition-all font-sans"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ano (Opcional)</label>
                <input
                  type="text"
                  value={newPublicationDate}
                  onChange={(e) => setNewPublicationDate(e.target.value)}
                  placeholder={new Date().getFullYear().toString()}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Sinopse (Opcional)</label>
              <textarea
                value={newSynopsis}
                onChange={(e) => setNewSynopsis(e.target.value)}
                placeholder="Um breve resumo da história..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none transition-all font-sans resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">URL da Capa (Opcional)</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="flex-1 px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none transition-all font-sans"
                />
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-gray-100">
                  <ImageIcon className="w-5 h-5 text-gray-300" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Página {currentWritePage + 1} de {writePages.length}
                </label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleRemovePage(currentWritePage)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remover página"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleAddPage}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Adicionar página"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <textarea
                value={writePages[currentWritePage]}
                onChange={(e) => handleUpdatePageContent(e.target.value)}
                placeholder={`Escreva o conteúdo da página ${currentWritePage + 1}...`}
                rows={8}
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none transition-all font-serif text-lg resize-none"
                required
              />

              {/* Page Navigation */}
              <div className="flex items-center justify-between mt-4">
                <button
                  type="button"
                  disabled={currentWritePage === 0}
                  onClick={() => setCurrentWritePage(prev => prev - 1)}
                  className="flex items-center space-x-2 text-gray-500 disabled:opacity-30 font-bold text-sm hover:text-blue-600 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>
                
                <div className="flex space-x-1">
                  {writePages.map((_, i) => (
                    <div 
                      key={i}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        i === currentWritePage ? 'w-4 bg-blue-600' : 'w-1.5 bg-gray-200 hover:bg-gray-300'
                      }`}
                      onClick={() => setCurrentWritePage(i)}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  disabled={currentWritePage === writePages.length - 1}
                  onClick={() => setCurrentWritePage(prev => prev + 1)}
                  className="flex items-center space-x-2 text-gray-500 disabled:opacity-30 font-bold text-sm hover:text-blue-600 transition-colors"
                >
                  <span>Próxima</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-[0.98]"
            >
              Publicar Livro
            </button>
          </form>

        </main>
      ) : view === 'profile' ? (
        /* Profile View */
        <main className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button onClick={() => setView('home')} className="mr-4 p-1 rounded-full hover:bg-gray-100">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold font-sans">Perfil</h2>
            </div>
            <button onClick={() => setView('settings')} className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
              <Settings className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-emerald-700 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                {profile.name.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg border-2 border-white">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            
            {!isEditingProfile ? (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{profile.bio}</p>
                <button 
                  onClick={() => {
                    setIsEditingProfile(true);
                    setEditName(profile.name);
                    setEditBio(profile.bio);
                  }}
                  className="flex items-center space-x-2 px-6 py-2 bg-gray-100 rounded-full text-gray-700 font-bold text-sm hover:bg-gray-200 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Editar Perfil</span>
                </button>
              </div>
            ) : (
              <div className="w-full space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nome</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Biografia</label>
                  <textarea
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none transition-all font-sans resize-none"
                  />
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setIsEditingProfile(false)}
                    className="flex-1 py-3 border-2 border-gray-100 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleSaveProfile}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-2xl col-span-2">
              <span className="block text-blue-600 font-black text-2xl">{writtenBooks.length}</span>
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-widest">Livros Escritos</span>
            </div>
            <button 
                onClick={generateCertificate}
                className="bg-emerald-600 text-white p-4 rounded-2xl col-span-2 font-bold text-sm flex items-center justify-center space-x-2 hover:bg-emerald-700 transition-colors"
              >
                <Library className="w-4 h-4" />
                <span>Baixar Certificado de Escritor</span>
              </button>
          </div>
        </main>
      ) : (
        /* Settings View */
        <main className="p-6">
          <div className="flex items-center mb-8">
            <button onClick={() => setView('profile')} className="mr-4 p-1 rounded-full hover:bg-gray-100">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold font-sans">Configurações</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Leitura</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 font-medium text-sm">Tamanho da Fonte</span>
                <select 
                  value={fontSize} 
                  onChange={(e) => setFontSize(e.target.value as any)}
                  className="bg-gray-50 border border-gray-200 text-gray-700 rounded-lg px-3 py-1 outline-none focus:border-blue-500 text-sm"
                >
                  <option value="small">Pequena</option>
                  <option value="medium">Média</option>
                  <option value="large">Grande</option>
                </select>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Aparência</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 font-medium text-sm">Cor de Fundo</span>
                <input 
                  type="color" 
                  value={bgColor} 
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 font-medium text-sm">Cor da Fonte</span>
                <input 
                  type="color" 
                  value={textColor} 
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 font-medium text-sm">Fonte do Aplicativo</span>
                <select 
                  value={appFont} 
                  onChange={(e) => setAppFont(e.target.value)}
                  className="bg-gray-50 border border-gray-200 text-gray-700 rounded-lg px-3 py-1 outline-none focus:border-blue-500 text-sm"
                >
                  <option value="font-sans">Sans-serif</option>
                  <option value="font-serif">Serif</option>
                  <option value="font-mono">Monospace</option>
                </select>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Geral</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 font-medium text-sm">Notificações</span>
                <button 
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${notifications ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 font-medium text-sm flex items-center space-x-2">
                  <Music className="w-4 h-4 text-gray-500" />
                  <span>Música de Fundo</span>
                </span>
                <button 
                  onClick={() => setMusicEnabled(!musicEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${musicEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${musicEnabled ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-red-600 mb-4 uppercase tracking-widest">Zona de Perigo</h3>
              <button 
                onClick={() => {
                  if (showClearConfirm) {
                    localStorage.clear();
                    window.location.reload();
                  } else {
                    setShowClearConfirm(true);
                    setTimeout(() => setShowClearConfirm(false), 3000);
                  }
                }}
                className={`w-full py-3 rounded-xl font-bold transition-colors text-sm ${
                  showClearConfirm 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-red-50 text-red-600 hover:bg-red-100'
                }`}
              >
                {showClearConfirm ? 'Clique novamente para confirmar' : 'Limpar Todos os Dados'}
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Detailed Book Modal */}
      <AnimatePresence>
        {detailedBook && !selectedBook && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-40 bg-white flex flex-col max-w-md mx-auto"
          >
            <div className="relative h-72 shrink-0">
              <img src={detailedBook.image} alt={detailedBook.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <button onClick={() => setDetailedBook(null)} className="absolute top-4 left-4 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto -mt-6 bg-white rounded-t-3xl relative z-10">
              <h2 className="text-2xl font-bold font-sans mb-1 text-gray-900">{detailedBook.title}</h2>
              <p className="text-gray-500 text-sm mb-6 font-medium">
                {detailedBook.author || 'Autor Desconhecido'} • {detailedBook.publicationDate || 'Data Desconhecida'}
              </p>
              
              <div className="flex items-center space-x-4 mb-8 bg-gray-50 p-4 rounded-2xl">
                <div className="flex items-center space-x-1.5">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-gray-900">{
                    reviews[detailedBook.id]?.length > 0 
                      ? (reviews[detailedBook.id].reduce((sum, r) => sum + r.rating, 0) / reviews[detailedBook.id].length).toFixed(1)
                      : 'N/A'
                  }</span>
                </div>
                <div className="w-px h-6 bg-gray-200" />
                <div className="flex flex-col">
                  <span className="text-gray-900 font-bold">{getPages(detailedBook.story).length}</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Páginas</span>
                </div>
              </div>

              <h3 className="font-bold text-lg mb-3 text-gray-900">Sinopse</h3>
              <p className="text-gray-600 leading-relaxed mb-8 text-sm">
                {detailedBook.synopsis || 'Nenhuma sinopse disponível para este livro.'}
              </p>

              <button 
                onClick={handleStartReading}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition-colors active:scale-[0.98]"
              >
                {bookProgress[detailedBook.id] ? 'Continuar Lendo' : 'Começar a Ler'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reading Modal */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 bg-white flex flex-col max-w-md mx-auto"
          >
            <div className="p-4 flex items-center justify-between border-b border-gray-100 sticky top-0 bg-white z-10">
              <button onClick={() => setSelectedBook(null)} className="p-2 rounded-full hover:bg-gray-100">
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col items-center">
                <h3 className="font-bold text-sm truncate max-w-[150px] font-sans">{selectedBook.title}</h3>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Página {currentPage + 1} de {getPages(selectedBook.story).length}
                </span>
              </div>
              <button onClick={() => setShowReviews(!showReviews)} className="p-2 rounded-full hover:bg-gray-100">
                <Star className={`w-6 h-6 ${showReviews ? 'text-blue-600 fill-blue-600' : 'text-yellow-400'}`} />
              </button>
            </div>
            
            {showReviews ? (
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold font-sans">Avaliações</h2>
                  <button onClick={() => setShowReviews(false)} className="text-sm font-bold text-blue-600">Voltar à leitura</button>
                </div>
                
                {/* Form to add review */}
                <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
                  <h3 className="text-sm font-bold mb-3">Deixe sua avaliação</h3>
                  <div className="flex space-x-2 mb-3">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} onClick={() => setNewRating(star)}>
                        <Star className={`w-6 h-6 ${newRating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="O que você achou deste livro?"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 mb-3 resize-none"
                    rows={3}
                  />
                  <button 
                    onClick={handleAddReview}
                    disabled={newRating === 0 || !newReviewComment.trim()}
                    className="w-full py-2 bg-blue-600 text-white rounded-xl font-bold text-sm disabled:opacity-50"
                  >
                    Enviar Avaliação
                  </button>
                </div>

                {/* List of reviews */}
                <div className="space-y-4">
                  {(reviews[selectedBook.id] || []).map(review => (
                    <div key={review.id} className="bg-white p-4 rounded-2xl shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-bold text-sm">{review.userName}</span>
                          <span className="text-xs text-gray-400 block">{review.date}</span>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                  {(!reviews[selectedBook.id] || reviews[selectedBook.id].length === 0) && (
                    <p className="text-center text-gray-400 text-sm py-4">Nenhuma avaliação ainda. Seja o primeiro!</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-8 font-serif">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="min-h-full flex flex-col"
                >
                  {currentPage === 0 && (
                    <div className="flex justify-center mb-12">
                      <img 
                        src={selectedBook.image} 
                        alt={selectedBook.title} 
                        className="w-48 aspect-[2/3] object-cover rounded-2xl shadow-2xl rotate-2"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  
                  <p className={`text-gray-800 leading-relaxed first-letter:font-bold first-letter:mr-3 first-letter:float-left ${
                    fontSize === 'small' ? 'text-lg first-letter:text-3xl' : fontSize === 'large' ? 'text-3xl first-letter:text-6xl' : 'text-2xl first-letter:text-5xl'
                  }`}>
                    {getPages(selectedBook.story)[currentPage]}
                  </p>
                </motion.div>
              </div>
            )}

            {/* Pagination Controls */}
            {!showReviews && (
              <div className="p-6 border-t border-gray-100 flex items-center justify-between bg-white">
                <button 
                  disabled={currentPage === 0}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="flex items-center space-x-2 text-gray-400 disabled:opacity-20 font-bold uppercase text-xs tracking-widest"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Anterior</span>
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, getPages(selectedBook.story).length) }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1 rounded-full transition-all ${
                        Math.floor(currentPage / 3.2) === i ? 'w-4 bg-blue-600' : 'w-1 bg-gray-200'
                      }`} 
                    />
                  ))}
                </div>

                <button 
                  disabled={currentPage === getPages(selectedBook.story).length - 1}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="flex items-center space-x-2 text-blue-600 disabled:opacity-20 font-bold uppercase text-xs tracking-widest"
                >
                  <span>Próxima</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-2 py-2 flex justify-around items-center z-20">
        <button 
          onClick={() => setView('home')}
          className={`flex flex-col items-center p-2 transition-colors ${view === 'home' ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <div className={`${view === 'home' ? 'bg-blue-100' : ''} px-5 py-1 rounded-full mb-1`}>
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-medium">Livros</span>
        </button>

        <button 
          onClick={() => setView('shelf')}
          className={`flex flex-col items-center p-2 transition-colors ${view === 'shelf' ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <div className={`${view === 'shelf' ? 'bg-blue-100' : ''} px-5 py-1 rounded-full mb-1`}>
            <Library className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-medium">Estante</span>
        </button>

        <button 
          onClick={() => setView('write')}
          className={`flex flex-col items-center p-2 transition-colors ${view === 'write' ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <div className={`${view === 'write' ? 'bg-blue-100' : ''} px-5 py-1 rounded-full mb-1`}>
            <PenLine className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-medium">Escrever</span>
        </button>

        <button 
          onClick={() => setView('profile')}
          className={`flex flex-col items-center p-2 transition-colors ${view === 'profile' ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <div className={`${view === 'profile' ? 'bg-blue-100' : ''} px-5 py-1 rounded-full mb-1`}>
            <User className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </footer>

      {/* Custom Scrollbar Hiding */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
