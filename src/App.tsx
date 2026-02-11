import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans overflow-x-hidden">
      {/* ── Animated background orbs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="orb w-[600px] h-[600px] bg-blue-600/30 -top-40 -left-40 animate-glow-pulse" />
        <div className="orb w-[500px] h-[500px] bg-purple-600/20 top-1/3 right-[-200px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="orb w-[400px] h-[400px] bg-cyan-500/15 bottom-[-100px] left-1/4 animate-glow-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* ── Grid overlay ── */}
      <div className="pointer-events-none fixed inset-0 bg-grid animate-grid-fade opacity-40" />

      {/* ── Radial fade ── */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(2,6,23,0.8)_70%)]" />

      <Header />

      <main className="relative z-10">
        <About />

        <div className="container mx-auto px-4 max-w-5xl space-y-0">
          <Experience />
          <Education />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-slate-800/60 mt-20">
        <div className="container mx-auto px-4 max-w-5xl py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-sm">
                © {new Date().getFullYear()} Revanth Kumar S
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Designing, Automating &amp; Scaling Reliable Systems
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {[
                { href: 'https://github.com/imperfect0007', icon: Github, label: 'GitHub' },
                { href: 'https://in.linkedin.com/in/revanth-kumar-s-a43672218', icon: Linkedin, label: 'LinkedIn' },
                { href: 'mailto:revanthkumars64@gmail.com', icon: Mail, label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/60 bg-slate-900/60 hover:border-blue-500/60 hover:bg-blue-500/10 transition-all duration-300"
                >
                  <social.icon size={18} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
