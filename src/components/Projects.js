import React from 'react';
import './Projects.css';
import { useNavigate } from 'react-router-dom';
import { projects } from '../App';
function Projects() {
  const navigate = useNavigate();
  const handleProjectClick = (id) => {
    navigate(`/projects/${id}`);
  };

  return (
    <section className="projects-section">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div 
            className="project-card" 
            key={project.id}
            onClick={project.intro ? () => handleProjectClick(project.id) : undefined}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-stack">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="project-links">
              {project.repo ? (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                  Repo
                </a>
              ) : (
                <span></span>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                  Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;