import React from 'react';
import './Experience.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string[];
}

function TimelineItem({ exp }: { exp: ExperienceItem }) {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`timeline-item animate-on-scroll${visible ? ' visible' : ''}`}
    >
      <div className="timeline-content">
        <h3>{exp.position}</h3>
        <h4>{exp.company}</h4>
        <p className="duration">{exp.duration}</p>
        <ul className="experience-bullets">
          {exp.description.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      id: 0,
      company: 'MEDITECH',
      position: 'Software Developer',
      duration: '2025 - Present',
      description: [
        'Reduced CI pipeline build time from 70–90 min to 45–55 min by parallelizing Jest, Docker builds, and GKE deployments across Jenkins and Google Cloud Build.',
        'Cut dev deployment downtime from ~30 min to ~5 min by redesigning artifact delivery via GCP Artifact Storage.',
        'Upgraded Knex database client (v0.20.15 → v3.1.0) across 100+ usage sites; resolved TypeScript, BigInt, and MSSQL driver breaking changes with a compatibility layer.',
        'Automated JIRA issue labeling during CI releases, eliminating 200+ manual updates per stable release.',
        'Remediated jose/jwks-rsa security vulnerability; upgraded jose 2.0.7 → 6.1.0 after CVE false-positive analysis.',
        'Owned the full release lifecycle for 12+ releases across dev, RC, and stable environments.',
      ],
    },
    {
      id: 1,
      company: 'Brigham and Women\'s Hospital',
      position: 'Full Stack Developer / Data Analyst I',
      duration: '2025 - Present',
      description: [
        'Develop full-stack web applications using C# and ASP.NET Core for secure data collection and EHR integration.',
        'Collaborate with clinicians and researchers to improve UI/UX and design scalable databases for clinical tools.',
        'Implement automated data processing pipelines to improve data integrity and streamline research workflows.',
      ],
    },
    {
      id: 2,
      company: 'Wentworth Institute of Technology',
      position: 'Research and Teaching Assistant',
      duration: '2024 - May 2025',
      description: [
        'Collaborated on research projects by reviewing conference papers, journals, and drafting literature reviews.',
        'Developed and enhanced lecture materials on cybersecurity and digital forensics topics.',
        'Organized training videos and materials on digital forensics topics ensuring clarity for educational purposes.',
      ],
    },
    {
      id: 3,
      company: 'Delsys, Inc',
      position: 'Software Engineer Co-op',
      duration: 'Jan. 2024 - April 2024',
      description: [
        'Enhanced Trigno Discover\'s back-end, enabling real-time physiological data analysis via wireless sensors.',
        'Improved data export features, allowing users to customize and manipulate EMG data.',
        'Achieved 59.7% reduction in execution time during file export by optimizing asynchronous computation.',
        'Implemented high-performance caching system for efficient EMG data storage and visualization.',
        'Implemented with C# and .NET Framework, leveraging digital signal processing expertise.',
      ],
    },
    {
      id: 4,
      company: 'Microsoft / Nuance Communications, Inc',
      position: 'Software Engineering Intern',
      duration: 'May 2023 - July 2023',
      description: [
        'Enhanced testing for Dragon Ambient eXperience to enable secure EHR transcription for medical professionals.',
        'Developed API testing framework to significantly enhance testing efficiency and software reliability.',
        'Designed CI/CD architecture with Azure Pipelines to ensure test reliability and automation.',
        'Ensured data integrity during corporate acquisition via testing framework for database migration.',
        'Implemented with Java, Azure DevOps, and Docker.',
      ],
    },
  ];

  return (
    <section className="experience-section">
      <h2>Work Experience</h2>
      <div className="timeline">
        {experiences.map(exp => (
          <TimelineItem key={exp.id} exp={exp} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
