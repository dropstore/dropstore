import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FadeImage from '../FadeImage';
import ScaleView from '../ScaleView';
import Price from '../Price';
import Image from '../Image';
import { getScreenWidth } from '../../common/Constant';
import { wPx2P } from '../../utils/ScreenUtil';
import Colors from '../../res/Colors';
import Styles from '../../res/style';

export default class ListItem extends PureComponent {
  onPress = () => {
    const { item, onPress } = this.props;
    onPress(item);
  }

  render() {
    const {
      item, notShowCount, showPrice, index, isCurrentItem,
    } = this.props;
    return (
      <ScaleView onPress={this.onPress} style={{ ...styles.container, marginLeft: index % 2 === 1 ? 8 : 9 }}>
        <Text numberOfLines={2} style={Styles.listTitle}>{item.goods_name}</Text>
        <FadeImage source={{ uri: item.icon }} style={styles.shoe} />
        {
          showPrice && (
            <View style={styles.bottom}>
              {
                item.price > 0 ? (
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Price offsetBottom={2} price={item.price} />
                    <Text style={styles.qi}>起</Text>
                  </View>
                ) : <Text style={{ fontSize: 11, color: '#666' }}>暂无报价</Text>
              }
              {
                !notShowCount && <Text style={{ fontSize: 11 }}>{`${item.buy_num}人已购买`}</Text>
              }
            </View>
          )
        }
        { isCurrentItem && <Image style={styles.chooseIcon} source={require('../../res/image/chooseIcon.png')} /> }
      </ScaleView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 7,
    width: (getScreenWidth() - 26) / 2,
    borderRadius: 2,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  shoe: {
    width: wPx2P(129),
    height: wPx2P(80),
    alignSelf: 'center',
    marginTop: 5,
  },
  qi: {
    fontSize: 9,
    color: Colors.YELLOW,
    marginLeft: 3,
    fontWeight: '500',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  chooseIcon: {
    height: 17,
    width: 17,
    position: 'absolute',
    right: 0,
  },
});
