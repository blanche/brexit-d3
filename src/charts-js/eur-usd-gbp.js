// from http://bl.ocks.org/phil-pedruco/7243857
d3.csv('./data.csv', function (error, data) {
    if (error) {
        console.error(error);
    }
    // create an empty object that nv is expecting
    eur_usd_gbp_data = [
        {
            key: "GBP:EUR",
            type: "line",
            yAxis: 1,
            values: []
        },
        {
            key: "GBP:USD",
            type: "line",
            yAxis: 1,
            values: []
        }
    ];
    data.forEach(function (d) {
        eur_usd_gbp_data[0].values.push({x: Date.parse(d.Date), y: parseFloat(d.EUR)});
        eur_usd_gbp_data[1].values.push({x: Date.parse(d.Date), y: parseFloat(d.USD)});
    });

    nv.addGraph(function () {
        var chart = nv.models.multiChart()
            .margin({top: 30, right: 60, bottom: 50, left: 70})
            .color(d3.scale.category10().range());
        chart.xAxis.tickFormat(function (d) {
            return d3.time.format('%b %Y')(new Date(d))
        });
        //chart.yAxis1.tickValues(0)
        chart.yAxis1.tickFormat(d3.format(',.2f'));
        chart.yAxis2.tickFormat(d3.format(',.2f'));

        //chart.xAxis.axisLabel("x axis");
        chart.yAxis1.axisLabel("EUR/USD");
        chart.xAxis.axisLabel("Time");

        d3.select('#eur-usd-gbp svg')
            .datum(eur_usd_gbp_data).call(chart);

        nv.utils.windowResize(function () {
            chart.update();
            drawBrexitLine('#eur-usd-gbp', 0.795);
        });
        drawBrexitLine('#eur-usd-gbp', 0.795);

        return chart;
    });
});