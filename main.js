//CRUD - create read update delete
const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_client")) ?? []
const setLocalStorage = (dbClient) =>
  localStorage.setItem("db_client", JSON.stringify(dbClient))

const createClient = (client) => {
  const dbClient = getLocalStorage()
  dbClient.push(client)
  setLocalStorage(dbClient)
}

const tempClient = {
  name: "Alisson",
  email: "teste@gmail.com",
  tel: "123456789",
  city: "Balneário",
}
