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
  document.querySelector("form").addEventListener("submit", createToy)
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((data) => {
      for (let toy of data) {
        const div = document.createElement("div")
        const h2 = document.createElement("h2")
        const toyImg = document.createElement("img")
        const toyPara = document.createElement("p")
        const toyBtn = document.createElement("button")
        div.setAttribute("class", "card")
        toyImg.setAttribute("class", "toy-avatar")
        toyImg.setAttribute("src", toy["image"])
        toyBtn.setAttribute("class", "like-btn")
        toyBtn.setAttribute("id", toy["id"])
        toyBtn.addEventListener("click", addLikes)
        h2.innerText = toy["name"]
        toyPara.innerText = `${toy["likes"]} likes`
        toyBtn.innerText = "Like"
        div.appendChild(h2)
        div.appendChild(toyImg)
        div.appendChild(toyPara)
        div.appendChild(toyBtn)
        document.getElementById("toy-collection").appendChild(div)
      }
    })
});

function createToy(e) {
  e.preventDefault()
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      "name": e.target[0]["value"],
      "image": e.target[1]["value"],
      "likes": 0
    })
  })
    .then((response) => response.json())
    .then((data) => {
      const div = document.createElement("div")
      const h2 = document.createElement("h2")
      const toyImg = document.createElement("img")
      const toyPara = document.createElement("p")
      const toyBtn = document.createElement("button")
      div.setAttribute("class", "card")
      toyImg.setAttribute("class", "toy-avatar")
      toyImg.setAttribute("src", data["image"])
      toyBtn.setAttribute("class", "like-btn")
      toyBtn.setAttribute("id", data["id"])
      h2.innerText = data["name"]
      toyPara.innerText = `${data["likes"]} likes`
      toyBtn.innerText = "Like"
      div.appendChild(h2)
      div.appendChild(toyImg)
      div.appendChild(toyPara)
      div.appendChild(toyBtn)
      document.getElementById("toy-collection").appendChild(div)
    })
}

function addLikes(e) {
  let likeString = e.target.previousElementSibling.innerText
  let numberOfLikes = parseInt(likeString)
  numberOfLikes++
  const serverURL = "http://localhost:3000/toys/"
  fetch(`${serverURL}${e.target["id"]}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      "likes": numberOfLikes
  })
  })
    .then((response) => response.json())
    .then((data) => {
      likeString = `${data["likes"]} likes`
    }
    )
}
