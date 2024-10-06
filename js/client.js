import { getLocalStorage, setLocalStorage } from './storage.js';

const createClient = client => {
  const dbClient = getLocalStorage();
  const newClient = {
    ...client,
    id: dbClient.length + 1
  };
  dbClient.push(newClient);
  setLocalStorage(dbClient);
};

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

export { createClient, updateClient, deleteClient };