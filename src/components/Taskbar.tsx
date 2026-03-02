import { useEffect, useState } from 'react';

interface TaskbarApp {
  id: string;
  appId: string;
  title: string;
  icon: string;
  isMinimized: boolean;
  isFocused: boolean;
}

interface TaskbarProps {
  openApps: TaskbarApp[];
  onClickApp: (id: string) => void;
}

const Taskbar = ({ openApps, onClickApp }: TaskbarProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 min-h-[48px] max-w-[100vw] bg-os-panel/95 backdrop-blur-md border-t border-os-border z-[9999] flex items-center px-2 sm:px-3 min-w-0 pb-[max(0.25rem,env(safe-area-inset-bottom))]">
      {/* Left: System label */}
      <div className="flex items-center gap-2 mr-1 sm:mr-2 shrink-0">
        <span className="text-[10px] sm:text-[10px] text-os-green font-semibold">RevanthOS</span>
      </div>

      {/* Center: Running apps — scroll on mobile */}
      <div className="flex-1 flex items-center gap-1 overflow-x-auto min-w-0 overflow-y-hidden">
        {openApps.map((app) => (
          <button
            key={app.id}
            onClick={() => onClickApp(app.id)}
            type="button"
            title={app.title}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 sm:py-1 rounded-lg text-[11px] transition-colors truncate max-w-[90px] min-[400px]:max-w-[120px] sm:max-w-[150px] min-h-[44px] sm:min-h-0 touch-manipulation ${
              app.isFocused
                ? 'bg-os-accent/15 text-os-accent'
                : 'text-os-muted hover:bg-os-border/50 hover:text-os-text'
            }`}
          >
            <span className="shrink-0 text-base">{app.icon}</span>
            <span className="truncate hidden min-[400px]:inline">{app.title}</span>
            {app.isFocused && <span className="w-1.5 h-1.5 rounded-full bg-os-accent shrink-0 hidden sm:block" />}
          </button>
        ))}
      </div>

      {/* Right: System tray — time always, date on larger screens */}
      <div className="flex items-center gap-2 sm:gap-3 ml-2 sm:ml-4 shrink-0 text-[10px] text-os-muted pl-1">
        <span className="text-os-green">●</span>
        <span className="hidden sm:inline">online</span>
        <span className="whitespace-nowrap">{timeStr}</span>
        <span className="hidden sm:inline">{dateStr}</span>
      </div>
    </div>
  );
};

export default Taskbar;
