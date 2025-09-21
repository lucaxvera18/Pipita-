document.addEventListener('DOMContentLoaded', () => {
    const mainButton = document.getElementById('mainButton');
    const initialScreen = document.getElementById('initial-screen');
    const finalScreen = document.getElementById('final-screen');
    const colorLightsContainer = document.getElementById('color-lights');

    let clickCount = 0;
    const maxClicks = 3;

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function createLightParticle(x, y) {
        const light = document.createElement('div');
        light.classList.add('light-particle');
        const size = Math.random() * 30 + 10;
        light.style.width = `${size}px`;
        light.style.height = `${size}px`;
        light.style.backgroundColor = getRandomColor();
        light.style.left = `${x - size / 2}px`;
        light.style.top = `${y - size / 2}px`;
        colorLightsContainer.appendChild(light);
        light.addEventListener('animationend', () => light.remove());
    }

    function moveButton() {
        const buttonRect = mainButton.getBoundingClientRect();
        const maxX = window.innerWidth - buttonRect.width;
        const maxY = window.innerHeight - buttonRect.height;
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        mainButton.style.top = `${newY}px`;
        mainButton.style.left = `${newX}px`;
    }

    mainButton.addEventListener('mouseenter', () => {
        if (clickCount < maxClicks) {
            moveButton();
        }
    });

    mainButton.addEventListener('click', () => {
        clickCount++;
        if (clickCount > maxClicks) {
            mainButton.style.display = 'none';
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            let lightCount = 0;
            const lightInterval = setInterval(() => {
                createLightParticle(centerX, centerY);
                if (++lightCount > 50) {
                    clearInterval(lightInterval);
                    setTimeout(showFinalScreen, 800);
                }
            }, 50);
        } else {
             moveButton();
        }
    });

    function showFinalScreen() {
        initialScreen.style.display = 'none';
        finalScreen.classList.remove('hidden');
        setTimeout(() => finalScreen.classList.add('active'), 50);
    }
    
    // Mover el botón una vez al cargar para que no aparezca siempre en el centro
    setTimeout(moveButton, 100); 
});
