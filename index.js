const URL = 'https://pokeapi.co/api/v2/pokemon/';

let imgM = document.querySelector('#imgModal');
let modalTitle = document.querySelector('#modal-title');
let info = document.querySelector('#info');
let infoImage = document.querySelector('#infoImage');


let imagem = [
  document.querySelector('#img1'),
  document.querySelector('#img2'),
  document.querySelector('#img3'),
  document.querySelector('#img4'),
  document.querySelector('#img5'),
  document.querySelector('#img6')
];

let div = [
  document.querySelector('#div1'),
  document.querySelector('#div2'),
  document.querySelector('#div3'),
  document.querySelector('#div4'),
  document.querySelector('#div5'),
  document.querySelector('#div6')
];
let li = [
  document.querySelector('#li1'),
  document.querySelector('#li2'),
  document.querySelector('#li3'),
  document.querySelector('#li4'),
  document.querySelector('#li5'),
  document.querySelector('#li6')
];

document.getElementById('search').addEventListener('click', function () {
  let pokeElement = document.getElementById('pokesearch');
  let query = pokeElement.value;

  fetch(URL + query).then(res => {
    info.innerHTML = null;
    imgM.innerHTML = null;
    modalTitle.innerHTML = null;
    infoImage.innerHTML = null;
    res.json().then(data => {
      imgModal(data.sprites.front_default)
      setTimeout(function imgModalBack(src) {
        imgM.innerHTML = null
        var el = document.createElement('img');
        el.src = '';
        imgM.appendChild(el);
        el.id = 'pokemonImg';
        el.className = 'd-flex align-items-center';
        el.style.width = '120px';
        el.style.height = '120px';
        src = data.sprites.back_default
        el.src = src;
      }, 3000)
      mtitle(data.name, data.id)
      pokeTypeModal(data.types[0].type.name);
      height(data.height);
      weight(data.weight);
      abilityMd(data.abilities[0].ability.name);
      evolutions(data.species.url);
    })
  }).catch(error => console.error('erro', error))
});

for (let i = 0; i < 6; i++) {
  const pokemon = getRandom(1, 150);
  fetch(URL + pokemon).then(res => {
    res.json().then(data => {
      img(data.sprites.front_default, i);
      ability(data.id, i);
      pokeType(data.types[0].type.name, i);
      nome(data.name, i);
    })
  }).catch(error => console.error('erro', error))
}

function evolutions(src) {
  fetch(src).then(res => {
    res.json().then(data => {
      const idEvolution = data.evolution_chain.url;
      const nameEvolution = data.name;
      fetch(idEvolution).then(res => {
        res.json().then(chain => {
          if (nameEvolution != chain.chain.species.name) imgEvolution(chain.chain.species.url);
          
          if (nameEvolution != chain.chain.evolves_to[0].species.name) imgEvolution(chain.chain.evolves_to[0].species.url);
          
          if (nameEvolution != chain.chain.evolves_to[0].evolves_to[0].species.name) imgEvolution(chain.chain.evolves_to[0].evolves_to[0].species.url)      
        })
      })
    })
  })
}

function imgEvolution(src) {
  fetch(src).then(res => {
    res.json().then(data => {
      idImgEvolution = data.id
      fetch(URL + idImgEvolution).then(res => {
        res.json().then(evolutionData => {
          imgEvolutionData(evolutionData.sprites.front_default)
        })
      })
    })
  })
}

function pokeType(type, i) {
  if (type == 'water') {
    imagem[i].style.backgroundColor = "#007bff3b";
  } else if (type == 'fire') {
    imagem[i].style.backgroundColor = "#ffebca";
  } else if (type == 'grass' || type == 'poison') {
    imagem[i].style.backgroundColor = "#d6ebdc";
  } else if (type == 'dragon' || type == 'poison' || type == 'ground' || type == 'electric') {
    imagem[i].style.backgroundColor = "#f5e4db";
  } else {
    imagem[i].style.backgroundColor = "#e8e8e8";
  }
}

function img(src, i) {
  var el = document.createElement('img');
  imagem[i].appendChild(el);
  el.id = 'pokemonImg';
  el.className = 'card-img-top';
  el.src = src;
}

function imgEvolutionData(src) {
  var el = document.createElement('img');
  infoImage.appendChild(el);
  el.src = src;
}

function nome(text, i) {
  var el = document.createElement('h5');
  div[i].appendChild(el);
  el.id = 'pokemonName';
  el.className = 'card-title  m-3';
  el.innerText = text;
}

function ability(text, i) {
  var el = document.createElement('p');
  div[i].appendChild(el);
  el.id = 'id';
  el.className = 'card-text text-black-50';
  el.innerText = "#" + text;
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

function imgModal(src) {
  var el = document.createElement('img');
  imgM.appendChild(el);
  el.id = 'pokemonImg';
  el.className = 'd-flex align-items-center';
  el.style.width = '120px';
  el.style.height = '120px';
  el.src = src;
}

function imgModalBack(src) {
  imgM.innerHTML = null
  var el = document.createElement('img');
  imgM.appendChild(el);
  el.id = 'pokemonImg';
  el.className = 'd-flex align-items-center';
  el.style.width = '120px';
  el.style.height = '120px';
  el.src = src;
}

function height(text) {
  var el = document.createElement('p');
  info.appendChild(el);
  let tam = text / 10;
  el.innerHTML = '<span class="text-black-50">Height: </span>' + tam + 'm';
}

function weight(text) {
  var el = document.createElement('p');
  info.appendChild(el);
  let tam = text / 10;
  el.innerHTML = '<span class="text-black-50">weight: </span>' + tam + 'm';
}

function abilityMd(text) {
  var el = document.createElement('p');
  info.appendChild(el);
  el.innerHTML = '<span class="text-black-50">ability: </span>' + text;
}

function mtitle(title, id) {
  var el = document.createElement('h5');
  var il = document.createElement('span')
  modalTitle.appendChild(el);
  modalTitle.appendChild(il);
  il.className = 'text-black-50 fs-6';
  el.className = 'fw-bold'
  el.innerText = title;
  il.innerText = "#" + id;
}

function pokeTypeModal(type) {
  if (type == 'water') {
    imgM.style.backgroundColor = "#007bff3b";
  } else if (type == 'fire') {
    imgM.style.backgroundColor = "#ffebca";
  } else if (type == 'grass' || type == 'poison') {
    imgM.style.backgroundColor = "#d6ebdc";
  } else if (type == 'dragon' || type == 'poison' || type == 'ground' || type == 'electric') {
    imgM.style.backgroundColor = "#f5e4db";
  } else {
    imgM.style.backgroundColor = "#e8e8e8";
  }
}
