// Neural Network Background with Three.js
function initNeuralBackground() {
    const canvas = document.querySelector('#neuralBackground');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Create particles
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 2000;
        positions[i + 1] = (Math.random() - 0.5) * 2000;
        positions[i + 2] = (Math.random() - 0.5) * 2000;
        
        velocities[i] = (Math.random() - 0.5) * 2;
        velocities[i + 1] = (Math.random() - 0.5) * 2;
        velocities[i + 2] = (Math.random() - 0.5) * 2;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    // Create particle material
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x00ffff,
        size: 2,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Create connections between particles
    const connections = new THREE.BufferGeometry();
    const connectionPositions = [];
    const connectionColors = [];

    function updateConnections() {
        connectionPositions.length = 0;
        connectionColors.length = 0;

        const particlePositions = particles.attributes.position.array;
        
        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const dx = particlePositions[i * 3] - particlePositions[j * 3];
                const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
                const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (distance < 150) {
                    connectionPositions.push(
                        particlePositions[i * 3], particlePositions[i * 3 + 1], particlePositions[i * 3 + 2],
                        particlePositions[j * 3], particlePositions[j * 3 + 1], particlePositions[j * 3 + 2]
                    );

                    const alpha = 1 - distance / 150;
                    connectionColors.push(0, 1, 1, alpha, 0, 1, 1, alpha);
                }
            }
        }

        connections.setAttribute('position', new THREE.Float32BufferAttribute(connectionPositions, 3));
        connections.setAttribute('color', new THREE.Float32BufferAttribute(connectionColors, 4));
    }

    const connectionMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.3
    });

    const connectionLines = new THREE.LineSegments(connections, connectionMaterial);
    scene.add(connectionLines);

    camera.position.z = 1000;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        const particlePositions = particles.attributes.position.array;
        const particleVelocities = particles.attributes.velocity.array;

        for (let i = 0; i < particleCount * 3; i += 3) {
            particlePositions[i] += particleVelocities[i];
            particlePositions[i + 1] += particleVelocities[i + 1];
            particlePositions[i + 2] += particleVelocities[i + 2];

            // Boundary checks
            if (particlePositions[i] > 1000 || particlePositions[i] < -1000) particleVelocities[i] *= -1;
            if (particlePositions[i + 1] > 1000 || particlePositions[i + 1] < -1000) particleVelocities[i + 1] *= -1;
            if (particlePositions[i + 2] > 1000 || particlePositions[i + 2] < -1000) particleVelocities[i + 2] *= -1;
        }

        particles.attributes.position.needsUpdate = true;
        
        // Update connections every 5 frames for performance
        if (Math.random() < 0.2) {
            updateConnections();
        }

        particleSystem.rotation.y += 0.001;
        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Typewriter Effect for AI Text
function initTypewriterEffect() {
    const skills = [
        "Machine Learning",
        "Neural Networks", 
        "Quantum Computing",
        "Deep Learning",
        "Computer Vision",
        "Natural Language Processing"
    ];
    
    let currentSkill = 0;
    const aiTextElement = document.querySelector('.ai-text');
    
    if (!aiTextElement) return;

    function typeText() {
        new TypeIt(aiTextElement, {
            strings: skills[currentSkill],
            speed: 100,
            deleteSpeed: 50,
            lifeLike: true,
            cursor: true,
            cursorChar: '_',
            afterComplete: function() {
                setTimeout(() => {
                    currentSkill = (currentSkill + 1) % skills.length;
                    this.empty().go();
                }, 2000);
            }
        }).go();
    }

    typeText();
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
}

// Particle System for Additional Effects
function createFloatingParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(0, 255, 255, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(0, 255, 255, 0.5);
        `;
        container.appendChild(particle);
    }

    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Matrix Rain Effect (Optional)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-rain';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -3;
        pointer-events: none;
        opacity: 0.1;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00FF00';
        ctx.font = fontSize + 'px arial';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 35);
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js neural background
    initNeuralBackground();
    
    // Initialize typewriter effect
    initTypewriterEffect();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Create floating particles
    createFloatingParticles();
    
    // Optional: Create matrix rain effect
    // createMatrixRain();
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Mouse tracking for interactive effects
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Update CSS custom properties for mouse-based effects
    document.documentElement.style.setProperty('--mouse-x', mouseX);
    document.documentElement.style.setProperty('--mouse-y', mouseY);
});
