document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('boton-movil');
    const pantallaInicial = document.getElementById('pantalla-inicial');
    const pantallaFinal = document.getElementById('pantalla-final');
    
    let intentos = 0;
    const maxIntentos = 3; // <-- ¡ESTE ES EL CAMBIO! La sorpresa se activa al tercer intento.

    const moverBoton = () => {
        const viewWidth = window.innerWidth;
        const viewHeight = window.innerHeight;
        const btnWidth = boton.clientWidth;
        const btnHeight = boton.clientHeight;

        const nuevaPosX = Math.max(0, Math.random() * (viewWidth - btnWidth));
        const nuevaPosY = Math.max(0, Math.random() * (viewHeight - btnHeight));

        boton.style.left = `${nuevaPosX}px`;
        boton.style.top = `${nuevaPosY}px`;
    };

    const activarEfectos = () => {
        boton.style.pointerEvents = 'none';
        boton.classList.add('luces');
        
        setTimeout(() => {
            pantallaInicial.style.transform = 'scale(5)';
            pantallaInicial.style.opacity = '0';
            
            setTimeout(() => {
                pantallaFinal.classList.add('visible');
            }, 700);
        }, 1500);
    };

    // Mueve el botón al pasar el mouse por encima
    boton.addEventListener('mouseenter', () => {
        // Se moverá en el intento 0 y 1 (los dos primeros)
        if (intentos < maxIntentos - 1) {
            intentos++;
            moverBoton();
        }
    });

    // El clic final activa la animación
    boton.addEventListener('click', () => {
        intentos++;
        // Se activará cuando los intentos lleguen a 3
        if (intentos >= maxIntentos) {
            activarEfectos();
        }
    });
});
