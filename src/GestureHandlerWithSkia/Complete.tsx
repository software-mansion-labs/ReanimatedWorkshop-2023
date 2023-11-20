import React from "react";
import { Dimensions, StyleSheet, useWindowDimensions } from "react-native";
import { Canvas, Circle, Fill, Line } from "@shopify/react-native-skia";
import {
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

export const Size = 20;
export const Padding = 10;
const FgColor = "#DC4C4C";
const BgColor = "#EC795A";
const width = Dimensions.get('window').width;
const startX = width / 2 - (Size * 2 - Padding) + Size;
const startY = 2 * Size;

export default function GestureHandlerWithSkiaExample() {
  const rectCenter = useSharedValue({ x: startX, y: startY });

  const gesture = Gesture.Pan()
    .onChange((e) => {
      rectCenter.value = {
        x: startX + e.translationX,
        y: startY + e.translationY,
      };
    })
    .onEnd(() => {
      rectCenter.value = withSpring({ x: startX, y: startY });
    });

  return (
    <GestureDetector gesture={gesture}>
      <Canvas style={styles.canvas}>
        <Fill color="white" />
        <Line
          p1={{ x: width / 2 - (Size - Padding), y: 0 }}
          p2={rectCenter}
          color={BgColor}
          strokeWidth={2}
          style="fill"
        />
        <Circle c={rectCenter} r={Size} color={FgColor} />
        <Circle
          c={rectCenter}
          r={Size}
          color={BgColor}
          strokeWidth={5}
          style="stroke"
        />
      </Canvas>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  canvas: {
    height: 400,
    width: "100%" as const,
    backgroundColor: "#FEFEFE" as const,
  },
});
