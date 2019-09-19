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
import SelfBottomCom from './components/bottom/self';
import Colors from '../../res/Colors';
import ShopConstant from '../../common/ShopConstant';
import AgainLoadCom from '../../components/AgainLoadCom';
import NoDataCom from '../../components/NoDataCom';
import RuleCom from './components/main/RuleCom';
import BuyMainCom from './components/main/self/components/BuyMainCom';
import DrawMainCom from './components/main/self/components/DrawMainCom';
import DetailImage from './components/DetailImage';

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

  setContentOrBottomUI = (shopInfo) => {
    const type = shopInfo.activity.type;
    if (type === ShopConstant.ORIGIN_CONST || type === ShopConstant.SELF_SUPPORT) {
      return <SelfBottomCom />;
    }
    return null;
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
    } if (item === 'DrawMainCom') {
      return <DrawMainCom shopInfo={data} />;
    } if (item === 'BuyMainCom') {
      return <BuyMainCom shopInfo={data} />;
    }
    return <DetailImage item={item} />;
  }

  render() {
    const { shopDetailInfo } = this.props;
    const { data } = shopDetailInfo;
    const isNormalObject = (data instanceof Object && Object.keys(data).length !== 0);
    if (shopDetailInfo.isFetching) { return <View />; }
    if (isNormalObject) {
      const {
        activity: { b_type, start_time }, is_join, goods_image,
      } = data;
      let list = ['RuleCom'];
      if (is_join === ShopConstant.NOT_JOIN) {
        list = [
          ...list,
          { height: 240, source: require('../../res/image/gonggao.jpg') },
          ...goods_image,
          { height: 437, source: require('../../res/image/rule.jpg') },
        ];
      } else if (b_type === ShopConstant.DRAW) {
        list = [...list, 'DrawMainCom'];
      } else {
        list = [...list, 'BuyMainCom'];
      }
      return (
        <View style={_styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<ShopBasicInfoCom shopDetailInfo={shopDetailInfo} />}
            style={{ flex: 1 }}
            data={list}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `detail-${item}-${index}`}
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
          { this.setContentOrBottomUI(data) }
        </View>
      );
    } if (!shopDetailInfo.error) {
      return <AgainLoadCom againLoad={this.againLoad} />;
    }
    return <NoDataCom />;
  }
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ShopDetail));
