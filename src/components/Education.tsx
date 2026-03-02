const Education = () => {
  const entries = [
    { idx: 0, degree: 'B.E. in Computer Science (AI & ML)', institution: 'ATME College of Engineering', location: 'Mysore, India', period: 'Oct 2021 – Jun 2025', cgpa: '8.57', highlights: ['Specialized in AI, ML, Data Science', 'DSA, OS, DBMS coursework', 'AI/ML research projects'] },
    { idx: 1, degree: 'Pre-University (PCMC)', institution: 'Genius PU College', location: 'Mysore, India', period: 'Jun 2019 – Apr 2021', cgpa: null, highlights: ['Physics, Chemistry, Mathematics, CS', 'Analytical thinking foundation', 'Technical activities'] },
  ];

  return (
    <div className="p-4 sm:p-6 font-mono text-xs bg-os-bg h-full overflow-auto">
      <div className="text-os-muted mb-3 text-[11px] sm:text-xs">$ cat /etc/education.conf</div>
      <div className="text-os-dim mb-3"># Education Configuration</div>
      {entries.map((e) => (
        <div key={e.idx} className="mb-4">
          <div className="text-os-dim">[education.{e.idx}]</div>
          <div className="ml-2 mt-1 space-y-0.5">
            <div><span className="text-os-accent">degree</span><span className="text-os-dim"> = </span><span className="text-os-green">"{e.degree}"</span></div>
            <div><span className="text-os-accent">institution</span><span className="text-os-dim"> = </span><span className="text-os-yellow">"{e.institution}"</span></div>
            <div><span className="text-os-accent">location</span><span className="text-os-dim"> = </span><span className="text-os-text">"{e.location}"</span></div>
            <div><span className="text-os-accent">period</span><span className="text-os-dim"> = </span><span className="text-os-muted">"{e.period}"</span></div>
            {e.cgpa && <div><span className="text-os-accent">cgpa</span><span className="text-os-dim"> = </span><span className="text-os-green font-bold">{e.cgpa}</span></div>}
            <div className="mt-1"><span className="text-os-accent">highlights</span><span className="text-os-dim"> = [</span></div>
            {e.highlights.map((h, i) => (
              <div key={i} className="ml-4"><span className="text-os-dim">"</span><span className="text-os-muted">{h}</span><span className="text-os-dim">"</span>{i < e.highlights.length - 1 && <span className="text-os-dim">,</span>}</div>
            ))}
            <div><span className="text-os-dim">]</span></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;
