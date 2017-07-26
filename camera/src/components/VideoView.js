import React from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import VideoPlayer from './VideoPlayer';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  videoContainer: {
    flex: 1,
    width: width,
    height: height,
  },
  videoBackButton: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'absolute'
  },
  videoBack: {
    flex: 0,
    width: 27.5,
    height: 27.5,
    margin: 25,
    marginLeft: 5,
    backgroundColor: '#0000'
  },
});


const VideoView = ({ navigation, path }) => (
  <View style={styles.container}>
  <StatusBar translucent={true} barStyle="light-content" />
    <View style={styles.videoContainer}>
      <VideoPlayer navigation={navigation} path={{uri: path}}/>
      <View style={styles.videoBackButton}>
        <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.back())}>
          <Image
            style={styles.videoBack}
            source={require('../img/back.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

VideoView.navigationOptions = {
    header: null,
};


VideoView.propTypes = {
  navigation: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  path: state.path.path,
});

export default connect(mapStateToProps)(VideoView);
