
document.addEventListener('DOMContentLoaded', () => {
    const startDate = new Date('September 6, 2024 00:00:00'); 
    const countdownDisplay = document.getElementById('countdownDisplay');

    function updateCountdown() {
        const now = new Date();
        const diff = now.getTime() - startDate.getTime(); 

        if (diff < 0) {
            countdownDisplay.innerHTML = '¡El tiempo aún no ha comenzado!';
            return;
        }

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        
        const months = Math.floor(days / 30.44);

        const remainingDays = days % 30.44; 
        const remainingHours = hours % 24;
        const remainingMinutes = minutes % 60;
        const remainingSeconds = seconds % 60;

        document.getElementById('months').textContent = `Meses: ${months}`;
        document.getElementById('days').textContent = `Días: ${Math.floor(remainingDays)}`; 
        document.getElementById('hours').textContent = `Horas: ${remainingHours}`;
        document.getElementById('minutes').textContent = `Minutos: ${remainingMinutes}`;
        document.getElementById('seconds').textContent = `Segundos: ${remainingSeconds}`;
    }

    
    setInterval(updateCountdown, 1000);
    
    updateCountdown(); 
});