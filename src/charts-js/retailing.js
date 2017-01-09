// from http://bl.ocks.org/phil-pedruco/7243857
d3.csv('./data.csv', function (error, data) {
    if (error) {
        console.error(error);
    }
    // create an empty object that nv is expecting
    retailing_data = [
        {
            key: "EUR",
            type: "line",
            yAxis: 1,
            values: []
        },
        {
            key: "Retailing Volume (averaged)",
            type: "line",
            yAxis: 2,
            values: []
        },
        {
            key: "Retailing Volume",
            type: "line",
            yAxis: 2,
            values: []
        }
    ];
    data.forEach(function (d) {
        retailing_data[1].values.push({x: Date.parse(d.Date), y: parseFloat(d.retailing_window)});
        retailing_data[2].values.push({x: Date.parse(d.Date), y: parseFloat(d.retailing_in_m)});
        retailing_data[0].values.push({x: Date.parse(d.Date), y: parseFloat(d.EUR)});
        
    });

    nv.addGraph(function () {
        var chart = nv.models.multiChart()
            .margin({top: 30, right: 60, bottom: 50, left: 70})
            .color(d3.scale.category10().range())
            .yDomain2([25, 34]);
        chart.xAxis.tickFormat(function (d) {
            return d3.time.format('%b %Y')(new Date(d))
        });
        chart.yAxis1.tickFormat(d3.format(',.2f'));
        chart.yAxis1.axisLabel("EUR to GBP");
        chart.yAxis2.tickFormat(d3.format(',.2f'));
        chart.yAxis2.axisLabel("Retail Volume in Millions GBP");

        d3.select('#retailing svg')
            .datum(retailing_data).call(chart);

        return chart;
    });
});