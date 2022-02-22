export default function getWeatherDetails (weatherDetails) {
  return weatherDetails.map( weatherDetail => {
    return `
      <div class="col">
        <div class="card">
          <div class="card-body">
            <img src="http://openweathermap.org/img/wn/${weatherDetail.icon}@2x.png" />
            <h3>${weatherDetail.main}</h3>
            <span class="description">${weatherDetail.description}</span>
          </div>
        </div>
      </div>
    `
  });
}
