import { butTrash } from "../constants/utils.js";

export default class Card {
  constructor(data, cardSelector, handleCardClick, popupWithConfirmation, api) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._popupImage = handleCardClick;
    this._popupWithConfirmation = popupWithConfirmation;
    this._api = api;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".main__gallery-card")
      .cloneNode(true);

    return cardElement;
  }

  _like() {
    this._element
      .querySelector(".main__button_like")
      .addEventListener("click", (e) => {
        const isActive = e.target.classList.contains(
          "main__button_like_active"
        );
        
        // Si no hay ID (tarjeta local), solo cambiar el estilo sin API
        if (!this._id) {
          if (isActive) {
            e.target.classList.remove("main__button_like_active");
          } else {
            e.target.classList.add("main__button_like_active");
          }
        } else {
          // Si hay ID, usar la API
          if (isActive) {
            this._api
              .removeLike(this._id)
              .then(() => {
                e.target.classList.remove("main__button_like_active");
              })
              .catch((err) => console.error(err));
          } else {
            this._api
              .likeCard(this._id)
              .then(() => {
                e.target.classList.add("main__button_like_active");
              })
              .catch((err) => console.error(err));
          }
        }
      });
  }

  _trash() {
    const trashBtn = this._element.querySelector(".main__button_trash");
    if (!trashBtn) {
      console.error("[Card] Trash button not found");
      return;
    }
    
    // Abrir popup de confirmación al hacer clic en trash
    const handleTrashClick = () => {
      try {
        if (this._popupWithConfirmation) {
          this._popupWithConfirmation._cardToDelete = this;
          this._popupWithConfirmation.open();
        }
      } catch (err) {
        console.error("[Card] ERROR opening confirmation popup:", err);
      }
    };
    
    trashBtn.addEventListener("click", handleTrashClick, { once: false });
  }

  _handleCardClick() {
    this._element
      .querySelector(".main__gallery-image")
      .addEventListener("click", () => {
        this._popupImage.open(this._link, this._name, this);
      });
  }

  _setEventsListener() {
    this._like();
    this._trash();
    this._handleCardClick();
  }

  _isValidUrl(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }

  getCreateCard() {
    this._element = this._getTemplate();
    this._setEventsListener();

    const imgElement = this._element.querySelector(".main__gallery-image");
    
    // Usar directamente la URL del link
    if (this._isValidUrl(this._link)) {
      imgElement.src = this._link;
      imgElement.onerror = () => {
        imgElement.style.backgroundColor = "#e0e0e0";
      };
    } else {
      imgElement.src = "";
      imgElement.style.backgroundColor = "#e0e0e0";
    }
    
    imgElement.alt = this._name || "Card image";
    
    this._element.querySelector(".main__gallery-paragraph").textContent =
      this._name;

    return this._element;
  }
}
