'use strict';

import React, { Component } from 'react';

import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  StyleSheet,
  Button,
  CameraRoll,
  Image,
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import Share from 'react-native-share';
//import RNFetchBlob from 'react-native-fetch-blob';
import VideoPlayer from './video';

const { width, height } = Dimensions.get('window');
const video = null;

class Gallery extends Component {
  constructor() {
    super()
    this.state = {
      modalVisible: false,
      modalVisible2: false,
      photos: [],
      index: null
    }
  }

  setIndex(index) {
    if (index === this.state.index) {
      index = null
    }
    this.setState({ index })
  }

  getPhotos() {
    CameraRoll.getPhotos({
      first: 50,
      assetType: 'Videos'
    })
    .then(r => this.setState({ photos: r.edges }))
  }

  cancel() {
      this.setState({ index: null });
  }

  toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  toggleModal2() {
    this.setState({ modalVisible2: !this.state.modalVisible2 });
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  navigate() {
    const { navigate } = this.props.navigation
    navigate('ImageBrowser')
  }

  share() {
    video = this.state.photos[this.state.index].node.image.uri
    console.log(video)
    let shareOptions = {
      message: "Check out this video I made with stopNwatch!",
      url: video,
    }

    Share.open(shareOptions)
      .then((res) => console.log('res:', res))
      .catch(err => console.log('err', err))
  }

  playVideo() {
    video = this.state.photos[this.state.index].node.image.uri
    this.toggleModal2()
  }

  render() {
    console.log('state :', this.state)
    return (
      <View >
        <TouchableHighlight
          onPress={() => { this.toggleModal(); this.getPhotos() }}
          underlayColor={'#0000'}
        >
          <Image
            style={styles.galleryButton}
            source={require('../img/gallery.png')}
          />
        </TouchableHighlight>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible2}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <View style={styles.videoContainer}>
            <View style={styles.video}>
                <VideoPlayer
                  source={{uri: video}}
                />
            </View>
            <View style={styles.videoBackButton}>
              <TouchableOpacity onPress={() => this.toggleModal2()}>
                <Image
                  style={styles.videoBack}
                  source={require('../img/back.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log('closed')}
        >
          <View style={styles.modalContainer}>
          <StatusBar translucent={false} barStyle="dark-content" />
            <View style={styles.header}>
              <Text style={styles.headerText}>gallery</Text>
            </View>
            <View style={styles.back}>
              <TouchableOpacity onPress={this.toggleModal.bind(this)}>
                <Image source={require('../img/black.png')} style={styles.backButton}/>
              </TouchableOpacity>
            </View>
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
        </Modal>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'

  },
  header: {
    height: 50,
    shadowColor: '#0001',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    //paddingTop: 20

  },
  shadow: {
    shadowColor: '#0001',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 1
  },
  headerText: {
    fontSize: 25,
    fontWeight: '200',
    textAlign: 'center',
    marginTop: 10
  },
  modalContainer: {
    paddingTop: 20,
    flex: 1,

  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  actionTray: {
    flex: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#0000',
    padding: 10,
  },
  galleryButton: {
    flex:0,
    width: 30,
    height: 30,
    margin: 25,
    backgroundColor: '#0000'
  },
  videoContainer: {
    flex: 1,
    alignItems: 'flex-start'
  },
  actionButton: {
    width: 27.5,
    height: 27.5,
  },
  video: {
    flex:1,
    position: 'absolute',
    width: width,
    height: height,
  },
  backButton: {
    flex: 0,
    width: 27.5,
    height: 27.5,
  },
  back: {
    position: 'absolute',
    marginLeft: 5,
    marginTop: 11,
    marginBottom: 0,
    paddingTop: 20,
  },
  videoBackButton: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  videoBack: {
    flex: 0,
    width: 27.5,
    height: 27.5,
    margin: 25,
    marginLeft: 5,
    backgroundColor: '#0000'
  },

})

module.exports = (Gallery);
