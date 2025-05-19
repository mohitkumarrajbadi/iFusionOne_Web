import { useState, useEffect } from 'react';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import '../styles/Home.css';


export default function Home() {
  const [clickCount, setClickCount] = useState(0);
  const [launching, setLaunching] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);


  useEffect(() => {
    if (clickCount === 1) setCountdown(10);
  }, [clickCount]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setLaunching(true);
      setTimeout(() => {
        window.location.href = '/fuso-story';
      }, 2000);
    } else {
      const timer = setTimeout(() => setCountdown(c => (c !== null ? c - 1 : null)), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleImageClick = () => {
    if (!launching && countdown === null) {
      setClickCount(prev => prev + 1);
      setTimeout(() => setClickCount(0), 2000);
    }
  };

  return (
    <div className="home-container">
      <div className="launch-wrapper">
        <img
          src="/fuso-superhero-logo.png"
          alt="AstroMo - The Super Astronaut"
          className={`astro-image ${launching ? 'launching' : ''}`}
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        />
        {launching && (
          <>
            <div className="launch-fire" />
            <div className="launch-smoke" />
            <div className="launch-smoke smoke2" />
            <div className="launch-smoke smoke3" />
          </>
        )}
        {countdown !== null && !launching && (
          <div className="countdown-overlay">{countdown}</div>
        )}
      </div>

      <h1 className="home-title">
        The Ultimate Open Source <span className="ifusion-text">Dev</span> Platform 🚀
      </h1>

      <p className="home-subtitle">
        A unified workspace for developers — formatters, editors, converters, playgrounds, and diff tools in one blazing fast UI.
      </p>

      <a
        href="https://github.com/mohitkumarrajbadi/ifusionone_web"
        target="_blank"
        rel="noopener noreferrer"
        className="github-button"
      >
        <FaGithub size={20} style={{ marginRight: '8px' }} />
        Star us on GitHub
      </a>

      <a
        href="https://discord.gg/9Bpsg3Pp"
        target="_blank"
        rel="noopener noreferrer"
        className="discord-button"
      >
        <FaDiscord size={20} style={{ marginRight: '8px' }} />
        Join us on Discord – Let's build & vibe!
      </a>

      <p className="home-note">
        Built by developers, for developers. Join the community and shape the future of productivity.<br />
        💡 100% open-source • ⚙️ Optimized for real-world workflows • 🧪 Constantly evolving
      </p>
    </div>
  );
}
