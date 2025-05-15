import React, { useRef, useEffect, useState } from "react";
import "./BugBlasterGame.css";

const asteroidEmoji = "💥";
const errorLabels = ["SyntaxError", "TypeError", "ReferenceError", "Bug!"];

const CANVAS_WIDTH = window.innerWidth * 0.8;
const CANVAS_HEIGHT = window.innerHeight * 0.8;

interface Bullet {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Asteroid {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

interface ExplosionEffect {
  x: number;
  y: number;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const BugBlasterGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);
  const [highScore, setHighScore] = useState(() =>
    parseInt(localStorage.getItem("bugBlasterHighScore") || "0")
  );
  const [isStarted, setIsStarted] = useState(false);

  const scoreRef = useRef(0);
  const speedRef = useRef(2);

  const ship = useRef({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 50, width: 40, height: 40 });
  const bullets = useRef<Bullet[]>([]);
  const asteroids = useRef<Asteroid[]>([]);
  const explosionEffects = useRef<ExplosionEffect[]>([]);

  const shipImageRef = useRef<HTMLImageElement | null>(null);
  const explosionImgRef = useRef<HTMLImageElement | null>(null);

  const moveDirection = useRef<number>(0);
  const moveSpeed = 1;


  // Replace your CANVAS_WIDTH and CANVAS_HEIGHT constants and add this state at the top of your component:
  const [canvasSize, setCanvasSize] = useState({
    width: Math.floor(window.innerWidth * 0.8),
    height: Math.floor(window.innerHeight * 0.8),
  });

  // Update canvas size on window resize
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({
        width: Math.floor(window.innerWidth * 0.8),
        height: Math.floor(window.innerHeight * 0.8),
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const shipImg = new Image();
    shipImg.src = "/fuso-superhero-logo.png";
    shipImg.onload = () => (shipImageRef.current = shipImg);

    const explosionImg = new Image();
    explosionImg.src = "/explosion.png";
    explosionImg.onload = () => (explosionImgRef.current = explosionImg);
  }, []);

  useEffect(() => {
    if (!isStarted || gameOver) {
      // Reset speed to initial value when the game starts or ends
      speedRef.current = 2;
      return;
    }
  
    // const updateSpeed = speedRef.current = Math.min(0.1 + Math.floor(scoreRef.current / 50000), 8);
    
    const speedInterval = setInterval(() => {
      speedRef.current = Math.min(speedRef.current + 0.01 , 8);
    }, 50);
  
    return () => clearInterval(speedInterval); 
  }, [isStarted, gameOver]);

  useEffect(() => {
    if (!isStarted || gameOver) return;
    const asteroidInterval = setInterval(() => {
      asteroids.current.push({
        x: getRandomInt(20, CANVAS_WIDTH - 60),
        y: -40,
        width: 60,
        height: 40,
        label: errorLabels[getRandomInt(0, errorLabels.length - 1)],
      });
    }, 900);
    return () => clearInterval(asteroidInterval);
  }, [isStarted, gameOver]);

  useEffect(() => {
    if (!isStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Place this above your BugBlasterGame component
    const STAR_COUNT = 120;
    const stars: { x: number; y: number; size: number; alpha: number }[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * CANVAS_WIDTH,
      y: Math.random() * CANVAS_HEIGHT,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.5,
    }));

    // Inside your useEffect, replace drawStars with:
    const drawStars = () => {
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      stars.forEach(star => {
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    const drawHUD = () => {
      ctx.fillStyle = "#fff";
      ctx.font = "18px 'Press Start 2P', monospace";
      ctx.fillText(`Score: ${scoreRef.current}`, 100, 30);
      ctx.fillText(`High: ${highScore}`, CANVAS_WIDTH - 200, 30);
    };

    const drawShip = () => {
      const { x, y, width, height } = ship.current;
      if (shipImageRef.current) {
        ctx.drawImage(shipImageRef.current, x - width / 2, y - height / 2, width, height);
      } else {
        ctx.fillStyle = "#0ff";
        ctx.fillRect(x - width / 2, y - height / 2, width, height);
      }
    };

    const drawBullets = () => {
      ctx.fillStyle = "#ff0";
      bullets.current.forEach((b) => ctx.fillRect(b.x, b.y, b.width, b.height));
    };

    const drawAsteroids = () => {
      ctx.font = "20px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      asteroids.current.forEach((a) => {
        ctx.fillText(asteroidEmoji, a.x + a.width / 2, a.y + 28);
        ctx.fillStyle = "#f88";
        ctx.fillText(a.label, a.x + a.width / 2, a.y + 50);
      });
    };

    const drawExplosions = () => {
      if (!explosionImgRef.current) return;
      explosionEffects.current.forEach((e) => {
        ctx.drawImage(explosionImgRef.current!, e.x, e.y, 60, 60);
      });
      explosionEffects.current = [];
    };

    const update = () => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      drawStars();


      bullets.current = bullets.current.filter((b) => b.y > 0);
      bullets.current.forEach((b) => (b.y -= 10));

      asteroids.current.forEach((a) => (a.y += speedRef.current));

      bullets.current.forEach((b, bi) => {
        asteroids.current.forEach((a, ai) => {
          if (
            b.x < a.x + a.width &&
            b.x + b.width > a.x &&
            b.y < a.y + a.height &&
            b.y + b.height > a.y
          ) {
            explosionEffects.current.push({ x: a.x, y: a.y });
            asteroids.current.splice(ai, 1);
            bullets.current.splice(bi, 1);
            scoreRef.current++;
            setDisplayScore(scoreRef.current);
            if (scoreRef.current > highScore) {
              setHighScore(scoreRef.current);
              localStorage.setItem("bugBlasterHighScore", scoreRef.current.toString());
            }
          }
        });
      });

      asteroids.current.forEach((a) => {
        // 1. Game over if any asteroid collides with the ship
        const shipLeft = ship.current.x - ship.current.width / 2;
        const shipRight = ship.current.x + ship.current.width / 2;
        const shipTop = ship.current.y - ship.current.height / 2;
        const shipBottom = ship.current.y + ship.current.height / 2;

        const asteroidLeft = a.x;
        const asteroidRight = a.x + a.width;
        const asteroidTop = a.y;
        const asteroidBottom = a.y + a.height;

        const isColliding =
          shipLeft < asteroidRight &&
          shipRight > asteroidLeft &&
          shipTop < asteroidBottom &&
          shipBottom > asteroidTop;

        if (isColliding) {
          setGameOver(true);
          setIsStarted(false);
        }

        // 2. Game over if a "Bug!" asteroid crosses the ship (goes below the ship)
        if (
          a.label === "Bug!" &&
          asteroidTop > ship.current.y + ship.current.height / 2
        ) {
          setGameOver(true);
          setIsStarted(false);
        }
      });

      drawShip();
      drawBullets();
      drawAsteroids();
      drawExplosions();
      drawHUD();

      if (!gameOver) requestAnimationFrame(update);
    };

    update();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      ship.current.x = e.clientX - rect.left;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isStarted) return;
      if (e.code === "Space") {
        bullets.current.push({
          x: ship.current.x - 3,
          y: ship.current.y - 30,
          width: 6,
          height: 12,
        });
      }
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") moveDirection.current = -1;
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") moveDirection.current = 1;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (["arrowleft", "a", "arrowright", "d"].includes(e.key.toLowerCase())) {
        moveDirection.current = 0;
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isStarted, gameOver, highScore]);

  const startGame = () => {
    scoreRef.current = 0;
    setDisplayScore(0);
    setGameOver(false);
    bullets.current = [];
    asteroids.current = [];
    speedRef.current = 2;
    setIsStarted(true);
  };

  return (
    <div className="game-container">
      <h1 className="title">Bug Blaster</h1>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="game-canvas"
        style={{ border: "2px solid #fff", cursor: "none" }}
      />
      {!isStarted && (
        <button className="start-btn" onClick={startGame}>
          {gameOver ? "Restart Game" : "Start Game"}
        </button>
      )}
      <div className="score-panel">
        <p>Score: {displayScore}</p>
        <p>High Score: {highScore}</p>
      </div>
    </div>
  );
};

export default {
  name: 'Game: Bug Blaster',
  route: '/bug-blaster',
  component: BugBlasterGame,
  icon: '🎮',
};