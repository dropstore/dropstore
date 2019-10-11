import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { YaHei } from '../../res/FontFamily';

const activeColor = 51;
const inactiveColor = 137;

class TabBarItem extends PureComponent {
  render() {
    const {
      item, index, onPress, itemMargin, isLastItem, position, fontSize, sidePadding,
    } = this.props;
    const isFirst = index === 0;
    const inputRange = isFirst ? [0, 1] : isLastItem ? [index - 1, index] : [index - 1, index, index + 1];
    const R = inputRange.length > 1 ? Animated.round(
      Animated.interpolate(position, {
        inputRange,
        outputRange: isFirst
          ? [activeColor, inactiveColor] : isLastItem
            ? [inactiveColor, activeColor] : [inactiveColor, activeColor, inactiveColor],
        extrapolate: 'clamp',
      }),
    ) : activeColor;
    const color = Animated.color(R, R, R);
    return (
      <TouchableOpacity onPress={() => onPress(index)}>
        <Animated.Text style={{
          fontSize,
          fontFamily: YaHei,
          color,
          marginRight: isLastItem ? sidePadding : itemMargin / 2,
          marginLeft: isFirst ? sidePadding : itemMargin / 2,
        }}
        >
          {item.title}
        </Animated.Text>
      </TouchableOpacity>
    );
  }
}

export default TabBarItem;
