//Chicago map

const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });

//Create SVG element
const svg = d3.select("#map-container")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

// Projection    
let projection = d3.geoMercator()
    .center([-87.723177, 41.778832])
    .translate([width / 2, height / 2])
    .scale(100000);

//Define path generator
let path = d3.geoPath()
    .projection(projection);


// Load GeoJson
d3.json("../../data/ward_boundaries.geojson").then(geodata => {
  
    //Bind data and create one path per GeoJSON feature
    svg.selectAll("path")
        .data(geodata.features)
        .enter()
        .append("path")
        .attr("d", d => path(d))
        .attr("stroke", "dimgray")
        .attr("fill", "white")
        
    projection.fitSize([width, height],geodata)
});



