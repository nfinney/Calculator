// VARIABLE DECLARATIONS
let isOperatorClicked = false;;
const buttons = Array.from(document.querySelectorAll('button'));
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
    // console.log(e.propertyName);
    if(e.target.classList.contains('number')) {
        e.target.classList.add('numberClicked');
    } else {
        e.target.classList.add('notNumberClicked');
    }
}

// REMOVES BUTTON STYLE CHANGES AFTER CLICKED
function removeTransition(e) {
    console.log(e.propertyName);
    // if (e.propertyName !== 'transform') return;
    if(e.target.classList.contains('number')) {
        e.target.classList.remove('numberClicked');
    } else {
        e.target.classList.remove('notNumberClicked');
    }
}

buttons.forEach(button => button.addEventListener('transitionend', removeTransition));
buttons.forEach(buttons => buttons.addEventListener('click', addTransition));