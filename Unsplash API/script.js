const count = 10;
const apiKey = 'WG6K-iOL2DLED9ne-poTZjiGfcCqX6BSv6WjuEMp5RI';
// const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


const imageContainer = document.getElementById('img-container');
let photoArrays=[];
async function getPhotos(){
    try{
       const response =  await fetch(apiUrl);
       photoArrays = await response.json();
       displayImage();
    }catch(err){
        console.log(err);
    }
}

function displayImage(){
    photoArrays.forEach((photo)=>{
        //ส่วนที่ทำเป็นลิ้งค์
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        //ส่วนแสดงรูปภาพ
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('title',photo.alt_description);
        img.setAttribute('alt',photo.alt_description);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
getPhotos(); //ดึงภาพมาแสดง

window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-100){
        //ดึงภาพมาแสดงผล
        getPhotos(); 

    }
});