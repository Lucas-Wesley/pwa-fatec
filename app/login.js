export function login(usuario) {
  localStorage.setItem('usuario-logado', usuario);
}

export function showUsuario() {
  const usuario = localStorage.getItem('usuario-logado');
  const infoUsuario = document.getElementById('info-usuario');
  document.getElementById('usuario-nome').innerHTML = usuario;
  if(usuario) {
    infoUsuario.classList.remove('hidden');
    infoUsuario.classList.add('is-flex');
  } else {
    infoUsuario.classList.remove('is-flex');
    infoUsuario.classList.add('hidden');
  }
}