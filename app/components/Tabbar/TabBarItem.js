/* @flow */
import React, { PureComponent } from 'react';
import Animated from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';

type Props = {
  item: Object,
  index: number,
  position: any,
  onPress: Function,
  isFirst: boolean,
  isLast: boolean,
  activeStyle: Object,
  inactiveStyle: Object,
};

class TabBarItem extends PureComponent<Props> {
  render() {
    const {
      item, index, position, onPress, activeStyle, inactiveStyle, isFirst, isLast,
    } = this.props;
    const inputRange = isFirst ? [0, 1] : isLast ? [index - 1, index] : [index - 1, index, index + 1];
    const R = inputRange.length > 1 ? Animated.round(
      Animated.interpolate(position, {
        inputRange,
        outputRange: isFirst
          ? [activeStyle.color[0], inactiveStyle.color[0]] : isLast
            ? [inactiveStyle.color[0], activeStyle.color[0]] : [inactiveStyle.color[0], activeStyle.color[0], inactiveStyle.color[0]],
        extrapolate: 'clamp',
      }),
    ) : activeStyle.color[0];
    // const G = inputRange.length > 1 ? Animated.round(
    //   Animated.interpolate(position, {
    //     inputRange,
    //     outputRange: isFirst
    //       ? [activeStyle.color[1], inactiveStyle.color[1]] : isLast
    //         ? [inactiveStyle.color[1], activeStyle.color[1]] : [inactiveStyle.color[1], activeStyle.color[1], inactiveStyle.color[1]],
    //     extrapolate: 'clamp',
    //   }),
    // ) : activeStyle.color[1];
    // const B = inputRange.length > 1 ? Animated.round(
    //   Animated.interpolate(position, {
    //     inputRange,
    //     outputRange: isFirst
    //       ? [activeStyle.color[2], inactiveStyle.color[2]] : isLast
    //         ? [inactiveStyle.color[2], activeStyle.color[2]] : [inactiveStyle.color[2], activeStyle.color[2], inactiveStyle.color[2]],
    //     extrapolate: 'clamp',
    //   }),
    // ) : activeStyle.color[2];
    const color = Animated.color(R, R, R);
    return (
      <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => onPress(index)}>
        <Animated.Text
          style={{
            padding: 0,
            includeFontPadding: false,
            fontSize: inactiveStyle.fontSize,
            color,
            textAlign: 'center',
          }}
        >
          {item.title}
        </Animated.Text>
      </TouchableOpacity>
    );
  }
}

module.exports = TabBarItem;
