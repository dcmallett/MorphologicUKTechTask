//index.js

import { TableController } from "./controllers/tableController.js";
import { CheckboxController } from "./controllers/checkboxController.js";

const tableController = new TableController();
const checkboxController = new CheckboxController();

const LOCS = {
  London: { lat: 51.5085, long: -0.1257 },
  Cardiff: { lat: 51.48, long: -3.18 },
  Birmingham: { lat: 52.4814, long: -1.8998 },
  Nottingham: { lat: 52.9536, long: -1.1505 },
  Manchester: { lat: 53.4809, long: -2.2374 },
  Wakefield: { lat: 53.6833, long: -1.4977 },
  Leeds: { lat: 53.7965, long: -1.5478 },
};


function getLocationSelect() {
  return document.getElementById("locations");
}

function setLocations() {

  const locationSelect = getLocationSelect();
  for (const [key, value] of Object.entries(LOCS)) {
    const newOption = new Option(key, key);
    locationSelect.add(newOption, undefined);
  }
  // set value blank initially
  locationSelect.value = "";
}

function onSelectChange(e) {
  document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.nav-link');
  
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove 'active' class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
  
        // Add 'active' class to the clicked tab
        tab.classList.add('active');
      });
    });
  });

  
  // select coordinates based on select value
  const coords = LOCS[e.target.value];

  window.addEventListener('DOMContentLoaded', (event) =>
    {
    let spinner = document.getElementById('loading')
    document.body.remove(spinner)
    }
  );

  // api call to https://open-meteo.com/en/docs
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.long}&hourly=temperature_2m,precipitation_probability,precipitation,rain,showers,snowfall,wind_speed_180m,wind_gusts_10m`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      tableController.renderData(data);
      checkboxController.renderData(data);
    });
}

function init() {
  setLocations();

  const locationSelect = getLocationSelect();
  locationSelect.addEventListener("change", onSelectChange);

  tableController.renderPlaceholder();
  checkboxController.renderPlaceholder();
}

window.addEventListener("DOMContentLoaded", init);
