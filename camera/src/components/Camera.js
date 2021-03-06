'use strict';

import { Stopwatch } from './react-native-stopwatch-timer';
import React, { Component } from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  CameraRoll,
  Image,
  Modal
} from 'react-native';

import styles from '../styles/styleC';

//Needs updating
//import CameraRollExtended from 'react-native-store-photos-album';

import Recorder from 'react-native-screcorder';
import Dimensions from 'Dimensions';
var screen = Dimensions.get('window');

// IMAGES
var settings = require('../img/settings.png');
var flash = require('../img/auto.png');
var save = require('../img/save.png');
var record = null;
var time = require('../img/time.png');
var recordbutton = require('../img/recordbutton.png');
var gallery = require('../img/gallery.png');

// TIMES
var finalTime;
var rightTime;
var leftTime;

class Camera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            device: "back",
            recording: false,
            nbSegments: 0,
            barPosition: new Animated.Value(0),
            currentDuration: 0,
            currentTime: null,
            maxDuration: 120000,
            limitReached: false,
            url: null,
            uri: null,
            settingsVisible: false,
            stopwatchStart: false,
            stopwatchReset: false,
            stopwatchLap: false,
            saveMode: true,
            flashMode: 2,
            torchMode: 0,
            overlay: {final: "00:00:000", right: "RS: 00:00:000", left: "LS: 00:00:000"},
            config: {
            flashMode: Recorder.constants.SCFlashModeOff,
            video: {
                enabled: true,
                format: 'MPEG4',
                bitrate: 20000000,
                timescale: 1,
                quality: "HighestQuality",
                filters: []
            },
            audio: {
                enabled: true,
                bitrate: 128000, // 128kbit/s
                channelsCount: 1, // Mono output
                format: "MPEG4AAC",
                quality: "HighestQuality" // HighestQuality || MediumQuality || LowQuality
            },

            },
        };
    }

    componentDidMount() {

    }

    /*
    *  PRIVATE METHODS
    */

    startBarAnimation() {
     record = require('../img/record.png');
     this.animRunning = true;
     this.animBar = Animated.timing(
       this.state.barPosition,
       {
         toValue: screen.width,
         duration: this.state.maxDuration - this.state.currentDuration
       }
     );
     this.animBar.start(() => {
       // The video duration limit has been reached
       if (this.animRunning) {
         this.finish();
       }
     });
    }

    resetBarAnimation() {
     Animated.spring(this.state.barPosition, {toValue: 0}).start();
    }

    stopBarAnimation() {
     record = null;
     this.animRunning = false;
     if (this.animBar)
       this.animBar.stop();
    }

    /*
    *  PUBLIC METHODS
    */

    toggleRecord() {
     if(this.state.recording) this.finish();
     else this.record();
    }

    record() {
     if (this.state.limitReached) return;
     this.refs.recorder.record();
     this.startBarAnimation();
     this.setState({recording: true});
    }

    //  pause() {
    //    if (!this.state.recording) return;
    //    this.refs.recorder.pause();
    //    this.stopBarAnimation();
    //    this.setState({recording: false, nbSegments: ++this.state.nbSegments});
    //  }

    finish() {
     this.stopBarAnimation();
     if(this.state.stopwatchStart) {
         this.toggleStopwatch();
     }
     this.resetStopwatch();
     this.refs.recorder.pause();
     this.setState({recording: false, limitReached: true, nbSegments: ++this.state.nbSegments});
     setTimeout(() => { this.save() }, 500);
     setTimeout(() => { this.reset() }, 1000);
    }

    reset() {
     this.resetBarAnimation();
     this.refs.recorder.removeAllSegments();
     this.setState({
       recording: false,
       nbSegments: 0,
       currentDuration: 0,
       limitReached: false
     });
    }

    save() {
        this.refs.recorder.save((err, url) => {
            console.log('url = ', url);
            this.setState({url: url});
            CameraRoll.saveToCameraRoll(this.state.url)
                .then(r => this.props.navigation.dispatch({ type: r }))
        });
        // this.props.navigation.dispatch({ type: this.state.url})
        setTimeout(() => { this.props.navigation.dispatch({ type: 'Video' }) }, 10000)
    }


    //flash toggling not currently working.
    //see issue: https://github.com/maxs15/react-native-screcorder/issues/26

    //  toggleFlash() {
    //    if (this.state.config.flashMode == Recorder.constants.SCFlashModeOff) {
    //      this.state.config.flashMode = Recorder.constants.SCFlashModeLight;
    //    } else {
    //      this.state.config.flashMode = Recorder.constants.SCFlashModeOff;
    //    }
    //
    //    this.setState({config: this.state.config});
    //  }

    toggleSettings() {
      settings = !this.state.settingsVisible ? require('../img/settingson.png') : require('../img/settings.png');
      this.setState({ settingsVisible: !this.state.settingsVisible });
    }

    toggleStopwatch() {
      this.setState({ overlay: {final: finalTime, right: rightTime, left: leftTime} });
      // console.log('toggle');
      // console.log(this.state.overlay);
      if (this.state.stopwatchStart) {
          if (this.state.stopwatchLap) {
              this.setState({stopwatchLap: false});
              this.setState({stopwatchStart: false, stopwatchReset: false});
              time = require('../img/time.png');
          } else {
              this.setState({stopwatchLap: true});
          }
      } else {
          this.setState({stopwatchStart: true, stopwatchReset: false});
          time = require('../img/timeon.png');
      }
    }

    resetStopwatch() {
        this.setState({ overlay: {final: finalTime, right: rightTime, left: leftTime} });
        // console.log('reset');
        // console.log(this.state.overlay);
        time = require('../img/time.png')
        this.setState({stopwatchStart: false, stopwatchReset: true, stopwatchLap: false});
    }

    getFormattedTime(final, right, left) {
        finalTime = final;
        rightTime = right;
        leftTime = left;
        // console.log('formatted');
        // console.log(finalTime);
    }

    toggleFlash() {
        if(this.state.flashMode === 0){
          this.setState({flashMode: 2});
          flash = require('../img/auto.png')
        }
        if(this.state.flashMode === 1){
          this.setState({flashMode: 0});
          flash = require('../img/off.png')
        }
        if(this.state.flashMode === 2){
          this.setState({flashMode: 1});
          flash = require('../img/on.png')
        }
    }

    toggleSave() {
        if(this.state.saveMode === true) {
          this.setState({saveMode: false});
          save = require('../img/nosave.png')
        }
        if(this.state.saveMode === false) {
          this.setState({saveMode: true});
          save = require('../img/save.png')
        }
    }

    render() {
     return (
       <Recorder
          ref="recorder"
          flash={this.state.flash}
          config={this.state.config}
          overlay={this.state.overlay}
          device={this.state.device}
          style={styles.wrapper}>
          <TouchableOpacity onPress={this.toggleStopwatch.bind(this)} onLongPress={this.resetStopwatch.bind(this)} style={styles.fullScreen}>
          <View style={styles.container}>
              <View style={styles.options}>
                <View style={styles.header}>
                  <TouchableHighlight onPress={this.toggleSettings.bind(this)} underlayColor={'#0000'}>
                    <Image
                      style={styles.settings}
                      source={settings}
                    />
                  </TouchableHighlight>
                  <View style={styles.stopwatch}>
                    <Image source={record} style={styles.record}/>
                    <Stopwatch msecs laps start={this.state.stopwatchStart}
                      reset={this.state.stopwatchReset}
                      lap={this.state.stopwatchLap}
                      getTime={this.getFormattedTime}
                    />

                  </View>
                </View>

              </View>
              <View style={styles.tray}>
                <View>
                  <Image
                    style={styles.actionButton}
                    source={time}
                  />
                </View>
                <View>
                  <TouchableHighlight
                    onPress={this.toggleRecord.bind(this)}
                    underlayColor={'#0000'}>
                    <Image
                      style={styles.recordButton}
                      source={recordbutton}
                    />
                  </TouchableHighlight>
                </View>
                <View>
                  <TouchableHighlight
                    onPress={() => this.props.navigation.dispatch({ type: 'Gallery'})}
                    underlayColor={'#0000'}>
                    <Image
                      style={styles.actionButton}
                      source={gallery}
                    />
                  </TouchableHighlight>
                </View>
              </View>
          </View>
          <View style={styles.barWrapper}>
            <Animated.View style={[styles.barGauge, {width: this.state.barPosition}]}/>
          </View>
          </TouchableOpacity>
          <Modal
            animationType={"none"}
            transparent={true}
            visible={this.state.settingsVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}>
            <TouchableOpacity onPress={this.toggleSettings.bind(this)} style={styles.fullScreen}>
              <View style={styles.dropdown}>
                <TouchableHighlight onPress={this.toggleSettings.bind(this)} underlayColor={'#0000'}>
                  <Image
                    style={styles.settings}
                    source={settings}
                  />
                </TouchableHighlight>
                <TouchableHighlight onPress={this.toggleFlash.bind(this)} underlayColor={'#0000'}>
                  <Image
                    style={styles.settings}
                    source={flash}
                  />
                </TouchableHighlight>
                <TouchableHighlight onPress={this.toggleSave.bind(this)} disabled={true} underlayColor={'#0000'}>
                  <Image
                    style={styles.save}
                    source={save}
                  />
                </TouchableHighlight>
              </View>
            </TouchableOpacity>
          </Modal>
        </Recorder>
     );
    }
}

module.exports = (Camera);
