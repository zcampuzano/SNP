'use strict';

import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  CameraRoll,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Share from 'react-native-share';
import styles from '../styles/styleG';

const { width, height } = Dimensions.get('window');

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalVisible2: false,
      photos: [],
      index: null,
      video: '',
    };
    this.getPhotos()
  }

  setIndex(index) {
    if (index === this.state.index) {
      index = null
    }
    this.setState({ index })
  }

  getPhotos() {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Videos'
    })
    .then(r => this.setState({ photos: r.edges }))
  }

  cancel() {
      this.setState({ index: null });
  }

  share() {
    this.state.video = this.state.photos[this.state.index].node.image.uri;
    console.log(video);
    let shareOptions = {
      message: "Check out this video I made with stopNwatch!",
      url: this.state.video,
    };

    Share.open(shareOptions)
      .then((res) => console.log('res:', res))
      .catch(err => console.log('err', err))
  }

  playVideo() {
    this.state.video = this.state.photos[this.state.index].node.image.uri;
    this.props.navigation.dispatch({ type: 'Video' });
    this.props.navigation.dispatch({ type: this.state.video })

  }

  render() {
    console.log('state :', this.state);

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}>
          {
            this.state.photos.map((p, i) => {
              return (
                <TouchableHighlight
                  style={{opacity: i === this.state.index ? 0.5 : 1}}
                  key={i}
                  underlayColor='transparent'
                  onPress={() => this.setIndex(i)}
                >
                  <Image
                    style={{
                      width: width/3,
                      height: width/3,
                      borderWidth: 0.5,
                      backfaceVisibility: 'hidden',
                      borderColor: '#fff'
                    }}
                    source={{uri: p.node.image.uri}}
                  />
                </TouchableHighlight>
              )
            })
          }
        </ScrollView>
        {
          this.state.index !== null  && (
            <View style={styles.shadow}>
              <View style={styles.actionTray}>
                <TouchableOpacity onPress={this.share.bind(this)}>
                  <Image source={require('../img/share.png')} style={styles.actionButton}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.playVideo.bind(this)}>
                  <Image source={require('../img/play.png')} style={styles.actionButton}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.cancel.bind(this)}>
                  <Image source={require('../img/cancel.png')} style={styles.actionButton}/>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
      </View>
    )
  }
}

module.exports = (Gallery);
