import axios from "axios";
import { fetchBreeds} from "./cat-api"

axios.defaults.headers.common["x-api-key"] = "live_ca4v3X7580WRLBenOhc3r7ojPg0R64azXVOw6lW2WurksUI8Fp77LrwyCLYhJV1d";
 
const BASE_URL = 'https://api.thecatapi.com/v1';
const END_POINT = '/breeds';
const API_KEY = 'live_ca4v3X7580WRLBenOhc3r7ojPg0R64azXVOw6lW2WurksUI8Fp77LrwyCLYhJV1d';

const params = new URLSearchParams({
    api_key: API_KEY,
    page: 1,
});

const refs = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info'),
};

refs.select.addEventListener('change', onChooseBreed);


fetchBreeds().then(data => {
    refs.select.insertAdjacentHTML('beforeend', createMarkup(data));
    console.log(data[1]);
});

// fetchCatByBreed().then(dataCat => {
//     refs.catInfo.insertAdjacentHTML('beforeend', createCatMarkup(dataCat))
// });



function createMarkup(arr) {
    return arr.map(({ name, id }) => 
    `<option value="${id}">${name}</option>`
    ).join('');
};



function onChooseBreed(e) { 
    const elId = e.target.id;
    fetchCatByBreed(elId).then(data => refs.catInfo.insertAdjacentHTML('beforeend', createCatMarkup(data)));

}

function fetchCatByBreed(breedId) { 
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(responce => {
            if (!responce.ok) {
                throw new Error(responce.statusText);
            }

            return responce.json();
        })
         .catch(error => console.log(error));
}

function createCatMarkup(arrs) {
    return arrs.map(({ id, name, description, temperament }) => 
    `<div class="breed-wraper">
 <li class="breed-item   <img src="https://api.thecatapi.com/v1/images/search?breed_ids=${id}" alt="${name}" />
    <div class="text">
      <h2>${name}</h2>
      <p>${description}</p>
      <p>${temperament}</p>
    </div>
  </li>
</div>`
    ).join('');

};

