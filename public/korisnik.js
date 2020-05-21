export class Korisnik {
  constructor(u) {
    this.username = u;
  }

  set username(u) {
    this._username = u;
  }

  get username() {
    return this._username;
  }

  // Promena korisnickog imena
  updateUsername(newUser) {
    this.username = newUser;
    localStorage.setItem("username", newUser);
  }
}
