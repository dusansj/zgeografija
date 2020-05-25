export class Term {
  constructor(u, k, p) {
    this.username = u;
    this.kategorija = k;
    this.pojam = p;
    this.pojmovi = db.collection("pojmovi");
  }

  set username(u) {
    this._username = u;
  }

  set kategorija(k) {
    this._kategorija = k;
  }

  set pojam(p) {
    this._pojam = p;
  }

  get username() {
    return this._username;
  }

  get kategorija() {
    return this._kategorija;
  }

  get pojam() {
    return this._pojam;
  }

async addTerm(term) {
    let dateTmp = new Date();

   let dokument = {
    pocetnoSlovo: term.slice(0, 1),
    pojam: term,
    kategorija: this.kategorija,
    korisnik: this.username,
    vreme: firebase.firestore.Timestamp.fromDate(dateTmp),
 };

    //Dodamo dokument promenljivoj koja je povukla celu kolekciju iz base
    let response = await this.pojmovi.add(dokument);
    return response;
  }

  checkAddTerms() {
    this.pojmovi
      .where("kategorija", "==", this.kategorija)
      .where("pojam", "==", this.pojam)
      .get()
      .then((snapshot) => {
        if (snapshot.docs.length == 0) {
          this.addTerm(this.pojam);
          info.innerHTML = "Pojam je uspešno unet!";
          setTimeout(() => {
            info.innerHTML = "";
          }, 3000);
        } else {
          info.innerHTML = "<p class='infoBackground'>Pojam već postoji! Unesi neki drugi pojam!</p>";
          setTimeout(() => {
            info.innerHTML = "";
          }, 3000);
        }
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }
}
