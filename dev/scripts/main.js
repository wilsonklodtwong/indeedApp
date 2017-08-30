// our App
var indeedApp = {};
indeedApp.apiKey = '1211867702868069'
indeedApp.endpoint = 'https://api.indeed.com/ads/apisearch'

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
				// sort: 'date',
				radius: 25,
				// st: 'jobsite',
				jt: formInputs.jobType,
				// start: 0,
				limit: 50,
				// fromage: 14,
				// filter: 0,
				// latlong: 1,
				co: 'ca',
			},
		},
	})
	.then(function(res) {
		// var data = res;
		console.log(res.results);
	});
};


$(indeedApp.init);