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


// ADDS BUTTON STYLE CHANGES WHEN CLICKED
function addTransition(e) {
    console.log(e.target.id); // This MUST be before we add the classes below
    let targetClassList = e.target.classList;

    if(targetClassList.contains('number')) {
        // checkDecimal(e.target.className);
        

        // if user keeps pressing 0 at beginning, don't show more 0's i.e. 00000001, 0000099
        if(firstNumber != '' || e.target.id != '0') {  
            
            if(e.target.id == '.'){
                if(onFirstNumber){
                    firstNumber += isDecimal();
                } else {
                    secondNumber += isDecimal();
                }                
            } else {
                if(onFirstNumber){
                    firstNumber += e.target.id;
                    document.querySelector('.display').lastElementChild.textContent = firstNumber;
                } else {
                    console.log('second number');
                    secondNumber += e.target.id;
                    document.querySelector('.display').lastElementChild.textContent = secondNumber;
                }
            }          
            
            e.target.classList.add('numberClicked');
        }       

        

    } else if(targetClassList.contains('delete')) {
        
        e.target.classList.add('notNumberClicked');
        console.log(e.target.id);
        
        if(e.target.id == 'clear') {
            firstNumber = '';
            secondNumber = '';
            operatorHolder = '';
            onFirstNumber = true; // tells us we're back to setting up firstNumber
            wasOperatorClicked = false; // tells us we're back to setting up firstNumber
            wasDecimalClicked = false;
            document.querySelector('.display').lastElementChild.textContent = '0';
        } else if(e.target.id == 'delete') {
          
            
            // !!!!!!!!!!!!!NEXT STEP HERE!!!!!! next check if it's last number, set it to 0
            


            // firstNumber is recorded as a string first, once an operator is pressed, firstNumber is changed to a float
            // when displayed, we don't actually round firstNumber 
            // we do this to be more precise for math reasons (firstNumber stays more than 3 decimals)
            // instead we set the display text to firstNumber as a rounded string
            // therefore we need to compare a rounded String version of firstNumber to the display text
            // if we don't, our if statement to change the firstNumber will always fail

            let display = document.querySelector('.display').lastElementChild.textContent;
            let firstNumberAsRoundedString = round(firstNumber, 3).toString();

            // get the last character of the display string
            var lastChar = display[display.length -1];
          
          
            // if we want to delete the decimal AND a number if a decimal is the last character
            // if(lastChar == '.') then firstNumber = display.splice(0,-1)
            // we're also gonna have to reset wasDecimalClicked to false



            // if(display == firstNumberAsRoundedString) {
                
            // if you check for display == to first number, if the first number hasn't been rounded yet in the display
            // it will skip the if statement
            // so make firstNumber the else because secondumber is never rounded
            if(display == secondNumber.toString()) {
                secondNumber = display.slice(0, -1);
                document.querySelector('.display').lastElementChild.textContent = secondNumber;

                // prob won't need these as they'll already be false
                onFirstNumber = false; // tells us we're back to setting up firstNumber
                wasOperatorClicked = true; // tells us we're back to setting up firstNumber

                // was last char decimal
                if(lastChar == '.') {
                    wasDecimalClicked = false;
                }
            } else {
                // doesn't matter if firstNumber is string or number as it will get parsed to float
                firstNumber = display.slice(0, -1);
                document.querySelector('.display').lastElementChild.textContent = firstNumber;

                secondNumber = '';
                operatorHolder = '';
                onFirstNumber = true; // tells us we're back to setting up firstNumber
                wasOperatorClicked = false; // tells us we're back to setting up firstNumber

                // was last char decimal
                if(lastChar == '.') {
                    wasDecimalClicked = false;
                }
            }

            // depending on which one, delete the last digit of the number
            //    - if last digit is <= 9 or >= -9, then bring the number at 0
            //    
        }
        
        

    } else if(targetClassList.contains('operator')) {

        e.target.classList.add('notNumberClicked');

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
          
            document.querySelector('.display').lastElementChild.textContent = round(firstNumber, 3);

            secondNumber = '';
        }

        // store operator number
        operatorHolder = e.target.id;

        // set to true after operator button pressed first time
        // allows us to test if operator hit 2nd or 3rd time, before user presses the equals button
        wasOperatorClicked = true; 
        

    } else if(targetClassList.contains('equals')) {

        e.target.classList.add('notNumberClicked');

        if(firstNumber == '' & secondNumber == ''){
            return;
        } else {
            firstNumber = operate(operatorHolder, parseFloat(firstNumber), parseFloat(secondNumber));
            
            if(isNaN(firstNumber)){
                document.querySelector('.display').lastElementChild.textContent = 'Not a number';
            } else {
                document.querySelector('.display').lastElementChild.textContent = round(firstNumber, 3);
            }

            // if we don't set the second number to '' it calls the else if above 
            // and adds the previous second number to the sum
            secondNumber = ''; 
        }

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
function isDecimal(){
    if(wasDecimalClicked){
        return '';
    } else {
        wasDecimalClicked = true;
        return '.';
    }
}







buttons.forEach(button => button.addEventListener('transitionend', removeTransition));
buttons.forEach(buttons => buttons.addEventListener('click', addTransition));