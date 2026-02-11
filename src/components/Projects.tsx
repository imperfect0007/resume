import { Github, ExternalLink, Folder } from 'lucide-react';
import carShowroomImage from '/src/assets/car.jpg';
import rnn from '/src/assets/rnn.png';
import covid from '/src/assets/covid.avif';
import nlp from '/src/assets/nlp.avif';

const Projects = () => {
  const projects = [
    {
      title: 'Missing Person Alert',
      description:
        'A web app that helps families and communities quickly share and track missing person alerts with real-time updates and centralized information.',
      technologies: ['React.js', 'Node.js', 'MongoDB'],
      image: carShowroomImage,
      github: 'https://github.com/imperfect0007/',
      live: '#',
    },
    {
      title: 'Text Classification using RNN',
      description:
        'Developed a text classification model using Recurrent Neural Networks for sentiment and topic classification. Published in IJERT (May 2025).',
      technologies: ['Python', 'TensorFlow', 'Deep Learning', 'RNN'],
      image: rnn,
      github: 'https://github.com/imperfect0007/',
      live: '#',
    },
    {
      title: 'Covid-Bed Management System',
      description:
        'DBMS mini project using MySQL to streamline hospital bed allocation and resource tracking with a focus on efficient data handling and real-time updates.',
      technologies: ['MySQL', 'DBMS', 'Java'],
      image: covid,
      github: 'https://github.com/imperfect0007/',
      live: '#',
    },
    {
      title: 'Place Name Recognition using NLP',
      description:
        'Built a system to extract and categorize geographic locations from text using NLP techniques and machine learning.',
      technologies: ['Python', 'NLP', 'Machine Learning'],
      image: nlp,
      github: 'https://github.com/imperfect0007/',
      live: '#',
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-28">
      <h2 className="text-3xl md:text-4xl font-bold text-white section-heading mb-4">
        Projects
      </h2>
      <p className="text-slate-400 mb-14 max-w-2xl">
        A selection of projects showcasing cloud, automation, and software engineering skills
        across DevOps, backend systems, and applied AI/ML.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group card-glow rounded-2xl overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Floating icon */}
              <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-xl glass">
                <Folder size={16} className="text-blue-400" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-7">
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                {project.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-3">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/15"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <Github size={16} />
                  <span>Code</span>
                </a>
                {project.live !== '#' && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>Live</span>
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
