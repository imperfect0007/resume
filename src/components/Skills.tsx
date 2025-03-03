

const Skills = () => {
  const skillCategories = [
    {
      category: 'Programming Languages',
      skills: ['C/C++', 'R', 'Golang', 'Java', 'JavaScript', 'Python', 'PHP', 'HTML', 'CSS']
    },
    {
      category: 'Frontend',
      skills: ['React.js', 'AngularJS', 'Dart', 'Flutter']
    },
    {
      category: 'Backend & Databases',
      skills: ['Node.js', 'Flask', 'MySQL', 'MongoDB']
    },
    {
      category: 'Development Tools',
      skills: ['VS Code', 'Android Studio', 'Anaconda', 'Postman', 'Jupyter Notebook']
    },
    {
      category: 'Operating Systems',
      skills: ['Windows', 'Linux']
    },
    {
      category: 'Other Skills',
      skills: ['Microsoft Office', 'Data Structures and Algorithms (DSA)', 'Data Science', 'Operating Systems (OS)']
    }
  ];

  return (
    <section id="skills" className="py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-blue-600 pb-2">Skills</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{category.category}</h3>
            <ul className="list-disc list-inside text-gray-600">
              {category.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
