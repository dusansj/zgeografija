// Dom
let score = document.querySelector("#score");

export class Hof {
  constructor() {
    this.pojmovi = db.collection("pojmovi");
  }

  getMostActive() {
    let arr = [];
    this.pojmovi
      .orderBy("korisnik", "desc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          arr.push(doc.data().korisnik);
        });

        let result = {};
        arr.forEach(function (x) {
          result[x] = (result[x] || 0) + 1;
        });
        let entries = Object.entries(result);
        entries = entries.sort(function (a, b) {
          return a[1] - b[1];
        });
        entries.reverse();
        for (let i = 0; i < 5; i++) {
          score.innerHTML += `<li>${entries[i]}</li>`;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

let winner = new Hof();
winner.getMostActive();