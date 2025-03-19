import './Music.css';

function Music() {
  // const musicProjects = [
    // {
    //   id: 1,
    //   title: "Debut Album - 'Horizons'",
    //   year: "2023",
    //   description: "My first full-length album featuring 10 original compositions across various genres including indie rock and electronic.",
    //   platforms: ["Spotify", "Apple Music", "YouTube Music"],
    //   image: "/album-cover-placeholder.jpg"
    // },
    // {
    //   id: 2,
    //   title: "EP - 'Midnight Sessions'",
    //   year: "2022",
    //   description: "A 5-track EP exploring ambient sounds and experimental textures.",
    //   platforms: ["Bandcamp", "SoundCloud", "Spotify"],
    //   image: "/ep-cover-placeholder.jpg"
    // },
    // {
    //   id: 3,
    //   title: "Single - 'Urban Echoes'",
    //   year: "2021",
    //   description: "A collaborative single with featured vocals from indie artist Sarah James.",
    //   platforms: ["Spotify", "Apple Music", "Tidal"],
    //   image: "/single-cover-placeholder.jpg"
    // }
  // ];

  const musicVideos = [
    {
      id: 1,
      title: "Mendelssohn Violin Concerto in E minor, I Allegro molto appassionato",
      date: "November 2019",
      description: "Pre-Screen video for grad school auditions.",
      embedUrl: "https://www.youtube.com/embed/Gj6Qfvym1Kw?si=wagoEWlXu_3iZyhl"
    },
    {
      id: 2,
      title: "Brahms Violin Sonata No 2 in A major, Op 100, i Allegro amabile",
      date: "November 2019",
      description: "Pre-Screen video for grad school auditions.",
      embedUrl: "https://www.youtube.com/embed/UZUuVrFZIRw?si=FK96u-_4cUnHg6c0"
    },
    {
      id: 3,
      title: "Mendelssohn Violin Concerto in E minor, II Adagio",
      date: "November 2019",
      description: "Pre-Screen video for grad school auditions.",
      embedUrl: "https://www.youtube.com/embed/RHRxj01L48U?si=qQb2Bo40FlTjV3V-"
    },
    {
      id: 4,
      title: "Trio for Violin, Alto Saxophone and Piano",
      date: "October 2017",
      description: "Original Composition",
      embedUrl: "https://www.youtube.com/embed/3TfORe6N_WI?si=4mkcP4VPxWvWYuEh"
    }
  ];

  return (
    <section className="music-section">
      <h2>Music</h2>
      
      <div className="music-intro">
        <p> Music has been my passion long before I transitioned to computer science. As a violinist and pianist, I've performed solo, in chamber ensembles, and with orchestras across the U.S., Japan, and Ecuador. I also enjoy experimenting with DTM software to create instrumental covers and original compositions. </p>
        <p> In the future, I hope to merge my love for music with my technical expertise to bring creative and innovative projects to life!        </p>
      </div>
      
      {/* <h3 className="music-subsection-title">Discography</h3>
      <div className="music-projects">
        {musicProjects.map(project => (
          <div className="music-project-card" key={project.id}>
            <div className="music-project-image">
              <div className="album-cover-placeholder"></div>
            </div>
            <div className="music-project-info">
              <h4>{project.title}</h4>
              <p className="music-year">{project.year}</p>
              <p className="music-description">{project.description}</p>
              <div className="music-platforms">
                <p><strong>Available on:</strong></p>
                <ul>
                  {project.platforms.map((platform, index) => (
                    <li key={index}>{platform}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      
      <h3 className="music-subsection-title">Performances</h3>
      <div className="music-videos">
        {musicVideos.map(video => (
          <div className="video-container" key={video.id}>
            <div className="video-embed">
              <iframe 
                width="800" 
                height="415" 
                src={video.embedUrl} 
                frameBorder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
                title={video.title}
              ></iframe>
            </div>
            <div className="video-info">
              <h4>{video.title}</h4>
              <p className="video-date">{video.date}</p>
              <p className="video-description">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="music-cta">
        <h3>Interested in collaborating?</h3>
        <p>I'm always open to new musical projects and collaborations. Reach out through the contact form!</p>
        <button className="music-contact-btn" onClick={() => window.location.href = '#contact'}>Get in Touch</button>
      </div>
    </section>
  );
}

export default Music;
