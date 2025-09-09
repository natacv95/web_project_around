import { butTrash } from "../constants/utils.js";

export default class Card {
  constructor(data, cardSelector, handleCardClick, handleCardDelete, api) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._popupImage = handleCardClick;
    this._handleCardDelete = handleCardDelete;
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
        if (isActive) {
          this._api
            .removeLike(this._id)
            .then(() => {
              e.target.classList.remove("main__button_like_active");
            })
            .catch((err) => console.log(err));
        } else {
          this._api
            .likeCard(this._id)
            .then(() => {
              e.target.classList.add("main__button_like_active");
            })
            .catch((err) => console.log(err));
        }
      });
  }

  _trash() {
    this._element
      .querySelector(".main__button_trash")
      .addEventListener("click", () => {
        this._handleCardDelete.open();
        butTrash.addEventListener(
          "click",
          () => {
            this._api
              .removeCard(this._id)
              .then(() => {
                butTrash.textContent = "Eliminando...";
                this._element.remove();
                this._handleCardDelete.close();
              })
              .catch((err) => (butTrash.textContent = err));
          },
          { once: true }
        );
      });
  }

  _handleCardClick() {
    this._element
      .querySelector(".main__gallery-image")
      .addEventListener("click", () => {
        this._popupImage.open(this._link, this._name);
      });
  }

  _setEventsListener() {
    this._like();
    this._trash();
    this._handleCardClick();
  }

  getCreateCard() {
    this._element = this._getTemplate();
    this._setEventsListener();

    this._element.querySelector(".main__gallery-image").src = this._link;
    this._element.querySelector(".main__gallery-image").alt = this._link;
    this._element.querySelector(".main__gallery-paragraph").textContent =
      this._name;

    return this._element;
  }
}
