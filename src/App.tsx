import React, { useState, useEffect } from 'react';
import { Menu, X, Github, ExternalLink, Mail, Phone, MapPin, Download, Moon, Sun, ChevronDown, Code, Palette, Server, Smartphone } from 'lucide-react';
import img2 from '../src/img/screencapture-library-management-olive-vercel-app-2025-09-29-10_36_52.png'
import img3 from '../src/img/screencapture-javascript2-pages-dev-project-2025-09-29-10_47_18.png'
import img1 from '../src/img/WhatsApp Image 2025-09-29 at 10.22.17_db3926b5.jpg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Theme toggle functionality
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Smooth scroll functionality
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "Library Management System",
      description: "A full-stack application built with React, Node.js, and MongoDB that manages books, users, and transactions efficiently. It includes features like user authentication, book borrowing/return tracking, payment integration, and an admin dashboard for managing inventory and users. Designed to provide a seamless digital library experience with secure and scalable architecture.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: {img2},
      github: "https://github.com/yugsakari20/library-management",
      demo: "https://library-management-olive.vercel.app/"
    },
    {
      title: "ajio e commerce",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      tech: ["html", "javascript", "css", "bootstrap"],
      image: "../src/img/screencapture-javascript2-pages-dev-project-2025-09-29-10_47_18.png",
      github: "https://github.com/yugsakari20/JAVASCRIPT/tree/master/project",
      demo: "https://javascript2.pages.dev/project/"
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
      tech: ["JavaScript", "API Integration", "Chart.js", "CSS Grid"],
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=500&h=300",
      github: "#",
      demo: "#"
    }
  ];

  const skills = [
    { name: "Frontend Development", icon: Code, items: ["React", "Vue.js", "TypeScript", "Tailwind CSS","bootstrap5","javascript"] },
    { name: "Backend Development", icon: Server, items: ["Node.js", "mongodb",  "REST APIs"] },
    
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Portfolio
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize font-medium transition-colors duration-200 hover:text-blue-600 ${
                    activeSection === item ? 'text-blue-600' : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-colors duration-200 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="px-4 py-2 space-y-2">
              {['home', 'about', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left py-2 px-2 rounded capitalize font-medium transition-colors duration-200 ${
                    activeSection === item ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-orange-600 bg-clip-text text-transparent">
                SAKARIYA YUG
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mb-4 text-gray-600 dark:text-gray-300">
              Full Stack web Developer 
            </p>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-500 dark:text-gray-400">
              I am a passionate Full Stack Web Developer skilled in building dynamic, responsive, and user-friendly web applications.
I work with both frontend and backend technologies to deliver complete end-to-end solutions.
Always eager to learn and adapt, I enjoy solving real-world problems through clean and efficient code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Get In Touch
              </button>
            </div>
            
            <div className="mt-16 animate-bounce">
              <ChevronDown className="w-6 h-6 mx-auto text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">About Me</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            As a fresher, I am excited to learn, grow, and contribute to impactful projects.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="w-full h-96 bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src={img1}
                  alt="Professional headshot"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Hi, I'm Yug Sakariya</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
               I am currently pursuing a Bachelor of Computer Applications (BCA), where I am building a strong foundation in computer science and programming. I am passionate about technology, problem-solving, and continuously learning new skills to grow as a developer.

During my academic journey, I have worked on various projects that have helped me gain hands-on experience in web development, database management, and software development. I enjoy working on real-world applications and always strive to write clean, efficient, and user-friendly code.

I am a motivated individual who values teamwork, innovation, and integrity. I am eager to explore opportunities that allow me to apply my knowledge and contribute meaningfully to the tech industry.
              </p>
             
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
                <Download className="w-4 h-4" />
                Download Resume
              </button>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                <skill.icon className="w-8 h-8 text-blue-600 mb-4" />
                <h4 className="font-semibold mb-3">{skill.name}</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  {skill.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">my Projects</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Here are some of my recent projects that showcase my skills and passion for development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group rounded-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className="relative overflow-hidden">
                  <img
  src={typeof project.image === "string" ? project.image : project.image.img2}
  alt={project.title}
  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
/>

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={project.github}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href={project.demo}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600 dark:text-gray-300">yugsakariya976@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600 dark:text-gray-300">+91 7573018592</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600 dark:text-gray-300">sahaj imperiya, katargam, surat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200`}
                      placeholder="first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200`}
                      placeholder="last name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200`}
                    placeholder="xyz@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 resize-none`}
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-4 sm:px-6 lg:px-8 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
              © 2025 sakariya yug. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="https://github.com/yugsakari20" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors duration-200">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors duration-200">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;