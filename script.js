const container = document.getElementById("quest");
const palavra = "abcd cbda↵asas↵egvbf↵";
const inputText = document.querySelector("input");
const buttonUnlessList = [
  "Control",
  "Alt",
  "AltGraph",
  "CapsLock",
  "Shift",
  "Tab",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12",
  "Enter",
  "Backspace",
  "[",
  "]",
  "Dead",
  "Metanetflix",
  "Meta",
  "Escape",
  "Delete",
  "Insert",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
];
let palavrasSPAN = [];
let wordindex = 0;
let segundos = 0;
let minutos = 0;

document.querySelector("body").onload = () => {
  for (const letra of palavra) {
    if (letra == "↵") {
      container.innerHTML += `<span>↵</span>`;
      container.innerHTML += `<br>`;
    } else {
      container.innerHTML += `<span>${letra}</span>`;
    }
  }
  palavrasSPAN.push(document.querySelectorAll("span"));
};

document.querySelector("body").onkeyup = ({ key }) => {
  if (inputText.value.length+1 == palavra.length) {
    Vencer();
  } else {
    const VerifyList = [];
    buttonUnlessList.forEach((element) => {
      if (key != element) {
        VerifyList.push(0);
      } else {
        VerifyList.push(1);
      }
    });
    if (key == "Enter") {
      inputText.value += "↵";
      palavrasSPAN[0][wordindex].style.color = "green";
      wordindex++;
    }
    if (!VerifyList.includes(1)) {
      inputText.value += key;
      if (palavrasSPAN[0][wordindex].innerText == key) {
        palavrasSPAN[0][wordindex].style.color = "green";
      } else {
        palavrasSPAN[0][wordindex].style.color = "red";
        palavrasSPAN[0][wordindex].style.backgroundColor = "yellow";
      }
      wordindex++;
    }
  }
};

function Vencer() {
  clearInterval();
  let indexString = 0;
  let erros = 0;
  while (indexString != palavra.length - 1) {
    if (inputText.value[indexString] != palavra[indexString]) {
      erros++;
    }
    indexString++;
  }
  document.getElementById("winner").hidden = false;
  document.getElementById("game").hidden = true;
  document.getElementById(
    "ErrorQ"
  ).innerText = `QUANTIDADE DE ERROS: ${erros}/${palavra.length}\nSeu tempo:${minutos}:${segundos}`;
}

function Next() {
  document.getElementById("winner").hidden = true;
  document.getElementById("game").hidden = false;
  inputText.value = "";
  for (const el of palavrasSPAN[0]) {
    el.style.color = "black";
    el.style.backgroundColor = "white";
  }
  minutos = 0;
  segundos = 0;
  palavrasSPAN = [];
  wordindex = 0;
  palavrasSPAN.push(document.querySelectorAll("span"));
}

setInterval(() => {
  segundos++;
  if (segundos == 61) {
    segundos = 0;
    minutos++;
  }
}, 1000);
