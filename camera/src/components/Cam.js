'use strict';

import { Stopwatch } from 'react-native-stopwatch-timer';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  View,
  StatusBar,
  CameraRoll,
  Modal
} from 'react-native';

import GalleryView from './GalleryView';
import VideoPlayer from './VideoPlayer';
import Camera from 'react-native-camera';
import RNWatermark from 'react-native-watermark';
import CameraRollExtended from 'react-native-store-photos-album';

let startVideo = false;
var record = null;
var save = require('../img/save.png');
var flash = require('../img/auto.png');
var time = require('../img/time.png');


const { width, height } = Dimensions.get('window');
var RNFS = require('react-native-fs');

class Cam extends Component {
  constructor() {
    super()
    this.state = {
      cameraType: Camera.constants.Type.back,
      captureMode: Camera.constants.CaptureMode.video,
      captureAudio: true,
      captureTarget: Camera.constants.CaptureTarget.disk,
      isRecording: false,
      videoData: null,
      path: null,
      flashMode: Camera.constants.FlashMode.auto,
      torchMode: Camera.constants.TorchMode.off,
      stopwatchStart: false,
      stopwatchReset: false,
      saveMode: true,
      settingsVisible: false,
    }
  }

  toggleSettings() {
    this.setState({ settingsVisible: !this.state.settingsVisible });
  }

  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false})
    if(this.state.stopwatchStart == false) {
      time = require('../img/timeon.png')
    }
    if(this.state.stopwatchStart == true) {
      time = require('../img/time.png')
    }

  }

  resetStopwatch() {
    time = require('../img/time.png')
    this.setState({stopwatchStart: false, stopwatchReset: true})
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
    record = require('../img/record.png')

  }

  recordVideo() {

    this.setState({isRecording: true})
    this.refs.camera.capture()
      .then((data) => {
        console.log(data)
        this.setState({videoData: data})
     })
      .catch((err) => console.log(err))

    record = require('../img/record.png')

  }

  endVideo() {
    this.setState({isRecording: false})
    this.refs.camera.stopCapture()
    if(this.state.saveMode == true) {
      setTimeout(() => { this.save() }, 500)
    }
    setTimeout(() => { this.playVideo() }, 500)
    record = null;
    this.resetStopwatch()
  }

  playVideo() {
    this.setState({ path: 'file://' + this.state.videoData.path})
    this.props.navigation.dispatch({ type: this.state.path })
    this.props.navigation.dispatch({ type: 'Video' })
  }

  save() {
    CameraRollExtended.saveToCameraRoll({uri: this.state.videoData.path, album: 'Test'}, 'video')
  }

  render() {

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toggleVideo.bind(this)} style={styles.fullScreen}>
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
        </TouchableOpacity>
        <View style={styles.options}>
          <View style={styles.watch}>
            <TouchableHighlight onPress={this.toggleSettings.bind(this)} underlayColor={'#0000'}>
              <Image
                style={styles.settings}
                source={require('../img/settings.png')}
              />
            </TouchableHighlight>
            <View style={styles.recordDisplay}>
              <Image source={record} style={styles.record} visible={false}/>
              <Stopwatch msecs start={this.state.stopwatchStart}
                reset={this.state.stopwatchReset}
                options={options}
                getTime={this.currentTime}
              />
            </View>
          </View>
          <Modal
            animationType={"none"}
            transparent={true}
            visible={this.state.settingsVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
          >
            <TouchableOpacity onPress={this.toggleSettings.bind(this)} style={styles.fullScreen}>
              <View style={styles.dropdown}>
                <TouchableHighlight onPress={this.toggleSettings.bind(this)} underlayColor={'#0000'}>
                  <Image
                    style={styles.settings}
                    source={require('../img/settingson.png')}
                  />
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={this.toggleFlash.bind(this)}
                  underlayColor={'#0000'}
                >
                  <Image
                    style={styles.flash}
                    source={flash}
                  />
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={this.toggleSave.bind(this)}
                  underlayColor={'#0000'}
                >
                  <Image
                    style={styles.save}
                    source={save}
                  />
                </TouchableHighlight>
              </View>
            </TouchableOpacity>
          </Modal>
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

        </ View>
      </View>
    );
  }
}



const options = {

  container: {
    backgroundColor: '#0000',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 120

  },
  text: {
  fontSize: 21,
  opacity: 1,
  color: '#fff',
  marginLeft: 7,
  marginTop:30,
  marginRight: 10,
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cameraContainer: {
    flex: 1,
    position: 'absolute',
    width,
    height,
  },
  dropdown: {
    position: 'absolute'
  },
  video: {
    flex:1,
    position: 'absolute',
    width: width,
    height: height,
  },
  recordDisplay: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  record: {
    flex: 0,
    width: width/15,
    height: height/25,
    marginTop: 28,
  },
  settings: {
    flex: 0,
    margin: 15,
    marginBottom: 10,
    marginTop: 30,
    width: 30,
    height: 30,
    backgroundColor: '#0000'
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
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  save: {
    flex: 0,
    width: width/15,
    height: height/25,
    margin: 15,
    marginTop: 0,
    backgroundColor: '#0000'
  },
  time: {
    flex:0,
    width: 30,
    height: 30,
    margin: 25,
  },
  flash: {
    flex:0,
    margin: 15,
    width: 25,
    height: 25,
    backgroundColor: '#0000'

  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  galleryButton: {
    flex:0,
    width: 30,
    height: 30,
    margin: 25,
    backgroundColor: '#0000'
  },
});

module.exports = (Cam);
