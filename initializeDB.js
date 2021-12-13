import schema from './Schema';
import {createRxDatabase} from 'rxdb';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb/plugins/pouchdb';
import SQLite from 'react-native-sqlite-2';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';
const SQLiteAdapter = SQLiteAdapterFactory(SQLite);

addPouchPlugin(SQLiteAdapter);
addPouchPlugin(require('pouchdb-adapter-http'));
// const syncURL = 'http://localhost:10102/'; // Replace localhost with a public ip address!
const dbName = 'heroesreactdatabase1';
const initialize = async () => {
  let db;
  try {
    console.log('Initializing database...');
    db = await createRxDatabase({
      name: dbName,
      storage: getRxStoragePouch('react-native-sqlite'),
      multiInstance: false,
      ignoreDuplicate: true,
    });
    console.log('Database initialized!');
  } catch (err) {
    console.log('ERROR CREATING DATABASE', err);
  }
  console.log('Adding hero collection...');
  try {
    const heroCollection = await db.addCollections({
      heroes: {
        schema: schema,
      },
    });
    // heroCollection.sync({
    //   remote: syncURL + dbName + '/',
    //   options: {
    //     live: true,
    //     retry: true,
    //   },
    // });
  } catch (err) {
    console.log('ERROR CREATING COLLECTION', err);
  }

  return db;
};

export default initialize;
