import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

interface DesktopIconsProps {
  onOpen: (appId: string) => void;
}

const TerminalSvg = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <rect x="4" y="6" width="40" height="36" rx="4" fill="#1a1b26" stroke="#7aa2f7" strokeWidth="1.5" />
    <rect x="4" y="6" width="40" height="8" rx="4" fill="#292e42" />
    <circle cx="10" cy="10" r="1.5" fill="#f7768e" />
    <circle cx="15" cy="10" r="1.5" fill="#e0af68" />
    <circle cx="20" cy="10" r="1.5" fill="#9ece6a" />
    <path d="M12 22l6 4-6 4" stroke="#9ece6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="22" y1="30" x2="34" y2="30" stroke="#565f89" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const UserSvg = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#292e42" stroke="#7aa2f7" strokeWidth="1.5" />
    <circle cx="24" cy="18" r="7" fill="#7aa2f7" opacity="0.8" />
    <path d="M12 38c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="#7aa2f7" opacity="0.4" />
  </svg>
);

const SkillsSvg = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#292e42" stroke="#e0af68" strokeWidth="1.5" />
    <path d="M17 15l-5 9 5 9" stroke="#e0af68" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M31 15l5 9-5 9" stroke="#e0af68" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="27" y1="12" x2="21" y2="36" stroke="#e0af68" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const BriefcaseSvg = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#292e42" stroke="#bb9af7" strokeWidth="1.5" />
    <rect x="10" y="18" width="28" height="18" rx="3" fill="#bb9af7" opacity="0.3" stroke="#bb9af7" strokeWidth="1.5" />
    <path d="M18 18v-4a2 2 0 012-2h8a2 2 0 012 2v4" stroke="#bb9af7" strokeWidth="1.5" />
    <line x1="10" y1="25" x2="38" y2="25" stroke="#bb9af7" strokeWidth="1.5" opacity="0.5" />
  </svg>
);

const GradCapSvg = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#292e42" stroke="#7dcfff" strokeWidth="1.5" />
    <path d="M24 14l-14 7 14 7 14-7-14-7z" fill="#7dcfff" opacity="0.4" stroke="#7dcfff" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14 23v8l10 5 10-5v-8" stroke="#7dcfff" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="38" y1="21" x2="38" y2="33" stroke="#7dcfff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const FolderSvg = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#292e42" stroke="#ff9e64" strokeWidth="1.5" />
    <path d="M10 18h28a2 2 0 012 2v14a2 2 0 01-2 2H10a2 2 0 01-2-2V20a2 2 0 012-2z" fill="#ff9e64" opacity="0.3" stroke="#ff9e64" strokeWidth="1.5" />
    <path d="M8 18v-4a2 2 0 012-2h8l3 4h17" stroke="#ff9e64" strokeWidth="1.5" />
  </svg>
);

const MailSvg = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#292e42" stroke="#f7768e" strokeWidth="1.5" />
    <rect x="8" y="14" width="32" height="20" rx="3" fill="#f7768e" opacity="0.2" stroke="#f7768e" strokeWidth="1.5" />
    <path d="M8 16l16 10 16-10" stroke="#f7768e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FileSvg = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#292e42" stroke="#c0caf5" strokeWidth="1.5" />
    <path d="M14 8h12l10 10v22a2 2 0 01-2 2H14a2 2 0 01-2-2V10a2 2 0 012-2z" fill="#c0caf5" opacity="0.15" stroke="#c0caf5" strokeWidth="1.5" />
    <path d="M26 8v10h10" stroke="#c0caf5" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="17" y1="26" x2="31" y2="26" stroke="#c0caf5" strokeWidth="1" opacity="0.4" />
    <line x1="17" y1="30" x2="27" y2="30" stroke="#c0caf5" strokeWidth="1" opacity="0.4" />
    <line x1="17" y1="34" x2="29" y2="34" stroke="#c0caf5" strokeWidth="1" opacity="0.4" />
  </svg>
);

const SnakeSvg = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#292e42" stroke="#9ece6a" strokeWidth="1.5" />
    <circle cx="18" cy="24" r="4" fill="#9ece6a" opacity="0.9" />
    <circle cx="26" cy="24" r="4" fill="#9ece6a" opacity="0.7" />
    <circle cx="34" cy="24" r="4" fill="#9ece6a" opacity="0.5" />
    <circle cx="34" cy="24" r="2" fill="#7aa2f7" />
    <circle cx="12" cy="24" r="3" fill="#f7768e" />
  </svg>
);

const SettingsSvg = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#292e42" stroke="#7aa2f7" strokeWidth="1.5" />
    <circle cx="24" cy="24" r="6" stroke="#7aa2f7" strokeWidth="2" fill="none" />
    <path d="M24 14v-2M24 36v-2M14 24h-2M36 24h-2M18.7 18.7l-1.4-1.4M30.7 30.7l-1.4-1.4M18.7 29.3l-1.4 1.4M30.7 17.3l-1.4 1.4" stroke="#7aa2f7" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="24" cy="24" r="2.5" fill="#7aa2f7" />
  </svg>
);

const icons = [
  { id: 'terminal', label: 'Terminal', Icon: TerminalSvg },
  { id: 'about', label: 'About Me', Icon: UserSvg },
  { id: 'skills', label: 'Skills', Icon: SkillsSvg },
  { id: 'experience', label: 'Experience', Icon: BriefcaseSvg },
  { id: 'education', label: 'Education', Icon: GradCapSvg },
  { id: 'projects', label: 'Projects', Icon: FolderSvg },
  { id: 'contact', label: 'Contact', Icon: MailSvg },
  { id: 'snake', label: 'Snake', Icon: SnakeSvg },
  { id: 'settings', label: 'Settings', Icon: SettingsSvg },
  { id: 'resume', label: 'Resume.pdf', Icon: FileSvg },
];

const DesktopIcons = ({ onOpen }: DesktopIconsProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ── Mobile: full-screen launcher (hero + app grid) ──
  if (isMobile) {
    return (
      <div className="absolute inset-0 z-10 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 pb-24 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden">
          {/* Hero */}
          <div className="text-center mb-4 sm:mb-6 w-full max-w-[100vw] shrink-0">
            <h1 className="text-xl font-bold text-os-green tracking-tight">RevanthOS</h1>
            <p className="text-sm text-os-muted mt-1 truncate px-2 max-w-full">Revanth Kumar S · DevOps Engineer</p>
            <p className="text-xs text-os-dim mt-0.5">Tap an app to start</p>
          </div>
          {/* App grid — 2 cols portrait; 3–4 cols landscape, fit within viewport */}
          <div className="grid grid-cols-2 min-[500px]:grid-cols-3 min-[640px]:grid-cols-4 gap-2 sm:gap-3 w-full max-w-full">
            {icons.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpen(item.id)}
                className="group flex flex-col items-center justify-center min-h-[88px] py-4 px-3 rounded-2xl bg-os-surface/80 border-2 border-os-border hover:border-os-accent/50 active:scale-[0.98] transition-all duration-200 touch-manipulation shadow-lg"
              >
                <div className="w-12 h-12 mb-2 drop-shadow-md group-active:scale-95 transition-transform">
                  <item.Icon />
                </div>
                <span className="text-xs font-medium text-os-text text-center line-clamp-2 leading-tight">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Desktop: icon strip ──
  return (
    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-1 z-10 max-h-[calc(100vh-4rem)] overflow-y-auto overflow-x-visible py-2 sm:py-0">
      {icons.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setSelected(item.id)}
          onDoubleClick={() => onOpen(item.id)}
          className={`group flex flex-col items-center justify-center min-h-[72px] sm:min-h-0 w-full min-w-[72px] sm:w-[82px] py-3 sm:py-2 px-2 sm:px-1 rounded-xl sm:rounded-lg transition-all duration-150 touch-manipulation active:scale-[0.98] ${
            selected === item.id
              ? 'bg-os-accent/15 ring-1 ring-os-accent/30'
              : 'hover:bg-white/5 active:bg-white/10'
          }`}
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 mb-1 sm:mb-1.5 drop-shadow-lg group-hover:scale-110 transition-transform duration-150 shrink-0">
            <item.Icon />
          </div>
          <span className={`text-[10px] leading-tight text-center font-medium px-0.5 rounded line-clamp-2 ${
            selected === item.id
              ? 'text-os-text bg-os-accent/20'
              : 'text-os-text/80 group-hover:text-os-text'
          }`}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default DesktopIcons;
