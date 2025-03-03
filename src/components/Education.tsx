

const Education = () => {
  const education = [
    {
      degree: 'Bachelor of Engineering in Computer Science (AI & ML)',
      institution: 'ATME College of Engineering',
      location: 'Mysuru, India',
      period: 'Aug 2022 – Present',
      description: 'Focused on Artificial Intelligence, Machine Learning, and Data Science.',
      achievements: [
        'Current CGPA: 8.39',
        'Completed courses on Data Structures, Algorithms, and Operating Systems',
        'Actively participating in AI/ML research projects'
      ]
    },
    {
      degree: 'Pre-University (PCMB)',
      institution: 'Genius PU College',
      location: 'Mysuru, India',
      period: 'Jun 2019 – Mar 2021',
      description: 'Studied Physics, Chemistry, Mathematics, and Biology.',
      achievements: [
        'Scored 82%',
        'Excelled in Mathematics and Computer Science courses',
        'Participated in inter-college science competitions'
      ]
    },
    {
      degree: 'SSLC (State Board)',
      institution: "St. Johan's School",
      location: 'Gundlupet, India',
      period: 'Mar 2019',
      description: 'Completed secondary education with a strong foundation in science and mathematics.',
      achievements: [
        'Scored 84%',
        'Top performer in Mathematics and Science subjects',
        'Represented school in science exhibitions'
      ]
    }
  ];

  return (
    <section id="education" className="py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-blue-600 pb-2">Education</h2>
      
      <div className="space-y-12">
        {education.map((edu, index) => (
          <div key={index} className="relative pl-8 border-l-2 border-gray-200">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600"></div>
            <div className="mb-2">
              <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 mb-1">
                <span className="font-medium text-blue-600">{edu.institution}</span>
                <span className="hidden sm:block mx-2">•</span>
                <span>{edu.location}</span>
              </div>
              <p className="text-gray-500 italic">{edu.period}</p>
            </div>
            <p className="text-gray-600 mt-2">{edu.description}</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mt-3">
              {edu.achievements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
