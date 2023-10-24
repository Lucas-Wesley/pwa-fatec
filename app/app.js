import Notas from './notas.js';
import { login, showUsuario } from './login.js';

const formLogin = document.getElementById('form-login');
const formNota = document.getElementById('form-nota');
const buttonLogout = document.getElementById('logout');

const notas = new Notas();

formLogin.addEventListener('submit', (event) => {
  event.preventDefault();
  const usuario = document.getElementById('usuario-input').value.toLowerCase();
  login(usuario);
  showNotas();
  notas.renderizarNotas();
  showUsuario();
  document.getElementById('usuario-input').value = '';
});

formNota.addEventListener('submit', (event) => {
  event.preventDefault();
  const nota = document.getElementById('note-content');
  notas.addNotas(nota.value);
  notas.renderizarNotas();
  document.getElementById('note-content').value = '';
});

buttonLogout.addEventListener('click', () => {
  localStorage.removeItem('usuario-logado');
  document.getElementById('login-container').classList.remove('hidden');
  document.getElementById('notas-container').classList.add('hidden');
  notas.renderizarNotas();
  showUsuario();
});

function showNotas() {
  document.getElementById('login-container').classList.add('hidden');
  document.getElementById('notas-container').classList.remove('hidden');
}

(() => {
  const usuario = localStorage.getItem('usuario-logado');
  showUsuario();

  if (usuario) {
    showNotas();
    notas.renderizarNotas();
  }

  // Instalar o Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((registration) => {
          console.log('Service Worker registrado com sucesso!', registration);
        })
        .catch((error) => {
          console.log('Service Worker falhou!', error);
        });
    });
  }
})()