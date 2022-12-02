document.addEventListener("DOMContentLoaded", setupListeners)

function setupListeners () {
    const dropdown1 = document.querySelector("#dropdown-1")
    dropdown1.addEventListener('change', handleDropdown1)
    const dropdown2 = document.querySelector("#dropdown-2")
    dropdown2.addEventListener('change', handleDropdown2)
}

//initialize ward numbers
window.wardNumber1 = "w29"
window.wardNumber2 = "w35"


function handleDropdown1 (e){
    let wardNumber = e.target.value.slice(5,7)
    window.wardNumber1 = "w" + wardNumber
    showWard1Data(wardNumber)
    updateMap()
}

function handleDropdown2 (e){
    let wardNumber = e.target.value.slice(5,7)
    window.wardNumber2 = "w" + wardNumber
    console.log(window.wardNumber2)
    showWard2Data(wardNumber)
    updateMap()
}

function showWard1Data(wardNumber) {
    d3.json("../../data/wards_data.json").then(data => { 
        let yMax = 0
        for(var ward in data) {
                df = data[ward]
                df.forEach((e) => {
                    if (e.count > yMax) {
                        yMax = e.count
                    }
                }
                )
            }

        for(var ward in data) {

                if (ward.slice(5,7) == wardNumber){
    
                    isRaceChartEmpty = document.querySelectorAll(".race-chart-1")
                    isIncomeChartEmpty = document.querySelectorAll(".income-chart-1")
  
                    if (isRaceChartEmpty.length != 0) {
                        isRaceChartEmpty.forEach(function(i) {
                            i.remove()
                          })
                    }
                
                    if (isIncomeChartEmpty.length != 0) {
                        isIncomeChartEmpty.forEach(function(i) {
                            i.remove()
                          })
                    }
                    
                    filteredData = data[ward]
                
                    let raceChart = barChart(); 
                    raceChart.xVar("race");
                    raceChart.yVar("count");
                    raceChart.barClass("bar-chart-1");
                    raceChart.svgClass("race-chart-1");
                    raceChart.yMax(yMax);

                    d3.select("#w1c1")
                        .datum(filteredData)
                        .call(raceChart);
                      
                    let incomeChart = barChart(); 
                    incomeChart.xVar("income");
                    incomeChart.yVar("count");
                    incomeChart.barClass("bar-chart-1");
                    incomeChart.svgClass("income-chart-1");
                    incomeChart.yMax(yMax);
                    d3.select("#w1c2")
                        .datum(filteredData)
                        .call(incomeChart);
                    }
            }
         }
    )      
    }

function showWard2Data(wardNumber) {
    d3.json("../../data/wards_data.json").then(data => { 

        let yMax = 0
        for(var ward in data) {
                df = data[ward]
                df.forEach((e) => {
                    if (e.count > yMax) {
                        yMax = e.count
                    }
                }
                )
            }

        for(var ward in data) {
                if (ward.slice(5,7) == wardNumber){
                    isRaceChartEmpty = document.getElementsByClassName("race-chart-2")
                    isIncomeChartEmpty = document.querySelectorAll(".income-chart-2")

                    if (isRaceChartEmpty.length != 0) {
                        isRaceChartEmpty.forEach(function(i) {
                            i.remove()
                          })
                    }
            
                    if (isIncomeChartEmpty.length != 0) {
                        isIncomeChartEmpty.forEach(function(i) {
                            i.remove()
                          })
                    }

                    filteredData = data[ward]

                    let raceChart = barChart(); 
                    raceChart.xVar("race");
                    raceChart.yVar("count");
                    raceChart.barClass("bar-chart-2");
                    raceChart.svgClass("race-chart-2");
                    raceChart.yMax(yMax);
                    d3.select("#w2c1")
                        .datum(filteredData)
                        .call(raceChart);

                    let incomeChart = barChart(); 
                    incomeChart.xVar("income");
                    incomeChart.yVar("count");
                    incomeChart.barClass("bar-chart-2");
                    incomeChart.svgClass("income-chart-2");
                    incomeChart.yMax(yMax);
                    d3.select("#w2c2")
                        .datum(filteredData)
                        .call(incomeChart);
                    }
            }
         }
    )      
    }


// make map chart instance a global variable
let chiMap = map(); // this is a promise

// wrap the required stuff in Promises
const mapRef = new Promise(function (resolve, reject) {
    resolve(chiMap);
});
const data = d3.json("../../data/ward_boundaries.geojson");

// When both of these Promises have resolved, call the chart component, etc.
Promise.all([mapRef, data])
    .then(function (values) {
        let [chiMap, data] = values; //object destructuring

        chiMap.wardSelectionOne(window.wardNumber1)
        chiMap.wardSelectionTwo(window.wardNumber2)

        d3.select("#map-container")
            .datum(data)
            .call(chiMap);
    })
    .catch(function (err) {
        console.log("error", err);
    });

function updateMap(){
        chiMap.wardSelectionOne(window.wardNumber1)
        chiMap.wardSelectionTwo(window.wardNumber2)
        chiMap.render();
}