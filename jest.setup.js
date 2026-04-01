/* eslint-env jest */

import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  mergeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-reanimated', () => {
  const React = require('react');
  const { View } = require('react-native');

  const AnimatedView = React.forwardRef((props, ref) =>
    React.createElement(View, { ...props, ref }, props.children),
  );

  const transition = {
    duration: () => transition,
  };

  return {
    __esModule: true,
    default: {
      View: AnimatedView,
      createAnimatedComponent: Component => Component,
    },
    View: AnimatedView,
    createAnimatedComponent: Component => Component,
    useSharedValue: value => ({ value }),
    useAnimatedStyle: callback => callback(),
    withTiming: value => value,
    runOnJS: fn => fn,
    FadeInDown: transition,
    FadeOutUp: transition,
    LinearTransition: transition,
  };
});
