d3.csv('data-cate.csv', function (error, data) {
    console.log(data);
    var c10 = d3.scale.category10();
    if (error) {
        console.error(error);
    }
    import_export_categories_data = [
        {
            key: "Export",
            color: c10(1),
            values: []
        }, {
            key: "Import",
            color: c10(2),
            values: []
        }
    ];
    data.forEach(function (d) {
        import_export_categories_data[0].values.push({label: d.Goods, value: parseFloat(d.Export)});
        import_export_categories_data[1].values.push({label: d.Goods, value: parseFloat(d.Import)});
    });

    nv.addGraph(function () {
        var chart = nv.models.multiBarHorizontalChart()
            .x(function (d) {
                return d.label
            })
            .y(function (d) {
                return d.value
            })
            .margin({top: 30, right: 20, bottom: 50, left: 175})
            .showValues(true)
            .showControls(false)
            .color(d3.scale.category20().range());

        chart.yAxis.tickFormat(d3.format(',.2f'))
            .axisLabel("Change in UK trade value in goods, July 2016 compared with June 2016. (£ million)")
            .axisLabelDistance(5);

        d3.select('#goods-categories svg')
            .datum(import_export_categories_data)
            .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });

});