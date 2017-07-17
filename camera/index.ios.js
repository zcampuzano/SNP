import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import CameraApp from './src/components/camera';
import { StackNavigator } from 'react-navigation';


class Index extends Component {
  render() {
    return (
          <CameraApp />
    )
  }
}

/*
/////////////////////////TO DO//////////////////////////////

1. landscape mode
      record and playback mode
2. video controls in instant playback
3. save to folder
5. embed time in video
7. logo/splash screen

////////////////////////////////////////////////////////////
*/

AppRegistry.registerComponent('camera', () => Index);
