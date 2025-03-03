import { Github, ExternalLink } from 'lucide-react';
import carShowroomImage from '/src/assets/car.jpg'; // Import your offline image
import rnn from '/src/assets/rnn.png';
import covid from '/src/assets/covid.avif';
import nlp from '/src/assets/nlp.avif';
const Projects = () => {
  const projects = [
    {
      title: 'Covid-Bed Management System',
      description: 'A database management system to streamline hospital bed allocation and resource tracking during the pandemic.',
      technologies: ['MySQL', 'DBMS', 'Java'],
      image: covid,
      github: 'https://github.com/imperfect0007/',
      live: '#'
    },
    {
      title: 'Place Name Recognition using NLP',
      description: 'A Natural Language Processing (NLP) project to extract and categorize geographic locations from text.',
      technologies: ['Python', 'NLP', 'Machine Learning'],
      image: nlp,
      github: 'https://github.com/imperfect0007/',
      live: '#'
    },
    {
      title: 'Car Showroom Website',
      description: 'A responsive website showcasing different car models with user-friendly navigation and design.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      image: carShowroomImage, // Use offline image from assets
      github: 'https://github.com/imperfect0007/',
      live: '#'
    },
    {
      title: 'Text Classification using RNN',
      description: 'Implemented a Recurrent Neural Network (RNN) model for text classification tasks such as sentiment analysis and topic detection.',
      technologies: ['Python', 'TensorFlow', 'Deep Learning', 'RNN'],
      image: rnn,
      github: 'https://github.com/imperfect0007/',
      live: '#'
    }
  ];

  return (
    <section id="projects" className="py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-blue-600 pb-2">Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a 
                  href={project.github} 
                  className="text-gray-700 hover:text-blue-600 flex items-center transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={18} className="mr-1" />
                  <span>Code</span>
                </a>
                {project.live !== '#' && (
                  <a 
                    href={project.live} 
                    className="text-gray-700 hover:text-blue-600 flex items-center transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={18} className="mr-1" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
