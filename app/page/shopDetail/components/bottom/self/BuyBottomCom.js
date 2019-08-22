/**
 * @file 抢购底部组件
 * @date 2019/8/22 15:17
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import ImageBackground from '../../../../../components/ImageBackground';
import Images from '../../../../../res/Images';
import {bottomStyle} from '../../../../../res/style/BottomStyle';
import ShopConstant from "../../../../../common/ShopConstant";

class BuyBottomCom extends PureComponent {
  constructor(props) {
    super(props);
  }

  _setBuyBottomText = (shopInfo, isOnPress) => {
    let is_join = shopInfo.is_join;
    if (is_join === ShopConstant.NOT_JOIN) {
      if (isOnPress) {
        alert('挑选鞋码')
      } else {
        return '挑选鞋码';
      }
    } else if (is_join === ShopConstant.LEADING) {
      if (isOnPress) {
        alert('抢鞋')
      } else {
        return '抢鞋';
      }
    } else if (is_join === ShopConstant.MEMBER) {
      if (isOnPress) {
        alert('帮忙抢鞋')
      } else {
        return '帮忙抢鞋';
      }
    }
  };

  render() {
    const {shopInfo} = this.props;
    return (
      <View style={bottomStyle.bottomView}>
        <ImageBackground style={bottomStyle.buttonOnlyOneChildView} source={Images.bg_right}
                         onPress={() => this._setBuyBottomText(shopInfo, true)}>
          <Text style={bottomStyle.buttonText}>{this._setBuyBottomText(shopInfo, false)}</Text>
        </ImageBackground>
      </View>
    );
  }
}


export default withNavigation(BuyBottomCom);
