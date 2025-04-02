import React from 'react';
import './Projects.css';

function Projects({ setSelectedProject }) {
  const projects = [
    {
      id: 1,
      title: "Smart Medicine Box 💊",
      description: "Smart medication bottle with built-in sensors that detects when it’s opened and sends users text or email notifications. It is also connected with Alexa for voice-based queries.",
      technologies: ["ESP8266", "AWS Lambda", "DynamoDB", "Alexa Skills", "IoT"],
      repo: "",
      demo: "",
      fullDescription: "This project helps users maintain their medication schedule by detecting when the bottle is opened and sending alerts. It also integrates with Alexa to allow users to ask if they've taken their medication.",
      intro: [
        "I struggle with remembering to take my pill every day.",
        "I also struggle with remembering if I have taken my pill for the day or not, resulting in double dosing or not taking the pill at all.",
        "I decided to use my software development skills and learn new hardware skills like soldering, circuit design, and IoT."
      ],
      techStack: [
        "ESP8266 NodeMCU board",
        "CR123A battery",
        "AWS: Lambda, API Gateway, DynamoDB",
        "Alexa Skills Development",
        "PlatformIO for VSCode",
        "Reed Switch",
        "10k Pull-up Resistor"
      ],
      sections: [
        {
          title: "Design",
          bullets: [
          "Default state is deep sleep for power saving.",
          "Connecting RST and GPIO16 (D0) allows the board to reset when the RST pin is pulled from HIGH to LOW.",
          "The reed switch triggers the reset operation upon disconnection.",
          "Once reset, the setup function runs, sends a message to the server ESP8266, and immediately returns to deep sleep.",
          "The system only runs once or twice a day to conserve power."
          ]
        },
        {
          title: "First Prototype - One ESP8266",
          bullets: [
            "Breadboard prototyping with one ESP8266 responsible for detecting the reed switch connection/disconnection and connecting to Wi-Fi, sending email/text notifications.",
            "Works fine but not practical because it takes 10-20 seconds for the whole operation. The user could have already taken the pill before it's completed, and it can interrupt the operation.",
            "It’s also power-consuming if the system is battery-powered, especially with the Wi-Fi connection and email sending process."
          ],      
        },
        {
          title: "Second Prototype - Two ESP8266s",
          bullets: [
          "Breadboard prototype with two ESP8266s.",
          "One ESP8266 is attached to the bottle as a client, responsible only for reed switch detection and sending a message to the server ESP8266.",
          "The other ESP8266 is connected to power via USB, acting as a server to receive the message from the client, connect to Wi-Fi, and send the notification.",
          "This version is more ideal for power saving, as the client ESP8266 doesn't need to be connected to Wi-Fi or handle notifications directly."
          ],
        },
        {
          title: "Alexa Integration", 
          bullets: [
          "Alexa Integration",
          "Created a DynamoDB table to store timestamps of medication bottle openings.",
          "The server ESP8266 sends a REST API POST request to an AWS API Gateway, triggering a Lambda function that updates the database.",
          "Developed an Alexa skill that allows users to ask ‘Have I taken my medication today?’ Alexa queries the database and provides a response based on the stored timestamps."
          ],
        },
        {
          title: "Third Prototype - Perfboard with CR123A", 
          bullets: ["The final version involved assembling all components on a perfboard with a CR123A battery.", 
              "The hardest part was soldering, which required practice. ", 
              "The client ESP8266 sends an ESP-NOW message to the server ESP8266, but battery life remains a concern."],
          }
      ],
      videoDemo: "", // Add link if available
      github: "", // Add link if available
      detail: true,
    },
    {
      id: 2,
      title: "Book Recommender with LLM 📚",
      description: "Book Recommendation systems utilizing OpenAI and HugginFace models, sentiment analysis, and vector search to categorize and suggest books, featuring an interactive Gradio UI for an enhanced user experience.",
      technologies: ["Python", "Gradio", "pandas", "OpenAI", "Hugging Face"],
      repo: "https://huggingface.co/spaces/peterhernandez24/Book-Recommender/tree/main",
      demo: "https://huggingface.co/spaces/peterhernandez24/Book-Recommender",
      detail: false,
    },
    {
      id: 3,
      title: "Moosa 🐾",
      description: "React Native video-sharing app for pet lovers, inspired by my cat Moose, allowing users to upload, like, and explore pet videos with secure authentication and cloud storage via Appwrite. 🐾📱",
      technologies: ["React Native", "JavaScript", "Expo", "Appwrite"],
      repo: "https://github.com/myasumoto16/Moosa",
      demo: "",
      detail: false,
    },
    {
      id: 4,
      title: "Moose or Lola? 🐈",
      description: "Image classification system that determines if the given picture is our beloved ragdoll Moose or his identical-looking friend Lola!",
      technologies: ["Python", "fast.ai", "pandas", "Gradio"],
      repo: "https://huggingface.co/spaces/peterhernandez24/moose-or-lola/tree/main",
      demo: "https://huggingface.co/spaces/peterhernandez24/moose-or-lola",
      detail: false,
    },
    {
      id: 5,
      title: "Open Source D.A.S.T 🔐",
      description: "Web App that automates web application security assessments, integrates open-source security tools, and manages user authentication and past assessment data via a REST API and MongoDB.",
      technologies: ["JavaScript", "NodeJS", "MongoDB", "Shell Script"],
      repo: "",
      demo: "https://youtu.be/JYaOncpckV8",
      detail: false,
    }, 
    {
      id: 6,
      title: "MBTA Transit",
      description: "Android app that provides real-time updates on Massachusetts transit services by aggregating data from MBTA's REST APIs, enhancing accessibility and user experience through object-oriented programming.",
      technologies: ["Java", "Android SDK"],
      repo: "",
      demo: "",
      detail: false,
    }
  ];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleExternalLink = (e, url) => {
    if (!url) return;
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="projects-section">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div 
              className="project-card" 
              key={project.id}
              onClick={project.detail ? () => handleProjectClick(project) : null}
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
                <button 
                  className="project-link-btn"
                  onClick={(e) => handleExternalLink(e, project.repo)}
                >
                  Repo
                </button>
              ) : (
                <span>Coming Soon</span>
              )}
              {project.demo ? (
                <button 
                  className="project-link-btn"
                  onClick={(e) => handleExternalLink(e, project.demo)}
                >
                  Demo
                </button>
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
