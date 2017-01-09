d3.csv('./data.csv', function (error, data) {
        if (error) {
            console.error(error);
        }
        // create an empty object that nv is expecting
        percdata = [
            {
                key: "EUR",
                type: "line",
                yAxis: 1,
                values: []
            },
            {
                key: "Finance",
                type: "line",
                yAxis: 2,
                values: []
            },
			{
                key: "General",
                type: "line",
                yAxis: 2,
                values: []
            }
        ];
        data.forEach(function (d) {
            percdata[0].values.push({x: Date.parse(d.Date), y: parseFloat(d.EUR)});
            percdata[1].values.push({x: Date.parse(d.Date), y: parseFloat(d.finance)});
			percdata[2].values.push({x: Date.parse(d.Date), y: parseFloat(d.general)});

		});

        nv.addGraph(function () {
			var chart = nv.models.multiChart()
                .margin({top: 30, right: 60, bottom: 50, left: 70})
				//.yDomain1([1.12, 1.42])
                .color(d3.scale.category10().range());
            
			chart.xAxis.tickFormat(function (d) {
                return d3.time.format('%b %d %Y')(new Date(d))
            });
			
            chart.yAxis1.tickFormat(d3.format(',.2f'));
            chart.yAxis2.tickFormat(d3.format(',.2f'));
			chart.yAxis1.axisLabel('EUR to GBP');
			chart.yAxis2.axisLabel('Consumer Perception');
			
            d3.select('#consumerperc svg')
                .datum(percdata).call(chart);

            return chart;
        });
    });
