import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import SharedTransitionExample from './src/SharedElementTransition';
import LayoutAnimationListExample from './src/LayoutAnimationList';

function App(): JSX.Element {

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        {/* <SharedTransitionExample /> */}
        <SafeAreaView style={styles.container}>
          <LayoutAnimationListExample />
        </SafeAreaView>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;
