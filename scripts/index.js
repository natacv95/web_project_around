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
  inpName,
  inpAbout,
  popup,
  popimag,
  poptxt,
  gallery,
  validationConfig,
  formElements,
  formValidators,
  paragName,
  paragAbout,
  profImg,
  edClass,
  addClass,
  butEdit,
  butAdd,
  butImg,
  butTrash,
  imgClass,
  openEditAdd,
  inpTitle,
  inpUrl,
  inpImg,
  popButAdd,
  popButEdit,
  popButImg,
  inpImgProfile,
  initialCards,
} from "../constants/utils.js";



export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "8dc55ea1-4d52-4586-8203-01d2d9a48ea4",
  },
});

export const popupFormEdit = new PopupWithForm(
  ".popup",
  edClass,
  () => {
    saveChangeEdit(inpName.value, inpAbout.value);
  }
);
popupFormEdit.setEventListeners();

export const popupFormAdd = new PopupWithForm(
  ".popup",
  addClass,
  () => {
    const titleValue = inpTitle.value;
    const linkValue = inpUrl.value;

    popButAdd.textContent = "Guardando...";

    api.addCard({ name: titleValue, link: linkValue })
      .then((res) => {
        // Renderizar la tarjeta usando el mismo método que renderItems
        const card = new Card(
          res,
          "#main__template",
          popupImage,
          popupWithConfirmation,
          api
        );
        sectionFormCard.addItem(card.getCreateCard());
        popupFormAdd.close();
      })
      .catch((err) => {
        console.error("Error agregando tarjeta:", err);
        popButAdd.textContent = "Error";
      })
      .finally(() => {
        popButAdd.textContent = "Guardar";
      });
  }
);
popupFormAdd.setEventListeners();


export const popupFormImg = new PopupWithForm(
  ".popup",
  imgClass,
  () => {
    formImgSave(inpImg.value);
  }
);
popupFormImg.setEventListeners();


export const formInfoEdit = (nameValue, aboutValue) => {
  api
    .setUserInfo(nameValue, aboutValue)
    .then((data) => {
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

const usInfo = new UserInfo({
  nameSelector: ".main__paragraph_name",
  jobSelector: ".main__paragraph_job",
  avatarSelector: ".main__profile-image",
});

const popupWithConfirmation = new PopupWithConfirmation(
  ".popup"
);

const popupImage = new PopupWithImage(".popup", popupWithConfirmation);
popupImage.setEventListeners();


const sectionFormCard = new Section(
  {
    item: [],
    renderer: (item) => {
      const card = new Card(
        item,
        "#main__template",
        popupImage,
        popupWithConfirmation,
        api
      );
      sectionFormCard.addItem(card.getCreateCard());
    },
  },
  ".main__gallery"
);

// Oculta todos los contenidos internos del popup (forms, imagen, trash)
function hideAllPopupContent() {
  const modal = popup;
  if (!modal) return;
  // hide forms, single image element and caption, and trash/confirmation
  const items = modal.querySelectorAll('.popup__form, .popup__image, .popup__paragraph, .popup__paragraph-content, .popup__trash');
  items.forEach((it) => it.classList.add('popup__item-hidden'));
}


const saveChangeEdit = (nameValue, aboutValue) => {
  popButEdit.textContent = "Guardando...";
  api
    .setUserInfo(nameValue, aboutValue)
    .then((data) => {
      usInfo.setUserInfo({ name: data.name, job: data.about });
      // close the edit popup and reset form validation
      try {
        popupFormEdit.close();
      } catch (e) {}
      const form = popup.querySelector(edClass);
      const validator = formValidators.find((v) => v._formElement === form);
      if (validator) validator.resetValidation();
    })
    .catch(console.error)
    .finally(() => {
      popButEdit.textContent = "Guardar";
    });
};

const saveCard = () => {
  const titleValue = inpTitle.value;
  const linkValue = inpUrl.value;

  api.addCard({ name: titleValue, link: linkValue })
    .then((card) => {
      // Renderizar la tarjeta usando el mismo método que renderItems
      const cardElement = new Card(
        card,
        "#main__template",
        popupImage,
        popupWithConfirmation,
        api
      );
      sectionFormCard.addItem(cardElement.getCreateCard());
    })
    .catch(console.error);
};

const saveImgProfile = () => {
  api.updateAvatar({ avatar: inpImgProfile.value })
    .then((data) => {
      usInfo.setAvatar({ avatar: data.avatar });
    })
    .catch(console.error);
};





formElements.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
  formValidators.push(formValidator);
});


if (butEdit) {
  butEdit.addEventListener("click", () => {
    hideAllPopupContent();
    const form = popup.querySelector(edClass);
    if (form) form.classList.remove('popup__item-hidden');
    // prefill with current user info
    const userData = usInfo.getUserInfo();
    if (userData) {
      inpName.value = userData.name || '';
      inpAbout.value = userData.job || '';
    }
    // reset validation for this form if available
    const validator = formValidators.find(v => v._formElement === form);
    if (validator) validator.resetValidation();
    popupFormEdit.open();
  });
}

if (butAdd) {
  butAdd.addEventListener("click", () => {
    hideAllPopupContent();
    const form = popup.querySelector(addClass);
    if (form) form.classList.remove('popup__item-hidden');
    popupFormAdd.open();
  });
}

if (butImg) {
  butImg.addEventListener("click", () => {
    hideAllPopupContent();
    const form = popup.querySelector(imgClass);
    if (form) form.classList.remove('popup__item-hidden');
    popupFormImg.open();
  });
}
//if (butEdit) butEdit.addEventListener("click", (e) => openEditAdd(e, openPop));
//if (butAdd) butAdd.addEventListener("click", (e) => openEditAdd(e, openPop));
//if (butImg) butImg.addEventListener("click", (e) => openEditAdd(e, openPop));

document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;

  const form = e.target.closest("form");
  if (!form) return;

  if (form.classList.contains("form-edit")) {
    formInfoEdit(inpName.value, inpAbout.value);
  }

  if (form.classList.contains("form-add")) {
    saveCard();
  }

  if (form.classList.contains("form-img")) {
    saveImgProfile();
  }
});

// Cargar tarjetas iniciales (estáticas locales)
sectionFormCard.renderItems(initialCards);

// Cargar información del usuario desde el API
api.getUserInfo()
  .then((userData) => {
    usInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });

    usInfo.setAvatar({ avatar: userData.avatar });
  })
  .catch((err) => {
    console.error("Error cargando datos del usuario:", err);
  });
