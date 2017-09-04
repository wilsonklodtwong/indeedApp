// our App
const indeedApp = {};
indeedApp.apiKey = '1211867702868069';
indeedApp.endpoint = 'https://api.indeed.com/ads/apisearch';

// Google Autocomplete for Main Form
google.maps.event.addDomListener(window, 'load', () => {
	const places = new google.maps.places.Autocomplete(document.getElementById('jobLocation'));
	google.maps.event.addListener(places, 'place_changed', () => {
	const place = places.getPlace();

	// grabs 2 character country code to use in AJAX call
	let addressComponentArrayLength = place.address_components.length; 
	formInputs.country = place.address_components[addressComponentArrayLength - 1].short_name; 
	console.log(place)
	});
});

// Google Autocomplete for Sticky Header
google.maps.event.addDomListener(window, 'load', () => {
	const places = new google.maps.places.Autocomplete(document.getElementById('jobLocation__nav'));
	google.maps.event.addListener(places, 'place_changed', () => {
	const place = places.getPlace();

	// grabs 2 character country code to use in AJAX call
	let addressComponentArrayLength = place.address_components.length; 
	formInputs.country = place.address_components[addressComponentArrayLength - 1].short_name; 
	console.log(place)
	});
});

// set up formInputs object
const formInputs = {};

// Init Function
indeedApp.init = () => {
	indeedApp.events();
};

// Event Listeners
indeedApp.events = function() {

	// on submit of Form element
	$('.userInputs').on('submit', function(e) { 
		e.preventDefault();
		
		// Grab Input Value and put in formInputs Object
		formInputs.query = $(this).find('.jobTitle').val();
		formInputs.location = $(this).find('#jobLocation').val();
		formInputs.type = $(this).find('.jobType').val();


		for (i = 0; i <= 9; i++) {
			indeedApp.getJobs(i); // Make AJAX call on Submit
		}

		$('.cardsContainer').empty();

		// add stickiness + animation to nav header
		$('.nav').addClass('sticky animated slideInDown');
		
		// Scroll to top of results
		$('html,body').animate({
			scrollTop: $(".cardsContainer").offset().top - 100},'slow'
		);
	});

	// Expand boxes on Click
	$('.cardsContainer').on('click', '.jobCard-container', function(){
		const expand = $(this).find('.jobDesc');
		expand.slideToggle(500)
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
		console.log(res)
	});
};

indeedApp.displayJobs = function(jobs) {
	jobs.forEach(function(job, i) {
		let jobTitle = `<h3>${job.jobtitle}<h3>`;
		let jobComp = `<h4>${job.company}<h4>`;
		let jobDesc = `<p class="jobDesc">${job.snippet}<p>`
		let jobUrl = `<a href=${job.url} target="_blank">Full Job Posting</a>`
		let jobCard = `<div class="jobCard-container animated">${jobTitle}${jobComp}${jobDesc}${jobUrl}`

	// Print Cards
		if (i % 2 === 0) {
			$('.containerRight').append(jobCard);
		} else { 
			$('.containerLeft').append(jobCard);
		}
		});
	};


// Document Ready
$(indeedApp.init);