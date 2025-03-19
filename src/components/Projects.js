import React from 'react';
import './Projects.css';

function Projects() {
  const projects = [
    {
      id: 1,
      title: "Smart Medicine Box 💊",
      description: "Medicine box with built-in sensors that alerts users if they have taken their pill for the day!",
      technologies: ["C++", "ESP8266", "IFTTT", "IoT"],
      repo: "",
      demo: ""
    },
    {
      id: 2,
      title: "Book Recommender with LLM 📚",
      description: "Book Recommendation systems utilizing OpenAI and HugginFace models, sentiment analysis, and vector search to categorize and suggest books, featuring an interactive Gradio UI for an enhanced user experience.",
      technologies: ["Python", "Gradio", "pandas", "OpenAI", "Hugging Face"],
      repo: "https://huggingface.co/spaces/peterhernandez24/Book-Recommender/tree/main",
      demo: "https://huggingface.co/spaces/peterhernandez24/Book-Recommender"
    },
    {
      id: 3,
      title: "Moosa 🐾",
      description: "React Native video-sharing app for pet lovers, inspired by my cat Moose, allowing users to upload, like, and explore pet videos with secure authentication and cloud storage via Appwrite. 🐾📱",
      technologies: ["React Native", "JavaScript", "Expo", "Appwrite"],
      repo: "https://github.com/myasumoto16/Moosa",
      demo: ""
    },
    {
      id: 4,
      title: "Moose or Lola? 🐈",
      description: "Image classification system that determines if the given picture is our beloved ragdoll Moose or his identical-looking friend Lola!",
      technologies: ["Python", "fast.ai", "pandas", "Gradio"],
      repo: "https://huggingface.co/spaces/peterhernandez24/moose-or-lola/tree/main",
      demo: "https://huggingface.co/spaces/peterhernandez24/moose-or-lola"
    },
    {
      id: 5,
      title: "Open Source D.A.S.T 🔐",
      description: "Web App that automates web application security assessments, integrates open-source security tools, and manages user authentication and past assessment data via a REST API and MongoDB.",
      technologies: ["JavaScript", "NodeJS", "MongoDB", "Shell Script"],
      repo: "",
      demo: "https://youtu.be/JYaOncpckV8"
    }, 
    {
      id: 6,
      title: "MBTA Transit",
      description: "Android app that provides real-time updates on Massachusetts transit services by aggregating data from MBTA's REST APIs, enhancing accessibility and user experience through object-oriented programming.",
      technologies: ["Java", "Android SDK"],
      repo: "",
      demo: ""
    }, 
  ];

  return (
    <section className="projects-section">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div className="project-card" key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-stack">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="project-links">
            {project.repo ? (
                <a href={project.repo} target="_blank" rel="noopener noreferrer">Repo</a>
                
              ) : (
                    <span>Coming Soon</span>
                  )
            }
              {project.demo ? (
                <a href={project.demo} target="_blank" rel="noopener noreferrer">Demo</a>
                
              ) : (
                <span></span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
