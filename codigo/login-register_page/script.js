function showLoginForm() {
  var elem = document.getElementById("forms");
  elem.parentNode.removeChild(elem);

  const formularioLogin = document.createElement('div');
  const formulario = document.getElementById('form');

  formularioLogin.innerHTML = `
    <form action="" method="post" id="forms">
      <div class="imgcontainer mt-0">
        <h1>Login</h1>
      </div>

      <div class="container">
        <label for="uname"><b>Usuário</b></label>
        <input type="text" placeholder="Usuário" name="uname" required>

        <label for="psw"><b>Senha</b></label>
        <input type="password" placeholder="Senha" name="psw" required>

        <button type="submit" id="buttonlogin">Login</button>
      </div>
    </form>
  `;

  formulario.appendChild(formularioLogin);
}

function showRegisterForm() {
  var elem = document.getElementById("forms");
  elem.parentNode.removeChild(elem);

  const formularioCadastro = document.createElement('div');
  const formulario = document.getElementById('form');

  formularioCadastro.innerHTML = `
    <form action="" method="post" id="forms">
      <div class="imgcontainer mt-0">
        <h1>Cadastrar</h1>
      </div>

      <div class="container">
        <label for="uname"><b>Usuário</b></label>
        <input type="text" placeholder="Usuário" name="uname" required>

        <label for="psw"><b>Senha</b></label>
        <input type="password" placeholder="Senha" name="psw" required>

        <label for="psw"><b>Confirmar Senha</b></label>
        <input type="password" placeholder="Confirmar Senha" name="psw" required>

        <button type="submit" id="buttonlogin">Cadastrar</button>
      </div>
    </form>
  `;

  formulario.appendChild(formularioCadastro);
}