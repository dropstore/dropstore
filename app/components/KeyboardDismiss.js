import React, { PureComponent } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

export default class NameAge extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    );
  }
}
