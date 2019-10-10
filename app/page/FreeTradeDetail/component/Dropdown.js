/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  TouchableOpacity, Text, StyleSheet, ScrollView,
} from 'react-native';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Image } from '../../../components';
import Images from '../../../res/Images';

export default class Dropdown extends PureComponent {
  constructor(props) {
    super(props);
    const { defaultValue, index } = this.props;
    this.title = index === 'size_id' ? 'size' : 'title';
    this.state = {
      text: defaultValue?.[this.title],
    };
  }

  open = () => {
    this.menu.open();
  }

  onSelect = (v) => {
    const { filter, index } = this.props;
    this.setState({ text: v[this.title] });
    this.menu.close();
    filter({ [index]: v.id });
  }

  render() {
    const { text } = this.state;
    const { options, width } = this.props;
    return (
      <Menu ref={(v) => { this.menu = v; }} style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={this.open} style={styles.touch}>
          <Text style={styles.outPrice}>{text}</Text>
          <Image source={Images.arrowDownRed} style={styles.arrowDownRed} />
        </TouchableOpacity>
        <MenuTrigger customStyles={{ triggerOuterWrapper: { position: 'relative', top: 3 } }} />
        <MenuOptions
          renderOptionsContainer={() => (
            <ScrollView style={{ maxHeight: 216 }} showsVerticalScrollIndicator>
              {
                options.map((v, i) => (
                  <TouchableOpacity
                    key={v + i}
                    onPress={() => this.onSelect(v)}
                    style={[styles.title, { borderBottomWidth: i === options.length - 1 ? 0 : StyleSheet.hairlineWidth }]}
                  >
                    <Text style={{ fontSize: 13, color: '#333' }}>{v[this.title]}</Text>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
          )}
          customStyles={{ optionsContainer: { width: width || 53 } }}
        />
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
  title: {
    height: 36,
    marginHorizontal: 5,
    borderBottomColor: '#E3E3E3',
    justifyContent: 'center',
  },
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    justifyContent: 'flex-end',
  },
});
