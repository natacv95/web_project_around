import Popup from "../components/Popup.js";
import { formAdd, formEd, formImg, popTrash } from "../constants/utils.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popimage, poptext) {
    super(popupSelector);
    this._imageElement = popimage;
    this._captionElement = poptext;
  }

  open(src, caption) {
    this._imageElement.src = src;
    this._imageElement.alt = caption;
    this._captionElement.textContent = caption;
    formAdd.classList.toggle("popup__item-hidden");
    formEd.classList.toggle("popup__item-hidden");
    formImg.classList.toggle("popup__item-hidden");
    popTrash.classList.toggle("popup__item-hidden");
    super.open();
  }
}
