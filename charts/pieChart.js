	//
	// http://jsfiddle.net/ragingsquirrel3/qkHK6/
	//
	function pieChart(input, checkLabel)
	{
		clearSection("chart");

		var w = 400;
		var h = 400;
		var r = h/2;
		var color = d3.scale.category20c();

		var vis = d3.select('#chart').append("svg:svg").data([input]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
		var pie = d3.layout.pie().value(function(d){return d.products;});

		// declare an arc generator function
		var arc = d3.svg.arc().outerRadius(r);

		// select paths, use arc generator to draw
		var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
		arcs.append("svg:path")
			.attr("fill", function(d, i){
				return color(i);
			})
			.attr("d", function (d) {
			// log the result of the arc generator to show how cool it is :)
				console.log(arc(d));
				return arc(d);
			});

		// add the text
		if (checkLabel == true)
		{
			arcs.append("svg:text").attr("transform", function(d){
				d.innerRadius = 0;
				d.outerRadius = r;
				return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
				return input[i].name;}
			);
		}
	}