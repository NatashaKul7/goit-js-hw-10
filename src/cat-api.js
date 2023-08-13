import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_ca4v3X7580WRLBenOhc3r7ojPg0R64azXVOw6lW2WurksUI8Fp77LrwyCLYhJV1d";

function fetchBreeds() {
    return axios.get(`https://api.thecatapi.com/v1/breeds`)
   
};

function fetchCatByBreed(breedId) { 
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
}
export { fetchBreeds, fetchCatByBreed }
