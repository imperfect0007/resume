import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'backdrop-blur-xl bg-slate-950/70 border-b border-slate-800/60 shadow-2xl shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo / Brand */}
          <a href="#about" className="group flex flex-col leading-tight animate-fade-in">
            <span className="text-lg md:text-xl font-bold text-white tracking-tight group-hover:text-gradient transition-all duration-300">
              Revanth Kumar S
            </span>
            <span className="text-[11px] md:text-xs font-medium text-blue-400/80 tracking-wider uppercase">
              DevOps / Cloud Engineer
            </span>
          </a>

          {/* Desktop Navigation — pill nav */}
          <nav className="hidden md:flex items-center gap-1 rounded-full glass px-2 py-1.5 animate-fade-in-down">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 text-[13px] font-medium rounded-full transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? 'text-white bg-blue-500/20 shadow-inner'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
                {activeSection === link.href.slice(1) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-blue-400" />
                )}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50 text-slate-100 p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 z-40 backdrop-blur-2xl bg-slate-950/95 transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-6">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              className="text-2xl font-semibold text-slate-200 hover:text-gradient transition-colors"
              style={{ animationDelay: `${i * 0.08}s` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
