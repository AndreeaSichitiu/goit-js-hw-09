'use strict';
// Scrie un script care, după apăsarea butonului «Start», o dată pe secundă schimbă culoarea de fundal a lui <body> la o valoare aleatorie
// folosind stilul inline. La click-ul butonului «Stop», schimbarea culorii de fundal se va opri.
// Butonul «Start» poate fi apăsat de un număr infinit de ori. Fă astfel încât, în timp ce schimbarea culorii
//  de fundal este activată, butonul «Start» să fie dezactivat (disabled).

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

stopButton.disabled = true;
 

startButton.addEventListener('click', colorChange);
stopButton.addEventListener('click', stopColorChange);

 
let colorChangeInterval = setInterval(colorChange, 1000);

function colorChange() {
    document.body.style.backgroundColor = getRandomHexColor();
    startButton.disabled = true;
    stopButton.disabled = false;
};

function stopColorChange() {
  clearInterval(colorChangeInterval);
  stopButton.disabled = true;
  startButton.disabled = false;
};
 