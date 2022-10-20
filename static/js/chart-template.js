/*
 * REUSABLE CHART COMPONENT
 * 
 * Expects to be passed a d3 selection of a div to create a chart in.
 * Expects data formatted as follows:
 *  ...
 *  ...
 *  ...
 */
function chartName() {
    // declare global variables
    // this should include hardcoded constants used across multiple inner functions
    // as well as settings variables with getter/setter functions
    var div,
        setting;


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

    return chart;
}