import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import CameraView from './CameraView';
import GalleryView from './GalleryView';
import VideoView from './VideoView';

export const AppNavigator = StackNavigator({
  Camera: {
    screen: CameraView,
    mode: 'modal'
  },
  Gallery: {
    screen: GalleryView,
    mode: 'modal'
  },
  Video: {
    screen: VideoView,
    mode: 'modal'
  },

});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
