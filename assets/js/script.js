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
let article = 1;
let v = 1;
document.getElementById("allCards").addEventListener("click", (event) => {
    if (event.target.nodeName == "BUTTON") {
        document.getElementById("panierNb").textContent = article++;
    }
});
let arrayCart = []
document.getElementById("allCards").addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-acheter")) {
        if (arrayCart.includes(event.target.dataset.reference)) {
            document.getElementById(`quantite-${event.target.dataset.reference}`).textContent++
                calculateSousTotal(event.target.dataset.reference)
        } else {
            arrayCart.push(event.target.dataset.reference)
            document.getElementById("myTable").innerHTML += `
          <tr id="line-${event.target.dataset.reference}">
            <th>${event.target.dataset.reference}</th>
            <td>${event.target.dataset.article}</td>
            <td id="price-${event.target.dataset.reference}">${event.target.dataset.price}</td>
            <td><button class="btn btn-secondary" onclick="changeQuantity(${event.target.dataset.reference}, 'minus')">-</button></td>
            <td class="text-center" id="quantite-${event.target.dataset.reference}">1</td>
            <td><button class="btn btn-secondary" onclick="changeQuantity(${event.target.dataset.reference}, 'plus')">+</button></td>
            <td id="total-${event.target.dataset.reference}"></td>
            <td><button class="btn btn-danger" onclick="deleteLine(${event.target.dataset.reference})"><i class="bi bi-trash-fill"></i></button></td>
          </tr>`;
            calculateSousTotal(event.target.dataset.reference)
        }
    }
    console.log(arrayCart)

})

function deleteLine(ref) {
    let myIndex = arrayCart.indexOf(ref)
    document.getElementById(`line-${ref}`).remove()
    arrayCart.splice(myIndex, 1)
}

function myDelete() {
    document.getElementById("myTable").innerHTML = "";
    document.getElementById("panierNb").innerText = "";
    arrayCart = []
    article = 1
}

function changeQuantity(ref, action) {
    if (action == "plus" && document.getElementById(`quantite-${ref}`).textContent < 30) {

        document.getElementById(`quantite-${ref}`).textContent++
            calculateSousTotal(ref)
    }
    if (action == "minus" && document.getElementById(`quantite-${ref}`).textContent > 1) {
        document.getElementById(`quantite-${ref}`).textContent--
            calculateSousTotal(ref)
    } else if (document.getElementById(`quantite-${ref}`).textContent == 1) {
        deleteLine(ref)
    }
}

function calculateSousTotal(ref) {

    let sousTotal = parseInt(document.getElementById(`price-${ref}`).textContent) * Number(document.getElementById(`quantite-${ref}`).textContent)
    document.getElementById(`total-${ref}`).textContent = sousTotal

}