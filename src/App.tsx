import { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import DesktopIcons from './components/DesktopIcons';
import Terminal from './components/Terminal';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SnakeGame from './components/SnakeGame';
import Settings from './components/Settings';
import resume from '/src/assets/resume.pdf';

interface AppWindow {
  id: string;
  appId: string;
  title: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

const APP_CONFIG: Record<string, { title: string; icon: string; w: number; h: number }> = {
  terminal:   { title: 'Terminal', icon: '>_', w: 700, h: 450 },
  about:      { title: 'About — neofetch', icon: '👤', w: 650, h: 420 },
  skills:     { title: 'Skills — tree', icon: '🛠', w: 500, h: 500 },
  experience: { title: 'Experience — git log', icon: '💼', w: 600, h: 480 },
  education:  { title: 'Education — cat', icon: '🎓', w: 550, h: 440 },
  projects:   { title: 'Projects — kubectl', icon: '📂', w: 680, h: 420 },
  contact:    { title: 'Contact — ssh', icon: '✉', w: 580, h: 480 },
  snake:      { title: 'Snake', icon: '🐍', w: 320, h: 520 },
  settings:   { title: 'Settings', icon: '⚙', w: 420, h: 380 },
};

const BOOT_LINES = [
  '[    0.000] RevanthOS 1.0.0 (kernel 6.2.0-devops)',
  '[    0.100] Loading portfolio modules...',
  '[    0.200] Initializing desktop environment...',
  '[    0.300] Starting window manager...',
  '[    0.400] Loading user profile: revanth@devops',
  '[    0.500] Mounting /home/revanth/portfolio...',
  '[    0.600] Starting network services...',
  '[    0.700] Loading DevOps toolkit: Docker, K8s, Terraform, Ansible',
  '[    0.800] All systems operational.',
  '[    0.900] Welcome to RevanthOS — DevOps Engineer Portfolio',
  '',
  'Login: revanth',
  'Password: ********',
  '',
  'Last login: ' + new Date().toDateString(),
  'Starting desktop...',
];

const LANDSCAPE_HINT_KEY = 'revanthos-landscape-hint-dismissed';

function App() {
  const [booting, setBooting] = useState(true);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [zCounter, setZCounter] = useState(10);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [isMobilePortrait, setIsMobilePortrait] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );
  const [landscapeHintDismissed, setLandscapeHintDismissed] = useState(() => {
    if (typeof sessionStorage === 'undefined') return false;
    return sessionStorage.getItem(LANDSCAPE_HINT_KEY) === '1';
  });

  useEffect(() => {
    const check = () => setIsMobilePortrait(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const dismissLandscapeHint = useCallback(() => {
    setLandscapeHintDismissed(true);
    try {
      sessionStorage.setItem(LANDSCAPE_HINT_KEY, '1');
    } catch {
      // ignore
    }
  }, []);

  // Boot sequence
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setBootLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooting(false), 600);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Auto-open terminal on desktop only (mobile shows launcher first)
  useEffect(() => {
    if (!booting && windows.length === 0 && typeof window !== 'undefined' && window.innerWidth >= 768) {
      setTimeout(() => openApp('terminal'), 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booting]);

  const openApp = useCallback((appId: string) => {
    if (appId === 'resume') {
      const a = document.createElement('a');
      a.href = resume;
      a.download = 'Revanth_Kumar_Resume.pdf';
      a.click();
      return;
    }

    const existing = windows.find((w) => w.appId === appId);
    if (existing) {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === existing.id
            ? { ...w, isMinimized: false, zIndex: zCounter + 1 }
            : w
        )
      );
      setZCounter((c) => c + 1);
      setFocusedId(existing.id);
      return;
    }

    const config = APP_CONFIG[appId];
    if (!config) return;

    const offset = (windows.length % 6) * 30;
    const newWin: AppWindow = {
      id: `${appId}-${Date.now()}`,
      appId,
      title: config.title,
      icon: config.icon,
      x: 200 + offset,
      y: 40 + offset,
      width: config.w,
      height: config.h,
      isMinimized: false,
      isMaximized: false,
      zIndex: zCounter + 1,
    };

    setWindows((prev) => [...prev, newWin]);
    setZCounter((c) => c + 1);
    setFocusedId(newWin.id);
  }, [windows, zCounter]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    if (focusedId === id) setFocusedId(null);
  }, [focusedId]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, isMinimized: true } : w));
    if (focusedId === id) setFocusedId(null);
  }, [focusedId]);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, zIndex: zCounter + 1 } : w));
    setZCounter((c) => c + 1);
    setFocusedId(id);
  }, [zCounter]);

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, x, y } : w));
  }, []);

  const handleTaskbarClick = useCallback((id: string) => {
    const win = windows.find((w) => w.id === id);
    if (!win) return;
    if (win.isMinimized) {
      setWindows((prev) => prev.map((w) => w.id === id ? { ...w, isMinimized: false, zIndex: zCounter + 1 } : w));
      setZCounter((c) => c + 1);
      setFocusedId(id);
    } else if (focusedId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  }, [windows, focusedId, zCounter, minimizeWindow, focusWindow]);

  const renderAppContent = (appId: string) => {
    switch (appId) {
      case 'terminal': return <Terminal onOpenApp={openApp} />;
      case 'about': return <About />;
      case 'skills': return <Skills />;
      case 'experience': return <Experience />;
      case 'education': return <Education />;
      case 'projects': return <Projects />;
      case 'contact': return <Contact />;
      case 'snake': return <SnakeGame />;
      case 'settings': return <Settings />;
      default: return null;
    }
  };

  // ── Boot Screen ──
  if (booting) {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return (
      <div
        className="h-screen max-h-[100dvh] bg-black p-4 sm:p-6 font-mono text-xs overflow-hidden flex flex-col justify-end min-h-0 relative"
        onClick={isMobile ? () => setBooting(false) : undefined}
        role={isMobile ? 'button' : undefined}
        aria-label={isMobile ? 'Tap to skip' : undefined}
      >
        <div className="space-y-0.5">
          {bootLines.map((line, i) => (
            <div key={i} className="boot-text animate-boot-line" style={{ animationDelay: `${i * 0.02}s` }}>
              {line && line.startsWith('[') ? (
                <>
                  <span className="text-green-500">[  OK  ]</span>
                  <span className="text-green-300/80"> {line.split(']')[1]}</span>
                </>
              ) : (
                <span className="text-green-400">{line || '\u00A0'}</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 text-green-400 animate-blink">█</div>
        {isMobile && (
          <div className="absolute bottom-8 left-0 right-0 text-center text-green-500/80 text-[11px] animate-pulse">
            Tap to skip →
          </div>
        )}
      </div>
    );
  }

  // ── Desktop ──
  const showLandscapeHint = isMobilePortrait && !landscapeHintDismissed;

  return (
    <div className="h-screen max-h-[100dvh] desktop-bg overflow-hidden select-none min-h-0 flex flex-col">
      {/* Mobile portrait: suggest landscape for better view (in flow so launcher stays visible) */}
      {showLandscapeHint && (
        <div className="shrink-0 flex items-center justify-between gap-2 px-3 py-2 bg-os-panel/95 border-b border-os-border text-os-text text-[11px] font-mono z-20">
          <span className="flex items-center gap-2">
            <span className="text-os-green">↻</span>
            For a better view, switch to landscape mode
          </span>
          <button
            type="button"
            onClick={dismissLandscapeHint}
            className="shrink-0 p-1.5 rounded text-os-muted hover:text-os-text hover:bg-os-border/50 touch-manipulation"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-hidden overflow-x-hidden relative min-w-0">
        {/* Desktop icons */}
        <DesktopIcons onOpen={openApp} />

        {/* Windows */}
        {windows.map((win) => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          icon={win.icon}
          x={win.x}
          y={win.y}
          width={win.width}
          height={win.height}
          isMinimized={win.isMinimized}
          isMaximized={win.isMaximized}
          isFocused={focusedId === win.id}
          zIndex={win.zIndex}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onMaximize={() => maximizeWindow(win.id)}
          onFocus={() => focusWindow(win.id)}
          onMove={(x, y) => moveWindow(win.id, x, y)}
        >
          {renderAppContent(win.appId)}
        </Window>
      ))}

        {/* Taskbar */}
        <Taskbar
          openApps={windows.map((w) => ({
            id: w.id,
            appId: w.appId,
            title: w.title,
            icon: w.icon,
            isMinimized: w.isMinimized,
            isFocused: focusedId === w.id,
          }))}
          onClickApp={handleTaskbarClick}
        />
      </div>
    </div>
  );
}

export default App;
