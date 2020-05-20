import key from '/js/appGlobal.js';

window.onload = function() {
	nearEarthObj();
};

//fetch nasa API NeoWs
async function nearEarthObj() {
	const today = new Date().toISOString().slice(0, 10);
	const url = 'https://api.nasa.gov/neo/rest/v1/feed?';
	const afeed = `${url}` + `start_date=${today}&` + `end_date=${today}` + `&api_key=${key}`;

	await fetch(afeed).then((res) => res.json()).then((data) => {
		let element = data.near_earth_objects[today];
		let output = '';
		for (let i = 0; i < element.length; i++) {
			let name = element[i].name;
			let hazardous = element[i].is_potentially_hazardous_asteroid;
			let size = element[i].estimated_diameter.kilometers.estimated_diameter_max;

			output += `
            <tr class="table-row">
                <td>${name}</td>
                <td>${size}</td>
                <td>${hazardous}</td>
            </tr>
        `;
		}
		document.getElementById('asteroid-table').innerHTML = output;
	});
}

//Mars Rover photos

async function marsPhotos() {
	let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${key}`;

	await fetch(url).then((res) => res.json()).then((data) => {
		let output = '';

		for (let i = 0; i < 10; i++) {
			let img_src = data.photos[i].img_src;
			output += `<a href="${img_src}" target="_blank"><img src="${img_src}" class="rover-image" alt="image from mars, Front Hazard camera"></a>`;

			document.getElementById('mars-rover').innerHTML = output;
		}
	});
}

marsPhotos();
