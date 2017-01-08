d3.csv('../data-cate.csv', function (error, data) {
        console.log(data);
        if (error) {
            console.error(error);
        }
        ledata = [
            {
                key: "Export",
                color: "#3366cc",
                values: []
            },{
                key: "Import",
                color: "#dc3912",
                values: []
            }
        ];
        data.forEach(function (d) {
                ledata[0].values.push({label: d.Service, value: parseFloat(d.export)});
                ledata[1].values.push({label: d.Service, value: parseFloat(d.import)});
        });

      nv.addGraph(function() {
        var chart = nv.models.multiBarHorizontalChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .margin({top: 30, right: 20, bottom: 50, left: 175})
            .showValues(true) 
            .showControls(false)
            .color(d3.scale.category20().range());       

        chart.yAxis.tickFormat(d3.format(',.2f'))
                .axisLabel("Change in UK service product, quarter 3 (July to September) 2016 compared with quarter 2 (April to June) 2016 (£ million)")
                .axisLabelDistance(10);

         

        d3.select('#chart1 svg')
            .datum(ledata)
            .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
      });

    });