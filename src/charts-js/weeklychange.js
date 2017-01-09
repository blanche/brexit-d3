// from http://bl.ocks.org/phil-pedruco/7243857
d3.csv('./data-weeklychange.csv', function (error, data) {
    if (error) {
        console.error(error);
    }
    // create an empty object that nv is expecting
    weeklychange_data = [
        {
            key: "Percentage",
            type: "bar",
            yAxis: 1,
			color: "#ff7f0e",
            values: []
        }
        
    ];
    data.forEach(function (d) {
		weeklychange_data[0].values.push({x: Date.parse(d.Date), y: parseFloat(d.Change)});
    });


    nv.addGraph(function() {
        var chart = nv.models.historicalBarChart()
             .margin({top: 30, right: 60, bottom: 50, left: 70})
			//.margin({left: 100, bottom: 100})
            .useInteractiveGuideline(true)
            .duration(250)
            ;

        // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        
		
		chart.xAxis
            .axisLabel("Week")
            .tickFormat(function (d) {
				return d3.time.format('%b %Y')(new Date(d))
			});
		
		
        chart.yAxis
            .axisLabel('Percentage (%)')
            .tickFormat(d3.format(',.2f'));

        chart.showXAxis(true);

        d3.select('#weeklychange svg')
            .datum(weeklychange_data).call(chart);

        nv.utils.windowResize(chart.update);
        chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
        
		return chart;
    });

});
	
	
    //Simple test data generators
    /*function sinAndCos() {
        var sin = [],
            cos = [];

        for (var i = 0; i < 100; i++) {
            sin.push({x: i, y: Math.sin(i/10)});
            cos.push({x: i, y: .5 * Math.cos(i/10)});
        }

        return [
            {values: sin, key: "Sine Wave", color: "#ff7f0e"},
            {values: cos, key: "Cosine Wave", color: "#2ca02c"}
        ];
    }

    function sinData() {
        var sin = [];

        for (var i = 0; i < 100; i++) {
            sin.push({x: i, y: Math.sin(i/10) * Math.random() * 100});
        }

        return [{
            values: sin,
            key: "Sine Wave",
            color: "#ff7f0e"
        }];
    }*/

