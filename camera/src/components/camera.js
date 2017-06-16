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
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  StatusBar,
  Switch,
  Linking,
} from 'react-native';

import Gallery from './gallery'
import Camera from 'react-native-camera';
import CameraRollExtended from 'react-native-store-photos-album';

var recordButton = require('../img/record.png');
const { width, height } = Dimensions.get('window');

class CameraDash extends Component {
  constructor() {
    super()
    this.state = {
      cameraType: Camera.constants.Type.back,
      captureMode: Camera.constants.CaptureMode.video,
      captureAudio: true,
      captureTarget: Camera.constants.CaptureTarget.cameraRoll,
      isRecording: false,
      videoData: null,
      flashMode: Camera.constants.FlashMode.on,
      colorTrueSwitchsOn: true,
      colorFalseSwitchIsOn: false,
      stopwatchStart: false,
      stopwatchReset: false,
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
          style={styles.cameraContainer}
          ref="camera"
        >


        <View style={styles.options}>
          <View style={styles.watch}>
            <TouchableHighlight
              onPress={this.flashOn.bind(this)}
              underlayColor={'#0000'}
              //onPressOut={() => this.flashOff()}
            >
              <Image
                style={styles.flash}
                source={require('../img/on.png')}
              />
            </TouchableHighlight>
            <Stopwatch start={this.state.stopwatchStart}
              reset={this.state.stopwatchReset}
              options={options}
              getTime={this.currentTime}
            />
          </ View>
          <TouchableHighlight
            onPressIn={this.torchModeOn.bind(this)}
            onPressOut={this.torchModeOff.bind(this)}
            underlayColor={'#0000'}
          >
            <Image
              style={styles.torchMode}
              source={require('../img/torch.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPressIn={this.saveVideo.bind(this)}
            onPressOut={this.dontSave.bind(this)}
            underlayColor={'#0000'}
          >
            <Image
              style={styles.save}
              source={require('../img/save.png')}
            />
          </TouchableHighlight>
        </ View>

        <View style={styles.tray} >
          <TouchableHighlight
            onPress={this.toggleStopwatch.bind(this)}
            underlayColor={'#0000'}
          >
            <Image
              style={styles.time}
              source={require('../img/time.png')}
            />
          </TouchableHighlight>

          <TouchableHighlight
            onPressIn={this.startRecord.bind(this)}
            onPressOut={ this.endVideo.bind(this) }
            underlayColor={'#0000'}
          >

            <Image
              style={styles.capture}
              source={recordButton}
            />

          </TouchableHighlight>

          <Gallery />

        </ View>
        </Camera>
      </View>

    );
  }

  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false})
  }

  resetStopwatch() {

    this.setState({stopwatchStart: false, stopwatchReset: true})
  }

  getFormattedTime(time) {
      this.currentTime = time
  }

  flashOn() {
    this.setState({flashMode: Camera.constants.FlashMode.on})
    console.log(this.state.flashMode)
  }

  flashOff() {
    this.setState({flashMode: Camera.constants.FlashMode.off})
  }

  torchModeOn() {

  }

  torchModeOff() {

  }

  saveVideo() {

  }

  dontSave() {
      //
  }


  startRecord() {
    startVideo = setTimeout(this.recordVideo.bind(this), 50)
    recordButton = require('../img/stop.png')
  }

  recordVideo() {
    this.setState({isRecording: true})
    this.refs.camera.capture()
      .then((data) => {
        console.log(data)
        this.setState({videoData: data})
     })
      .catch((err) => console.log(err))
    recordButton = require('../img/stop.png')
  }

  endVideo() {
    this.setState({isRecording: false})
    this.refs.camera.stopCapture()
    setTimeout(() => {console.log(this.state.videoData)}, 5000)
    recordButton = require('../img/record.png')
    this.resetStopwatch()
  }

}

const options = {

  container: {
    backgroundColor: '#0000',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  text: {
  fontSize: 21,
  opacity: 1,
  color: '#fff',
  marginLeft: 7,
  marginTop:25,
  marginRight: 10
  }
};
const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    justifyContent: 'space-between'

  },
  buttonContainer: {
    backgroundColor: '#000',
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: width,
    height: height
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
    width: width/7,
    height: height/7,
    padding: 0,
    backgroundColor: '#0000'
  },
  torchMode: {
    flex: 0,
    width: width/15,
    height: height/25,
    marginLeft: 15,
    marginBottom: 15,
    backgroundColor: '#0000',


  },
  save: {
    flex: 0,
    width: width/15,
    height: height/25,
    marginLeft: 15,
    backgroundColor: '#0000'
  },
  time: {
    flex:0,
    width: 25,
    height: 25,
    marginBottom: 35,
    marginRight: 10
  },
  flash: {
    flex:0,
    marginLeft: 15,
    margin: 30,
    //marginBottom: 0,
    marginBottom: 10,
    width: width/15,
    height: height/25,
    backgroundColor: '#0000'

  }
});

module.exports = (CameraDash);
