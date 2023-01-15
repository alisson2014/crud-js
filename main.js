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

const tempClient = {
  name: "Irineu",
  email: "teste@gmail.com",
  tel: "123456789",
  city: "Recife",
}

const isValidFields = () => {
  return document.getElementById("form").reportValidity()
}

const clearFields = () => {
  const fields = document.querySelectorAll(".modal-field")
  fields.forEach((field) => (field.value = ""))
}

//Interação com o usuário
const saveClient = () => {
  if (isValidFields()) {
    document.querySelector("button#save").setAttribute("data-dismiss", "modal")
    const client = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      tel: document.getElementById("tel").value,
      city: document.getElementById("city").value,
    }
    createClient(client)
    clearFields()
  } else {
    document.querySelector("button#save").setAttribute("data-dismiss", "")
    alert("Complete todos os campos para continuar!")
  }
}

//Eventos
document.querySelector("button#save").addEventListener("click", saveClient)
