'use strict';
let startVideo = false;

import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import React, { Component } from 'react';

import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  View,
  StatusBar,
  Switch
} from 'react-native';

import Camera from 'react-native-camera';


class camera extends Component {
  constructor() {
    super()
    this.state = {
      cameraType: Camera.constants.Type.back,
      captureMode: Camera.constants.CaptureMode.video,
        captureAudio: true,
      captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        isRecording: false,
        videoData: null,
      flashMode: Camera.constants.FlashMode.auto,
      colorTrueSwitchsOn: true,
      colorFalseSwitchIsOn: false,
      stopwatchStart: false,
      stopwatchReset: false
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} barStyle="light-content" />
        <Camera
          aspect={Camera.constants.Aspect.fill}
          captureAudio={this.state.captureAudio}
          captureMode={this.state.captureMode}
          captureTarget={this.state.captureTarget}
          captureMode={this.state.captureMode}
          flashMode={this.state.flashMode}
          ref="camera"
          style={styles.container}
        >

        <View style={styles.options}>
          <View style={styles.watch}>
            <TouchableHighlight
              onPressIn={this.flashOn.bind(this)}
              onPressOut={this.flashOff.bind(this)}
            >
              <Image
                style={styles.flash}
                source={require('../img/on.png')}
              />
            </TouchableHighlight>
            <Stopwatch laps secs start={this.state.stopwatchStart}
              reset={this.state.stopwatchReset}
              options={options}
              getTime={this.currentTime} />
          </ View>

          <TouchableHighlight
            onPressIn={this.saveVideo.bind(this)}
            onPressOut={this.dontSave.bind(this)}
          >
            <Image
              style={styles.save}
              source={require('../img/save.png')}
            />
          </TouchableHighlight>
        </ View>

        <View style={styles.tray} >

          <TouchableHighlight
            onPressIn={this.startTimer.bind(this)}
            onPressOut={this.stopTimer.bind(this)}
          >
            <Image
              style={styles.time}
              source={require('../img/time.png')}
            />
          </TouchableHighlight>

          <TouchableHighlight
            onPressIn={this.startRecord.bind(this)}
            onPressOut={this.endVideo.bind(this)}
          >
            <Image
              style={styles.capture}
              source={require('../img/record.png')}
            />
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.goToFolder.bind(this)}
          >
            <Image
              style={styles.gallery}
              source={require('../img/gallery.png')}
            />
          </TouchableHighlight>
        </ View>
        </Camera>
      </View>
/*
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureAudio={true}>
          <Text style={styles.metric} >Select metric...</ Text>
          <TouchableOpacity onPress={this.takePicture.bind(this)}>
            <Image
              style={styles.capture}
              source={require('../img/play.png')}
            />
          </TouchableOpacity>

        </Camera>
      </View>

*/
    );
  }

  toggleStopwatch() {
    this.setState({stopwatchStart: true, stopwatchReset: false})
    console.log('hello')
  }

  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true})
  }

  getFormattedTime(time) {
      this.currentTime = time
  }

  flashOn() {
    this.setState({flashMode: Camera.constants.FlashMode.on})
  }

  flashOff() {
    this.setState({flashMode: Camera.constants.FlashMode.off})
  }

  startTimer() {
    //
  }

  stopTimer() {
    //
  }

  saveVideo() {
    //
  }

  dontSave() {
      //
  }

  goToFolder() {

  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  startRecord() {
    startVideo = setTimeout(this.recordVideo.bind(this), 50)
  }

  recordVideo() {
    this.setState({isRecording: true})
    this.refs.camera.capture()
      .then((data) => {
        console.log(data)
        this.setState({videoData: data})
     })
      .catch((err) => console.log(err))
  }

  endVideo() {
    this.setState({isRecording: false})
    this.refs.camera.stopCapture()
    setTimeout(() => {console.log(this.state.videoData)}, 5000)
  }

}

const options = {
  container: {
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  text: {
  fontSize: 18,
  color: '#fff',
  marginLeft: 7,
  marginTop:25,
  marginRight: 10
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  watch: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  options: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  tray: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  capture: {
    flex: 0,
    width: 75,
    height: 75,
    padding: 0,
  },
  nightMode: {
    flex: 0,
    width: 20,
    height: 20,
    marginLeft: 10,
    marginBottom: 15,

  },
  save: {
    flex: 0,
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  time: {
    flex:0,
    width:20,
    height:20,
    marginBottom: 25,
    marginRight: 0
  },
  gallery: {
    flex:0,
    width: 20,
    height: 20,
    marginBottom: 25,

  },
  flash: {
    flex:0,
    marginLeft: 10,
    margin: 30,
    //marginBottom: 0,
    marginBottom: 10,
    width: 20,
    height: 20

  }
});

module.exports = (camera);
