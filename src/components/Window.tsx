import { ReactNode, useRef, useCallback, useEffect, useState } from 'react';

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  children: ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  zIndex: number;
}

const TASKBAR_H = 40;

const Window = ({
  title, icon, children,
  x, y, width, height,
  isMinimized, isMaximized, isFocused,
  onClose, onMinimize, onMaximize, onFocus, onMove, zIndex,
}: WindowProps) => {
  const dragRef = useRef<{ startX: number; startY: number } | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [viewport, setViewport] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const onResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMaximized || isMobile) return;
    onFocus();
    dragRef.current = { startX: e.clientX - x, startY: e.clientY - y };

    const handleMouseMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - TASKBAR_H - 80;
      const newX = Math.max(0, Math.min(ev.clientX - dragRef.current.startX, maxX));
      const newY = Math.max(0, Math.min(ev.clientY - dragRef.current.startY, maxY));
      onMove(newX, newY);
    };

    const handleMouseUp = () => {
      dragRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [x, y, isMaximized, isMobile, onFocus, onMove]);

  if (isMinimized) return null;

  const vw = viewport.w;
  const vh = Math.max(200, viewport.h - TASKBAR_H);
  const effW = Math.min(width, vw);
  const effH = Math.min(height, vh);
  const effX = Math.max(0, Math.min(x, vw - effW));
  const effY = Math.max(0, Math.min(y, vh - effH));

  const maximizedStyle: React.CSSProperties = isMaximized || isMobile
    ? { position: 'fixed', top: 0, left: 0, right: 0, zIndex, width: '100%', height: 'auto', minHeight: 0 }
    : { position: 'absolute', left: effX, top: effY, width: effW, height: effH, maxWidth: '100vw', maxHeight: `calc(100vh - ${TASKBAR_H}px)`, zIndex };

  const isFullView = isMaximized || isMobile;
  return (
    <div
      {...(isMobile ? { 'data-window-mobile': 'true' } : {})}
      style={{
        ...maximizedStyle,
        backgroundColor: 'var(--os-surface)',
        isolation: 'isolate',
      }}
      className={`flex flex-col rounded-lg overflow-hidden border transition-shadow duration-200 ${isFullView ? 'window-maximized-bottom' : ''} ${
        isFocused ? 'border-os-accent/40 shadow-2xl shadow-black/50' : 'border-os-border shadow-lg shadow-black/30'
      } ${isFullView ? 'inset-x-0 top-0' : ''}`}
      onMouseDown={onFocus}
    >
      {/* Title bar — solid on mobile so nothing shows through */}
      <div
        className="window-titlebar flex items-center h-10 px-3 border-b-2 border-os-border shrink-0 window-drag"
        style={{ backgroundColor: 'var(--os-panel)' }}
        onMouseDown={handleMouseDown}
      >
        {/* Window controls: Close, Minimize, Maximize — 44px min on mobile */}
        <div className="window-controls flex items-center gap-1.5 sm:gap-2 mr-2 sm:mr-4 shrink-0" onMouseDown={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-6 h-6 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 rounded-md flex items-center justify-center font-bold text-sm transition-all shrink-0 border-2 hover:opacity-100 opacity-90 touch-manipulation"
            style={{ backgroundColor: 'var(--os-btn-close)', borderColor: 'var(--os-btn-close)', color: 'white' }}
            title="Close"
            aria-label="Close window"
          >
            ×
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-6 h-6 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 rounded-md flex items-center justify-center font-bold text-sm leading-none transition-all shrink-0 border-2 hover:opacity-100 opacity-90 touch-manipulation"
            style={{ backgroundColor: 'var(--os-btn-min)', borderColor: 'var(--os-btn-min)', color: 'white' }}
            title="Minimize"
            aria-label="Minimize window"
          >
            −
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-6 h-6 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 rounded-md flex items-center justify-center font-bold text-xs transition-all shrink-0 border-2 hover:opacity-100 opacity-90 touch-manipulation hidden sm:flex"
            style={{ backgroundColor: 'var(--os-btn-max)', borderColor: 'var(--os-btn-max)', color: 'white' }}
            title="Maximize"
            aria-label="Maximize window"
          >
            □
          </button>
        </div>
        {/* Title */}
        <div className="flex-1 text-center text-xs font-medium truncate pointer-events-none min-w-0" style={{ color: 'var(--os-titlebar-text)' }}>
          <span className="mr-1.5">{icon}</span>
          {title}
        </div>
        <div className="w-12 shrink-0" />
      </div>

      {/* Content — opaque so launcher/desktop never shows through on mobile */}
      <div
        data-window-content
        className="flex-1 min-h-0 overflow-auto text-sm"
        style={{ backgroundColor: 'var(--os-surface)' }}
      >
        {children}
      </div>
    </div>
  );
};

export default Window;
