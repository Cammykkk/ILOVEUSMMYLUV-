document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const heartAnimation = document.getElementById('heartAnimation');

    if (playButton) {
        playButton.addEventListener('click', () => {
           
            heartAnimation.classList.add('animate');
            
           
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 700); 
        });
    }
});