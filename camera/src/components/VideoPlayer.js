'use strict';

import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated
} from 'react-native';

import Video from 'react-native-video';
import styles from '../styles/styleV';

const screen = Dimensions.get('window');

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      barPosition: new Animated.Value(0),
      paused: false,
      skin: 'custom',
      ignoreSilentSwitch: 'ignore',
      isBuffering: false,
      path: this.props.path,
      start: false,
    }
  }

  startBarAnimation() {
    this.animRunning = true;

    this.animBar = Animated.timing(
      this.state.barPosition,
      {
        toValue: screen.width,
        duration: (this.state.duration * 900) - (this.state.currentTime * 1000)
      }
    );
    this.animBar.start(() => {
      // The video duration limit has been reached
      if (this.animRunning) {
        this.stopBarAnimation();
        this.resetBarAnimation();
      }
    });
  }

  resetBarAnimation() {
    Animated.spring(this.state.barPosition, {toValue: 0}).start();

  }

  stopBarAnimation() {
    this.animRunning = false;
    if (this.animBar)
      this.animBar.stop();
  }

  onLoad(data) {
    console.log('On load fired!');
    this.setState({duration: data.duration});
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
    if(this.state.currentTime === 0) {
        this.startBarAnimation();
    }
  }

  onPause() {
    if(this.state.paused) {
      this.startBarAnimation();
      this.setState({start: true});
    } else {
      this.stopBarAnimation();
      this.setState({start: false});
    }
    this.setState({paused: !this.state.paused});
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }


  renderRateControl(rate) {
    const isSelected = (this.state.rate === rate);

    return (
      <TouchableOpacity onPress={() => { this.setState({rate: rate}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.fullScreen} onPress={this.onPause.bind(this)}>
          <Video
            source={this.state.path}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            ignoreSilentSwitch={this.state.ignoreSilentSwitch}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            onProgress={this.onProgress}
            repeat={true}
            rotate={true}
          />
        </TouchableOpacity>
        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              {this.renderRateControl(0.5)}
              {this.renderRateControl(1.0)}
              {this.renderRateControl(2.0)}
            </View>
          </View>
        </View>
        <View style={styles.track}>
          <View style={styles.barWrapper}>
            <Animated.View style={[styles.barGauge, {width: this.state.barPosition}]}/>
          </View>
        </View>
      </View>
    )
  }
}

module.exports =  (VideoPlayer);
