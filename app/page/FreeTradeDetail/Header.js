import React, { PureComponent } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import { TabBar, ShoeImageHeader } from '../../components';
import { wPx2P } from '../../utils/ScreenUtil';
import { YaHei, RuiXian } from '../../res/FontFamily';

export default class Header extends PureComponent {
  toRules = () => {
    const { navigation } = this.props;
    navigation.navigate('ImagePage', {
      images: [
        { source: require('../../res/image/freeTradeRules.png'), style: { width: 375, height: 730 } }],
      title: '交易规则',
    });
  }

  render() {
    const {
      item, routes, onIndexChange, indexScrollPosition,
    } = this.props;
    return (
      <View>
        <ShoeImageHeader item={item} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TabBar
            style={styles.tabBar}
            routes={routes}
            position={indexScrollPosition}
            onIndexChange={onIndexChange}
          />
          <TouchableOpacity onPress={this.toRules}>
            <Text style={{ marginRight: 20, fontSize: 12, color: '#333' }}>规则说明</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 9,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginTop: 8,
    flexDirection: 'row',
    padding: 12,
  },
  image: {
    height: wPx2P(97),
    width: wPx2P(166),
    marginRight: 10,
  },
  title: {
    textAlign: 'justify',
    fontFamily: RuiXian,
    fontSize: 15,
    lineHeight: 17,
  },
  tabBar: {
    height: 42,
    flexDirection: 'row',
    paddingTop: 14,
  },
  text: {
    padding: 0,
    includeFontPadding: false,
    textAlign: 'center',
    fontFamily: YaHei,
    position: 'relative',
    color: '#272727',
    marginRight: 10,
  },
});
