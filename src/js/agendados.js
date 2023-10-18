'use strict';

const openModal = () => document.getElementById('modal').classList.add('active');

const closeModal = () => {
  clearFields();
  document.getElementById('modal').classList.remove('active');
};

const getLocalStorage = () => JSON.parse(localStorage.getItem('visitaData')) || [];

const setLocalStorage = (visitaData) => localStorage.setItem('visitaData', JSON.stringify(visitaData));

const deleteAgendamento = (index) => {
  const visitaData = readAgendamento();
  visitaData.splice(index, 1);
  setLocalStorage(visitaData);
  updateTable();
};

const readAgendamento = () => getLocalStorage();

const clearFields = () => {
  const fields = document.querySelectorAll('.modal-field');
  fields.forEach(field => field.value = '');
  document.getElementById('escola').dataset.index = 'new';
  document.querySelector('.modal-header > h2').textContent = 'Novo Agendamento';
};

const saveAgendamento = () => {
  if (isValidFields()) {
    const agendamento = {
      escola: document.getElementById('escola').value,
      responsavel: document.getElementById('responsavel').value,
      telefone: document.getElementById('telefone-escola').value,
      endereco: document.getElementById('endereco').value,
      data: document.getElementById('data').value,
      horario: document.getElementById('horario').value,
      quantidade: document.getElementById('quantidade').value
    };
    const index = document.getElementById('escola').dataset.index;
    if (index == 'new') {
      createAgendamento(agendamento);
      closeModal();
    } else {
      updateAgendamento(index, agendamento);
      closeModal();
    }
  }
};

const createRow = (agendamento, index) => {
  if (agendamento) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${agendamento.escola}</td>
      <td>${agendamento.responsavel}</td>
      <td>${agendamento.telefone}</td>
      <td>${agendamento.endereco}</td>
      <td>${agendamento.data}</td>
      <td>${agendamento.horario}</td>
      <td>${agendamento.quantidade}</td>
      <td>
        <button type="button" class="button green" id="edit-${index}">Editar</button>
        <button type="button" class="button red" id="delete-${index}">Excluir</button>
      </td>
    `;
    document.querySelector('#tableAgendamento > tbody').appendChild(newRow);
  }
};

const clearTable = () => {
  const rows = document.querySelectorAll('#tableAgendamento > tbody tr');
  rows.forEach(row => row.parentNode.removeChild(row));
};

const updateTable = () => {
  clearTable();
  const visitaData = readAgendamento();

  const filteredVisitaData = visitaData.filter(agendamento => agendamento !== undefined);

  filteredVisitaData.forEach(createRow);
};

const fillFields = (agendamento) => {
  document.getElementById('escola').value = agendamento.escola;
  document.getElementById('responsavel').value = agendamento.responsavel;
  document.getElementById('telefone-escola').value = agendamento.telefone;
  document.getElementById('endereco').value = agendamento.endereco;
  document.getElementById('data').value = agendamento.data;
  document.getElementById('horario').value = agendamento.horario;
  document.getElementById('quantidade').value = agendamento.quantidade;
  document.getElementById('escola').dataset.index = agendamento.index;
  document.querySelector('.modal-header > h2').textContent = `Editando ${agendamento.escola}`;
};

const editAgendamento = (index) => {
  const agendamento = readAgendamento()[index];
  if (agendamento) {
    agendamento.index = index;
    fillFields(agendamento);
    openModal();
  }
};

const editDelete = (event) => {
  if (event.target.type == 'button') {
    const [action, index] = event.target.id.split('-');

    if (action == 'edit') {
      editAgendamento(index);
    } else {
      const agendamento = readAgendamento()[index];
      if (agendamento) {
        const response = confirm(`Deseja realmente excluir o agendamento para ${agendamento.escola}?`);
        if (response) {
          deleteAgendamento(index);
        }
      }
    }
  }
};

updateTable();

document.getElementById('cadastrarCliente').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('salvar').addEventListener('click', saveAgendamento);

document.querySelector('#tableAgendamento > tbody').addEventListener('click', editDelete);

document.getElementById('cancelar').addEventListener('click', closeModal);
