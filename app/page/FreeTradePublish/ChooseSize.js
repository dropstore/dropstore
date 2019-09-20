import React, { PureComponent } from 'react';
import { Text } from 'react-native';

export default class ChooseSize extends PureComponent {
  render() {
    const { navigation } = this.props;
    console.log(navigation.getParam('item'));
    return <Text>选鞋码</Text>;
  }
}
