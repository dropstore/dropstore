/**
 * @file 商品详情
 * @date 2019/8/18 15:55
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import {
  RefreshControl, View, FlatList,
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
    headerRight: <ShopDetailHeaderRight
      onPress={() => navigation.navigate('Web', { url: 'http://m.dropstore.cn/index.html#/drawlots', title: '中签率说明' })}
      rate={navigation.getParam('rate')}
    />,
  });

  constructor(props) {
    super(props);
    this.fetchData();
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

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetail);
