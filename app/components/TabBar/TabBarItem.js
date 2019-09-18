import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { YaHei } from '../../res/FontFamily';

const activeSize = 25;
const inactiveSize = 12;

class TabBarItem extends PureComponent {
  render() {
    const {
      item, index, onPress, activeIndex, itemMargin, isLastItem,
    } = this.props;
    const focused = activeIndex === index;
    const margin = (itemMargin || 0) / 2;
    return (
      <TouchableOpacity style={styles.wrapper} onPress={() => onPress(index)}>
        <Text style={{
          padding: 0,
          includeFontPadding: false,
          fontSize: focused ? activeSize : inactiveSize,
          textAlign: 'center',
          fontFamily: YaHei,
          position: 'relative',
          bottom: focused ? -2.5 : 0,
          fontWeight: focused ? 'bold' : 'normal',
          color: '#272727',
          marginRight: isLastItem ? 0 : margin,
          marginLeft: index === 0 ? 0 : margin,
        }}
        >
          {item.title}
        </Text>
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
