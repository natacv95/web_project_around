import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleFormSubmit) {
    super(popupSelector);

    // ✅ ahora this._popup EXISTE
    this._form = this._popup.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit;

    // bind submit handler so we can add/remove it reliably
    this._submitHandler = this._submitHandler.bind(this);
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll(".popup__input");
    const values = {};

    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    // ensure base listeners are set
    super.setEventListeners();
    // add submit listener once
    this.addEventListeners();
  }

  addEventListeners() {
    // add parent listeners (close/overlay)
    super.addEventListeners && super.addEventListeners();
    if (!this._form) return;
    if (this._formListenerAdded) return;
    this._form.addEventListener("submit", this._submitHandler);
    this._formListenerAdded = true;
  }

  removeEventListeners() {
    if (this._form && this._formListenerAdded) {
      this._form.removeEventListener("submit", this._submitHandler);
      this._formListenerAdded = false;
    }
    super.removeEventListeners && super.removeEventListeners();
  }

  close() {
    // remove submit listener when closing to avoid duplicates
    this.removeEventListeners();

    super.close();
    this._form.reset();
  }
}
