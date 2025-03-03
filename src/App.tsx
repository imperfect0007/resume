
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">© {new Date().getFullYear()} REVANTH KUMAR S. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="https://github.com/imperfect0007" className="hover:text-blue-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://in.linkedin.com/in/revanth-kumar-s-a43672218" className="hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:revanthkumars64@gmail.com" className="hover:text-blue-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;