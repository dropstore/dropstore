import React, { PureComponent } from 'react';
import {
  TouchableOpacity, Text, StyleSheet, View, Animated,
} from 'react-native';

export default class Dropdown extends PureComponent {
  constructor(props) {
    super(props);
    const { defaultValue } = this.props;
    this.state = {
      text: defaultValue.title,
    };
  }

  render() {
    const { text } = this.state;
    return (
      <Animated.View style={[styles.container, { height: 36 }]}>
        <Text>{text}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
});
