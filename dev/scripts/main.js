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

		// empty container
		$('.cardsContainer').empty();

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
		var jobsDataArray = res.results;
		console.log(jobsDataArray)
		// console.log(res.results);
		indeedApp.displayJobs(jobsDataArray);
	});
};

indeedApp.displayJobs = function(jobs) {
	jobs.forEach(function(job, index) {

		let jobTitle = `<h3>${job.jobtitle}<h3>`;
		let jobDesc = `<p>${job.snippet}<p>`
		// let jobDesc = $('<p>').text(job.snippet);
		console.log(job.url)
		let jobUrl = `<a href ${job.url}>website</a>`
		let jobCard = $('<div>').append(jobTitle, jobDesc, jobUrl)

		// console.log(jobTitle);
	// 	// Print Card
		$('.cardsContainer').append(jobCard);
	// })
	})
};
$(indeedApp.init);