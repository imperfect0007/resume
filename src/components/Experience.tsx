

const Experience = () => {
  const experiences = [
    {
      title: 'C Programming Intern',
      company: 'ATME College of Engineering',
      location: 'Mysuru, India',
      period: 'Nov 2022 - Jan 2023',
      description: [
        'Gained expertise in core programming concepts, including data structures and algorithms.',
        'Worked on system-level programming and code optimization.',
        'Developed small projects to improve problem-solving skills in C programming.'
      ]
    },
    {
      title: 'Agriculture Innovation & Sustainability Intern',
      company: 'Tosko Technologies',
      location: 'Mysuru, India',
      period: 'Dec 2023 - Jan 2024',
      description: [
        'Researched and implemented practical solutions to improve farming efficiency and eco-friendliness.',
        'Collaborated with a team to address real-world agricultural challenges.',
        'Assisted in developing technology-driven solutions for sustainable agriculture.'
      ]
    }
  ];

  return (
    <section id="experience" className="py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-blue-600 pb-2">Internships</h2>
      
      <div className="space-y-12">
        {experiences.map((internship, index) => (
          <div key={index} className="relative pl-8 border-l-2 border-gray-200">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600"></div>
            <div className="mb-2">
              <h3 className="text-xl font-bold text-gray-800">{internship.title}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 mb-1">
                <span className="font-medium text-blue-600">{internship.company}</span>
                <span className="hidden sm:block mx-2">•</span>
                <span>{internship.location}</span>
              </div>
              <p className="text-gray-500 italic">{internship.period}</p>
            </div>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
              {internship.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
