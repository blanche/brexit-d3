// from http://bl.ocks.org/phil-pedruco/7243857
d3.csv('./data.csv', function (error, data) {
    if (error) {
        console.error(error);
    }
    // create an empty object that nv is expecting
    employment_data = [
        {
            key: "GBP:EUR",
            type: "line",
            yAxis: 1,
            values: []
        },
        {
            key: "Employment Intentions",
            type: "bar",
            yAxis: 2,
            values: []
        }
    ];
    data.forEach(function (d) {
        employment_data[1].values.push({x: Date.parse(d.Date), y: parseFloat(d.employment_intentions)});
        employment_data[0].values.push({x: Date.parse(d.Date), y: parseFloat(d.EUR)});
        
    });

    nv.addGraph(function () {
        var chart = nv.models.multiChart()
            .margin({top: 30, right: 60, bottom: 50, left: 70})
            .yDomain2([-0.20, 1.40])
            .color(d3.scale.category10().range());
        chart.xAxis.tickFormat(function (d) {
            return d3.time.format('%b %Y')(new Date(d))
        });
        chart.yAxis1.tickFormat(d3.format(',.2f'));
        chart.yAxis1.axisLabel("GBP:EUR");
        chart.yAxis2.tickFormat(d3.format(',.2f'));
		chart.yAxis1.axisLabel("EUR");
		chart.yAxis2.axisLabel("Employment Intention");
		chart.xAxis.axisLabel("Time");

        d3.select('#employment svg')
            .datum(employment_data).call(chart);

        nv.utils.windowResize(function () {
            chart.update();
            drawBrexitLine('#employment', 0.795);
        });
        drawBrexitLine('#employment', 0.795);

        return chart;
    });
});