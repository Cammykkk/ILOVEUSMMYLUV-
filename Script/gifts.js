
document.addEventListener('DOMContentLoaded', () => {
    const giftCards = document.querySelectorAll('.gift-card');
    const surpriseMessageOverlay = document.getElementById('surpriseMessageOverlay');
    const surpriseText = document.getElementById('surpriseText');
    const closeSurpriseButton = document.getElementById('closeSurpriseButton');

    giftCards.forEach(card => {
        card.addEventListener('click', () => {
          
            if (!card.classList.contains('flipped')) {
                card.classList.add('flipped'); 

               
                const message = card.dataset.surpriseMessage;

                setTimeout(() => {
                    surpriseText.textContent = message;
                    surpriseMessageOverlay.style.display = 'flex'; 
                }, 800); 
            }
        });
    });

   
    closeSurpriseButton.addEventListener('click', () => {
        surpriseMessageOverlay.style.display = 'none'; 
    });
});