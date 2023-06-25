'use strict';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formElement = document.querySelector('.form');
const delayElement = document.querySelector('input[name="delay"]');
const stepElement = document.querySelector('input[name="step"]');
const amountElement = document.querySelector('input[name="amount"]');
const submitBtn = document.querySelector('button[type="submit"]');

submitBtn.addEventListener('click', generatePromise);

function createPromise(position, delayElement) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delayElement });
      }
      reject({ position, delayElement });
    }, delayElement);
  });
}

function generatePromise(event) {
  event.preventDefault();

  let delayValue = parseInt(delayElement.value);
  let amountValue = parseInt(amountElement.value);

  for (let i = 1; i <= amountValue; i++) {
    createPromise(i, delayValue)
      .then(({ position, delayElement }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delayElement}ms`);
      })
      .catch(({ position, delayElement }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delayElement}ms`);
      });
    delayValue += parseInt(stepElement.value);
  }
}
