import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__paragraph");
    this._deleteButton = this._popup.querySelector(".popup__button_trash_image");
    this._currentCard = null;
  }

  open(link, name, cardElement = null) {
    // Store the card element for potential deletion
    this._currentCard = cardElement;

    // Hide trash/confirmation FIRST
    const trash = this._popup.querySelector('.popup__trash');
    if (trash) {
      trash.classList.add('popup__item-hidden');
      trash.style.display = 'none'; // Force hide with inline style
    }

    // Hide all forms
    const forms = this._popup.querySelectorAll('.popup__form');
    forms.forEach((el) => el.classList.add('popup__item-hidden'));
    
    // Hide paragraph content wrapper
    const paragraphContent = this._popup.querySelector('.popup__paragraph-content');
    if (paragraphContent) paragraphContent.classList.add('popup__item-hidden');

    // ensure image and caption are visible
    const imgEl = this._popup.querySelector('.popup__image');
    const captionEl = this._popup.querySelector('.popup__paragraph');
    if (imgEl) {
      imgEl.classList.remove('popup__item-hidden');
      imgEl.style.display = ''; // Remove inline style to allow CSS
      imgEl.src = link;
      imgEl.alt = name;
    }
    if (captionEl) {
      captionEl.classList.remove('popup__item-hidden');
      captionEl.style.display = ''; // Remove inline style to allow CSS
      captionEl.textContent = name;
    }

    super.open();
  }
}
