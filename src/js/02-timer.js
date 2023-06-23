// // 1 identificare in html a claselor folosite
// // 2 inserare librarie pentru calendar si executarea functiei
// // 3 foloseste alert in caz ca a ales o data in trecut pt a alege o data valida // libraria notiflix - butonul start este inactiv pana se alege o data valida
// // 4 cand se apasa start (eventlistener) se executa functia de countdown
 
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector("button[data-start");
const timer = document.querySelector(".timer");
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

 
startBtn.disabled = true;
flatpickr("datetimePicker", options);
 

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const startTime = Date.now();
  
      if (selectedDate < startTime) {
        Notify.failure('Please choose a date in the future');
        startBtn.disabled = true;
        return;
      };
      
      startBtn.disabled = false;
      let intervalId = null;
  
      startBtn.addEventListener('click', startCountdown);
  
      function startCountdown() {
       startBtn.disabled = true;
        datetimePicker.disabled = true;
  
        intervalId = setInterval(() => {
          const currentTime = Date.now();
  
          if (selectedDate < currentTime) {
            clearInterval(intervalId);
            datetimePicker.disabled = false;
            return;
          };
  
          const timeDifference = selectedDate - currentTime;
          const { days, hours, minutes, seconds } = convertMs(timeDifference);
          
          days.textContent = addLeadingZero(days);
          hours.textContent = addLeadingZero(hours);
          minutes.textContent = addLeadingZero(minutes);
          seconds.textContent = addLeadingZero(seconds);
        }, 1000);
      };
    },
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};


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
  
 


 
 



 