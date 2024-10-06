const getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? [];
const setLocalStorage = dbClient => localStorage.setItem("db_client", JSON.stringify(dbClient));

export { getLocalStorage, setLocalStorage };