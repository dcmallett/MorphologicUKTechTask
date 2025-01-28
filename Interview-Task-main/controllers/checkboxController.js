//table controller to handle rendering of table data
export class CheckboxController {
  _element;

  _placeholderContent = `
        <p>This is for the checkbox</p>
    `;

  _selectedDay = "";

  constructor() {
    this._element = document.getElementById("checkbox-container");
  }

  renderPlaceholder() {
    this._element.innerHTML = this._placeholderContent;
  }

  renderData(data) {
    // transform api data into ready to display format
    const processedData = data.hourly.time.reduce((acc, cur, index) => {
      if (acc.hasOwnProperty(day)) {
        acc[day].push({
          rain: data.hourly.rain[index],
          showers: data.hourly.showers[index],
          snowfall: data.hourly.snowfall[index],
          wind_speed_180m: data.hourly.wind_speed_180m[index],
          wind_gusts_10m: data.hourly.wind_gusts_10m[index],
        });
      } else {
        acc[day] = [
          {
            rain: data.hourly.rain[index],
            showers: data.hourly.showers[index],
            snowfall: data.hourly.snowfall[index],
            wind_speed_180m: data.hourly.wind_speed_180m[index],
            wind_gusts_10m: data.hourly.wind_gusts_10m[index],
          },
        ];
      }
      return acc;
    }, {});

    this._selectedDay = Object.keys(processedData)[0];

    const markup = this.generateMarkup(processedData);
    this._element.innerHTML = markup;
  }

  selectDay(key) {
    this._selectedDay = key;
  }

  generateMarkup(processedData) {
    // turn
    return Object.keys(processedData).map(day => `
      <div>
        <input type="checkbox" id="${showers}" name="day" value="${day}">
        <label for="${showers}">${showers}</label>
      </div>
    `).join('');
  }
}
