import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabBar, ShoeImageHeader } from '../../components';
import { wPx2P } from '../../utils/ScreenUtil';
import { YaHei, RuiXian } from '../../res/FontFamily';

export default class Header extends PureComponent {
  render() {
    const {
      item, routes, onIndexChange, indexScrollPosition,
    } = this.props;
    return (
      <View>
        <ShoeImageHeader item={item} />
        <TabBar
          style={styles.tabBar}
          routes={routes}
          position={indexScrollPosition}
          onIndexChange={onIndexChange}
        />
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
    lineHeight: 16,
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
