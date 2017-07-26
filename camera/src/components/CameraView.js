import React from 'react';
import { StyleSheet, Dimensions, View, Button, TouchableHighlight, Image, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Cam from './Cam';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  cameraContainer: {
    flex: 1,
    width: width,
    height: height,
  },
  gallery: {
    flex: 1,
    position: 'absolute',
    marginLeft: width-55,
    marginTop: height-55
  },
  galleryButton: {
    flex:0,
    width: 30,
    height: 30,
    backgroundColor: '#0000'
  },
});

const CameraView = ({ navigation }) => (
  <View style={styles.container}>
    <StatusBar translucent={true} barStyle="light-content" />
    <View style={styles.cameraContainer}>
      <Cam navigation={navigation} />
      <View style={styles.gallery}>
        <TouchableHighlight
          onPress={() => navigation.dispatch({ type: 'Gallery'})}
          underlayColor={'#0000'}
        >
          <Image
            style={styles.galleryButton}
            source={require('../img/gallery.png')}
          />
        </TouchableHighlight>
      </View>
    </View>
  </View>
);

CameraView.navigationOptions = {
    header: null,
};

CameraView.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CameraView;
