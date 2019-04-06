// VARIABLE DECLARATIONS
const buttons = Array.from(document.querySelectorAll('button'));

const display = document.querySelector('.display').lastElementChild.textContent; //may not need


let firstNumber = '';
let secondNumber = '';
let operatorHolder = '';
let isFirstNumber = true;

let wasOperatorClicked = false;
let wasDecimalClicked = false;
// let operatorClicked = '';
// END // VARIABLE DECLARATIONS



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

function operate(operator, a, b=a) {
    switch(operator){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}
// END // OPERATOR FUNCTIONS


// ADDS BUTTON STYLE CHANGES WHEN CLICKED
function addTransition(e) {
    console.log(e.target.id); // This MUST be before we add the classes below
    let targetClassList = e.target.classList;

    if(targetClassList.contains('number')) {
        // checkDecimal(e.target.className);
        

        // if user keeps pressing 0 at beginning, don't show more 0's i.e. 00000001, 0000099
        // if(firstNumber != '' || e.target.id != '0') {  
            
        //     if(e.target.id == '.'){
        //         firstNumber += wasDecimal();
        //     } else {
        //         firstNumber += e.target.id;
        //     }
        
        if(isFirstNumber){
            firstNumber += e.target.id;
            document.querySelector('.display').lastElementChild.textContent = firstNumber;
        } else {
            console.log('second number');
            secondNumber += e.target.id;
            document.querySelector('.display').lastElementChild.textContent = secondNumber;
        }
        
            
        // }       

        e.target.classList.add('numberClicked');

    } else if(targetClassList.contains('edit')) {

        e.target.classList.add('notNumberClicked');
        firstNumber = '';
        secondNumber = '';
        isFirstNumber = true; // tells us we're back to setting up firstNumber
        document.querySelector('.display').lastElementChild.textContent = '0';

    } else if(targetClassList.contains('operator')) {
        // tells us first number has been set (since operator was pressed)
        // and start recording secondNumber
        isFirstNumber = false;

        
        // must be ===, otherwise '' is equal to 0 when using ==
        if(firstNumber === '') {
            firstNumber = 0;
        } else if(wasOperatorClicked && secondNumber != '') {
            
            firstNumber = operate(operatorHolder, parseFloat(firstNumber), parseFloat(secondNumber));
          
            document.querySelector('.display').lastElementChild.textContent = round(firstNumber, 3);

            secondNumber = '';
        }

        // store operator number
        operatorHolder = e.target.id;

        // set to true after operator button pressed first time
        // allows us to test if operator hit 2nd or 3rd time, before user presses the equals button
        wasOperatorClicked = true; 
        

    } else if(targetClassList.contains('equals')) {
        if(firstNumber == '' & secondNumber == ''){
            firstNumber = 0;
            secondNumber = 0;
            document.querySelector('.display').lastElementChild.textContent = firstNumber;
        } else {
            firstNumber = operate(operatorHolder, parseFloat(firstNumber), parseFloat(secondNumber));
            
            document.querySelector('.display').lastElementChild.textContent = round(firstNumber, 3);
            
            // if we don't set the second number to '' it calls the else if above 
            // and adds the previous second number to the sum
            secondNumber = ''; 
        }


        // NEXT STEPS HERE!!!!!
        // 1) how not to return decimals every time, even when decimals aren't being used
        // 2) how to adjust for = being pressed before another operator
        //      - secondNumber = 0; in first if should probably be = ''
        //      - if a number is pressed and then =, just show the number pressed
        //      - if a number then operator, then equals, call that operator for the number pressed
        //          - meaning '3x=' then call for 3x3 and show the result




    }
}


// Round decimals to 3 spots
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
  
  round(1.005, 2);



// REMOVES BUTTON STYLE CHANGES AFTER CLICKED
function removeTransition(e) {
    if (e.propertyName !== 'background-color') return;
    if(e.target.classList.contains('number')) {
        e.target.classList.remove('numberClicked');
    } else {
        e.target.classList.remove('notNumberClicked');
    }
}



// heck to see if a decimal has been clicked, if so do nothing, if not return a decimal
function wasDecimal(){
    if(wasDecimalClicked){
        return '';
    } else {
        wasDecimalClicked = true;
        return '.';
    }
}







buttons.forEach(button => button.addEventListener('transitionend', removeTransition));
buttons.forEach(buttons => buttons.addEventListener('click', addTransition));