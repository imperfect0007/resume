import { useTheme } from '../contexts/ThemeContext';

const Settings = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'dark' as const, name: 'Dark', desc: 'Tokyo Night style (default)' },
    { id: 'light' as const, name: 'Light', desc: 'Clean light desktop' },
    { id: 'terminal' as const, name: 'Terminal', desc: 'GitHub-style green on black' },
  ];

  return (
    <div className="h-full overflow-auto bg-os-bg font-mono p-4 sm:p-6">
      <div className="max-w-md mx-auto">
        <h2 className="text-lg font-bold text-os-text mb-1">Settings</h2>
        <p className="text-os-muted text-xs mb-6">RevanthOS appearance</p>

        <section className="mb-8">
          <h3 className="text-sm font-semibold text-os-accent mb-3 uppercase tracking-wider">Theme</h3>
          <div className="space-y-2">
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={`w-full flex items-center gap-4 p-4 min-h-[56px] rounded-xl border-2 text-left transition-all touch-manipulation ${
                  theme === t.id
                    ? 'border-os-accent bg-os-accent/10'
                    : 'border-os-border bg-os-surface hover:border-os-muted'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg shrink-0 ${
                  t.id === 'dark' ? 'bg-[#1a1b26] ring-2 ring-os-border' :
                  t.id === 'light' ? 'bg-white ring-2 ring-os-border' :
                  'bg-[#0d1117] ring-2 ring-os-green'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-os-text">{t.name}</p>
                  <p className="text-xs text-os-muted">{t.desc}</p>
                </div>
                {theme === t.id && (
                  <span className="text-os-green font-bold text-sm">✓</span>
                )}
              </button>
            ))}
          </div>
        </section>

        <p className="text-[10px] text-os-dim">Theme is saved automatically and applies to the entire desktop.</p>
      </div>
    </div>
  );
};

export default Settings;
