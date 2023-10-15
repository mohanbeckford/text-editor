import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


// Export a function we will use to POST to the database.
export const postDb = async (name, home, cell, email)  => {
  console.log('Post to the database');
  const Db = await openDB('jate', 1);
  const tx = Db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({ name: name, home_phone: home, cell_phone: cell, email: email });
  const result = await request;
  console.log('Data saved to the database', result);
};


export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.add({ content });
};

export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  return store.getAll();
};

// Export a function we will use to DELETE to the database.
export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);
  const Db = await openDB('jate', 1);
  const tx = Db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.delete(id);
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
