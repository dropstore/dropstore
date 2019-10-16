import React, { PureComponent } from 'react';
import {
  View, TextInput, StyleSheet, Text,
} from 'react-native';
import { Image, KeyboardDismiss, FreeTradeList } from '../../components';
import Dropdown from '../FreeTradeDetail/component/Dropdown';
import UserList from './UserList';
import { debounceDelay } from '../../utils/commonUtils';

export default class FreeTrade extends PureComponent {
  constructor(props) {
    super(props);
    this.options = [
      { id: 'brand', title: '分类' },
      { id: 'goods', title: '货品' },
      { id: 'user', title: '用户' },
    ];
    this.state = {
      filterType: 'brand',
      text: '',
    };
  }

  filter = ({ filterType }) => {
    this.setState({ filterType });
  }

  onChangeText = (text) => {
    const { filterType } = this.state;
    this.setState({ text });
    if (filterType === 'goods') {
      this.freeTradeList && this.freeTradeList.fetchData(null, { goods_name: text });
    } else if (filterType === 'user') {
      this.userList && this.userList.fetchData(null, { user_name: text });
    }
  }

  render() {
    const { filterType, text } = this.state;
    const { navigation } = this.props;
    const List = {
      brand: <Text>123</Text>,
      goods: <FreeTradeList
        type="freeTradeSearch"
        navigation={navigation}
        autoFetch={false}
        ref={(v) => { this.freeTradeList = v; }}
      />,
      user: <UserList
        navigation={navigation}
        ref={(v) => { this.userList = v; }}
      />,
    }[filterType];
    return (
      <KeyboardDismiss style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.inputWrapper}>
            <Image source={require('../../res/image/search.png')} style={{ height: 12, width: 12 }} />
            <TextInput
              style={styles.input}
              placeholder="搜索"
              selectionColor="#00AEFF"
              placeholderTextColor="#D6D6D6"
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={debounceDelay(this.onChangeText)}
            />
          </View>
          <Dropdown filter={this.filter} index="filterType" options={this.options} defaultValue={this.options[0]} width={60} />
        </View>
        {text.length > 0 && List}
      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    marginBottom: 14,
  },
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
