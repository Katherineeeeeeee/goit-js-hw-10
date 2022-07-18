import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import ulCountry from '../src/templates/ul.hbs';
import cardContainer from '../src/templates/card.hbs';

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  event.preventDefault();

  let searchQuery = event.target.value;
  searchQuery = searchQuery.trim();

  fetchCountries(searchQuery).then(renderCountryCard).catch(onFetchError);
}

function renderCountryCard(country) {
  countryList.innerHTML = '';
  countryCard.innerHTML = '';

  if (country.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
  if (country.length >= 2) {
    countryList.innerHTML = ulCountry(country);
    return;
  }
  countryCard.innerHTML = cardContainer(country[0]);
}

function onFetchError(error) {
  if (error.message === '404') {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
}
