import React from 'react';
import { StyleSheet, useWindowDimensions } from "react-native";
import { Canvas, Circle, Fill } from "@shopify/react-native-skia";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useSharedValue, withDecay } from "react-native-reanimated";

const Size = 100;
const Padding = 20;

export default function AnimationWithTouchHandler() {
  const { width } = useWindowDimensions();

  const translateX = useSharedValue((width - Size - Padding) / 2);
  const translateY = useSharedValue(40);

  const gesture = Gesture.Pan()
    .onChange((e) => {
      translateX.value += e.changeX;
      translateY.value += e.changeY;
    })
    .onEnd((e) => {
      const leftBoundary = Size;
      const rightBoundary = width - Size - Padding;
      translateX.value = withDecay({
        velocity: e.velocityX,
        clamp: [leftBoundary, rightBoundary],
      });
    });

  return (
    <GestureDetector gesture={gesture}>
      <Canvas style={styles.canvas}>
        <Fill color="white" />
        <Circle cx={translateX} cy={translateY} r={20} color="#3E3E" />
        <Circle cx={translateX} cy={translateY} r={15} color="#AEAE" />
      </Canvas>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  canvas: {
    height: 300,
    width: "100%" as const,
    backgroundColor: "#FEFEFE" as const,
  },
});
