/**
 * @file 商品基本信息组件
 * @date 2019/8/18 16:46
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import Image from '../../../../components/Image';
import Images from '../../../../res/Images';
import {YaHei, Mario} from '../../../../res/FontFamily';
import ShopConstant from "../../../../common/ShopConstant";
import {getShopDetailInfo} from '../../../../redux/reselect/shopDetailInfo';
import {checkTime} from "../../../../utils/TimeUtils";

function mapStateToProps() {
  return state => ({
    shopDetailInfo: getShopDetailInfo(state),
  });
}

class ShopBasicInfoCom extends PureComponent {

  _setTime = (shopInfo) => {
    // 活动类型
    let type = shopInfo.activity.type;
    let startText = (type === ShopConstant.ORIGIN_CONST ? "距发售时间:" : "距开始时间");
    // 活动开始时间
    let start_time = shopInfo.activity.start_time;
    // 活动结束时间
    let end_time = shopInfo.activity.end_time;
    if (checkTime(start_time)) {
      return (
        <Text style={_styles.overTitle}>{startText}{start_time}</Text>
      )
    } else {
      return (
        <Text style={_styles.overTitle}>距结束时间{end_time}</Text>
      )
    }
  };

  render() {
    const {shopDetailInfo} = this.props;
    const shopInfo = shopDetailInfo.shopData.data;
    return (
      <View>
        <View style={_styles.explainView}>
          <Image resizeMode="contain" style={_styles.explainImage} source={Images.jth}/>
          <Text style={_styles.explainText}>查看活动说明</Text>
        </View>
        <View style={_styles.mainView}>
          <Image resizeMode="contain" style={_styles.imageShoe} source={shopInfo.goods.image}/>
          <View style={_styles.overView}>
            {
              this._setTime(shopInfo)
            }
          </View>
          <Text style={_styles.shopTitle}>
            `
            {shopInfo.goods.goods_name}
            `
          </Text>
          <Text style={_styles.price}>{`${shopInfo.activity.price}￥`}</Text>
        </View>
      </View>
    );
  }
}

const _styles = StyleSheet.create({
  explainView: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
    top: 12,
  },
  explainImage: {
    width: 12,
    height: 10,
  },
  explainText: {
    color: 'rgba(107,107,107,1)',
    fontSize: 9,
    marginLeft: 3,
  },
  mainView: {
    marginTop: 19,
    alignItems: 'center',
  },
  imageShoe: {
    width: 251,
    height: 135,
    right: 20,
  },
  shopTitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    marginTop: 9,
  },
  overView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 21,
  },
  overTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: YaHei,
    color: 'rgba(194,0,0,1)',
  },
  overTime: {
    fontSize: 12,
    fontFamily: Mario,
    color: 'rgba(0,0,0,1)',
    marginLeft: 6,
  },
  price: {
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: YaHei,
    color: 'rgba(0,0,0,1)',
    marginTop: 21,
    // textDecorationLine: 'line-through',
    // textDecorationColor: 'rgba(0,0,0,1)',
  },
});
export default connect(mapStateToProps())(withNavigation(ShopBasicInfoCom))

