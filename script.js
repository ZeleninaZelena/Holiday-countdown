


let selectedCountry;
let holidayDate;
let intervalId;

const countryButtons = document.querySelectorAll('.button-country');
const holidayName = document.getElementById('holiday-name');
const holidayDatePart = document.getElementById('holiday-date');
const daysPart = document.getElementById('days');
const hoursPart = document.getElementById('hours');
const minutesPart = document.getElementById('minutes');
const secondsPart = document.getElementById('seconds');

function changeCountry(countryCode) {
  selectedCountry = countryCode;
  
  fetchHolidayData(selectedCountry);
  highlightActiveButton(countryCode);

}

function highlightActiveButton(countryCode) {
  countryButtons.forEach(button => {
    button.classList.remove("button-active");
    if (button.id === countryCode) {
      button.classList.add("button-active");
    }
  });
}

async function fetchHolidayData(countryCode) {
  const response = await fetch(`https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`);
  const data = await response.json();
  let holiday = null;

  const dateNow = new Date();  

  for(const holidayInData of data){
    if(holiday == null){
        holiday = holidayInData;
    }

    const holidayInDataDate = new Date(holidayInData.date)

    if(holiday.date - dateNow > holidayInDataDate - dateNow) {
        holiday = holidayInData;
    }

  }

  holidayDate = new Date(holiday.date);

  holidayName.textContent = holiday.localName;
  holidayDatePart.textContent = holidayDate.toLocaleDateString();

  startCountdown();
}

function startCountdown() {

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

for (const button of countryButtons) {
  button.addEventListener("click", () => changeCountry(button.id));
}

changeCountry('CZ');