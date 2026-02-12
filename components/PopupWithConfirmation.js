import Popup from "./Popup.js";
import { formAdd, formEd, formImg, popimag, poptxt, popTrash, butTrash } from "../constants/utils.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.setEventListeners();
    this._cardToDelete = null;
    this._api = null;
    this._handleTrashClick = this._handleTrashClick.bind(this);
    this._setupDeleteHandler();
  }

  _handleTrashClick(event) {
    
    try {
      if (this._cardToDelete) {
        this._performDelete();
      } else {
        console.warn("[PopupWithConfirmation] No hay tarjeta para eliminar");
      }
    } catch (err) {
      console.error("[PopupWithConfirmation] Error en _handleTrashClick:", err);
      if (butTrash) butTrash.textContent = "Error";
    }
  }

  _setupDeleteHandler() {
    
    // En lugar de usar event delegation, obtenemos directamente el botón del HTML
    // y le añadimos un listener directo
    const deleteButton = this._popup.querySelector(".popup__button_trash");
    
    if (!deleteButton) {
      console.error("[PopupWithConfirmation] ERROR: Delete button (.popup__button_trash) not found");
      return;
    }
    
    // Añadir un listener directo al botón
    deleteButton.addEventListener("click", (event) => {
      this._handleTrashClick(event);
    });
    
  }

  _performDelete() {
    try {
      const card = this._cardToDelete;
      
      if (!card) {
        console.warn("[PopupWithConfirmation] No card to delete");
        return;
      }
      
      // Verificar que el elemento existe
      if (!card._element || !card._element.parentNode) {
        console.warn("[PopupWithConfirmation] Card element not found or already removed");
        this.close();
        return;
      }
      
      if (butTrash) butTrash.textContent = "Eliminando...";
      
      // Siempre eliminar del DOM (sin llamadas a API)
      try {
        card._element.remove();
      } catch (err) {
        console.error("[PopupWithConfirmation] Error removing card from DOM:", err);
        if (butTrash) butTrash.textContent = "Error";
        setTimeout(() => {
          if (butTrash) butTrash.textContent = "Sí";
        }, 1500);
        return;
      }
      
      try {
        this.close();
      } catch (err) {
        console.error("[PopupWithConfirmation] Error closing popup:", err);
      }

      if (butTrash) butTrash.textContent = "Sí";
      this._cardToDelete = null;

    } catch (err) {
      console.error("[PopupWithConfirmation] Error in _performDelete:", err);
      if (butTrash) butTrash.textContent = "Error";
      setTimeout(() => {
        try {
          this.close();
          if (butTrash) butTrash.textContent = "Sí";
        } catch (e) {
          console.error("[PopupWithConfirmation] Error closing popup after error:", e);
        }
      }, 500);
    }
  }

  open() {
    try {
      // Ocultar todos los formularios e imagen
      if (formAdd) formAdd.classList.add("popup__item-hidden");
      if (formEd) formEd.classList.add("popup__item-hidden");
      if (formImg) formImg.classList.add("popup__item-hidden");
      if (popimag) popimag.classList.add("popup__item-hidden");
      if (poptxt) poptxt.classList.add("popup__item-hidden");

      // Mostrar el trash/confirmación
      if (popTrash) {
        popTrash.classList.remove("popup__item-hidden");
        popTrash.style.display = ''; // Remove inline style to allow CSS to show it
      } else {
        console.error("[PopupWithConfirmation] ERROR: popTrash is null");
      }

      // Abrir el popup
      super.open();
    } catch (err) {
      console.error("Error opening PopupWithConfirmation:", err);
    }
  }

  close() {
    try {
      // Resetear el texto del botón al cerrar
      if (butTrash) {
        butTrash.textContent = "Sí";
      }
      
      // Ocultar el elemento trash/confirmación
      if (popTrash) {
        popTrash.classList.add("popup__item-hidden");
      }
      
      super.close();
    } catch (err) {
      console.error("Error closing PopupWithConfirmation:", err);
    }
  }
}
