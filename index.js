const cardTemplate = function (flag, country, maps, capital) {
  return `<div class="card">
            <a href="${maps}" target="_blank"><img id="flag-image" src=${flag} alt="flag" /></a>
            <h1 class="center">${country}</h1>
            <span class="center">${capital}</span>
          </div>`;
};

const countriesNode = document.getElementById("countries");
let section = document.createElement("section");
section.id = "section";
countriesNode.appendChild(section);

function getAllCountries() {
  return fetch("https://restcountries.com/v3.1/all")
            .then(res => res.json())
            .then(data => {
              return data.map(el => {
                let name = el.name.official;
                let continent = el.region;
                let flag = el.flags.png;
                let maps = el.maps.googleMaps;
                let capital = el.capital;
                return {name: name,
                        continent: continent,
                        flag: flag,
                        maps: maps,
                        capital: capital}
              });
              
            });
}
function sortAlfabeticly(countries) {
  return countries.then(res => {
    for (let i = 0; i < res.length; i++) { 
      let swaped = false;  
      for (let j = 0; j < (res.length - i - 1); j++) { 
          if (res[j].name > res[j + 1].name) { 
              var temporary = res[j]; 
              res[j] = res[j + 1];
              res[j + 1] = temporary;
              swaped = true;
          } 
      }
      if (!swaped) break;
    } 
    return res;
  });
}
//obtengo los países
let allCountries = getAllCountries();
allCountries = sortAlfabeticly(allCountries);
//los represento
let temp = "";
allCountries.then(data => {
  for (let i = 0; i < data.length; i++) {
    let country = cardTemplate(data[i].flag, data[i].name, data[i].maps, data[i].capital);
    temp += country;
  };
  section.innerHTML = temp;
  let pais = document.getElementsByClassName("card");
  for (let i = 0; i < pais.length; i++) {
    pais[i].style.visibility = "hidden";
    setTimeout(function() {
      pais[i].style.visibility = "visible";
      pais[i].style.animation = "aparecer 2s ease-in-out forwards";
    }, i*100);
  }
});


let filter = document.getElementById("filter");
let cont1 = document.getElementById("cont1");
let cont2 = document.getElementById("cont2");
let cont3 = document.getElementById("cont3");
filter.addEventListener("click", function() {
  cont1.classList.toggle("hide");
  if (!cont2.classList.contains("hide")) {
    cont2.classList.toggle("hide");
  };
  if (!cont3.classList.contains("hide")) {
    cont3.classList.toggle("hide");
  };
});
let continent = document.getElementById("continent");
let z = document.getElementById("z");
let starts = document.getElementById("starts");
continent.addEventListener("click", function() {
  if (cont2.classList.contains("hide")) {
    cont2.classList.toggle("hide");
  };
  if (!cont3.classList.contains("hide")) {
    cont3.classList.toggle("hide");
  };
});
z.addEventListener("click", function() {
  cont1.classList.toggle("hide");
  if (!cont2.classList.contains("hide")) {
    cont2.classList.toggle("hide");
  };
  if (!cont3.classList.contains("hide")) {
    cont3.classList.toggle("hide");
  };
  allCountries.then(data => {
    temp = "";
    for (let i = data.length-1; i >= 0; i--) {
      let country = cardTemplate(data[i].flag, data[i].name, data[i].maps, data[i].capital);
      temp += country;
    };
    section.innerHTML = temp;
    let pais = document.getElementsByClassName("card");
    for (let i = 0; i < pais.length; i++) {
      pais[i].style.visibility = "hidden";
      setTimeout(function() {
        pais[i].style.visibility = "visible";
        pais[i].style.animation = "aparecer 2s ease-in-out forwards";
      }, i*100);
    }
  });
});
starts.addEventListener("click", function() {
  if (cont3.classList.contains("hide")) {
    cont3.classList.toggle("hide");
  };
  if (!cont2.classList.contains("hide")) {
    cont2.classList.toggle("hide");
  };
}); 

document.querySelector("main").addEventListener("click", function() {
  if (!cont1.classList.contains("hide")) {
    cont1.classList.toggle("hide");
  };
  if (!cont2.classList.contains("hide")) {
    cont2.classList.toggle("hide");
  };
  if (!cont3.classList.contains("hide")) {
    cont3.classList.toggle("hide");
  };
});

let continentes = document.getElementById("continentes");
continentes.addEventListener("submit", function(event) {
  event.preventDefault();
  if (!cont1.classList.contains("hide")) {
    cont1.classList.toggle("hide");
  };
  if (!cont2.classList.contains("hide")) {
    cont2.classList.toggle("hide");
  };
  if (!cont3.classList.contains("hide")) {
    cont3.classList.toggle("hide");
  };
  let continente = event.target.continente.value;
  allCountries.then(data => {
    temp = "";
    data = data.filter(el => el.continent == continente)
    for (let i = 0; i < data.length; i++) {
      let country = cardTemplate(data[i].flag, data[i].name, data[i].maps, data[i].capital);
      temp += country;
    };
    section.innerHTML = temp;
    let pais = document.getElementsByClassName("card");
    for (let i = 0; i < pais.length; i++) {
      pais[i].style.visibility = "hidden";
      setTimeout(function() {
        pais[i].style.visibility = "visible";
        pais[i].style.animation = "aparecer 2s ease-in-out forwards";
      }, i*100);
    };
  });
});

let letra = document.getElementById("letra");
letra.addEventListener("submit", function(event) {
  event.preventDefault();
  let caracter = event.target.letraUnica.value;
  if (caracter.length != 1) {
    Swal.fire({
      icon: 'error',
      text: 'You have to write a single letter',
    });
  } else {
    allCountries.then(data => {
      data = data.filter(el => el.name.startsWith(caracter.toUpperCase()))
      if (data.length == 0) {
        Swal.fire({
          icon: 'error',
          text: `There are no countries by letter ${caracter}`,
        });
      } else {
        if (!cont1.classList.contains("hide")) {
          cont1.classList.toggle("hide");
        };
        if (!cont2.classList.contains("hide")) {
          cont2.classList.toggle("hide");
        };
        if (!cont3.classList.contains("hide")) {
          cont3.classList.toggle("hide");
        };
        temp = "";
        for (let i = 0; i < data.length; i++) {
          let country = cardTemplate(data[i].flag, data[i].name, data[i].maps, data[i].capital);
          temp += country;
        };
        section.innerHTML = temp;
        let pais = document.getElementsByClassName("card");
        for (let i = 0; i < pais.length; i++) {
          pais[i].style.visibility = "hidden";
          setTimeout(function() {
            pais[i].style.visibility = "visible";
            pais[i].style.animation = "aparecer 2s ease-in-out forwards";
          }, i*100);
        };
      }
    });
  }
});