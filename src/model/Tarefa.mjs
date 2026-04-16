export class Tarefa {
  constructor({ id = null, descricao = '', concluida = false } = {}) {
    this.id = id != null ? id : Tarefa.gerarId();
    this.descricao = String(descricao || '').trim();
    this.concluida = Boolean(concluida);
  }

  static gerarId() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  static criar(descricao) {
    return new Tarefa({
      descricao,
      concluida: false,
    });
  }

  static fromObject(data) {
    return new Tarefa({
      id: data.id != null ? data.id : null,
      descricao: data.descricao || '',
      concluida: Boolean(data.concluida),
    });
  }
}
