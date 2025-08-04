// js/playlist.js

document.addEventListener('DOMContentLoaded', () => {
    // --- CÓDIGO DE CONTROL DE AUDIO DE PÁGINA (Playlist) ---
    const playlistMusic = document.getElementById('playlistMusic'); // <-- ID específico de tu audio de fondo de playlist
    const soundToggleButton = document.getElementById('soundToggleButton');

    let isPlayingBackgroundMusic = false; 

    function playBackgroundMusic() {
        if (playlistMusic && playlistMusic.paused) {
            playlistMusic.play()
                .then(() => {
                    isPlayingBackgroundMusic = true;
                    soundToggleButton.textContent = "🔊 Sonido ON";
                    soundToggleButton.classList.remove('off');
                })
                .catch(e => {
                    console.warn("La reproducción de audio de fondo fue bloqueada o falló:", e);
                });
        }
    }

    function pauseBackgroundMusic() {
        if (playlistMusic && !playlistMusic.paused) {
            playlistMusic.pause();
            isPlayingBackgroundMusic = false;
            soundToggleButton.textContent = "🔇 Sonido OFF";
            soundToggleButton.classList.add('off');
        }
    }

    if (soundToggleButton) { // Asegúrate de que el botón exista
        soundToggleButton.addEventListener('click', () => {
            if (isPlayingBackgroundMusic) {
                pauseBackgroundMusic();
            } else {
                playBackgroundMusic();
            }
        });
    }

    if (playlistMusic) {
        playlistMusic.volume = 0.5; // Ajusta el volumen del audio de fondo si lo deseas (0.0 a 1.0)

        playlistMusic.addEventListener('canplaythrough', () => {
            // Intenta reproducir al cargar, si el navegador lo permite
            playBackgroundMusic();
        }, { once: true });
        
        playlistMusic.addEventListener('playing', () => {
            isPlayingBackgroundMusic = true;
            soundToggleButton.textContent = "🔊 Sonido ON";
            soundToggleButton.classList.remove('off');
        });

        playlistMusic.addEventListener('pause', () => {
            isPlayingBackgroundMusic = false;
            soundToggleButton.textContent = "🔇 Sonido OFF";
            soundToggleButton.classList.add('off');
        });
    }
    // --- FIN CÓDIGO DE CONTROL DE AUDIO DE PÁGINA ---


    // --- Lógica del Carrusel de Playlist ---
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playSongButtons = document.querySelectorAll('.play-song-btn');

    let currentIndex = 0; // Índice de la primera canción visible
    let itemWidth = 0;    // Ancho de un ítem (incluyendo márgenes)
    let visibleItemsCount = 0; // Cuántos ítems caben a la vez

    let currentPlayingAudio = null; // Para controlar qué canción está sonando


    // Función para calcular las dimensiones y el número de ítems visibles
    function calculateCarouselDimensions() {
        if (carouselItems.length === 0) return;

        // Obtener el primer ítem para medir su ancho
        const firstItem = carouselItems[0];
        const itemStyle = window.getComputedStyle(firstItem);
        const itemMarginRight = parseFloat(itemStyle.marginRight);
        const itemMarginLeft = parseFloat(itemStyle.marginLeft);

        // Calcular el ancho total de un ítem (ancho + márgenes)
        itemWidth = firstItem.offsetWidth + itemMarginLeft + itemMarginRight;

        // Calcular cuántos ítems caben en el 'carousel-inner'
        const carouselInner = document.querySelector('.carousel-inner');
        if (carouselInner) {
            visibleItemsCount = Math.floor(carouselInner.offsetWidth / itemWidth);
            // Asegúrate de que siempre haya al menos 1 ítem visible
            if (visibleItemsCount === 0 && carouselInner.offsetWidth > 0) {
                visibleItemsCount = 1;
            }
        }
        
        updateCarousel(); // Actualiza la posición después de recalcular
    }

    // Función para actualizar la posición del carrusel
    function updateCarousel() {
        const offset = -currentIndex * itemWidth;
        carouselTrack.style.transform = `translateX(${offset}px)`;

        // Controla la visibilidad de los botones de navegación
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentIndex >= carouselItems.length - visibleItemsCount ? 'none' : 'block';
    }

    // Navegación izquierda
    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - visibleItemsCount); // Retrocede por el número de ítems visibles
        updateCarousel();
    });

    // Navegación derecha
    nextBtn.addEventListener('click', () => {
        // Asegúrate de no ir más allá del final de los ítems
        currentIndex = Math.min(carouselItems.length - visibleItemsCount, currentIndex + visibleItemsCount);
        updateCarousel();
    });

    // --- Lógica de reproducción de canciones individuales ---
    playSongButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const songAudio = carouselItems[index].querySelector('audio');

            if (currentPlayingAudio && currentPlayingAudio !== songAudio) {
                // Si ya hay una canción sonando y no es la misma, páguala
                currentPlayingAudio.pause();
                const prevButton = currentPlayingAudio.nextElementSibling; // El botón está después del audio
                if(prevButton && prevButton.classList.contains('play-song-btn')) {
                    prevButton.textContent = '▶';
                    prevButton.classList.remove('playing');
                }
            }

            if (songAudio.paused) {
                songAudio.play()
                    .then(() => {
                        button.textContent = '⏸';
                        button.classList.add('playing');
                        currentPlayingAudio = songAudio;
                        // Pausa la música de fondo si hay una canción individual sonando
                        pauseBackgroundMusic();
                    })
                    .catch(e => {
                        console.error("Error al reproducir canción:", e);
                        // Mensaje al usuario si la reproducción es bloqueada
                        alert("La reproducción de audio podría haber sido bloqueada por el navegador. Por favor, interactúa con la página.");
                    });
            } else {
                songAudio.pause();
                button.textContent = '▶';
                button.classList.remove('playing');
                currentPlayingAudio = null;
                // Reanuda la música de fondo si la canción individual se pausó manualmente
                playBackgroundMusic(); 
            }

            // Detectar cuando la canción individual termina para resetear el botón y reanudar la música de fondo
            songAudio.onended = () => {
                button.textContent = '▶';
                button.classList.remove('playing');
                currentPlayingAudio = null;
                playBackgroundMusic(); // Reanuda la música de fondo
            };
        });
    });


    // --- Inicialización y Eventos ---
    // Recalcular y actualizar cuando se carga o se redimensiona la ventana
    window.addEventListener('load', calculateCarouselDimensions);
    window.addEventListener('resize', calculateCarouselDimensions);

    // Llamada inicial para asegurar que el carrusel se posicione correctamente al cargar
    calculateCarouselDimensions(); 
});