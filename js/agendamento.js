const hamburguer = document.querySelector('.hamburguer');
const menu = document.querySelector('.menu');

hamburguer.addEventListener('click', () => {
  menu.classList.toggle('active');
});

const botaoVisitaNormal = document.querySelector('.button-visita-normal');
const avisoVisitaNormal = document.getElementById('aviso-visita-normal');
const fecharAviso = document.getElementById('fechar-aviso');

botaoVisitaNormal.addEventListener('click', (event) => {
  event.preventDefault();
  avisoVisitaNormal.style.display = 'block';
});

fecharAviso.addEventListener('click', () => {
  avisoVisitaNormal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === avisoVisitaNormal) {
    avisoVisitaNormal.style.display = 'none';
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const messageContainer = document.getElementById("message-container");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const escolaInput = document.getElementById("escola");
    const responsavelInput = document.getElementById("responsavel");
    const telefoneInput = document.getElementById("telefone-escola");
    const enderecoInput = document.getElementById("endereco");
    const horarioSelect = document.getElementById("horario");
    const quantidadeInput = document.getElementById("quantidade");
    const dataInput = document.getElementById("data");

    const selectedHorario = horarioSelect.value;

    messageContainer.innerHTML = "";

    if (
      escolaInput.value.trim() === "" ||
      responsavelInput.value.trim() === "" ||
      telefoneInput.value.trim() === "" ||
      enderecoInput.value.trim() === "" ||
      selectedHorario === "" ||
      quantidadeInput.value === "" ||
      dataInput.value === ""
    ) {
      messageContainer.textContent = "Por favor, preencha todos os campos.";
    } else if (isHorarioReservado(selectedHorario)) {
      messageContainer.textContent = "Esse horário já está reservado. Por favor, escolha outro horário.";
    } else if (!isDateValid(dataInput.value)) {
      messageContainer.textContent = "Selecione uma data a partir de hoje.";
    } else {
      const visitaData = {
        escola: escolaInput.value,
        responsavel: responsavelInput.value,
        telefone: telefoneInput.value,
        endereco: enderecoInput.value,
        horario: selectedHorario,
        quantidade: quantidadeInput.value,
        data: dataInput.value,
      };

      saveData(visitaData);
      clearFormFields();
      messageContainer.textContent = "Visita agendada com sucesso!";
    }
  });

  function isHorarioReservado(selectedHorario) {
    const data = getAllData();
    return data.some(item => item.horario === selectedHorario);
  }

  function isDateValid(selectedDate) {
    const today = new Date();
    const selected = new Date(selectedDate);
    return selected >= today;
  }

  function saveData(data) {
    const existingData = JSON.parse(localStorage.getItem("visitaData")) || [];
    existingData.push(data);
    localStorage.setItem("visitaData", JSON.stringify(existingData));
  }

  function getAllData() {
    const data = JSON.parse(localStorage.getItem("visitaData")) || [];
    return data;
  }

  function clearFormFields() {
    const form = document.querySelector("form");
    form.reset();
  }

  function updateData(index, newData) {
    const data = getAllData();
    data[index] = newData;
    localStorage.setItem("visitaData", JSON.stringify(data));
  }

  function deleteData(index) {
    const data = getAllData();
    data.splice(index, 1);
    localStorage.setItem("visitaData", JSON.stringify(data));
  }

});
