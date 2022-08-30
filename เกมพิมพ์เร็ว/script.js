const wordEl=document.getElementById('word');
const textEl=document.getElementById('text');
const scoreEl=document.getElementById('score');
const timeEl=document.getElementById('time');

const btnLevelEl=document.getElementById('level-btn');
const settingsEl=document.getElementById('settings');
const levelFormEl=document.getElementById('level-form');
const levelEl=document.getElementById('level');
const gameoverEl=document.getElementById('gameover-container');

const words = ["หมา","หมา","หมู","ไก่"];

let randomText;
let score=0;
let time=10;

let level='medium';

const timeInterval = setInterval(updateTime,1000);
const saveMode=localStorage.getItem('mode') !==null ? localStorage.getItem('mode'): 'medium';

function getRandomWord(){
    return words[Math.floor(Math.random()*words.length)]
}

function displayWordToUI(){
    randomText=getRandomWord();
    wordEl.innerHTML = randomText;
    timeEl.innerHTML=time;

}
textEl.addEventListener('input', (e)=>{
    const inputText=e.target.value;

    if(inputText===randomText){

        if(saveMode =='easy'){
            time+=5;
        }else if(saveMode =='medium'){
            time+=3;
        }else{
            time+=2;
        }
        displayWordToUI();
        updateScore();
        e.target.value='';
    }
});

function updateScore(){
    score+=10;
    scoreEl.innerHTML=score;

}

function updateTime(){
    time--;
    timeEl.innerHTML=time;
    if(time ===0){
        clearInterval(timeInterval);
        game0ver();
    }

}
function game0ver(){
    gameoverEl.innerHTML=`<h1>จบเกมแล้วแล้ว</h1>
    <p>คำแนนของคุณ ${score} คะแนน</p>
    <button onclick="location.reload()">เล่นอีกครั้ง</button>`;
    gameoverEl.style.display='flex'
}
btnLevelEl.addEventListener('click',()=>{
    settingsEl.classList.toggle('hide');

});
levelEl.addEventListener('change',(e)=>{
    level=e.target.value;
    localStorage.setItem("mode",level);

});

function startGame(){

    levelEl.value=saveMode;

    if(saveMode =='easy'){
        time=15;
    }else if(saveMode =='medium'){
        time=10;
    }else{
        time=5;
    }

    displayWordToUI();


}
startGame();
displayWordToUI();
textEl.focus;