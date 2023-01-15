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

//Interação com o usuário
const saveClient = () => {
  if (isValidFields()) {
    console.log("Cadastrando")
  } else {
    console.log("Erro, digite todos os campos")
  }
}

//Eventos
document.getElementById("save").addEventListener("click", saveClient)
