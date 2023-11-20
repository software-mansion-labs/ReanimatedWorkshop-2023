import React from 'react';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Button, TextInput, StyleSheet, View, Text } from 'react-native';

function sleep(ms: number) {
  const now = performance.now();
  while (performance.now() - now < ms);
}

function Elephant() {
  sleep(500);
  return <Text>I'm the Elephant</Text>;
}

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function AnimatableTextExample() {
  const sv = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    const text = Math.round(sv.value * 100).toString();
    return { text: text, defaultValue: text };
  });

  const handleToggle = () => {
    sv.value = 0;
    sv.value = withTiming(1, { duration: 1000 });
  };

  return (
    <>
      <View style={styles.buttons}>
        <Button onPress={handleToggle} title="Toggle" />
      </View>
      <AnimatedTextInput animatedProps={animatedProps} style={styles.text} />
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
