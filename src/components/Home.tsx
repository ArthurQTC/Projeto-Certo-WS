import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Award, Sparkles, Cpu, Download, 
  Home as HomeIcon, Building2, Layers, Factory, 
  ArrowUpRight, Instagram, MessageCircle, X, Send,
  MapPin, Phone, Mail
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { products, team } from '../data';

const slides = [
  {
    title: 'BRISES METÁLICOS',
    images: [
      'https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/quadro32.jpeg',
      'https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/quadro32.1.jpeg',
      'https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/quadro32.2.jpeg'
    ]
  },
  {
    title: 'REVESTIMENTOS METÁLICOS',
    images: [
      'https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/multipainel-wave.jpeg',
      'https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/multipainel-wave2.jpeg',
      'https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/multipainel-wave3.jpeg'
    ]
  },
  {
    title: 'FORROS METÁLICOS / MADEIRA',
    images: [
      'https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/Woodline.jpeg',
      'https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/Woodline2.jpeg',
      'https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/Woodline3.jpeg'
    ]
  }
];

const bgImages = [
  'https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/auditorio.jpg',
  'https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/conjunto.jpg',
  'https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/conjunto_02.jpg'
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [hoveredHeroCard, setHoveredHeroCard] = useState<number | null>(null);
  const [activeHeroMobile, setActiveHeroMobile] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeBgIndex, setActiveBgIndex] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({ loading: false, success: false, error: null });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    setSubmitStatus({ loading: true, success: false, error: null });

    // Determine the backend endpoint from the public environment variable or fall back gracefully
    const baseUrl = import.meta.env.VITE_API_URL || 'https://api.projetocerto.com.br';
    const targetUrl = `${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}/api/contact`;

    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setSubmitStatus({ loading: false, success: true, error: null });
        form.reset();
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(prev => ({ ...prev, success: false }));
        }, 5000);
      } else {
        setSubmitStatus({ loading: false, success: false, error: data.error || 'Erro ao enviar a mensagem.' });
      }
    } catch (err: any) {
      setSubmitStatus({ loading: false, success: false, error: 'Ocorreu um erro ao conectar com o servidor.' });
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="bg-white">
      {/* 2. HERO SECTION */}
      <section className="relative h-screen overflow-hidden bg-brand-black">
        {/* Desktop Layout (hidden on mobile) */}
        <div className="hidden lg:flex h-full w-full">
          {slides.map((slide, i) => {
            const isHovered = hoveredHeroCard === i;
            const isAnyHovered = hoveredHeroCard !== null;
            
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredHeroCard(i)}
                onMouseLeave={() => setHoveredHeroCard(null)}
                className={`relative h-full flex flex-col justify-end p-12 transition-all duration-700 ease-in-out border-r border-white/5 cursor-pointer select-none overflow-hidden ${
                  isHovered ? 'flex-[1.5]' : isAnyHovered ? 'flex-[0.75]' : 'flex-1'
                }`}
              >
                {/* Background Images with Cross-fade */}
                <div className="absolute inset-0 z-0">
                  {slide.images.map((imgUrl, imgIdx) => (
                    <img
                      key={imgIdx}
                      src={imgUrl}
                      alt={`${slide.title} ${imgIdx}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out ${
                        imgIdx === activeImageIndex ? 'opacity-100' : 'opacity-0'
                      } ${
                        isHovered ? 'scale-105 grayscale-0' : isAnyHovered ? 'grayscale brightness-[0.3]' : 'grayscale-0 brightness-[0.6] hover:brightness-[0.8]'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                  ))}
                  {/* Subtle vignette/overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-all duration-700 z-10 ${
                    isHovered ? 'opacity-60' : 'opacity-80'
                  }`} />
                </div>

                {/* Hunter Douglas logo in top right on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: -15, x: 15 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0, y: -15, x: 15 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute top-28 right-12 z-20"
                    >
                      <img
                        src="https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/HunterDouglas_simbolo.png"
                        className="h-8 select-none pointer-events-none object-contain"
                        alt="Hunter Douglas"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Content */}
                <div className="relative z-10 max-w-md">
                  <h2 className="text-2xl xl:text-4xl font-light text-white uppercase tracking-wider leading-tight">
                    {slide.title}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Layout (swipeable slider) */}
        <div className="lg:hidden h-full w-full relative">
          <div className="absolute inset-0 z-0">
            {slides.map((slide, sIdx) => (
              sIdx === activeHeroMobile && (
                slide.images.map((imgUrl, imgIdx) => (
                  <img
                    key={imgIdx}
                    src={imgUrl}
                    alt={`${slide.title} ${imgIdx}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out grayscale-0 ${
                      imgIdx === activeImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                ))
              )
            ))}
            <div className="absolute inset-0 bg-black/70 z-10" />
            
            {/* Hunter Douglas Logo for active card */}
            <div className="absolute top-28 right-8 z-20">
              <img
                src="https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/HunterDouglas_simbolo.png"
                className="h-6 object-contain"
                alt="Hunter Douglas"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="relative z-20 h-full flex flex-col justify-end p-8 pb-24">
            <div className="max-w-md">
              <h2 className="text-3xl font-light text-white uppercase tracking-wider leading-tight">
                {slides[activeHeroMobile].title}
              </h2>
            </div>

            {/* Slide indicators / Switcher controls */}
            <div className="flex space-x-3 mt-12">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveHeroMobile(i)}
                  className={`h-2 transition-all duration-300 ${
                    i === activeHeroMobile ? 'w-10 bg-brand-gold' : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES */}
      <section className="relative py-40 bg-brand-black text-white overflow-hidden">
        {/* Animated Background Slideshow */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={activeBgIndex}
              src={bgImages[activeBgIndex]}
              alt="Slide"
              initial={{ opacity: 0, scale: 1.0 }}
              animate={{ opacity: 0.55, scale: 1.06 }}
              exit={{ opacity: 0, scale: 1.08 }}
              transition={{ duration: 5.0, ease: "linear" }}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-brand-black/55 z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-8">
            <motion.div {...fadeIn} className="text-left max-w-2xl">
              <span className="text-[11px] font-bold text-brand-gold uppercase tracking-[0.4em] block mb-4">
                Diferenciais
              </span>
              <h3 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-tight">
                Brises para Arquitetura e Controle Solar
              </h3>
            </motion.div>

            <motion.div 
              {...fadeIn} 
              className="flex items-center space-x-6 border-l md:border-l border-white/20 pl-6 h-16 text-left"
            >
              <img 
                src="https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/HunterDouglas_simbolo.png" 
                className="h-10 object-contain" 
                alt="Hunter Douglas Logo"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-xs font-bold text-brand-gold uppercase tracking-[0.2em] block">
                  Distribuidor Autorizado
                </span>
                <span className="text-[10px] text-white/50 uppercase tracking-widest block mt-0.5">
                  Hunter Douglas
                </span>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: Award, title: 'Controle Solar', text: 'Brises que bloqueiam o calor excessivo, reduzem o ofuscamento e melhoram o conforto térmico.' },
              { icon: Sparkles, title: 'Design de Fachada', text: 'Linhas limpas e elegantes que valorizam a arquitetura. Elementos estéticos e funcionais.' },
              { icon: Cpu, title: 'Eficiência Energética', text: 'Redução do consumo de ar-condicionado com o uso inteligente de brises Hunter Douglas.' }
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center group bg-brand-black/40 backdrop-blur-md border border-white/5 p-10 hover:border-brand-gold/30 transition-all duration-500"
              >
                <div className="w-20 h-20 bg-brand-gold flex items-center justify-center text-brand-black mb-8 group-hover:scale-110 transition-transform">
                  <f.icon className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-medium tracking-widest uppercase mb-4 text-white">{f.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed max-w-xs font-light">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT */}
      <section id="sobre" className="bg-brand-black py-32 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div {...fadeIn}>
            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] block mb-8">Sobre Nós</span>
            <h3 className="text-5xl md:text-6xl font-light tracking-tighter leading-tight mb-12">
              Especialistas em <br />
              <span className="text-brand-gold">Brises Arquitetônicos</span>
            </h3>
            <div className="space-y-6 text-gray-400 text-sm leading-relaxed max-w-xl font-light tracking-wide">
              <p>Desde 2010, a Projeto Certo é especialista em fornecimento e instalação de brises arquitetônicos Hunter Douglas — a marca líder mundial em controle solar.</p>
              <p>Instalamos brises para fachadas residenciais, corporativas, comerciais e industriais. Cada projeto é analisado com engenheiros e arquitetos para garantir o melhor desempenho.</p>
              <p>Como distribuidores autorizados Hunter Douglas no DF e Goiás, oferecemos toda a linha de brises originais.</p>
            </div>
            <div className="grid grid-cols-2 gap-12 mt-16 pt-16 border-t border-white/10">
              <div>
                <p className="text-5xl font-extralight text-brand-gold mb-2">15+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold">Anos de Mercado</p>
              </div>
              <div>
                <p className="text-5xl font-extralight text-brand-gold mb-2">500+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold">Projetos Concluídos</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-gray-900 overflow-hidden">
              <img
                src="https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/bri.jpg"
                alt="Architecture"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-12 shadow-2xl">
              <div className="text-brand-black text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Hunter Douglas</div>
              <div className="text-brand-gold text-lg font-light tracking-widest uppercase">Distribuidor Autorizado</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. CATALOGS */}
      <section id="catalogo" className="py-32 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Catálogos & Brochuras</h2>
              <p className="text-gray-500 font-light tracking-wide">Conheça as novas brochuras de nossos produtos arquitetônicos</p>
            </motion.div>
            <motion.button {...fadeIn} className="flex items-center text-brand-orange text-xs font-bold uppercase tracking-[0.3em] group">
              <Download className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Acesse Agora
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Produtos Interiores e Exteriores de Madeira', img: 'https://architectural.hunterdouglas.com.br/wp-content/uploads/sites/5/2025/03/Captura-de-tela-2025-03-19-171820.png' },
              { title: 'Coberturas e Fachadas Residenciais', img: 'https://architectural.hunterdouglas.com.br/wp-content/uploads/sites/5/2025/03/Captura-de-tela-2025-03-19-171840.png' },
              { title: 'Retrofit e Reforma de Edifícios', img: 'https://architectural.hunterdouglas.com.br/wp-content/uploads/sites/5/2025/03/Retrofit.jpg' }
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] bg-white overflow-hidden mb-8 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h4 className="text-xs font-medium tracking-widest uppercase text-brand-black leading-relaxed">{c.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUCTS SHOWCASE */}
      <section id="produtos" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeIn} className="max-w-3xl mb-24">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.4em] block mb-6">Linhas Destacadas</span>
            <h3 className="text-4xl md:text-6xl font-light tracking-tight mb-8 leading-tight">Inspire-se com nossos produtos</h3>
            <p className="text-gray-500 font-light tracking-wide leading-relaxed">
              Conheça as nossas soluções para teto, fachada e revestimento, em madeira ou metal, com diversos formatos para atender às necessidades específicas do seu projeto.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                onMouseEnter={() => setHoveredProduct(i)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="relative group aspect-[3/4] overflow-hidden cursor-pointer"
              >
                <img 
                  src={p.imageUrl} 
                  alt={p.title} 
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                    hoveredProduct !== null && hoveredProduct !== i ? 'grayscale brightness-50' : 'grayscale-0'
                  }`} 
                />
                
                {/* Hunter Douglas Logo Overlay */}
                <AnimatePresence>
                  {hoveredProduct === i && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, x: 10 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0, y: -10, x: 10 }}
                      className="absolute top-6 right-6 z-30"
                    >
                      <img 
                        src="https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/HunterDouglas_simbolo.png" 
                        className="h-6 md:h-8 object-contain" 
                        alt="Hunter Douglas" 
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-2xl font-light text-white uppercase tracking-widest mb-4">{p.title}</h4>
                  <p className="text-white/60 text-xs font-light tracking-wide leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {p.description}
                  </p>
                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center text-brand-gold text-[10px] font-bold uppercase tracking-widest">
                    Ver detalhes <ArrowUpRight className="ml-2 w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SERVICES */}
      <section id="servicos" className="py-32 bg-brand-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end mb-32">
            <motion.div {...fadeIn}>
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] block mb-6">Serviços</span>
              <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-8">Nossos Projetos</h3>
              <p className="text-gray-400 font-light tracking-wide leading-relaxed max-w-lg">
                Fornecemos e instalamos brises Hunter Douglas para os mais diversos segmentos — do residencial ao industrial — com excelência técnica e atendimento especializado.
              </p>
            </motion.div>
            <div className="flex items-center space-x-12 border-l border-white/10 pl-12 h-32">
              <img 
                src="https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/HunterDouglas_simbolo.png" 
                className="h-10 opacity-50 object-contain" 
                alt="HD Logo" 
                referrerPolicy="no-referrer"
              />
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest max-w-[150px]">Distribuidor Autorizado no DF e GO</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: HomeIcon, title: 'Residencial', text: 'Brises que controlam a entrada de luz e calor em casas e apartamentos, aliando conforto e sofisticação.', img: 'https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/residencial.jpg' },
              { icon: Building2, title: 'Corporativo', text: 'Fachadas com brises que reforçam a identidade visual dos edifícios e promovem eficiência energética.', img: 'https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/corporativo.jpg' },
              { icon: Layers, title: 'Comercial', text: 'Brises que valorizam a estética de lojas e shoppings, criando ambientes mais agradáveis e eficientes.', img: 'https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/comercial.jpg' },
              { icon: Sparkles, title: 'Harley Design', text: 'Soluções arquitetônicas sob medida para projetos premium com acabamento e design excepcionais.', img: 'https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/Harley%20Design.jpg' },
              { icon: Layers, title: 'Comercial', text: 'Eficiência e conforto térmico de alta performance com a estética dos brises metálicos modernos.', img: 'https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/Comercia.jpg' },
              { icon: Factory, title: 'Indústria', text: 'Coberturas e brises de alto desempenho para galpões, com foco em durabilidade e conforto térmico.', img: 'https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/Industria.jpg' }
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group aspect-video overflow-hidden"
              >
                <img src={s.img} alt={s.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-brand-black/70 group-hover:bg-brand-black/40 transition-colors" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="w-12 h-12 bg-brand-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                    <s.icon className="w-6 h-6 text-brand-black" />
                  </div>
                  <div className="mt-4">
                    <h4 className="text-lg font-light uppercase tracking-widest mb-2">{s.title}</h4>
                    <p className="text-white/50 text-[10px] md:text-[11px] font-light tracking-wide leading-relaxed">{s.text}</p>
                  </div>
                </div>
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all transform group-hover:rotate-45">
                  <ArrowUpRight className="w-6 h-6 text-brand-gold" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PROCESS */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div {...fadeIn}>
            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] block mb-8">Nosso Processo</span>
            <h3 className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-16">Um guia único para o sucesso</h3>
            
            <div className="space-y-12">
              {[
                { n: '01', title: 'Engajamento', text: 'Entendemos suas necessidades e sonhos para criar a experiência perfeita.' },
                { n: '02', title: 'Projeto', text: 'Desenvolvemos soluções personalizadas que encantam e superam expectativas.' },
                { n: '03', title: 'Realização', text: 'Executamos com excelência para resultados que transformam ambientes.' }
              ].map((step, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="text-5xl font-extralight text-brand-gold group-hover:text-brand-black transition-colors">{step.n}</div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-3">{step.title}</h4>
                    <p className="text-gray-500 text-sm font-light tracking-wide leading-relaxed max-w-sm">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-8 -right-8 w-full h-full border-2 border-brand-gold -z-10" />
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
              alt="Design Process"
              className="w-full h-full object-cover shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* 10. TEAM */}
      <section className="py-32 bg-brand-black text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.span {...fadeIn} className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] block mb-6">Nossa Equipe</motion.span>
          <motion.h3 {...fadeIn} className="text-4xl md:text-5xl font-light tracking-tight mb-24">Profissionais Especializados</motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
              >
                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/20 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-brand-black to-transparent text-left transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h4 className="text-lg font-light tracking-widest uppercase mb-1">{member.name}</h4>
                  <p className="text-brand-gold text-[10px] font-bold uppercase tracking-widest">{member.role}</p>
                  
                  <div className="flex space-x-4 mt-6 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    {member.instagram && (
                      <a href={`https://instagram.com/${member.instagram}`} target="_blank" rel="noopener noreferrer">
                        <Instagram className="w-4 h-4 text-white hover:text-brand-gold cursor-pointer" />
                      </a>
                    )}
                    {member.whatsapp && (
                      <a href={`https://wa.me/${member.whatsapp}`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4 text-white hover:text-brand-gold cursor-pointer" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CONTACT */}
      <section id="contato" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32">
          <motion.div {...fadeIn}>
            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] block mb-8">Contato</span>
            <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-12 leading-tight">Vamos conversar sobre seu projeto</h3>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-brand-black flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2">Endereço</h4>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">SGCV BLOCO 65 - Guará, Brasília - DF, 71215-100</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-brand-black flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2">Telefone</h4>
                  <p className="text-gray-500 text-sm font-light">+55 (61) 3346-7565</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-brand-black flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2">Email</h4>
                  <p className="text-gray-500 text-sm font-light">comercial@projetocerto.com.br</p>
                </div>
              </div>
            </div>

            <a 
              href="https://web.whatsapp.com/send?phone=556192989169&text=Ol%C3%A1+Reginaldo%21+Gostaria+de+fazer+um+or%C3%A7amento"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-4 bg-[#25D366] text-white px-10 py-5 text-xs font-bold uppercase tracking-widest hover:shadow-2xl transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Falar no WhatsApp</span>
            </a>
          </motion.div>

          <motion.div {...fadeIn} className="bg-gray-50 p-12 lg:p-16">
            <form onSubmit={handleContactSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Nome</label>
                  <input type="text" name="name" required className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-brand-gold transition-colors text-sm font-light" placeholder="Seu nome completo" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email</label>
                  <input type="email" name="email" required className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-brand-gold transition-colors text-sm font-light" placeholder="exemplo@email.com" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Mensagem</label>
                <textarea name="message" required className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-brand-gold transition-colors text-sm font-light h-32 resize-none" placeholder="Conte-nos sobre seu projeto"></textarea>
              </div>
              <button 
                type="submit" 
                disabled={submitStatus.loading}
                className="w-full bg-brand-black text-white py-6 text-xs font-bold uppercase tracking-widest hover:bg-brand-gold transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitStatus.loading ? 'Enviando...' : 'Enviar Mensagem'}
              </button>

              {submitStatus.success && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest text-center"
                >
                  Sua mensagem foi enviada com sucesso direta da aplicação!
                </motion.p>
              )}

              {submitStatus.error && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center"
                >
                  {submitStatus.error}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* Floating Chatbot */}
      <div className="fixed bottom-32 right-8 z-[60]">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-20 right-0 w-80 bg-white shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="bg-brand-black p-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Projeto Certo AI</span>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-white/60 hover:text-white"><X className="w-4 h-4" /></button>
              </div>
              <div className="h-64 p-6 overflow-y-auto bg-gray-50 flex flex-col space-y-4">
                <div className="bg-white p-3 shadow-sm self-start max-w-[85%] text-xs font-light leading-relaxed">
                  Olá! Como posso ajudar você hoje com as soluções Hunter Douglas?
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 flex items-center gap-2">
                <input type="text" placeholder="Sua dúvida..." className="flex-grow text-xs outline-none font-light py-2" />
                <button className="text-brand-gold hover:text-brand-black transition-colors"><Send className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-brand-gold text-white p-4 shadow-xl hover:scale-110 transition-transform active:scale-95"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
