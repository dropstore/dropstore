/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { YaHei } from '../../../res/FontFamily';
import Dropdown from './Dropdown';
import Colors from '../../../res/Colors';

export default class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filterType: 'all',
    };
  }

  filterOnPress = (v) => {
    const { filter } = this.props;
    this.setState({ filterType: v.key });
    filter(v);
  }

  render() {
    const { type, filter } = this.props;
    const { filterType } = this.state;
    const options1 = type === 'price' ? [
      { key: 'all', title: '全部尺码' },
      { key: '36', title: '36' },
      { key: '36.5', title: '36.5' },
      { key: '37', title: '37' },
      { key: '37.5', title: '37.5' },
      { key: '38', title: '38' },
      { key: '38.5', title: '38.5' },
      { key: '39', title: '39' },
      { key: '39.5', title: '39.5' },
      { key: '40', title: '40' },
      { key: '40.5', title: '40.5' },
    ] : [
      { key: 'all', title: '近期交易' },
      { key: '36', title: '一个月前' },
    ];
    const options2 = [
      { key: 'all', title: '全部' },
      { key: 'futures', title: '现货' },
      { key: 'inStock', title: '期货' },
    ];
    const btns = [
      { key: 'all', title: '综合' },
      { key: 'price', title: '价格' },
    ];
    return (
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.outPrice}>
            {'共 : '}
            <Text style={{ fontSize: 13, color: '#37B6EB', fontFamily: YaHei }}>15721</Text>
            {' 人出售'}
          </Text>
          <Dropdown filter={filter} options={options1} defaultValue={options1[0]} width={80} />
        </View>
        {
            type === 'price' && (
              <View style={styles.bottom}>
                <View style={{ flexDirection: 'row' }}>
                  {
                btns.map((v, i) => (
                  <TouchableOpacity
                    onPress={() => this.filterOnPress(v)}
                    key={`btns-${i}`}
                    style={{
                      width: 50,
                      alignItems: i === btns.length - 1 ? 'flex-end' : 'flex-start',
                      borderRightColor: '#E3E3E3',
                      borderRightWidth: i === btns.length - 1 ? 0 : StyleSheet.hairlineWidth,
                    }}
                  >
                    <View style={{ alignItems: 'center' }}>
                      <Text>{v.title}</Text>
                      <View style={[styles.zhishiqi, { backgroundColor: v.key === filterType ? Colors.OTHER_BACK : null }]} />
                    </View>
                  </TouchableOpacity>
                ))
              }
                </View>
                <Dropdown filter={filter} options={options2} defaultValue={options2[0]} width={60} />
              </View>
            )
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 2,
    marginHorizontal: 10,
  },
  header: {
    paddingHorizontal: 10,
    borderBottomColor: '#E3E3E3',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 36,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  outPrice: {
    fontSize: 12,
    color: '#272727',
  },
  bottom: {
    height: 36,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  zhishiqi: {
    width: 29,
    height: 1,
    borderRadius: 0.5,
  },
});
