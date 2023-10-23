export default class Notas {
  constructor() {
    this.DB_NAME = 'notas-db';
    this.STORE_NAME = 'notas';
  }

  async openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, 1);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = () => {
        const db = request.result;
        db.createObjectStore(this.STORE_NAME, { keyPath: 'usuario' });
      };
    });
  }

  async getNotas() {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.STORE_NAME, 'readonly');
    const store = transaction.objectStore(this.STORE_NAME);
    const usuario = localStorage.getItem('usuario-logado');
    if(!usuario) return [];
    const request = store.get(usuario);
    return new Promise((resolve, reject) => {
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const notas = request.result ? request.result.notas : [];
        resolve(notas);
      };
    });
  }

  async addNotas(nota) {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.STORE_NAME, 'readwrite');
    const store = transaction.objectStore(this.STORE_NAME);
    const usuario = localStorage.getItem('usuario-logado');
    const request = store.get(usuario);
    request.onerror = () => console.error(request.error);
    request.onsuccess = () => {
      const data = request.result || { usuario, notas: [] };
      data.notas.push(nota);
      const updateRequest = store.put(data);
      updateRequest.onerror = () => console.error(updateRequest.error);
      updateRequest.onsuccess = () => console.log('Nota adicionada com sucesso!');
    };
  }

  async removeNota(index) {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.STORE_NAME, 'readwrite');
    const store = transaction.objectStore(this.STORE_NAME);
    const usuario = localStorage.getItem('usuario-logado');
    const request = store.get(usuario);
    request.onerror = () => console.error("erro ao ", request.error);
    request.onsuccess = () => {
      const data = request.result;
      data.notas.splice(index, 1);
      const updateRequest = store.put(data);
      updateRequest.onerror = () => console.error(updateRequest.error);
      updateRequest.onsuccess = () => console.log('Nota removida com sucesso!');
    };
    this.renderizarNotas();
  }

  async renderizarNotas() {
    console.log('renderizar notas')
    const notas = await this.getNotas();
    const notasList = document.getElementById('notas-list');
    notasList.innerHTML = '';
    notas.forEach((nota, index) => {
      const notaItem = document.createElement('li');
      const buttonRemover = document.createElement('button');
      notaItem.innerHTML = `<span>${nota}</span>`;
      buttonRemover.innerHTML = 'Remover';
      buttonRemover.addEventListener('click', () => this.removeNota(index));
      notasList.appendChild(notaItem);
      notaItem.appendChild(buttonRemover);
    });
  }
}
