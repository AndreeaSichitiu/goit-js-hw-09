// 1. inserare librarii
// 2. aducem clasele folosite din html
// 3. dezactivare buton start
// 4. folosire librarie flatpikr
// 5. optiuni: daca se alege data din trecut atunci folosire librarie Notify si butonul start este dezactivat//daca se alege data din viitor se initializeaza functia 
// countdown, butonul se start este activ, se adauga eventlistener si in timpul countdown alegerea datei este dezactivata.
// 6. ?? cand diferenta ajunge la 0 se afiseaza mesaj Countdown over
// 7. formatarea orei
 

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start');
const day = document.querySelector('span[data-days]');
const hour = document.querySelector('span[data-hours]');
const minute = document.querySelector('span[data-minutes]');
const second = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const startDate = Date.now();

    if (selectedDate < startDate) {
      Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
      return;
    }

    startBtn.disabled = false;

    startBtn.addEventListener('click', startCountdown);

    function startCountdown() {
      startBtn.disabled = true;
      datetimePicker.disabled = true;
      intervalId = setInterval(() => {
        const currentDate = Date.now();

        if (selectedDate < currentDate) {
          Notify.success('Final Countdown');
          clearInterval(intervalId);
          datetimePicker.disabled = false;
          return;
        }

        const timeDifference = selectedDate - currentDate;
        const { days, hours, minutes, seconds } = convertMs(timeDifference);

        day.textContent = addLeadingZero(days);
        hour.textContent = addLeadingZero(hours);
        minute.textContent = addLeadingZero(minutes);
        second.textContent = addLeadingZero(seconds);
      }, 1000);
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
