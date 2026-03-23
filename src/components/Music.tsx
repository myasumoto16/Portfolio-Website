import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Music.css';

interface MusicVideo {
  id: number;
  title: string;
  date: string;
  description: string;
  embedUrl: string;
}

const Music: React.FC = () => {
  const navigate = useNavigate();

  const musicVideos: MusicVideo[] = [
    {
      id: 1,
      title: 'Mendelssohn Violin Concerto in E minor, I Allegro molto appassionato',
      date: 'November 2019',
      description: 'Pre-Screen video for grad school auditions.',
      embedUrl: 'https://www.youtube.com/embed/Gj6Qfvym1Kw?si=wagoEWlXu_3iZyhl',
    },
    {
      id: 2,
      title: 'Brahms Violin Sonata No 2 in A major, Op 100, i Allegro amabile',
      date: 'November 2019',
      description: 'Pre-Screen video for grad school auditions.',
      embedUrl: 'https://www.youtube.com/embed/UZUuVrFZIRw?si=FK96u-_4cUnHg6c0',
    },
    {
      id: 3,
      title: 'Mendelssohn Violin Concerto in E minor, II Adagio',
      date: 'November 2019',
      description: 'Pre-Screen video for grad school auditions.',
      embedUrl: 'https://www.youtube.com/embed/RHRxj01L48U?si=qQb2Bo40FlTjV3V-',
    },
    {
      id: 4,
      title: 'Trio for Violin, Alto Saxophone and Piano',
      date: 'October 2017',
      description: 'Original Composition',
      embedUrl: 'https://www.youtube.com/embed/3TfORe6N_WI?si=4mkcP4VPxWvWYuEh',
    },
  ];

  return (
    <section className="music-section">
      <h2>Music</h2>

      <div className="music-intro">
        <p>
          Music has been my passion long before I transitioned to computer science. As a violinist and pianist,
          I've performed solo, in chamber ensembles, and with orchestras across the U.S., Japan, and Ecuador.
          I also enjoy experimenting with DTM software to create instrumental covers and original compositions.
        </p>
        <p>
          In the future, I hope to merge my love for music with my technical expertise to bring creative and
          innovative projects to life!
        </p>
      </div>

      <h3 className="music-subsection-title">Performances</h3>
      <div className="music-videos">
        {musicVideos.map(video => (
          <div className="video-container" key={video.id}>
            <div className="video-embed">
              <iframe
                src={video.embedUrl}
                style={{ border: 'none' }}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
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
        <button className="music-contact-btn" onClick={() => navigate('/contact')}>
          Get in Touch
        </button>
      </div>
    </section>
  );
};

export default Music;
