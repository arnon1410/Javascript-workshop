const calculatorDisplay = document.querySelector('h1');
const inputBtn = document.querySelectorAll('button'); //array 
const clearBtn=document.getElementById('clear-btn');

const calculate = {
    "/":(fristNumber,secondNumber)=>secondNumber!=0 ? fristNumber / secondNumber:"error",
    "*":(fristNumber,secondNumber)=>fristNumber * secondNumber,
    "+":(fristNumber,secondNumber)=>fristNumber + secondNumber,
    "-":(fristNumber,secondNumber)=>fristNumber - secondNumber,
    "=":(fristNumber,secondNumber)=>secondNumber
   

}
let firstValue = 0; //ตัวเลขที่ 1
let operatorValue = ''; //เก็บตัวดำเนินการ
let waitForNext = false; //เก็บสถานะของตัวเลขและตัวดำเนินการ

function setNumbervalue(number){
    if(waitForNext){
        calculatorDisplay.textContent=number;
        waitForNext=false;
    }
    else{
        const displayvalue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayvalue ==='0' ? number : displayvalue+number
    }
}
function callOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    if(operatorValue && waitForNext){
        operatorValue=operator;
        return;
    }
    if(!firstValue){
        firstValue=currentValue; //ค่าเริ่มต้น 
    }
    else{
        const result = calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent = result;
        firstValue=result;
    }
    operatorValue=operator;
    waitForNext = true;

}
function addDecimal(){
    if(waitForNext) return;
    if(!calculatorDisplay.textContent.includes(".")){// เช็คจุดว่ามีหรือยัง
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

inputBtn.forEach((input)=>{
    //ปุ่ม0-9
    if(input.classList.length === 0){
        input.addEventListener('click',()=>setNumbervalue(input.value));
    }
    else if(input.classList.contains("operator")){
        input.addEventListener('click',()=>callOperator(input.value))
    }
    else if(input.classList.contains("decimal")){
        input.addEventListener('click',()=>addDecimal(input.value))
    }
});
function resetAll(){
    firstValue =0;
    operatorValue='';
    waitForNext=false;
    calculatorDisplay.textContent = '0';
}
clearBtn.addEventListener('click',()=>resetAll());

