//definindo o filtro do catálogo
let filtro = null;

// criando os jogos do catálogo
function mostraJogos(jogo, card) {
  let div_col = document.createElement('div');
  div_col.classList.add('col-3')

  div_col.innerHTML = `
    <div id="card">
      <a href="${jogo.link}" class="link">
        <div class="card_content text-center">
          <img class="game_image mt-3 mb-2 img-fluid" src="${jogo.img}" alt="rainbow-six">
          <h3>${jogo.nome}</h3>
          <p class="descricao">${jogo.descricao}</p>
          <p class="text-warning estrela">
            &starf;&starf;&starf;&starf;&star;
        </div>
      </a>
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

  jogos.forEach(jogo => {
    if(jogo.tag.includes(tag)) {
      mostraJogos(jogo, card);
    }
  })
}

jogos.forEach(jogo => {
  window.addEventListener('load', mostraJogos(jogo, card));
});