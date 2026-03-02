const Skills = () => {
  const categories = [
    {
      dir: 'devops-cloud/',
      color: 'text-os-accent',
      border: 'border-os-accent/30',
      bg: 'bg-os-accent/5',
      items: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Ansible', 'Terraform', 'Puppet', 'Chef'],
    },
    {
      dir: 'ci-cd/',
      color: 'text-os-green',
      border: 'border-os-green/30',
      bg: 'bg-os-green/5',
      items: ['Git', 'GitHub', 'GitLab', 'Bitbucket', 'CircleCI', 'Maven'],
    },
    {
      dir: 'monitoring/',
      color: 'text-os-cyan',
      border: 'border-os-cyan/30',
      bg: 'bg-os-cyan/5',
      items: ['Prometheus', 'Grafana', 'ELK Stack'],
    },
    {
      dir: 'scripting/',
      color: 'text-os-yellow',
      border: 'border-os-yellow/30',
      bg: 'bg-os-yellow/5',
      items: ['Python', 'Shell/Bash', 'Golang', 'Ruby', 'HCL', 'Node.js'],
    },
    {
      dir: 'databases/',
      color: 'text-os-orange',
      border: 'border-os-orange/30',
      bg: 'bg-os-orange/5',
      items: ['Supabase', 'MongoDB', 'REST APIs', 'Database Design'],
    },
    {
      dir: 'platforms/',
      color: 'text-os-purple',
      border: 'border-os-purple/30',
      bg: 'bg-os-purple/5',
      items: ['Linux', 'Windows', 'React'],
    },
  ];

  const total = categories.reduce((s, t) => s + t.items.length, 0);

  return (
    <div className="h-full overflow-auto bg-os-bg font-mono">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-os-border bg-os-panel/95 backdrop-blur px-4 sm:px-6 py-3">
        <div className="text-[10px] text-os-muted uppercase tracking-wider mb-1">$ tree ~/skills --dirsfirst</div>
        <div className="text-os-accent font-semibold text-sm sm:text-base">~/skills</div>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        {categories.map((g, gi) => {
          const isLast = gi === categories.length - 1;
          const branch = isLast ? '└── ' : '├── ';

          return (
            <div key={g.dir} className={`rounded-lg border ${g.border} ${g.bg} overflow-hidden`}>
              {/* Directory row */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-os-border/50">
                <span className="text-os-dim font-mono text-xs">{branch}</span>
                <span className={`font-bold ${g.color}`}>{g.dir}</span>
                <span className="text-os-dim text-[10px]">({g.items.length} tools)</span>
              </div>

              {/* Items as pills */}
              <div className="px-3 py-2.5 flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium border ${g.border} ${g.color} bg-os-surface/80 hover:brightness-110 transition-all cursor-default`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 border-t border-os-border bg-os-panel/95 backdrop-blur px-4 py-2 text-[10px] text-os-muted">
        {categories.length} directories, {total} tools · RevanthOS
      </div>
    </div>
  );
};

export default Skills;
