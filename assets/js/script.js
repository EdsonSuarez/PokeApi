const API = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";


// Consumir API
const getData = (api) => {
  return fetch(api)
    .then((response) => response.json())
    .then((json) => {
      paginacion(json.next,json.previous),dibujarData(json.results);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};


const getPokemon = (api,html) => {
  return fetch(api)
  .then((response) => response.json())
  .then((json) => {
    dibujarPokemon(json.sprites.other.dream_world.front_default, json.forms[0].name, json.species.name,html);
    
  })
  .catch((error) => {
    console.log("error: ", error);
  });
};

const dibujarPokemon = (img, name,specie,html) => {
  
  html += '<div class="col-md-4">';
  html += '<div class="card" style="width: 18rem;">';
  html += `<img src="${img}" class="card-img-top" alt=".."/>`; 
  html += '<div class="card-body">';
  html += `<h5 class="card-title">${name}</h5>`;
  html += `<p class="card-text">${specie}</p>`;
  html += '</div>';
  html += '</div>';
  html += '</div>';
  document.getElementById("datosPJ").innerHTML += html;


};
// Dibujar cards de personajes
const dibujarData = (data) => {
  let html = "";
    data.forEach((pj) => {
      getPokemon(pj.url, html);
    });
    document.getElementById("datosPJ").innerHTML = null;


};


// Paginacion
const paginacion = (next, prev) => {
  console.log(next);
  let html = "";
  html += `<li class="page-item ${prev ? "" : "disabled"}"><a class="page-link" onclick="getData('${prev}')">Prev</a></li> <li class="page-item ${next ? "" : "disabled"}"><a class="page-link" onclick="getData('${next}')">Next</a></li>`;
  document.getElementById("paginacion").innerHTML = html;
};

// Ejecutar getData
getData(API);




