import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Camera');
const secondAction = AppNavigator.router.getActionForPathAndParams('Gallery');
const thirdAction = AppNavigator.router.getActionForPathAndParams('Video');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Gallery':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Gallery' }),
        state
      );
      break;
    case 'Camera':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Camera' }),
        state
      );
      break;
    case 'Video':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Video' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const initialPath = { path: '' };

function path(state = initialPath, action) {
  let path;
  if(action.type.length > 15) {
    return {state, path: action.type};
  } else {
    return state;
  }
}

const AppReducer = combineReducers({
  nav,
  path,
});

export default AppReducer;
