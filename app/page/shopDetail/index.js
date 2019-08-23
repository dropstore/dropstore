/**
 * @file 商品详情
 * @date 2019/8/18 15:55
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getShopDetail} from '../../redux/actions/shopDetailInfo';
import {getShopDetailInfo} from '../../redux/reselect/shopDetailInfo';
import EmptyViewCom from '../../components/EmptyViewCom';
import ShopBasicInfoCom from './components/basic/ShopBasicInfoCom';
import SelfCom from "./components/main/self";
import LuckyCom from "./components/main/lucky";
import SelfBottomCom from "./components/bottom/self";
import LuckBottomCom from "./components/bottom/LuckBottomCom";
import Colors from '../../res/Colors';
import ShopConstant from '../../common/ShopConstant';
import {shopDetail} from '../../page/TempData';

function mapStateToProps() {
  return state => ({
    shopDetailInfo: getShopDetailInfo(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getShopDetail,
  }, dispatch);
}

class ShopDetail extends PureComponent {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const {getShopDetail, navigation} = this.props;
    const shopId = navigation.getParam('shopId');
    getShopDetail(shopDetail)
  }

  /**
   * 设置主体内容和底部UI
   * @param {boolean} isBottom 是否是底部UI调用
   * @param shopInfo
   * @returns {*}
   */

  _setContentOrBottomUI = (isBottom, shopInfo) => {
    let type = shopInfo.activity.type;
    // 发售、自营
    if (type === ShopConstant.ORIGIN_CONST || type === ShopConstant.SELF_SUPPORT) {
      return this._showSelf(isBottom);
    }
  };

  /**
   * 设置发售和自营布局
   * @param isBottom
   * @returns {*}
   * @private
   */
  _showSelf = (isBottom) => {
    if (isBottom) {
      return <SelfBottomCom/>
    }
    return (
      <View>
        <SelfCom/>
      </View>
    )
  };

  onRefresh = () => {
    const {getShopDetail, navigation} = this.props;
    const shopId = navigation.getParam('shopId');
    getShopDetail(shopDetail);
  };

  render() {
    const {shopDetailInfo} = this.props;
    const data = shopDetailInfo.shopData.data;
    if (shopDetailInfo.shopData.isStartRequest && Object.keys(data).length === 0) {
      return <ActivityIndicator style={{marginTop: 50}}/>;
    }
    if (data instanceof Object && Object.keys(data).length !== 0) {
      return (
        <View style={_styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}
                      refreshControl={(
                        <RefreshControl
                          progressViewOffset={20}
                          tintColor={Colors.HEADER_COLOR}
                          onRefresh={this.onRefresh}
                          refreshing={false}
                        />
                      )}
          >
            <ShopBasicInfoCom/>
            <EmptyViewCom/>
            {
              this._setContentOrBottomUI(false, data)
            }
          </ScrollView>
          {
            this._setContentOrBottomUI(true, data)
          }
        </View>
      )
    }
    return (
      <View style={{flex: 1, justifyContent: 'center', alert: 'center'}}>
        <Text>暂无数据</Text>
      </View>
    )
  }
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR
  },
  // emptyView: {
  //   width: '100%',
  //   height: 18,
  //   backgroundColor: Colors.NORMAL_TEXT_F6
  // },

});
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ShopDetail))
