// from http://bl.ocks.org/phil-pedruco/7243857
d3.csv('./data.csv', function (error, data) {
    console.log(data);
    if (error) {
        console.error(error);
    }
    // create an empty object that nv is expecting
    investment_data = [
        {
            key: "EUR",
            type: "line",
            yAxis: 1,
            values: []
        },
        {
            key: "Investment Intentions",
            type: "bar",
            yAxis: 2,
            values: []
        }
    ];
    data.forEach(function (d) {
        investment_data[1].values.push({x: Date.parse(d.Date), y: parseFloat(d.investment_intentions)});
        investment_data[0].values.push({x: Date.parse(d.Date), y: parseFloat(d.EUR)});

    });

    nv.addGraph(function () {
        var chart = nv.models.multiChart()
            .margin({top: 30, right: 60, bottom: 50, left: 70})
            .yDomain2([0, 1.90])
            .color(d3.scale.category10().range());
        chart.xAxis.tickFormat(function (d) {
            return d3.time.format('%b %Y')(new Date(d))
        });
        chart.yAxis1.tickFormat(d3.format(',.2f'));
        chart.yAxis2.tickFormat(d3.format(',.2f'));
        chart.yAxis1.axisLabel("EUR");
		chart.yAxis2.axisLabel("Invesment Intention");
		chart.xAxis.axisLabel("Time");

        d3.select('#investment svg')
            .datum(investment_data)
            .transition().duration(500).call(chart);

        return chart;
    });
});