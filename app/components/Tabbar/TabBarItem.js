import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { YaHei } from '../../res/FontFamily';

const activeSize = 25;
const inactiveSize = 12;

class TabBarItem extends PureComponent {
  render() {
    const {
      item, index, onPress, activeIndex,
    } = this.props;
    const focused = activeIndex === index;
    return (
      <TouchableOpacity style={styles.wrapper} onPress={() => onPress(index)}>
        <Text style={{
          padding: 0,
          includeFontPadding: false,
          fontSize: focused ? activeSize : inactiveSize,
          textAlign: 'center',
          fontFamily: YaHei,
          paddingBottom: focused ? 0 : 2,
          fontWeight: focused ? 'bold' : 'normal',
          color: '#272727',
        }}
        >
          {item.title}
        </Text>
        {/* <Animated.Text
          style={{
            padding: 0,
            includeFontPadding: false,
            fontSize: inactiveSize,
            transform: [{ scale, translateY }],
            textAlign: 'center',
          }}
        >
          {item.title}
        </Animated.Text> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-end',
  },
});

export default TabBarItem;
