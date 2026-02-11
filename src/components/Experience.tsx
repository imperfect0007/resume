import { Briefcase } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'DevOps / Cloud Engineer',
      company: 'RAMA.AI LABS PVT LTD',
      location: 'Hyderabad, India',
      period: 'Jul 2025 – Present',
      current: true,
      description: [
        'Streamlining deployment and development workflows to improve overall system efficiency and reliability.',
        'Contributing to building scalable, high-performance applications and optimizing system performance.',
        'Enhancing code quality and team productivity through automation, reviews, and process improvements.',
      ],
    },
    {
      title: 'Full Stack Development Intern',
      company: 'Ivis Labs',
      location: 'Mysore, India',
      period: 'Feb 2025 – May 2025',
      current: false,
      description: [
        'Developed and deployed dynamic full-stack web applications using React.js, Node.js, and MongoDB with authentication and responsive UI/UX.',
        'Built and integrated RESTful APIs, utilizing Git for version control and cloud platforms for deployment.',
        'Collaborated in agile sprints, contributing to code reviews and enhancing code quality in scalable applications.',
      ],
    },
    {
      title: 'Web Development Intern',
      company: 'Tosko Technologies',
      location: 'Mysore, India',
      period: 'Dec 2023 – Feb 2024',
      current: false,
      description: [
        'Assisted in building dynamic, user-friendly, and responsive web applications for real-world client use cases.',
        'Worked with cross-functional teams to deliver features aligned with business and user experience goals.',
        'Contributed to front-end development, UI improvements, and basic integration tasks.',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 md:py-28">
      <h2 className="text-3xl md:text-4xl font-bold text-white section-heading mb-14">
        Experience
      </h2>

      <div className="relative">
        {/* Gradient timeline line */}
        <div className="absolute left-[19px] md:left-[23px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-slate-800/0 rounded-full" />

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-12 md:pl-16 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-[10px] md:left-[14px] top-1 z-10">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  exp.current
                    ? 'border-blue-400 bg-blue-500/20 shadow-md shadow-blue-500/30'
                    : 'border-slate-600 bg-slate-800'
                }`}>
                  {exp.current && <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />}
                </div>
              </div>

              {/* Card */}
              <div className="card-glow p-6 md:p-8 rounded-2xl">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                      <Briefcase size={18} className="text-blue-400 shrink-0" />
                      {exp.title}
                    </h3>
                    <p className="text-blue-400/90 font-medium mt-1">{exp.company}</p>
                    <p className="text-slate-500 text-sm mt-0.5">{exp.location}</p>
                  </div>
                  <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
                    exp.current
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-800/80 text-slate-400 border border-slate-700/40'
                  }`}>
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm md:text-[15px] text-slate-300/90 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-blue-400/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
