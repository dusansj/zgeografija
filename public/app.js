import { Term } from "./terms.js";
import { Korisnik } from "./korisnik.js";

//DOM Elementi
let liElPojam = document.querySelector("#terms");
let lihof = document.querySelector("#hof");
let formUsername = document.querySelector("#formUsername");
let inputUsername = document.querySelector("#inputUsername");
let hi = document.querySelector("#hi");
let formTerm = document.querySelector("#formTerm");
let selectCateg = document.querySelector("#selectCateg");
let inputTerm = document.querySelector("#inputTerm");
let info = document.querySelector("#info");

let pozdravUser = () => {
  let ime;
  let tekst;
  if (localStorage.username) {
    ime = localStorage.getItem("username");
    tekst = `Korisnik: ${ime}`;
    hi.innerHTML = tekst;
  } else {
    hi.innerHTML = "";
  }
};

let checkUser = () => {
  if (!localStorage.username) {
    liElPojam.classList.add("disabled");
    lihof.classList.add("disabled");
  }
};

let username = () => {
  if (localStorage.username) {
    return localStorage.username;
  }
};

checkUser();
pozdravUser();

let user = new Korisnik(username());

if (formUsername) {
  formUsername.addEventListener("submit", (e) => {
    e.preventDefault();
    let newUsername = inputUsername.value;
    user.updateUsername(newUsername);
    formUsername.reset();
    //location.reload();
    location.href = "terms.html"
  });
}
//Validacija upisa
let validFunc = (str) => {
  let regExp1 = /[\s]/gi;
  let regExp2 = /[^šđčćž\w]/gi;
  let regExp3 = /[_]/g;
  let edF = str
    .replace(regExp1, "")
    .toLowerCase()
    .replace(regExp2, "")
    .replace(regExp3, "");
  let final = edF.charAt(0).toUpperCase() + edF.slice(1);
  return final;
};

// Slanje novog pojma
if (formTerm) {
  formTerm.addEventListener("submit", (e) => {
    e.preventDefault();
    let kategorija = selectCateg.value;
    let textTerm = inputTerm.value;
    textTerm = validFunc(textTerm);
    let trm = new Term(username(), kategorija, textTerm);
    trm.checkAddTerms();
    formTerm.reset();
  });
}

