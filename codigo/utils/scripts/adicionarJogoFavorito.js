const usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
let usuarioCorrente = {};

if (usuarioCorrenteJSON) {
  usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
}
const star = document.getElementById('jogo_favorito')

if (usuarioCorrente.jogos_favoritos.includes(id)) {
  star.style.color = "orange";
}

function adicionarFavorito() {
  if(!usuarioCorrente.jogos_favoritos.includes(id)) {
    usuarioCorrente.jogos_favoritos.push(id)
    star.style.color = "orange";
  }
  else
  {
    usuarioCorrente.jogos_favoritos.splice(usuarioCorrente.jogos_favoritos.indexOf(id), 1);
    star.style.color = "white";
  }

  sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
}