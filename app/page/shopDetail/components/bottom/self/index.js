/**
 * @file 自营底部组件
 * 抽签抢购公共部分
 * @date 2019/8/22 15:14
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Image from '../../../../../components/Image';
import ImageBackground from '../../../../../components/ImageBackground';
import SelectShoeSizeCom from '../../other/SelectShoeSizeCom';
import BuyBottomCom from './BuyBottomCom';
import Images from '../../../../../res/Images';
import Colors from '../../../../../res/Colors';
import {bottomStyle} from '../../../../../res/style/BottomStyle';
import ShopConstant from '../../../../../common/ShopConstant';
import {getReShoesList, getShopDetailInfo} from '../../../../../redux/reselect/shopDetailInfo';
import {getShoesList, getShopDetail} from '../../../../../redux/actions/shopDetailInfo';
import {checkTime} from '../../../../../utils/TimeUtils';
import commission from '../../../../commission';
import {shopDetail1} from '../../../../TempData';
import {debounce} from '../../../../../utils/commonUtils';
import {SCREEN_WIDTH} from '../../../../../common/Constant';
import {closeModalbox, showModalbox} from '../../../../../redux/actions/component';

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
    showModalbox,
    closeModalbox,
  }, dispatch);
}

class SelfBottomCom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      myShoesList: [],
    };
  }

  _setMainDOM = (shopInfo) => {
    const {navigation} = this.props;
    // 活动子类型:1、抽签；2、抢购
    const b_type = shopInfo.activity.b_type;
    // 活动开始时间
    const start_time = shopInfo.activity.start_time;
    // 活动未开始
    if (checkTime(start_time) > 0) {
      return this._normalDOM(shopInfo);
    }
    if (b_type === ShopConstant.DRAW) {
      return this._normalDOM(shopInfo);
    }
    return <BuyBottomCom navigation={navigation} shopInfo={shopInfo}/>;
  };

  _normalDOM = shopInfo => (
    <View style={bottomStyle.bottomView}>
      <TouchableOpacity onPress={() => alert('通知我')}>
        <Image style={bottomStyle.buttonNormalView} source={Images.tzw}/>
      </TouchableOpacity>
      {
        this._setRightDOM(shopInfo)
      }
    </View>
  );

  _setRightDOM = (shopInfo) => {
    const is_join = shopInfo.is_join;
    // 未参加活动
    if (is_join === ShopConstant.NOT_JOIN) {
      return (
        <ImageBackground
          style={bottomStyle.buttonNormalView}
          source={Images.bg_right}
          onPress={debounce(this.showOver)}
        >
          <Text style={bottomStyle.buttonText}>选择尺码</Text>
        </ImageBackground>
      );
    }
    return (
      <ImageBackground
        style={bottomStyle.buttonNormalView}
        source={Images.bg_right}
        onPress={debounce(this._toCommissionPage)}
      >
        <Text style={bottomStyle.buttonText}>邀请助攻</Text>
      </ImageBackground>
    );
  };

  _toCommissionPage = () => {
    const {shopDetailInfo, navigation} = this.props;
    const shopInfo = shopDetailInfo.data;
    const number = shopInfo.user_activity.number;
    // 只选择了一双鞋(团长自己的)或者邀请人数已达上限，需要重新选择鞋码
    if (number === 1 || number === shopInfo.join_user.length - 1) {
      this.showOver();
    } else {
      navigation.push('commission', {title: '助攻佣金设定'});
    }
  };

  /**
   * 显示选鞋浮层
   */
  showOver = () => {
    const {
      shopDetailInfo, getShoesList, showModalbox, navigation,
    } = this.props;
    const shopId = shopDetailInfo.data.activity.id;
    getShoesList(shopId).then((isSuccess) => {
      if (isSuccess) {
        const {shoesInfo} = this.props;
        const myShoesList = shoesInfo.shoesList;
        if (myShoesList && myShoesList.length !== 0) {
          showModalbox({
            element: (<SelectShoeSizeCom
              shopId={shopId}
              navigation={navigation}
              shopInfo={shopDetailInfo.data}
              shoesList={myShoesList}
              closeBox={this.closeBox}
            />),
            options: {
              style: {
                height: 400,
              },
              position: 'bottom',
            },
          });
        }
      }
    });
  };

  closeBox = () => {
    const {closeModalbox} = this.props;
    closeModalbox();
  };

  getShopDetail() {
    const {getShopDetail} = this.props;
    getShopDetail(shopDetail1);
  }

  render() {
    const {navigation, shopDetailInfo} = this.props;
    const shopInfo = shopDetailInfo.data;
    const shopId = shopInfo.activity.id;
    return (
      <View>
        {
          this._setMainDOM(shopInfo)
        }
      </View>
    );
  }
}

const _styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    backgroundColor: Colors.WHITE_COLOR,
    height: 400,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SelfBottomCom));
