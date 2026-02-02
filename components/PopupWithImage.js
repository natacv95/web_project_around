import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupWithConfirmation) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__paragraph");
    this._deleteButton = this._popup.querySelector(".popup__button_trash_image");
    this._popupWithConfirmation = popupWithConfirmation;
    this._currentCard = null;
    this._setupDeleteButton();
  }

  _setupDeleteButton() {
    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        if (this._currentCard && this._popupWithConfirmation) {
          // Asignar la tarjeta actual al popup de confirmación
          this._popupWithConfirmation._cardToDelete = this._currentCard;
          this._popupWithConfirmation.open();
        }
      });
    }
  }

  open(link, name, cardElement = null) {
    // Store the card element for potential deletion
    this._currentCard = cardElement;

    // Hide other popup inner content (forms, trash) so only the image is visible
    const forms = this._popup.querySelectorAll('.popup__form, .popup__trash');
    forms.forEach((el) => el.classList.add('popup__item-hidden'));

    // ensure image and caption are visible
    const imgEl = this._popup.querySelector('.popup__image');
    const captionEl = this._popup.querySelector('.popup__paragraph');
    if (imgEl) {
      imgEl.classList.remove('popup__item-hidden');
      imgEl.src = link;
      imgEl.alt = name;
    }
    if (captionEl) {
      captionEl.classList.remove('popup__item-hidden');
      captionEl.textContent = name;
    }

    super.open();
  }
}
