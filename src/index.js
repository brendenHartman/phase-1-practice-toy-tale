let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//brendens code starts here
const container = document.getElementById('toy-collection');
const namBar = document.getElementsByName('name')[0];
const imgBar = document.getElementsByName('image')[0];
const submit = document.getElementsByName('submit')[0];

document.addEventListener('DOMContentLoaded',()=>{
  submit.addEventListener('click',()=>addCard());
  fetch('http://localhost:3000/toys')
  .then((response)=>response.json())
  .then(function(data){
    console.log(data);
    data.forEach(element => {
      createCard(element);
    });
  });
});

function createCard(element){
    let card = document.createElement('div');
    let h2 = document.createElement('h2');
    h2.innerText = element.name;
    let p = document.createElement('p');
    p.innerText = `${element.likes} likes`;
    let img = document.createElement('img');
    img.src = element.image;
    img.className = "toy-avatar";
    let button = document.createElement('button');
    button.className = 'like-btn';
    button.id = `${element.id}`;
    button.innerText = `Like ❤️`;
    button.addEventListener('click',(event) => updateLikes(event));
    card.className = "card";
    card.appendChild(h2);
    card.appendChild(p);
    card.appendChild(img);
    card.appendChild(button);
    container.appendChild(card);
}

function addCard(){
    let name = namBar.value;
    let imagee = imgBar.value;
    fetch('http://localhost:3000/toys',{
      method: 'POST',
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "image": imagee,
        "likes": 0
      })
    })
    .then((response) => response.json())
    .then((element) => createCard(element));
}
function updateLikes(event){
  let buttonNew = event.target; 
  //console.log(buttonNew)
  const iDD = buttonNew.id;
  //console.log(iDD)
  let daddyCard = event.target.parentElement;
  //console.log(daddyCard)
  let currentP = daddyCard.getElementsByTagName('p')[0];
  let currentpWords = currentP.innerText.split(' ');
  let currentLikes = currentpWords[0];
  let newNumberOfLikes = parseInt(currentLikes, 10) + 1;
  fetch(`http://localhost:3000/toys/${iDD}`,{
    method: "PATCH",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": newNumberOfLikes
    })
  })
  .then((response) => response.json())
  .then((element) => {
    currentP.innerText = `${element.likes} likes`
  });
}