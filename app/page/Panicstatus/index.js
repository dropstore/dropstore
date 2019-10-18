/**
 * @file 抢购状态界面
 * @date 2019/8/31 11:09
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import {
  StyleSheet, Text, View, FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Image, BottomBtnGroup, FadeImage, PullToRefresh, BottomPay,
} from '../../components';
import { Mario, YaHei, RuiXian } from '../../res/FontFamily';
import { showShare } from '../../utils/MutualUtil';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import ShopConstant from '../../common/ShopConstant';
import { debounce } from '../../utils/commonUtils';
import Colors from '../../res/Colors';
import { STATUSBAR_HEIGHT, BOTTOM_BTN_HEIGHT, getScreenHeight } from '../../common/Constant';
import { fetchListData } from '../../redux/actions/listData';
import { getListData } from '../../redux/reselect/listData';
import ShopListItemCom from '../home/components/ShopListItemCom';

const TYPE = 'recommendActivityList';

function mapStateToProps() {
  return state => ({
    listData: getListData(state, TYPE),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchListData,
  }, dispatch);
}

class Panicstatus extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    if (navigation.getParam('Panicstatus')) {
      window.waitPay = navigation.getParam('payData').order_id;
    } else {
      this.fetchData();
    }
  }

  loadMore = () => {
    this.fetchData('more');
  }

  fetchData = (fetchType) => {
    const { fetchListData, navigation } = this.props;
    const id = navigation.getParam('shopInfo')?.activity?.id;
    fetchListData(TYPE, { id, type: 'all' }, fetchType);
  }

  toShare = () => {
    const { navigation } = this.props;
    const shopInfo = navigation.getParam('shopInfo');
    const order_id = navigation.getParam('payData').order_id;
    const is_join = shopInfo.is_join;
    const aId = shopInfo.activity.id;
    const uAId = shopInfo.user_activity.id;
    const uId = shopInfo.user_activity.user_id;
    const image = shopInfo.goods.image;
    const baseUrl = is_join === ShopConstant.NOT_JOIN ? ShopConstant.SHARE_BASE_URL_BUYED : ShopConstant.SHARE_BASE_URL;
    const url = `${baseUrl}?id=${order_id}&u_a_id=${uAId}&activity_id=${aId}&inviter=${uId}`;
    showShare({
      text: shopInfo.goods.goods_name,
      img: image,
      url,
      title: `快来炒饭APP帮我助攻抢购，成功可立获${shopInfo.user_activity.commission / 100}元佣金`,
    }).then(() => {
      // 分享成功回调
    });
  };

  toNext = () => {
    const { navigation } = this.props;
    const shopInfo = navigation.getParam('shopInfo');
    const Panicstatus = navigation.getParam('Panicstatus');
    const payData = navigation.getParam('payData');
    const is_join = shopInfo.is_join;
    if (!Panicstatus || is_join === ShopConstant.MEMBER) {
      navigation.goBack();
    } else {
      navigation.navigate('pay', {
        title: '选择支付账户',
        type: ShopConstant.PAY_ORDER,
        payType: 'buyActivityGoods',
        payData,
        shopInfo,
      });
    }
  };

  onPress = (item) => {
    const { navigation } = this.props;
    navigation.navigate({ routeName: 'BottomNavigator' });
    navigation.navigate('shopDetail', {
      title: '商品详情',
      rate: '+25',
      shopId: item.id,
      type: item.type,
    });
    // navigation.push('shopDetail', {
    //   title: '商品详情',
    //   rate: '+25',
    //   shopId: item.id,
    //   type: item.type,
    // });
  }

  renderHeader = () => {
    const { navigation } = this.props;
    const data = navigation.getParam('shopInfo');
    const Panicstatus = navigation.getParam('Panicstatus');
    return (
      <View style={{ alignItems: 'center', backgroundColor: '#fff' }}>
        <FadeImage style={styles.goodImage} source={{ uri: data.goods.image }} />
        <Image style={styles.icon} source={require('../../res/image/chaofan_hui.png')} />
        <Text style={[styles.status, { color: Panicstatus ? '#FFA700' : '#909090' }]}>{Panicstatus ? '抢购成功' : '抢购失败'}</Text>
        <Text style={styles.shopName}>{data.goods.goods_name}</Text>
        {
          !Panicstatus && (
            <View style={styles.tuijianWrapper}>
              <Text style={styles.tuijian}>相关推荐</Text>
            </View>
          )
        }
      </View>
    );
  }

  renderItem = ({ item, index }) => {
    const { navigation } = this.props;
    return <ShopListItemCom onPress={() => this.onPress(item)} index={index} navigation={navigation} item={item} />;
  }

  render() {
    const { navigation, listData } = this.props;
    const data = navigation.getParam('shopInfo');
    const Panicstatus = navigation.getParam('Panicstatus');
    const payData = navigation.getParam('payData');
    const is_join = data.is_join;
    const showPay = Panicstatus && (is_join === ShopConstant.NOT_JOIN || is_join === ShopConstant.LEADING);
    const btns = [{ text: '确认', onPress: debounce(this.toNext) }];

    return (
      <View style={styles.container}>
        {
          Panicstatus ? (
            <View style={{ flex: 1, justifyContent: 'center' }}>
              {this.renderHeader()}
            </View>
          ) : (
            <PullToRefresh
              style={{ flex: 1, backgroundColor: Colors.MAIN_BACK }}
              totalPages={listData.totalPages}
              currentPage={listData.currentPage}
              Wrapper={FlatList}
              data={listData.list}
              initialNumToRender={1}
              renderItem={this.renderItem}
              numColumns={2}
              ListHeaderComponent={this.renderHeader}
              onEndReached={this.loadMore}
            />
          )
        }
        { showPay ? <BottomPay text="去付款" price={payData.price} onPress={debounce(this.toNext)} /> : <BottomBtnGroup btns={btns} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tuijianWrapper: {
    paddingTop: 10,
    paddingBottom: 3,
    paddingLeft: 17,
    backgroundColor: Colors.MAIN_BACK,
    width: '100%',
  },
  tuijian: {
    fontSize: 13,
    fontFamily: YaHei,
  },
  container: {
    flex: 1,
  },
  mainView: {
    minHeight: getScreenHeight() - STATUSBAR_HEIGHT - BOTTOM_BTN_HEIGHT,
    alignItems: 'center',
    paddingTop: hPx2P(30 + STATUSBAR_HEIGHT),
    paddingBottom: hPx2P(20),
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 16,
    fontFamily: Mario,
    color: '#000',
  },
  shopName: {
    justifyContent: 'center',
    fontSize: 13,
    fontFamily: RuiXian,
    marginHorizontal: 17,
    textAlign: 'justify',
  },
  status: {
    fontSize: 20,
    fontFamily: YaHei,
    marginVertical: 8,
  },
  goodImage: {
    width: wPx2P(258),
    height: wPx2P(160),
    marginBottom: 10,
  },
  icon: {
    width: wPx2P(47),
    height: wPx2P(47),
    position: 'absolute',
    right: 20,
    top: 15,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Panicstatus);
