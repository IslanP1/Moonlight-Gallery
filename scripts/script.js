let page = localStorage.getItem("numPage") || 1;

let urlBase = `https://images-api.nasa.gov/search?q=moon&page=${page}`;
const divImages = document.querySelector(".images");
const buttonNext = document.querySelector("#buttonNext");
const buttonBack = document.querySelector("#buttonBack");
const balls = document.querySelectorAll(".balls");


buttonNext.addEventListener("click", () => {
  page++;
  localStorage.setItem("numPage", page);
  let urlModified = `https://images-api.nasa.gov/search?q=moon&page=${page}`;
  handleApi(urlModified);
});

buttonBack.addEventListener("click", () => {
  if (page > 1) 
    page--;
    localStorage.setItem("numPage", page);
  let urlModified = `https://images-api.nasa.gov/search?q=moon&page=${page}`;
  handleApi(urlModified);
})

function handleApi(urlModified) {
  fetch(urlModified)
    .then(api => api.json())
    .then(json => renderImage(json));
}

function renderImage(response) {
  let linksImg = [];

  for (let k = 0; k < 10; k++) {
    linksImg.push(response["collection"]["items"][k]["links"][0]["href"]);
  }

  removeElements();

  linksImg.forEach((value) => {
    let imagem = document.createElement("img");
    imagem.src = value;
    divImages.appendChild(imagem);
  });
}

function removeElements() {
  while (divImages.firstChild) {
    divImages.removeChild(divImages.firstChild);
  }
}

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
balls.forEach(ball => ball.style = `--ball-delay:${getRandomNumber(0, 1000)}ms`)

handleApi(urlBase);