 // Initiate variables
 var columnCount = 150;
 var rowCount = 100;
 var colorCount = 2;
 var iteration = 0;
 const counter = 20;
 
 // Generates a matrix with random color values assigned to each point.
 function generate_matrix (columnCount, rowCount, colorCount) {
     // Initiate variables
     let matrix = [[]]; 
     let color = 0;
     let colorsList = [0,120,240];
     let gridCount = columnCount * rowCount ;
     let colorIndex = 0;
 
     // Generate an empty matrix
     for (let j = 0; j < rowCount; j++) {
             let colorsColumn = []
         for (let i = 0; i < columnCount; i++) {
             colorsColumn[i] = 0 ;           
         }
             matrix[j] = colorsColumn ;
     }
     
     // Generate random values between 0 and 360 for a number of colors    
     for (let i = 0; i < gridCount; i++) {
         color = Math.floor(Math.random()*colorCount)*360/colorCount;
     colorsList[i] = color;
     } 
 
     // Put the color values into a list
     for (let j = 0; j < rowCount; j++) {
             for (let i = 0; i < columnCount; i++) {
             colorIndex = i+j*columnCount;
             matrix[j][i] = colorsList[colorIndex] ;           
     }     
     }
     
     // Return results  	
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
     for (j = 0; j < rowCount; j++) {
         for (i = 0; i < columnCount; i++) {
     itemIndex = i + j*columnCount;
     list[itemIndex] = matrix[j][i];
     
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
     gridHTML += '<div class="grid-item" style="background-color:hsl('+ color +', 80%, 50%)" id="' + i + '">'+ " " + '</div>';   
     }
     
     // Generate the CSS code | Column style
     for (let i = 0; i < columnCount; i++) {
         gridCSSColumns += "auto ";
     }
     
     // Generate the CSS code | Row style
     for (let i = 0; i < rowCount; i++) {
         var height = 100/rowCount ;
     gridCSSRows += height + "vh ";
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
     colorsMatrix = generate_matrix (columnCount, rowCount, colorCount);
     generate_grid (colorsMatrix); 
 }
 
 function remove_column() {
     if (columnCount > 1) {
         columnCount -= counter;
         colorsMatrix = generate_matrix (columnCount, rowCount, colorCount);
     generate_grid (colorsMatrix); 
     }
 }
     
 function add_row() {
     rowCount += counter;
     colorsMatrix = generate_matrix (columnCount, rowCount, colorCount);
     generate_grid (colorsMatrix); 
 }
 
 function remove_row() {
     if (rowCount > 1) {
         rowCount -= counter;
         colorsMatrix = generate_matrix (columnCount, rowCount, colorCount);
     generate_grid (colorsMatrix); 
     }
 }
 
 function add_color() {
     colorCount += 1;
     colorsMatrix = generate_matrix (columnCount, rowCount, colorCount);
     generate_grid (colorsMatrix); 
 }
 
 function remove_color() {
     if (colorCount > 1) {
         colorCount -= 1;
         colorsMatrix = generate_matrix (columnCount, rowCount, colorCount);
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
     colorCount = 2;
     iteration = 0;
     
     colorsMatrix = generate_matrix (columnCount, rowCount, colorCount);
     generate_grid (colorsMatrix);
 }
 
 colorsMatrix = generate_matrix (columnCount, rowCount, colorCount);
 generate_grid (colorsMatrix);
 
 