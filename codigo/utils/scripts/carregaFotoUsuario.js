const foto_perfil = document.getElementById("image_preview")
const usuarioCorrenteJSON2 = sessionStorage.getItem('usuarioCorrente');
let usuarioCorrente2 = {};

if (usuarioCorrenteJSON2) {
  usuarioCorrente2 = JSON.parse(usuarioCorrenteJSON2);
}

let imagem = usuarioCorrente2.foto_perfil;

if(usuarioCorrente2.foto_perfil) {
  foto_perfil.style.backgroundImage = `url('${imagem}')`;
}
else {
  foto_perfil.style.backgroundImage =  `url('../utils/imagens/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg')`;
}