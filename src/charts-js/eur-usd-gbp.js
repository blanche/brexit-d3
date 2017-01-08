// from http://bl.ocks.org/phil-pedruco/7243857
d3.csv('./data.csv', function (error, data) {
    if (error) {
        console.error(error);
    }
    // create an empty object that nv is expecting
    eur_usd_gbp_data = [
        {
            key: "EUR",
            type: "line",
            yAxis: 1,
            values: []
        },
        {
            key: "USD",
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

        function drawBrexitLine(chartId, pos) {
            var myline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            var width = Math.ceil($(chartId + ' svg:first-child').width() * pos);
            myline.setAttribute('class', 'brexit-line');
            myline.setAttribute('x1', width);
            myline.setAttribute('y1', '30');
            myline.setAttribute('x2', width);
            myline.setAttribute('y2', '440');
            $('#eur-usd-gbp svg:first-child .brexit-line').remove();
            $('#eur-usd-gbp svg:first-child').append(myline);
        }

        nv.utils.windowResize(function () {
            chart.update();
            drawBrexitLine('#eur-usd-gbp', 0.8);
        });
        drawBrexitLine('#eur-usd-gbp', 0.8);

        return chart;
    });
});