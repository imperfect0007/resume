import React from 'react';
import { MapPin, Mail, Phone, Download } from 'lucide-react';
import img from "/src/assets/img.jpg"; 
import resume from "/src/assets/resume.pdf"; 

const About = () => {
  return (
    <section id="about" className="py-12">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/3">
          <img 
            src={img} 
            alt="REVANTH KUMAR S" 
            className="rounded-full w-48 h-48 object-cover mx-auto shadow-lg"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">REVANTH KUMAR S</h1>
          {/* <h2 className="text-2xl text-blue-600 mb-4">Senior Software Engineer</h2> */}
          <p className="text-gray-600 mb-6">
            A motivated and enthusiastic student seeking opportunities to gain practical experience and contribute to the AI industry,
            while furthering academic studies. Eager to apply classroom knowledge to real-world scenarios and develop professional skills.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <MapPin size={18} className="mr-2" />
              <span>Mysuru, INDIA</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Mail size={18} className="mr-2" />
              <a href="mailto:revanthkumars64@gmail.com" className="hover:text-blue-600 transition-colors">
                revanthkumars64@gmail.com
              </a>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone size={18} className="mr-2" />
              <a href="tel:+918431005243" className="hover:text-blue-600 transition-colors">
                +91 8431005243
              </a>
            </div>
          </div>

          {/* Fix: Wrap the button inside the <a> tag */}
          <a href={resume} download="Revanth_Kumar_Resume.pdf">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center transition-colors">
              <Download size={18} className="mr-2" />
              Download Resume
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
