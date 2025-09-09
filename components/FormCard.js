import Card from "../components/Card.js";

export default class FormCard extends Card {
  constructor(cardSelector, handleCardClick, handleCardDelete, api) {
    super({}, cardSelector, handleCardClick, handleCardDelete, api);
  }

  handleCreateCard(link, title, id) {
    this._name = title;
    this._link = link;
    this._id = id;
  }
}
