d3.csv('../data.csv', function (error, data) {
        console.log(data);
        if (error) {
            console.error(error);
        }
        ledata = [
            {
                key: "Trade",
                values: []
            }
            // 
        ];
        data.forEach(function (d) {
            if (d.Date === "2016-07-01") {
                ledata[0].values.push({label: "Import Goods", value: parseFloat(d.import_goods)});
                ledata[0].values.push({label: "Export Goods", value: parseFloat(d.export_goods)});
                ledata[0].values.push({label: "Import Services", value: parseFloat(d.import_services)});
                ledata[0].values.push({label: "Export Services", value: parseFloat(d.export_services)});
                ledata[0].values.push({label: "Import Oil", value: parseFloat(d.import_oil)});
                ledata[0].values.push({label: "Export Oil", value: parseFloat(d.export_oil)});
            };
        });
        console.log(ledata)
      nv.addGraph(function() {
        var chart = nv.models.multiBarHorizontalChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .margin({top: 30, right: 20, bottom: 50, left: 175})
            .showValues(true) 
            .showControls(false)
            .color(d3.scale.category20().range());       

        chart.yAxis.tickFormat(d3.format(',.2f'))
                .axisLabel("Value of UK Trade (£ million seasonally adjusted)")
                .axisLabelDistance(10);

         

        d3.select('#chart1 svg')
            .datum(ledata)
            .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
      });

    });