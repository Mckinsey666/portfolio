
async function getRandomMusic(){
    const response = await fetch('/data');
    const url = await response.text();
    document.getElementById('music-embed').src = url;
}