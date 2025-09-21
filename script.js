document.addEventListener('DOMContentLoaded', () => {
    const mainButton = document.getElementById('mainButton');
    const initialScreen = document.getElementById('initial-screen');
    const finalScreen = document.getElementById('final-screen');
    const colorLightsContainer = document.getElementById('color-lights');

    let clickCount = 0;
    const maxClicks = 3; // El botón se mueve 3 veces, en el 4º click ocurre la magia

    // Función para generar un color aleatorio vibrante
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Función para crear y animar una partícula de luz
    function createLightParticle(x, y) {
        const light = document.createElement('div');
        light.classList.add('light-particle');
        const size = Math.random() * 30 + 10; // Tamaño aleatorio entre 10 y 40px
        light.style.width = `${size}px`;
        light.style.height = `${size}px`;
        light.style.backgroundColor = getRandomColor();
        light.style.left = `${x - size / 2}px`;
        light.style.top = `${y - size / 2}px`;
        colorLightsContainer.appendChild(light);

        // Remover la luz después de su animación
        light.addEventListener('animationend', () => {
            light.remove();
        });
    }

    // Función para mover el botón a una nueva posición aleatoria
    function moveButton() {
        const buttonWidth = mainButton.offsetWidth;
        const buttonHeight = mainButton.offsetHeight;

        const maxX = window.innerWidth - buttonWidth;
        const maxY = window.innerHeight - buttonHeight;

        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        mainButton.style.transition = 'transform 0.3s ease-out'; // Suave movimiento
        mainButton.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    // Event listener para el botón
    mainButton.addEventListener('click', (event) => {
        clickCount++;

        if (clickCount <= maxClicks) {
            // Generar luces alrededor del botón al clickearlo
            const rect = mainButton.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 5; i++) { // Genera 5 luces por click
                const offsetX = (Math.random() - 0.5) * rect.width;
                const offsetY = (Math.random() - 0.5) * rect.height;
                createLightParticle(centerX + offsetX, centerY + offsetY);
            }

            moveButton(); // Mueve el botón
        } else {
            // Cuarto click: ¡la magia sucede!
            mainButton.style.display = 'none'; // Oculta el botón

            colorLightsContainer.classList.remove('hidden'); // Muestra el contenedor de luces

            // Generar muchas luces de colores en el centro
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            let lightInterval;
            let lightCount = 0;

            lightInterval = setInterval(() => {
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * 100; // Radio alrededor del centro
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                createLightParticle(x, y);
                lightCount++;

                if (lightCount > 50) { // Generar 50 luces en total
                    clearInterval(lightInterval);
                    // Retraso para que las luces se disipen un poco antes del zoom
                    setTimeout(() => {
                        showFinalScreen();
                    }, 800);
                }
            }, 50); // Genera una luz cada 50ms
        }
    });

    // Función para mostrar la pantalla final con zoom
    function showFinalScreen() {
        initialScreen.classList.add('hidden'); // Oculta la pantalla inicial
        finalScreen.classList.remove('hidden'); // Muestra la pantalla final
        // Pequeño retraso para que CSS aplique la transición después de que se muestre el display
        setTimeout(() => {
            finalScreen.classList.add('active');
        }, 50);
    }

    // Resetear el botón si la ventana se redimensiona para evitar que se salga de pantalla
    window.addEventListener('resize', () => {
        if (clickCount <= maxClicks) {
            moveButton(); // Mueve el botón si no se ha activado la pantalla final
        }
    });
});
