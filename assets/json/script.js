fetch("./donnees.json")
  .then((response) => response.json())
  .then((data) => {
    data.results.forEach((element) => {
      document.getElementById("copy").innerHTML += `
      <div class="card m-3" style="width: 18rem">
        <img src="${element.image}" id="picture" class="card-img-top" alt="">
        <div class="card-body">
            <h5 id="title" class="card-title">${element.title}</h5>
            <p id="description" class="card-text">${element.description}</p>
            <a href="#" id="price" class="btn btn-secondary">${element.price}</a>
        </div>
    </div>     
      `;
    });
  });
