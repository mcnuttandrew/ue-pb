
d3.csv("../../data/race.csv").then(data => { 
    for (let d of data) {
        d.cases = +d.cases; 
        // console.log("here", d["race"]);
    }

    const height = 400,
        width = 800,
        margin = ({top: 25, right: 30, bottom:50, left:70});

    let svg = d3.select("#ward1")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); 
    
    let x = d3.scaleBand()  
        .domain(data.map(d => d.race)) 
        .range([margin.left, width - margin.right])
        .padding(0.1); 

    let y = d3.scaleLinear() 
        // .domain(d3.extent(data, d => d.ward_29_race)).nice()
        .domain([0, d3.max(data, (d) => d.ward_29)]).nice() 
        .range([height - margin.bottom, margin.top]); 
    
    const xAxis = g => g 
        .attr("transform", `translate(0, ${height -margin.bottom + 5})`) 
        .call(d3.axisBottom(x)) 
    
    const yAxis = g => g  
        .attr("transform", `translate(${margin.left - 5}, 0)`)
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
        .attr("fill", "steelblue")
        .attr("class", "bars")
        .attr("x", d => x(d.race)) 
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.ward_29))
        .attr("height", d => y(0) - y(d.ward_29));

    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "middle")
        .attr("x", 350)
        .attr("y", 390)
        // .attr("x", width - margin.right)
        // .attr("y", height)
        // .attr("dx", "0.5em") 
        // .attr("dy", "-0.5em") 
        .text("Race");

    svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "middle")
        .attr("x", -170)
        .attr("y", 10)
        // .attr("x", -margin.top/2)
        // .attr("dx", "-0.5em")
        // .attr("y", 10)
        .attr("transform", "rotate(-90)")
        .text("Counts");
 });


