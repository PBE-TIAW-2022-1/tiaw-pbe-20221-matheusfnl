const usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
let usuarioCorrente = {};

if (usuarioCorrenteJSON) {
  usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
}
const star = document.getElementById('jogo_favorito')

if (usuarioCorrente.jogos_favoritos.includes(id)) {
  star.style.color = "orange";
}

function salvaNoLocalStorage() {
  let usersJSON = localStorage.getItem('db_usuarios');
  let users = JSON.parse(usersJSON)

  users.usuarios.forEach((usuario, index) => {
    if(usuario.id === usuarioCorrente.id) {
      return users.usuarios[index] = usuarioCorrente;
    }
  });

  localStorage.setItem('db_usuarios', JSON.stringify(users))
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
  salvaNoLocalStorage();
}