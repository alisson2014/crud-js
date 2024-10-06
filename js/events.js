import { createClient, updateClient, deleteClient } from './client.js';
import { updateTable, fillFields, clearFields } from './ui.js';
import { getLocalStorage } from './storage.js';

const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};

const saveClient = () => {
  if(!isValidFields()) {
    return alert("Preencha todos os campos corretamente!");
  }
  
  const client = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    tel: document.getElementById("tel").value,
    birthDate: document.getElementById("birthDate").value
  };

  const index = document.getElementById("name").dataset.index;
  if (index === "new") {
    createClient(client);
    updateTable();
    clearFields();
  } else {
    updateClient(index, client);
    updateTable();
    clearFields();
    document.getElementById("name").setAttribute("data-index", "new");
  }
};

const editClient = index => {
  const client = getLocalStorage()[index];
  client.index = index;
  fillFields(client);
};

const editDelete = event => {
  const isButton = event.target.type === "button";

  if (isButton) {
    const [action, index] = event.target.id.split("-");
    if (action === "edit") {
      editClient(index);
    } else {
      const client = getLocalStorage()[index];
      const response = confirm(
        `Você deseja realmente excluir o(a) cliente ${client.name}?`
      );
      if (response) {
        deleteClient(index);
        updateTable();
      }
    }
  }
};

const initEvents = () => {
  const form = document.querySelector("form#form");
  const btnCancel = document.querySelector("button#cancel");

  form.addEventListener("submit", saveClient);
  btnCancel.addEventListener("click", clearFields);
  document.querySelector("#tableClient>tbody").addEventListener("click", editDelete);

  document.getElementById('search').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const clients = getLocalStorage();

    clients.forEach(client => {
      const clientName = client.name.toLowerCase();
      const clientRow = document.getElementById(`client-${client.id}`);
      
      if (clientName.includes(searchValue)) {
        clientRow.style.display = '';
      } else {
        clientRow.style.display = 'none';
      }
    });
  });

  document.addEventListener('keydown', function(e) {
    if(e.key !== 'F6') return;
    
    e.preventDefault();
    const button = document.getElementById('newClientButton');
    button.click();
  });

    const modal = document.getElementById('exampleModal');
    modal.addEventListener('hidden.bs.modal', clearFields);
};

export { initEvents };