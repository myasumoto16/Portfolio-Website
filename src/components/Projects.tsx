import React from 'react';
import './Projects.css';
import { useNavigate } from 'react-router-dom';
import { projects } from '../App';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const navigate = useNavigate();
  const { ref, visible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`project-card animate-on-scroll${visible ? ' visible' : ''}`}
      onClick={project.intro ? () => navigate(`/projects/${project.id}`) : undefined}
    >
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tech-stack">
        {project.technologies.map((tech, index) => (
          <span key={index} className="tech-tag">{tech}</span>
        ))}
      </div>
      <div className="project-links">
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-btn"
            onClick={e => e.stopPropagation()}
          >
            Repo
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-btn"
            onClick={e => e.stopPropagation()}
          >
            Demo
          </a>
        )}
      </div>
    </div>
  );
}

const Projects: React.FC = () => {
  return (
    <section className="projects-section">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
