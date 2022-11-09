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
            "height": 400,
            "width": 800,
            "margin": ({'top': 25, 'right': 30, 'bottom':35, 'left':70})
        },
        xVar,
        yVar;
    

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

        let svg = d3.select(div)
            .append("svg")
            .attr("viewBox", [0, 0, layout["width"], layout["height"]]); 

        let x = d3.scaleBand()  
            .domain(data.map(d => d[xVar])) 
            .range([layout["margin"]["left"], layout["width"] - layout["margin"]["right"]])
            .padding(0.1); 
    
        let y = d3.scaleLinear() 
            .domain([0, d3.max(data, (d) => d[yVar])]).nice() 
            .range([layout["height"] - layout["margin"]["bottom"], layout["margin"]["top"]]); 
        
        const xAxis = g => g 
            .attr("transform", `translate(0, ${layout["height"] - layout["margin"]["bottom"] + 5})`) 
            .call(d3.axisBottom(x)) 

        const yAxis = g => g  
            .attr("transform", `translate(${layout["margin"]["left"] - 5}, 0)`)
            .call(d3.axisLeft(y))

        svg.append("g") 
            .call(xAxis);
    
        svg.append("g")
            .call(yAxis);
        
        let bar = svg.selectAll(".bar") 
            .append("g")
            .data(data) 
            .join("g")
            .attr("class", "bar");
    
        bar.append("rect")
            .attr("fill", "green")
            .attr("x", d => x(d[xVar])) 
            .attr("width", x.bandwidth())
            .attr("y", d => y(d[yVar]))
            .attr("height", d => y(0) - y(d[yVar]));
        
            svg.append("text")
            .attr("class", "x-label")
            .attr("text-anchor", "middle")
            .attr("x", 350)
            .attr("y", 390)
            .text(xVar);

            svg.append("text")
            .attr("class", "y-label")
            .attr("text-anchor", "middle")
            .attr("x", -170)
            .attr("y", 10)
            .attr("transform", "rotate(-90)")
            .text("Counts");

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

    return chart;
}