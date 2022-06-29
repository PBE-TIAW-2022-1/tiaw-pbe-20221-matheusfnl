const bio = document.getElementById('Bio')
const botao_bio = document.getElementById('Botao_bio')
const foto_perfil = document.getElementById("image")
const foto_perfil_preview = document.getElementById('image_preview')

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

window.addEventListener('load', initPage);