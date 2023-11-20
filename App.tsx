import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SharedTransitionExample from './src/SharedElementTransition';
import { NavigationContainer } from '@react-navigation/native';

function App(): JSX.Element {

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        {/* <SafeAreaView style={styles.container}> */}
          <SharedTransitionExample />
        {/* </SafeAreaView> */}
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
