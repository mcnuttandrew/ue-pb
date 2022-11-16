// data file setup // THIS IS A PLACEHOLDER
const keys =  ["Trees", "Roads", "Stadium", "Apple_Pies"],
    values = [1,2,3,4];

//dummy data
let data = keys.map((keys, index) => {
    return {
    "Thing": keys,
    "Amount": +values[index],
    "elicit": 0
    }
});
console.log(data)

// create instance of chart component
let pbUtilBars = pbUtilityBars();

// main:
$(document).ready(function () {  
    // make our selection

    // set up chart component, and call
    pbUtilBars.dragMode("rank"); // initialize in rank mode
    d3.select("#utility-elicitation")
        .datum(data)
        .call(pbUtilBars);

});


//Temporary switch and different drag 
// make this a callback for toggle input
function switchDragMode() {
    // select the input switch and get current value (that was just clicked)
    let mode = "allocate";  // this should come from input
    // set dragMode for chart component
    pbUtilBars.dragMode(mode)
}

//updating budget remaining at the top
// do we need a way of triggering this inside of our chart component? maybe it should be a helper funciton inside the component
function updateBudget() {
    let budget = pbUtilBars.budget();
    d3.select("#budget")
        .text("Budget Remaining: $" + budget)
        .style("font-size", "1.5em")
}