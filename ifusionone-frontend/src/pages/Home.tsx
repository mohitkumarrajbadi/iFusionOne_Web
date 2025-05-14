import { useState, useEffect } from 'react';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import '../styles/Home.css';

import { CreateMLCEngine, MLCEngine } from "@mlc-ai/web-llm";

export default function Home() {
  const [clickCount, setClickCount] = useState(0);
  const [launching, setLaunching] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [engine, setEngine] = useState<MLCEngine | null>(null);

  const selectedModel = "Llama-3.1-8B-Instruct-q4f32_1-MLC";

  const initEngine = async () => {
    if (engine) return engine;

    const newEngine = await CreateMLCEngine(selectedModel, {
      initProgressCallback: (progress: any) => {
        console.log("Loading progress:", progress);
      },
    });

    setEngine(newEngine);
    return newEngine;
  };

  const getAIResponse = async (query: string): Promise<string> => {
    const llm = await initEngine();

    const messages = [
      { role: "system", content: "You are a helpful AI assistant." },
      { role: "user", content: query },
    ];

    const reply = await llm.chat.completions.create({ messages });
    const content = reply.choices[0].message.content;

    if (!content) throw new Error("Received empty response from LLM.");

    console.log("LLM Reply:", reply.choices[0].message);
    console.log("Token Usage:", reply.usage);

    return content;
  };

  const testWebLLM = async () => {
    try {
      const result = await getAIResponse("Tell me a developer joke");
      alert("AI says: " + result);
    } catch (err) {
      console.error("WebLLM Test Failed:", err);
    }
  };

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

      {/* <button onClick={testWebLLM} className="github-button">
        Test WebLLM in Browser
      </button> */}

      <p className="home-note">
        Built by developers, for developers. Join the community and shape the future of productivity.<br />
        💡 100% open-source • ⚙️ Optimized for real-world workflows • 🧪 Constantly evolving
      </p>
    </div>
  );
}
