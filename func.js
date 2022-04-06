var numRow = 6;
var numCol = 7;
var currentRow = 0;
var currentCol = 0;
var currentTrue = 0;
var result = 0;
var myRand = 0;
var isDarkMode = true;

var formula = ["2+2-2-2","3+4-5-1,","9+5-7-5,","2*1*4-5","5+3-4*1","5*4-9-6","5+5+5-9","2*4+5-6","8*2-6-2","3*4/2+3"];

var matrix = [];
for(var i=0; i<numRow; i++) {
    matrix[i] = new Array(numCol);
}
function startGame(){
    //for rand a formula
    myRand = Math.floor(Math.random()*10);
    result = eval(formula[myRand]);
    for(var i=0; i<numRow; i++) {
        displayResultLine(i);
    }
    showResultLine(currentRow);
    displayWinButtons();
    displayLoseButtons();
    updatePopUpScores(0);
    updatePopUpStats();



}
function displayResultLine(currentRow){
    //display preview line
    document.getElementById(`${currentRow}${7}`).innerHTML  = "";
    document.getElementById(`${currentRow}${8}`).innerHTML  = "";
}
function showResultLine(currentRow){
    //show currect line
    document.getElementById(`${currentRow}${7}`).innerHTML  = "=";
    document.getElementById(`${currentRow}${8}`).innerHTML  = result;
}
function writeNum(numOrOp) {
    if (currentCol < numCol){
        matrix[currentRow][currentCol] = numOrOp;
        const button = document.getElementById(`${currentRow}${currentCol}`);
        button.innerText = matrix[currentRow][currentCol];
        currentCol++; 

    }    
} 
function deleteNum() {
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
    currentTrue=0;
    if (currentCol == numCol){
        for (let index = 0; index < numCol; index++) {
            if (matrix[currentRow][index] === formula[myRand][index]){
                //correct - need to change color to green
                currentTrue++;
                paintButton(currentRow,index,"greenyellow");
                paintKeyboardButton(currentRow,index,"greenyellow");
            }else if (checkIfCharExist(matrix[currentRow][index])){
                //half correct -need to change color to orange
                paintButton(currentRow,index,"orange");
                paintKeyboardButton(currentRow,index,"orange");
            }else{
                //wrong -need to change color to red/black
                paintButton(currentRow,index,"red");
            } 
        }
        
        if (currentTrue === numCol){
            win();
        }else if (currentTrue != numCol && currentRow === numRow-1){
            lose();
        }else {
            if (currentRow !== numRow-1)
                displayResultLine(currentRow);
            currentRow++;
            currentCol=0;
            if (currentRow !== numRow)
                showResultLine(currentRow);
        }
    }
}
function checkIfCharExist(char) {
    for (let index = 0; index < numCol; index++) {
        if (formula[myRand][index] == char)
            return true;
    }
    return false;
}
function paintButton(row , col , color) {
    const button = document.getElementById(`${row}${col}`);;
    button.style.backgroundColor = color;      
}
function paintKeyboardButton(row , col , color) {
    const button = document.getElementById(`${row}${col}`);;
    const keyboardButton = document.getElementById(`b${matrix[row][col]}`);
    let style = getComputedStyle(button);
    if (String(style.backgroundColor) === 'rgb(173, 255, 47)'){
        keyboardButton.style.backgroundColor = color;      
    }else if (String(style.backgroundColor) !== 'rgb(173, 255, 47)'){
        keyboardButton.style.backgroundColor = color;      
    }

}
function win() {
    displayKeyboard();
    showWinButtons();
    
    var played;
    var tempPlayed = localStorage.getItem('played');
    if (isNaN(tempPlayed) || !tempPlayed )
        played=0;
    else 
        played = parseInt(tempPlayed)+1;

    var won;
    var tempWon = localStorage.getItem('won');
    if (isNaN(tempWon) || !tempWon )
        won=0;
    else 
        won = parseInt(tempWon)+1;
    localStorage.setItem('played' , played);
    localStorage.setItem('won' , won);
    updatePopUpScores(1);

}
function displayKeyboard(){
    document.getElementById("keyboard").innerHTML = "";
}
function showWinButtons() {
    document.getElementById("win").style.display = '';
}
function showLoseButtons() {
    document.getElementById("lose").style.display = '';
}
function displayWinButtons() {
    document.getElementById("win").style.display = "none";
}
function displayLoseButtons() {
    document.getElementById("lose").style.display = "none";
}
function lose() {
    displayKeyboard();
    showLoseButtons();
    var counterPlayed;
    var played = localStorage.getItem('played');
    if (isNaN(played) || !played)
        counterPlayed=0;
    else 
        counterPlayed = parseInt(played)+1;
    localStorage.setItem('played' , counterPlayed);
    updatePopUpScores(0);
}
function changeMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    var body = document.getElementById("helpPopUp");
    isDarkMode = !isDarkMode;
    if (!isDarkMode){
        body.style.backgroundColor = "black";
        setPopUpHelpTextWhite();
        for (let index = 0; index < numRow; index++) {
            document.getElementById(`${index}${7}`).classList.toggle("dark-mode");
            document.getElementById(`${index}${8}`).classList.toggle("dark-mode");
        }
    }else{
        body.style.backgroundColor = "white";
        setPopUpHelpTextBlack();
        for (let index = 0; index < numRow; index++) {
            document.getElementById(`${index}${7}`).classList.remove("dark-mode");
            document.getElementById(`${index}${8}`).classList.remove("dark-mode");
        }
        
    }


}
function setPopUpHelpTextBlack(){
    for (let index = 0; index < 6; index++) {
        document.getElementById(`help${index}`).style.color = "black";
    }

}
function setPopUpHelpTextWhite(){
    for (let index = 0; index < 6; index++) {
        document.getElementById(`help${index}`).style.color = "white";
    }
}
function setPopUpScoreTextBlack(){

}
function setPopUpScoreTextWhite(){
    
}
function openPopUpHelp() {
    popup = document.getElementById("helpPopUp");
    popup.classList.add('popUp-active');
}
function closePopupHelp() {
    popup = document.getElementById("helpPopUp");
    popup.classList.remove('popUp-active');
}
function openPopUpScore() {
    popup = document.getElementById("scorePopUp");
    popup.classList.add('popUp-active');
}
function closePopupScore() {
    popup = document.getElementById("scorePopUp");
    popup.classList.remove('popUp-active');
}
function updatePopUpScores(flag) {
    popup = document.getElementById('scorePopUp');
    
    var played;
    var tempPlayed = localStorage.getItem('played');
    if (isNaN(tempPlayed) || !tempPlayed)
        played=0;
    else 
        played = tempPlayed;
    
    var won;
    var tempWon = localStorage.getItem('won');
    if (isNaN(tempWon) || !tempWon)
        won=0;
    else 
        won = tempWon;

    document.getElementById('played').innerHTML = played;
    document.getElementById('won').innerHTML = won;
    var precentWon = won/played;
    if (!isFinite(precentWon))
        precentWon = 0;
    document.getElementById('precentWon').innerHTML =parseInt(precentWon*100);

    if (flag === 1){    
        var button = document.getElementById(`s${currentRow+1}`);
        var widths = getButtonsWidth();
        var size=0;
        var wins = getRowsWin();
        switch (currentRow+1){
            case 1:
                size = widths.one + 50;
                localStorage.setItem('w1' , wins.one+1);
                break;
            case 2:
                size = widths.two + 50;
                localStorage.setItem('w2' , wins.two+1);
                break;
            case 3:
                size = widths.three + 50;
                localStorage.setItem('w3' , wins.three+1);
                break;
            case 4:
                size = widths.four + 50;
                localStorage.setItem('w4' , wins.four+1);
                break;
            case 5:
                size = widths.five + 50;
                localStorage.setItem('w5' , wins.five+1);
                break;
            case 6:
                size = widths.six + 50;
                localStorage.setItem('w6' , wins.six+1);
                break;
        }
        button.style.width = `${size}px`;
        localStorage.setItem(`${currentRow+1}` , size);

        updatePopUpStats();

    }
}
function getButtonsWidth(){
    var one;
    var tempOne = localStorage.getItem('1');
    if (isNaN(tempOne) || !tempOne)
        one=50;
    else 
        one = tempOne;
    
    var two;
    var tempTwo = localStorage.getItem('2');
    if (isNaN(tempTwo) || !tempTwo)
        two=50;
    else 
        two = tempTwo;

    var three;
    var tempThree = localStorage.getItem('3');
    if (isNaN(tempThree) || !tempThree)
        three=50;
    else 
        three = tempThree; 
    
    var four;
    var tempFour = localStorage.getItem('4');
    if (isNaN(tempFour) || !tempFour)
        four=50;
    else 
        four = tempFour; 
    
    var five;
    var tempFive = localStorage.getItem('5');
    if (isNaN(tempFive) || !tempFive)
        five=50;
    else 
        five = tempFive;

    var six;
    var tempSix = localStorage.getItem('6');
    if (isNaN(tempSix) || !tempSix)
        six=50;
    else 
        six = tempSix;

    return {one : one ,two : two ,three : three,four: four ,five: five ,six : six}
}
function getRowsWin(){
    var one;
    var tempOne = localStorage.getItem('w1');
    if (isNaN(tempOne) || !tempOne)
        one=0;
    else 
        one = tempOne;
    
    var two;
    var tempTwo = localStorage.getItem('w2');
    if (isNaN(tempTwo) || !tempTwo)
        two=0;
    else 
        two = tempTwo;

    var three;
    var tempThree = localStorage.getItem('w3');
    if (isNaN(tempThree) || !tempThree)
        three=0;
    else 
        three = tempThree; 
    
    var four;
    var tempFour = localStorage.getItem('w4');
    if (isNaN(tempFour) || !tempFour)
        four=0;
    else 
        four = tempFour; 
    
    var five;
    var tempFive = localStorage.getItem('w5');
    if (isNaN(tempFive) || !tempFive)
        five=0;
    else 
        five = tempFive;

    var six;
    var tempSix = localStorage.getItem('w6');
    if (isNaN(tempSix) || !tempSix)
        six=0;
    else 
        six = tempSix;

    return {one : one ,two : two ,three : three,four: four ,five: five ,six : six}
}
function updatePopUpStats(){
    var widths = getButtonsWidth();
    var wins = getRowsWin();

    var buttonOne = document.getElementById(`s${1}`);
    buttonOne.style.width = `${widths.one}px`;
    buttonOne.innerText = wins.one;

    var buttonTwo = document.getElementById(`s${2}`);
    buttonTwo.style.width = `${widths.two}px`;
    buttonTwo.innerText = wins.two;

    var buttonThree = document.getElementById(`s${3}`);
    buttonThree.style.width = `${widths.three}px`;
    buttonThree.innerText = wins.three;

    var buttonFour = document.getElementById(`s${4}`);
    buttonFour.style.width = `${widths.four}px`;
    buttonFour.innerText = wins.four;

    var buttonFive = document.getElementById(`s${5}`);
    buttonFive.style.width = `${widths.five}px`;
    buttonFive.innerText = wins.five;

    var buttonSix = document.getElementById(`s${6}`);
    buttonSix.style.width = `${widths.six}px`;
    buttonSix.innerText = wins.six;


}