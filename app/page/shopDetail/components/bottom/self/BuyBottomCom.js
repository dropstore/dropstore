/**
 * @file 抢购底部组件
 * @date 2019/8/22 15:17
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageBackground from '../../../../../components/ImageBackground';
import Images from '../../../../../res/Images';
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
  _setBuyBottomText = (isOnPress = true) => {
    const { shopInfo, navigation } = this.props;
    const activityId = shopInfo.activity.id;
    const is_join = shopInfo.is_join;
    if (is_join === ShopConstant.NOT_JOIN) {
      if (isOnPress) {
        this._showOver();
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
        doBuy(false, activityId, navigation, shopInfo);
      } else {
        return '助攻抢购';
      }
    }
  };

  _showOver = () => {
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
        <ImageBackground
          style={bottomStyle.buttonOnlyOneChildView}
          source={Images.bg_right}
          onPress={debounce(this._setBuyBottomText)}
        >
          <Text style={bottomStyle.buttonText}>{this._setBuyBottomText(false)}</Text>
        </ImageBackground>
      </View>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(BuyBottomCom));
