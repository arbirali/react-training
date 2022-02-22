import $ from 'jquery';
import getWeatherDetails from './weather-details';

export default function renderWeather({ data }) {
    let { weather, main, visibility, dt, sys, name } = data;

    let currentDate = new Date(dt * 1000);
    let sunsetTime = new Date(sys.sunset * 1000);
    let sunRiseTime = new Date(sys.sunrise * 1000);

    $('#city').html( name );
    $('#date').html( currentDate.toDateString() );
    $('#sunRize').html( `${sunRiseTime.getHours()} : ${sunRiseTime.getMinutes()}` );
    $('#sunSet').html( `${sunsetTime.getHours()} : ${sunsetTime.getMinutes()}` );
    $('#country').html( sys.country );
    $('#visibility').html( visibility / 1000 );
    $('#weather').html( getWeatherDetails(weather) );

    $('#weatherDetails').show();
    $('#notFound').hide();
}
