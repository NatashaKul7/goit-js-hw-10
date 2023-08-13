
import { fetchBreeds, fetchCatByBreed } from "./cat-api"
import { createMarkup, createCatMarkup } from "./create-markup";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

 
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


refs.select.classList.add('hidden');
refs.error.classList.add('hidden');


fetchBreeds().then(arr => {
    refs.select.classList.remove('hidden');
    refs.loader.classList.add('hidden');
    refs.error.classList.add('hidden');
    refs.select.innerHTML = createMarkup(arr.data);
    slim();
})
    .catch(error => {
        refs.loader.classList.add('hidden');
        Notify.failure(`${refs.error.textContent}`)
    });


function onChooseBreed(e) { 
    refs.loader.classList.remove('hidden');
    refs.catInfo.classList.add('hidden');
    refs.error.classList.add('hidden')
    const elId = e.target.value;
    console.log(elId);

    fetchCatByBreed(elId).then(obj => {
        console.log(obj.data[0]);
        refs.catInfo.innerHTML = createCatMarkup(obj.data[0]);
        refs.loader.classList.add('hidden');
        refs.catInfo.classList.remove('hidden');
    })
    .catch(error => {
    refs.loader.classList.add('hidden');
    Notify.failure(`${refs.error.textContent}`)
        });
}

function slim() { 
new SlimSelect({
    select: refs.select
});
}