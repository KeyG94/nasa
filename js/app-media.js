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
			const description = item.data[0].description;

			getImageDom.innerHTML += `<img src="${image}" class="feed-images" alt="${description}">`;
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

window.addEventListener('load', getPictureOfDay);

async function getPictureOfDay() {
	const latestContent = document.getElementById('apod-wrap');
	latestContent.innerHTML = 'Loading...';
	await fetch(apodFeed + key).then((res) => res.json()).then((data) => {
		latestContent.innerHTML = '<h2>Picture of the day</h2>';

		const title = document.createElement('h3');
		const copyright = document.createElement('div');
		const img = document.createElement('img');

		// console.log(data)

		title.innerHTML = data.title;
		img.src = data.url;
		copyright.innerHTML = data.copyright;
		img.alt = data.explanation;

		latestContent.appendChild(img);
		latestContent.appendChild(title);
		latestContent.appendChild(copyright);
	});
}

//latest feed from spaceX - Launches
const timeLineButton = document.getElementById('timeline-button');
const spacexUrl = 'https://api.spacexdata.com/v3/launches';
let launchesParagraph = document.getElementById('timeline');

timeLineButton.addEventListener('click', getLaunches);

async function getLaunches() {
	launchesParagraph.innerHTML = '<p>Loading...</p>';

	await fetch(spacexUrl).then((res) => res.json()).then((data) => {
        launchesParagraph.innerHTML = '';
        data = data.reverse();
        console.log(data)
		for (let i = 0; i < data.length; i++) {
			//changeble data
			let image = data[i].links.mission_patch_small;
			let more = data[i].links.article_link;
			let details = data[i].details;

			//constant data
			const date = data[i].launch_date_utc.slice(0, 10);
			const missionName = data[i].mission_name;
			const rocketName = data[i].rocket.rocket_name;
			const launchSite = data[i].launch_site.site_name_long;

			//if image patch empty
			if (image === null) {
				// return placeholder
				image = 'https://lakelandescaperoom.com/wp-content/uploads/2016/09/image-placeholder-500x500.jpg';
			}

			//if article link is null
			if (more === null) {
				//return nasa launches page
				more = 'https://www.nasa.gov/launchschedule/';
			}

			//if details is null
			if (details === null) {
				//return standard line
				details = 'No details available for this mission';
			}

			//output data to cards
			launchesParagraph.innerHTML += `
            <li class="list-item">
                <a href="${more}"><img class="card-image" src="${image}" alt="launch patch"></a>
                <div class="left-box">
                    <h6 class="launch-date">Date: ${date}</h6>
                    <h5 class="mission-name">Mission: ${missionName}</h5>
                    <p class="details">Description: ${details}</p>    
                </div>
                <div class="right-box">
                    <h6 class="rocket-name">${rocketName}</h6>
                    <h6 class="launch-site">${launchSite}</h6>
                    <a target="_blank" href="${more}">Learn More</a>
                </div>
            </li>
            `;

			// console.log(image);
			// console.log(date);
			// console.log(more);
			// console.log('mission name: ' + missionName);
			// console.log('rocket name: ' + rocketName);
			// console.log(details)
			// console.log('Launch Site: ' + launchSite)
		}
	});
}
getLaunches();
