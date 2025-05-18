import React from 'react';
import './Experience.css';

function Experience() {
  const experiences = [
    {
      id: 0,
      company: "MEDITECH",
      position: "Software Developer",
      duration: "2025 - Present",
      description: ""
    },
    {
      id: 1,
      company: "Brigham and Women's Hospital",
      position: "Full Stack Developer / Data Analyst I",
      duration: "2025 - Present",
      description: "Develop full-stack web applications using C#, and AST.NET Core for secure data collection and EHR integration. Collaborate with clinicians and researchers to improve UI/UX and design scalable databases for clinical tools. Implement automated data processing pipelines to improve data integrity and streamline research workflows"
    },
    {
      id: 2,
      company: "Wentworth Institute of Technology",
      position: "Research and Teaching Assistant",
      duration: "2024 - May 2025",
      description: "Collaborate on research projects by reviewing conference papers, journals, and drafting literature reviews. \n Enhance lecture materials by developing lecture materials on cybersecurity and digital forensics topics.\n • Organize training videos and materials on digital forensics topics ensuring clarity for educational purposes"
    },
    {
      id: 3,
      company: "Delsys, Inc",
      position: "Software Engineer Co-op",
      duration: "Jan. 2024 - April 2024",
      description: "Enhanced Trigno Discover’s back-end, enabling real-time physiological data analysis via wireless sensors. Improved data export features, allowing users to customize and manipulate EMG data. Achieved 59.7% reduction in execution time during file export by optimizing asynchronous computation. Implemented high-performance caching system to ensure efficient storage and visualization of EMG data. Leveraged knowledge in digital signal processing, and implemented with C#, and .NET framework"
    },
    {
      id: 4,
      company: "Microsoft / Nuance Communications, Inc",
      position: "Software Engineering Intern",
      duration: "May 2023 - July 2023",
      description: "• Enhanced testing for Dragon Ambient eXperience to enable secure EHR transcription for medical professionals. Developed API testing framework to significantly enhance testing efficiency and software reliability. Designed project architecture to ensure test reliability and automation through CI/CD with Azure Pipelines. Ensured data integrity during corporate acquisition by implementing testing framework for database migration. Leveraged knowledge in cloud computing, and implemented project with Java, Azure DevOps, and Docker"
    }
  ];

  return (
    <section className="experience-section">
      <h2>Work Experience</h2>
      <div className="timeline">
        {experiences.map(exp => (
          <div className="timeline-item" key={exp.id}>
            <div className="timeline-content">
              <h3>{exp.position}</h3>
              <h4>{exp.company}</h4>
              <p className="duration">{exp.duration}</p>
              <p>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Experience;
