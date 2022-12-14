import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './Components/redux/store';
import { Provider } from 'react-redux';

import RootStack from './screens/RootStack';


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <RootStack/>
      </NavigationContainer>
    </Provider>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
