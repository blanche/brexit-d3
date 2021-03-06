// from http://bl.ocks.org/phil-pedruco/7243857
d3.csv('./data.csv', function (error, data) {
    if (error) {
        console.error(error);
    }
    // create an empty object that nv is expecting
    ftse_data = [
        /*{
            key: "EUR",
            type: "line",
            yAxis: 1,
            values: []
        },*/
        {
            key: "FTSE100 (£)",
            type: "line",
            yAxis: 2,
            values: []
        }
    ];
    data.forEach(function (d) {
        //ftse_data[0].values.push({x: Date.parse(d.Date), y: parseFloat(d.EUR)});
        ftse_data[1].values.push({x: Date.parse(d.Date), y: parseFloat(d.ftse100)});
    });

    nv.addGraph(function () {
        var chart = nv.models.multiChart()
            .margin({top: 30, right: 60, bottom: 50, left: 70})
            .color(d3.scale.category10().range());
        chart.xAxis.tickFormat(function (d) {
            return d3.time.format('%b %Y')(new Date(d))
        });
        chart.yAxis1.tickFormat(d3.format(',.2f'));
        //chart.yAxis2.tickFormat(d3.format(',.2f'));

        d3.select('#ftse svg')
            .datum(ftse_data).call(chart);

        nv.utils.windowResize(function () {
            chart.update();
            drawBrexitLine('#ftse', 0.8);
        });
        drawBrexitLine('#ftse', 0.8);

        chart.update();
        return chart;
    });
});