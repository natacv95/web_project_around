// Script to test the deletion flow manually
// This will be executed in the browser console

console.log("=== Testing Card Deletion Flow ===");

// Wait for page to load completely
setTimeout(() => {
    console.log("1. Página cargada");
    
    // Get first card
    const firstCard = document.querySelector('.main__gallery-card');
    if (!firstCard) {
        console.error("ERROR: No cards found!");
        return;
    }
    console.log("2. Primera tarjeta encontrada");
    
    // Get trash button on card
    const trashButtonOnCard = firstCard.querySelector('.main__button_trash');
    if (!trashButtonOnCard) {
        console.error("ERROR: Trash button on card not found!");
        return;
    }
    console.log("3. Botón trash en tarjeta encontrado");
    
    // Get popup elements
    const popup = document.querySelector('.popup');
    const popupTrash = document.querySelector('.popup__trash');
    const yesButton = document.querySelector('.popup__button_trash');
    
    if (!popup) console.error("ERROR: .popup not found!");
    if (!popupTrash) console.error("ERROR: .popup__trash not found!");
    if (!yesButton) console.error("ERROR: .popup__button_trash not found!");
    
    console.log("4. Elementos del popup verificados");
    
    // Simulate clicking trash button
    console.log("5. Simulando click en botón trash de tarjeta...");
    trashButtonOnCard.click();
    
    // Check if popup is visible
    setTimeout(() => {
        const popupOpened = popup.classList.contains('popup_opened');
        const trashVisible = !popupTrash.classList.contains('popup__item-hidden');
        
        console.log("6. Estado del popup después del click:");
        console.log("   - Popup abierto:", popupOpened);
        console.log("   - Trash visible:", trashVisible);
        
        if (popupOpened && trashVisible) {
            console.log("7. Popup abierto correctamente. Simulando click en 'Sí'...");
            yesButton.click();
            
            // Check if card was deleted
            setTimeout(() => {
                const firstCardNow = document.querySelector('.main__gallery-card');
                const cardWasDeleted = firstCardNow !== firstCard;
                
                console.log("8. Resultado después de click en 'Sí':");
                console.log("   - Tarjeta fue eliminada:", cardWasDeleted);
                
                if (cardWasDeleted) {
                    console.log("✅ ÉXITO: La tarjeta fue eliminada correctamente");
                } else {
                    console.log("❌ ERROR: La tarjeta no fue eliminada");
                }
            }, 100);
        } else {
            console.error("❌ ERROR: Popup no abierto o trash no visible");
            console.log("   - Clases del popup:", popup.className);
            console.log("   - Clases del trash:", popupTrash.className);
        }
    }, 100);
}, 3000);
