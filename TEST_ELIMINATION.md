# Test de Eliminación de Tarjetas

## Flujo esperado:

### 1. Eliminación desde tarjeta pequeña:
- Usuario hace click en botón trash de una tarjeta
- Código: `Card._trash()` → `this._handleCardDelete.open()`
- Se abre PopupWithConfirmation
- PopupWithConfirmation guarda: `_cardToDelete = card instance` y `_api = card._api`
- Usuario hace click en "Sí"
- Código: PopupWithConfirmation._setupDeleteHandler() escucha click en butTrash
- Se ejecuta `_performDelete()`
- Si card._id existe: llama `api.removeCard(card._id)`
- Si no existe: solo `card._element.remove()`
- Se cierra el popup

### 2. Eliminación desde popup de imagen:
- Usuario hace click en X de papelera en popup de imagen
- PopupWithImage asigna: `popupWithConfirmation._cardToDelete = this._currentCard`
- Se abre PopupWithConfirmation
- Mismo flujo que arriba

## Verificaciones realizadas:

✅ PopupWithConfirmation inicializado con ".popup" (no ".popup__trash")
✅ Card.js pasa `this._api` a PopupWithConfirmation
✅ PopupWithConfirmation almacena `_cardToDelete` y `_api`
✅ Listener en butTrash ejecuta `_performDelete()`
✅ `_performDelete()` maneja tarjetas locales (sin _id) y remotas (con _id)

## Puntos críticos verificados:

1. **butTrash selector** - Debe ser el botón "Sí" en `.popup__trash`
2. **Card._id** - Para tarjetas iniciales es `undefined`, para tarjetas nuevas tiene valor
3. **this._api** - Está disponible en Card.js y se pasa a PopupWithConfirmation
4. **Event listeners** - No hay conflictos de múltiples listeners
