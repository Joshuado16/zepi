document.addEventListener("DOMContentLoaded", () => {
            
    // ==========================================
    // 1. 3D TYPEWRITER (Matches Index Energy)
    // ==========================================
    const container = document.getElementById('animated-3d-text');
    if (container) {
        const textToAnimate = "Unlocking human potential";
        const chars = textToAnimate.split('');
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            if (char === ' ') span.innerHTML = '&nbsp;';
            else span.textContent = char;
            
            span.className = 'letter-3d';
            span.style.animationDelay = `${index * 0.12}s`; 
            container.appendChild(span);
        });
    }

    // ==========================================
    // 2. 6-SLOT FUTURISTIC 3D CAROUSEL LOGIC
    // ==========================================
    // This grabs the image divs directly from your HTML!
    const cards = Array.from(document.querySelectorAll('.carousel-card'));
    let currentIndex = 0;

    if (cards.length > 0) {
        function updateCarousel() {
            cards.forEach((card, index) => {
                // Remove all positioning classes first
                card.classList.remove('card-active', 'card-next-1', 'card-next-2', 'card-prev-1', 'card-prev-2', 'card-hidden');

                // Calculate where this card should be relative to the active card
                let diff = (index - currentIndex + cards.length) % cards.length;

                // Assign the correct 6-slot 3D position
                if (diff === 0) {
                    card.classList.add('card-active');       // Center
                } else if (diff === 1) {
                    card.classList.add('card-next-1');       // Right 1
                } else if (diff === 2) {
                    card.classList.add('card-next-2');       // Right 2
                } else if (diff === cards.length - 1) {
                    card.classList.add('card-prev-1');       // Left 1
                } else if (diff === cards.length - 2) {
                    card.classList.add('card-prev-2');       // Left 2
                } else {
                    card.classList.add('card-hidden');       // Way back/Hidden
                }
            });
        }

        // Run immediately to set initial positions
        updateCarousel();

        // Rotate the carousel every 3 seconds automatically
        setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        }, 3000);
    }

    // ==========================================
    // 3. THREE.JS BACKGROUND ANIMATION 
    // ==========================================
    const bgContainer = document.getElementById('webgl-container');
    if (!bgContainer) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    bgContainer.appendChild(renderer.domElement);

    const particleCount = 8000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color('#B490FF'); 
    const color2 = new THREE.Color('#60A5FA'); 
    const color3 = new THREE.Color('#ffffff'); 

    for (let i = 0; i < particleCount * 3; i += 3) {
        const radius = Math.random() * 2.5; 
        const angle = Math.random() * Math.PI * 2;
        
        positions[i] = Math.cos(angle) * radius;    
        positions[i+1] = (Math.random() - 0.5) * 40; 
        positions[i+2] = Math.sin(angle) * radius;  
        
        const mixedColor = color1.clone();
        if (radius < 0.5) mixedColor.lerp(color3, 0.8);
        else if (radius > 1.5) mixedColor.lerp(color2, 0.6);
        
        colors[i] = mixedColor.r; colors[i+1] = mixedColor.g; colors[i+2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
    const particles = new THREE.Points(geometry, material);
    particles.position.x = 4.5; 
    scene.add(particles);

    camera.position.z = 10;
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        particles.rotation.y = elapsedTime * 0.1;
        particles.rotation.z = Math.sin(elapsedTime * 0.2) * 0.05;
        particles.scale.x = 1 + Math.sin(elapsedTime * 1) * 0.1;
        particles.scale.z = 1 + Math.sin(elapsedTime * 1) * 0.1;
        renderer.render(scene, camera);
    }
    animate();
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});