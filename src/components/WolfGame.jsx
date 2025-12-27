import { useState, useEffect, useRef, useCallback } from 'react';

export default function WolfGame({ onClose }) {
    const [gameStarted, setGameStarted] = useState(false);
    const [isJumping, setIsJumping] = useState(false);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [highScore, setHighScore] = useState(() => {
        const saved = localStorage.getItem('wolfGameHighScore');
        return saved ? parseInt(saved, 10) : 0;
    });

    const canvasRef = useRef(null);
    const animationFrameRef = useRef(null);
    const wolfImageRef = useRef(null);
    const gameStateRef = useRef({
        wolfY: 0,
        wolfVelocity: 0,
        obstacles: [],
        stars: [],
        particles: [],
        backgroundX: 0,
        score: 0,
        gameSpeed: 6,
        obstacleSpawnTimer: 0,
        obstacleSpawnInterval: 90,
    });

    // Constants
    const GRAVITY = 0.8;
    const JUMP_STRENGTH = -15;
    const WOLF_SIZE = 55;
    const GROUND_HEIGHT = 60;
    const OBSTACLE_WIDTH = 35;

    // Load wolf image
    useEffect(() => {
        const img = new Image();
        img.src = '/images/loading_logo.png';
        wolfImageRef.current = img;
    }, []);

    // Save high score
    useEffect(() => {
        if (highScore > 0) {
            localStorage.setItem('wolfGameHighScore', highScore.toString());
        }
    }, [highScore]);

    // Initialize stars
    const initStars = (width, height) => {
        const stars = [];
        for (let i = 0; i < 50; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.5 + 0.2,
                brightness: Math.random(),
            });
        }
        return stars;
    };

    // Start game
    const startGame = useCallback(() => {
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
        setIsJumping(false);
        const canvas = canvasRef.current;
        gameStateRef.current = {
            wolfY: 0,
            wolfVelocity: 0,
            obstacles: [],
            stars: canvas ? initStars(canvas.width, canvas.height) : [],
            particles: [],
            backgroundX: 0,
            score: 0,
            gameSpeed: 6,
            obstacleSpawnTimer: 0,
            obstacleSpawnInterval: 90,
        };
    }, []);

    // Jump handler
    const jump = useCallback(() => {
        const state = gameStateRef.current;
        if (state.wolfY === 0 && gameStarted && !gameOver) {
            state.wolfVelocity = JUMP_STRENGTH;
            setIsJumping(true);

            // Add jump particles
            for (let i = 0; i < 5; i++) {
                state.particles.push({
                    x: 80 + WOLF_SIZE / 2,
                    y: canvasRef.current.height - GROUND_HEIGHT - WOLF_SIZE,
                    vx: (Math.random() - 0.5) * 3,
                    vy: Math.random() * 2 + 1,
                    life: 30,
                    color: `hsl(${180 + Math.random() * 60}, 100%, 60%)`,
                });
            }
        }
    }, [gameStarted, gameOver]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                if (!gameStarted) {
                    startGame();
                } else {
                    jump();
                }
            }
            if (e.code === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameStarted, startGame, jump, onClose]);

    // Game loop
    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const state = gameStateRef.current;

        const gameLoop = () => {
            const { width, height } = canvas;

            // Clear with gradient background
            const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
            bgGradient.addColorStop(0, '#0a0520');
            bgGradient.addColorStop(0.5, '#1a0a3a');
            bgGradient.addColorStop(1, '#000000');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, width, height);

            // Draw and update stars
            state.stars.forEach(star => {
                star.x -= star.speed;
                if (star.x < 0) star.x = width;

                star.brightness = (Math.sin(Date.now() * 0.001 + star.x) + 1) / 2;
                ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * 0.8})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw animated cyber grid
            state.backgroundX -= state.gameSpeed * 0.6;
            if (state.backgroundX <= -40) state.backgroundX = 0;

            ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
            ctx.lineWidth = 1;

            for (let x = state.backgroundX; x < width; x += 40) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }

            // Draw ground with multiple layers
            const groundY = height - GROUND_HEIGHT;

            // Ground glow
            const groundGradient = ctx.createLinearGradient(0, groundY - 20, 0, groundY);
            groundGradient.addColorStop(0, 'rgba(0, 240, 255, 0)');
            groundGradient.addColorStop(1, 'rgba(0, 240, 255, 0.3)');
            ctx.fillStyle = groundGradient;
            ctx.fillRect(0, groundY - 20, width, 20);

            // Main ground line
            ctx.strokeStyle = '#00F0FF';
            ctx.lineWidth = 3;
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#00F0FF';
            ctx.beginPath();
            ctx.moveTo(0, groundY);
            ctx.lineTo(width, groundY);
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Update and draw particles
            state.particles = state.particles.filter(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.2;
                p.life--;

                if (p.life > 0) {
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.life / 30;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                    return true;
                }
                return false;
            });

            // Update wolf physics
            state.wolfVelocity += GRAVITY;
            state.wolfY -= state.wolfVelocity;

            if (state.wolfY <= 0) {
                state.wolfY = 0;
                state.wolfVelocity = 0;
                setIsJumping(false);
            }

            // Draw wolf with glow
            const wolfX = 80;
            const wolfYPos = groundY - WOLF_SIZE - state.wolfY;

            ctx.shadowBlur = 20;
            ctx.shadowColor = '#00F0FF';

            if (wolfImageRef.current?.complete) {
                ctx.drawImage(wolfImageRef.current, wolfX, wolfYPos, WOLF_SIZE, WOLF_SIZE);
            } else {
                ctx.fillStyle = '#00F0FF';
                ctx.fillRect(wolfX, wolfYPos, WOLF_SIZE, WOLF_SIZE);
            }
            ctx.shadowBlur = 0;

            // Spawn obstacles
            state.obstacleSpawnTimer++;
            if (state.obstacleSpawnTimer >= state.obstacleSpawnInterval) {
                const rand = Math.random();
                let obstacleType;

                if (rand < 0.25) obstacleType = 'short';
                else if (rand < 0.5) obstacleType = 'tall';
                else if (rand < 0.75) obstacleType = 'double';
                else obstacleType = 'flying';

                state.obstacles.push({
                    x: width,
                    type: obstacleType,
                    hue: Math.random() * 60 + 300, // Purple to pink range
                });
                state.obstacleSpawnTimer = 0;

                if (state.obstacleSpawnInterval > 50) {
                    state.obstacleSpawnInterval -= 0.3;
                }
            }

            // Draw obstacles with fancy effects
            state.obstacles = state.obstacles.filter(obstacle => {
                obstacle.x -= state.gameSpeed;

                if (obstacle.x > -OBSTACLE_WIDTH * 2) {
                    const drawFancyObstacle = (x, y, w, h, isFlying = false) => {
                        // Pulsing glow effect
                        const pulse = (Math.sin(Date.now() * 0.005) + 1) / 2;

                        // Gradient
                        const gradient = ctx.createLinearGradient(x, y, x, y + h);
                        if (isFlying) {
                            gradient.addColorStop(0, `hsl(${obstacle.hue}, 100%, 70%)`);
                            gradient.addColorStop(0.5, `hsl(${obstacle.hue}, 100%, 50%)`);
                            gradient.addColorStop(1, `hsl(${obstacle.hue}, 100%, 30%)`);
                        } else {
                            gradient.addColorStop(0, `hsl(${obstacle.hue}, 80%, 60%)`);
                            gradient.addColorStop(1, `hsl(${obstacle.hue}, 80%, 40%)`);
                        }

                        // Outer glow
                        ctx.shadowBlur = 20 + pulse * 10;
                        ctx.shadowColor = `hsl(${obstacle.hue}, 100%, 50%)`;

                        // Main shape
                        ctx.fillStyle = gradient;
                        ctx.fillRect(x, y, w, h);

                        // Inner highlight
                        ctx.fillStyle = `hsla(${obstacle.hue}, 100%, 80%, 0.3)`;
                        ctx.fillRect(x + 3, y + 3, w - 6, h * 0.3);

                        ctx.shadowBlur = 0;
                    };

                    const checkCollision = (wx, wy, ws, ox, oy, ow, oh) => {
                        const padding = 8;
                        if (
                            wx + padding < ox + ow &&
                            wx + ws - padding > ox &&
                            wy + padding < oy + oh &&
                            wy + ws - padding > oy
                        ) {
                            setGameOver(true);
                            if (state.score > highScore) {
                                setHighScore(state.score);
                            }

                            // Explosion particles
                            for (let i = 0; i < 20; i++) {
                                state.particles.push({
                                    x: wolfX + WOLF_SIZE / 2,
                                    y: wolfYPos + WOLF_SIZE / 2,
                                    vx: (Math.random() - 0.5) * 8,
                                    vy: (Math.random() - 0.5) * 8,
                                    life: 60,
                                    color: `hsl(${Math.random() * 360}, 100%, 60%)`,
                                });
                            }
                        }
                    };

                    // Draw based on type
                    if (obstacle.type === 'short') {
                        drawFancyObstacle(obstacle.x, groundY - 40, OBSTACLE_WIDTH, 40);
                        checkCollision(wolfX, wolfYPos, WOLF_SIZE, obstacle.x, groundY - 40, OBSTACLE_WIDTH, 40);
                    }
                    else if (obstacle.type === 'tall') {
                        drawFancyObstacle(obstacle.x, groundY - 70, OBSTACLE_WIDTH, 70);
                        checkCollision(wolfX, wolfYPos, WOLF_SIZE, obstacle.x, groundY - 70, OBSTACLE_WIDTH, 70);
                    }
                    else if (obstacle.type === 'double') {
                        drawFancyObstacle(obstacle.x, groundY - 50, OBSTACLE_WIDTH, 50);
                        drawFancyObstacle(obstacle.x + 60, groundY - 60, OBSTACLE_WIDTH, 60);
                        checkCollision(wolfX, wolfYPos, WOLF_SIZE, obstacle.x, groundY - 50, OBSTACLE_WIDTH, 50);
                        checkCollision(wolfX, wolfYPos, WOLF_SIZE, obstacle.x + 60, groundY - 60, OBSTACLE_WIDTH, 60);
                    }
                    else if (obstacle.type === 'flying') {
                        const flyY = groundY - 120;
                        drawFancyObstacle(obstacle.x, flyY, OBSTACLE_WIDTH, 35, true);
                        checkCollision(wolfX, wolfYPos, WOLF_SIZE, obstacle.x, flyY, OBSTACLE_WIDTH, 35);
                    }

                    return true;
                }
                return false;
            });

            // Update score
            state.score++;
            setScore(state.score);

            if (state.score % 600 === 0 && state.gameSpeed < 12) {
                state.gameSpeed += 0.5;
            }

            animationFrameRef.current = requestAnimationFrame(gameLoop);
        };

        animationFrameRef.current = requestAnimationFrame(gameLoop);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [gameStarted, gameOver, highScore]);

    return (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl font-bold z-20 transition-colors"
            >
                ✕
            </button>

            <div className="relative w-full max-w-4xl h-80 bg-black border-2 border-cyan-500/40 rounded-lg overflow-hidden shadow-2xl"
                style={{ boxShadow: '0 0 30px rgba(0, 240, 255, 0.3)' }}>
                {/* Score */}
                <div className="absolute top-4 left-4 z-10">
                    <div className="text-cyan-400 font-mono text-sm">PUAN</div>
                    <div className="text-white font-bold text-2xl" style={{ textShadow: '0 0 10px #00F0FF' }}>
                        {Math.floor(score / 10)}
                    </div>
                </div>
                <div className="absolute top-4 right-4 z-10 text-right">
                    <div className="text-purple-400 font-mono text-sm">EN YÜKSEK</div>
                    <div className="text-white font-bold text-xl" style={{ textShadow: '0 0 10px #ff00ff' }}>
                        {Math.floor(highScore / 10)}
                    </div>
                </div>

                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    width={1024}
                    height={320}
                    className="w-full h-full"
                />

                {/* Start/Game Over Overlay */}
                {(!gameStarted || gameOver) && (
                    <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-purple-900/90 flex flex-col items-center justify-center z-10 backdrop-blur-sm">
                        {gameOver && (
                            <>
                                <h2 className="text-white text-6xl font-bold mb-3 animate-pulse"
                                    style={{ textShadow: '0 0 30px #ff0000, 0 0 60px #ff0000' }}>
                                    OYUN BİTTİ
                                </h2>
                                <div className="bg-cyan-500/20 px-6 py-3 rounded-lg mb-3 border border-cyan-500/50">
                                    <p className="text-cyan-400 text-3xl font-bold">
                                        {Math.floor(score / 10)} PUAN
                                    </p>
                                </div>
                                {score > highScore && (
                                    <p className="text-yellow-300 text-xl mb-4 animate-bounce font-bold"
                                        style={{ textShadow: '0 0 20px #ffff00' }}>
                                        🏆 YENİ REKOR! 🏆
                                    </p>
                                )}
                            </>
                        )}
                        {!gameStarted && (
                            <>
                                <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
                                    style={{ textShadow: '0 0 40px rgba(0, 240, 255, 0.5)' }}>
                                    KURT KOŞUSU
                                </h2>
                                <p className="text-white/90 mb-2 text-lg">
                                    Zıplamak için <span className="text-cyan-400 font-bold px-2 py-1 bg-cyan-400/20 rounded">SPACE</span> veya <span className="text-cyan-400 font-bold px-2 py-1 bg-cyan-400/20 rounded">↑</span>
                                </p>
                                <p className="text-white/60 text-sm mb-6">Engellerden kaç ve en yüksek puanı al! 🐺</p>
                            </>
                        )}
                        <button
                            onClick={startGame}
                            className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xl rounded-lg hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-110"
                            style={{ boxShadow: '0 0 30px rgba(0, 240, 255, 0.6)' }}
                        >
                            {gameOver ? '🔄 TEKRAR OYNA' : '🎮 BAŞLA'}
                        </button>
                        <p className="text-white/40 text-sm mt-6">ESC ile çık</p>
                    </div>
                )}
            </div>
        </div>
    );
}
