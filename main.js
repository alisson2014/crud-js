const form = document.querySelector("form#form")
const btnCancel = document.querySelector("button#cancel")

const getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? [];
const setLocalStorage = dbClient => localStorage.setItem("db_client", JSON.stringify(dbClient));

const updateClient = (index, client) => {
  const dbClient = getLocalStorage();
  dbClient[index] = client;
  setLocalStorage(dbClient);
};

const deleteClient = index => {
  const dbClient = getLocalStorage();
  dbClient.splice(index, 1);
  setLocalStorage(dbClient);
};

const createClient = client => {
  const dbClient = getLocalStorage();
  const newClient = {
    ...client,
    id: dbClient.length + 1
  };
  dbClient.push(newClient);
  setLocalStorage(dbClient);
};

const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};

const clearFields = () => {
  const fields = document.querySelectorAll("#form .form-control");
  fields.forEach(field => field.value = "");
  document.getElementById("name").setAttribute("data-index", "new");
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

updateTable();

form.addEventListener("submit", saveClient);
btnCancel.addEventListener("click", clearFields);
document
  .querySelector("#tableClient>tbody")
  .addEventListener("click", editDelete);

document.getElementById('search').addEventListener('input', function() {
  const searchValue = this.value.toLowerCase();
  const clients = getLocalStorage();
  console.log(clients, searchValue);

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