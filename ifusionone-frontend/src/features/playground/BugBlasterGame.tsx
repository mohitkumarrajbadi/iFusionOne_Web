import React, { useRef, useEffect, useState } from "react";
import "./BugBlasterGame.css";

const asteroidEmoji = "💥";
const errorLabels = ["SyntaxError", "TypeError", "ReferenceError", "Bug!"];

// const CANVAS_WIDTH = Math.floor(window.innerWidth * 0.8);
// const CANVAS_HEIGHT = Math.floor(window.innerHeight * 0.8);

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

  const ship = useRef({ x: 0, y: 0, width: 40, height: 40 });
  const bullets = useRef<Bullet[]>([]);
  const asteroids = useRef<Asteroid[]>([]);
  const explosionEffects = useRef<ExplosionEffect[]>([]);

  const shipImageRef = useRef<HTMLImageElement | null>(null);
  const explosionImgRef = useRef<HTMLImageElement | null>(null);

  const moveDirection = useRef<number>(0);
  // const moveSpeed = 1;


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

    const speedInterval = setInterval(() => {
      speedRef.current = Math.min(speedRef.current + 0.01, 2);
    }, 50);

    return () => clearInterval(speedInterval);
  }, [isStarted, gameOver]);

  useEffect(() => {
    if (!isStarted || gameOver) return;
    const asteroidInterval = setInterval(() => {
      asteroids.current.push({
        x: getRandomInt(20, canvasSize.width - 60),
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

    const STAR_COUNT = 120;
    // Move stars array to a ref so it's persistent
    const starsRef = useRef<{ x: number; y: number; size: number; alpha: number }[]>([]);
    if (starsRef.current.length !== STAR_COUNT || starsRef.current.some(star => star.x > canvasSize.width || star.y > canvasSize.height)) {
      starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * canvasSize.width,
        y: Math.random() * canvasSize.height,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.5,
      }));
    }

    const drawStars = () => {
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
      starsRef.current.forEach(star => {
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
      ctx.fillText(`High: ${highScore}`, canvasSize.width - 200, 30);
    };

    const drawShip = () => {
      const { x, y, width, height } = ship.current;
      if (shipImageRef.current) {
        // Draw ship from left edge, not center
        ctx.drawImage(
          shipImageRef.current,
          x, // left edge
          y - height / 2,
          width,
          height
        );
      } else {
        ctx.fillStyle = "#0ff";
        ctx.fillRect(
          x,
          y - height / 2,
          width,
          height
        );
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

    // Keyboard ship movement speed (pixels per frame)
    const SHIP_MOVE_SPEED = 1;

    const update = () => {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
      drawStars();

      // Move the ship based on keyboard input
      if (moveDirection.current !== 0) {
        ship.current.x += moveDirection.current * SHIP_MOVE_SPEED;
        // Clamp so ship stays fully visible
        ship.current.x = Math.max(
          0,
          Math.min(canvasSize.width - ship.current.width, ship.current.x)
        );
      }

      // Move and filter bullets
      bullets.current = bullets.current
        .map((b) => ({ ...b, y: b.y - 10 }))
        .filter((b) => b.y > 0);

      // Move asteroids
      asteroids.current.forEach((a) => {
        a.y += speedRef.current;
      });

      // Handle bullet-asteroid collisions
      for (let bi = bullets.current.length - 1; bi >= 0; bi--) {
        const b = bullets.current[bi];
        for (let ai = asteroids.current.length - 1; ai >= 0; ai--) {
          const a = asteroids.current[ai];
          if (isColliding(b, a)) {
            explosionEffects.current.push({ x: a.x, y: a.y });
            bullets.current.splice(bi, 1);
            asteroids.current.splice(ai, 1);
            scoreRef.current++;
            setDisplayScore(scoreRef.current);
            if (scoreRef.current > highScore) {
              setHighScore(scoreRef.current);
              localStorage.setItem("bugBlasterHighScore", scoreRef.current.toString());
            }
            break; // bullet removed, skip further collision checks
          }
        }
      }

      // Handle asteroid-ship collisions or bug escape
      for (const a of asteroids.current) {
        if (isColliding(a, getShipBounds())) {
          endGame();
          return;
        }

        if (
          a.label === "Bug!" &&
          a.y > ship.current.y + ship.current.height / 2
        ) {
          endGame();
          return;
        }
      }

      drawShip();
      drawBullets();
      drawAsteroids();
      drawExplosions();
      drawHUD();

      if (!gameOver) requestAnimationFrame(update);
    };

    // Utility: rectangle collision
    function isColliding(
      rectA: { x: number; y: number; width: number; height: number },
      rectB: { x: number; y: number; width: number; height: number }
    ) {
      return (
        rectA.x < rectB.x + rectB.width &&
        rectA.x + rectA.width > rectB.x &&
        rectA.y < rectB.y + rectB.height &&
        rectA.y + rectA.height > rectB.y
      );
    }

    // Utility: returns ship's bounding box
    function getShipBounds() {
      return {
        x: ship.current.x - ship.current.width / 2,
        y: ship.current.y - ship.current.height / 2,
        width: ship.current.width,
        height: ship.current.height,
      };
    }

    // Utility: handle game end
    function endGame() {
      setGameOver(true);
      setIsStarted(false);
    }


    update();

    // Mouse movement: center ship on mouse X, keep within bounds
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      let mouseX = e.clientX - rect.left;
      // Clamp so ship stays fully visible
      mouseX = Math.max(
        0,
        Math.min(canvasSize.width - ship.current.width, mouseX)
      );
      ship.current.x = mouseX;
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
  }, [isStarted, gameOver, highScore, canvasSize]);

  // Move update outside useEffect so it can be called from startGame
  const update = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Redefine STAR_COUNT and stars for each update
    // const STAR_COUNT = 120;
    // const stars: { x: number; y: number; size: number; alpha: number }[] = Array.from({ length: STAR_COUNT }, () => ({
    //   x: Math.random() * canvasSize.width,
    //   y: Math.random() * canvasSize.height,
    //   size: Math.random() * 1.5 + 0.5,
    //   alpha: Math.random() * 0.5 + 0.5,
    // }));

    // const drawStars = () => {
    //   ctx.fillStyle = "#111";
    //   ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
    //   stars.forEach(star => {
    //     ctx.save();
    //     ctx.globalAlpha = star.alpha;
    //     ctx.fillStyle = "#fff";
    //     ctx.beginPath();
    //     ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    //     ctx.fill();
    //     ctx.restore();
    //   });
    // };

    const drawHUD = () => {
      ctx.fillStyle = "#fff";
      ctx.font = "18px 'Press Start 2P', monospace";
      ctx.fillText(`Score: ${scoreRef.current}`, 100, 30);
      ctx.fillText(`High: ${highScore}`, canvasSize.width - 200, 30);
    };

    const drawShip = () => {
      const { x, y, width, height } = ship.current;
      if (shipImageRef.current) {
        // Draw ship from left edge, not center
        ctx.drawImage(
          shipImageRef.current,
          x, // left edge
          y - height / 2,
          width,
          height
        );
      } else {
        ctx.fillStyle = "#0ff";
        ctx.fillRect(
          x,
          y - height / 2,
          width,
          height
        );
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

    // Keyboard ship movement speed (pixels per frame)
    const SHIP_MOVE_SPEED = 1;

    // Move the ship based on keyboard input
    if (moveDirection.current !== 0) {
      ship.current.x += moveDirection.current * SHIP_MOVE_SPEED;
      // Clamp so ship stays fully visible
      ship.current.x = Math.max(
        0,
        Math.min(canvasSize.width - ship.current.width, ship.current.x)
      );
    }

    // Move and filter bullets
    bullets.current = bullets.current
      .map((b) => ({ ...b, y: b.y - 10 }))
      .filter((b) => b.y > 0);

    // Move asteroids
    asteroids.current.forEach((a) => {
      a.y += speedRef.current;
    });

    // Handle bullet-asteroid collisions
    for (let bi = bullets.current.length - 1; bi >= 0; bi--) {
      const b = bullets.current[bi];
      for (let ai = asteroids.current.length - 1; ai >= 0; ai--) {
        const a = asteroids.current[ai];
        if (
          b.x < a.x + a.width &&
          b.x + b.width > a.x &&
          b.y < a.y + a.height &&
          b.y + b.height > a.y
        ) {
          explosionEffects.current.push({ x: a.x, y: a.y });
          bullets.current.splice(bi, 1);
          asteroids.current.splice(ai, 1);
          scoreRef.current++;
          setDisplayScore(scoreRef.current);
          if (scoreRef.current > highScore) {
            setHighScore(scoreRef.current);
            localStorage.setItem("bugBlasterHighScore", scoreRef.current.toString());
          }
          break; // bullet removed, skip further collision checks
        }
      }
    }

    // Handle asteroid-ship collisions or bug escape
    for (const a of asteroids.current) {
      // Ship bounds (left edge)
      const shipBounds = {
        x: ship.current.x,
        y: ship.current.y - ship.current.height / 2,
        width: ship.current.width,
        height: ship.current.height,
      };
      if (
        a.x < shipBounds.x + shipBounds.width &&
        a.x + a.width > shipBounds.x &&
        a.y < shipBounds.y + shipBounds.height &&
        a.y + a.height > shipBounds.y
      ) {
        setGameOver(true);
        setIsStarted(false);
        return;
      }

      if (
        a.label === "Bug!" &&
        a.y > ship.current.y + ship.current.height / 2
      ) {
        setGameOver(true);
        setIsStarted(false);
        return;
      }
    }

    drawShip();
    drawBullets();
    drawAsteroids();
    drawExplosions();
    drawHUD();

    if (!gameOver) requestAnimationFrame(update);
  };

  function startGame() {
    scoreRef.current = 0;
    setDisplayScore(0);
    setGameOver(false);
    setIsStarted(true);

    // Reset game state
    bullets.current = [];
    asteroids.current = [];
    explosionEffects.current = [];

    ship.current.x = (canvasSize.width - ship.current.width) / 2;
    ship.current.y = canvasSize.height - 60;

    requestAnimationFrame(update); // start the loop
  }


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
        <button className="start-button" onClick={startGame}>
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