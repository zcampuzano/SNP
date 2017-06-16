import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import CameraDash from './src/components/camera';
import Gallery from './src/components/gallery';
import { StackNavigator } from 'react-navigation'




class Home extends Component {
  render() {
    return (

          <CameraDash />
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    position: 'absolute',
    width: 300,   //figure out how to get width/height
    height: 300,
    top:0,
    left:0
  },
  buttonContainer: {
    flex: 1
  }
});

AppRegistry.registerComponent('camera', () => Home);
