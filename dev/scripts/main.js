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
// let places;
// let place;
// let addressComponentArrayLength;


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

		indeedApp.getJobs(); // Make AJAX call on Submit
		

		$('html,body').animate({
			scrollTop: $(".cardsContainer").offset().top},
			'slow');

		$('.cardsContainer').empty(); // empty container

		$('.nav').addClass('sticky animated slideInDown');

	});

	// Expand boxes on Click
	$('.cardsContainer').on('click', '.jobCard-container', function(){
		const expand = $(this).find('.jobDesc');
		expand.slideToggle(500);
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
				radius: 25,
				jt: formInputs.type,
				// start: i === 0 ? 0 : i * 24 + 1,
				start: 0,
				limit: 24,
				hightlight: 1,
				co: formInputs.country
			},
		},
	})
	.then(function(res) {
		// console.log(res);
		// console.log(res.results);
		
		// calculate how many ajax calls in the for loop
		if (res.totalResults <= 24) {
			let jobsDataArray = res.results;
			let jobsTotalResults = res.totalResults;
			// console.log(jobsTotalResults);
			indeedApp.displayJobs(jobsDataArray, jobsTotalResults);
		} else if (res.totalResults <= 480) {
			// for (i = 1; i <= Math.floor(res.totalResults / 24); i++) {
			for (i = 1; i <= Math.floor(res.totalResults / 24); i++) {
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
						radius: 25,
						jt: formInputs.type,
						start: i * 24,
						limit: 24,
						hightlight: 1,
						co: formInputs.country
					},
				},
			})
			.then (function(res) {
				// console.log(res);
				// console.log(res.results);
				jobsDataArray = res.results;
				indeedApp.displayJobs(jobsDataArray)
			})
		}
		} else if (res.totalResults > 480) {
			for (i = 1; i <= 20; i++) {
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
						radius: 25,
						jt: formInputs.type,
						start: i * 24,
						limit: 24,
						hightlight: 1,
						co: formInputs.country
					},
				},
			})
			.then (function(res) {
				// console.log(res);
				// console.log(res.results);
				jobsDataArray = res.results;
				indeedApp.displayJobs(jobsDataArray)
			})
		}
	}
})
};

indeedApp.displayJobs = function(jobs, results) { 

	if (results === 0) {
		let noResults = `<h5>Sorry, no results. Please try a different search.</h5>`
		$('.cardsContainer').append(noResults);
	}

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

// // HELP FROM CODEPEN STARTS <https://codepen.io/stacigh/pen/Lxbdo?page=1&>

// // Even when the window is resized, run this code.
// $(window).resize(function(){
  
//   // Variables
//   var windowHeight = $(window).height();
  
//   // Find the value of 90% of the viewport height
//   var ninetypercent = .99 * windowHeight;
  
//   // When the document is scrolled ninety percent, toggle the classes
//   // Does not work in iOS 7 or below
//   // Hasn't been tested in iOS 8
//   $(document).scroll(function(){
	
// 	// Store the document scroll function in a variable
// 	var y = $(this).scrollTop();
	
// 	// If the document is scrolled 90%
// 	if( y > ninetypercent) {
	  
// 	  // Add the "sticky" class
// 	  $('.nav').addClass('sticky');
// 	  $('.nav').show(400);
// 	} else {
// 	  // Else remove it.
// 	  $('.nav').removeClass('sticky')
// 	  $('.nav').hide(400);
// 	}
//   });

// // Call it on resize.
// }).resize();


// // HELP FROM CODEPEN ENDS

// Document Ready
$(indeedApp.init);