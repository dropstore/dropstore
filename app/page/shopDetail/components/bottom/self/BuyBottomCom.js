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
import {doBuy, doHelpBuy, doBuyNow} from "../../../../../redux/actions/shopDetailInfo";

class BuyBottomCom extends PureComponent {
  constructor(props) {
    super(props);
  }

  _setBuyBottomText = (isOnPress) => {
    const {shopInfo, navigation} = this.props;
    let activityId = shopInfo.activity.id;
    let is_join = shopInfo.is_join;
    if (is_join === ShopConstant.NOT_JOIN) {
      if (isOnPress) {
        alert('挑选鞋码')
      } else {
        return '选择尺码';
      }
    } else if (is_join === ShopConstant.LEADING) {
      if (isOnPress) {
        doBuy(true, activityId, navigation, shopInfo);
      } else {
        return '立即抢购';
      }
    } else if (is_join === ShopConstant.MEMBER) {
      if (isOnPress) {
        doHelpBuy(activityId).then((res) => {
          let data = res.data;
          if (data) {
            navigation.push('panicStatus', {shopInfo: shopInfo})
          }
        })
      } else {
        return '助攻抢购';
      }
    }
  };

  render() {
    return (
      <View style={bottomStyle.bottomView}>
        <ImageBackground style={bottomStyle.buttonOnlyOneChildView} source={Images.bg_right}
                         onPress={() => this._setBuyBottomText(true)}>
          <Text style={bottomStyle.buttonText}>{this._setBuyBottomText(false)}</Text>
        </ImageBackground>
      </View>
    );
  }
}


export default withNavigation(BuyBottomCom);
