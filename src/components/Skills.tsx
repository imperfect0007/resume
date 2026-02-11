import {
  Cloud,
  GitBranch,
  Activity,
  Terminal,
  Database,
  Monitor,
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      category: 'DevOps & Cloud',
      icon: Cloud,
      color: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/10',
      dot: 'bg-blue-400',
      skills: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Ansible', 'Terraform', 'Puppet', 'Chef'],
    },
    {
      category: 'CI/CD & Version Control',
      icon: GitBranch,
      color: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-500/10',
      dot: 'bg-purple-400',
      skills: ['Git', 'GitHub', 'GitLab', 'Bitbucket', 'CircleCI', 'Maven'],
    },
    {
      category: 'Monitoring & Observability',
      icon: Activity,
      color: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/10',
      dot: 'bg-emerald-400',
      skills: ['Prometheus', 'Grafana', 'ELK Stack'],
    },
    {
      category: 'Programming & Scripting',
      icon: Terminal,
      color: 'from-orange-500/20 to-amber-500/20',
      border: 'border-orange-500/10',
      dot: 'bg-orange-400',
      skills: ['Python', 'Shell / Bash', 'Golang', 'Ruby', 'HCL', 'Node.js'],
    },
    {
      category: 'Databases & Backend',
      icon: Database,
      color: 'from-rose-500/20 to-red-500/20',
      border: 'border-rose-500/10',
      dot: 'bg-rose-400',
      skills: ['Supabase', 'MongoDB', 'REST APIs', 'Backend Dev', 'Database Design'],
    },
    {
      category: 'Platforms & OS',
      icon: Monitor,
      color: 'from-slate-400/20 to-slate-500/20',
      border: 'border-slate-500/10',
      dot: 'bg-slate-400',
      skills: ['Linux', 'Windows', 'React'],
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-28">
      <h2 className="text-3xl md:text-4xl font-bold text-white section-heading mb-4">
        Technical Skills
      </h2>
      <p className="text-slate-400 mb-14 max-w-2xl">
        A modern DevOps toolkit spanning cloud platforms, container orchestration, CI/CD automation,
        infrastructure-as-code, monitoring, and full-stack development.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillCategories.map((cat, index) => (
          <div
            key={index}
            className="card-glow p-6 rounded-2xl animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} border ${cat.border}`}>
                <cat.icon size={20} className="text-slate-200" />
              </div>
              <h3 className="text-base font-bold text-white">{cat.category}</h3>
            </div>

            {/* Skills as pills */}
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, i) => (
                <span
                  key={i}
                  className="group relative px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/40 hover:border-blue-500/40 hover:text-white hover:bg-slate-700/60 transition-all duration-300 cursor-default"
                >
                  <span className={`absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full ${cat.dot} opacity-60`} />
                  <span className="pl-2">{skill}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
