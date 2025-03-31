import React, { useState, useEffect, useCallback } from 'react';
import './Craft.css';
import minion1 from '../assets/crafts/minion-1.jpeg';
import minion2 from '../assets/crafts/minion-2.jpeg';
import minion3 from '../assets/crafts/minion-3.jpeg';
import minion4 from '../assets/crafts/minion-4.jpeg';
import minion5 from '../assets/crafts/minion-5.jpeg';
import minion6 from '../assets/crafts/minion-6.jpeg';

import babyRomper0 from '../assets/crafts/baby-romper-0.jpeg';
import babyRomper2 from '../assets/crafts/baby-romper-2.jpeg';

import snoopy1 from '../assets/crafts/snoopy-side.jpeg';
import snoopy2 from '../assets/crafts/snoopy-2.jpeg';
import snoopy3 from '../assets/crafts/snoopy-3.jpeg';
import snoopy4 from '../assets/crafts/snoopy-4.jpeg';
import snoopy5 from '../assets/crafts/snoopy-5.jpeg';
import snoopy6 from '../assets/crafts/snoopy-6.jpeg';

function Craft() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const craftProjects = [
    {
      id: 1,
      title: 'Minion Amigurumi',
      description: 'A small minion (Dave) Amigurumi. This was my first amigurumi project!',
      mainImage: minion1,
      additionalImages: [
        minion4,
        minion6,
        minion3,
        minion2,
        minion5
      ]
    },
    {
      id: 2,
      title: 'Baby Romper',
      description: 'A baby romper that I made for my niece! It was just a little too small for her, but when she turned one, she dressed her teddy bear in it instead!',
      mainImage: babyRomper0,
      additionalImages: [
        babyRomper2
      ]
    },
    {
      id: 3,
      title: 'Snoopy',
      description: 'A big Snoopy Amigurumi that I made for my mom. I made this in about 4 days!',
      mainImage: snoopy1,
      additionalImages: [
        snoopy2,
        snoopy3,
        snoopy4,
        snoopy5,
        snoopy6
      ]
    }
  ];
  
  const openProjectDetails = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0); // Reset to main image when opening a new project
  };
  
  const closeProjectDetails = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (!selectedProject) return;
  
      const allImages = [selectedProject.mainImage, ...selectedProject.additionalImages];
  
      if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
      }
    },
    [selectedProject] 
  );
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject, handleKeyDown]);
  
  // Function to set the thumbnail as the main image
  const setMainImage = (index) => {
    setCurrentImageIndex(index + 1);
  };
  
  return (
    <section className="craft-section">
      <h2>Crochet and Knitting Projects 🧶</h2>
      <p>A collection of my handmade Amigurumi and crochet projects!</p>
      
      <div className="craft-grid">
        {craftProjects.map((project) => (
          <div 
            key={project.id} 
            className="craft-card"
            onClick={() => openProjectDetails(project)}
          >
            <div className="craft-image-container">
              <img 
                src={project.mainImage} 
                alt={project.title} 
                className="craft-image"
              />
            </div>
            <div className="craft-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <button className="view-more-btn">View More</button>
            </div>
          </div>
        ))}
      </div>
      
      {selectedProject && (
        <div className="project-modal-overlay" onClick={closeProjectDetails}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeProjectDetails}>×</button>
            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.description}</p>
            
            <div className="project-gallery">
              <div className="main-project-image-container">
                <div className="main-project-image">
                  {/* Display the current image based on currentImageIndex */}
                  <img 
                    src={currentImageIndex === 0 
                      ? selectedProject.mainImage 
                      : selectedProject.additionalImages[currentImageIndex - 1]} 
                    alt={selectedProject.title} 
                  />
                </div>
              </div>
              <div className="additional-images">
                {selectedProject.additionalImages.map((image, index) => (
                  <img 
                    key={index}
                    src={image}
                    alt={`${selectedProject.title} - view ${index + 1}`}
                    onClick={() => setMainImage(index)}
                    className={currentImageIndex === index + 1 ? 'selected-thumbnail' : ''}
                  />
                ))}
              </div>
            </div>
            <div className="navigation-help">
              <p>Use left/right arrow keys to navigate or click on thumbnails</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Craft;