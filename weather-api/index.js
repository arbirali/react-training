(function () {

  let searchFrom = document.getElementById('searchForm');
  let contentBox = document.getElementById('weatherDetails');
  let noData = document.getElementById('notFound');
  let headingBlock = document.getElementById('city');
  let dateBlock = document.getElementById('date');
  let countryBlock = document.getElementById('country');
  let sunRizeBlock = document.getElementById('sunRize');
  let sunSetBlock = document.getElementById('sunSet');
  let visibilityBlock = document.getElementById('visibility');
  let weatherBlock = document.getElementById('weather');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const appId = 'dba6ed565e0d72778b7b4c1afaca1857';

  let httpRequest = {
    get: function (url, callback) {

      let http = new XMLHttpRequest();

      http.onload = function() {
          if (http.readyState == 4) {
            callback(JSON.parse(http.response));
          }
      }

      http.open( "GET", url );
      http.send( null );
    }
  }

  searchFrom.addEventListener('submit', function (event) {
    event.preventDefault();

    let city = document.getElementById('searchInput').value;
    let requestUrl = weatherUrl + '?q=' + city + '&appid=' + appId;

    httpRequest.get(requestUrl, handleData);

  });

  function handleData(response) {

    if (response.cod == 200) {
      let currentDate = new Date(response.dt * 1000);
      let sunsetTime = new Date(response.sys.sunset * 1000);
      let sunRiseTime = new Date(response.sys.sunrise * 1000);

      headingBlock.innerHTML = response.name;
      dateBlock.innerHTML = '<strong>' + months[currentDate.getMonth()] + '</strong>, ' + currentDate.getDate() + ', ' + currentDate.getFullYear();
      countryBlock.innerHTML = response.sys.country;
      sunRizeBlock.innerHTML = sunRiseTime.getHours() + ':' + sunRiseTime.getMinutes();
      sunSetBlock.innerHTML = sunsetTime.getHours() + ':' + sunsetTime.getMinutes();
      visibilityBlock.innerHTML = response.visibility / 1000;
      weatherBlock.innerHTML = weatherList(response.weather);

      contentBox.style.display = '';
      noData.style.display = 'none';

    } else {

      noData.innerHTML = response.message;
      contentBox.style.display = 'none';
      noData.style.display = '';

    }
  }

  function weatherList(weather) {
    let list = '';
    for (var i = 0; i < weather.length; i++) {
      list += '<div class="col">';
      list += '<div class="card">';
      list += '<div class="card-body">';
      list += '<img src="http://openweathermap.org/img/wn/' + weather[i].icon + '@2x.png" />';
      list += '<h3>' + weather[i].main + '</h3>';
      list += '<span class="description">' + weather[i].description + '</span>';
      list += '</div>';
      list += '</div>';
      list += '</div>';
    }

    return list;
  }

})();
