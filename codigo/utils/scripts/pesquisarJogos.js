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

pesquisa.addEventListener('keydown', () => {
  pesquisarJogos()
})

function pesquisarJogos() {
  clearTimeout(timeout);

  const inputBox = document.getElementById('pesquisa');
  const previewJogos = document.getElementById('previewJogos');

  let jogos_exibidos = 0;

  while(previewJogos.firstChild) { previewJogos.removeChild(previewJogos.lastChild) }

  timeout = setTimeout(() => {
    if(inputBox.value.replace(/\s/g, '').length) {
      jogos.forEach(jogo => {
        if(jogo.nome.toLowerCase().charAt(0) === inputBox.value.toLowerCase().charAt(0) && jogo.nome.toLowerCase().includes(inputBox.value.toLowerCase()) && jogos_exibidos < 4 && jogo.nome.toLowerCase().split(' ')[0].includes(inputBox.value.toLowerCase().split(' ')[0])) {
          const colDiv = document.createElement('div');
          colDiv.classList.add('col-12')
          colDiv.classList.add('pointer')
          colDiv.classList.add('zindex1000')

          colDiv.innerHTML = `
            <div class="cardPreview" onclick="goToPage('${jogo.link}')">
              <img class="imgPreview" src="${jogo.img}">
              <h6 class="nomePreview">${jogo.nome}</h6>
            </div>
          `;
          previewJogos.appendChild(colDiv)
          jogos_exibidos++
        }
      });

      jogos.forEach(jogo => {
        if(!(jogo.nome.toLowerCase().charAt(0) === inputBox.value.toLowerCase().charAt(0) && jogo.nome.toLowerCase().includes(inputBox.value.toLowerCase()) && jogo.nome.toLowerCase().split(' ')[0].includes(inputBox.value.toLowerCase().split(' ')[0]))) {
          if(jogo.nome.toLowerCase().includes(inputBox.value.toLowerCase()) && jogos_exibidos < 4) {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col-12')
            colDiv.classList.add('pointer')
            colDiv.classList.add('zindex1000')

            colDiv.innerHTML = `
              <div class="cardPreview" onclick="goToPage('${jogo.link}')">
                <img class="imgPreview" src="${jogo.img}">
                <h6 class="nomePreview">${jogo.nome}</h6>
              </div>
            `;
            previewJogos.appendChild(colDiv)
            jogos_exibidos++
          }
        }
      })
    }
  }, 450);
}


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

function removerJogos() {
  timeout = setInterval(() => {
    const previewJogos = document.getElementById('previewJogos');
  
    while(previewJogos.firstChild) { previewJogos.removeChild(previewJogos.lastChild) }
  }, 150);
}