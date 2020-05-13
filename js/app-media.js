// import key from '/js/appGlobal.js';

let searchInput = document.getElementById('search-bar');
let baseUrl = 'https://images-api.nasa.gov/search?q=';
let searchResult = document.getElementById('image-content');

async function getImageLibary(){
    baseUrl = baseUrl + searchInput;

    await fetch(baseUrl).then((res) => res.json()).then((data) => {
        console.log(data)
    
    
    })
};

getImageLibary()

searchInput.addEventListener("keyup", mediaSearch);

function mediaSearch(){
    let search = searchInput.value;

    searchResult.innerHTML = baseUrl + search
    console.log(searchInput.value);
};



console.log(baseUrl);