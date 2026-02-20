import { fetchHolidayData } from "./api.js";


let selectedCountry;



const countryButtons = document.querySelectorAll('.button-country');


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





for (const button of countryButtons) {
  button.addEventListener("click", () => changeCountry(button.id));
}

changeCountry('CZ');