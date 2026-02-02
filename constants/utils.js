export const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];

export const edClass = ".form-edit";
export const addClass = ".form-add";
export const imgClass = ".form-img";
export const popButImg = document.querySelector(".popup__button_img");
export const popButAdd = document.querySelector(".popup__button_add");
export const popButEdit = document.querySelector(".popup__button_save");
export const butEdit = document.querySelector(".main__button_edit");
export const butAdd = document.querySelector(".main__button_add");
export const butImg = document.querySelector(".main__button_img");
export const butTrash = document.querySelector(".popup__button_trash");
export const butClose = document.querySelector(".popup__button_close");
export const popup = document.querySelector(".popup");
export const formEd = document.querySelector(edClass);
export const formAdd = document.querySelector(addClass);
export const formImg = document.querySelector(imgClass);
export const popimg = document.querySelector(".popup");
export const popTrash = document.querySelector(".popup__trash");
export const paragName = document.querySelector(".main__paragraph_name");
export const paragAbout = document.querySelector(".main__paragraph_job");
export const profImg = document.querySelector(".main__profile-image");
export const inpName = document.querySelector(".popup__input_name");
export const inpAbout = document.querySelector(".popup__input_about");
export const inpTitle = document.querySelector(".popup__input_title");
export const inpUrl = document.querySelector(".popup__input_url");
export const inpImg = document.querySelector(".popup__input_img");
export const popimag = popimg
  ? popimg.querySelector(".popup__image")
  : null;
export const poptxt = popimg
  ? popimg.querySelector(".popup__paragraph")
  : null;
export const inpImgProfile = document.querySelector(".popup__input_img_profile");
export const gallery = ".main__gallery";
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const { formSelector } = validationConfig;
export const formElements = document.querySelectorAll(formSelector);
export const formValidators = [];

export const openEditAdd = (e, openPop) => {
  const butClass = e.target.classList;
  if (butClass.contains("main__button_edit")) {
    openPop.open();
    formAdd.classList.toggle("popup__item-hidden");
    if (popimag) popimag.classList.toggle("popup__item-hidden");
    if (poptxt) poptxt.classList.toggle("popup__item-hidden");
    formImg.classList.toggle("popup__item-hidden");
    popTrash.classList.toggle("popup__item-hidden");
    const userData = usInfo.getUserInfo();
    inpName.value = userData.name;
    inpAbout.value = userData.job;
    formValidators.forEach((validator) => {
      if (validator._formElement === formEd) {
        validator.resetValidation();
      }
    });
  } else if (butClass.contains("main__button_add")) {
    openPop.open();
    formEd.classList.toggle("popup__item-hidden");
    if (popimag) popimag.classList.toggle("popup__item-hidden");
    if (poptxt) poptxt.classList.toggle("popup__item-hidden");
    formImg.classList.toggle("popup__item-hidden");
    popTrash.classList.toggle("popup__item-hidden");
  } else if (butClass.contains("main__button_img")) {
    openPop.open();
    formEd.classList.toggle("popup__item-hidden");
    if (popimag) popimag.classList.toggle("popup__item-hidden");
    if (poptxt) poptxt.classList.toggle("popup__item-hidden");
    formAdd.classList.toggle("popup__item-hidden");
    popTrash.classList.toggle("popup__item-hidden");
  }
};

export const closePop = () => {
  setTimeout(() => {
    popup.classList.remove("popup_opened");
    if (popimag) popimag.classList.remove("popup__item-hidden");
    if (poptxt) poptxt.classList.remove("popup__item-hidden");
    formAdd.classList.remove("popup__item-hidden");
    formEd.classList.remove("popup__item-hidden");
    formImg.classList.remove("popup__item-hidden");
    popTrash.classList.remove("popup__item-hidden");
    popButAdd.textContent = "Guardar";
    popButEdit.textContent = "Guardar";
    popButImg.textContent = "Guardar";
    butTrash.textContent = "Si";
    resetFormAndValidation(popup);
  }, 1500);
};



const resetFormAndValidation = (modal) => {
  const formElements = modal.querySelectorAll(validationConfig.formSelector);
  formElements.forEach((formElement) => {
    formElement.reset();
    const formValidator = formValidators.find(
      (validator) => validator._formElement === formElement
    );
    if (formValidator) {
      formValidator.resetValidation();
    }
  });
};


