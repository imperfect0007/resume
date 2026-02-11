import { MapPin, Mail, Phone, Download, Github, Linkedin, ChevronDown } from 'lucide-react';
import img from '/src/assets/img.jpeg';
import resume from '/src/assets/resume.pdf';

const About = () => {
  const socials = [
    { href: 'https://github.com/imperfect0007', icon: Github, label: 'GitHub' },
    { href: 'https://in.linkedin.com/in/revanth-kumar-s-a43672218', icon: Linkedin, label: 'LinkedIn' },
    { href: 'mailto:revanthkumars64@gmail.com', icon: Mail, label: 'Email' },
  ];

  const badges = [
    'AWS / Azure / GCP',
    'Kubernetes & Docker',
    'CI/CD Pipelines',
    'Infrastructure as Code',
    'Monitoring & SRE',
  ];

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          {/* ── Left: Text ── */}
          <div className="lg:w-3/5 text-center lg:text-left animate-fade-in-up">
            {/* Greeting */}
            <p className="text-sm md:text-base font-medium text-blue-400/90 tracking-widest uppercase mb-4">
              Hello, I'm
            </p>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-4">
              <span className="text-white">Revanth</span>{' '}
              <span className="text-gradient">Kumar S</span>
            </h1>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-300/90 mb-6">
              DevOps / Cloud Engineer
            </h2>

            {/* Tagline */}
            <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6">
              Designing, automating &amp; scaling reliable systems. Dedicated to building
              high-performance cloud infrastructure with operational excellence.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
              {badges.map((b) => (
                <span
                  key={b}
                  className="px-3 py-1 text-xs font-medium rounded-full border border-slate-700/60 bg-slate-800/50 text-slate-300 hover:border-blue-500/50 hover:text-blue-300 transition-colors duration-300"
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Info row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-slate-400 mb-8">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-blue-400" /> Hyderabad, India
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={14} className="text-blue-400" />
                <a href="mailto:revanthkumars64@gmail.com" className="hover:text-white transition-colors">
                  revanthkumars64@gmail.com
                </a>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={14} className="text-blue-400" />
                <a href="tel:+918431005243" className="hover:text-white transition-colors">
                  +91 8431005243
                </a>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <a
                href={resume}
                download="Revanth_Kumar_Resume.pdf"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                <Download size={16} />
                Download Resume
                <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-200 border border-slate-600/60 hover:border-blue-500/60 hover:text-white hover:bg-blue-500/10 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>

            {/* Socials */}
            <div className="flex justify-center lg:justify-start gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/60 bg-slate-900/40 hover:border-blue-500/60 hover:bg-blue-500/10 transition-all duration-300"
                >
                  <s.icon size={18} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: Photo ── */}
          <div className="lg:w-2/5 flex justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Glow rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/40 via-purple-500/30 to-cyan-400/30 blur-2xl scale-110 animate-glow-pulse" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-3xl scale-125 animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

              {/* Image */}
              <img
                src={img}
                alt="Revanth Kumar S"
                className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full object-cover ring-2 ring-white/10 shadow-2xl animate-float"
              />

              {/* Status badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass px-4 py-1.5 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-slate-300">Available for work</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#experience"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-blue-400 transition-colors animate-fade-in"
        style={{ animationDelay: '1.2s' }}
      >
        <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
};

export default About;
