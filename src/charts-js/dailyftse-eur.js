d3.csv('./data-dailyftse-gbp.csv', function (error, data) {
    if (error) {
        console.error(error);
    }
    // create an empty object that nv is expecting
    dailyftse_eurdata = [
        {
            key: "Daily FTSE (£)",
            type: "line",
            yAxis: 2,
            values: []
        },
        {
            key: "GBP:EUR",
            type: "line",
            yAxis: 1,
            values: []
        }
    ];
    data.forEach(function (d) {
        dailyftse_eurdata[0].values.push({x: Date.parse(d.Date), y: parseFloat(d.FTSEDaily)});
        dailyftse_eurdata[1].values.push({x: Date.parse(d.Date), y: parseFloat(d.GBPtoEUR)});
		
	});

    nv.addGraph(function () {
		var chart = nv.models.multiChart()
            .margin({top: 30, right: 60, bottom: 50, left: 70})
            .color(d3.scale.category10().range());
        
		chart.xAxis.tickFormat(function (d) {
            return d3.time.format('%b %d %Y')(new Date(d ))
        });

        chart.yAxis2.tickFormat(function(d) { return '£' + d3.format(',f')(d) });
		chart.yAxis1.tickFormat(d3.format(',.2f'));
		
		chart.yAxis2.axisLabel('FTSE 100 (£)');
		chart.yAxis1.axisLabel('GBP:EUR');
		
        d3.select('#dailyftse-eur svg')
            .datum(dailyftse_eurdata).call(chart);

        nv.utils.windowResize(function () {
            chart.update();
            drawBrexitLine('#dailyftse-eur', 0.2);
        });
        drawBrexitLine('#dailyftse-eur', 0.2);

        return chart;
    });
});
