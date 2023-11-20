'use strict';
import React, { useState } from 'react';
import { Button, Image, StyleSheet, View, Text, FlatList } from 'react-native';

export default function LayoutAnimationListExample() {
  const [show, setShow] = useState(true);
  const [data, setData] = useState([0, 1, 2]);

  return (
    <>
      <Button onPress={() => setShow(!show)} title="toggle" />
      <Button
        title="add"
        onPress={() =>
          setData((data) => {
            return [...data, data.length];
          })
        }
      />
      <Button
        title="remove"
        onPress={() =>
          setData((data) => {
            data.pop();
            return [...data];
          })
        }
      />
      {show && (
        <FlatList
          style={styles.container}
          contentContainerStyle={[styles.contentContainer]}
          decelerationRate="fast"
          data={data}
          renderItem={() => <Item />}
        />
      )}
    </>
  );
}

const dogAvatar = require('./assets/avatars/dog.png');

function Item() {
  return (
    <View style={styles.card}>
      <View style={styles.itemContent}>
        <Image source={dogAvatar} style={styles.avatar} />
        <View style={styles.description}>
          <Text style={styles.header}>Name Surname</Text>
          <Text>Description</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  contentContainer: {
    alignItems: 'center',
    height: 1000,
  },
  card: {
    width: 330,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#eee',
    borderWidth: 1,
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemContent: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    borderRadius: 16,
    overflow: 'hidden',
    width: 48,
    height: 48,
  },
  description: {
    marginLeft: 15,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
  }
});
