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

// // Good Autocomplete for sticky Header
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
indeedApp.events = () => {

	// on submit of Form element
	$('form').on('submit', function(e) { 
		e.preventDefault();

		$('.userInputs').addClass('fixed-header'); // sticky header add-class

		$('.cardsContainer').empty(); // empty container

		formInputs.query = $('.jobTitle').val(); // Grab Input Value and put in formInputs Object
		formInputs.location = $('#jobLocation').val();
		formInputs.type = $('.jobType').val();

		for (i = 0; i <= 9; i++) {
			indeedApp.getJobs(i); // Make AJAX call on Submit
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
		let jobUrl = `<a href=${job.url} target="_blank">Full Job Posting</a>`
		let jobCard = $(`<div class="jobCard-container animated">`).append(jobTitle, jobComp, jobDesc, jobUrl)


	// Print Cards
		$('.cardsContainer').append(jobCard);
	})
};

// HELP FROM CODEPEN STARTS <https://codepen.io/stacigh/pen/Lxbdo?page=1&>

// Even when the window is resized, run this code.
$(window).resize(function(){
  
  // Variables
  var windowHeight = $(window).height();
  
  // Find the value of 90% of the viewport height
  var ninetypercent = .99 * windowHeight;
  
  // When the document is scrolled ninety percent, toggle the classes
  // Does not work in iOS 7 or below
  // Hasn't been tested in iOS 8
  $(document).scroll(function(){
	
	// Store the document scroll function in a variable
	var y = $(this).scrollTop();
	
	// If the document is scrolled 90%
	if( y > ninetypercent) {
	  
	  // Add the "sticky" class
	  $('.nav').addClass('sticky');
	  $('.nav').show(400);
	} else {
	  // Else remove it.
	  $('.nav').removeClass('sticky')
	  $('.nav').hide(400);
	}
  });

// Call it on resize.
}).resize();


// HELP FROM CODEPEN ENDS

// Document Ready
$(indeedApp.init);