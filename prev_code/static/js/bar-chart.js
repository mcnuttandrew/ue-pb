/*
 * REUSABLE CHART COMPONENT
 * 
 * Expects to be passed a d3 selection of a div to create a chart in.
 * Expects data formatted as follows:
 *  ...
 *  ...
 *  ...
 */
function barChart() {
    // declare global variables
    // this should include hardcoded constants used across multiple inner functions
    // as well as settings variables with getter/setter functions
    var div,
        layout =
        {
            "height": 700,
            "width": 900,
            "margin": ({'top': 35, 'right': 30, 'bottom':150, 'left':110})
        },
        h = layout["height"] - layout["margin"]["top"] - layout["margin"]["bottom"],
        w = layout["width"] - layout["margin"]["left"] - layout["margin"]["right"],
        xVar,
        yVar,
        xVarSample,
        yVarSample,
        chartWrapper,
        barClass,
        barSampleClass,
        svgClass,
        yMax,
        title;
    

    // constructor function 
    // no need to change this
    function chart(selection) {
        this.selection = selection
        var that = this;
        selection.each(function(data, i) {
            init(data, that);
        })
    }
    
    // initialize the chart
    // this is the first rendering when the component mounts
    function init(data, that) { 
        // assign selection to global variable
        div = that.selection;

        // D3 code to render the chart for the first time
        // this should include any legends or fiducial markings that will 
        // not need to be rerended upon interactions
        // this might also include certain event listeners that need to be set up
        // from the first render

        // if we need to reshape the input data, do it here and store in a global variable
        
        // set up scales and axes once data is ready 

        let svg = div.append("svg")
            .attr("viewBox", [0, 0, layout["width"], layout["height"]])
            .attr("class", svgClass); 

        let x = d3.scaleBand()  
            .domain(data.map(d => d[xVar])) 
            .range([0, w])
            .padding(0.1); 
    
        let y = d3.scaleLinear() 
            // .domain([0, d3.max(data, (d) => d[yVar])])
            // .domain([0, getMax(data, yVar)]).nice()
            .domain([0, yMax]).nice()
            .range([h, 0]); 
        
        const xAxis = g => g 
            .attr("transform", `translate(${layout["margin"]["left"]}, ${layout["height"] - layout["margin"]["bottom"]})`) 
            .call(d3.axisBottom(x)) 
             //select all text labels in the axis, then position + rotate
                .selectAll("text")  
                .attr("class", "xaxis-lables")
                .style("text-anchor", "end")
                .attr("dx", "-1em")
                .attr("dy", "-0.5em")
                .attr("transform", "rotate(-37)");

        const yAxis = g => g  
            .attr("transform", `translate(${layout["margin"]["left"]}, ${layout["margin"]["top"]})`)
            .call(d3.axisLeft(y))
            //select all text labels in the axis, then position + rotate
                .selectAll("text")  
                .attr("class", "yaxis-lables")

        svg.append("g") 
            .attr("class", "y-ticks")
            .call(xAxis);
    
        svg.append("g")
            .attr("class", "x-ticks")
            .call(yAxis);

        // Chart title
        svg.append("text")
            .attr("x", (layout["width"] / 2))             
            .attr("y", 30)
            .attr("text-anchor", "middle")  
            .attr("class", "chart-title")
            .text(title);

        chartWrapper = svg.append("g")
            .attr("class", "canvas")
            .attr('transform', `translate(${layout["margin"]["left"]}, ${layout["margin"]["top"]})`);
        
        let bar = chartWrapper.selectAll(".bar") 
            .append("g")
            .data(data) 
            .join("g")
            .attr("class", "bar");
    
        bar.append("rect")
            .attr("class", barClass)
            .attr("x", d => x(d[xVar])) 
            .attr("width", x.bandwidth())
            .attr("y", d => y(d[yVar]))
            // .attr("fake", d => console.log(h - y(d[yVar])))
            // .attr("fake", d => console.log(d,  h - y(d[yVar])))
            .attr("fake", d => console.log(d, h, y(d[yVar]), h - y(d[yVar])))
            .attr("height", d => h - y(d[yVar]));
        
            // svg.append("text")
            // .attr("class", "x-label")
            // .attr("text-anchor", "middle")
            // .attr("x", 450)
            // .attr("y", 700)
            // .text(xVar);

            svg.append("text")
            .attr("class", "y-label")
            .attr("text-anchor", "middle")
            .attr("x", -260)
            .attr("y", 16)
            .attr("transform", "rotate(-90)")
            .style("font-size", "22px")
            .text("Counts");
        
        // bars from sample data
        let barSample = chartWrapper.selectAll(".bar-s") 
            .append("g")
            .data(data) 
            .join("g")
            .attr("class", "bar-s");
        
        barSample.append("rect")
            .attr("class", barSampleClass)
            .attr("x", d => x(d[xVarSample])) 
            .attr("width", x.bandwidth())
            .attr("y", d => y(d[yVarSample]))
            .attr("height", d => h - y(d[yVarSample]));

        // call the external-facing render function
        chart.render();
    }
    
    // this code will re-run each time the chart changes in response to user interactions
    chart.render = function() {
        // defer rendering until elements from init created
        var domRendered = $.Deferred();

        // wait until the DOM is ready so that elements exist
        $.when(domRendered).done(function () {
            // D3 code to update the chart
            // may need to bind some event listeners to DOM elements here
            
        });

        // now allow inner html for dynamically created elements to render 
        domRendered.resolve();
    }


    // helper functions to handle data manipulations and scaling

    function getMax(data, field) {
        let max = 0
        data.forEach(d => {
            if (d[field] > max) {
                max = d[field]
            }
        })
        return max
    }
    
    
    // getter and setter functions
    // these are external-facing
    // there should be one for each global variable that we might need to
    // get the value of or set from outside the chart component
    // think of these as controls or settings we want an interface for
    chart.setting = function(_) {
        if (!arguments.length) return setting;
        setting = _;
        return chart;
    };

    chart.xVar = function(_) {
        if (!arguments.length) return xVar;
        xVar = _;
        return chart;
    };

    chart.yVar = function(_) {
        if (!arguments.length) return yVar;
        yVar = _;
        return chart;
    };

    chart.xVarSample = function(_) {
        if (!arguments.length) return xVarSample;
        xVarSample = _;
        return chart;
    };

    chart.yVarSample = function(_) {
        if (!arguments.length) return yVarSample;
        yVarSample = _;
        return chart;
    };

    chart.barClass = function(_) {
        if (!arguments.length) return barClass;
        barClass = _;
        return chart;
    };

    chart.barSampleClass = function(_) {
        if (!arguments.length) return barSampleClass;
        barSampleClass = _;
        return chart;
    };

    chart.svgClass = function(_) {
        if (!arguments.length) return svgClass;
        svgClass = _;
        return chart;
    };

    chart.title = function(_) {
        if (!arguments.length) return title;
        title = _;
        return chart;
    };

    chart.yMax = function(_) {
        if (!arguments.length) return yMax;
        yMax = _;
        return chart;
    };

    return chart;

    

    
}
