import React, { Component } from 'react'

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
  StatusBar
} from 'react-native'

import Share from 'react-native-share';
import RNFetchBlob from 'react-native-fetch-blob';

let styles
const { width, height } = Dimensions.get('window')

class Gallery extends Component {

  state = {
    modalVisible: false,
    photos: [],
    index: null
  }

  setIndex = (index) => {
    if (index === this.state.index) {
      index = null
    }
    this.setState({ index })
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All'
    })
    .then(r => this.setState({ photos: r.edges }))
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  navigate = () => {
    const { navigate } = this.props.navigation
    navigate('ImageBrowser')
  }

  share = () => {
    const image = this.state.photos[this.state.index].node.image.uri
    console.log(image)
    RNFetchBlob.fs.readFile(image, 'base64')
    .then((data) => {
      let shareOptions = {
        //title: "React Native Share Example",
        message: "Check out this photo!",
        url: `data:image/jpg;base64,${data}`,
        //subject: "Check out this photo!"
      }

      Share.open(shareOptions)
        .then((res) => console.log('res:', res))
        .catch(err => console.log('err', err))
    })
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
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log('closed')}
        >
          <View style={styles.modalContainer}>
          <StatusBar translucent={false} barStyle="dark-content" />
            <Button
              title='Back'
              onPress={this.toggleModal}
              //style={ margin: 10 }
            />
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
                          height: width/3
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
                <View style={styles.shareButton}>
                  <Button
                      title='Share'
                      onPress={this.share}
                    />
                </View>
              )
            }
          </View>
        </Modal>
      </View>
    )
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  modalContainer: {
    paddingTop: 20,
    flex: 1,
    alignItems: 'flex-start'
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  galleryButton: {
    flex:0,
    width: 25,
    height: 25,
    marginBottom: 35,
    marginLeft: 10,
    backgroundColor: '#0000'

  },
  shareButton: {
    position: 'absolute',
    width,
    padding: 10,
    bottom: 0,
    left: 0
  }
})

export default Gallery
