const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const displayScreen = document.getElementById('display-content');
const clear = document.getElementById('clear');


valueEntered = '0';



numberBtn.forEach(button => button.addEventListener('click', function(){
    if ((valueEntered === '0') && (button.textContent != '.')){
        valueEntered = button.textContent;
    }
    //else if (contains a . already) {return}
    else {valueEntered += button.textContent;}
    changeDisplay(valueEntered)
}));

clear.addEventListener('click', () => clearAll());

operatorBtn.forEach(button => button.addEventListener('click', () => 
console.log('operator button clicked')))
console.log(displayScreen)



function clearAll(){
    valueEntered = '0';
    changeDisplay(valueEntered);
}

function changeDisplay(newDisplay){
    displayScreen.textContent = newDisplay
}