import React from 'react';
import './About.css';
import profileImage from '../assets/profile.png'; // Ensure the correct path to your image

function About() {
  return (
    <section className="about-section">
      <div className="about-content">
        <h2>About Me</h2>
        <div className="profile-container">
            <div className="profile-image" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 0 }}>
                <img src={profileImage} alt="Profile" className="profile-pic" style={{ width: '300px', height: '300px', borderRadius: '50%'}} />
            </div>
          <div className="profile-text">
          <p>Hello! I'm a software developer with experience in full-stack development using C#, .NET, Azure, and other modern technologies.</p>  
            <p>I've worked on diverse projects, from electromyography (DSP) platforms to test automation tools, always striving to expand my expertise and stay ahead of emerging technologies.</p>  
            <p>I'm particularly passionate about working with microprocessors and deepening my knowledge of both software and hardware to create innovative solutions!</p>            
          <div className="skills">
              <h3>Skills</h3>
              <ul>
                <li>C#</li>
                <li>.NET</li>
                <li>Microsoft Azure</li>
                <li>Java</li>
                <li>C/C++</li>
                <li>Python</li>
                <li>SQL</li>
                <li>REST API</li>
                <li>React</li>
                <li>MongoDB</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
