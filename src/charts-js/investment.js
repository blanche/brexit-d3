d3.csv('./data.csv', function (error, data) {
    if (error) {
        console.error(error);
    }
    // create an empty object that nv is expecting
    invdata = [
        {
            key: "GBP:EUR",
            type: "line",
            yAxis: 1,
            values: []
        },
		{
            key: "Investment",
            type: "bar",
            yAxis: 2,
            values: []
        }
    ];
    data.forEach(function (d) {
        invdata[0].values.push({x: Date.parse(d.Date), y: parseFloat(d.EUR)});
        invdata[1].values.push({x: Date.parse(d.Date), y: parseFloat(d.investment_intentions)});

	});

    nv.addGraph(function () {
		var chart = nv.models.multiChart()
            .margin({top: 30, right: 60, bottom: 50, left: 70})
			.yDomain1([0, 1.9])
            .color(d3.scale.category10().range());
        
		chart.xAxis.tickFormat(function (d) {
            return d3.time.format('%b %d %Y')(new Date(d))
        });
		
        chart.yAxis1.tickFormat(d3.format(',.2f'));
        chart.yAxis2.tickFormat(d3.format(',.2f'));
		chart.yAxis1.axisLabel('GBP:EUR');
		//chart.yAxis2.axisLabel('');
		
        d3.select('#investment svg')
            .datum(invdata).call(chart);

        function drawBrexitLine(chartId, pos) {
            var myline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            var width = Math.ceil($(chartId + ' svg:first-child').width() * pos);
            myline.setAttribute('class', 'brexit-line');
            myline.setAttribute('x1', width);
            myline.setAttribute('y1', '30');
            myline.setAttribute('x2', width);
            myline.setAttribute('y2', '440');
            $('#investment svg:first-child .brexit-line').remove();
            $('#investment svg:first-child').append(myline);
        }

        nv.utils.windowResize(function () {
            chart.update();
            drawBrexitLine('#investment', 0.8);
        });
        drawBrexitLine('#investment', 0.8);

        return chart;
    });
});
