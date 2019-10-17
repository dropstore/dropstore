/**
 * @file 商品详情
 * @date 2019/8/18 15:55
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import {
  RefreshControl, View, FlatList, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchSimpleData } from '../../redux/actions/simpleData';
import { getSimpleData } from '../../redux/reselect/simpleData';
import ShopDetailHeaderRight from './components/ShopDetailHeaderRight';
import ShopBasicInfoCom from './components/ShopBasicInfoCom';
import SelfBottomCom from './components/bottom';
import Colors from '../../res/Colors';
import ShopConstant from '../../common/ShopConstant';
import RuleCom from './components/RuleCom';
import MemberCom from './components/MemberCom';
import DetailImage from './components/DetailImage';
import { showModalbox, closeModalbox } from '../../utils/MutualUtil';
import { YaHei } from '../../res/FontFamily';
import { Image } from '../../components';

const TYPE = 'activityInfo';

function mapStateToProps() {
  return state => ({
    activityInfo: getSimpleData(state, TYPE),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSimpleData,
  }, dispatch);
}

class ShopDetail extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: '商品详情',
    // headerRight: <ShopDetailHeaderRight
    //   onPress={() => navigation.navigate('Web', { url: 'http://m.dropstore.cn/index.html#/drawlots', title: '中签率说明' })}
    //   rate={navigation.getParam('rate')}
    // />,
  });

  constructor(props) {
    super(props);
    this.fetchData();
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.didBlurSubscription = navigation.addListener(
      'willFocus',
      (payload) => {
        if (['Navigation/BACK', 'Navigation/POP'].includes(payload.action.type) && window.waitPay && window.waitPay !== this.waitPay) {
          this.waitPay = window.waitPay;
          showModalbox({
            element: (
              <View style={styles.modal}>
                <Text style={styles.hint}>友情提示</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 17 }}>
                  <Text style={{ fontSize: 14, fontFamily: YaHei }}>
                    {'支付未完成，可在您的库房'}
                    <Text style={styles.kufang} onPress={this.toKufang}>未完成</Text>
                    {'中继续支付'}
                  </Text>
                </View>
                <TouchableOpacity
                  hitSlop={{
                    top: 20, left: 20, right: 20, bottom: 20,
                  }}
                  onPress={this.close}
                  style={styles.cha}
                >
                  <Image source={require('../../res/image/close-x.png')} style={{ height: 12, width: 12 }} />
                </TouchableOpacity>
              </View>
            ),
            options: {
              style: {
                height: 185,
                width: 265,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
              },
            },
          });
        }
      },
    );
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
  }

  close = () => {
    closeModalbox();
  }

  toKufang = () => {
    const { navigation } = this.props;
    this.close();
    navigation.push('MyGoods', {
      title: '我的库房',
      type: 'uncomplete',
    });
  }

  fetchData = (refresh) => {
    const { fetchSimpleData, navigation } = this.props;
    this.params = { id: navigation.getParam('shopId') };
    fetchSimpleData(TYPE, this.params, refresh);
  }

  onRefresh = () => {
    this.fetchData('refresh');
  };

  setContentOrBottomUI = (shopInfo) => {
    const { navigation } = this.props;
    const type = shopInfo.activity.type;
    if (type === ShopConstant.ORIGIN_CONST || type === ShopConstant.SELF_SUPPORT) {
      return <SelfBottomCom navigation={navigation} />;
    }
    return null;
  };

  renderItem = ({ item }) => {
    const { activityInfo: { data } } = this.props;
    if (item === 'RuleCom') {
      return <RuleCom shopInfo={data} />;
    } if (item === 'MemberCom') {
      return <MemberCom shopInfo={data} />;
    }
    return <DetailImage item={item} />;
  }

  render() {
    const { activityInfo: { data, fetchedParams } } = this.props;
    if (JSON.stringify(fetchedParams) !== JSON.stringify(this.params) || !fetchedParams) { return <View />; }
    const { is_join, goods_image } = data;
    let list = ['RuleCom'];
    if (is_join === ShopConstant.NOT_JOIN) {
      list = [
        ...list,
        { height: 239, source: require('../../res/image/gonggao.jpeg') },
        ...goods_image,
        { height: 192, source: require('../../res/image/rule.jpeg') },
      ];
    } else {
      list = [...list, 'MemberCom'];
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<ShopBasicInfoCom activityInfo={data} />}
          data={list}
          contentContainerStyle={{ paddingBottom: 7 }}
          style={{ flex: 1 }}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `detail-${item}-${index}`}
          maxToRenderPerBatch={3}
          initialNumToRender={1}
          refreshControl={(
            <RefreshControl
              progressViewOffset={20}
              tintColor={Colors.YELLOW}
              onRefresh={this.onRefresh}
              refreshing={false}
            />
            )}
        />
        { this.setContentOrBottomUI(data) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    borderRadius: 2,
    overflow: 'hidden',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 35,
    paddingBottom: 38,
  },
  kufang: {
    fontSize: 14,
    fontFamily: YaHei,
    color: '#37B6EB',
    textAlign: 'right',
  },
  cha: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  hint: {
    fontSize: 20,
    fontFamily: YaHei,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 27,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetail);
