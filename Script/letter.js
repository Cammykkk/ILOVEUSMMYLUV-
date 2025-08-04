
document.addEventListener('DOMContentLoaded', () => {
    const letterLines = document.querySelectorAll('.letter-line');
    const letterContent = document.getElementById('letterContent');
    const finalCursor = document.getElementById('finalCursor');

    let currentLineIndex = 0;
    let currentCharIndex = 0;
    const typingSpeed = 50; 
    const lineDelay = 800; 

    
    finalCursor.style.display = 'none';

    function typeWriter() {
        if (currentLineIndex < letterLines.length) {
            const currentLineElement = letterLines[currentLineIndex];
            const fullTextForThisLine = currentLineElement.dataset.text; 

           
            finalCursor.style.display = 'inline-block';

            if (currentCharIndex < fullTextForThisLine.length) {
         
                currentLineElement.textContent += fullTextForThisLine.charAt(currentCharIndex);
                currentCharIndex++;

               
                positionCursor();

                setTimeout(typeWriter, typingSpeed);
            } else {
               
                currentCharIndex = 0; 
                currentLineIndex++; 

                if (currentLineIndex < letterLines.length) {
                   
                    positionCursor();
                   
                    setTimeout(typeWriter, lineDelay);
                } else {
                   
                    positionCursor();
                    
                }
            }
        } else {
           
        }
    }

    function positionCursor() {
       
        requestAnimationFrame(() => {
            let lastElement = letterLines[currentLineIndex - 1] || letterLines[0]; 
            if (currentLineIndex === letterLines.length) { 
                lastElement = letterLines[letterLines.length - 1];
            } else if (currentLineIndex < letterLines.length && currentLineElement) {
                lastElement = currentLineElement;
            } else {
               
                finalCursor.style.top = `${letterContent.offsetTop}px`;
                finalCursor.style.left = `${letterContent.offsetLeft}px`;
                return;
            }

            const range = document.createRange();
            const selection = window.getSelection();

            
            if (lastElement && lastElement.lastChild) {
                range.setStartAfter(lastElement.lastChild);
                range.collapse(true); 
            } else if (lastElement) {
              
                range.setStart(lastElement, 0);
                range.collapse(true);
            } else {
             
                finalCursor.style.top = `${letterContent.offsetTop}px`;
                finalCursor.style.left = `${letterContent.offsetLeft}px`;
                return;
            }

            const rect = range.getBoundingClientRect();
            const containerRect = letterContent.getBoundingClientRect();

            finalCursor.style.top = `${rect.top - containerRect.top + letterContent.scrollTop}px`;
            finalCursor.style.left = `${rect.left - containerRect.left + letterContent.scrollLeft}px`;
        });
    }

    
    setTimeout(typeWriter, 500);
});