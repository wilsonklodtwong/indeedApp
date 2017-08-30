// our App
var indeedApp = {};
indeedApp.apiKey = '1211867702868069'
indeedApp.endpoint = 'https://api.indeed.com/ads/apisearch'

google.maps.event.addDomListener(window, 'load', function () {
	var places = new google.maps.places.Autocomplete(document.getElementById('jobLocation'));
	google.maps.event.addListener(places, 'place_changed', function () {
       var place = places.getPlace();
       var address = place.formatted_address;
       console.log(place);
    });
});

// set up formInputs object
var formInputs = {};

// Document Ready Calls Init

// Init Function
indeedApp.init = () => {
	indeedApp.events();
	console.log('hi!');

};

// Event Listeners
indeedApp.events = () => {
	// google.maps.event.addListener(autocomplete, 'place_changed', function () {
	//     place = autocomplete.getPlace();
	//     console.log(place);
 //   });

	$('form').on('submit', function(e) { // on submit of Form element, runs handleSubmit function.
	e.preventDefault();
	formInputs.query = $('.jobTitle').val(); // Grab Input Value and put in formInputs Object
	formInputs.location = $('.jobLocation').val();
	formInputs.type = $('.jobType').val();

	indeedApp.getJobs(); // Make AJAX call on Submit
	});
}

// indeedApp.handleSubmit = function(e) {
// };

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
				sort: 'relevance',
				radius: 25,
				// st: 'jobsite',
				jt: formInputs.jobType,
				// start: 0,
				limit: 50,
				// fromage: 14,
				// filter: 0,
				// latlong: 1,
				// co: 'ca',
			},
		},
	})
	.then(function(res) {
		// var data = res;
		console.log(res.results);
	});
};


$(indeedApp.init);