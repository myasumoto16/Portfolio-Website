import React, { useState, useRef } from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';

function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    console.log(process.env.EMAILJS_SERVICE_ID);

    e.preventDefault();
    setIsLoading(true);

    // EmailJS service
    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        )
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setFormStatus({
          submitted: true,
          error: false,
          message: 'Thank you for your message! I\'ll get back to you soon.'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('Failed to send email:', error.text);
        setFormStatus({
          submitted: true,
          error: true,
          message: 'Oops! Something went wrong. Please try again or contact me directly at yasumotom98@gmail.com'
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="contact-section">
      <h2>Contact Me</h2>
      <div className="contact-container">
        <div className="contact-info">
          <h3>Get In Touch</h3>
          <p>Feel free to reach out to me for any questions or opportunities.</p>
          <div className="contact-details">
            <p><strong>Email:</strong> yasumotom98@gmail.com</p>
            <p><strong>LinkedIn:</strong> linkedin.com/in/myasumoto</p>
            <p><strong>GitHub:</strong> github.com/myasumoto16</p>
          </div>
        </div>
        <div className="contact-form">
          {formStatus.submitted ? (
            <div className={formStatus.error ? "error-message" : "success-message"}>
              <p>{formStatus.message}</p>
            </div>
          ) : (
            <form ref={form} onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="submit-btn" 
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;