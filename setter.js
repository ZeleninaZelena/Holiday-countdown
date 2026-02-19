

import { holidayDate } from "./api.js";

let intervalId;


const daysPart = document.getElementById('days');
const hoursPart = document.getElementById('hours');
const minutesPart = document.getElementById('minutes');
const secondsPart = document.getElementById('seconds');


export function startCountdown() {

  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    const now = new Date();
    const diff = holidayDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysPart.textContent = days;
    hoursPart.textContent = hours;
    minutesPart.textContent = minutes;
    secondsPart.textContent = seconds;

  }, 1000);
}