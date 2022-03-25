const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const displayScreen = document.getElementById('display-content');
const clear = document.getElementById('clear');
const equals = document.getElementById('equals');
const del = document.getElementById('delete');
const memoryStore = document.getElementById('memory');

let memoryValue = null
let valueEntered = '0';
let operatorType = null;
let firstValue = '0';
let secondValue = null;
let answer = '0';
let clearDoubleOperator = true;
let memory = '0'



numberBtn.forEach(button => button.addEventListener('click', function (){
    if ((valueEntered === '0') && (button.textContent != '.')){
        valueEntered = button.textContent;
    }    
    else if ((displayScreen.textContent.includes('.')) && (button.textContent == '.')) {
        return
    }
    else {
        valueEntered += button.textContent;
    }
    changeDisplay(valueEntered)
    clearDoubleOperator = true;
}));

operatorBtn.forEach(operator => operator.addEventListener('click', function(){
    let operatorButton = operator.textContent;
    (operatorType == null) ? operatorButtonNormal(operatorButton): operatorButtonAsEquals(operatorButton);
    clearDoubleOperator = false;
} ));

function operatorButtonAsEquals(operatorButton){
    if (clearDoubleOperator == true){
    firstOrSecondValue();
    calculate();
    firstValue = answer;
    getOperator(operatorButton);
    secondValue = null;
    changeDisplay(answer);
    valueEntered = '0';
}
else {
    getOperator(operatorButton);
    changeDisplay(operatorType);
}
return;
}

function operatorButtonNormal(operatorButton){
    getOperator(operatorButton);
    firstOrSecondValue();
    changeDisplay(operatorButton);
    valueEntered = '0';
}

equals.addEventListener('click', function(){
    if (secondValue == null) {
        secondValue = displayScreen.textContent;
    }
    calculate();
    changeDisplay(answer)
    firstValue = '0'
    secondValue = null;
    operatorType = null;
    valueEntered = '0'
});

clear.addEventListener('click', () => clearAll());

function clearAll(){
    valueEntered = '0';
    firstValue = '0';
    operatorType = null;
    secondValue = null;
    answer = '0';
    memoryValue = null;
    changeDisplay(valueEntered);
}

del.addEventListener('click', function() {
    valueEntered = valueEntered.substring(0,(valueEntered.length - 1));
    if (valueEntered == ''){
        valueEntered = '0';
    }
    changeDisplay(valueEntered);
})

memoryStore.addEventListener('click', function(){
    if ((memoryValue == null) && (answer != '0') && (operatorType == null) && (valueEntered == '0')){
        memoryValue = answer;
        valueEntered = '0';
        changeDisplay(valueEntered);
    }
    else if (memoryValue == null) {
        memoryValue = valueEntered;
        valueEntered = '0';
        changeDisplay(valueEntered);
    }
    else {
        valueEntered = memoryValue;
        memoryValue = null;
        changeDisplay(valueEntered);
}})

function changeDisplay(newDisplay){
    displayScreen.textContent = newDisplay
}

function getOperator(buttonPushed){
switch(buttonPushed){
    case '+':
        operatorType = '+';
        break;
    case '/':
        operatorType = '/';
        break;
    case 'x':
        operatorType = '*';
        break;
    case '-':
        operatorType = '-';
        break;
    case '^':
        operatorType = '^'
        break;
    }};

function firstOrSecondValue(){
    if (firstValue == '0') {
        firstValue = displayScreen.textContent;
    }
    else if ((firstValue != '0') &&(secondValue == null)){
        secondValue = displayScreen.textContent;
    }
}

function addition(){
    return Number(firstValue) + Number(secondValue);
}
function division(){
    return Number(firstValue) / Number(secondValue);
}
function subtraction(){
    return Number(firstValue) - Number(secondValue);
}
function multiplication(){
    return Number(firstValue) * Number(secondValue);
}
function exponent(){
    return Number(firstValue) ** Number(secondValue);
}
function calculate(){
    switch(operatorType){
        case '+':
            answer = addition();
            break;
        case '/':
            answer = division();
            break;
        case '*':
            answer = multiplication();
            break;
        case '-':
            answer = subtraction();
            break;
        case '^':
            answer = exponent();
            break;
        case null:
            answer = secondValue;
            break;
    }
    answer = answer.toString();
}