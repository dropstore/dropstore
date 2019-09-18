/**
 * @file 商品详情
 * @date 2019/8/18 15:55
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import {
  DeviceEventEmitter, RefreshControl, StyleSheet, View, FlatList,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getShopDetail } from '../../redux/actions/shopDetailInfo';
import { getShopDetailInfo } from '../../redux/reselect/shopDetailInfo';
import ShopDetailHeaderRight from './components/basic/ShopDetailHeaderRight';
import ShopBasicInfoCom from './components/basic/ShopBasicInfoCom';
import SelfCom from './components/main/self';
import SelfBottomCom from './components/bottom/self';
import Colors from '../../res/Colors';
import ShopConstant from '../../common/ShopConstant';
import LuckBottomCom from './components/bottom/LuckBottomCom';
import LuckCom from './components/main/lucky';
import AgainLoadCom from '../../components/AgainLoadCom';
import NoDataCom from '../../components/NoDataCom';
import RuleCom from './components/main/RuleCom';

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
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', '商品详情'),
    headerRight: <ShopDetailHeaderRight
      onPress={() => navigation.navigate('Web', { url: 'http://m.dropstore.cn/index.html#/drawlots', title: '中签率说明' })}
      navigation={navigation}
      rate={navigation.getParam('rate')}
    />,
  });

  componentDidMount() {
    const { getShopDetail, navigation } = this.props;
    const shopId = navigation.getParam('shopId');
    this.refreshShopInfo = DeviceEventEmitter.addListener(ShopConstant.REFRESH_SHOP_DETAIL_INFO, (res) => {
      if (res) {
        getShopDetail(shopId, { isDispatchStart: false });
      }
    });
    getShopDetail(shopId);
  }

  componentWillUnmount() {
    this.refreshShopInfo.remove();
  }

  /**
   * 设置主体内容和底部UI
   * @param {boolean} isBottom 是否是底部UI调用
   * @param shopInfo
   * @returns {*}
   */

  _setContentOrBottomUI = (isBottom, shopInfo) => {
    const type = shopInfo.activity.type;
    // let type = 3;
    // 发售、自营
    if (type === ShopConstant.ORIGIN_CONST || type === ShopConstant.SELF_SUPPORT) {
      return this._showSelf(isBottom);
    } if (type === ShopConstant.LUCKY_CHARM) {
      return this._showLuck(isBottom);
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
      return <SelfBottomCom />;
    }
    return (
      <View>
        <SelfCom />
      </View>
    );
  };

  /**
   * 锦鲤详情
   * @param isBottom
   * @returns {*}
   * @private
   */
  _showLuck = (isBottom) => {
    if (isBottom) {
      return <LuckBottomCom />;
    }
    return (
      <View>
        <LuckCom />
      </View>
    );
  };

  onRefresh = () => {
    const { getShopDetail, navigation } = this.props;
    const shopId = navigation.getParam('shopId');
    getShopDetail(shopId, { isDispatchStart: false });
  };

  againLoad = () => {
    const { getShopDetail, navigation } = this.props;
    const shopId = navigation.getParam('shopId');
    getShopDetail(shopId, { isDispatchStart: true });
  };

  renderItem = ({ item }) => {
    const { shopDetailInfo: { data } } = this.props;
    if (item === 'RuleCom') {
      return <RuleCom shopInfo={data} />;
    }
    return <SelfCom shopInfo={data} />;
  }

  _mainDOM = () => {
    const { shopDetailInfo } = this.props;
    const data = shopDetailInfo.data;
    const isNormalObject = (data instanceof Object && Object.keys(data).length !== 0);
    if (shopDetailInfo.isFetching) {
      return <View />;
    }
    if (isNormalObject) {
      return (
        <View style={_styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<ShopBasicInfoCom shopDetailInfo={shopDetailInfo} />}
            style={{ flex: 1 }}
            data={['RuleCom', 'SelfCom']}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${item}-${index}`}
            maxToRenderPerBatch={3}
            initialNumToRender={1}
            refreshControl={(
              <RefreshControl
                progressViewOffset={20}
                tintColor={Colors.HEADER_COLOR}
                onRefresh={this.onRefresh}
                refreshing={false}
              />
            )}
          />
          { this._setContentOrBottomUI(true, data) }
        </View>
      );
    }
    if (!shopDetailInfo.error) {
      return <AgainLoadCom againLoad={this.againLoad} />;
    }
    return <NoDataCom />;
  };

  render() {
    return (
      this._mainDOM()
    );
  }
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ShopDetail));
