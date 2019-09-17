/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  TouchableOpacity, Text, StyleSheet,
} from 'react-native';
import {
  Menu, MenuOptions, MenuOption, MenuTrigger,
} from 'react-native-popup-menu';
import { Image } from '../../../components';
import Images from '../../../res/Images';

export default class Dropdown extends PureComponent {
  constructor(props) {
    super(props);
    const { defaultValue } = this.props;
    this.state = {
      text: defaultValue.title,
    };
  }

  onSelect = (e) => {
    console.log(e);
  }

  render() {
    const { text } = this.state;
    const { options } = this.props;
    return (
      <Menu>
        <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.outPrice}>{text}</Text>
          <Image source={Images.arrowDownRed} style={styles.arrowDownRed} />
        </MenuTrigger>
        <MenuOptions>
          { options.map((v, i) => <MenuOption key={v + i} onSelect={() => this.onSelect(v)} text={v.title} />) }
        </MenuOptions>
      </Menu>
    );
  }
}

const styles = StyleSheet.create({
  arrowDownRed: {
    height: 17,
    width: 17,
    marginLeft: 13,
  },
  outPrice: {
    fontSize: 12,
    color: '#272727',
  },
});
