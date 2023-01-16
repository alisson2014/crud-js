//Buttons
const btnSave = document.querySelector("button#save")
const btnCancel = document.querySelector("button#cancel")
//CRUD - create read update delete
const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_client")) ?? []
const setLocalStorage = (dbClient) =>
  localStorage.setItem("db_client", JSON.stringify(dbClient))

const readClient = () => getLocalStorage()

const updateClient = (index, client) => {
  const dbClient = readClient()
  dbClient[index] = client
  setLocalStorage(dbClient)
}

const deleteClient = (index) => {
  const dbClient = readClient()
  dbClient.splice(index, 1)
  setLocalStorage(dbClient)
}

const createClient = (client) => {
  const dbClient = getLocalStorage()
  dbClient.push(client)
  setLocalStorage(dbClient)
}

const isValidFields = () => {
  return document.getElementById("form").reportValidity()
}

const clearFields = () => {
  const fields = document.querySelectorAll(".modal-field")
  fields.forEach((field) => (field.value = ""))
  document.getElementById("name").setAttribute("data-index", "new")
}

//Interação com o usuário
const saveClient = () => {
  if (isValidFields()) {
    btnSave.setAttribute("data-dismiss", "modal")
    const client = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      tel: document.getElementById("tel").value,
      city: document.getElementById("city").value,
    }
    const index = document.getElementById("name").dataset.index
    if (index === "new") {
      createClient(client)
      updateTable()
      clearFields()
    } else {
      updateClient(index, client)
      updateTable()
      clearFields()
      document.getElementById("name").setAttribute("data-index", "new")
    }
  } else {
    alert("Complete todos os campos para continuar!")
  }
}

const createRow = (client, index) => {
  const newRow = document.createElement("tr")
  newRow.innerHTML = `
    <td>${client.name}</td>
    <td>${client.email}</td>
    <td>${client.tel}</td>
    <td>${client.city}</td>
    <td>
      <button type="button" class="btn btn-success" id="edit-${index}" data-toggle="modal" data-target="#myModal">Editar</button>
      <button type="button" class="btn btn-danger" id="delete-${index}">Excluir</button>
    </td>
  `
  document.querySelector("table#tableClient>tbody").appendChild(newRow)
}

const clearTable = () => {
  const rows = document.querySelectorAll("#tableClient>tbody tr")
  rows.forEach((row) => row.parentNode.removeChild(row))
}

const updateTable = () => {
  const dbClient = readClient()
  clearTable()
  dbClient.forEach(createRow)
}

const fillFields = (client) => {
  document.getElementById("name").value = client.name
  document.getElementById("email").value = client.email
  document.getElementById("tel").value = client.tel
  document.getElementById("city").value = client.city
  document.getElementById("name").dataset.index = client.index
}

const editClient = (index) => {
  const client = readClient()[index]
  client.index = index
  fillFields(client)
}

const editDelete = (event) => {
  const isButton = event.target.type === "button"
  if (isButton) {
    const [action, index] = event.target.id.split("-")
    if (action === "edit") {
      editClient(index)
    } else {
      const client = readClient()[index]
      const response = confirm(
        `Você deseja realmente excluir o(a) cliente ${client.name}?`
      )
      if (response) {
        deleteClient(index)
        updateTable()
      }
    }
  }
}

updateTable()
//Eventos
btnSave.addEventListener("click", saveClient)
btnCancel.addEventListener("click", clearFields)
document
  .querySelector("#tableClient>tbody")
  .addEventListener("click", editDelete)
