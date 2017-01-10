		
	d3.csv('./data-dailyftse.csv', function (error, data) {
        if (error) {
            console.error(error);
        }
        // create an empty object that nv is expecting
        var dailyftsedata = [
            {
                key: "FTSE 100 (£)",
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

        nv.utils.windowResize(function () {
            chart.update();
        });

        return chart;
    });
	
	});

