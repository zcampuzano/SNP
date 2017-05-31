'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

import Camera from 'react-native-camera';

class BadInstagramCloneApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.metric} >Select metric...</ Text>
          <TouchableOpacity onPress={this.takePicture.bind(this)}>
            <Image
              style={styles.capture}
              source={require('./img/play.png')}
            />
          </TouchableOpacity>

        </Camera>
      </View>
    );
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  capture: {
    flex: 0,
    width: 75,
    height: 75,
    padding: 0,
    margin: 0

  },
  metric: {
    flex: 0,
    backgroundColor: '#000',
    color: '#fff',
    margin: 10

  }
});

AppRegistry.registerComponent('camera', () => BadInstagramCloneApp);
//penis
