export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = nameSelector;
    this._job = jobSelector;
    this._avatar = avatarSelector;
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src,
    };
  }
  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
  setAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
