document.addEventListener("DOMContentLoaded", setupListeners)

function setupListeners () {
    const checkbox = document.querySelector("#checkbox")
    checkbox.addEventListener('change', handleCheckbox)
}

function handleCheckbox (e){
    if (e.target.checked) {
        console.log("Checkbox is checked.")
        wardNumber = document.querySelector('.t:checked').value
        console.log(wardNumber)
        return wardNumber;
      } else {
        console.log("Checkbox is not checked.");
      }
}

// callbacks to record and manage responses
// also, any part of the DOM that is data-driven
// need to wait until page has loaded all html elements

d3.csv("../../data/race.csv").then(data => { 
    console.log("view data", data)
    let chartFxn = barChart(); 
    chartFxn.xVar("race");
    chartFxn.yVar("ward_29");
    d3.select('#ward2')
        .datum(data)
        .call(chartFxn);
    });


// $(document).ready(function () { //jquery

//     // mount chart components
//     d3.csv("../../data/race.csv").then(data => { 
//         let chartFxn = barChart(data);
//         chartFxn.xVar("race")
//         chartFxn.yVar("ward_29")
//         d3.select('#ward2')
//             .datum(data)
//             .call(chartFxn);
//     })
// });

