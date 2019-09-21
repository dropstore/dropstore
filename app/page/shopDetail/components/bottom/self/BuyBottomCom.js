/**
 * @file 抢购底部组件
 * @date 2019/8/22 15:17
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { bottomStyle } from '../../../../../res/style/BottomStyle';
import ShopConstant from '../../../../../common/ShopConstant';
import { doBuy, getShoesList, getShopDetail } from '../../../../../redux/actions/shopDetailInfo';
import { getReShoesList, getShopDetailInfo } from '../../../../../redux/reselect/shopDetailInfo';
import SelectShoeSizeByUnJoinsCom from '../../other/SelectShoeSizeByUnJoinsCom';
import { debounce } from '../../../../../utils/commonUtils';
import { closeModalbox, showModalbox } from '../../../../../utils/MutualUtil';

function mapStateToProps() {
  return state => ({
    shopDetailInfo: getShopDetailInfo(state),
    shoesInfo: getReShoesList(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getShopDetail,
    getShoesList,
  }, dispatch);
}

class BuyBottomCom extends PureComponent {
  onPress = () => {
    const { shopInfo, navigation } = this.props;
    const activityId = shopInfo.activity.id;
    const is_join = shopInfo.is_join;
    if (is_join === ShopConstant.NOT_JOIN) {
      this.showOver();
    } else if (is_join === ShopConstant.LEADING) {
      doBuy(true, activityId, navigation, shopInfo);
    } else if (is_join === ShopConstant.MEMBER) {
      doBuy(false, activityId, navigation, shopInfo);
    }
  }

  buyBottomText = () => {
    const { shopInfo } = this.props;
    const is_join = shopInfo.is_join;
    if (is_join === ShopConstant.NOT_JOIN) {
      return '选择尺码';
    } if (is_join === ShopConstant.LEADING) {
      return '立即抢购';
    } if (is_join === ShopConstant.MEMBER) {
      return '助攻抢购';
    }
  };

  showOver = () => {
    const { shopInfo, getShoesList, navigation } = this.props;
    const shopId = shopInfo.activity.id;
    getShoesList(shopId).then((shoesList) => {
      if (shoesList) {
        if (shoesList && shoesList.length !== 0) {
          showModalbox({
            element: (<SelectShoeSizeByUnJoinsCom
              shopId={shopId}
              navigation={navigation}
              shopInfo={shopInfo}
              shoesList={shoesList}
              closeBox={this.closeBox}
            />),
            options: {
              style: {
                height: 400,
                backgroundColor: 'transparent',
              },
              position: 'bottom',
            },
          });
        }
      }
    });
  };

  closeBox = () => {
    closeModalbox();
  };

  render() {
    return (
      <View style={bottomStyle.bottomView}>
        <View />
        <TouchableOpacity style={[bottomStyle.buttonNormalView]} onPress={debounce(this.onPress)}>
          <Text style={bottomStyle.buttonText}>{this.buyBottomText()}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyBottomCom);
