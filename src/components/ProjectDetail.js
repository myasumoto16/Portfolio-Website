import React from 'react';
import './ProjectDetail.css';

function ProjectDetail({ project, goBack }) {
  if (!project) {
    return (
      <div className="project-detail-container">
        <h2>Project Not Found</h2>
        <button className="back-button" onClick={goBack}>Back to Projects</button>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <button className="back-button" onClick={goBack}>← Back to Projects</button>
      
      <h1>{project.title}</h1>
      
      <div className="project-tech-stack">
        {Array.isArray(project.technologies) && project.technologies.length > 0 ? (
          project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))
        ) : (
          <p>No technologies listed</p>
        )}
      </div>
      
      <div className="project-links">
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="project-link">
            View Repository
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
            View Demo
          </a>
        )}
      </div>
      
      <div className="project-content">
        <section className="project-section">
          <h2>Overview</h2>
          <p>{project.fullDescription}</p>
        </section>

        {/* Iterating through each section dynamically */}
        {project.sections.map((section, index) => {
          return (
            <section key={index} className="project-section">
              <h2>{section.title}</h2>
              {Array.isArray(section.bullets) ? (
                <ul>
                  {section.bullets.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>No bullets listed</p>
              )}

                {section.image && (
                <div className="section-image">
                  <img src={section.image} alt={section.title} />
                </div>
              )}

            </section>
          );
        })}

        
      </div>
    </div>
  );
}

export default ProjectDetail;
