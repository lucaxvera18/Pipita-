document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('boton-magico');
    const pantallaInicial = document.getElementById('pantalla-inicial');
    const pantallaFinal = document.getElementById('pantalla-final');
    const musicaFondo = document.getElementById('musica-fondo'); // <-- Obtenemos la etiqueta de audio
    
    // --- Configuración de Audio (Web Audio API para sonidos cortos) ---
    let audioCtx;
    
    const reproducirSonidoEsquivar = () => {
        if (!audioCtx) return;

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
        oscillator.stop(audioCtx.currentTime + 0.1);
    };

    const reproducirSonidoSorpresa = () => {
        if (!audioCtx) return;

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'triangle';
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        
        oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.5);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
        oscillator.stop(audioCtx.currentTime + 1);
    };

    // --- Lógica del Botón y Transiciones ---
    let intentos = 0;
    const movimientosAntesDeSorpresa = 4;
    let sorpresaActivada = false;

    const moverBoton = () => {
        reproducirSonidoEsquivar();
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
        if (sorpresaActivada) return;
        sorpresaActivada = true;

        reproducirSonidoSorpresa();
        boton.style.pointerEvents = 'none';
        boton.classList.add('luces');
        boton.textContent = '!!!';

        setTimeout(() => {
            pantallaInicial.style.transform = 'scale(10)';
            pantallaInicial.style.opacity = '0';
            
            setTimeout(() => {
                pantallaFinal.classList.add('visible');
                // Cuando la pantalla final es visible, ¡reproducimos la música!
                // Es importante que esto se haga después de una interacción del usuario.
                if (musicaFondo) {
                    musicaFondo.volume = 0.6; // Ajusta el volumen a tu gusto (0.0 a 1.0)
                    musicaFondo.play().catch(e => console.error("Error al reproducir música:", e));
                }
            }, 800);
        }, 1800);
    };

    const manejarIntento = (event) => {
        event.preventDefault();
        
        // Inicializar AudioContext en el primer toque
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }

        if (sorpresaActivada) return;

        intentos++;

        if (intentos <= movimientosAntesDeSorpresa) {
            moverBoton();
        } else {
            activarEfectos();
        }
    };

    boton.addEventListener('mousedown', manejarIntento);
    boton.addEventListener('touchstart', manejarIntento);

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
