import axios from 'axios';

const url = 'https://api.thecatapi.com/v1';
const api_key =
  'live_sQSyIMtkELEPBN4s4ew1WiS3cC6nMYmYFfG7F4bWD9dvUcOwd64b8voMHI7JctrG';

export function fetchBreeds() {
  return axios.get(`${url}/breeds`, { params: { api_key } }).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${url}/images/search`, { params: { api_key, breed_ids: breedId } })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.data;
    });
}
