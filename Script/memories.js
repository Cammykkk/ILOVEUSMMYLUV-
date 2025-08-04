// js/moments.js
document.addEventListener('DOMContentLoaded', () => {
    const clickablePhotos = document.querySelectorAll('.clickable-photo');
    const surpriseMessageContainer = document.getElementById('surpriseMessageContainer');
    const surpriseText = document.getElementById('surpriseText');
    const closeMessageButton = document.getElementById('closeMessageButton');

    // Añade un evento de clic a cada imagen
    clickablePhotos.forEach(photo => {
        photo.addEventListener('click', () => {
            const message = photo.dataset.message; // Obtiene el mensaje del atributo data-message
            surpriseText.textContent = message;    // Establece el texto del mensaje
            surpriseMessageContainer.style.display = 'block'; // Muestra el contenedor del mensaje
        });
    });

    // Añade un evento de clic al botón de cerrar mensaje
    closeMessageButton.addEventListener('click', () => {
        surpriseMessageContainer.style.display = 'none'; // Oculta el contenedor del mensaje
    });
});