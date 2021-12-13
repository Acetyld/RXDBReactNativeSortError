import React, {createContext, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StatusBar, Text, View} from 'react-native';
import initializeDB from './initializeDB';
import {Provider} from 'rxdb-hooks';
import Test from './Test';
// addPouchPlugin(require('pouchdb-adapter-asyncstorage').default);
// addPouchPlugin(require('pouchdb-adapter-http'));
export const AppContext = createContext();
const App = () => {
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initDB = async () => {
      const _db = await initializeDB();
      setDb(_db);
    };
    initDB().then();
  }, []);

  return (
    <Provider db={db}>
      <SafeAreaView>
        <StatusBar barStyle={'light-content'} />
        <Text>He</Text>
        <View>
          <Test />
        </View>
      </SafeAreaView>
    </Provider>
  );
};
export default App;
