/**
 * @file 商品列表组件
 * @date 2019/8/17 19:38
 * @author ZWW
 */

import React, {PureComponent} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {withNavigation} from "react-navigation";
import ScaleView from '../../../components/ScaleView'
import {px2Dp} from '../../../utils/ScreenUtil';
import Colors from '../../../res/Colors';

class ShopListItemCom extends PureComponent {

  render() {
    const {shopList} = this.props;
    return (
      <ScaleView style={_styles.scaleView}>
        <View style={_styles.containerView}>
          <Image style={{
            width: px2Dp(25),
            height: px2Dp(25),
            marginTop: px2Dp(10)
          }} source={shopList.leftImage}/>
          <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{ marginLeft: px2Dp(15)}}>
              <View>
                <Text style={_styles.shopTitle}>
                  {shopList.shopTitle}
                </Text>
              </View>
              <View>
                <Text style={_styles.shopTitle}>
                  {shopList.shopSubTitle}
                </Text>
              </View>
              <View style={{marginTop: px2Dp(20),}}>
                <Text style={_styles.price}>
                  {shopList.price}￥
                </Text>
              </View>
              <View style={{marginTop: px2Dp(5),}}>
                <Text style={_styles.shopTitle}>
                  {shopList.time}
                </Text>
              </View>
            </View>
            <View style={{marginLeft:px2Dp(30)}}>
              <Image style={{width: px2Dp(184), height: px2Dp(98),}}
                     resizeMode={'cover'} source={shopList.shoe}/>
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Image style={_styles.statusImage} resizeMode={'cover'} source={shopList.statusImage}/>
          </View>
        </View>
      </ScaleView>
    )
  }
}

const _styles = StyleSheet.create({
  scaleView: {
    marginHorizontal: px2Dp(10),
    marginTop: px2Dp(10),
    marginBottom: px2Dp(10)
  },
  containerView: {
    backgroundColor: Colors.WHITE_COLOR,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: px2Dp(5)
  },
  statusImage: {
    width: px2Dp(29),
    height: px2Dp(29),
    marginTop: px2Dp(10)
  },
  shopTitle: {
    fontSize: 13,
    color: Colors.NORMAL_TEXT_0,
    fontFamily: 'HiraginoSansGB',
  },
  price: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'Microsoft YaHei UI',
    color: Colors.NORMAL_TEXT_0,
  },
  showTime: {
    fontSize: 13,
    fontWeight: '300',
    fontFamily: 'Segoe UI',
    color: Colors.NORMAL_TEXT_0,
    lineHeight: px2Dp(9)
  }
});
export default withNavigation(ShopListItemCom);
