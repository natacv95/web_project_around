import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormCard from "../components/FormCard.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  popup,
  popimage,
  poptxt,
  gallery,
  validationConfig,
  formElements,
  formValidators,
  paragName,
  paragAbout,
  profImg,
  saveChangeEdit,
  saveCard,
  edClass,
  addClass,
  butEdit,
  butAdd,
  butImg,
  saveImgProfile,
  imgClass,
  openEditAdd,
  inpTitle,
  inpImg,
  popButAdd,
  popButEdit,
  popButImg,
} from "../constants/utils.js";

export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "8dc55ea1-4d52-4586-8203-01d2d9a48ea4",
  },
});

export const popupFormEdit = new PopupWithForm(popup, edClass, () => {
  saveChangeEdit(inpName.value, inpAbout.value);
});

export const popupFormAdd = new PopupWithForm(popup, addClass, () => {
  const titleValue = inpTitle.value;
  const linkValue = inpImg.value;
  const cardData = { name: titleValue, link: linkValue };
  api
    .addCard(cardData)
    .then((res) => {
      popButAdd.textContent = "Guardando...";
      sectionFormCard.addItem(sectionFormCard._renderer(res));
    })
    .catch((err) => {
      popButAdd.textContent = err;
    });
};

export const formInfoEdit = (nameValue, aboutValue) => {
  api
    .editUserInfo({ name: nameValue, about: aboutValue })
    .then((data) => {
      console.log(data);
      popButEdit.textContent = "Guardando...";
      usInfo.setUserInfo({ name: data.name, job: data.about });
    })
    .catch((err) => {
      popButEdit.textContent = err;
    });
};

export const formImgSave = (avatarValue) => {
  api
    .updateAvatar({ avatar: avatarValue })
    .then((data) => {
      popButImg.textContent = "Guardando...";
      usInfo.setAvatar({ avatar: data.avatar });
    })
    .catch((err) => {
      popButImg.textContent = err;
    });
};

const apiInstance = api;
const usInfo = new UserInfo({ nameSelector: ".main__paragraph_name", jobSelector: ".main__paragraph_job", avatarSelector: ".main__profile-image" });

const sectionFormCard = new Section((item) => {
  const card = new Card(item, "#card-template", (name, link) => {
    popupImage.open(name, link);
  });
  return card.generate();
}, ".main__gallery");

const popupImage = new PopupWithImage(popimag, poptxt);

formElements.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
  formValidators.push(formValidator);
});

if (butEdit) butEdit.addEventListener("click", (e) => openEditAdd(e, openPop));
if (butAdd) butAdd.addEventListener("click", (e) => openEditAdd(e, openPop));
if (butImg) butImg.addEventListener("click", (e) => openEditAdd(e, openPop));

document.addEventListener("keydown", (e) => {
  const target = e.target;
  const formList = target && target.classList ? target.classList : new DOMTokenList();
  if (e.key === "Enter" && formList.contains("form-edit")) {
    saveChangeEdit();
  } else if (e.key === "Enter" && formList.contains("form-add")) {
    saveCard();
  } else if (e.key === "Enter" && formList.contains("form-img")) {
    saveImgProfile();
  }
});
