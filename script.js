 // Initiate variables
 var columnCount = 20;
 var rowCount = 10;
 var shapeCount = 2;
 var iteration = 0;
 const counter = 20;
 

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
 function get_neighbors(x, y, matrix) {
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
 function most_common(list) {
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
 function next_generation (matrix){
     let rowCount = matrix.length;
     let columnCount = matrix[0].length;
     let newMatrix = [...matrix];
     let mostCommonElement = 0;
     let neighbors = [];
     
     for (let j = 0; j < rowCount; j++) {
         for (let i = 0; i < columnCount; i++) {
 
         neighbors = get_neighbors (i, j, matrix);
         mostCommonElement = most_common (neighbors);
         newMatrix[j][i] = mostCommonElement;
             
     }
     }
     return newMatrix;
 }
 
// Convert a matrix to a list
function matrix_to_list (matrix) {
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
 function generate_grid(matrix) {
     let rowCount = matrix.length;
     let columnCount = matrix[0].length;
     let gridCount = columnCount*rowCount;
     let gridHTML = "";
     let gridCSSColumns = "";
     let gridCSSRows = "";
     let color = 0;
     let colorsList = matrix_to_list (matrix);
     
    // Generate the HTML code
    for (let i = 0; i < gridCount; i++) {
        color = colorsList[i] ;
        gridHTML += '<div id = pixel-'+ i + ' class="grid-item"'+ value + '</div>';   
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
    // document.getElementById("demo").innerHTML = get_neighbors(0, 0, matrix);
 }
 
 // FUNCTIONS TO USE AS BUTTON ON THE PAGE 
 
 function add_column() {
     columnCount += counter;
     colorsMatrix = generateRandomMatrix (rowCount, columnCount, maxValue);
     generate_grid (colorsMatrix); 
 }
 
 function remove_column() {
     if (columnCount > 1) {
         columnCount -= counter;
         colorsMatrix = generateRandomMatrix (rowCount, columnCount, maxValue);
     generate_grid (colorsMatrix); 
     }
 }
     
 function add_row() {
     rowCount += counter;
     colorsMatrix = generateRandomMatrix (rowCount, columnCount, maxValue);
     generate_grid (colorsMatrix); 
 }
 
 function remove_row() {
     if (rowCount > 1) {
         rowCount -= counter;
         colorsMatrix = generateRandomMatrix (rowCount, columnCount, maxValue);
     generate_grid (colorsMatrix); 
     }
 }
 
 function add_color() {
     shapeCount += 1;
     colorsMatrix = generateRandomMatrix (rowCount, columnCount, maxValue);
     generate_grid (colorsMatrix); 
 }
 
 function remove_color() {
     if (shapeCount > 1) {
         shapeCount -= 1;
         colorsMatrix = generateRandomMatrix (rowCount, columnCount, maxValue);
     generate_grid (colorsMatrix); 
     }
 }
 
 function next_iteration() {
     iteration += 1;
     colorsMatrix = next_generation (colorsMatrix);
     generate_grid (colorsMatrix);
 }
 
 function reset() {
     columnCount = 150;
     rowCount = 100;
     shapeCount = 2;
     iteration = 0;
     
     colorsMatrix = generateRandomMatrix (rowCount, columnCount, maxValue);
     generate_grid (colorsMatrix);
 }
 
 colorsMatrix = generateRandomMatrix (rowCount, columnCount, maxValue);
 generate_grid (colorsMatrix);
 
 