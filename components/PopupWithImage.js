import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__paragraph");
  }

  open(link, name) {
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
