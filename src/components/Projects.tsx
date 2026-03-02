const Projects = () => {
  const pods = [
    { name: 'protected-vault', status: 'Completed', statusColor: 'text-os-accent', age: '1mo', tech: 'React, TypeScript, Node, Express, Supabase, Monaco, PDF.js', desc: 'ProtectedVault — Secure vault-based notes & file storage system', github: 'https://github.com/imperfect0007/' },
    { name: 'missing-person-alert', status: 'Completed', statusColor: 'text-os-accent', age: '2mo', tech: 'React, Node, MongoDB', desc: 'Real-time missing person alert tracking web app', github: 'https://github.com/imperfect0007/' },
    { name: 'text-classification-rnn', status: 'Completed', statusColor: 'text-os-accent', age: '8mo', tech: 'Python, TensorFlow, RNN', desc: 'RNN text classifier — published IJERT May 2025', github: 'https://github.com/imperfect0007/' },
    { name: 'covid-bed-management', status: 'Completed', statusColor: 'text-os-accent', age: '2y', tech: 'MySQL, DBMS, Java', desc: 'Hospital bed allocation & resource tracking system', github: 'https://github.com/imperfect0007/' },
    { name: 'place-name-nlp', status: 'Completed', statusColor: 'text-os-accent', age: '1y', tech: 'Python, NLP, ML', desc: 'Geographic location extraction from text using NLP', github: 'https://github.com/imperfect0007/' },
  ];

  return (
    <div className="p-4 sm:p-6 font-mono text-xs bg-os-bg h-full overflow-auto">
      <div className="text-os-muted mb-3 text-[11px] sm:text-xs">$ kubectl get pods -n projects -o wide</div>
      <table className="w-full">
        <thead>
          <tr className="text-os-muted text-[10px] uppercase tracking-wider">
            <th className="text-left pr-3 pb-2">NAME</th>
            <th className="text-left pr-3 pb-2">STATUS</th>
            <th className="text-left pr-3 pb-2 hidden sm:table-cell">AGE</th>
            <th className="text-left pb-2">STACK</th>
          </tr>
        </thead>
        <tbody>
          {pods.map((p) => (
            <tr key={p.name} className="hover:bg-os-border/20 transition-colors">
              <td className="py-1.5 pr-3"><a href={p.github} target="_blank" rel="noopener noreferrer" className="text-os-cyan hover:underline">{p.name}</a></td>
              <td className={`py-1.5 pr-3 ${p.statusColor}`}>{p.status}</td>
              <td className="py-1.5 pr-3 text-os-muted hidden sm:table-cell">{p.age}</td>
              <td className="py-1.5 text-os-yellow">{p.tech}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-5 text-os-dim">$ kubectl describe pods -n projects</div>
      <div className="mt-2 space-y-1.5">
        {pods.map((p) => (
          <div key={p.name}><span className="text-os-accent">→ {p.name}</span><span className="text-os-dim">: </span><span className="text-os-muted">{p.desc}</span></div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
