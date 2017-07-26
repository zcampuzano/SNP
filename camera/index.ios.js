import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
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

3. save to folder
5. embed time in video
7. logo/splash screen

////////////////////////////////////////////////////////////
*/

AppRegistry.registerComponent('camera', () => Index);
export default Index;
