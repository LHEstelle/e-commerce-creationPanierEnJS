fetch("assets/json/donnees.json")
    .then((response) => response.json())
    .then((data) => {
        data.results.forEach((element) => {
            document.getElementById("card").innerHTML += `
      <div class="m-3 col-lg-3 border border-danger">
        <img src="assets/img/${element.image}" id="picture" class="card-img-top" alt="">
        <div class="card-body">
            <h5 id="title" class="card-title">${element.title}</h5>
            <p id="categorie></p>
            <p id="description" class="card-text">${element.description}</p>
            <a href="#" id="price" class="btn btn-secondary">${element.price}</a>
            </div>
        </div>
      `;
        });
    });