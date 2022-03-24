// Initiate variables
var columnCount = 0;
var rowCount = 0;
var shapeCount = 0;
var iteration = 0;
const multiplier = 10;
var showValues = false;
var valuesMatrix = [[]]

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

function reset() {
    columnCount = 41;
    rowCount = 21;
    shapeCount = 2;
    iteration = 0;

    refreshGrid()
}


// Generates a random integer between 0 and max
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


// Generates a matrix with random color values assigned to each point.
function generateRandomMatrix (rowCount, columnCount, maxValue) {
    // Initiate variables
    let matrix = []

    // Generate a matrix and fill it with random numbers between 0 and maxValue.
    for (let i = 0; i < rowCount; i++) {
        let matrixRow = [];
        for (let j = 0; j < columnCount; j++) {
            matrixRow[j] = getRandomInt(maxValue);
        }
        matrix[i] = matrixRow;
    }
    return matrix;
}


 
 // Get the values for the neighboring cells for a given cell in a matrix
 function getNeighbors(i, j, matrix) {
     let rowCount = matrix.length;
     let columnCount = matrix[0].length;
     // Note that in a matrix [1,0] translates into 1 down, and 0 right. 
     let directions = [[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]];
     let neighbors = [];
     
     for (d = 0; d < directions.length; d++) {
             
        // Wrapping around the matrix in case of edge members
        let tempI = directions[d][0] + i;
        let tempJ = directions[d][1] + j;
        if (tempI >= 0 && tempJ >= 0 && tempI < rowCount && tempJ < columnCount) {
            neighbors.push( matrix[tempI][tempJ])
        }
        //  let newI = (tempI + rowCount) % rowCount;
         
        //  let newJ = (tempJ  + columnCount) % columnCount;
         
         	         
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
function nextGeneration (matrix){
    let rowCount = matrix.length;
    let columnCount = matrix[0].length;
    let newMatrix = [...matrix];
    let mostCommonElement = 0;
    let neighbors = [];
    
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
            neighbors = getNeighbors (i, j, matrix);
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
        gridHTML += '<div id = pixel-'+ i + ' class="grid-item value-'+value+'">'+ shapeList[value] + '</div>';   
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
 
function nextIteration() {
    iteration += 1;
    valuesMatrix = nextGeneration (valuesMatrix);
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

// Generate a new matrix and reload
function refreshGrid() {
    valuesMatrix = generateRandomMatrix (rowCount, columnCount, shapeCount);
    matrixToGrid (valuesMatrix)

}

reset(); 
 