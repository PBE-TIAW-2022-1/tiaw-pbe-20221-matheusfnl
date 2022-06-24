const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// GET JOSOS
function getJogosData({id, genre_id = false, getJogos, search = false}) {
  let url;

  url = `https://api.rawg.io/api/games?key=15ce59a57be74a5faa1a5987fbbf1a4d`

  if(!genre_id && !search && id) {
    // Procura um jogo pelo ID
    url = `https://api.rawg.io/api/games/${id}?key=15ce59a57be74a5faa1a5987fbbf1a4d`;
  }
  else if(genre_id && !search){
    // Procura jogos pela categoria
    url = `https://api.rawg.io/api/games?key=15ce59a57be74a5faa1a5987fbbf1a4d&genres=${genre_id}`
  }
  else if(search) {
    // Pesquisa jogos
    url = `https://api.rawg.io/api/games?key=15ce59a57be74a5faa1a5987fbbf1a4d&search=${search}"`
  }

  let xhr = new XMLHttpRequest();
  xhr.onload = getJogos
  xhr.open('GET', url, false)
  xhr.send();
}

function preencheJogo(data) {
  data = data.target.response
  data = JSON.parse(data)

  preencheData(data)
}

function preencheData(jogo) {
  let desc = document.getElementById('descricao_jogo');
  text = jogo.description.replace(new RegExp("<br />", "g"), '<br /> <br />')
  desc.innerHTML = text

  let nome_jogo = document.getElementById('nome_jogo');

  if(nome_jogo.childNodes.length === 0) {
    var words = jogo.name.split(" ");
    for (var i = 0; i < words.length - 1; i++) {
        words[i] += " ";
    }

    words.forEach(palavra => {
      let primeira_letra = palavra.charAt(0);
  
      let span = document.createElement('span');
      nome_jogo.appendChild(span);
      span.classList.add('letra');
  
      span.innerHTML = primeira_letra;
  
      let resto_palavra = palavra.substring(1);
      resto_palavra = resto_palavra.replace(/`/g, "'")
      nome_jogo.innerHTML += resto_palavra + ' ';
    });
  }

  const imagem_jogo = document.getElementById('imagem_jogo');
  imagem_jogo.src = jogo.background_image

  const req_minimos = document.getElementById('req_minimos');
  const req_recomendados = document.getElementById('req_recomendados');


  // Converte string em coisa legal quando ela possui \n
  jogo.platforms.forEach(platform => {
    if(platform.platform.name == 'PC') {
      // ESPECIFICAÇÕES MÍNIMAS
      if(platform.requirements.minimum) {
        let reqm

        if(platform.requirements.minimum.includes('\n')) {
          reqm = platform.requirements.minimum.split('\n');
        }
        else {
          let newStr = getStringFormatada(platform.requirements.minimum);
          reqm = newStr.split('\n');
        }

        reqm.forEach(text => {

          if(text.includes('Minimum:') || text.includes('Minimum') || text.includes('Additional Notes:') || text.includes('Other requirements:') || text.includes('Partner Requirements:') || text.includes('Sound Card:')) {}
          else {
            let phrase = document.createElement('p');
            phrase.classList.add('mb-2');
            phrase.innerHTML = text;
            req_minimos.appendChild(phrase);
          }
        })
      }
      else {
        req_minimos.innerHTML = 'Sem informação...'
      }
      // ESPECIFICAÇÕES RECOMENDADAS
      if(platform.requirements.recommended) {
        let reqm

        if(platform.requirements.recommended.includes('\n')) {
          reqm = platform.requirements.recommended.split('\n');
        }
        else {
          let newStr = getStringFormatada(platform.requirements.recommended);
          reqm = newStr.split('\n');
        }

        reqm.forEach(text => {

          if(text.includes('Recommended:') || text.includes('Recommended') || text.includes('Additional Notes:') || text.includes('Other requirements:') || text.includes('Partner Requirements:') || text.includes('Sound Card:')) {}
          else {
            let phrase = document.createElement('p');
            phrase.classList.add('mb-2');
            phrase.innerHTML = text;
            req_recomendados.appendChild(phrase);
          }
        })
      }
      else {
        req_recomendados.innerHTML = 'Sem informação...'
      }
    }
  });
}

function replaceIndex(index, replacement, string) {
  if (index >= string.length) {
      return string.valueOf();
  }

  return string.substring(0, index) + replacement + string.substring(index + 1);
}

function getStringFormatada(string) {
  let nova_string = string; 
  if(nova_string.includes('OS:')) {
    let index = nova_string.indexOf('OS:') - 1;
    nova_string = replaceIndex(index, '\n', nova_string)
  }

  if(nova_string.includes('Processor:')) {
    let index = nova_string.indexOf('Processor:') - 1;
    nova_string = replaceIndex(index, '\n', nova_string)
  }

  if(nova_string.includes('RAMGraphics:')) {
    let index = nova_string.indexOf('RAMGraphics:') - 1;
    nova_string = replaceIndex(index, '\n', nova_string)
  }

  if(nova_string.includes('Storage:')) {
    let index = nova_string.indexOf('Storage:') - 1;
    nova_string = replaceIndex(index, '\n', nova_string)
  }

  if(nova_string.includes('Memory:')) {
    let index = nova_string.indexOf('Memory:') - 1;
    nova_string = replaceIndex(index, '\n', nova_string)
  }

  if(nova_string.includes('Memory:')) {
    let index = nova_string.indexOf('Memory:') - 1;
    nova_string = replaceIndex(index, '\n', nova_string)
  }

  if(nova_string.includes('Sound Card:')) {
    let index = nova_string.indexOf('Sound Card:') - 1;
    nova_string = replaceIndex(index, '\n', nova_string)
  }

  if(nova_string.includes('Additional Notes:')) {
    let index = nova_string.indexOf('Additional Notes:') - 1;
    nova_string = replaceIndex(index, '\n', nova_string)
  }

  if(nova_string.includes('Other requirements:')) {
    let index = nova_string.indexOf('Other requirements:') - 1;
    nova_string = replaceIndex(index, '\n', nova_string)
  }

  if(nova_string.includes('Partner Requirements:')) {
    let index = nova_string.indexOf('Partner Requirements:') - 1;
    nova_string = replaceIndex(index, '\n', nova_string)
  }

  return nova_string
}

getJogosData({id, getJogos: preencheJogo})