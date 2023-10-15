import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const ref = {
  selector: document.querySelector('.breed-select'),
  divCatInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

const { selector, divCatInfo, loader, error } = ref;

loader.classList.add('hidden');
error.classList.add('hidden');

function initializePage() {
  const arrBreedsId = [];
  fetchBreeds()
    .then(data => {
      data.forEach(element => {
        arrBreedsId.push({ text: element.name, value: element.id });
      });
      new SlimSelect({
        select: selector,
        data: arrBreedsId,
      });
    })
    .catch(onFetchError);

  selector.addEventListener('change', onSelectBreed);
}

initializePage();

function onSelectBreed(event) {
  selector.classList.add('hidden');
  loader.classList.remove('hidden');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.add('hidden');
      selector.classList.remove('hidden');
      const { url, breeds } = data[0];

      divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
      divCatInfo.classList.remove('hidden');
    })
    .catch(onFetchError);
}

function onFetchError(error) {
  selector.classList.add('hidden');
  loader.classList.add('hidden');
  swal('Oops!', 'Something went wrong! Try reloading the page!', 'error');
}
