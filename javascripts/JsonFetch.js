console.log("json fetch page loaded");
{
	let loadCars = Object.create(null);
	let cars = [];

// retrieves messages from JSON file
	loadCars.retrieveCars = function () {
		let requestCars = new XMLHttpRequest();
		requestCars.addEventListener("load", setCars);
		requestCars.open("GET", "inventory.json");
		requestCars.send();
	};
	

// parses JSON messages into an array of objects, each with one key-value pair
	function setCars () {
		carObj = JSON.parse(event.target.responseText).cars;
		console.log("car array?", arrayUpCars(carObj));
	}

	 // takes array of objects and returns an array of strings, the 'messages'
	function arrayUpCars (carObj) {
		carObj.forEach(function(carParts) {
			cars.push(carParts.make);//, carParts.model, carParts.year, carParts.price, carParts.description);
		})
	}

	window.CarLot = window.CarLot || {};
	CarLot.LoadCars = loadCars;
}