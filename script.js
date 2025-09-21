document.addEventListener('DOMContentLoaded', () => {
    // --- Configuración del juego ---
    const MAX_CLICKS = 3;
    const PARTICLE_COUNT = 70;
    const PARTICLE_GENERATION_SPEED_MS = 30;
    const SPREAD_RADIUS = 180;
    // MEJORA: Paleta de colores para un efecto más estético
    const COLOR_PALETTE = ['#8e44ad', '#3498db', '#e74c3c', '#f1c40f', '#2ecc71', '#ffffff'];

    // --- Selectores del DOM ---
    const mainButton = document.getElementById('mainButton');
    const playAgainButton = document.getElementById('playAgainButton');
    const initialScreen = document.getElementById('initial-screen');
    const finalScreen = document.getElementById('final-screen');
    const colorLightsContainer = document.getElementById('color-lights');

    let clickCount = 0;
    let lastButtonPosition = { x: 0, y: 0 };

    /**
     * Elige un color aleatorio de la paleta definida.
     */
    function getRandomColor() {
        return COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
    }

    /**
     * Crea una partícula de luz con duración y tamaño aleatorios.
     */
    function createLightParticle(x, y) {
        const light = document.createElement('div');
        light.classList.add('light-particle');
        const size = Math.random() * 35 + 10;
        // MEJORA: Duración de animación aleatoria para un efecto más natural
        const duration = Math.random() * 1.5 + 0.8;
        
        light.style.width = `${size}px`;
        light.style.height = `${size}px`;
        light.style.backgroundColor = getRandomColor();
        light.style.left = `${x - size / 2}px`;
        light.style.top = `${y - size / 2}px`;
        light.style.animationDuration = `${duration}s`;
        
        colorLightsContainer.appendChild(light);
        light.addEventListener('animationend', () => light.remove());
    }

    /**
     * Mueve el botón a una posición aleatoria con rotación y escala.
     */
    function moveButton() {
        const buttonRect = mainButton.getBoundingClientRect();
        const maxX = window.innerWidth - buttonRect.width;
        const maxY = window.innerHeight - buttonRect.height;
        
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        // MEJORA: Añade rotación y escala aleatorias para un movimiento más dinámico
        const rotation = (Math.random() - 0.5) * 30; // Rota entre -15 y +15 grados
        
        mainButton.style.transition = 'all 0.3s ease-out';
        mainButton.style.top = `${newY}px`;
        mainButton.style.left = `${newX}px`;
        mainButton.style.transform = `rotate(${rotation}deg)`;
    }

    /**
     * Desencadena la animación final de partículas.
     */
    function triggerFinalAnimation() {
        const buttonRect = mainButton.getBoundingClientRect();
        lastButtonPosition.x = buttonRect.left + buttonRect.width / 2;
        lastButtonPosition.y = buttonRect.top + buttonRect.height / 2;

        let lightCount = 0;
        const lightInterval = setInterval(() => {
            const randomX = lastButtonPosition.x + (Math.random() - 0.5) * SPREAD_RADIUS * 2;
            const randomY = lastButtonPosition.y + (Math.random() - 0.5) * SPREAD_RADIUS * 2;
            createLightParticle(randomX, randomY);
            
            if (++lightCount >= PARTICLE_COUNT) {
                clearInterval(lightInterval);
                setTimeout(showFinalScreen, 800);
            }
        }, PARTICLE_GENERATION_SPEED_MS);
    }
    
    /**
     * Oculta la pantalla inicial y muestra la final con una transición suave.
     */
    function showFinalScreen() {
        initialScreen.classList.remove('active');
        finalScreen.classList.add('active');
    }

    /**
     * MEJORA: Función para reiniciar el juego.
     */
    function resetGame() {
        clickCount = 0;
        finalScreen.classList.remove('active');
        initialScreen.classList.add('active');
        mainButton.style.display = 'block'; // Vuelve a mostrar el botón
        mainButton.style.transform = 'rotate(0deg) scale(1)'; // Resetea la transformación
        setTimeout(moveButton, 500); // Lo mueve a una nueva posición
    }

    // --- Event Listeners ---
    mainButton.addEventListener('mouseenter', () => {
        if (clickCount < MAX_CLICKS) {
            moveButton();
        }
    });

    mainButton.addEventListener('click', () => {
        clickCount++;
        if (clickCount >= MAX_CLICKS) {
            mainButton.style.display = 'none'; // Oculta el botón antes de la animación
            triggerFinalAnimation();
        } else {
            moveButton();
        }
    });

    window.addEventListener('resize', () => {
        if (clickCount < MAX_CLICKS) {
            mainButton.style.transition = 'none';
            moveButton();
        }
    });
    
    playAgainButton.addEventListener('click', resetGame);

    // --- Inicio del juego ---
    initialScreen.classList.add('active');
    setTimeout(moveButton, 500); // Posición inicial aleatoria
});
