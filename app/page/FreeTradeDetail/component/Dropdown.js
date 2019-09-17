import React, { PureComponent } from 'react';
import {
  TouchableOpacity, Text, StyleSheet, View, Animated,
} from 'react-native';
import {
  Menu, MenuOptions, MenuOption, MenuTrigger,
} from 'react-native-popup-menu';

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
      <Menu>
        <MenuTrigger text="Select action" />
        <MenuOptions>
          <MenuOption onSelect={() => alert('Save')} text="Save" />
          <MenuOption onSelect={() => alert('Delete')}>
            <Text style={{ color: 'red' }}>Delete</Text>
          </MenuOption>
          <MenuOption onSelect={() => alert('Not called')} disabled text="Disabled" />
        </MenuOptions>
      </Menu>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
});
