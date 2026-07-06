import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, ChevronDown, Menu, X, Instagram, Facebook, Linkedin, Youtube, ArrowUp } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash, location.pathname]);

  const navItems = [
    { name: 'Início', path: '/' },
    { name: 'Produtos', path: '/#produtos', hasDropdown: true },
    { name: 'Catálogo', path: '/#catalogo' },
    { name: 'Contato', path: '/#contato' },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-brand-gold selection:text-white">
      {/* Header Container */}
      <header className="fixed top-0 left-0 w-full z-50">
        {/* Top Bar */}
        <div className="bg-brand-black text-white/80 h-10 transition-all duration-500 flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center text-[10px] uppercase tracking-widest font-medium">
            <div className="flex items-center space-x-6">
              <a href="mailto:comercial@projetocerto.com.br" className="flex items-center hover:text-brand-gold transition-colors">
                <Mail className="w-3 h-3 mr-2 text-brand-gold" />
                comercial@projetocerto.com.br
              </a>
              <a href="tel:+5561992989169" className="hidden md:flex items-center hover:text-brand-gold transition-colors">
                <Phone className="w-3 h-3 mr-2 text-brand-gold" />
                +55 (61) 99298-9169
              </a>
            </div>
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <MapPin className="w-3 h-3 mr-2 text-brand-gold" />
                Brasília - DF | Goiânia - GO
              </span>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <nav className={`h-20 transition-all duration-500 border-b ${scrolled ? 'bg-white/95 backdrop-blur-md border-gray-100 shadow-sm' : 'bg-transparent border-white/10'}`}>
          <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
            {/* Logo */}
            <Link 
              to="/" 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/faviconProjetoCerto.png" 
                  alt="Projeto Certo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-light tracking-[0.15em] transition-colors ${scrolled ? 'text-brand-black' : 'text-white'}`}>
                  PROJETO CERTO
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-10">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    to={item.path}
                    onClick={(e) => {
                      if (item.path.startsWith('/#')) {
                        const id = item.path.replace('/#', '');
                        const element = document.getElementById(id);
                        if (element) {
                          e.preventDefault();
                          window.history.pushState(null, '', item.path);
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      } else if (item.path === '/') {
                        e.preventDefault();
                        window.history.pushState(null, '', '/');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-colors flex items-center ${
                      scrolled ? 'text-brand-black hover:text-brand-gold' : 'text-white hover:text-brand-gold'
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="ml-1 w-3 h-3" />}
                  </Link>
                  
                  {item.hasDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="bg-white shadow-2xl p-8 w-[800px] grid grid-cols-2 gap-8 border-t-2 border-brand-gold">
                        <div>
                          <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">Controle Solar</h4>
                          <ul className="space-y-3 text-[11px] text-gray-500 uppercase tracking-widest">
                            <li className="hover:text-brand-black cursor-pointer transition-colors">QuadroBrise</li>
                            <li className="hover:text-brand-black cursor-pointer transition-colors">Fins</li>
                            <li className="hover:text-brand-black cursor-pointer transition-colors">Cinetic Brise</li>
                            <li className="hover:text-brand-black cursor-pointer transition-colors">GeoClad</li>
                          </ul>
                          <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mt-8 mb-4">Coberturas</h4>
                          <ul className="space-y-3 text-[11px] text-gray-500 uppercase tracking-widest">
                            <li className="hover:text-brand-black cursor-pointer transition-colors">Uveline</li>
                            <li className="hover:text-brand-black cursor-pointer transition-colors">Miniwave</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">Fachadas</h4>
                          <ul className="space-y-3 text-[11px] text-gray-500 uppercase tracking-widest">
                            <li className="hover:text-brand-black cursor-pointer transition-colors">Fundermax</li>
                            <li className="hover:text-brand-black cursor-pointer transition-colors">ScreenPanel</li>
                          </ul>
                          <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mt-8 mb-4">Produtos Internos</h4>
                          <ul className="space-y-3 text-[11px] text-gray-500 uppercase tracking-widest">
                            <li className="hover:text-brand-black cursor-pointer transition-colors">Baffle Metal</li>
                            <li className="hover:text-brand-black cursor-pointer transition-colors">Heartfelt</li>
                            <li className="hover:text-brand-black cursor-pointer transition-colors">Linear Wood</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button 
                onClick={() => {
                  const element = document.getElementById('contato');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="bg-brand-gold text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-gold-dark transition-all"
              >
                Orçamento
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`lg:hidden p-2 transition-colors ${scrolled ? 'text-brand-black' : 'text-white'}`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-black flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 text-white p-2 hover:text-brand-gold transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col items-center space-y-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={(e) => {
                      setIsMenuOpen(false);
                      if (item.path.startsWith('/#')) {
                        const id = item.path.replace('/#', '');
                        const element = document.getElementById(id);
                        if (element) {
                          e.preventDefault();
                          window.history.pushState(null, '', item.path);
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      } else if (item.path === '/') {
                        e.preventDefault();
                        window.history.pushState(null, '', '/');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="text-3xl font-light text-white hover:text-brand-gold transition-colors tracking-widest uppercase"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                onClick={() => {
                  setIsMenuOpen(false);
                  const element = document.getElementById('contato');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="mt-8 bg-brand-gold text-white px-12 py-4 text-xs font-bold uppercase tracking-widest"
              >
                Solicitar Orçamento
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-black text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-8">
              <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://dptxkbsyzfntolgmhniz.supabase.co/storage/v1/object/public/ProjetoCerto/faviconProjetoCerto.png" 
                  alt="Projeto Certo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-2xl font-light tracking-[0.2em] text-white uppercase">PROJETO CERTO</span>
            </Link>
            <p className="text-gray-500 text-sm font-light leading-relaxed max-w-md mb-10">
              Soluções arquitetônicas inteligentes. Distribuidor autorizado Hunter Douglas no Distrito Federal e Goiás. Excelência técnica e compromisso com o design.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Instagram, url: 'https://www.instagram.com/projetocerto.com.br/' },
                { Icon: Facebook, url: 'https://www.facebook.com/people/Projeto-Certo-Solu%C3%A7%C3%B5es-Arquitet%C3%B4nicas-Inteligentes/61560868221359/' },
                { Icon: Youtube, url: 'https://www.youtube.com/@ProjetoCerto' },
                { Icon: Linkedin, url: 'https://br.linkedin.com/company/projeto-certo' }
              ].map(({ Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] mb-8">Navegação</h4>
            <ul className="space-y-4 text-xs font-light text-gray-400 tracking-wider">
              <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><a href="#sobre" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#contato" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] mb-8">Contato</h4>
            <ul className="space-y-6 text-xs font-light text-gray-400 tracking-wider">
              <li className="flex items-start space-x-4">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="leading-relaxed">SGCV BLOCO 65 - Guará,<br />Brasília - DF, 71215-100</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span>+55 (61) 99298-9169</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>comercial@projetocerto.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-medium">
            © 2026 Projeto Certo. Todos os direitos reservados.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-[10px] text-gray-600 uppercase tracking-widest hover:text-brand-gold transition-colors group"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </footer>

      {/* Floating Elements */}
      <a
        href="https://web.whatsapp.com/send?phone=5561992989169&text=Ol%C3%A1+Reginaldo%21+Gostaria+de+fazer+um+or%C3%A7amento"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-8 right-8 z-[60] bg-[#25D366] text-white p-4 shadow-2xl transition-all duration-500 group active:scale-90 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <div className="absolute inset-0 bg-[#25D366] animate-ping opacity-20" />
        <svg className="w-7 h-7 relative" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.066 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.553 4.197 1.603 6.02L0 24l6.135-1.61a11.787 11.787 0 005.912 1.583h.003c6.635 0 12.049-5.415 12.049-12.05 0-3.218-1.253-6.242-3.528-8.517z"/>
        </svg>
      </a>
    </div>
  );
}
