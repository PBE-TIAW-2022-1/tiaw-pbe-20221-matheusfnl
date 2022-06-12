//definindo o filtro do catálogo
let filtro = null;

// criando os jogos do catálogo
function mostraJogos(jogo, card) {
  let div_col = document.createElement('div');
  div_col.classList.add('col-4')

  div_col.innerHTML = `
    <div id="card_efeito" class="cursor_ponteiro">
      <a onclick="goToPage('${jogo.link}')" class="link">
        <div class="card_instance">
          <div class="card_content text-center mb-0">
            <img class="game_image mt-3 mb-2 img-fluid" src="${jogo.img}" alt="rainbow-six">
            <h5>${jogo.nome}</h5>
            <p class="descricao">${jogo.descricao}</p>
          </div>
        </div>
          
        <div class="card_avaliacao">
          <p class="text-warning estrela">
          &starf;&starf;&starf;&starf;&star;
          </p>
        </div>
      </a>
    </div>
  `;

  card.appendChild(div_col);
}

let jogo_page_info = {}

function goToPage(link) {
  jogos.forEach(jogo => {
    if(jogo.link === link) {
      jogo_page_info = {}

      jogo_page_info = {
        nome: jogo.nome,
        avaliacao: jogo.avaliacao,
        descricao: jogo.page.descricao,
        req_minimos: jogo.page.req_minimos,
        req_recomendados: jogo.page.req_recomendados,
        img: jogo.page.img,
        comentario: jogo.comentario,
      }

      sessionStorage.setItem("jogo_page_info", JSON.stringify(jogo_page_info));
    }
  })

  window.location = '../jogo_page/index.html';
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