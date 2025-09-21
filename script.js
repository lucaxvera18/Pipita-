document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('boton-movil');
    const pantallaInicial = document.getElementById('pantalla-inicial');
    const pantallaFinal = document.getElementById('pantalla-final');
    
    let intentos = 0;
    const maxIntentos = 4; // El cuarto intento activa la sorpresa

    const moverBoton = () => {
        const viewWidth = window.innerWidth;
        const viewHeight = window.innerHeight;
        const btnWidth = boton.clientWidth;
        const btnHeight = boton.clientHeight;

        // Calcula una posición aleatoria asegurando que el botón no se salga de la pantalla
        const nuevaPosX = Math.max(0, Math.random() * (viewWidth - btnWidth));
        const nuevaPosY = Math.max(0, Math.random() * (viewHeight - btnHeight));

        boton.style.left = `${nuevaPosX}px`;
        boton.style.top = `${nuevaPosY}px`;
    };

    const activarEfectos = () => {
        // Evita que los eventos se sigan ejecutando
        boton.style.pointerEvents = 'none';
        
        // 1. Añade el efecto de luces
        boton.classList.add('luces');
        
        // 2. Inicia la transición de la pantalla después de un momento
        setTimeout(() => {
            pantallaInicial.style.transform = 'scale(5)';
            pantallaInicial.style.opacity = '0';
            
            // 3. Muestra la pantalla final cuando la primera ha desaparecido
            setTimeout(() => {
                pantallaFinal.classList.add('visible');
            }, 700); // Sincronizado con la transición de la pantalla inicial
        }, 1500); // Tiempo que duran las luces antes del zoom
    };

    // Mueve el botón al pasar el mouse por encima
    boton.addEventListener('mouseenter', () => {
        if (intentos < maxIntentos - 1) {
            intentos++;
            moverBoton();
        }
    });

    // El clic final activa la animación
    boton.addEventListener('click', () => {
        intentos++;
        if (intentos >= maxIntentos) {
            activarEfectos();
        }
    });
});
