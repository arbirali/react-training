import $ from 'jquery';
import axios from 'axios';

import renderWeather from './helper/weather';
import handleError from './helper/hanlde-error';
import constants from './constants';

let { weatherUrl, appid } = constants;

(function () {
  $('#searchForm').on('submit', function(e) {
    e.preventDefault();

    axios.get(weatherUrl, {
      params: {
        q: $('#searchInput').val(),
        appid
      }
    })
    .then(renderWeather)
    .catch(handleError);
  });
}) (axios, $);
