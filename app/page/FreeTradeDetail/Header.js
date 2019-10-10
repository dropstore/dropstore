import React, { PureComponent } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import { Image, Price } from '../../components';
import { wPx2P } from '../../utils/ScreenUtil';
import { YaHei } from '../../res/FontFamily';

export default class Header extends PureComponent {
  render() {
    const {
      item, routes, index, onIndexChange,
    } = this.props;
    return (
      <View>
        <View style={styles.container}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <Text style={styles.title}>{item.goods_name}</Text>
            <View style={{ alignItems: 'flex-end' }}>
              {item.price * 1 > 0 ? <Price price={item.price} /> : <Text style={{ fontSize: 12, color: '#666' }}>暂无报价</Text>}
            </View>
          </View>
        </View>
        <View style={styles.tabBar}>
          {
            routes.map((item, i) => {
              const focused = i === index;
              return (
                <TouchableOpacity key={item.key} style={{ justifyContent: 'flex-end' }} onPress={() => onIndexChange(i)}>
                  <Text style={[styles.text, {
                    fontSize: focused ? 25 : 12,
                    bottom: focused ? -2.5 : 0,
                    fontWeight: focused ? 'bold' : 'normal',
                    marginLeft: i === 0 ? 0 : 10,
                  }]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })
          }
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
    fontSize: 12,
    textAlign: 'justify',
  },
  tabBar: {
    height: 50,
    flexDirection: 'row',
    paddingBottom: 6,
    paddingHorizontal: 9,
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
