document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('boton-movil');
    const pantallaInicial = document.getElementById('pantalla-inicial');
    const pantallaFinal = document.getElementById('pantalla-final');
    const contenidoFinal = document.querySelector('.contenido-final');
    
    let intentos = 0;
    const maxIntentos = 4; // El cuarto intento será el definitivo

    // El evento 'mouseenter' es más sensible que 'mouseover'
    boton.addEventListener('mouseenter', () => {
        if (intentos < maxIntentos - 1) {
            intentos++;
            moverBoton();
        } else if (intentos === maxIntentos - 1) {
            // Prepara para el último clic
            intentos++;
        }
    });

    boton.addEventListener('click', () => {
        if (intentos >= maxIntentos) {
            // Evita que la función se llame múltiples veces
            if (!boton.classList.contains('luces')) {
                activarEfectos();
            }
        }
    });

    function moverBoton() {
        const viewWidth = window.innerWidth;
        const viewHeight = window.innerHeight;
        const btnWidth = boton.clientWidth;
        const btnHeight = boton.clientHeight;

        // Nuevas coordenadas aleatorias
        const nuevaPosX = Math.random() * (viewWidth - btnWidth);
        const nuevaPosY = Math.random() * (viewHeight - btnHeight);

        boton.style.left = `${nuevaPosX}px`;
        boton.style.top = `${nuevaPosY}px`;
    }

    function activarEfectos() {
        // 1. Desactivamos eventos y añadimos el efecto de luces
        boton.style.pointerEvents = 'none';
        boton.classList.add('luces');
        
        // 2. Iniciamos la transición de la pantalla
        setTimeout(() => {
            pantallaInicial.style.transform = 'scale(5)'; // Efecto de zoom hacia adentro
            pantallaInicial.style.opacity = '0';
            
            // 3. Mostramos la pantalla final cuando la primera ha desaparecido
            setTimeout(() => {
                pantallaFinal.style.opacity = '1';
                pantallaFinal.style.transform = 'scale(1)';
                contenidoFinal.style.opacity = '1';
                contenidoFinal.style.transform = 'scale(1)';
            }, 700); // Sincronizado con la transición de la pantalla inicial
        }, 1500); // Duración del efecto de luces
    }
});
