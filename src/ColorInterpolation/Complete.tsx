import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  clamp
} from 'react-native-reanimated';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';

import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

function rgbInterpolation(color1: string, color2: string, progress: number) {
  'worklet';
  return interpolateColor(progress, [0, 1], [color1, color2], 'RGB', {
    gamma: 1,
  });
}

function rgbGammaInterpolation(
  color1: string,
  color2: string,
  progress: number
) {
  'worklet';
  return interpolateColor(progress, [0, 1], [color1, color2]);
}

function hsvInterpolation(color1: string, color2: string, progress: number) {
  'worklet';
  return interpolateColor(progress, [0, 1], [color1, color2], 'HSV', {
    useCorrectedHSVInterpolation: false,
  });
}

function hsvStarInterpolation(
  color1: string,
  color2: string,
  progress: number
) {
  'worklet';
  return interpolateColor(progress, [0, 1], [color1, color2], 'HSV');
}

const interpolateFunction = rgbGammaInterpolation;

export default function ColorInterpolationExample() {
  const sourceColor = '#ff0000';
  const targetColor = '#00ffff';

  const translateX = useSharedValue(0);
  const context = useSharedValue(0);
  const progress = useSharedValue(0);

  const pointerPosition = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
    ],
  }));
  const gesture = Gesture.Pan()
  .onStart(() => {
    context.value = translateX.value;
  })
  .onUpdate((event) => {
    translateX.value = clamp(context.value + event.translationX, 0, 270);
    progress.value = clamp(translateX.value / 270, 0, 1);
  });

  const animatedStyle = useAnimatedStyle(() => {
    translateX.value = progress.value * 270;
    return {
      backgroundColor: interpolateFunction(sourceColor, targetColor, progress.value),
    };
  });

  return (
    <View>
      <Animated.View style={[styles.colorBox, animatedStyle]} />
      <Button
        onPress={() => {
          const target = progress.value > 0.5 ? 0 : 1;
          progress.value = withTiming(target, { duration: 1000 });
        }}
        title="run animation"
      />
      <View style={styles.colorContainer}>
        <View style={[styles.box, { backgroundColor: sourceColor }]} />
        <View style={styles.spacer} />
        <GestureDetector gesture={gesture}>
          <View style={{flexDirection: 'row'}}>
          <Animated.View style={[styles.pointer, pointerPosition]} />
          {new Array(11)
            .fill(null)
            .map((_, i) => i / 10)
            .map((i) => (
              <View
                key={'' + i}
                style={[
                  styles.box,
                  { backgroundColor: interpolateFunction(sourceColor, targetColor, i) },
                ]}
              />
            ))}
          </View>
        </GestureDetector>
        <View style={styles.spacer} />
        <View style={[styles.box, { backgroundColor: targetColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  colorContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
  },
  box: {
    width: 25,
    height: 25,
  },
  colorBox: {
    width: '100%',
    height: 200,
  },
  spacer: {
    width: 10,
  },
  pointer: {
    position: 'absolute',
    width: 25,
    height: 25,
    backgroundColor: 'black',
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 2,
    zIndex: 1,
    left: -10,
  }
});
