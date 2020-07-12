
async function getRandomMusic(){
    // Called onclick 
    const response = await fetch('/random-music-data');
    const data = await response.json(); // return random music metadata
    console.log(data.comments);
    document.getElementById('music-embed').src = data.url;
    document.getElementById('musicId').value = data.musicId;
    updateComments(data.comments);
    let langSelect = document.getElementById('lang');
    let langCode = langSelect.options[0].selected = "selected";
}

function updateComments(comments){
    let commentSection = document.getElementById('comments');

    // clear prev comments 
    commentSection.innerHTML = "";
    // update with new comments
    for(let comment of comments){
        commentSection.appendChild(createCommentNode(comment));
    }
}

function createCommentNode(commentMeta) {
    // Create comment item div

    let node = document.createElement('div');
    node.className = "comment-item";
    let contentNode = document.createElement('div');
    let datetimeNode = document.createElement('div');
    contentNode.innerText = commentMeta.content;
    datetimeNode.innerText = unixToDatetime(commentMeta.timestamp);
    node.appendChild(contentNode);
    node.appendChild(datetimeNode);
    return node;
}

function unixToDatetime(timestamp){
    // Convert unix timestamp to readable datetime

    var a = new Date(timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

async function onSelectLang(idx) {
    // Called when drop down select changes value

    let langSelect = document.getElementById('lang');
    let langCode = langSelect.options[idx].value;
    let musicId = document.getElementById('musicId').value;
    
    // Construct query string
    let params = {"langCode": langCode, "musicId": musicId };

    const response = await fetch("/comments?"+constructQueryString(params));
    const comments = await response.json();
    console.log(comments);
    updateComments(comments);
}

function constructQueryString(params){
    let esc = encodeURIComponent;
    let query = Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
    return query;
}