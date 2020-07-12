let commentSection = document.getElementById('comments');

async function getRandomMusic(){
    const response = await fetch('/random-music-data');
    const data = await response.json(); // return random music metadata
    console.log(data.comments);
    document.getElementById('music-embed').src = data.url;
    document.getElementById('music-id').value = data.id;

    // remove prev comments 
    let commentSection = document.getElementById('comments');
    commentSection.innerHTML = "";
    
    // update with new comments
    for(let comment of data.comments){
        commentSection.appendChild(createCommentNode(comment));
    }
}

function createCommentNode(commentMeta) {
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