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
        "Acoustics and Bubble Dynamics",
        "Artificial Intelligence",
        "Machine Learning",
        "Data Science",
        "Neural Networks", 
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

function initMagneticCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'magnetic-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #00ffff, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
        box-shadow: 0 0 20px #00ffff;
    `;
    document.body.appendChild(cursor);

    const trail = [];
    const trailLength = 15;

    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const trailDot = document.createElement('div');
        trailDot.style.cssText = `
            position: fixed;
            width: ${15 - i}px;
            height: ${15 - i}px;
            background: rgba(0, 255, 255, ${(trailLength - i) / trailLength * 0.5});
            border-radius: 50%;
            pointer-events: none;
            z-index: ${9998 - i};
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(trailDot);
        trail.push({ element: trailDot, x: 0, y: 0 });
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Magnetic effect for interactive elements
    document.querySelectorAll('.project-card, .nav-link, .ai-button').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.background = 'radial-gradient(circle, #ff00ff, transparent)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.background = 'radial-gradient(circle, #00ffff, transparent)';
        });
    });

    // Animate trail
    function updateTrail() {
        // Update trail positions with smooth interpolation
        trail[0].x += (mouseX - trail[0].x) * 0.3;
        trail[0].y += (mouseY - trail[0].y) * 0.3;

        for (let i = 1; i < trail.length; i++) {
            trail[i].x += (trail[i - 1].x - trail[i].x) * 0.2;
            trail[i].y += (trail[i - 1].y - trail[i].y) * 0.2;
        }

        trail.forEach(dot => {
            dot.element.style.left = dot.x + 'px';
            dot.element.style.top = dot.y + 'px';
        });

        requestAnimationFrame(updateTrail);
    }

    updateTrail();
}

// function initDNAHelix() {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ alpha: true });
    
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 0);
    
//     const helixContainer = document.createElement('div');
//     helixContainer.id = 'dna-helix';
//     helixContainer.style.cssText = `
//         position: fixed;
//         top: 0;
//         right: 0;
//         width: 300px;
//         height: 100vh;
//         z-index: -1;
//         pointer-events: none;
//     `;
//     helixContainer.appendChild(renderer.domElement);
//     document.body.appendChild(helixContainer);

//     // Create DNA helix geometry
//     const helixPoints1 = [];
//     const helixPoints2 = [];
//     const connections = [];

//     for (let i = 0; i < 200; i++) {
//         const t = i * 0.1;
//         const radius = 2;
        
//         // First strand
//         const x1 = Math.cos(t) * radius;
//         const z1 = Math.sin(t) * radius;
//         const y1 = t * 0.5;
//         helixPoints1.push(new THREE.Vector3(x1, y1, z1));
        
//         // Second strand (opposite phase)
//         const x2 = Math.cos(t + Math.PI) * radius;
//         const z2 = Math.sin(t + Math.PI) * radius;
//         const y2 = t * 0.5;
//         helixPoints2.push(new THREE.Vector3(x2, y2, z2));
        
//         // Connection points every 10 steps
//         if (i % 10 === 0) {
//             connections.push([new THREE.Vector3(x1, y1, z1), new THREE.Vector3(x2, y2, z2)]);
//         }
//     }

//     // Create strand materials
//     const strandMaterial1 = new THREE.LineBasicMaterial({ color: 0x00ffff, linewidth: 3 });
//     const strandMaterial2 = new THREE.LineBasicMaterial({ color: 0xff00ff, linewidth: 3 });
//     const connectionMaterial = new THREE.LineBasicMaterial({ color: 0xffff00, linewidth: 2 });

//     // Create strands
//     const strand1Geometry = new THREE.BufferGeometry().setFromPoints(helixPoints1);
//     const strand2Geometry = new THREE.BufferGeometry().setFromPoints(helixPoints2);
    
//     const strand1 = new THREE.Line(strand1Geometry, strandMaterial1);
//     const strand2 = new THREE.Line(strand2Geometry, strandMaterial2);
    
//     scene.add(strand1);
//     scene.add(strand2);

//     // Add connections
//     connections.forEach(connection => {
//         const connectionGeometry = new THREE.BufferGeometry().setFromPoints(connection);
//         const connectionLine = new THREE.Line(connectionGeometry, connectionMaterial);
//         scene.add(connectionLine);
//     });

//     camera.position.set(8, 50, 8);
//     camera.lookAt(0, 50, 0);

//     function animate() {
//         requestAnimationFrame(animate);
        
//         // Rotate the entire helix
//         scene.rotation.y += 0.01;
//         scene.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
        
//         renderer.render(scene, camera);
//     }

//     animate();
// }

function initTextMorphing() {
    // Advanced text splitting and morphing
    const morphingTexts = document.querySelectorAll('.morph-text');
    
    morphingTexts.forEach(text => {
        const splitText = new SplitText(text, { type: "chars" });
        const chars = splitText.chars;

        // Initial state
        gsap.set(chars, {
            opacity: 0,
            y: 100,
            rotationX: -90,
            transformOrigin: "50% 50% -20px"
        });

        // Create timeline for entrance
        const tl = gsap.timeline({ paused: true });
        
        tl.to(chars, {
            duration: 0.8,
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: {
                amount: 0.8,
                from: "random"
            },
            ease: "back.out(1.7)"
        });

        // Trigger animation on scroll
        ScrollTrigger.create({
            trigger: text,
            start: "top 80%",
            onEnter: () => tl.play()
        });

        // Hover effect for individual characters
        chars.forEach(char => {
            char.addEventListener('mouseenter', () => {
                gsap.to(char, {
                    duration: 0.3,
                    scale: 1.2,
                    color: '#ff00ff',
                    textShadow: '0 0 10px #ff00ff',
                    ease: "power2.out"
                });
            });

            char.addEventListener('mouseleave', () => {
                gsap.to(char, {
                    duration: 0.3,
                    scale: 1,
                    color: '#00ffff',
                    textShadow: '0 0 5px #00ffff',
                    ease: "power2.out"
                });
            });
        });
    });
}

// Master animation controller
function initAllAdvancedAnimations() {
    // Initialize in sequence to prevent performance issues
    setTimeout(() => initLiquidParticles(), 100);
    setTimeout(() => initDNAHelix(), 300);
    setTimeout(() => initMagneticCursor(), 500);
    setTimeout(() => initTextMorphing(), 700);
    setTimeout(() => initMorphingShapes(), 900);
    setTimeout(() => initAdvancedConstellation(), 1100);
    
    // Performance monitoring
    let fps = 0;
    let lastTime = performance.now();
    
    function monitorPerformance() {
        const currentTime = performance.now();
        fps = 1000 / (currentTime - lastTime);
        lastTime = currentTime;
        
        // Reduce particle count if FPS drops below 30
        if (fps < 30) {
            console.log('Performance optimization triggered');
            // Implementation would reduce particle counts
        }
        
        requestAnimationFrame(monitorPerformance);
    }
    
    monitorPerformance();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initAllAdvancedAnimations();
});

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
    
    // initAdvancedConstellation();

    // initDNAHelix();

    initAllAdvancedAnimations();

    initMagneticCursor();
    
    // initTextMorphing();

    // initMorphingShapes();

    //initHolographicDistortion();
    
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
