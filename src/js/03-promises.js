function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

// ! TEMA 3
// Select la ce ne trebuie
// submit event la o functie care sa se ocupe de generarea de
// .then de la functia createPromise (trebuie adaugata logica/ poate niste notificari ? cu Notify)
// poate un for loop in functie de nr luat din interfata de amount?

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       }
//       reject({ position, delay });
//     }, delay);
//   });
// }