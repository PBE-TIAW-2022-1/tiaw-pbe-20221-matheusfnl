function logoutUser () {
  usuarioCorrente = {};
  sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));
  window.location = '../index.html';
}