// CRIAR COMENTARIO
let comentarioLocalStorage = [];

const getComentario = () => {
  if(JSON.parse(localStorage.getItem('comentarios')) === null) {
    return [];
  }

  return JSON.parse(localStorage.getItem('comentarios'));
}

const setComentario = (comentario) => {
  localStorage.setItem('comentarios', JSON.stringify(comentario));
}

const criaComentario = (nome, comentario, jogo, id) => {
  const caixaComentario = document.createElement('div');
  const nomePrimeiraLetra = nome.charAt(0)
  const nomeResto = nome.substring(1)

  caixaComentario.classList.add('col-6');
  caixaComentario.classList.add('instancia_comentarios');

  caixaComentario.innerHTML = `
    <div class="area_comentarios">
      <div class="comentarios">
        <div class="row">
          <div class="col-9">
            <h4> <span class="letra">${nomePrimeiraLetra}</span>${nomeResto} </h4>
          </div>

          <div class="col-1">
          <a onclick="editComentario(${id})" class="icon"> <img id="${id}_img" src="../utils/imagens/edit-icon.png" /> </a>
          </div>

          <div class="col-2">
            <a onclick="removeComentario('${jogo}', ${id})" class="icon"> <img src="../utils/imagens/deletar-icon.png" /> </a>
          </div>
        <div>
        <p id="${id}" class="coment_desc"> ${comentario} </p>
      </div>
    </div>
    `;
  document.getElementById('lista_comentarios').appendChild(caixaComentario);
}

const limparComentarios = () => {
  const comenatrios = document.getElementById('lista_comentarios');

  while(comenatrios.firstChild) { comenatrios.removeChild(comenatrios.lastChild) }
}

const atualizarTela = (jogo) => {
  let jogo_info = sessionStorage.getItem('jogo_page_info')
  const descricao_jogo = document.getElementById('descricao_jogo');
  const imagem_jogo = document.getElementById('imagem_jogo');
  const so_jogo_minimos = document.getElementById('so_jogo_minimos');
  const processador_jogo_minimos = document.getElementById('processador_jogo_minimos');
  const memoria_jogo_minimos = document.getElementById('memoria_jogo_minimos');
  const placavideo_jogo_minimos = document.getElementById('placavideo_jogo_minimos');
  const rede_jogo_minimos = document.getElementById('rede_jogo_minimos');
  const armazenamento_jogo_minimos = document.getElementById('armazenamento_jogo_minimos');

  const so_jogo_recomendados = document.getElementById('so_jogo_recomendados');
  const processador_jogo_recomendados = document.getElementById('processador_jogo_recomendados');
  const memoria_jogo_recomendados = document.getElementById('memoria_jogo_recomendados');
  const placavideo_jogo_recomendados = document.getElementById('placavideo_jogo_recomendados');
  const rede_jogo_recomendados = document.getElementById('rede_jogo_recomendados');
  const armazenamento_jogo_recomendados = document.getElementById('armazenamento_jogo_recomendados');

  const nome_jogo = document.getElementById('nome_jogo');

  jogo_info = JSON.parse(jogo_info)

  descricao_jogo.innerHTML = jogo_info.descricao;
  imagem_jogo.src = jogo_info.img
  so_jogo_minimos.innerHTML = jogo_info.req_minimos.so;

  processador_jogo_minimos.innerHTML = jogo_info.req_minimos.processador;
  memoria_jogo_minimos.innerHTML = jogo_info.req_minimos.memoria;
  placavideo_jogo_minimos.innerHTML = jogo_info.req_minimos.video;
  rede_jogo_minimos.innerHTML = jogo_info.req_minimos.rede;
  armazenamento_jogo_minimos.innerHTML = jogo_info.req_minimos.armazenamento;

  so_jogo_recomendados.innerHTML = jogo_info.req_recomendados.so
  processador_jogo_recomendados.innerHTML = jogo_info.req_recomendados.processador;
  memoria_jogo_recomendados.innerHTML = jogo_info.req_recomendados.memoria;
  placavideo_jogo_recomendados.innerHTML = jogo_info.req_recomendados.video;
  rede_jogo_recomendados.innerHTML = jogo_info.req_recomendados.rede;
  armazenamento_jogo_recomendados.innerHTML = jogo_info.req_recomendados.armazenamento;

  var words = jogo_info.nome.split(" ");
  for (var i = 0; i < words.length - 1; i++) {
      words[i] += " ";
  }

  words.forEach(palavra => {
    console.log(palavra)
    let primeira_letra = palavra.charAt(0);

    let span = document.createElement('span');
    nome_jogo.appendChild(span);
    span.classList.add('letra');

    span.innerHTML = primeira_letra;

    let resto_palavra = palavra.substring(1);
    resto_palavra = resto_palavra.replace(/`/g, "'")
    nome_jogo.innerHTML += resto_palavra + ' ';
  });

  limparComentarios();
  const comentario = getComentario();
  comentario.forEach((item) => {
    if(item.tela === jogo) {
      criaComentario(item.nome, item.comentario, jogo, comentario.indexOf(item));
    }
  });
}

const carregarComentarios = () => {
  let jogo_info = sessionStorage.getItem('jogo_page_info')
  jogo_info = JSON.parse(jogo_info)

  console.log(jogo_info.comentario)

  atualizarTela(jogo_info.comentario);
}

const inserirComentario = () => {
  let jogo_info = sessionStorage.getItem('jogo_page_info')
  jogo_info = JSON.parse(jogo_info)

  const instanceNome = document.getElementById('nomeInput');
  const instanceComentario = document.getElementById('comentarioInput');

  const comentariosLocalStorage = getComentario();

  const comentario = {
    nome: instanceNome.value,
    comentario: instanceComentario.value,
    tela: jogo_info.comentario,
  }

  instanceNome.value = '';
  instanceComentario.value = '';

  comentariosLocalStorage.push(comentario);

  setComentario(comentariosLocalStorage);
  atualizarTela(jogo_info.comentario);
}

const removeComentario = (jogo, id) => {
  const comentariosLocalStorage = getComentario();

  comentariosLocalStorage.splice(id, 1);

  setComentario(comentariosLocalStorage);

  atualizarTela(jogo);
}

let editing = false;

const editComentario = (id) => {
  editing = !editing;
  const comentario = document.getElementById(id)
  const imagem = document.getElementById(id + '_img')

  if(editing) {
    comentario.contentEditable = true;
    imagem.src = "../utils/imagens/confirm-icon.png"
    comentario.focus();
  }
  else {
    comentario.contentEditable = false;
    imagem.src = "../utils/imagens/edit-icon.png"

    const comentariosLocalStorage = getComentario();

    comentariosLocalStorage[id].comentario = comentario.textContent;
    console.log(comentariosLocalStorage[id]);

    setComentario(comentariosLocalStorage);
  }
}
