import FormValidator from "../components/FormValidator.js";

// enableValidation(config, formValidatorsArray)
// Config object must contain selectors and class names as specified in the project.
export function enableValidation(config, formValidatorsArray) {
  const { formSelector } = config;
  const formElements = Array.from(document.querySelectorAll(formSelector));

  formElements.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    validator.enableValidation();
    if (Array.isArray(formValidatorsArray)) formValidatorsArray.push(validator);
  });
}

export function resetValidationForPopup(popupElement, config, formValidatorsArray) {
  const forms = popupElement.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    form.reset();
    const validator = formValidatorsArray.find((v) => v._formElement === form);
    if (validator) validator.resetValidation();
  });
}
