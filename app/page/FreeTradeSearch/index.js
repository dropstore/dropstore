import React, { PureComponent } from 'react';
import {
  View, TextInput, StyleSheet, Text,
} from 'react-native';
import { Image, KeyboardDismiss, FreeTradeList } from '../../components';
import Dropdown from '../FreeTradeDetail/component/Dropdown';

export default class FreeTrade extends PureComponent {
  constructor(props) {
    super(props);
    this.options = [
      { id: '1', title: '分类' },
      { id: '2', title: '货品' },
      { id: '3', title: '用户' },
    ];
    this.state = {
      params: { type: 1 },
    };
  }

  filter = (params) => {
    this.setState({ params });
  }

  render() {
    const { params } = this.state;
    const List = {
      1: <Text>123</Text>,
      2: <FreeTradeList
        itemOnPress={this.itemOnPress}
        style={{ flex: 1 }}
        type="freeTradeIndex"
        params={{ type: 1 }}
        showPrice
      />,
      3: <Text>789</Text>,
    }[params.type];
    return (
      <KeyboardDismiss style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
          <View style={styles.inputWrapper}>
            <Image source={require('../../res/image/search.png')} style={{ height: 12, width: 12 }} />
            <TextInput
              style={styles.input}
              placeholder="搜索"
              selectionColor="#00AEFF"
              placeholderTextColor="#D6D6D6"
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={(text) => { this.link_name = text; }}
            />
          </View>
          <Dropdown filter={this.filter} index="type" options={this.options} defaultValue={this.options[0]} width={60} />
        </View>
        {List}
      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
    borderRadius: 2,
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    paddingLeft: 10,
    flex: 1,
    marginRight: 20,
  },
  input: {
    flex: 1,
    fontSize: 12,
    marginLeft: 8,
  },
});
