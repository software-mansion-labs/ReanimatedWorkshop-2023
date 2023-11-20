import React from 'react';
import { Button, View } from 'react-native';
import Animated, { defineAnimation, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

function withCircle (
  toValue: number
) {
  'worklet';
  return defineAnimation(toValue, () => {
    'worklet';
    return {
      type: 'custom',
      onFrame: (animation: any, now: number) => {
        animation.current = {
          x: Math.sin(now / 1000) * 100,
          y: Math.cos(now / 1000) * 100,
        }
        return false
      },
      onStart: (
        _animation: any,
        _value: number,
        _now: number,
        _previousAnimation: any,
      ) => {},
      toValue,
      current: toValue,
    };
  });
};


export default function CustomAnimationExample() {
  const position = useSharedValue({ x: 0, y: 0 });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: position.value.x },
        { translateY: position.value.y },
      ]
    };
  });

  return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Button title="Run custom Animation" onPress={() => {
      position.value = withCircle(1) as any;
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
