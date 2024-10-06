import { getLocalStorage } from './storage.js';

const createRow = (client, index) => {
  const newRow = document.createElement("tr");
  newRow.id = `client-${client.id}`;
  const formattedDate = new Date(client.birthDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  newRow.innerHTML = `
    <td>${client.name}</td>
    <td>${client.email}</td>
    <td>${client.tel}</td>
    <td>${formattedDate}</td>
    <td>
      <button  type="button" class="btn btn-success" id="edit-${index}" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
      <button type="button" class="btn btn-danger" id="delete-${index}">Excluir</button>
    </td>
  `;
  document.querySelector("table#tableClient>tbody").appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableClient>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  const dbClient = getLocalStorage();
  clearTable();
  dbClient.forEach(createRow);
};

const fillFields = client => {
  document.getElementById("name").value = client.name;
  document.getElementById("email").value = client.email;
  document.getElementById("tel").value = client.tel;
  document.getElementById("birthDate").value = client.birthDate;
  document.getElementById("name").dataset.index = client.index;
};

const clearFields = () => {
  const fields = document.querySelectorAll("#form .form-control");
  fields.forEach(field => field.value = "");
  document.getElementById("name").setAttribute("data-index", "new");
};

export { createRow, clearTable, updateTable, fillFields, clearFields };