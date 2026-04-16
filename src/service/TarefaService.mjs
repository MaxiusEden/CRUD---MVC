export class TarefaService {
  constructor(storageKey = 'tarefas') {
    this.storageKey = storageKey;
  }

  salvarTodas(tarefas) {
    const payload = JSON.stringify(tarefas);
    window.localStorage.setItem(this.storageKey, payload);
  }

  buscarTodas() {
    const raw = window.localStorage.getItem(this.storageKey);
    if (!raw) {
      return [];
    }

    try {
      const items = JSON.parse(raw);
      return Array.isArray(items) ? items : [];
    } catch (error) {
      console.error('Erro ao ler tarefas do localStorage:', error);
      return [];
    }
  }
}
