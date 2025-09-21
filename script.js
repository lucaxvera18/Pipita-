document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('boton-magico'); // Id del botón actualizado
    const pantallaInicial = document.getElementById('pantalla-inicial');
    const pantallaFinal = document.getElementById('pantalla-final');
    
    let intentosParaSorpresa = 0;
    const movimientosAntesDeClic = 4; // Se moverá 4 veces
    let yaActivado = false; // Bandera para evitar múltiples activaciones

    const moverBoton = () => {
        const viewWidth = window.innerWidth;
        const viewHeight = window.innerHeight;
        const btnWidth = boton.clientWidth;
        const btnHeight = boton.clientHeight;

        // Limita el rango de movimiento para que el botón esté siempre visible
        const nuevaPosX = Math.max(0, Math.random() * (viewWidth - btnWidth));
        const nuevaPosY = Math.max(0, Math.random() * (viewHeight - btnHeight));

        boton.style.left = `${nuevaPosX}px`;
        boton.style.top = `${nuevaPosY}px`;
    };

    const activarEfectos = () => {
        if (yaActivado) return; // Si ya se activó, no hacer nada
        yaActivado = true;

        boton.style.pointerEvents = 'none'; // Desactiva el botón
        boton.classList.add('luces'); // Añade el efecto de luces
        boton.textContent = '!!!'; // Cambia el texto del botón

        // Inicia la transición de la pantalla después de un momento
        setTimeout(() => {
            pantallaInicial.style.transform = 'scale(10)'; // Zoom hacia adentro más grande
            pantallaInicial.style.opacity = '0';
            
            // Muestra la pantalla final cuando la primera ha desaparecido
            setTimeout(() => {
                pantallaFinal.classList.add('visible');
            }, 800); // Duración de la transición de pantalla inicial
        }, 1800); // Tiempo que duran las luces antes del zoom
    };

    // Maneja los intentos de toque (mouseover)
    boton.addEventListener('mouseenter', () => {
        if (!yaActivado && intentosParaSorpresa < movimientosAntesDeClic) {
            intentosParaSorpresa++;
            moverBoton();
        }
    });

    // El click final activa la animación si se han cumplido los movimientos
    boton.addEventListener('click', () => {
        if (!yaActivado && intentosParaSorpresa >= movimientosAntesDeClic) {
            activarEfectos();
        } else if (!yaActivado && intentosParaSorpresa < movimientosAntesDeClic) {
             // Si hacen click antes de los 4 movimientos, lo volvemos a mover
            intentosParaSorpresa++;
            moverBoton();
        }
    });

    // Aseguramos la posición inicial del botón en el centro
    function centrarBotonInicialmente() {
        const viewWidth = window.innerWidth;
        const viewHeight = window.innerHeight;
        const btnWidth = boton.clientWidth;
        const btnHeight = boton.clientHeight;

        boton.style.left = `${(viewWidth - btnWidth) / 2}px`;
        boton.style.top = `${(viewHeight - btnHeight) / 2}px`;
    }

    // Centrar el botón al cargar y al redimensionar la ventana
    window.addEventListener('load', centrarBotonInicialmente);
    window.addEventListener('resize', centrarBotonInicialmente);
});
