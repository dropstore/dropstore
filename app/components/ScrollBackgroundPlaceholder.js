/* @flow */
import React, { PureComponent } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../common/Constant';

type Props = {
  y: any,
  backgroundColor: String,
};

export default class ScrollBackgroundPlaceholder extends PureComponent<Props> {
  render() {
    const { backgroundColor, y } = this.props;
    const translateY = y.interpolate({
      inputRange: [-SCREEN_HEIGHT, 0],
      outputRange: [0, -SCREEN_HEIGHT],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View style={[styles.style, {
        transform: [{ translateY }],
        backgroundColor: backgroundColor || '#fff',
        top: 0,
      }]}
      />
    );
  }
}

const styles = StyleSheet.create({
  style: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: 'absolute',
  },
});
