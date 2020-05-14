let searchInput = document.getElementById('search-bar');
const baseUrl = 'https://images-api.nasa.gov/search?q=';
let getImageDom = document.getElementById('image-content');
const apodFeed = 'https://api.nasa.gov/planetary/apod?api_key=';
const key = '9PMH8p3OMTPQ12d4uXnxNrcwnRIC1qCcNSz6HlGJ';

//timer for search bar
let typeTimer;
const searchInterval = 1000;

searchInput.addEventListener('keyup', () => {
	clearTimeout(typeTimer);

	if (searchInput.value) {
		typeTimer = setTimeout(mediaSearch, searchInterval);
	}
});

function mediaSearch() {
	let search = searchInput.value;

	getImageLibary(search);
}

async function getImageLibary(query) {
	query = searchInput.value + '&media_type=image';
	getImageDom.innerHTML = 'Loading...';

	await fetch(baseUrl + query).then((res) => res.json()).then((data) => {
		console.log(data);

		getImageDom.innerHTML = '';

		//handle error
		if (data.collection.items.length === 0) {
			getImageDom.innerHTML = `<p class="neg-feedback">No results matching your search (${searchInput.value}).</p>`;
		}

		for (let item of data.collection.items) {
			const image = item.links[0].href;

			getImageDom.innerHTML += `<img src="${image}" width="150px" alt="">`;
		}
	});
}

function toggleClick(clicked) {
	//get Dom elements
	const images = document.getElementById('images-tab');
	const latest = document.getElementById('latest-container');

	const latestBorder = document.getElementById('latest');
	const imagesBorder = document.getElementById('images');

	//check class
	if (images.classList.contains('display-none')) {
		if (clicked === 'latest') {
			return;
		}
		latest.classList.add('display-none');
		latestBorder.classList.remove('active-toggle');
		imagesBorder.classList.add('active-toggle');
		images.classList.remove('display-none');
	} else {
		if (clicked === 'images') {
			return;
		}
		latestBorder.classList.add('active-toggle');
		imagesBorder.classList.remove('active-toggle');
		images.classList.add('display-none');
		latest.classList.remove('display-none');
	}
}


window.addEventListener("load", getPictureOfDay);

async function getPictureOfDay(){
    
    const latestContent = document.getElementById('apod-wrap');
    latestContent.innerHTML = 'Loading...'
    await fetch(apodFeed + key).then((res)=> res.json()).then((data) => {
     
        latestContent.innerHTML = '<h2>Picture of the day</h2>'

        const title = document.createElement('h3');
        const copyright = document.createElement('div');
        const img = document.createElement('img');

        title.innerHTML = data.title;
        img.src = data.url
        copyright.innerHTML = data.copyright;
        img.alt = data.explanation;

        latestContent.appendChild(img);
        latestContent.appendChild(title);
        latestContent.appendChild(copyright);
       
    });
}

// async function getVideoLibary(query) {
// 	query = searchInput.value + '&media_type=video';
// 	getImageDom.innerHTML = 'Loading...';

// 	await fetch(baseUrl + query).then((res) => res.json()).then((data) => {
// 		console.log(data);

// 		getImageDom.innerHTML = '';

// 		//handle error
// 		if (data.collection.items.length === 0) {
// 			getImageDom.innerHTML = `<p class="neg-feedback">No results matching your search (${searchInput.value}).</p>`;
// 		}

// 		for (let item of data.collection.items) {
// 			const image = item.links[0].href;

// 			getImageDom.innerHTML += `<img src="${image}" width="150px" alt="">`;
// 		}
// 	});
// }