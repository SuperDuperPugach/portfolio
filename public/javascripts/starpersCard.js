$.get(
	"/starpers/getdata",
	{},
	onAjaxSuccess
);


function onAjaxSuccess(recieved) {

	var data = [];
	data.push(['Country', 'Popularity']);
	var parsed = JSON.parse(recieved);
	console.log(parsed[0].country);
	parsed.forEach(function (item) {
		data.push([item.country, item.amount])
	});

// GOOGLE MAP //
	google.charts.load('current', {'packages': ['geochart']});
	google.charts.setOnLoadCallback(drawRegionsMap);

	function drawRegionsMap() {

		var dataFormated = google.visualization.arrayToDataTable(data);

		var options = {
			legend: 'none',
			colors: ['gray', '#16a085']
		};

		var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

		chart.draw(dataFormated, options);
	}
}