import React from 'react';
import { Button, View } from 'react-native';
import Animated from 'react-native-reanimated';

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
