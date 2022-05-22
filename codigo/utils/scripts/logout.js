function logoutUser () {
  usuarioCorrente = {};
  sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));
  window.location = '../home_page/index.html';
}