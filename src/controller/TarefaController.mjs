import { Tarefa } from '../model/Tarefa.mjs';
import { TarefaService } from '../service/TarefaService.mjs';

export class TarefaController {
  constructor(tarefaService = new TarefaService('tarefas-todo')) {
    this.tarefaService = tarefaService;
    this.tarefas = this.tarefaService.buscarTodas().map((item) => Tarefa.fromObject(item));
  }

  _persistir() {
    this.tarefaService.salvarTodas(this.tarefas);
  }

  listarTarefas() {
    return [...this.tarefas];
  }

  adicionarTarefa(descricao) {
    const tarefa = Tarefa.criar(descricao);
    this.tarefas.push(tarefa);
    this._persistir();
    return tarefa;
  }

  atualizarTarefa(id, novosDados) {
    const tarefa = this.tarefas.find((item) => item.id === id);
    if (!tarefa) {
      return null;
    }

    if (typeof novosDados.descricao === 'string') {
      tarefa.descricao = novosDados.descricao;
    }

    if (typeof novosDados.concluida === 'boolean') {
      tarefa.concluida = novosDados.concluida;
    }

    this._persistir();
    return tarefa;
  }

  removerTarefa(id) {
    const originalLength = this.tarefas.length;
    this.tarefas = this.tarefas.filter((item) => item.id !== id);
    const removed = this.tarefas.length !== originalLength;
    if (removed) {
      this._persistir();
    }
    return removed;
  }

  alternarConclusao(id) {
    const tarefa = this.tarefas.find((item) => item.id === id);
    if (!tarefa) {
      return null;
    }

    tarefa.concluida = !tarefa.concluida;
    this._persistir();
    return tarefa;
  }
}
