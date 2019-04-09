// VARIABLE DECLARATIONS
const buttons = Array.from(document.querySelectorAll('button'));

// const display = document.querySelector('.display').lastElementChild.textContent; //may not need


let firstNumber = '';
let secondNumber = '';
let operatorHolder = '';
let onFirstNumber = true;

let wasOperatorClicked = false;
let wasDecimalClicked = false;
// END // VARIABLE DECLARATIONS






// FUNCTIONS TO DETERMINE WHAT BUTTON WAS CLICKED OR WHAT KEY WAS PRESSED
function whatWasClicked(e) {

    let targetClassList = e.target.classList;
    let targetID = e.target.id;

    if(targetClassList.contains('number')) {
        
        inputIsNumber(targetID);
        e.target.classList.add('numberClicked');    

    } else if(targetClassList.contains('delete')) {
        
        inputIsDelete(targetID);
        e.target.classList.add('notNumberClicked');

    } else if(targetClassList.contains('operator')) {

        inputIsOperator(targetID);
        e.target.classList.add('notNumberClicked');    

    } else if(targetClassList.contains('equals')) {

        inputIsEquals();
        e.target.classList.add('notNumberClicked');

    }
}

function whatKeyWasPressed(e) {
    keyPressed = (e.key).toLowerCase();

    switch(keyPressed) {        
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':        
            inputIsNumber(keyPressed);
            document.getElementById(keyPressed).classList.add('numberClicked');
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            inputIsOperator(keyPressed);
            document.getElementById(keyPressed).classList.add('notNumberClicked');
            break;
        case '=':
        case 'enter':
            inputIsEquals('=');
            document.getElementById('=').classList.add('notNumberClicked');
            break;
        case 'backspace':
            inputIsDelete(keyPressed);
            document.getElementById(keyPressed).classList.add('notNumberClicked');
            break;
    }
}
// END // FUNCTIONS TO DETERMINE WHAT BUTTON WAS CLICKED OR WHAT KEY WAS PRESSED




// OPERATOR FUNCTIONS
function add (a, b) {
	return a + b;
}

function subtract (a, b) {
	return a - b;
}

function multiply (a, b) {
	return a * b;
}

function divide (a, b) {
	return a / b;
}

function operate(operator, a, b) {
    if (isNaN(b)) b = a;
    switch(operator){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            if(b === 0){
                return NaN;
            } else{
                return divide(a, b);
            }            
        default:
            return a;
    }
}
// END // OPERATOR FUNCTIONS



// DETERMINE INPUT FUNCTIONS
function inputIsNumber(eventID){
    // if user keeps pressing 0 at beginning, don't show more 0's i.e. 00000001, 0000099
    if(firstNumber != '' || eventID != '0') {  
    
        if(eventID == '.'){
            if(onFirstNumber){
                firstNumber += isDecimal();
            } else {
                secondNumber += isDecimal();
            }                
        } else {
            if(onFirstNumber){
                firstNumber += eventID;
                setDisplayText(firstNumber);
            } else {
                secondNumber += eventID;
                setDisplayText(secondNumber);
            }
        }        
        
    }       
}

function inputIsDelete(eventID){
    if(eventID == 'clear') {
        firstNumber = '';
        secondNumber = '';
        operatorHolder = '';
        onFirstNumber = true; // tells us we're back to setting up firstNumber
        wasOperatorClicked = false; // tells us we're back to setting up firstNumber
        wasDecimalClicked = false;
        setDisplayText('0');
    } else if(eventID == 'backspace') {
        // firstNumber is recorded as a string first, once an operator is pressed, firstNumber is changed to a float
        // when displayed, we don't actually round firstNumber 
        // we do this to be more precise for math reasons (firstNumber stays more than 3 decimals)
        // instead we set the display text to firstNumber as a rounded string
        // therefore we need to compare a rounded String version of firstNumber to the display text
        // if we don't, our if statement to change the firstNumber will always fail

        let display = document.querySelector('.display').lastElementChild.textContent;
        var lastChar = display[display.length -1];
      
            // if we want to delete the decimal AND a number if a decimal is the last character
            // if(lastChar == '.') then firstNumber = display.splice(0,-1)
            // we're also gonna have to reset wasDecimalClicked to false
            
        // if you check for display == to first number, if the first number hasn't been rounded yet in the display
        // it will skip the if statement
        // so make firstNumber the else because secondumber is never rounded
        if(display == secondNumber.toString()) {
            
            deleteLastNumber(display, true);

            // prob won't need these as they'll already be false
            onFirstNumber = false; // tells us we're back to setting up firstNumber
            wasOperatorClicked = true; // tells us we're back to setting up firstNumber

            // was last char decimal
            wasLastCharDecimal(lastChar);
            
        } else {

            deleteLastNumber(display, false);
            
            secondNumber = '';
            operatorHolder = '';
            onFirstNumber = true; // tells us we're back to setting up firstNumber
            wasOperatorClicked = false; // tells us we're back to setting up firstNumber

            // was last char decimal
            wasLastCharDecimal(lastChar);
        }

    }
}

function inputIsOperator(eventID){
    // tells us first number has been set (since operator was pressed)
    // and start recording secondNumber
    onFirstNumber = false;

    // set to false incase first number was decimal, and second is as well
    wasDecimalClicked = false;
    
    // must be ===, otherwise '' is equal to 0 when using ==
    if(firstNumber === '') {
        firstNumber = 0;
    } else if(wasOperatorClicked && secondNumber != '') {
        
        firstNumber = operate(operatorHolder, parseFloat(firstNumber), parseFloat(secondNumber));
        
        setDisplayText(round(firstNumber, 3));

        secondNumber = '';
    }

    // store operator number
    operatorHolder = eventID;

    // set to true after operator button pressed first time
    // allows us to test if operator hit 2nd or 3rd time, before user presses the equals button
    wasOperatorClicked = true; 
}

function inputIsEquals(){
    if(firstNumber == '' & secondNumber == ''){
        return;
    } else {
        firstNumber = operate(operatorHolder, parseFloat(firstNumber), parseFloat(secondNumber));
        
        if(isNaN(firstNumber)){
            setDisplayText('Not a number');
        } else {
            setDisplayText(round(firstNumber, 3));
        }

        // if we don't set the second number to '' it calls the else if above 
        // and adds the previous second number to the sum
        secondNumber = ''; 
    }
}
// END // DETERMINE INPUT FUNCTIONS



// DELETE LAST NUMBER FUNCTION
    // deletes the last number in the display as well as the firstnumber or secondNumber
function deleteLastNumber(displayText, paramIsSecondNumber){
    if(displayText.slice(0, -1) == '' || displayText.slice(0, -1) == '-'){
        // if statement to reset secondNumber or firstNumber
        (paramIsSecondNumber) ? secondNumber = '' : firstNumber = '';        
        setDisplayText('0');
    } else {
        // if statement to slice last digit from secondNumber or firstNumber
        if(paramIsSecondNumber) {
            secondNumber = displayText.slice(0, -1);
            setDisplayText(secondNumber);
        } else {
            firstNumber = displayText.slice(0, -1);
            setDisplayText(firstNumber);
        }
    }
}
// END // DELETE LAST NUMBER FUNCTION





// SET DISPLAY TEXT FUNCTION
function setDisplayText(displayText){
    document.querySelector('.display').lastElementChild.textContent = displayText;
}
// END // SET DISPLAY TEXT FUNCTION





// DECIMAL FUNCTIONS

// check if decimal has been clicke
// if so do nothing, if not return a decimal
function isDecimal(){
    if(wasDecimalClicked){
        return '';
    } else {
        wasDecimalClicked = true;
        return '.';
    }
}

// round decimal, 2nd param is numbers after decimal you want
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function wasLastCharDecimal(lastCharacter) {
    if(lastCharacter == '.') {
        wasDecimalClicked = false;
    }
}

// END // DECIMAL FUNCTIONS



// BUTTON STYLING FUNCTIONS
// removes button style changes after button clicked
function removeTransition(e) {
    if (e.propertyName !== 'background-color') return;
    if(e.target.classList.contains('number')) {
        e.target.classList.remove('numberClicked');
    } else {
        e.target.classList.remove('notNumberClicked');
    }
}
// END // BUTTON STYLING FUNCTIONS








buttons.forEach(button => button.addEventListener('transitionend', removeTransition));
buttons.forEach(buttons => buttons.addEventListener('click', whatWasClicked));
window.addEventListener('keydown', whatKeyWasPressed); // keypad support