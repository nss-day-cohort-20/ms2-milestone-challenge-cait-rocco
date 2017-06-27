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
		carParse = JSON.parse(event.target.responseText).cars;
		arrayUpCars(carParse);
	}

// takes array of objects and returns an array of strings, the 'messages'
	function arrayUpCars (carParse) {
		carParse.forEach(function(carParts) {
			let carObj = {"make": carParts.make, "model": carParts.model, "year": carParts.year, "price": carParts.price, "description": carParts.description}
			cars.push(carObj);
		})
		carsToDom(cars);
	}

	function carsToDom(array) {
		for (let i = 0; i < cars.length; i++) {
			if (i % 3 === 0 ) {
				`<div class="row">`
			} 
			carDiv.innerHTML += 
			`<div class="col-md-1 myClass" id="${i}">
				<h2>${cars[i].make} - ${cars[i].model}</h2><h3>${cars[i].year}</h3><br>
				<h4>$${cars[i].price}</h3><br>
				<p class="desc-${i}">${cars[i].description}</p>
			</div>`
			if ((i + 1) % 3 === 0) {
				`</div>`
			}
		}
		borderEvent();
	}

	let borderEvent = function () {
		let cars =document.querySelectorAll(".myClass")
		for (var i = 0; i < cars.length; i++) {
		cars[i].addEventListener("click", function (event) {
			input.value = "";
			event.currentTarget.classList.toggle("add-border");
			input.focus();
			currentCard = event.currentTarget
			});
		};
		inputEvent()
	};

	let inputEvent = function () {
		input.addEventListener("keyup", function() {
			let newCardDesc = currentCard.getElementsByClassName(`desc-${currentCard.id}`)
			newCardDesc[0].innerHTML = input.value
		});
	}
	
	window.CarLot = window.CarLot || {};
	CarLot.LoadCars = loadCars;
}