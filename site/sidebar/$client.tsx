import { BlessedSacrament } from "./$blessedsacrament.js";
import { TimeArea } from "./$time.js";

document.getElementById('root')!.append(<>
  <div id="top">
    <BlessedSacrament />
  </div>

  <div id="bottom">

    <div id="info">
      <TimeArea />
      <Weather />
      <FeastDay />
    </div>

  </div>
</>);

function FeastDay() {
  const feastDayEl = <div id="feastday">Saint of the Day</div> as HTMLDivElement;

  const calendar = (window as any).Romcal.Calendar.calendarFor({ country: 'unitedStates' });
  function updateFeastDay() {
    const ostensibleDate = new Date();
    const tzOffset = ostensibleDate.getTimezoneOffset() * 60_000;
    const localDate = new Date(ostensibleDate.getTime() - tzOffset);
    const yyyymmdd = localDate.toISOString().split('T')[0];
    const feastDay = calendar.find((day: any) => day.moment.split('T')[0] === yyyymmdd);
    feastDayEl.innerText = feastDay.name;
  }
  updateFeastDay();
  setInterval(updateFeastDay, 1000 * 60 * 60 * 5);

  return feastDayEl;
}

function Weather() {
  const node = <div>
    <div id="temprow">
      <div id="temperature">87 Fº</div>
      <img id="weather-icon" />
    </div>
    <div id="weather-full">It's gonna rain or somethin.</div>
  </div> as HTMLElement;

  updateWeather();
  setInterval(updateWeather, 1000 * 60 * 5);

  function updateWeather() {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords;
      const points = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`).then(res => res.json());
      const forecastNow = await fetch(points.properties.forecastHourly).then(res => res.json());
      const forecastLater = await fetch(points.properties.forecast).then(res => res.json());
      const now = forecastNow.properties.periods[0];
      const later = forecastLater.properties.periods[0];

      node.querySelector<HTMLElement>('#temperature')!.innerText = `${now.temperature} ${now.temperatureUnit}°`;
      node.querySelector<HTMLImageElement>('#weather-icon')!.src = later.icon;
      node.querySelector<HTMLElement>('#weather-full')!.innerText = later.detailedForecast;
    });
  }

  return node;
}
