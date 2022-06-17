// Initiate variables
var columnCount = 0;
var rowCount = 0;
var shapeCount = 0;
var iteration = 0;
const multiplier = 10;
var showValues = false;
var valuesMatrix = [[]];
var neighborsSizeX = 1;
var neighborsSizeY = 1;
var styles = ['stripe', 'color', 'rectangle', 'frame', 'circle', 'brick'];
var styleIndex = 0;
var showPopup = false;


let testMatrix = [
    [0, 1, 0, 3, 5],
    [1, 1, 0, 3, 4],
    [0, 0, 2, 3, 0],
    [0, 1, 0, 3, 5],
]

// Refer to shape-style.css
var shapeList = [
    '<div class ="shape">0</div>',
    '<div class ="shape">1</div>',
    '<div class ="shape">2</div>',
    '<div class ="shape">3</div>',
    '<div class ="shape">4</div>',
    '<div class ="shape">5</div>',
    '<div class ="shape">6</div>',
    '<div class ="shape">7</div>',
    '<div class ="shape">8</div>',
    '<div class ="shape">9</div>'
    ]

// Reset the variables to default
function reset() {
    columnCount = 51; //51
    rowCount = 81; //81
    shapeCount = 4;
    iteration = 0;
    neighborsSizeX = 1;
    neighborsSizeY = 1;

    refreshGrid()
}

// Change the graphic representation of the matrix
function changeStyle() {
    if (styleIndex === styles.length-1 ) {
        styleIndex = 0
    }
    
    else {
        styleIndex += 1
    }

    matrixToGrid (valuesMatrix);
}


// Generates a random integer between min and max
function getRandomInt(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function generateDirections (m, n) {
    let directions = [];
    let rowCount = m*2+1;
    let columnCount = n*2+1;

    for (let i = 0; i < rowCount; i++) {
        let matrixRow = [];
        for (let j = 0; j < columnCount; j++) {
            newI = i - m;
            newJ = j - n;
            
            directions.push([newI, newJ]);
        }
    }
    return directions;

}

// Generates a matrix with random color values assigned to each point.
function generateRandomMatrix (rowCount, columnCount, maxValue) {
    // Initiate variables
    let matrix = []

    // Generate a matrix and fill it with random numbers between 0 and maxValue.
    for (let i = 0; i < rowCount; i++) {
        let matrixRow = [];
        for (let j = 0; j < columnCount; j++) {
            matrixRow[j] = getRandomInt(0, maxValue);
        }
        matrix[i] = matrixRow;
    }
    return matrix;
}


 
 // Get the values for the neighboring cells for a given cell in a matrix
 function getNeighbors(i, j, matrix, directions) {
     let rowCount = matrix.length;
     let columnCount = matrix[0].length;
     // Note that in a matrix [1,0] translates into 1 down, and 0 right. 
     let neighbors = [];
     
     for (d = 0; d < directions.length; d++) {
             
        // Wrapping around the matrix in case of edge members
        let tempI = directions[d][0] + i;
        let tempJ = directions[d][1] + j;
        if (tempI >= 0 && tempJ >= 0 && tempI < rowCount && tempJ < columnCount) {
            neighbors.push( matrix[tempI][tempJ])
        }        
         	         
     }

     // Return results
     return neighbors;
 }
 
// Return the most common item in a list
function mostCommon(list) {
    let map = {};
    let mostCommonElement = list[0];
    
    for(var i = 0; i<list.length; i++){
        if(!map[list[i]]){
            map[list[i]]=1;
        }else{
            ++map[list[i]];
            if(map[list[i]]>map[mostCommonElement]){
                mostCommonElement = list[i];
            }
        }
    }

    // Return results
    return mostCommonElement;
}
 
// Create the next generation based on an initial matrix of values
function nextGeneration (matrix, neighborsSizeX, neighborsSizeY){
    let rowCount = matrix.length;
    let columnCount = matrix[0].length;
    let newMatrix = [...matrix];
    let mostCommonElement = 0;
    let neighbors = [];
    let directions = generateDirections(neighborsSizeY, neighborsSizeX)

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
            neighbors = getNeighbors (i, j, matrix, directions);
            mostCommonElement = mostCommon (neighbors);
            newMatrix[i][j] = mostCommonElement;  
        }
    }
    return newMatrix;
}
 
// Convert a matrix to a list
function matrixToList (matrix) {
    let rowCount = matrix.length;
    let columnCount = matrix[0].length;
    let list = [];
    let itemIndex = 0;
    for (i = 0; i < rowCount; i++) {
        for (j = 0; j < columnCount; j++) {
            itemIndex = j + i*columnCount;
            list[itemIndex] = matrix[i][j];
        }
    }
    return list;
}
 
// Draw a grid based on the input matrix of colors 
function matrixToGrid(matrix) {
    let rowCount = matrix.length;
    let columnCount = matrix[0].length;
    let gridCount = columnCount*rowCount;
    let gridHTML = "";
    let gridCSSColumns = "";
    let gridCSSRows = "";
    let value = 0;
    let valueList = matrixToList (matrix);
    
    // Generate the HTML code
    for (let i = 0; i < gridCount; i++) {
        value = valueList[i] ;
        gridHTML += `<div id = pixel-${i} class = "grid-item ${styles[styleIndex]}-${value}"> ${shapeList[value]} </div>`;   
    }
        
    // Generate the CSS code | Column style
    for (let i = 0; i < columnCount; i++) {
        gridCSSColumns += "auto ";
    }

    // Generate the CSS code | Row style
    for (let i = 0; i < rowCount; i++) {
        gridCSSRows += "auto ";
    }
        
    // Insert the HTML and CSS codes
    document.getElementById("my-grid").innerHTML = gridHTML;
    document.getElementById("my-grid").style.gridTemplateColumns = gridCSSColumns;
    document.getElementById("my-grid").style.gridTemplateRows = gridCSSRows;

}
 
 // FUNCTIONS TO USE AS BUTTON ON THE PAGE 
 
 function addColumn() {
     columnCount += multiplier;
     refreshGrid() 
 }
 
 function removeColumn() {
     if (columnCount > 1) {
         columnCount -= multiplier;
         refreshGrid() 
     }
 }
     
 function addRow() {
     rowCount += multiplier;
     refreshGrid() 
 }
 
 function removeRow() {
    if (rowCount > 1) {
        rowCount -= multiplier;
        refreshGrid() 
    }
 }
 
function addVariance() {
    if (shapeCount <10) {
        shapeCount += 1;
        refreshGrid()
    }
}
 
function removeVariance() {
    if (shapeCount > 1) {
        shapeCount -= 1;
        refreshGrid()
    }
}

function increaseNeighborX() {
    if (neighborsSizeX < 10) {
        neighborsSizeX += 1;
        updateCpState()
    }
}

function decreaseNeighborX() {
    if (neighborsSizeX > 0) {
        neighborsSizeX -= 1;
        updateCpState()
    }
}

function increaseNeighborY() {
    if (neighborsSizeY < 10) {
        neighborsSizeY += 1;
        updateCpState()
    }
}

function decreaseNeighborY() {
    if (neighborsSizeY > 0) {
        neighborsSizeY -= 1;
        updateCpState()
    }
}


 
function nextIteration() {
    iteration += 1;
    valuesMatrix = nextGeneration (valuesMatrix, neighborsSizeX, neighborsSizeY);
    matrixToGrid (valuesMatrix);
}
 


function toggleValues() {
    
    let elements = document.getElementsByClassName('shape');
    
    if (showValues) {
        for (let i=0; i <elements.length; i++) {
            elements[i].classList.remove("visible-text");
            showValues = false;
        }
    }
    
    else {
        for (let i=0; i <elements.length; i++) {
            elements[i].classList.add("visible-text");
            showValues = true;
        }
    }
    
}

// Randomize values
function randomize(mutate = true) {
    
    columnCount = getRandomInt(20, 150);
    rowCount = getRandomInt(20, 150);
    shapeCount = getRandomInt(1, 9);
    iteration = 0;
    neighborsSizeX = getRandomInt(0, 4);
    neighborsSizeY = getRandomInt(0, 4);
    styleIndex = getRandomInt(0, styles.length-1);
    valuesMatrix = generateRandomMatrix (rowCount, columnCount, shapeCount);

    if (getRandomInt(0,1) && mutate) {
        valuesMatrix = nextGeneration (valuesMatrix, neighborsSizeX, neighborsSizeY);
    }

    matrixToGrid (valuesMatrix);
    updateCpState()
}

function toggleHelp() {
    let element = document.getElementsByClassName('popup')[0];

    if (!showPopup) {
        element.classList.toggle("popup-visible");
        showPopup = true;
        
    }

    else {
        console.log('B');
        showPopup = false; 
        
    }
}   


// Update the control panels state info
function updateCpState() {
    document.getElementById("rows").innerHTML = "Rows: "+ rowCount;
    document.getElementById("columns").innerHTML = "Columns: "+ columnCount;
    document.getElementById("variance").innerHTML = "Variance: "+ shapeCount;
    document.getElementById("neighborsSizeX").innerHTML = "Neighbors Size-X: "+ neighborsSizeX;
    document.getElementById("neighborsSizeY").innerHTML = "Neighbors Size-Y: "+ neighborsSizeY;

}

// Generate a new matrix and reload
function refreshGrid() {
    valuesMatrix = generateRandomMatrix (rowCount, columnCount, shapeCount);
    matrixToGrid (valuesMatrix);
    updateCpState()
}

reset(); 
 