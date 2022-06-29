const foto_perfil = document.getElementById("image_preview")

let imagem = usuarioCorrente.foto_perfil;

if(usuarioCorrente.foto_perfil) {
  foto_perfil.style.backgroundImage = `url('${imagem}')`;
}
else {
  foto_perfil.style.backgroundImage =  `url('./imagens/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg')`;
}