const Experience = () => {
  const commits = [
    { hash: 'a3f7b21', branch: 'HEAD -> main', title: 'DevOps/Cloud Engineer @ RAMA.AI LABS', date: 'Jul 2025 – Present | Hyderabad', body: ['Streamlining deployment workflows & system reliability', 'Building scalable, high-performance applications', 'Automating CI/CD, code reviews & process improvements'] },
    { hash: 'e8c2d04', branch: 'origin/fullstack', title: 'Full Stack Dev Intern @ Ivis Labs', date: 'Feb 2025 – May 2025 | Mysore', body: ['React.js + Node.js + MongoDB full-stack apps', 'RESTful APIs, Git, cloud deployment', 'Agile sprints & code reviews'] },
    { hash: '1b4a9f6', branch: 'origin/webdev', title: 'Web Dev Intern @ Tosko Technologies', date: 'Dec 2023 – Feb 2024 | Mysore', body: ['Dynamic, responsive web applications', 'Cross-functional collaboration', 'Front-end development & UI improvements'] },
  ];

  return (
    <div className="p-4 sm:p-6 font-mono text-xs bg-os-bg h-full overflow-auto">
      <div className="text-os-muted mb-3 text-[11px] sm:text-xs">$ git log --oneline --graph --all</div>
      <div className="space-y-4">
        {commits.map((c, i) => (
          <div key={c.hash}>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-os-red">*</span>
              <span className="text-os-yellow font-semibold">{c.hash}</span>
              <span className="text-os-green">({c.branch})</span>
            </div>
            <div className="ml-4 mt-1">
              <div><span className="text-os-dim">Author: </span><span className="text-os-accent">{c.title.split('@')[1]?.trim()}</span></div>
              <div><span className="text-os-dim">Date:   </span><span className="text-os-muted">{c.date}</span></div>
              <p className="text-os-text font-semibold mt-1.5">{c.title}</p>
              <div className="mt-1 space-y-0.5">
                {c.body.map((l, j) => (
                  <div key={j} className="text-os-muted"><span className="text-os-dim">- </span>{l}</div>
                ))}
              </div>
            </div>
            {i < commits.length - 1 && <div className="text-os-dim ml-0 mt-2">│</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
