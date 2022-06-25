const inputBox = document.getElementById('pesquisa');

function pesquisarJogos() {
  getJogosData({getJogos, search: inputBox.value})

  while (card.firstChild) {
    card.removeChild(card.lastChild);
  }

  jogos.forEach(jogo => {
    console.log(jogo)
    mostraJogos(jogo, card)
  });
}