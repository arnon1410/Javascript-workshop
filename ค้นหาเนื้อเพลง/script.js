const form= document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = "https://api.lyrics.ovh/";

form.addEventListener('submit', e=>{
    e.preventDefault();
    const songtxt=search.value.trim();//trim คือการลบช่องว่างทั้งหมดออก

    if(!songtxt){
        alert('ป้อนข้อมูลไม่ถูกต้อง');
    }
    else{
        searchLyrics(); //รับ
    }
})

async function searchLyrics(song){ //ส่ง
    const res = await fetch(`${apiURL}/suggest/${song}`);
    const allSongs = await res.json();
    showData(allSongs);


}
function showData(songs){
    console.log(songs);
    result.innerHTML=`
    <ul class="songs">
        ${songs.data.map(song=>
            `<li>
            <span>
            <strong>${song.artist.name}</strong> - ${song.title}
            </span>
            <button class="btn">เนื้อเพลง</button>
            </li>`
        ).join("")}
    </ul>
    `;
    if(songs.next || songs.prev){
        more.innerHTML=`
        ${songs.prev ? `<button class="btn">ก่อนหน้า</button>`: ''}
        ${songs.next ? `<button class="btn" inclick="getMoreSongs('${songs.next}')">ถัดไป</button>`: ''}
        
        
        `
    }
    else{
        more.innerHTML=`
        `
    }

}
function getMoreSongs(songsUrl){
    const res = await fetch(`https://cors.bridged.cc/x${songsUrl}`);
    const allSongs = await res.json();
    showData(allSongs);
}