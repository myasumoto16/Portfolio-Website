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

import alpaca1 from '../assets/crafts/alpaca1.JPG'
import alpaca2 from '../assets/crafts/alpaca2.JPG'
import alpaca3 from '../assets/crafts/alpaca3.JPG'
import alpaca4 from '../assets/crafts/alpaca4.JPG'
import alpaca5 from '../assets/crafts/alpaca5.JPG'
import alpaca6 from '../assets/crafts/alpaca6.JPG'
import alpaca7 from '../assets/crafts/alpaca7.JPG'
import alpaca8 from '../assets/crafts/alpaca8.JPG'
import alpaca9 from '../assets/crafts/alpaca9.JPG'
import alpaca10 from '../assets/crafts/alpaca10.JPG'

import cooky1 from '../assets/crafts/Cooky1.JPG'
import cooky2 from '../assets/crafts/cooky2.JPG'
import cooky3 from '../assets/crafts/cooky3.JPG'
import cooky4 from '../assets/crafts/cooky4.JPG'

import duck1 from '../assets/crafts/duck1.JPG'
import duck2 from '../assets/crafts/duck2.JPG'
import duck3 from '../assets/crafts/duck3.JPG'
import duck4 from '../assets/crafts/duck4.JPG'
import duck5 from '../assets/crafts/duck5.JPG'

import fox1 from '../assets/crafts/fox1.JPG'
import fox2 from '../assets/crafts/fox2.JPG'

import koya1 from '../assets/crafts/koya1.JPG'
import koya2 from '../assets/crafts/koya2.JPG'
import koya3 from '../assets/crafts/koya3.JPG'
import koya4 from '../assets/crafts/koya4.JPG'
import koya5 from '../assets/crafts/koya5.JPG'
import koya6 from '../assets/crafts/koya6.JPG'
import koya7 from '../assets/crafts/koya7.JPG'
import koya8 from '../assets/crafts/koya8.JPG'
import koya9 from '../assets/crafts/koya9.JPG'
import koya10 from '../assets/crafts/koya10.JPG'

import lola1 from '../assets/crafts/lola1.JPG'
import lola2 from '../assets/crafts/lola2.JPG'
import lola3 from '../assets/crafts/lola3.JPG'
import lola4 from '../assets/crafts/lola4.JPG'
import lola5 from '../assets/crafts/lola5.JPG'
import lola6 from '../assets/crafts/lola6.JPG'

import sheep1 from '../assets/crafts/sheep1.JPG'
import sheep2 from '../assets/crafts/sheep2.JPG'
import sheep3 from '../assets/crafts/sheep3.JPG'
import sheep4 from '../assets/crafts/sheep4.JPG'
import sheep5 from '../assets/crafts/sheep5.JPG'

import totoro1 from '../assets/crafts/totoro1.JPG'
import totoro2 from '../assets/crafts/totoro2.JPG'
import totoro3 from '../assets/crafts/totoro3.JPG'
import totoro4 from '../assets/crafts/totoro4.JPG'
import totoro5 from '../assets/crafts/totoro5.JPG'
import totoro6 from '../assets/crafts/totoro6.JPG'
import totoro7 from '../assets/crafts/totoro7.JPG'

import vinny1 from '../assets/crafts/vinny1.JPG'
import vinny2 from '../assets/crafts/vinny2.JPG'
import vinny3 from '../assets/crafts/vinny3.JPG'
import vinny4 from '../assets/crafts/vinny4.JPG'
import vinny5 from '../assets/crafts/vinny5.JPG'

function Craft() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const craftProjects = [
    {
      id: 1,
      title: 'Minion',
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
      title: 'Koya',
      description: 'A big Koya (BT21) Amigirumi. I made this for my wife\'s birthday!!',
      mainImage: koya1,
      additionalImages: [
        koya2,
        koya3,
        koya4,
        koya5,
        koya6,
        koya7,
        koya8,
        koya9,
        koya10,
      ]
    },
    {
      id: 3,
      title: 'Baby Romper',
      description: 'A baby romper that I made for my niece! It was just a little too small for her, but when she turned one, she dressed her teddy bear in it instead!',
      mainImage: babyRomper0,
      additionalImages: [
        babyRomper2
      ]
    },
    {
      id: 4,
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
    },
    {
      id: 5,
      title: 'Vinny',
      description: 'A cute Amigirumi of a beautiful black cat, Vinny!',
      mainImage: vinny1,
      additionalImages: [
        vinny2,
        vinny3,
        vinny4,
        vinny5,
      ]
    },
    {
      id: 6,
      title: 'Lola',
      description: 'A cute Amigirumi of a beautiful ragdoll cat, Lola!',
      mainImage: lola1,
      additionalImages: [
        lola2,
        lola3,
        lola4,
        lola5,
        lola6,
      ]
    },
    {
      id: 7,
      title: 'Cooky',
      description: 'A small Cooky (BT21) Amigirumi of a BT21 character! I made this one with the Koya Amigurumi',
      mainImage: cooky1,
      additionalImages: [
        cooky2,
        cooky3,
        cooky4,
      ]
    },
    {
      id: 8,
      title: 'Totoro',
      description: 'A small Totoro Amigurumi! I plan to make the big, medium and small versions of Totoro soon!',
      mainImage: totoro1,
      additionalImages: [
        totoro2,
        totoro3,
        totoro4,
        totoro5,
        totoro6,
        totoro7,
      ]
    },
    {
      id: 9,
      title: 'Sheep',
      description: 'A cute sheep Amigurumi! I learned how to do the popcorn stitch. Not the most fun stitch but it turned out cute!',
      mainImage: sheep1,
      additionalImages: [
        sheep2,
        sheep3,
        sheep4,
        sheep5,
      ]
    },
    {
      id: 10,
      title: 'Fox',
      description: 'A cute fox Amigurumi! I added the acorns!',
      mainImage: fox1,
      additionalImages: [
        fox2,
      ]
    },
    {
      id: 11,
      title: 'Alpaca',
      description: 'A cute aplaca Amigirumi. I don\'t know how this one turned out so ripped!',
      mainImage: alpaca1,
      additionalImages: [
        alpaca2,
        alpaca3,
        alpaca4,
        alpaca5,
        alpaca6,
        alpaca7,
        alpaca8,
        alpaca9,
        alpaca10,
      ]
    },
    {
      id: 12,
      title: 'Duck',
      description: 'A cute small duck Amigurumi! This one was easy but one of the cutest Amigurumi',
      mainImage: duck1,
      additionalImages: [
        duck2,
        duck3,
        duck4,
        duck5,
      ]
    },
  ];
  
  const openProjectDetails = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
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