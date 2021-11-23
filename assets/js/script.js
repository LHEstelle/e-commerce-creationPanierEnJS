fetch("assets/json/donnees.json")
  .then((response) => response.json())
  .then((data) => {
    data.results.forEach((element, index) => {
      document.getElementById("allCards").innerHTML += `
      <div class="m-3 col-lg-3 id="carte${index}" data-cat="${element.categorie}" name="toto">
      <img src="assets/img/${element.image}" id="picture${index}" class="card-img-top" alt="">
      <div class="card-body">
          <h5 id="title${index}" class="title text-center">${element.title}</h5>
          <p id="categorie${index}" class="categorie">${element.categorie}</p>
          <p id="description${index}" class="description">${element.description}</p>
          <a  id="price${index}" class="btn btn-secondary">${element.price}</a>
          <button data-acheter data-price="${element.price}" data-reference="${element.reference}" data-article="${element.title}">Acheter</button>
          </div>
          </div>
      </div>
      `;
    });
  });

//Permet d'aficher la catégorie sélectionné en masquant les autres
function showArticle(article) {
  if (article == "teeShirt") {
    document.querySelectorAll('[data-cat="teeShirt"]').forEach((element) => {
      element.style.display = "block";
    });
    document.querySelectorAll('[data-cat="casquette"]').forEach((element) => {
      element.style.display = "none";
    });
    document.querySelectorAll('[data-cat="chaussure"]').forEach((element) => {
      element.style.display = "none";
    });
  }
  if (article == "chaussure") {
    document.querySelectorAll('[data-cat="chaussure"]').forEach((element) => {
      element.style.display = "block";
    });
    document.querySelectorAll('[data-cat="casquette"]').forEach((element) => {
      element.style.display = "none";
    });
    document.querySelectorAll('[data-cat="teeShirt"]').forEach((element) => {
      element.style.display = "none";
    });
  }
  if (article == "casquette") {
    document.querySelectorAll('[data-cat="casquette"]').forEach((element) => {
      element.style.display = "block";
    });
    document.querySelectorAll('[data-cat="teeShirt"]').forEach((element) => {
      element.style.display = "none";
    });
    document.querySelectorAll('[data-cat="chaussure"]').forEach((element) => {
      element.style.display = "none";
    });
  }
}

// Permet de faire +1 au panier à chaques clic
let i = 1;
document.getElementById("allCards").addEventListener("click", (event) => {
  if (event.target.nodeName == "BUTTON") {
    document.getElementById("panierNb").textContent = i++;
  }
});

document.getElementById("allCards").addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-acheter")) {
    document.getElementById("myTable").innerHTML += `
      <tr>
        <th>${event.target.dataset.reference}</th>
        <td>${event.target.dataset.article}</td>
        <td>${event.target.dataset.price}</td>
        <td>1</td>
        <td>25</td>
      </tr>
`;
  }
});
