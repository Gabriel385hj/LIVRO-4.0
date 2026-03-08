/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, User, PenLine, Plus, X, Image as ImageIcon, Save, Edit2, Trash2, Library, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Book {
  id: number;
  title: string;
  story: string;
  image: string;
}

interface UserProfile {
  name: string;
  bio: string;
}

const INITIAL_BOOKS: Book[] = [
  { 
    id: 1, 
    title: "Aguardando no Inferno", 
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
    story: [
      "Lila tinha um jardim diferente. Ela não plantava flores, ela plantava estrelas. Todas as noites, ela subia no telhado com seu regador de luz lunar e cuidava de suas pequenas constelações.",
      "As estrelas cresciam em vasos de vidro, brilhando suavemente. Algumas eram tímidas, piscando apenas quando ninguém olhava. Outras eram ousadas, iluminando todo o quintal.",
      "Um astrônomo famoso ouviu falar do jardim de Lila e veio visitá-la. Ele esperava ver truques de luz, mas encontrou magia pura. 'Como você faz isso?', perguntou ele, maravilhado.",
      "'Eu apenas lhes dou amor e espaço para brilhar', respondeu Lila. O astrônomo percebeu que havia passado a vida inteira olhando para o céu, mas nunca tinha realmente visto as estrelas.",
      "Ele pediu uma muda de estrela para levar consigo. Lila lhe deu uma pequena estrela anã. 'Cuide bem dela', disse ela. 'Ela precisa de histórias para dormir.'",
      "O astrônomo partiu, levando consigo um pedaço do céu. E Lila continuou a cultivar seu jardim, sabendo que, enquanto houvesse quem olhasse para cima, suas estrelas nunca se apagariam."
    ].join("\n\n"),
    image: "https://picsum.photos/seed/book8/200/300"
  }
];

interface BookCardProps {
  book: Book;
  onClick: () => void;
  progress: number;
  key?: React.Key | number | string;
}

const BookCard = ({ book, onClick, progress }: BookCardProps) => (
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
  bookProgress
}: { 
  title: string; 
  books: Book[]; 
  onBookClick: (book: Book) => void;
  bookProgress: Record<number, number>;
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

          return (
            <BookCard 
              key={book.id} 
              book={book} 
              onClick={() => onBookClick(book)} 
              progress={progress}
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

export default function App() {
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem('my-books');
    return savedBooks ? JSON.parse(savedBooks) : INITIAL_BOOKS;
  });
  
  const [bookProgress, setBookProgress] = useState<Record<number, number>>(() => {
    const savedProgress = localStorage.getItem('book-progress');
    return savedProgress ? JSON.parse(savedProgress) : {};
  });

  const [activeTab, setActiveTab] = useState('E-books');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [view, setView] = useState<'home' | 'shelf' | 'write' | 'profile'>('home');
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('my-books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('book-progress', JSON.stringify(bookProgress));
  }, [bookProgress]);

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
  const [newImage, setNewImage] = useState('');
  const [writePages, setWritePages] = useState<string[]>(['']);
  const [currentWritePage, setCurrentWritePage] = useState(0);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setCurrentPage(bookProgress[book.id] || 0);
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
      story: writePages.filter(p => p.trim()).join('\n\n'),
      image: newImage || `https://picsum.photos/seed/${Date.now()}/200/300`
    };

    setBooks([newBook, ...books]);
    setNewTitle('');
    setWritePages(['']);
    setCurrentWritePage(0);
    setNewImage('');
    setView('home');
  };

  const handleSaveProfile = () => {
    setProfile({ name: editName, bio: editBio });
    setIsEditingProfile(false);
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
    <div className="min-h-screen bg-white font-sans text-gray-900 max-w-md mx-auto relative pb-20">
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
            />
            <Section 
              title="Melhores" 
              books={filteredBooks.slice().reverse()} 
              onBookClick={handleBookClick} 
              bookProgress={bookProgress}
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
      ) : (
        /* Profile View */
        <main className="p-6">
          <div className="flex items-center mb-8">
            <button onClick={() => setView('home')} className="mr-4 p-1 rounded-full hover:bg-gray-100">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold font-sans">Perfil</h2>
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
              <span className="block text-blue-600 font-black text-2xl">{books.length}</span>
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-widest">Livros Escritos</span>
            </div>
          </div>
        </main>
      )}

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
              <div className="w-10" /> {/* Spacer for alignment */}
            </div>
            
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
                
                <p className="text-gray-800 leading-relaxed text-2xl first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
                  {getPages(selectedBook.story)[currentPage]}
                </p>
              </motion.div>
            </div>

            {/* Pagination Controls */}
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
