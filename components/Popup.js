export default class Popup {
  constructor(popupSelector) {
    if (typeof popupSelector === "string") {
      this._popup = document.querySelector(popupSelector);
    } else if (popupSelector instanceof HTMLElement) {
      this._popup = popupSelector;
    } else {
      this._popup = null;
    }

    if (!this._popup) {
      throw new Error("Popup element not found (invalid selector or element)");
    }

    // Inicializar aria-hidden correctamente
    this._popup.setAttribute("aria-hidden", "true");

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this._listenersAdded = false;
  }

  open() {
    this._popup.classList.add("popup_opened");
    this._popup.setAttribute("aria-hidden", "false");
    document.addEventListener("keydown", this._handleEscClose);
    this.addEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._popup.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", this._handleEscClose);
    this.removeEventListeners();

    // hide image and caption if present to avoid leftover visible content
    const imgEl = this._popup.querySelector('.popup__image');
    if (imgEl) {
      imgEl.classList.add('popup__item-hidden');
      imgEl.src = '';
      imgEl.alt = '';
    }
    const captionEl = this._popup.querySelector('.popup__paragraph');
    if (captionEl) {
      captionEl.classList.add('popup__item-hidden');
      captionEl.textContent = '';
    }
    const captionWrap = this._popup.querySelector('.popup__paragraph-content');
    if (captionWrap) captionWrap.classList.add('popup__item-hidden');
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleCloseClick() {
    this.close();
  }

  _handleOverlayClick(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  addEventListeners() {
    if (this._listenersAdded) return;

    const closeButton = this._popup.querySelector(".popup__button_close");
    if (closeButton) {
      closeButton.addEventListener("click", this._handleCloseClick);
    }

    this._popup.addEventListener("mousedown", this._handleOverlayClick);

    this._listenersAdded = true;
  }

  removeEventListeners() {
    if (!this._listenersAdded) return;

    // No remover el listener del botón de cerrar, solo el del overlay
    // El botón de cerrar debería estar disponible para todos los popups

    this._popup.removeEventListener("mousedown", this._handleOverlayClick);

    this._listenersAdded = false;
  }

  setEventListeners() {
    // kept for backwards compatibility; ensure listeners get added
    this.addEventListeners();
  }
}
