//definindo o filtro do catálogo
let filtro = null;

// criando os jogos do catálogo
function mostraJogos(jogo, card) {
  let div_col = document.createElement('div');
  div_col.classList.add('col-4')

  div_col.innerHTML = `
    <div id="card_efeito">
      <div class="card_instance">
        <a href="${jogo.link}" class="link">
          <div class="card_content text-center mb-0">
            <img class="game_image mt-3 mb-2 img-fluid" src="${jogo.img}" alt="rainbow-six">
            <h5>${jogo.nome}</h5>
            <p class="descricao">${jogo.descricao}</p>
          </div>
        </a>
      </div>

      <div class="card_avaliacao">
        <p class="text-warning estrela">
          &starf;&starf;&starf;&starf;&star;
        </p>
      </div>
    </div>
  `;

  card.appendChild(div_col);
}

function goToPage(link) {
  window.location = link;
}

const card = document.getElementById('card_row')

function aplicaFiltro(tag) {
  card.innerHTML = '';

  document.getElementById('em-alta').classList.remove('selected');
  document.getElementById('fps').classList.remove('selected');
  document.getElementById('moba').classList.remove('selected');
  document.getElementById('rpg').classList.remove('selected');
  document.getElementById('ritmo').classList.remove('selected');
  document.getElementById('terror').classList.remove('selected');
  document.getElementById('metroidvania').classList.remove('selected');

  document.getElementById(tag).classList.add('selected');

  jogos.forEach(jogo => {
    if(jogo.tag.includes(tag)) {
      mostraJogos(jogo, card);
    }
  })
}

jogos.forEach(jogo => {
  window.addEventListener('load', mostraJogos(jogo, card));
});