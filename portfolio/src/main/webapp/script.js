const projectNames = [
  'project-bullet',
  'project-chart-race',
  'project-anime',
  'project-anime-data',
  'project-vocab',
  'project-rl',
  'project-fegan'
]

const backgroundNames = {
  "ntu": "background-ntu",
  "wq": "background-wq",
  "vll": "background-vll",
  "eesa": "background-eesa",
  "nehs": "background-nehs"
}

const imgSrc = [
  'images/avatar/avatar_1.png', 
  'images/avatar/avatar_2.jpg'
];

var states = {
  imgId: 1,
  projectId: 0,
  backgroundId: 'ntu'
}

function loadPage() {
  adjustBackgroundImgWidth();
  document.getElementById('left-button').addEventListener(
    "click", () => { projectSlide(-1); }
  )
  document.getElementById('right-button').addEventListener(
    "click", () => { projectSlide(1); }
  )
  for(let id of projectNames){
    document.getElementById(id).style.display = "none";
  }
  document.getElementById(projectNames[states.projectId]).style.display = "flex";
  document.getElementById("avatar-img").src = imgSrc[states.imgId]; 

  for(let id in backgroundNames){
    console.log(document.getElementById(id));
    document.getElementById(id).addEventListener('mouseenter', () => {
      document.getElementById(backgroundNames[states.backgroundId]).style.display = "none";
      document.getElementById(backgroundNames[id]).style.display = 'block';
      states.backgroundId = id;
    })
  }

}


function onAvatarClick() {
  const newId = (states.imgId + 1) % imgSrc.length;
  states.imgId = newId;
  document.getElementById("avatar-img").src = imgSrc[newId];
}

function adjustBackgroundImgWidth() {
  var imgs = document.getElementsByClassName('background-item-img');
  for(let img of imgs) {
    img.height = img.width;
  }
}

function hideProject(id) {
  console.log('id', id);
  document.getElementById(projectNames[id]).style.display = "none";
}

function showProject(id) {
  document.getElementById(projectNames[id]).style.display = "flex";
}

function projectSlide(inc) {
  var newId = (states.projectId + inc + projectNames.length) % projectNames.length;
  hideProject(states.projectId);
  showProject(newId);
  states.projectId = newId;
}