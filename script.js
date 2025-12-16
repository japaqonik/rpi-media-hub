document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile[tabindex="0"]');
    const tileArray = Array.from(tiles);
    let focusedIndex = 0;

    // Ustawienie focusu na pierwszym elemencie po załadowaniu
    if (tileArray.length > 0) {
        tileArray[focusedIndex].focus();
    }

    // Prosta funkcja do aktualizacji zegara (dla estetyki)
    function updateClock() {
        const now = new Date();
        document.getElementById('clock').textContent = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    }
    setInterval(updateClock, 1000);
    updateClock();


    // --- GŁÓWNA LOGIKA NAWIGACJI PILOTEM ---
    
    document.addEventListener('keydown', (e) => {
        let newIndex = focusedIndex;
        const numColumns = 3; // Zgodnie z CSS Grid (grid-template-columns: repeat(3, 1fr);)
        
        switch (e.key) {
            case 'ArrowRight':
                newIndex = (focusedIndex + 1) % tileArray.length;
                break;
            case 'ArrowLeft':
                newIndex = (focusedIndex - 1 + tileArray.length) % tileArray.length;
                break;
            case 'ArrowDown':
                // Przejście o jeden rząd w dół
                newIndex = (focusedIndex + numColumns);
                if (newIndex >= tileArray.length) {
                    newIndex = focusedIndex % numColumns; // Zawinięcie na górę (opcjonalnie)
                }
                break;
            case 'ArrowUp':
                // Przejście o jeden rząd w górę
                newIndex = (focusedIndex - numColumns);
                if (newIndex < 0) {
                    newIndex = tileArray.length - (numColumns - focusedIndex % numColumns); // Zawinięcie na dół (opcjonalnie)
                }
                break;
            case 'Enter':
                // Akcja po naciśnięciu "OK" / Enter
                const activeTile = tileArray[focusedIndex];
                const targetUrl = activeTile.dataset.url;
                
                if (targetUrl) {
                    // Tutaj wyślesz żądanie do Twojego Backendu
                    console.log(`Wysyłanie żądania uruchomienia: ${targetUrl}`);
                    
                    // TODO: Implementacja fetch() do lokalnego backendu:
                    // fetch(`http://localhost:8080/launch?url=${encodeURIComponent(targetUrl)}`);
                }
                return; // Nie przesuwaj focusu po Enter
        }
        
        // Zabezpieczenie indeksu i ustawienie focusu
        if (newIndex >= 0 && newIndex < tileArray.length) {
            focusedIndex = newIndex;
            tileArray[focusedIndex].focus();
        }

        e.preventDefault(); // Zapobiega domyślnemu przewijaniu strony przez strzałki
    });
});
