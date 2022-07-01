const params = new URLSearchParams(window.location.search);
const search = params.get('search');

let jogos = []

// GET JOSOS
function getJogosData({id, genre_id = false, getJogos, search = false}) {
  let url;

  url = `https://api.rawg.io/api/games?key=15ce59a57be74a5faa1a5987fbbf1a4d&metacritic=80,100`

  if(!genre_id && !search && id) {
    // Procura um jogo pelo ID
    url = `https://api.rawg.io/api/games/${id}?key=15ce59a57be74a5faa1a5987fbbf1a4d`;
  }
  else if(genre_id && !search){
    // Procura jogos pela categoria
    url = `https://api.rawg.io/api/games?key=15ce59a57be74a5faa1a5987fbbf1a4d&genres=${genre_id}`
  }
  else if(search) {
    // Pesquisa jogos
    url = `https://api.rawg.io/api/games?key=15ce59a57be74a5faa1a5987fbbf1a4d&search=${search}`
  }

  let xhr = new XMLHttpRequest();
  xhr.onload = getJogos
  xhr.open('GET', url, false)
  xhr.send();
}

function getJogos(data) {
  data = data.target.response;
  data = JSON.parse(data);

  jogos = [];
  jogos = data.results;
}

if(!search) {
  getJogosData({getJogos})
}
else {
  getJogosData({getJogos, search})
}

// criando os jogos do catálogo
function mostraJogos(jogo, card) {
  let div_col = document.createElement('div');
  div_col.classList.add('col-md')

  if(jogo.ratings.length !== 0 && jogo.background_image) {
    div_col.innerHTML = `
      <div id="card_efeito" class="cursor_ponteiro">
        <a href="../jogo_page/index.html?id=${jogo.id}" class="link">
          <div class="card_instance">
            <div class="card_content text-center mb-0 pt-3">
              <div id="gameImage-${jogo.id}" class="game_image_div"></div>
              <h5 class="mt-2">${jogo.name}</h5>
            </div>
          </div>

          <div class="card_avaliacao">
            <p id="estrela-${jogo.id}" class="text-warning estrela"></p>
          </div>
        </a>
      </div>
    `;
    
      card.appendChild(div_col);
    
      let aval = document.getElementById(`estrela-${jogo.id}`)
    
      if(jogo.ratings[0] !== undefined) {
        aval.innerHTML += `
          <span id="muito-bom" class="avaliacoes badge bg-success">${jogo.ratings[0].percent}%</span>
        `
      }
      if(jogo.ratings[1] !== undefined) {
        aval.innerHTML += `
          <span id="bom" class="avaliacoes badge bg-warning text-black">${jogo.ratings[1].percent}%</span>
        `
      }
      if(jogo.ratings[2] !== undefined) {
        aval.innerHTML += `
          <span id="meh" class="avaliacoes badge bg-danger">${jogo.ratings[2].percent}%</span>
        `
      }
      if(jogo.ratings[3] !== undefined) {
        aval.innerHTML += `
          <span id="podre" class="avaliacoes badge bg-secondary">${jogo.ratings[3].percent}%</span>
        `
      }

      let image = document.getElementById(`gameImage-${jogo.id}`)
      image.style.backgroundImage = `url('${jogo.background_image}')`
  }

}

function aplicaFiltro(btn_id) {
  if(btn_id === 'btn-em-alta') {
    getJogosData({getJogos})
  }
  else if(btn_id === 'btn-fps') {
    getJogosData({getJogos, genre_id: 2})
  }
  else if(btn_id === 'btn-rpg') {
    getJogosData({getJogos, genre_id: 5})
  }
  else if(btn_id === 'btn-luta') {
    getJogosData({getJogos, genre_id: 6})
  }
  else if(btn_id === 'btn-indie') {
    getJogosData({getJogos, genre_id: 51})
  }
  else if(btn_id === 'btn-casual') {
    getJogosData({getJogos, genre_id: 40})
  }
  else if(btn_id === 'btn-corrida') {
    getJogosData({getJogos, genre_id: 1})
  }
  else if(btn_id === 'btn-simulacao') {
    getJogosData({getJogos, genre_id: 14})
  }

  while (card.firstChild) {
    card.removeChild(card.lastChild);
  }

  jogos.forEach(jogo => {
    mostraJogos(jogo, card)
  });
}

const card = document.getElementById('card_row')

jogos.forEach(jogo => {
  window.addEventListener('load', mostraJogos(jogo, card));
});

