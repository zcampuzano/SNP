'use strict';

import { Stopwatch } from 'react-native-stopwatch-timer';
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
  CameraRoll,
  Vibration
} from 'react-native';

import Gallery from './gallery'
import Camera from 'react-native-camera';
import CameraRollExtended from 'react-native-store-photos-album';

let startVideo = false;
var record = require('../img/record.png');
var torch = require('../img/torchoff.png');
var save = require('../img/save.png');
var flash = require('../img/auto.png');
var time = require('../img/time.png');

const { width, height } = Dimensions.get('window');

class CameraDash extends Component {
  constructor() {
    super()
    this.state = {
      cameraType: Camera.constants.Type.back,
      captureMode: Camera.constants.CaptureMode.video,
      captureAudio: true,
      captureTarget: Camera.constants.CaptureTarget.CameraRoll,
      isRecording: false,
      videoData: null,
      uri: null,
      lastVideo: [],
      index: null,
      flashMode: Camera.constants.FlashMode.auto,
      torchMode: Camera.constants.TorchMode.off,
      stopwatchStart: false,
      stopwatchReset: false,
      saveMode: true,
    }
  }

  getPhotos() {
    CameraRoll.getPhotos({
      first: 1,
      assetType: 'Videos'
    })
    .then(r => this.setState({ lastVideo: r.edges }))

  }


  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false})
    if(this.state.stopwatchStart == false) {
      time = require('../img/timeon.png')
    }
    if(this.state.stopwatchStart == true) {
      time = require('../img/time.png')
    }
    //console.log(this.state.lastVideo.node.image.uri)
  }

  resetStopwatch() {
    time = require('../img/time.png')
    this.setState({stopwatchStart: false, stopwatchReset: true})
    //time = require('../img/time.png')
  }

  getFormattedTime(time) {
      this.currentTime = time
  }

  toggleFlash() {
    if(this.state.flashMode == 0){
      this.setState({flashMode: Camera.constants.TorchMode.auto})
      flash = require('../img/auto.png')
    }
    if(this.state.flashMode == 1){
      this.setState({flashMode: Camera.constants.TorchMode.off})
      flash = require('../img/off.png')
    }
    if(this.state.flashMode == 2){
      this.setState({flashMode: Camera.constants.TorchMode.on})
      flash = require('../img/on.png')
    }
  }

  toggleTorch() {
    if(this.state.torchMode == 0){
      this.setState({torchMode: Camera.constants.TorchMode.on})
      torch = require('../img/torch.png')
    }
    if(this.state.torchMode == 1){
      this.setState({torchMode: Camera.constants.TorchMode.off})
      torch = require('../img/torchoff.png')
    }
  }

  toggleSave() {
    if(this.state.saveMode == true) {
      this.setState({saveMode: false})
      save = require('../img/nosave.png')
    }
    if(this.state.saveMode == false) {
      this.setState({saveMode: true})
      save = require('../img/save.png')
    }
  }

  toggleVideo() {

    if(this.state.isRecording == false) {
      this.startRecord()
    }
    if(this.state.isRecording == true) {
      this.endVideo()
    }
  }

  startRecord() {
    startVideo = setTimeout(this.recordVideo.bind(this), 50)
    record = require('../img/stop.png')
    console.log(this.state.flashMode)
  }

  recordVideo() {

    this.setState({isRecording: true})
    this.refs.camera.capture()
      .then((data) => {
        console.log(data)
        this.setState({videoData: data})
     })
      .catch((err) => console.log(err))

    record = require('../img/stop.png')

  }

  endVideo() {

    this.setState({isRecording: false})
    this.refs.camera.stopCapture()
    setTimeout(() => {console.log(this.state.videoData)}, 5000)
    record = require('../img/record.png')
    this.resetStopwatch()
    this.getPhotos()

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
          flashMode={this.state.flashMode}
          torchMode={this.state.flashMode}
          style={styles.cameraContainer}
          ref="camera"
        >
        </Camera>



        <View style={styles.options}>
          <View style={styles.watch}>
            <TouchableHighlight
              onPress={this.toggleFlash.bind(this)}
              underlayColor={'#0000'}
            >
              <Image
                style={styles.flash}
                source={flash}
              />
            </TouchableHighlight>
            <Stopwatch msecs start={this.state.stopwatchStart}
              reset={this.state.stopwatchReset}
              options={options}
              getTime={this.currentTime}
            />
          </ View>

          <TouchableHighlight
            onPress={this.toggleSave.bind(this)}
            underlayColor={'#0000'}
          >
            <Image
              style={styles.save}
              source={save}
            />
          </TouchableHighlight>
        </ View>

        <View style={styles.tray} >
          <TouchableHighlight
            onPress={ this.toggleStopwatch.bind(this) }
            onLongPress={this.resetStopwatch.bind(this)}
            underlayColor={'#0000'}
          >
            <Image
              style={styles.time}
              source={time}
            />
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.toggleVideo.bind(this)}
            underlayColor={'#0000'}
          >

            <Image
              style={styles.capture}
              source={record}
            />

          </TouchableHighlight>
          <Gallery />
        </ View>

      </View>

    );
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
    position: 'absolute',
    width: width,
    height: height,

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
