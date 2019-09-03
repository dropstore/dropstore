import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { YaHei } from '../../res/FontFamily';

const activeSize = 25;
const inactiveSize = 15;

class TabBarItem extends PureComponent {
  render() {
    const {
      item, index, onPress, activeIndex,
    } = this.props;
    return (
      <TouchableOpacity style={styles.wrapper} onPress={() => onPress(index)}>
        <Text style={{
          padding: 0,
          includeFontPadding: false,
          fontSize: activeIndex === index ? activeSize : inactiveSize,
          textAlign: 'center',
          fontFamily: YaHei,
          fontWeight: 'bold',
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
