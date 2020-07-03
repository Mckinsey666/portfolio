// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
const projectNames = [
  'project-bullet',
  'project-chart-race',
  'project-anime',
  'project-anime-data',
  'project-vocab',
  'project-rl'
]

const imgSrc = [
  'images/avatar/avatar_1.png', 
  'images/avatar/avatar_2.jpg'
];

var states = {
  imgId: 1,
  projectId: 0
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