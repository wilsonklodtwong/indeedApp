// our App
const indeedApp = {};
indeedApp.apiKey = '1211867702868069';
indeedApp.endpoint = 'https://api.indeed.com/ads/apisearch';


// set up formInputs object
const formInputs = {};
let places;
let place;
let addressComponentArrayLength;


// Init Function
indeedApp.init = () => {
	indeedApp.events();
};

// Event Listeners
indeedApp.events = () => {

// Google Autocomplete
google.maps.event.addDomListener(window, 'load', function () {
	places = new google.maps.places.Autocomplete(document.getElementById('jobLocation'));
	google.maps.event.addListener(places, 'place_changed', function () {
	place = places.getPlace();

	// grabs 2 character country code to use in AJAX call
	addressComponentArrayLength = place.address_components.length; 
	 
	console.log(place);
	});
});

 	// on submit of Form element
	$('form').on('submit', function(e) { 
		e.preventDefault();

		$('.userInputs').addClass('fixed-header'); // sticky header add-class

		$('.cardsContainer').empty(); // empty container

		formInputs.query = $('.jobTitle').val(); // Grab Input Value and put in formInputs Object
		formInputs.location = $('#jobLocation').val();
		formInputs.type = $('.jobType').val();


		//trying to get country to rewrite itself as undefined when invalid location inputted
		formInputs.country = place.address_components[addressComponentArrayLength - 1].short_name;
		console.log(formInputs.country);

		if (formInputs.country !== undefined) {
			for (i = 0; i <= 9; i++) {
			indeedApp.getJobs(i); // Make AJAX call on Submit
		}
		} else {
			alert('Please enter a valid city or region');
		}

	});

	// Expand boxes on Click
	$('.cardsContainer').on('click', '.jobCard-container', function(){
		const expand = $(this).find('.jobDesc');
		expand.toggleClass('bigBox')
	});
}

// Ajax Call
indeedApp.getJobs = function() {
		$.ajax({
		url: 'https://proxy.hackeryou.com',
		dataType: 'json',
		method: 'GET',
		data: {
			reqUrl: indeedApp.endpoint,
			params: {
				publisher: indeedApp.apiKey,
				v: 2,
				format: 'json',
				q: formInputs.query,
				l: formInputs.location,
				// sort: 'relevance',
				radius: 25,
				// st: 'jobsite',
				jt: formInputs.type,
				// start: i === 0 ? 0 : i * 24 + 1,
				start: i * 24,
				limit: 24,
				// fromage: 14,
				// filter: 0,
				latlong: 1,
				co: formInputs.country
			},
		},
	})
	.then(function(res) {
		const jobsDataArray = res.results;
		indeedApp.jobsDataObject = res;
		indeedApp.displayJobs(jobsDataArray);
		console.log(res.results)
	});
};

indeedApp.displayJobs = function(jobs) {
	jobs.forEach(function(job) {
		let jobTitle = `<h3>${job.jobtitle}<h3>`;
		let jobComp = `<h4>${job.company}<h4>`;
		let jobDesc = `<p class="jobDesc">${job.snippet}<p>`
		let jobUrl = `<a href=${job.url} target="_blank">website</a>`
		let jobCard = $(`<div class="jobCard-container animated">`).append(jobTitle, jobComp, jobDesc, jobUrl)


	// Print Cards
		$('.cardsContainer').append(jobCard);
	})
};

// Document Ready
$(indeedApp.init);






















// THAT WHOLE REACT STYLE THING WOWZA::

// class JobCard {
// 	constructor(jobTitle, jobDesc) {
// 		this.jobTitle = jobTitle;
// 		this.jobDesc = jobDesc;
// 	}
// 	print() {
// 		let jobCard = $(`<div class="jobCard-container">`).append(`<h3>${this.jobTitle}<h3><p>${this.jobDesc}<p>`);
// 		$('.cardsContainer').append(jobCard);
// 	}
// }
// indeedApp.displayJobs  = function(jobs) {
// 		jobs.forEach(function(job) {
// 			const card = new JobCard(job.jobtitle, job.snippet);
// 			card.print();
// 		})
// }

