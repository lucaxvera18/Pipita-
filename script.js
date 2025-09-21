document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('boton-magico');
    const pantallaInicial = document.getElementById('pantalla-inicial');
    const pantallaFinal = document.getElementById('pantalla-final');
    
    // --- Configuración de Audio ---
    let audioCtx; // El "director de orquesta" de nuestro audio
    
    // Función para crear un sonido corto cuando el botón esquiva
    const reproducirSonidoEsquivar = () => {
        if (!audioCtx) return; // Si no se ha iniciado el audio, no hacer nada

        const oscillator = audioCtx.createOscillator(); // Crea el "músico"
        const gainNode = audioCtx.createGain(); // Crea la "perilla de volumen"

        oscillator.type = 'square'; // Sonido retro tipo 8-bit
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // Tono (La)
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime); // Volumen inicial

        // Conectar todo: músico -> volumen -> altavoces
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start(); // ¡Empieza a sonar!
        
        // Detener el sonido después de un instante para que sea un "blip"
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
        oscillator.stop(audioCtx.currentTime + 0.1);
    };

    // Función para un sonido más largo y mágico para la sorpresa
    const reproducirSonidoSorpresa = () => {
        if (!audioCtx) return;

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'triangle'; // Sonido más suave
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        
        // Hacemos que el tono suba rápidamente para un efecto mágico
        oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.5);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        
        // Fade out del sonido para que termine suavemente
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
        oscillator.stop(audioCtx.currentTime + 1);
    };

    // --- Lógica del Botón (Actualizada) ---
    let intentos = 0;
    const movimientosAntesDeSorpresa = 4;
    let sorpresaActivada = false;

    const moverBoton = () => {
        reproducirSonidoEsquivar(); // <-- Llamamos al sonido aquí
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

        reproducirSonidoSorpresa(); // <-- Llamamos al sonido de la sorpresa
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

    const manejarIntento = (event) => {
        event.preventDefault();
        
        // IMPORTANTE: Los navegadores requieren que el audio se inicie por una acción del usuario.
        // Por eso, creamos el AudioContext en el primer toque.
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
