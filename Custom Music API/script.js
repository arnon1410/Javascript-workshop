const music_container = document.getElementById('music-container');
const playBtn=document.getElementById('play');
const prevBtn=document.getElementById('prev');
const nextBtn=document.getElementById('next');
const audio=document.getElementById('audio');
const progress=document.getElementById('progress');
const progress_container=document.getElementById('progress-container');
const title=document.getElementById('title');
const cover=document.getElementById('cover');


const songs=["Contra","HavestMoon","Mario"];
let index = 0; //เป็น let เพราะ index(ต้องมี) เปลี่ยนแปลงได้ 

function loadSongs(song){
    title.innerText=`เพลง ${song} .mp3`;
    cover.src=`cover/${song}.jpeg`;
    audio.src=`music/${song}.mp3`;
}

loadSongs(songs[index]) //ดึงจากตรงนี้

playBtn.addEventListener('click',()=>{
    const isPlay=music_container.classList.contains('play');// เช็คว่าเล่นเพลงหรือไม่ 

    if(isPlay){
        pauseSong(); // หยุดเล่น
    }else{
        playSong(); // เล่นเพลง
    }
});
prevBtn.addEventListener('click',()=>{
    index--;
    if(index<0){
        index=songs.length-1; //ย้ายไปที่เพลงสุดท้าย ถ้ามันหมดแล้ว
    }
    loadSongs(songs[index]);
    playSong();
});
nextBtn.addEventListener('click',nextSong);

function nextSong(){
    index++;
    if(index>songs.length-1){ //ถ้า index มากกว่าตัวสุดท้ายก็คือ 2 จะให้ค่า index = 0
        index=0; //กลับไปเพลงแรก
    }
    loadSongs(songs[index]);
    playSong();
}

function playSong(){
    music_container.classList.add('play'); //เพิ่ม play ใน music container
    playBtn.querySelector('i.fas').classList.remove('fa-play'); //ลบไอคอน play ออก
    playBtn.querySelector('i.fas').classList.add('fa-pause');//เพิ่มไอคอน pause 
    audio.play(); //เล่นเพลง
}

function pauseSong(){
    music_container.classList.remove('play'); 
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause(); //พอทเสียง
}

audio.addEventListener('timeupdate',updateProgress); //เช็คเวลา เรียกฟังก์ชันupdateProgress

function updateProgress(e){
    const {duration,currentTime} = e.srcElement;
    const progressPercent=(currentTime/duration)*100;
    progress.style.width=`${progressPercent}%`;
}

progress_container.addEventListener('click',setProcess);

function setProcess(e){ //กดเลื่อนเพลง
    const width=this.clientWidth; //ความกว้าง
    const clickX=e.offsetX; //ตำแหน่งที่คลิก
    const duration=audio.duration; //ระยะเวลาของเสียง
    audio.currentTime=(clickX/width)*duration; //หาเวลาปัจจุบัน
}
audio.addEventListener('ended',nextSong); //เมื่อเล่นเพลงจบก็จะเล่นเพลงถัดไป