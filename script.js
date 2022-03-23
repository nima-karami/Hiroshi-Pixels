 // Initiate variables
 var columnCount = 20;
 var rowCount = 10;
 var shapeCount = 3;
 var iteration = 0;
 const counter = 5;
 
 // Refer to shape-style.css
 var shapeList = [
    '<div class ="shape square">0</div>',
    '<div class ="shape circle">1</div>',
    '<div class ="shape triangle-up">2</div>',
    '<div class ="shape rectangle-h">3</div>',
    '<div class ="shape rectangle-v">4</div>',
    '<div class ="shape rectangle-v">5</div>',
    '<div class ="shape rectangle-v">6</div>',
    '<div class ="shape rectangle-v">7</div>',
    '<div class ="shape rectangle-v">8</div>',
    '<div class ="shape rectangle-v">9</div>'
     ]

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
 function getNeighbors(x, y, matrix) {
     let rowCount = matrix.length;
     let columnCount = matrix[0].length;
     let directions = [[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]];
     let neighbors = [];
     
     for (i = 0; i < directions.length; i++) {
             
         // To achieve a true modulo operator like python, I had to create the following equation
         let tempX = directions[i][0] + x;
         let newX = (tempX % columnCount + columnCount) % columnCount;
         let tempY = directions[i][1] + y;
         let newY = (tempY % rowCount + rowCount) % rowCount;
         
         neighbors[i] = matrix[newY][newX];	         
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
     
     for (let j = 0; j < rowCount; j++) {
         for (let i = 0; i < columnCount; i++) {
 
         neighbors = getNeighbors (i, j, matrix);
         mostCommonElement = mostCommon (neighbors);
         newMatrix[j][i] = mostCommonElement;
             
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
    
    // document.getElementById("grid-item").style.fontSize = 50%;
    // document.getElementById("demo").innerHTML = getNeighbors(0, 0, matrix);
 }
 
 // FUNCTIONS TO USE AS BUTTON ON THE PAGE 
 
 function addColumn() {
     columnCount += counter;
     refreshGrid() 
 }
 
 function removeColumn() {
     if (columnCount > 1) {
         columnCount -= counter;
         refreshGrid() 
     }
 }
     
 function addRow() {
     rowCount += counter;
     refreshGrid() 
 }
 
 function removeRow() {
    if (rowCount > 1) {
        rowCount -= counter;
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
    colorsMatrix = nextGeneration (colorsMatrix);
    matrixToGrid (colorsMatrix);
}
 
function reset() {
    columnCount = 20;
    rowCount = 20;
    shapeCount = 2;
    iteration = 0;

    refreshGrid()
}

// Generate a new matrix and reload
function refreshGrid() {
    let newMatrix = generateRandomMatrix (rowCount, columnCount, shapeCount);
    matrixToGrid (newMatrix)
}

refreshGrid(); 
 