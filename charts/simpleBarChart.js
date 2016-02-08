
	//
	// http://www.c-sharpcorner.com/UploadFile/2072a9/creating-bar-chart-from-d3js-using-json-data/
	//
	function simpleBarChart(input)
	{
	    clearSection("chart");

            //  var width = 1020,  
            //      height = 720,  
            var data = input;
            var valueLabelWidth = 150; // space reserved for value labels (right)  
            var barHeight = 20; // height of one bar  
            var barLabelWidth = 250; // space reserved for bar labels  
            var barLabelPadding = 25; // padding between bar and bar labels (left)  
            var gridLabelHeight = 25; // space reserved for gridline labels  
            var gridChartOffset = 25; // space between start of grid and first bar  
            var maxBarWidth = 700; // width of the bar with the max value  
  
            // Accessor functions   
            var barLabel = function (d) { return d['name']; };  
            var barValue = function (d) { return parseFloat(d['products']); };  
  	    var barLink = function(d)  { return d['url']; };

            // Scales  
            var yScale = d3.scale.ordinal().domain(d3.range(0, data.length)).rangeBands([0, data.length * barHeight]);  
            var y = function (d, i) { return yScale(i); };  
            var yText = function (d, i) { return y(d, i) + yScale.rangeBand() / 2; };  
            var x = d3.scale.linear().domain([0, d3.max(data, barValue)]).range([0, maxBarWidth]);  
  
            // Svg container element  
            var chart = d3.select('#chart').append("svg")  
           .attr('width', maxBarWidth + barLabelWidth + valueLabelWidth)  
           .attr('height', gridLabelHeight + gridChartOffset + data.length * barHeight);  
  
            // Grid line labels  
            var gridContainer = chart.append('g')  
            .attr('transform', 'translate(' + barLabelWidth + ',' + gridLabelHeight + ')');  
            gridContainer.selectAll("text").data(x.ticks(10)).enter().append("text")  
           .attr("x", x)  
           .attr("dy", -3)  
           .attr("text-anchor", "middle")  
           .text(String);  
	
            // Vertical grid lines  
            gridContainer.selectAll("line").data(x.ticks(10)).enter().append("line")  
           .attr("x1", x)  
           .attr("x2", x)  
           .attr("y1", 0)  
           .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)  
           .style("stroke", "#ccc");  
  
            // Bar labels  
            var labelsContainer = chart.append('g')  
           .attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + (gridLabelHeight + gridChartOffset) + ')');  
            labelsContainer.selectAll('text').data(data).enter().append('text')  
           .attr('y', yText)  
           .attr('stroke', 'none')  
           .attr('fill', 'black')  
           .attr("dy", ".35em")  
  
            // Vertical-align: middle  
	    .attr('text-anchor', 'end')  
	    //.text(barLabel);
	    .append('a').attr({"xlink:href": barLink}).text(barLabel);
  	   
            // Bars  
            var barsContainer = chart.append('g')  
            .attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + gridChartOffset) + ')');  
            barsContainer.selectAll("rect").data(data).enter().append("rect")  
           .attr('y', y)  
           .attr('height', yScale.rangeBand())  
           .attr('width', function (d) { return x(barValue(d)); })  
           .attr('stroke', 'Gray')  
           .attr('fill', '#ccccb3');  
  
            // Bar value labels  
            barsContainer.selectAll("text").data(data).enter().append("text")  
           .attr("x", function (d) { return x(barValue(d)); })  
           .attr("y", yText)  
           .attr("dx", 3)   
           .attr("dy", ".35em")   
           .attr("text-anchor", "start")   
           .attr("fill", "black")  
           .attr("stroke", "none")  
           .text(function (d) { return d3.round(barValue(d), 2); });  
  
            // Start line  
            barsContainer.append("line")  
           .attr("y1", -gridChartOffset)  
           .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)  
           .style("stroke", "#000");  
  
        }  
