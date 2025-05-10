import { useEffect } from 'react';
import '../styles/Error.css';

const Error = () => {
  useEffect(() => {
    const container = document.querySelector('.stars-container');
    if (!container) return;

    // Clear existing stars (for hot reload)
    container.innerHTML = '';

    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(star);
    }
  }, []);

  return (
    <div className="error-page">
      <div className="stars-container"></div>
      <img className="error-image" src="/fuso-lost.png" alt="Homeless Astronaut" />
      <h1 className="error-title">Oops... I'm lost in space 🥲</h1>
      <p className="error-description">This page flew off somewhere. Can you help me get home?</p>
      <button className="error-button" onClick={() => window.location.href = '/'}>🚀 Take Me Home</button>
    </div>
  );
};

export default Error;
