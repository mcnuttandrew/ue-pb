//SVG & constants //
const svgWidth = 860,
    svgHeight = 460,
    margin = { top: 30, right: 30, bottom: 30, left: 30 },
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

// data file setup // THIS IS A PLACEHOLDER
const keys =  ["Trees", "Roads", "Stadium", "Apple_Pies"],
    values = [1,2,3,4];

let xBand 
    drag = d3.drag()
    posObj = {} //populate with the objs Use helper function a POS OBJ



// //Checkbox/switch check
// console.log(document.getElementById("check").checked)
// if (document.getElementById("check").checked == true) { //This is not working. Throws an error
//     drag.on("start", rankStart)
//     .on("drag", dragRank)
//     .on("end", rankEnd)
// } else {
//     drag.on("start", dragStart)
//         .on("drag", dragging)
//         .on("end", dragEnd);  
// }


//Temporary switch and different drag
function rankTime() {
    return false
}
function allocateTime() {
    return true
}

if (allocateTime() == true) {
    drag.on("start", dragStart)
        .on("drag", dragging)
        .on("end", dragEnd); 
};

if (rankTime() == true) {
    drag.on("start", rankStart)
        .on("drag", dragRank)
        .on("end", rankEnd);
}


//dummy data
let data = keys.map((keys, index) => {
    return {
    "Thing": keys,
    "Amount": +values[index],
    "elicit": 0
    }
});
console.log(data)
//Change data structure to just be key value pairs
//Have list key/value pairs 


let dimension = data.map((d) => d.Thing) 
    console.log(dimension.map((d) => d));

//xBand = clamp(0, data.length, Math.floor(mousePos[0]/xScale.step()))

// Chart & svg setup  // 
const svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("id" , "elicitData") // binds #elicitData to the bars
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(drag);

//scales
let xScale = d3.scaleBand()
        .domain(dimension) //This isnt updating???
        .range([0,width])
        .padding(0.2),
    yScale = d3.scaleLinear()
        .domain([-0.2,10]) //Change to max dollar amount for PB
        .range([height,0]); 

//Establishing current position for the posObj
currentPos()



//tooltip/warning init
let tooltip = d3.select("body").append("div") 
    .attr("class", "tooltip")
    .style("opacity", 0);


//render bars     ///DO THIS FOR AXIS DIFFERENT VARIABLES AND SUCH 
/* 
bars.transition()
    .attr("x", ____)

axis.transition().....
    */

let bars = svg.selectAll("rect")
    .data(data) 
    .join("rect")
    .attr("x", (d) => xScale(d.Thing)) //CHANGE TO DIMENSION????
    .attr("y", (d) => yScale(d.elicit)) 
    .attr("height", (d) => yScale(-0.2) - yScale(d.elicit))
    .attr("width", xScale.bandwidth());

bars.text((d) => d.elicit) 
    .attr("fill", "steelblue")
    .on("mouseover", onMouse) //This might be the issue with grabbbing cursor style
    .on("mouseout", offMouse);



//updating budget remaining at the top
d3.select("#budget")
    .text("Budget Remaining: $" + yScale.domain()[1])
    .style("font-size", "1.5em")


//Some visual aids (Grabbing not working)
function onMouse(event, d) {
    d3.select(this).attr("stroke", "black")
    .attr("cursor", "grab")
}
function offMouse(event, d) {
    d3.select(this).attr("stroke", null)
}
function grabbing(event, d) {
    d3.select(this).attr("cursor", "grabbing")
    
};


//RENDERING Axis

svg.append('g')
    .attr("transform", "translate(0," +  height + ")")
    .call(d3.axisBottom(xScale)) // Change TO DIMENSION????

svg.append('g')
    .call(d3.axisLeft(yScale))


// Drag Functionality // adapted from https://observablehq.com/@d3/circle-dragging-i and https://observablehq.com/@duitel/you-draw-it-bar-chart
function clamp(a,b,c) { return Math.max(a, (Math.min(b, c))) }; //This clamp function is used to find the elicited value and assure it is in between bounds

function dragStart(event, d) {  
    /////CHANGE MOUSE CURSOR in these functions
};
//want grabbing 
function dragging(event, d) { 
//constants needed to solve for scaled Y value
    let mousePos = d3.pointer(event, this), 
        xBand = clamp(0, data.length, Math.floor(mousePos[0]/xScale.step()))
        xVal = data[xBand].Thing, //Finds Name of the band
        yVal = clamp(0, yScale.domain()[1], Math.floor(yScale.invert(mousePos[1]))); //Finds scaled Y value 
        
    
    //Halting Funciton and Checks
    if (getRemaining() > 0 || (getRemaining() <=0 && yVal < data[xBand].elicit)) {

        data.find((d) => d.Thing == xVal).elicit = yVal;

        drag.on("drag", dragging)
        tooltip.transition()
            .duration(100)
            .style("opacity",0)
    } else if (getRemaining() <=0) {

        tooltip.transition()
            .duration(100)
            .style("opacity",0.9);

        tooltip.html("You have run out of money") //position of warning tooltip, can/will move
            .data(data)
            .style("left", width/2 +"px")
            .style("top",  height/10 +10 +"px"); 
    } //maybe need an else here


/*
    bars.transition()
        .attr("y", (d) => yScale(d.elicit))
        .ease(d3.PolyOut.exponent(3))
        .duration(500)

*/
d3.select("#elicitData")
    .selectAll("rect")
    .data(data)
    .join("rect") //Allows for replacement/real time changes
    .attr("x", (d) => xScale(d.Thing)) // CHANGE DO DIMENSION???? IS THE IsSUE IN PLACES LIKE THIS
    .attr("y", (d) => yScale(d.elicit))
    .attr("height", (d) => yScale(-0.2) - yScale(d.elicit)) 
    .attr("width", xScale.bandwidth());

// Updates budget Remaining
d3.select("#budget")
    .data(getRemaining())
    .join("text")
    .text((d) => `Budget Remaining: $` + d )
    .style("font-size", "1.5em") 
};

function dragEnd(event, d) { //Nothing yet, just here as a placeholder
    
};

    


// //Helpers for Budget remaining/ Halting
function sum(array) {
    const arr = array
    const total = array.reduce( (a, b) => a + b, 0 );
    return total
};

function elicitArray() { //grabs the elicit array value
    var arr = []
    for (let i in [0,1,2,3]) { //Change this to Ranked Data /////////////////////
        arr.push(data[i].elicit)
    }
    return arr
}

function getRemaining() {
    let remain = [yScale.domain()[1] - sum(elicitArray())]
    return remain
}


//Ranking drag functions: Look at parallel coordinates example and drag labels.
function rankStart(event, d) {
    let xPos = (d3.pointer(event, this)[0])
        band = Math.floor(xPos/xScale.step()) //MAYBE CLAMP FOR THE EDGES
    posObj[dimension[band]] = xPos 
};
function dragRank(event, d) {
    let xPos = (d3.pointer(event, this)[0]) 
    posObj[dimension[band]] = xPos;
    /*
   
    bars.transition()
        .attr("x", dimension)
        .ease(d3.PolyOut.exponent(3))
        .duration(500)
    
    xAxis.transition()

    */

};
function rankEnd(event, d) {
    let xPos = (d3.pointer(event, this)[0])
    dimension.sort((a,b) => posObj[a] - posObj[b]) 
    xScale.domain(dimension); // updates dimension after drag is over
    currentPos();


};


//Helper for the ranks start and end
function currentPos() { //begining, 
    dimension.forEach((d) => posObj[d] = xScale(d) /*band location*/ );
};

// Scale is updated but need to reapply
// Need a function which will update the xAxis (IN THE DRAGEND) and location of the bars along it. 
// Call it withing the DragRank and RankEnd
// changing locations of all the things, in real time. 








// Data Handling //
//need to store/log the data gatherd or at least see it for now//











