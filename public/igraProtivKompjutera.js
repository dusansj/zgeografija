//Uvođenje globalnih promenljivih
let slovo;
let clickedT = false;
let clickedStart = false;

//Niz pojmova
let niz = ["Država", "Grad", "Reka", "Planina", "Životinja", "Biljka", "Predmet"];

//DOM elementi
let startBtn = document.querySelector("#startBtn");
let randomSlovo = document.querySelector("#slovo");
let timer = document.querySelector("#timer");
let gameForm = document.querySelector("#gameForm");
let btnConfirm = document.querySelector("#btnConfirm");
let drzava = document.querySelector("#drzava");
let grad = document.querySelector("#grad");
let reka = document.querySelector("#reka");
let planina = document.querySelector("#planina");
let zivotinja = document.querySelector("#zivotinja");
let biljka = document.querySelector("#biljka");
let predmet = document.querySelector("#predmet");
let ukupanRezultat = document.querySelector("#ukupanRezultat");
let resultUser = document.querySelector("#resultUser");
let resultComp = document.querySelector("#resultComp");
let poeni = document.querySelector("#poeni");

//Korisnik
let pU0 = document.querySelector("#pU0");
let pU1 = document.querySelector("#pU1");
let pU2 = document.querySelector("#pU2");
let pU3 = document.querySelector("#pU3");
let pU4 = document.querySelector("#pU4");
let pU5 = document.querySelector("#pU5");
let pU6 = document.querySelector("#pU6");

//Kompjuter
let pC0 = document.querySelector("#pC0");
let pC1 = document.querySelector("#pC1");
let pC2 = document.querySelector("#pC2");
let pC3 = document.querySelector("#pC3");
let pC4 = document.querySelector("#pC4");
let pC5 = document.querySelector("#pC5");
let pC6 = document.querySelector("#pC6");

let ukupnoPoenaUser = document.querySelector("#ukupnoPoenaUser");
let ukupnoPoenaComp = document.querySelector("#ukupnoPoenaComp");
let ukupnoP = document.querySelector("#ukupnoP");
let pobednik = document.querySelector("#pobednik");
let novaigra = document.querySelector("#novaigra");
//
let proba = document.querySelector("#proba");

//Konekcija sa bazom
this.pojmovi = db.collection("pojmovi");

//Randomajzer slova
let getRandomLetter = () => {
    // let abeceda = ["A", "B", "C", "Č", "Ć", "D", "Dž", "Đ", "E", "F", "G", "H", "I", "J", "K",
    //                 "L", "Lj", "M", "N", "Nj", "O", "P", "R", "S", "Š", "T", "U", "V", "Z", "Ž"];
    let abeceda = ["A"];

    const randomLetter = abeceda[Math.floor(Math.random() * abeceda.length)];
    return randomLetter;
};

//Pokretanje tajmera
let startTimer = (duration, display) => {
    let timer = duration;
    let clock = setInterval( () => {
        if (timer < 0 || clickedT) {
            clearInterval(clock);
            timer = 0;
            btnConfirm.click();
        }
        let seconds = parseInt(timer, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = seconds;
        timer--;
    }, 1000);
};

//Generisanje slova
let showLetter = () => {
    let animateLetter = setInterval( () => {
        randomSlovo.innerHTML = getRandomLetter();
        slovo = randomSlovo.textContent;
        localStorage.setItem("slovo", randomSlovo.textContent);
    }, 100);
    setTimeout( () => {
        clearInterval(animateLetter);
    }, 3000);
    setTimeout( () => {
        startTimer(60, timer);
    }, 3000);
};

//Provera slova
let checkLetter = (elem) => {
    elem.addEventListner("keyup", (e) => {
        let unos1 = e.target.value;
        let regExpLetter = new RegExp([`^${slovo}`], "i");
        if (regExpLetter.test(unos1)) {
            elem.style.backgroundColor = "greenyellow";
        }
        else if (unos1 == "") {
            elem.style.backgroundColor = "none";
        }
        else {
            elem.style.backgroundColor = "orange";
        }
    });
};

//Odgovori korisnika
let getUserAnswers = () => {
    let a1 = drzava.value;
    let a2 = grad.value;
    let a3 = reka.value;
    let a4 = planina.value;
    let a5 = zivotinja.value;
    let a6 = biljka.value;
    let a7 = predmet.value;
    let uAnswers = [a1, a2, a3, a4, a5, a6, a7];
    return uAnswers;
};

let makeList = (answ, targetEl) => {
    let q = ["Država", "Grad", "Reka", "Planina", "Životinja", "Biljka", "Predmet"];
    for (let i = 0; i < 7; i++) {
        if (answ[i] != "") {
            targetEl.innerHTML += `<li>${q[i]} - ${answ[i]}</li>`;
        }
        else {
            targetEl.innerHTML += `<li>${q[i]} - nema odgovora</li>`;
        }
    } 
};

//stampanje odgovora - niz pojmova iz 7. linije
let printUserAnswers = (niz) => {
    let uAnswers = niz;
    makeList(uAnswers, resultUser);
    resultUser.style.display = "inline-block";
};

let printPointsLi = (targetHtmlLi, ul, cl) => {
    if (ul !== " " && cl === " ") {
        targetHtmlLi.innerHTML += `15:0`;
    }
    else if (ul === " " && cl !== " ") {
        targetHtmlLi.innerHTML += `15:0`;
    }
    else if (ul === " " && cl === " ") {
        targetHtmlLi.innerHTML += `0:0`;
    }
    else if (ul === cl) {
        targetHtmlLi.innerHTML += `5:5`;
    }
    else if (ul !== " " && ul !== cl && cl!== " ") {
        targetHtmlLi.innerHTML += `10:10`;
    }
};

let random = (niz) => {
    let x = Math.floor(Math.random() * niz.length);
    return niz[x];
}

// let compareRes = () => {
//     let l = localStorage.getItem("slovo");
//     let userInputs = getUserAnswers();
//     let computerAnswers = [];
//     let pointU = [pU0, pU1, pU2, pU3, pU4, pU5, pU6];
//     let pointC = [pC0, pC1, pC2, pC3, pC4, pC5, pC6];
//     let pUser = 0;
//     let pComp = 0;
//     for (let i = 0; i < 7; i++) {
//         this.pojmovi
//             .where("kategorija", "==", niz[i])
//             .where("pocetnoSlovo", "==", l)
//             .get()
//             .then((snapshot) => {
//                 let tmp = [];
//                 snapshot.forEach((doc) => {
//                     tmp.push(doc.data().pojam);
//                 });

//                 let term = random(tmp);
//                 if (Math.random() < 0.8) {
//                     computerAnswers.push(term);
//                     resultComp.innerHTML += `<li>${niz[i]} - ${term}</li>`;
//                 }
//                 else {
//                     computerAnswers.push("");
//                     resultComp.innerHTML += `<li>${niz[i]} - Nema odgovora!</li>`;
//                 }
//             });
//             //
//         this.pojmovi
//             .where("kategorija", "==", niz[i])
//             .where("pocetnoSlovo", "==", l)
//             .get()
//             .then((snapshot) => {
//                 let prisutan = false;
//                 snapshot.forEach((doc) => {
//                     if (doc.data().pojam == userInputs[i]) {
//                         console.log(`${userInputs[i]} postoji u bazi!`);
//                         console.log(`${computerAnswers[i]}`);
//                         prisutan = true;
//                     }
//                 });
//                 if (prisutan) {
//                     if (!computerAnswers[i]) {
//                         pointU[i].innerHTML = 15;
//                         pUser += 15;
//                         pointC[i].innerHTML = 0;
//                     }
//                     else if (userInputs[i] == computerAnswers [i]) {
//                         pointU[i].innerHTML = 5;
//                         pUser += 5;
//                         pointC[i].innerHTML = 5;
//                         pComp += 5;
//                     }
//                     else if ((userInputs[i] != computerAnswers[i] && computerAnswers[i] != "") || undefined) {
//                         pointU[i].innerHTML = 10;
//                         pUser += 10;
//                         pointsC[i].innerHTML = 10;
//                         pComp += 10;
//                     }
//                     else {
//                         if (computerAnswers[i]) {
//                             pointU[i].innerHTML = 0;
//                             pointC[i].innerHTML = 15;
//                             pComp += 15;
//                         }
//                         else {
//                             pointU[i].innerHTML = 0;
//                             pointC[i].innerHTML = 0;
//                         }
//                     }
//                     ukupnoPoenaUser.innerHTML = pUser;
//                     ukupnoPoenaComp.innerHTML = pComp;
//                     if (pComp > pUser) {
//                         pobednik.innerHTML = "Kompjuter je pobednik!";
//                     }
//                     else if (pComp < pUser) {
//                         pobednik.innerHTML = "Igrač je pobedio!"
//                     }
//                     else {
//                         ponednik.innerHTML = "Nerešen rezultat!"
//                     }
//                 }
//             });
//     }
    
//     console.log(computerAnswers);
//     printUserAnswers(userInputs);
// };

let compareRes = () => {
    let l = localStorage.getItem("slovo");
    let userInputs = getUserAnswers();
    let computerAnswers = [];
    let pointU = [pU0, pU1, pU2, pU3, pU4, pU5, pU6];
    let pointC = [pC0, pC1, pC2, pC3, pC4, pC5, pC6];
    let pUser = 0;
    let pComp = 0;
  
    for (let i = 0; i < 7; i++) {
      this.pojmovi
        .where("kategorija", "==", niz[i])
        .where("pocetnoSlovo", "==", l)
        .get()
        .then((snapshot) => {
          let tmp = [];
          snapshot.forEach((doc) => {
            tmp.push(doc.data().pojam);
          });
  
          let term = random(tmp);
          if (Math.random() < 0.8) {
            computerAnswers.push(term);
            resultComp.innerHTML += `<li>${niz[i]} - ${term}</li>`;
          } else {
            computerAnswers.push("");
            resultComp.innerHTML += `<li>${niz[i]} - Nema odgovora!</li>`;
          }
        });
  
      //
  
      //
  
      this.pojmovi
        .where("kategorija", "==", niz[i])
        .where("pocetnoSlovo", "==", l)
        .get()
        .then((snapshot) => {
          let prisutan = false;
          snapshot.forEach((doc) => {
            if (doc.data().pojam == userInputs[i]) {
              console.log(`${userInputs[i]} postoji u bazi!`);
              console.log(`${computerAnswers[i]}`);
              prisutan = true;
            }
          });
          if (prisutan) {
            if (!computerAnswers[i]) {
              pointU[i].innerHTML = 15;
              pUser += 15;
              pointC[i].innerHTML = 0;
            } else if (userInputs[i] == computerAnswers[i]) {
              pointU[i].innerHTML = 5;
              pUser += 5;
              pointC[i].innerHTML = 5;
              pComp += 5;
            } else if (
              (userInputs[i] != computerAnswers[i] && computerAnswers[i] != "") ||
              undefined
            ) {
              pointU[i].innerHTML = 10;
              pUser += 10;
              pointC[i].innerHTML = 10;
              pComp += 10;
            }
          } else {
            
            if (computerAnswers[i]) {
              pointU[i].innerHTML = 0;
              pointC[i].innerHTML = 15;
              pComp += 15;
            } else {
              pointU[i].innerHTML = 0;
              pointC[i].innerHTML = 0;
            }
          }
          ukupnoPoenaUser.innerHTML = pUser;
          ukupnoPoenaComp.innerHTML = pComp;
          if (pComp > pUser) {
            pobednik.innerHTML = "Kompjuter je pobednik!";
          } else if (pComp < pUser) {
            pobednik.innerHTML = "Igrač je pobednik!";
          } else {
            pobednik.innerHTML = "Nerešen rezultat!";
          }
        });
    }
  
    console.log(computerAnswers);
    printUserAnswers(userInputs);
  };


startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
  
    if (!clickedStart) {
      showLetter();
      randomSlovo.style.display = "inline-block";
      gameForm.style.display = "block";
      setTimeout(() => {
        timer.style.display = "inline-block";
  
        drzava.placeholder = randomSlovo.textContent;
        grad.placeholder = randomSlovo.textContent;
        reka.placeholder = randomSlovo.textContent;
        planina.placeholder = randomSlovo.textContent;
        zivotinja.placeholder = randomSlovo.textContent;
        biljka.placeholder = randomSlovo.textContent;
        predmet.placeholder = randomSlovo.textContent;
  
        checkLetter(drzava);
        checkLetter(grad);
        checkLetter(reka);
        checkLetter(planina);
        checkLetter(zivotinja);
        checkLetter(biljka);
        checkLetter(predmet);
      }, 3500);
    }
    clickedStart = true;
  });
  
  gameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!clickedT) {
      gameForm.style.display = "none";
      novaigra.style.display = "inline-block";
      poeniU.style.display = "inline-block";
      poeniC.style.display = "inline-block";
      resultComp.style.display = "inline-block";
      ukupnoP.style.display = "block";
      pobednik.style.display = "inline-block";
      compareRes();
    }
    clickedT = true;
  });
  
  novaigra.addEventListener("click", () => {
    location.reload();
    localStorage.removeItem("slovo");
  });
  