import React, { PureComponent } from 'react';
import {
  View, StyleSheet, Text, Animated,
} from 'react-native';
import Colors from '../../res/Colors';
import { getScreenWidth, getScreenHeight, STATUSBAR_AND_NAV_HEIGHT } from '../../common/Constant';

export default class Header extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Animated.View style={styles.container}>
        <Text>123</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // width,
  },
});
