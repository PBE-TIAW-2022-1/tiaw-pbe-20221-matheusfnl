const inputBox = document.getElementById('pesquisa');

function pesquisarJogos() {
  window.location = `../catalogo_page/index.html?search=${inputBox.value}`
}