		
	d3.csv('./data-dailyftse.csv', function (error, data) {
        if (error) {
            console.error(error);
        }
        // create an empty object that nv is expecting
        var dailyftsedata = [
            {
                key: "FTSE 100",
                type: "area",
                yAxis: 1,
                values: []
            }
        ];
        data.forEach(function (d) {
            dailyftsedata[0].values.push({x: Date.parse(d.Date), y: parseFloat(d.FTSEDaily)});
        });
		
    
    nv.addGraph(function() {
		var	chart = nv.models.linePlusBarChart()
            .margin({top: 30, right: 60, bottom: 50, left: 70})
            //.legendRightAxisHint(' [Using Right Axis]')
            .color(d3.scale.category10().range());

        chart.xAxis.tickFormat(function(d) {
    		return d3.time.format('%b %d %Y')(new Date(d))
        }).showMaxMin(false);

        chart.y2Axis.tickFormat(function(d) { return '£' + d3.format(',f')(d) });
        //chart.bars.forceY([0]).padData(false);

        chart.x2Axis.tickFormat(function(d) {
            //return d3.time.format('%x')(new Date(d))
			return d3.time.format('%b %d %Y')(new Date(d))
        }).showMaxMin(false);

        d3.select('#dailyftse svg')
            .datum(dailyftsedata).call(chart);

        nv.utils.windowResize(chart.update);

        chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

        function drawBrexitLine(chartId, pos) {
            var myline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            var width = Math.ceil($(chartId + ' svg:first-child').width() * pos);
            myline.setAttribute('class', 'brexit-line');
            myline.setAttribute('x1', width);
            myline.setAttribute('y1', '30');
            myline.setAttribute('x2', width);
            myline.setAttribute('y2', '440');
            $('#dailyftse svg:first-child .brexit-line').remove();
            $('#dailyftse svg:first-child').append(myline);
        }

        nv.utils.windowResize(function () {
            chart.update();
            drawBrexitLine('#dailyftse', 0.8);
        });
        drawBrexitLine('#dailyftse', 0.8);

        return chart;
    });
	
	});

