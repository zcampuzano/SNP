import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppReducer from './src/reducers/AppReducer';
import AppWithNavigationState from './src/navigators/AppNavigator';

class Index extends Component {
  store = createStore(AppReducer);

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

/*
/////////////////////////TO DO//////////////////////////////

!- Stopwatch overlay
!- Save to Album - CameraRollExtended needs to be updated with Photos Library... AssetsLibrary deprecated
!- Landscape mode - figure out best method (testing) - possibly only allow landscape in video playback
!- Logo/Splash screen (christian)

////////////////////////////////////////////////////////////
*/

AppRegistry.registerComponent('camera', () => Index);
export default Index;
