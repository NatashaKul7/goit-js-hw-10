export function fetchBreeds() {
     return fetch(`https://api.thecatapi.com/v1/breeds`)
        .then(responce => {
            if (!responce.ok) {
                throw new Error(responce.statusText);
            }

            return responce.json();
        })
         .catch(error => console.log(error));
    

};