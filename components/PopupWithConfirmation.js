import Popup from "./Popup.js";
import { formAdd, formEd, formImg, popimg } from "../constants/utils.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    formAdd.classList.add("popup__item-hidden");
    formEd.classList.add("popup__item-hidden");
    formImg.classList.add("popup__item-hidden");
    popimg.classList.add("popup__item-hidden");
    super.open();
  }
}
