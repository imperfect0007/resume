import { GraduationCap } from 'lucide-react';

const Education = () => {
  const education = [
    {
      degree: 'B.E. in Computer Science (AI & ML)',
      institution: 'ATME College of Engineering',
      location: 'Mysore, India',
      period: 'Oct 2021 – Jun 2025',
      highlight: 'CGPA: 8.57',
      points: [
        'Focused on AI, ML, Data Science, and core CS fundamentals.',
        'Completed coursework in Data Structures, Algorithms, Operating Systems, and Database Management Systems.',
        'Participated in AI/ML and software projects aligned with industry practices.',
      ],
    },
    {
      degree: 'Pre-University (PCMC)',
      institution: 'Genius PU College',
      location: 'Mysore, India',
      period: 'Jun 2019 – Apr 2021',
      highlight: null,
      points: [
        'Built a strong foundation in analytical thinking and problem-solving.',
        'Actively participated in academic and technical activities.',
        'Developed interest in Computer Science and programming.',
      ],
    },
  ];

  return (
    <section id="education" className="py-20 md:py-28">
      <h2 className="text-3xl md:text-4xl font-bold text-white section-heading mb-14">
        Education
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {education.map((edu, index) => (
          <div
            key={index}
            className="card-glow p-6 md:p-8 rounded-2xl animate-fade-in-up"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* Icon + Degree */}
            <div className="flex items-start gap-4 mb-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/10">
                <GraduationCap size={22} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">{edu.degree}</h3>
                <p className="text-blue-400/90 font-medium text-sm mt-1">{edu.institution}</p>
              </div>
            </div>

            {/* Period + Location */}
            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-slate-400">
              <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/40 text-xs font-medium">
                {edu.period}
              </span>
              <span>{edu.location}</span>
              {edu.highlight && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  {edu.highlight}
                </span>
              )}
            </div>

            {/* Points */}
            <ul className="space-y-2">
              {edu.points.map((point, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300/80 leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-purple-400/60" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
