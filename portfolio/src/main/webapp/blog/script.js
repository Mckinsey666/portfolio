
async function getRandomMusic(){
    const response = await fetch('/data');
    const urls = await response.json(); // return all music urls
    const idx = Math.floor(Math.random() * urls.length);
    document.getElementById('music-embed').src = urls[idx];
}