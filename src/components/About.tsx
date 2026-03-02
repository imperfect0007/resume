import img from '/src/assets/img.jpeg';

const About = () => {
  const info = [
    { key: 'Name', value: 'Revanth Kumar S', color: 'text-os-green' },
    { key: 'Role', value: 'DevOps / Cloud Engineer', color: 'text-os-accent' },
    { key: 'Company', value: 'RAMA.AI LABS PVT LTD', color: 'text-os-cyan' },
    { key: 'Location', value: 'Hyderabad, India', color: 'text-os-text' },
    { key: 'Email', value: 'revanthkumars64@gmail.com', color: 'text-os-yellow' },
    { key: 'Phone', value: '+91 8431005243', color: 'text-os-text' },
    { key: 'GitHub', value: 'github.com/imperfect0007', color: 'text-os-purple' },
    { key: 'LinkedIn', value: 'linkedin.com/in/revanth-kumar-s', color: 'text-os-accent' },
    { key: 'Status', value: '● Available for opportunities', color: 'text-os-green' },
  ];

  return (
    <div className="p-4 sm:p-6 font-mono text-xs sm:text-xs bg-os-bg h-full overflow-auto min-[480px]:text-xs">
      <div className="text-os-muted mb-3 text-[11px] sm:text-xs">$ neofetch</div>
      <div className="flex flex-col md:flex-row gap-5 sm:gap-6">
        <div className="shrink-0 flex flex-col items-center gap-3">
          <img src={img} alt="Revanth" className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl object-cover border-2 border-os-border" />
          <pre className="text-[7px] leading-tight text-os-green text-center select-none hidden md:block">{`
  ____             ___
 / __ \\___  _   __/ _ \\___  ___
/ / / / _ \\| | / / / / / _ \\/ _ \\
/ /_/ /  __/| |/ / /_/ /  __/  __/
\\____/\\___/ |___/\\____/\\___/\\___/`}</pre>
        </div>

        <div className="flex-1">
          <div className="text-os-green font-bold mb-1">revanth@devops</div>
          <div className="text-os-dim mb-3">{'─'.repeat(28)}</div>
          <div className="space-y-1 sm:space-y-0.5">
            {info.map((i) => (
              <div key={i.key} className="flex flex-wrap gap-x-2">
                <span className="text-os-accent w-24 shrink-0 text-[11px] sm:text-xs">{i.key}</span>
                <span className="text-os-dim shrink-0">:</span>
                <span className={`${i.color} break-all text-[11px] sm:text-xs`}>{i.value}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-1 mt-4">
            {['bg-os-red', 'bg-os-orange', 'bg-os-yellow', 'bg-os-green', 'bg-os-cyan', 'bg-os-accent', 'bg-os-purple', 'bg-os-pink'].map((c) => (
              <span key={c} className={`w-4 h-4 rounded-sm ${c}`} />
            ))}
          </div>
          <p className="text-os-muted mt-4 leading-relaxed text-[13px] sm:text-xs">
            Motivated DevOps-focused professional dedicated to designing,
            automating, and maintaining scalable, high-performance cloud systems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
