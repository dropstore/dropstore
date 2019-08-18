/**
 * @file 商品列表组件
 * @date 2019/8/17 19:38
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import ScaleView from '../../../components/ScaleView';
import Image from '../../../components/Image';
import { px2Dp } from '../../../utils/ScreenUtil';
import Colors from '../../../res/Colors';

class ShopListItemCom extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <ScaleView style={_styles.scaleView}>
        <Image style={_styles.plusIcon} source={item.leftImage} />
        <View style={_styles.middle}>
          <View style={{ flex: 1 }}>
            <Text style={_styles.shopTitle}>{item.shopTitle}</Text>
            <Text style={_styles.shopTitle}>{item.shopSubTitle}</Text>
            <Text style={_styles.price}>{`${item.price}￥`}</Text>
            <Text style={_styles.time}>{item.time}</Text>
          </View>
          <Image resizeMode="contain" style={_styles.imageShoe} source={item.shoe} />
        </View>
        {
          item.statusImage && <Image style={_styles.statusImage} resizeMode="cover" source={item.statusImage} />
        }
      </ScaleView>
    );
  }
}

const _styles = StyleSheet.create({
  middle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  imageShoe: {
    width: 100,
    height: 60,
    right: 20,
    position: 'relative',
  },
  scaleView: {
    marginHorizontal: px2Dp(10),
    marginTop: px2Dp(10),
    marginBottom: px2Dp(10),
    backgroundColor: Colors.WHITE_COLOR,
    flexDirection: 'row',
    padding: 5,
    paddingBottom: 9,
  },
  statusImage: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 5,
    top: 5,
  },
  shopTitle: {
    fontSize: 10,
    color: Colors.NORMAL_TEXT_0,
    fontFamily: 'HiraginoSansGB',
  },
  showTime: {
    fontSize: 10,
    fontWeight: '300',
    fontFamily: 'Segoe UI',
    color: Colors.NORMAL_TEXT_0,
    lineHeight: px2Dp(9),
  },
  plusIcon: {
    width: 13,
    height: 13,
    marginRight: 9,
  },
  price: {
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Microsoft YaHei UI',
    color: Colors.NORMAL_TEXT_0,
    marginLeft: 3,
    marginTop: 20,
  },
  time: {
    fontSize: 10,
    color: '#999',
    marginTop: 7,
  },
});

export default withNavigation(ShopListItemCom);
