import * as d3 from 'd3';
import barChart from './charts/bar-chart';
import map from './charts/map';

export default function root() {
  // todo there's probably a bunch of async issues in this
  initialWardData();
  const dropdown1 = document.querySelector('#dropdown-1');
  dropdown1.addEventListener('change', handleDropdown1);
  const dropdown2 = document.querySelector('#dropdown-2');
  dropdown2.addEventListener('change', handleDropdown2);

  makeMap();
}

//initialize ward numbers
window.wardNumber1 = 'w29';
window.wardNumber2 = 'w35';

function handleDropdown1(e) {
  let wardNumber = e.target.value.slice(5, 7);
  window.wardNumber1 = 'w' + wardNumber;
  showWard1Data(wardNumber);
  updateMap();
}

function handleDropdown2(e) {
  let wardNumber = e.target.value.slice(5, 7);
  window.wardNumber2 = 'w' + wardNumber;
  console.log(window.wardNumber2);
  showWard2Data(wardNumber);
  updateMap();
}

// IFI to initialize charts to wards 29 and 35
function initialWardData() {
  d3.json('../../data/wards_data.json').then((data) => {
    let ward1Data = data['ward_29'];
    let ward2Data = data['ward_35'];
    let yMax = 0;

    for (var ward in data) {
      df = data[ward];
      df.forEach((e) => {
        if (e.count > yMax) {
          yMax = e.count;
        }
      });
    }

    let raceChart1 = barChart();
    raceChart1.xVar('race');
    raceChart1.yVar('count');
    raceChart1.barClass('bar-chart-1');
    raceChart1.svgClass('race-chart-1');
    raceChart1.yMax(yMax);
    d3.select('#w1c1').datum(ward1Data).call(raceChart1);

    let raceChart2 = barChart();
    raceChart2.xVar('race');
    raceChart2.yVar('count');
    raceChart2.barClass('bar-chart-2');
    raceChart2.svgClass('race-chart-2');
    raceChart2.yMax(yMax);
    d3.select('#w2c1').datum(ward2Data).call(raceChart2);

    let incomeChart1 = barChart();
    incomeChart1.xVar('income');
    incomeChart1.yVar('count');
    incomeChart1.barClass('bar-chart-1');
    incomeChart1.svgClass('income-chart-1');
    incomeChart1.yMax(yMax);
    d3.select('#w1c2').datum(ward1Data).call(incomeChart1);

    let incomeChart2 = barChart();
    incomeChart2.xVar('income');
    incomeChart2.yVar('count');
    incomeChart2.barClass('bar-chart-2');
    incomeChart2.svgClass('income-chart-2');
    incomeChart2.yMax(yMax);
    d3.select('#w2c2').datum(ward2Data).call(incomeChart2);
  });
}

function showWard1Data(wardNumber) {
  d3.json('../../data/wards_data.json').then((data) => {
    let yMax = 0;
    for (var ward in data) {
      df = data[ward];
      df.forEach((e) => {
        if (e.count > yMax) {
          yMax = e.count;
        }
      });
    }

    for (var ward in data) {
      if (ward.slice(5, 7) == wardNumber) {
        isRaceChartEmpty = document.querySelectorAll('.race-chart-1');
        isIncomeChartEmpty = document.querySelectorAll('.income-chart-1');

        if (isRaceChartEmpty.length != 0) {
          isRaceChartEmpty.forEach(function (i) {
            i.remove();
          });
        }

        if (isIncomeChartEmpty.length != 0) {
          isIncomeChartEmpty.forEach(function (i) {
            i.remove();
          });
        }

        filteredData = data[ward];
        // console.log("filtered", filteredData)

        let raceChart = barChart();
        raceChart.xVar('race');
        raceChart.yVar('count');
        raceChart.barClass('bar-chart-1');
        raceChart.svgClass('race-chart-1');
        raceChart.yMax(yMax);

        d3.select('#w1c1').datum(filteredData).call(raceChart);

        let incomeChart = barChart();
        incomeChart.xVar('income');
        incomeChart.yVar('count');
        incomeChart.barClass('bar-chart-1');
        incomeChart.svgClass('income-chart-1');
        incomeChart.yMax(yMax);
        d3.select('#w1c2').datum(filteredData).call(incomeChart);
      }
    }
  });
}

function showWard2Data(wardNumber) {
  d3.json('../../data/wards_data.json').then((data) => {
    let yMax = 0;
    for (var ward in data) {
      df = data[ward];
      df.forEach((e) => {
        if (e.count > yMax) {
          yMax = e.count;
        }
      });
    }

    for (var ward in data) {
      if (ward.slice(5, 7) == wardNumber) {
        isRaceChartEmpty = document.querySelectorAll('.race-chart-2');
        isIncomeChartEmpty = document.querySelectorAll('.income-chart-2');

        if (isRaceChartEmpty.length != 0) {
          isRaceChartEmpty.forEach(function (i) {
            i.remove();
          });
        }

        if (isIncomeChartEmpty.length != 0) {
          isIncomeChartEmpty.forEach(function (i) {
            i.remove();
          });
        }

        const filteredData = data[ward];

        let raceChart = barChart();
        raceChart.xVar('race');
        raceChart.yVar('count');
        raceChart.barClass('bar-chart-2');
        raceChart.svgClass('race-chart-2');
        raceChart.yMax(yMax);
        d3.select('#w2c1').datum(filteredData).call(raceChart);

        let incomeChart = barChart();
        incomeChart.xVar('income');
        incomeChart.yVar('count');
        incomeChart.barClass('bar-chart-2');
        incomeChart.svgClass('income-chart-2');
        incomeChart.yMax(yMax);
        d3.select('#w2c2').datum(filteredData).call(incomeChart);
      }
    }
  });
}

function makeMap() {
  // make map chart instance a global variable
  let chiMap = map(); // this is a promise

  // wrap the required stuff in Promises
  const mapRef = new Promise(function (resolve, reject) {
    resolve(chiMap);
  });
  const data = d3.json('../../data/ward_boundaries.geojson');

  // When both of these Promises have resolved, call the chart component, etc.
  Promise.all([mapRef, data])
    .then(function (values) {
      let [chiMap, data] = values; //object destructuring

      chiMap.wardSelectionOne(window.wardNumber1);
      chiMap.wardSelectionTwo(window.wardNumber2);

      d3.select('#map-container').datum(data).call(chiMap);
    })
    .catch(function (err) {
      console.log('error', err);
    });
}

function updateMap() {
  chiMap.wardSelectionOne(window.wardNumber1);
  chiMap.wardSelectionTwo(window.wardNumber2);
  chiMap.render();
}
