const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const displayScreen = document.getElementById('display-content');
const clear = document.getElementById('clear');
const equals = document.getElementById('equals');

let valueEntered = '0';
let operatorType = null;
let firstValue = '0';
let secondValue = null;
let answer = '0';
let clearDoubleOperator = true;

const ShOwVaLuEs = document.getElementById('showValues'); // just testing quicker
ShOwVaLuEs.addEventListener('click', () => showValues());
function showValues() { //This is just for troubleshooting
    console.log('valueEntered = '+valueEntered);
    console.log('operatorType = '+operatorType);
    console.log('firstValue = '+firstValue);
    console.log('secondValue = '+secondValue);
    console.log('answer = '+answer);
    console.log('')
}



numberBtn.forEach(button => button.addEventListener('click', function (){
    if ((valueEntered === '0') && (button.textContent != '.')){
        valueEntered = button.textContent;
    }    
    //else if (contains a . already) {return}
    else {valueEntered += button.textContent;}
    changeDisplay(valueEntered)
    clearDoubleOperator = true;
}));
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


operatorBtn.forEach(operator => operator.addEventListener('click', function(){
    let operatorButton = operator.textContent;
    (operatorType == null) ? operatorButtonNormal(operatorButton): operatorButtonAsEquals(operatorButton);
    clearDoubleOperator = false;
} ));

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
    firstValue = '0'
    operatorType = null;
    secondValue = null;
    answer = '0'
    changeDisplay(valueEntered);
}

function changeDisplay(newDisplay){
    displayScreen.textContent = newDisplay
}

function getOperator(buttonPushed){
//perform calculation then return answer, then gather new operator type
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
        case null:
            answer = firstValue;
            break;
    }
    answer = answer.toString();
}