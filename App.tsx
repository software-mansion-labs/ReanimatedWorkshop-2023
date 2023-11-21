import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

function App(): JSX.Element {

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Text>Advanced Reanimated Workshop for Shopify</Text>
        </SafeAreaView>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
