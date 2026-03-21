import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import profileImage from '../assets/profile.png';

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'C#', 'Python', 'Java', 'Swift', 'C/C++'],
  },
  {
    name: 'Frontend',
    skills: ['React', 'SwiftUI', 'React Native'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', '.NET', 'FastAPI', 'REST APIs'],
  },
  {
    name: 'Cloud & DevOps',
    skills: ['GCP', 'Microsoft Azure', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions'],
  },
  {
    name: 'Data',
    skills: ['SQL', 'MongoDB', 'PostgreSQL'],
  },
];

const About: React.FC = () => {
  return (
    <>
      {/* ── Hero ── */}
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <p className="hero-greeting">Hi, I'm</p>
            <h1 className="hero-name">Masa Yasumoto</h1>
            <p className="hero-subtitle">
              Software Developer&nbsp;&nbsp;·&nbsp;&nbsp;DevOps Engineer&nbsp;&nbsp;·&nbsp;&nbsp;Violinist
            </p>
            <div className="hero-ctas">
              <Link to="/projects" className="btn btn-primary">View Projects</Link>
              <Link to="/contact" className="btn btn-secondary">Contact Me</Link>
            </div>
          </div>

          <div className="hero-photo">
            <img src={profileImage} alt="Masa Yasumoto" />
          </div>
        </div>
      </div>

      {/* ── Bio + Skills ── */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-bio">
            <p>
              I'm a software developer at MEDITECH, where I build the tooling and infrastructure
              that ships healthcare REST APIs to production. My day-to-day spans CI/CD pipeline
              optimization on GCP and Jenkins, release automation, security vulnerability remediation,
              and full-stack development with TypeScript, Node.js, and C#.
            </p>
            <p>
              I like working at interesting intersections. I built a real-time score-following app
              that uses Hidden Markov Models to turn sheet music pages as you play, an iOS launcher
              that fights phone addiction with a countdown gate before restricted apps open, and an
              IoT medication reminder that integrates with Alexa and AWS. Whether it's cloud
              infrastructure, audio signal processing, or SwiftUI — I enjoy figuring out what's possible.
            </p>
            <p>
              I'm also a classically trained violinist who has performed across the U.S., Japan, and
              Ecuador — which is probably what led me to build a smart page-turner as a side project.
              Outside of code and music, I enjoy crocheting amigurumi and cooking Japanese food.
            </p>
          </div>

          {/* ── Skills ── */}
          <div className="skills-section">
            <h3>Skills</h3>
            <div className="skills-grid">
              {skillCategories.map(category => (
                <div key={category.name} className="skill-category">
                  <h4>{category.name}</h4>
                  <div className="skill-tags">
                    {category.skills.map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
