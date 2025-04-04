import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectDetail.css';

function ProjectDetail({ projects }) {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = Array.isArray(projects) ? projects.find((p) => p.id === projectId) : null;

  if (!project) {
    return (
      <div className="project-detail-container">
        <h2>Project Not Found</h2>
        <button className="back-button" onClick={() => navigate(-1)}>Back to Projects</button>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back to Projects</button>
      
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
          <ul>
            <li>{project.fullDescription}</li>
          </ul>
        </section>
        
        {Array.isArray(project.intro) ? (
            <section className="project-section">
                <h2>Introduction</h2>
                <ul>
                {project.intro.map((para, index) => (
                    <li key={index} className="mb-4">{para}</li> 
                ))}
                </ul>    
            </section>
        ) : (<p></p>)}


        console.log("Section images:", section.images);


        {Array.isArray(project.sections) &&
          project.sections.map((section, index) => (
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

            <ul>
              {Array.isArray(section.images) && section.images.length > 0 ? (
                section.images.map((image, imgIndex) => (
                  <li key={imgIndex} className="section-image">
                    <img src={image.url} alt={image.description} />
                    <p>{image.description}</p>
                  </li>
                ))
              ) : (
                <p></p>
              )}
            </ul>
            </section>
          ))}
      </div>
    </div>
  );
}

export default ProjectDetail;
