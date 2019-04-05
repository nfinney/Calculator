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

// function sum (a) {
// 	if(a.length === 0) {
// 		return 0;
// 	} else {
// 		var sum = 0;
// 		for(i=0; i<a.length; i++){
// 			sum += a[i];
// 		}
// 		return sum;
// 	}
// }
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
        isFirstNumber = true;
        document.querySelector('.display').lastElementChild.textContent = '0';

    } else if(targetClassList.contains('operator')) {
        if(firstNumber == '') {
            firstNumber = 0;
        }
        isFirstNumber = false;
        operatorHolder = e.target.id;

    } else if(targetClassList.contains('equals')) {
        document.querySelector('.display').lastElementChild.textContent = operate(operatorHolder, parseFloat(firstNumber), parseFloat(secondNumber));
    }
}

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


function operate(operator, a, b=0) {
    switch(operator){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        case '=':
            return equals(a, b);
            break;
    }
}




buttons.forEach(button => button.addEventListener('transitionend', removeTransition));
buttons.forEach(buttons => buttons.addEventListener('click', addTransition));