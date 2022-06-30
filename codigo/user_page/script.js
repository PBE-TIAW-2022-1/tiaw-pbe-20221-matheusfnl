const bio = document.getElementById('Bio')
const botao_bio = document.getElementById('Botao_bio')
const foto_perfil = document.getElementById("image")
const foto_perfil_preview = document.getElementById('image_preview')

let jogos_favoritos = []

window.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('image');
  const file = document.getElementById('input_foto');
  
  img.addEventListener('click', (e) => {
    e.preventDefault();
    file.click();
  })
  
  // for getting the file event
  file.addEventListener('change', (e) => {
    // do whatever you want
    let imagem = window.URL.createObjectURL(e.target.files[0])
    foto_perfil.style.backgroundImage = `url('${imagem}')`
    foto_perfil_preview.style.backgroundImage = `url('${imagem}')`
    salvarFoto(e.target.files[0]);
  });
})

function editBio() {
  if(botao_bio.textContent === 'Editar bio') {
    botao_bio.textContent="Confirmar"
    bio.classList.remove("editing");
    bio.removeAttribute("readonly")
  }
  else {
    botao_bio.textContent="Editar bio";
    bio.setAttribute("readonly",true)
    bio.classList.add("editing");
    usuarioCorrente.bio = bio.value;

    sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
    salvaNoLocalStorage();
  }
}

function getbiografia(){
  return usuarioCorrente.bio;
}

function initPage() {
  // Informa o nome do usuário logado
  document.getElementById('nomeUsuario').innerHTML = usuarioCorrente.nome;
  bio.value = usuarioCorrente.bio
  let imagem = usuarioCorrente.foto_perfil;

  if(usuarioCorrente.foto_perfil) {
    foto_perfil.style.backgroundImage = `url('${imagem}')`;
    foto_perfil_preview.style.backgroundImage = `url('${imagem}')`;
  }
  else {
    foto_perfil.style.backgroundImage =  `url('./imagens/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg')`;
    foto_perfil_preview.style.backgroundImage = `url('./imagens/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg')`;
  }

  jogos_favoritos.forEach(jogo => {
    const area_jogos_favorios = document.getElementById('area_jogos_favoritos')
    const card = document.createElement('div')
    card.classList.add('col-md-auto')
    card.classList.add('efeito')
    card.style.display = 'inline'

    card.innerHTML = `
      <div class="jogo_favorito_card text-center">
        <a href="../jogo_page/index.html?id=${jogo.id}" class="link">
          <div class="jogo_favorito_img" id="jogo_favorito_img-${jogo.id}"></div>
          <h4 class="mt-2">${jogo.name}</h4>
        </a>
      </div>
    `

    area_jogos_favorios.appendChild(card)

    let imagem = document.getElementById(`jogo_favorito_img-${jogo.id}`)
    imagem.style.backgroundImage = `url('${jogo.background_image}')`
  });
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

function salvarFoto(imagem) {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    usuarioCorrente.foto_perfil = reader.result;
    sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
    salvaNoLocalStorage();
  })

  reader.readAsDataURL(imagem)
}

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

function salvaJogo(data) {
  data = data.target.response
  data = JSON.parse(data)

  jogos_favoritos.push(data)
}

usuarioCorrente.jogos_favoritos.forEach(id => {
  getJogosData({id, getJogos: salvaJogo})
});

window.addEventListener('load', initPage);