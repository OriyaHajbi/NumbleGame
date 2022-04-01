var numRow = 6;
var numCol = 7;
var currentRow = 0;
var currentCol = 0;
var currentTrue = 0;

var formula = "5+3-4*1"
var matrix = [];
for(var i=0; i<numRow; i++) {
    matrix[i] = new Array(numCol);
}
var matrixResult = [];
for(var i=0; i<numRow; i++) {
    var s=7;
    document.getElementById(`${i}${s}`).innerText  = "";
    //document.getElementById(`${i}${8}`).innerHTML  = "";
    console.log(document.getElementById("b1").innerText);
    
}
function writeNum(numOrOp) {
    if (currentCol < numCol){
        console.log(currentCol);
        matrix[currentRow][currentCol] = numOrOp;
        const button = document.getElementById(`${currentRow}${currentCol}`);
        button.innerText = matrix[currentRow][currentCol];
        currentCol++; 

    }    
} 
function deleteNum() {
    console.log(currentCol);
    if (currentCol >= 0){
         if (currentCol != 0){ 
            currentCol--; 
        }
        matrix[currentRow][currentCol] = "";
        const button = document.getElementById(`${currentRow}${currentCol}`);
        button.innerText = matrix[currentRow][currentCol];      
    }        
}
function checkLine() {
    if (currentCol == numCol){
        console.log("check now");
        for (let index = 0; index < numCol; index++) {
            if (matrix[currentRow][index] === formula[index]){
                //correct - need to change color to green
                console.log("you are king");
                currentTrue++;
                paintButton(currentRow,index,"rgb(24, 247, 24)");
            }else if (checkIfCharExist(matrix[currentRow][index])){
                //half correct -need to change color to orange
                console.log("you are princces");
                paintButton(currentRow,index,"orange");
            }else{
                //wrong -need to change color to red/black
                console.log("you are stupid");
                paintButton(currentRow,index,"red");
            } 
        }
        if (currentTrue === numCol)
            win();
        if (currentTrue != numCol && currentRow === numRow)
            lose();
        currentRow++;
        currentCol=0;
    }
}
function checkIfCharExist(char) {
    for (let index = 0; index < numCol; index++) {
        if (formula[index] == char)
            return true;
    }
    return false;
}
function paintButton(row , col , color) {
    const button = document.getElementById(`${row}${col}`);;
    button.style.backgroundColor = color;      
}
function win() {
    alert("You are winning in row " + `${currentRow}`);
    document.getElementById("keyboard").innerHTML = "";

}
function lose() {
    alert("Sorry but you are LOSER");
}
