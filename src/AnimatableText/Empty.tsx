import { Button, StyleSheet, View, Text } from 'react-native';

import React, { useEffect } from 'react';

function sleep(ms: number) {
  const now = performance.now();
  while (performance.now() - now < ms);
}

function Elephant() {
  sleep(500);
  return <Text>I'm the Elephant</Text>;
}

export default function AnimatableTextExample() {
  const [text, setText] = React.useState('0');
  const counter = React.useRef(0);

  const handleToggle = () => {
    counter.current = 1;
    setText(`${counter.current}`);
  };

  useEffect(() => {
    if (counter.current === 0) {
      return;
    }
    counter.current++;
    if (counter.current > 100) {
      return;
    }
    setTimeout(() => {
      setText(`${counter.current}`);
    }, 0);
  });

  return (
    <>
      <View style={styles.buttons}>
        <Button onPress={handleToggle} title="Toggle" />
      </View>
      <Text style={styles.text}>{text}</Text>
      <Elephant />
    </>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginVertical: 50,
  },
  text: {
    fontSize: 100,
    fontVariant: ['tabular-nums'],
    textAlign: 'center',
  },
});
