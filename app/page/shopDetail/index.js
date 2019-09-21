/**
 * @file 商品详情
 * @date 2019/8/18 15:55
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import {
  DeviceEventEmitter, RefreshControl, View, FlatList, Animated,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getShopDetail } from '../../redux/actions/shopDetailInfo';
import { getShopDetailInfo } from '../../redux/reselect/shopDetailInfo';
import ShopDetailHeaderRight from './components/basic/ShopDetailHeaderRight';
import ShopBasicInfoCom from './components/basic/ShopBasicInfoCom';
import SelfBottomCom from './components/bottom/self';
import Colors from '../../res/Colors';
import ShopConstant from '../../common/ShopConstant';
import { AgainLoadCom, ScrollBackgroundPlaceholder } from '../../components';
import NoDataCom from '../../components/NoDataCom';
import RuleCom from './components/main/RuleCom';
import BuyMainCom from './components/main/self/components/BuyMainCom';
import DrawMainCom from './components/main/self/components/DrawMainCom';
import DetailImage from './components/DetailImage';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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

  scrollY = new Animated.Value(0)

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
    const { navigation } = this.props;
    const type = shopInfo.activity.type;
    if (type === ShopConstant.ORIGIN_CONST || type === ShopConstant.SELF_SUPPORT) {
      return <SelfBottomCom navigation={navigation} />;
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
        <View style={{ flex: 1 }}>
          <AnimatedFlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<ShopBasicInfoCom shopDetailInfo={shopDetailInfo} />}
            data={list}
            style={{ flex: 1, backgroundColor: Colors.MAIN_BACK }}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], { useNativeDriver: true })}
            renderItem={this.renderItem}
            scrollEventThrottle={1}
            keyExtractor={(item, index) => `detail-${item}-${index}`}
            maxToRenderPerBatch={3}
            initialNumToRender={1}
            refreshControl={(
              <RefreshControl
                progressViewOffset={20}
                tintColor={Colors.OTHER_BACK}
                onRefresh={this.onRefresh}
                refreshing={false}
              />
            )}
          />
          { this.setContentOrBottomUI(data) }
          <ScrollBackgroundPlaceholder y={this.scrollY} />
        </View>
      );
    } if (!shopDetailInfo.error) {
      return <AgainLoadCom againLoad={this.againLoad} />;
    }
    return <NoDataCom />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetail);
