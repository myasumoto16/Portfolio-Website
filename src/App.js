import React, { useState } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Music from './components/Music';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState('about');
  
  return (
    <div className="App">
      <Navbar currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <main>
        {currentSection === 'about' && <About />}
        {currentSection === 'experience' && <Experience />}
        {currentSection === 'projects' && <Projects />}
        {currentSection === 'music' && <Music />}
        {currentSection === 'contact' && <Contact />}
      </main>
      <Footer />
    </div>
  );
}

export default App;