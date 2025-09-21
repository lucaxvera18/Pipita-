document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('boton-magico');
    const pantallaInicial = document.getElementById('pantalla-inicial');
    const pantallaFinal = document.getElementById('pantalla-final');
    
    let intentos = 0;
    const movimientosAntesDeSorpresa = 4; // Se moverá 4 veces
    let sorpresaActivada = false; // Bandera para evitar múltiples activaciones

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
        if (sorpresaActivada) return; // Si ya se activó, no hacer nada
        sorpresaActivada = true;

        boton.style.pointerEvents = 'none';
        boton.classList.add('luces');
        boton.textContent = '!!!';

        setTimeout(() => {
            pantallaInicial.style.transform = 'scale(10)';
            pantallaInicial.style.opacity = '0';
            
            setTimeout(() => {
                pantallaFinal.classList.add('visible');
            }, 800);
        }, 1800);
    };

    // Función unificada para manejar tanto clics de mouse como toques
    const manejarIntento = (event) => {
        // Prevenimos el comportamiento por defecto (como el zoom al doble toque en móviles)
        event.preventDefault();

        if (sorpresaActivada) return;

        intentos++;

        if (intentos <= movimientosAntesDeSorpresa) {
            moverBoton();
        } else {
            activarEfectos();
        }
    };

    // Asignamos la misma función a ambos eventos
    boton.addEventListener('mousedown', manejarIntento); // Para clics de mouse
    boton.addEventListener('touchstart', manejarIntento); // Para toques en pantalla

    // Función para centrar el botón
    const centrarBoton = () => {
        const viewWidth = window.innerWidth;
        const viewHeight = window.innerHeight;
        const btnWidth = boton.clientWidth;
        const btnHeight = boton.clientHeight;

        boton.style.left = `${(viewWidth - btnWidth) / 2}px`;
        boton.style.top = `${(viewHeight - btnHeight) / 2}px`;
    };

    window.addEventListener('load', centrarBoton);
    window.addEventListener('resize', centrarBoton);
});
