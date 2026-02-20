import { startCountdown } from "./setter.js";

export let holidayDate;


const holidayName = document.getElementById('holiday-name');
const holidayDatePart = document.getElementById('holiday-date');

export async function fetchHolidayData(countryCode) {
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