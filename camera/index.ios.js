import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import camera from './src/components/camera';
import login from './src/components/login';
//import loginCheck from './src/components/loginCheck';
//import createAccount from './src/components/createAccount';


const App = () => (
  <View>
    <login />
  </View>
)
/*
export default class home extends Component {
  render() {
    return (
        <login />
        //<camera />

    );
  }
}*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('camera', () => login);
//AppRegistry.registerComponent('camera', () => camera);
//AppRegistry.registerComponent('camera', () => createAccount);
//AppRegistry.registerComponent('camera', () => loginCheck);
