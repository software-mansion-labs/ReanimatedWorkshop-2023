import React from 'react';
import { Button, View } from 'react-native';
import Animated, { defineAnimation, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

function withRandom(stepsCount: number) {
  'worklet';
  return defineAnimation(stepsCount, () => {
    'worklet';
    return {
      type: 'custom',
      onFrame: (animation: any, now: number) => {
        if (now - animation.lastTimestamp > 80) {
          animation.lastTimestamp = now;
          animation.current = Math.random() * 200 - 100;
          animation.stepsCount--;
          if (animation.stepsCount < 1) {
            return true;
          }
        }
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
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translationX.value },
        { translateY: translationY.value },
      ]
    };
  });

  return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Button title="Run custom Animation" onPress={() => {
      translationX.value = withRandom(10) as any;
      translationY.value = withRandom(10) as any;
    }} />
    <Animated.View 
      style={[
        { 
          backgroundColor: 'red', 
          height: 100, 
          width: 100,
        }, 
        animatedStyle
      ]} 
    />
  </View>;
}
