import {Button, FlatList, Text, TextInput} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {useRxCollection, useRxData, useRxDB, useRxQuery} from 'rxdb-hooks';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  while (color.length < 7) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Test = () => {
  const collection = useRxCollection('heroes');
  const db = useRxDB();
  const [name, setName] = useState('');
  // const queryConstructor = collection => collection.find();
  // .where('affiliation')
  // .equals('jedi');
  const addHero = async () => {
    console.log('addHero: ' + name);
    const color = getRandomColor();
    console.log('color: ' + color);
    await collection.upsert({name, color});
    setName('');
  };
  const remove = async () => {
    await db.remove();
    // await collection.remove();
  };
  // const {result: heroes, isFetching} = useRxData('heroes', queryConstructor );
  // const queryConstructor = useCallback(
  //   c => c.find(),
  //   [], // 👈 any variable query arguments should be inserted here
  // );
  // const {result: heroes, isFetching} = useRxData('heroes', queryConstructor);
  const queryConstructor = useCallback(
    c => c.find().sort('status').sort('priority'),
    [], // 👈 any variable query arguments should be inserted here
  );

  const {
    result: heroes,
    isFetching,
    fetchMore,
    isExhausted,
  } = useRxData('heroes', queryConstructor, {
    pageSize: 2,
    pagination: 'Infinite',
  });

  if (isFetching) {
    return (
      <>
        <Button
          style={{marginTop: 10}}
          title={'remove'}
          onPress={() => {
            remove().then();
          }}
        />
        <Text>Loading...</Text>
      </>
    );
  }

  return (
    <>
      <FlatList
        data={heroes}
        keyExtractor={item => item.name}
        ListFooterComponent={() => {
          return (
            <>
              {!isExhausted && (
                <Button
                  onPress={() => {
                    fetchMore();
                    console.log('loading more');
                  }}
                  title={'load more'}
                />
              )}
            </>
          );
        }}
        renderItem={({item}) => {
          return (
            <Text style={{color: item.color}} key={item.id}>
              {JSON.stringify(item)}
            </Text>
          );
        }}
      />
      <TextInput
        value={name}
        onChangeText={name => setName(name)}
        placeholder="Type to add a hero..."
        onSubmitEditing={addHero}
      />
      <Button
        style={{marginTop: 10}}
        title={'remove'}
        onPress={() => {
          remove().then();
        }}
      />
    </>
  );
};
export default Test;
