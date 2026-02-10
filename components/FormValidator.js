export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
    // clear any custom validity previously set
    inputElement.setCustomValidity("");
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      const message = this._getErrorMessage(inputElement);
      // set custom validity so input.validationMessage returns our Spanish message
      inputElement.setCustomValidity(message);
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // clear custom validity and hide error
      inputElement.setCustomValidity("");
      this._hideInputError(inputElement);
    }
  }

  _getErrorMessage(inputElement) {
    const v = inputElement.validity;
    const name = inputElement.getAttribute('aria-label') || inputElement.placeholder || inputElement.name || 'Campo';

    if (v.valueMissing) return 'Este campo es obligatorio.';
    if (v.tooShort) return `Debe contener al menos ${inputElement.getAttribute('minlength')} caracteres.`;
    if (v.tooLong) return `Debe contener como máximo ${inputElement.getAttribute('maxlength')} caracteres.`;
    if (v.typeMismatch) {
      if (inputElement.type === 'url') return 'Por favor, introduce una URL válida.';
      return 'El valor no tiene el formato correcto.';
    }
    if (v.patternMismatch) return 'El valor no coincide con el formato esperado.';
    // fallback
    return 'Entrada no válida.';
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "");
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}
