import { TarefaController } from './src/controller/TarefaController.mjs';

const taskForm = document.getElementById('task-form');
const descricaoInput = document.getElementById('descricao');
const submitButton = document.getElementById('submit-button');
const clearButton = document.getElementById('clear-button');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');

const tarefaController = new TarefaController();
let editingId = null;

function atualizarLista() {
  const tarefas = tarefaController.listarTarefas();
  taskList.innerHTML = tarefas.map(criarLinha).join('');
  taskCount.textContent = `${tarefas.length} ${tarefas.length === 1 ? 'tarefa' : 'tarefas'}`;
}

function criarLinha(tarefa) {
  return `
    <tr data-id="${tarefa.id}">
      <td>${tarefa.descricao}</td>
      <td>${tarefa.concluida ? 'Sim' : 'Não'}</td>
      <td>
        <button type="button" data-action="edit">Editar</button>
        <button type="button" data-action="toggle">${tarefa.concluida ? 'Reabrir' : 'Concluir'}</button>
        <button type="button" data-action="delete">Excluir</button>
      </td>
    </tr>
  `;
}

function limparFormulario() {
  taskForm.reset();
  editingId = null;
  submitButton.textContent = 'Adicionar tarefa';
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const descricao = descricaoInput.value.trim();
  if (!descricao) {
    alert('Digite a descrição da tarefa antes de salvar.');
    return;
  }

  if (editingId) {
    tarefaController.atualizarTarefa(editingId, { descricao });
  } else {
    tarefaController.adicionarTarefa(descricao);
  }

  limparFormulario();
  atualizarLista();
});

clearButton.addEventListener('click', () => {
  limparFormulario();
});

taskList.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) {
    return;
  }

  const action = button.dataset.action;
  const row = button.closest('tr');
  const id = row?.dataset.id;
  if (!action || !id) {
    return;
  }

  if (action === 'edit') {
    const tarefa = tarefaController.listarTarefas().find((item) => item.id === id);
    if (!tarefa) {
      return;
    }

    descricaoInput.value = tarefa.descricao;
    editingId = tarefa.id;
    submitButton.textContent = 'Atualizar tarefa';
    descricaoInput.focus();
    return;
  }

  if (action === 'toggle') {
    tarefaController.alternarConclusao(id);
    atualizarLista();
    return;
  }

  if (action === 'delete') {
    const confirmed = window.confirm('Tem certeza que deseja excluir esta tarefa?');
    if (!confirmed) {
      return;
    }

    tarefaController.removerTarefa(id);
    atualizarLista();
    if (editingId === id) {
      limparFormulario();
    }
  }
});

atualizarLista();
