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

            return chart;
        });
    });
