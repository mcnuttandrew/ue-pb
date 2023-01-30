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
    showWard2Data(wardNumber)
    updateMap()
}

// IFI to initialize charts to wards 29 and 35
(function initialWardData (){
    d3.json("../../data/wards_data.json").then(data => { 

        ward1Header = document.querySelector("#ward1-header")
        ward1Header.innerText = "Ward 29";

        ward2Header = document.querySelector("#ward2-header")
        ward2Header.innerText = "Ward 35";
    
    
        let ward1Data = data["ward_29"]
        console.log("data", data)
        console.log(ward1Data)
        let ward2Data = data["ward_35"]
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

        let raceChart1 = barChart(); 
            raceChart1.xVar("race");
            raceChart1.yVar("count");
            raceChart1.xVarSample("race-sample");
            raceChart1.yVarSample("count-sample");
            raceChart1.barClass("bar-chart-1");
            raceChart1.barSampleClass("bar-sample");
            raceChart1.svgClass("race-chart-1");
            raceChart1.yMax(yMax);
            raceChart1.title("Race")
        d3.select("#w1c1")
            .datum(ward1Data)
            .call(raceChart1);
        
        let raceChart2 = barChart(); 
            raceChart2.xVar("race");
            raceChart2.yVar("count");
            raceChart2.xVarSample("race-sample");
            raceChart2.yVarSample("count-sample");
            raceChart2.barClass("bar-chart-2");
            raceChart2.barSampleClass("bar-sample");
            raceChart2.svgClass("race-chart-2");
            raceChart2.yMax(yMax);
            raceChart2.title("Race")
        d3.select("#w2c1")
            .datum(ward2Data)
            .call(raceChart2);
        
        let incomeChart1 = barChart(); 
            incomeChart1.xVar("income");
            incomeChart1.yVar("count");
            incomeChart1.xVarSample("income-sample");
            incomeChart1.yVarSample("count-sample");
            incomeChart1.barClass("bar-chart-1");
            incomeChart1.barSampleClass("bar-sample");
            incomeChart1.svgClass("income-chart-1");
            incomeChart1.yMax(yMax);
            incomeChart1.title("Income")
        d3.select("#w1c2")
            .datum(ward1Data)
            .call(incomeChart1);
        
        let incomeChart2 = barChart(); 
            incomeChart2.xVar("income");
            incomeChart2.yVar("count");
            incomeChart2.xVarSample("income-sample");
            incomeChart2.yVarSample("count-sample");
            incomeChart2.barClass("bar-chart-2");
            incomeChart2.barSampleClass("bar-sample");
            incomeChart2.svgClass("income-chart-2");
            incomeChart2.yMax(yMax);
            incomeChart2.title("Income")
        d3.select("#w2c2")
            .datum(ward2Data)
            .call(incomeChart2);

        let educChart1 = barChart(); 
            educChart1.xVar("education");
            educChart1.yVar("count");
            educChart1.xVarSample("education-sample");
            educChart1.yVarSample("count-sample");
            educChart1.barClass("bar-chart-1");
            educChart1.barSampleClass("bar-sample");
            educChart1.svgClass("educ-chart-1");
            educChart1.yMax(yMax);
            educChart1.title("Education")
        d3.select("#w1c3")
            .datum(ward1Data)
            .call(educChart1);

        let educChart2 = barChart(); 
            educChart2.xVar("education");
            educChart2.yVar("count");
            educChart2.xVarSample("education-sample");
            educChart2.yVarSample("count-sample");
            educChart2.barClass("bar-chart-2");
            educChart2.barSampleClass("bar-sample");
            educChart2.svgClass("educ-chart-2");
            educChart2.yMax(yMax);
            educChart2.title("Education")
        d3.select("#w3c3")
            .datum(ward2Data)
            .call(educChart2);

    })
}) ()


function showWard1Data(wardNumber) {
    d3.json("../../data/wards_data.json").then(data => { 

        // update header
        document.getElementById("ward1-header").innerHTML="Ward " + wardNumber
        
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
                    isEducChartEmpty = document.querySelectorAll(".educ-chart-1")
  
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

                    if (isEducChartEmpty.length != 0) {
                        isEducChartEmpty.forEach(function(i) {
                            i.remove()
                          })
                    }
                    
                    filteredData = data[ward]
                    // console.log("filtered", filteredData)
                
                    let raceChart = barChart(); 
                    raceChart.xVar("race");
                    raceChart.yVar("count");
                    raceChart.xVarSample("race-sample");
                    raceChart.yVarSample("count-sample");
                    raceChart.barClass("bar-chart-1");
                    raceChart.barSampleClass("bar-sample");
                    raceChart.svgClass("race-chart-1");
                    raceChart.yMax(yMax);
                    raceChart.title("Race");
                    d3.select("#w1c1")
                        .datum(filteredData)
                        .call(raceChart);
                      
                    let incomeChart = barChart(); 
                        incomeChart.xVar("income");
                        incomeChart.yVar("count");
                        incomeChart.xVarSample("income-sample");
                        incomeChart.yVarSample("count-sample");
                        incomeChart.barClass("bar-chart-1");
                        incomeChart.barSampleClass("bar-sample");
                        incomeChart.svgClass("income-chart-1");
                        incomeChart.yMax(yMax);
                        incomeChart.title("Income");
                    d3.select("#w1c2")
                        .datum(filteredData)
                        .call(incomeChart);

                    let educChart = barChart(); 
                        educChart.xVar("education");
                        educChart.yVar("count");
                        educChart.xVarSample("education-sample");
                        educChart.yVarSample("count-sample");
                        educChart.barClass("bar-chart-1");
                        educChart.barSampleClass("bar-sample");
                        educChart.svgClass("educ-chart-1");
                        educChart.yMax(yMax);
                        educChart.title("Education");
                    d3.select("#w1c3")
                        .datum(filteredData)
                        .call(educChart);
                
                    }
            }
         }
    )      
    }

function showWard2Data(wardNumber) {
    d3.json("../../data/wards_data.json").then(data => { 

         // update header
         document.getElementById("ward2-header").innerHTML="Ward " + wardNumber

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
                
                    isRaceChartEmpty = document.querySelectorAll(".race-chart-2")
                    isIncomeChartEmpty = document.querySelectorAll(".income-chart-2")
                    isEducChartEmpty = document.querySelectorAll(".educ-chart-2")

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

                    if (isEducChartEmpty.length != 0) {
                        isEducChartEmpty.forEach(function(i) {
                            i.remove()
                          })
                    }

                    filteredData = data[ward]

                    let raceChart = barChart(); 
                        raceChart.xVar("race");
                        raceChart.yVar("count");
                        raceChart.xVarSample("race-sample");
                        raceChart.yVarSample("count-sample");
                        raceChart.barClass("bar-chart-2");
                        raceChart.barSampleClass("bar-sample");
                        raceChart.svgClass("race-chart-2");
                        raceChart.yMax(yMax);
                        raceChart.title("Race");
                    d3.select("#w2c1")
                        .datum(filteredData)
                        .call(raceChart);

                    let incomeChart = barChart(); 
                        incomeChart.xVar("income");
                        incomeChart.yVar("count");
                        incomeChart.xVarSample("income-sample");
                        incomeChart.yVarSample("count-sample");
                        incomeChart.barClass("bar-chart-2");
                        incomeChart.barSampleClass("bar-sample");
                        incomeChart.svgClass("income-chart-2");
                        incomeChart.yMax(yMax);
                        incomeChart.title("Income");
                    d3.select("#w2c2")
                        .datum(filteredData)
                        .call(incomeChart);

                    let educChart = barChart(); 
                        educChart.xVar("education");
                        educChart.yVar("count");
                        educChart.xVarSample("education-sample");
                        educChart.yVarSample("count-sample");
                        educChart.barClass("bar-chart-2");
                        educChart.barSampleClass("bar-sample");
                        educChart.svgClass("educ-chart-2");
                        educChart.yMax(yMax);
                        educChart.title("Education");
                    d3.select("#w3c3")
                        .datum(filteredData)
                        .call(educChart);
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