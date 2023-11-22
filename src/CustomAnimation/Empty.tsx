import React from 'react';
import { Button, View } from 'react-native';
import Animated, { defineAnimation } from 'react-native-reanimated';

function withRandom(stepsCount: number) {
  'worklet';
  return defineAnimation(stepsCount, () => {
    'worklet';
    return {
      type: 'custom',
      onFrame: (animation: any, now: number) => {
        // TODO
        return false
      },
      onStart: (
        _animation: any,
        _value: number,
        _now: number,
        _previousAnimation: any,
      ) => {},
      stepsCount: stepsCount,
      lastTimestamp: 0,
      current: Math.random() * 200 - 100,
    };
  });
};

export default function CustomAnimationExample() {

  return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Button title="Run custom Animation" onPress={() => {

    }} />
    <Animated.View 
      style={[
        { 
          backgroundColor: 'red', 
          height: 100, 
          width: 100,
        },
      ]} 
    />
  </View>;
}
