//definindo o filtro do catálogo
// let filtro = null;

let jogos = []

// GET JOSOS
function getJogosData({id, genre_id = false, getJogos, search = false}) {
  let url;

  url = `https://api.rawg.io/api/games?key=15ce59a57be74a5faa1a5987fbbf1a4d`

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
    url = `https://api.rawg.io/api/games?key=15ce59a57be74a5faa1a5987fbbf1a4d&search=${search}"`
  }

  let xhr = new XMLHttpRequest();
  xhr.onload = getJogos
  xhr.open('GET', url, false)
  xhr.send();
}

function getJogos(data) {
  data = data.target.response;
  data = JSON.parse(data);

  jogos = data.results;
}

getJogosData({getJogos})

// criando os jogos do catálogo
function mostraJogos(jogo, card) {
  let div_col = document.createElement('div');
  div_col.classList.add('col-md')

  div_col.innerHTML = `
    <div id="card_efeito" class="cursor_ponteiro">
      <a href="../jogo_page/index.html?id=${jogo.id}" class="link">
        <div class="card_instance">
          <div class="card_content text-center mb-0 pt-3">
            <div id="gameImage-${jogo.id}" class="game_image_div"></div>
            <h5 class="mt-2">${jogo.name}</h5>
            <p class="descricao"></p>
          </div>
        </div>
          
        <div class="card_avaliacao">
          <p class="text-warning estrela">
            <span id="muito-bom" class="avaliacoes badge bg-success">${jogo.ratings[0].percent}%</span>
            <span id="bom" class="avaliacoes badge bg-warning text-black">${jogo.ratings[1].percent}%</span>
            <span id="meh" class="avaliacoes badge bg-danger">${jogo.ratings[2].percent}%</span>
            <span id="podre" class="avaliacoes badge bg-secondary">${jogo.ratings[3].percent}%</span>
          </p>
        </div>
      </a>
    </div>
  `;

  card.appendChild(div_col);

  let image = document.getElementById(`gameImage-${jogo.id}`)
  image.style.backgroundImage = `url('${jogo.background_image}')`
}

const card = document.getElementById('card_row')

jogos.forEach(jogo => {
  window.addEventListener('load', mostraJogos(jogo, card));
});
