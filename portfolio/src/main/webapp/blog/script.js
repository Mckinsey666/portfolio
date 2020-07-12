
async function getRandomMusic(){
    const response = await fetch('/data');
    const data = await response.json(); // return random music metadata
    console.log(data);
    document.getElementById('music-embed').src = data.url;
}