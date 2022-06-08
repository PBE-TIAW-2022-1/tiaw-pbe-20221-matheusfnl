let jogos = [
  rainbow_six = {
    nome: 'Tom Clancy`s Rainbow Six Siege',
    descricao: " ",
    avaliacao: './jogos/stay_close/stay_close_rate.png',
    img: '../jogo_page/imagens/rb6.png',
    tag: ['fps', 'em-alta'],
    link: '../jogo_page/rb6.html',
  },
  fall_guys = {
    nome: 'Fall Guys: Ultimate Knockout',
    descricao: " ",
    avaliacao: './jogos/stay_close/stay_close_rate.png',
    img: '../jogo_page/imagens/fallguys.jpg',
    tag: ['em-alta'],
    link: '../jogo_page/fallguys.html',
  },
  fortnite = {
    nome: 'Fortnite',
    descricao: " ",
    avaliacao: './jogos/stay_close/stay_close_rate.png',
    img: '../jogo_page/imagens/fortnite.jpg',
    tag: ['fps', 'em-alta'],
    link: '../jogo_page/fortnite.html',
  },
  elden_ring = {
    nome: 'Elden Ring',
    descricao: " ",
    avaliacao: './jogos/stay_close/stay_close_rate.png',
    img: '../jogo_page/imagens/eldenring.jpg',
    tag: ['em-alta', 'rpg'],
    link: '../jogo_page/eldenring.html',
  },
  osu = {
    nome: 'Osu!',
    descricao: " ",
    avaliacao: './jogos/stay_close/stay_close_rate.png',
    img: '../jogo_page/imagens/osu.jpeg',
    tag: ['ritmo', 'em-alta'],
    link: '../jogo_page/osu.html',
  },
  csgo = {
    nome: 'Counter-Strike: Global Offensive',
    descricao: " ",
    avaliacao: './jogos/stay_close/stay_close_rate.png',
    img: '../utils/imagens/csgo.jpg',
    tag: ['fps'],
    link: '../jogo_page/csgo.html',
  },
  csgo = {
    nome: 'Valorant',
    descricao: " ",
    avaliacao: './jogos/stay_close/stay_close_rate.png',
    img: '../utils/imagens/valorant.jpeg',
    tag: ['fps'],
    link: '../jogo_page/valorant.html',
  },
  cod_2 = {
    nome: 'Call of Duty: Black Ops II',
    descricao: " ",
    avaliacao: './jogos/stay_close/stay_close_rate.png',
    img: '../utils/imagens/cod.jpg',
    tag: ['fps'],
    link: '../jogo_page/cod.html',
  },
  halo_infinite = {
    nome: 'Halo Infinite',
    descricao: " ",
    avaliacao: './jogos/stay_close/stay_close_rate.png',
    img: '../utils/imagens/halo.jpg',
    tag: ['fps'],
    link: '../jogo_page/halo.html',
  },
  geometry_dash = {
    nome: 'Geometry Dash',
    descricao: " ",
    avaliacao: './jogos/stay_close/stay_close_rate.png',
    img: '../utils/imagens/geometry.jpg',
    tag: ['ritmo'],
    link: '../jogo_page/geometry.html',
  },
  muse_dash = {
    nome: 'Muse Dash',
    descricao: " ",
    avaliacao: './jogos/stay_close/stay_close_rate.png',
    img: '../utils/imagens/muse.jpg',
    tag: ['ritmo'],
    link: '../jogo_page/muse.html',
  },
  friday_night_funkin = {
    nome: 'Friday Night Funkin',
    descricao: " ",
    avaliacao: './jogos/stay_close/stay_close_rate.png',
    img: '../utils/imagens/friday.jpg',
    tag: ['ritmo'],
    link: '../jogo_page/friday.html',
  },
  friday_night_funkin = {
    nome: 'Crypt of the NecroDancer',
    descricao: " ",
    avaliacao: './jogos/stay_close/stay_close_rate.png',
    img: '../utils/imagens/crypt.jpg',
    tag: ['ritmo'],
    link: '../jogo_page/crypt.html',
  },
  metal_gear_solid_v = {
    nome: 'Metal Gear Solid V: The Phantom Pain',
    descricao: " ",
    avaliacao: './jogos/stay_close/stay_close_rate.png',
    img: '../utils/imagens/metalgear.jpg',
    tag: ['rpg'],
    link: '../jogo_page/metal-gear.html',
  },
  rdr2 = {
    nome: 'Red Dead Redemption 2',
    descricao: " ",
    avaliacao: './jogos/stay_close/stay_close_rate.png',
    img: '../utils/imagens/rdr2.png',
    tag: ['rpg'],
    link: '../jogo_page/rdr2.html',
  },
  horizon_zero_down = {
    nome: 'Horizon Zero Dawn',
    descricao: " ",
    avaliacao: './jogos/stay_close/stay_close_rate.png',
    img: '../utils/imagens/horizon.jpg',
    tag: ['rpg'],
    link: '../jogo_page/horizon.html',
  },
]

const pesquisa = document.getElementById('pesquisa');
let timeout;

pesquisa.onkeydown = (event) => {
  const inputBox = document.getElementById('pesquisa');

  var key = event.keyCode || event.charCode;
  if( key == 8 && inputBox.value.length === 1 ){
    const previewJogos = document.getElementById('previewJogos');

    while(previewJogos.firstChild) { previewJogos.removeChild(previewJogos.lastChild) }
  }
}

pesquisa.addEventListener('keypress', () => {
  pesquisarJogos()
})

function pesquisarJogos() {
  clearTimeout(timeout);

  const inputBox = document.getElementById('pesquisa');
  const previewJogos = document.getElementById('previewJogos');

  while(previewJogos.firstChild) { previewJogos.removeChild(previewJogos.lastChild) }

  timeout = setTimeout(() => {
    if(inputBox.value.replace(/\s/g, '').length) {
      jogos.forEach(jogo => {
        if(jogo.nome.toLowerCase().includes(inputBox.value.toLowerCase())) {
          const colDiv = document.createElement('div');
          colDiv.classList.add('col-12')
          colDiv.classList.add('pointer')
          colDiv.classList.add('zindex1000')
  
          colDiv.innerHTML = `
            <div class="cardPreview" onclick="goToPage('${jogo.link}')">
              <img class="imgPreview" src="${jogo.img}">
              <h5 class="nomePreview">${jogo.nome}</h5>
            </div>
          `;
          previewJogos.appendChild(colDiv)
        }
      });
    }
  }, 450);
}

function goToPage(link) {
  window.location = link;
}

function removerJogos() {
  timeout = setInterval(() => {
    const previewJogos = document.getElementById('previewJogos');
  
    while(previewJogos.firstChild) { previewJogos.removeChild(previewJogos.lastChild) }
  }, 150);
}