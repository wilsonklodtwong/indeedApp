// our App
indeedApp = {};
indeedApp.apiKey = '1211867702868069'
indeedApp.endpoint = 'https://api.indeed.com/ads/apisearch'

// set up formInputs object
const formInputs = {};

// Init Function
indeedApp.init = () => {
	indeedApp.events();
	console.log('hi!')
};

// Document Ready Calls Init
$(indeedApp.init);

// Event Listeners
indeedApp.events = () => {
	$('form').on('submit', indeedApp.handleSubmit); // on submit of Form element, runs handleSubmit function.
};

indeedApp.handleSubmit = function(e) {
	e.preventDefault();
	formInputs.value = $('input').val(); // Grab Input Value and put in formInputs Object
	indeedApp.getJobs(); // Make AJAX call on Submit
};

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
				q: `${formInputs.value}`,
				l: 'toronto',
				// sort: 'date',
				radius: 25,
				// st: 'jobsite',
				// jt: 'fulltime',
				// start: 0,
				// limit: 10,
				// fromage: 14,
				// filter: 0,
				// latlong: 1,
				co: 'ca'
			}
		}
	})
	.then(function(res) {
		var data = res.results;
		console.log(res.results)
	});
};
