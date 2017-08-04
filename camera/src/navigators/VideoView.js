import React from 'react';
import { View, TouchableOpacity, Image, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import VideoPlayer from '../components/VideoPlayer';
import styles from '../styles/styleV';


const VideoView = ({ navigation, path }) => (
  <View style={styles.top}>
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
