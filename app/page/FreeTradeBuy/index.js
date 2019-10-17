import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  FlatList, View, Text, StyleSheet,
} from 'react-native';
import { bindActionCreators } from 'redux';
import {
  PullToRefresh, ShoeImageHeader, BottomPay, AvatarWithShadow, NameAndGender,
} from '../../components';
import ListItem from '../../components/FreeTradeList/ListItem';
import { getListData } from '../../redux/reselect/listData';
import { fetchListData } from '../../redux/actions/listData';
import { getSimpleData } from '../../redux/reselect/simpleData';
import { fetchSimpleData } from '../../redux/actions/simpleData';
import Colors from '../../res/Colors';
import { getScreenWidth } from '../../common/Constant';
import { YaHei } from '../../res/FontFamily';
import { formatDate } from '../../utils/commonUtils';

const TYPE = 'freeTradeUserRecommend';
const VENDOR_TYPE = 'freeTradeBuyInfo';
const MARGIN_HORIZONTAL = 9;

function mapStateToProps() {
  return state => ({
    listData: getListData(state, TYPE),
    vendorInfo: getSimpleData(state, VENDOR_TYPE),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchListData,
    fetchSimpleData,
  }, dispatch);
}

class FreeTradeBuy extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation, fetchSimpleData } = this.props;
    // free_id user_id
    this.item = navigation.getParam('item');
    this.free_id = this.item.free_id;
    this.state = {};
    fetchSimpleData(VENDOR_TYPE, { id: this.item.free_id });
    this.fetchData();
  }

  loadMore = () => {
    this.fetchData('more');
  }

  fetchData = (fetchType) => {
    const { fetchListData } = this.props;
    fetchListData(TYPE, { free_id: this.item.free_id, is_stock: '1', user_id: this.item.user_id }, fetchType);
  }

  onPress = (item) => {
    this.free_id = item.free_id;
    this.setState({ currentItem: item });
    this.fetchData('refresh');
  }

  toPay = () => {
    const { navigation } = this.props;
    const { currentItem } = this.state;
    navigation.navigate('PayDetail', {
      api: {
        type: 'freeTradeToOrder',
        params: { free_id: this.free_id },
      },
      title: '确认购买',
      payType: 'buyGoods',
      type: 1,
      goodsInfo: {
        ...currentItem,
      },
    });
  }

  listHeaderComponent = () => {
    const { vendorInfo: { data = {} } } = this.props;
    const { currentItem } = this.state;
    return (
      <View>
        <ShoeImageHeader item={currentItem || data} showSize />
        <View style={styles.vendor}>
          <AvatarWithShadow source={{ uri: data.avatar }} size={45} />
          <View style={styles.vendorRight}>
            <View style={{ marginLeft: 10, marginTop: 12 }}>
              <NameAndGender name={data.user_name} sex={data.sex} />
              <Text style={{ fontSize: 11, color: '#696969' }}>
                {'累计成交订单：'}
                <Text style={{ fontSize: 11, color: '#37B6EB', fontFamily: YaHei }}>{data.goods_number}</Text>
              </Text>
            </View>
            <Text style={{ fontSize: 9, color: '#696969', marginTop: 15 }}>{`入驻平台时间：${formatDate(data.user_time)}`}</Text>
          </View>
        </View>
        <Text style={styles.haizaimai}>卖家还在卖</Text>
      </View>
    );
  }

  renderItem = ({ item, index }) => {
    const { vendorInfo: { data = {} } } = this.props;
    const { currentItem } = this.state;
    return <ListItem isCurrentItem={(currentItem || data).free === item.free} index={index} onPress={this.onPress} notShowCount item={item} />;
  }

  render() {
    const { listData, vendorInfo: { data = {} } } = this.props;
    const { currentItem } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <PullToRefresh
          style={{
            flex: 1, backgroundColor: Colors.MAIN_BACK,
          }}
          ListHeaderComponent={this.listHeaderComponent}
          totalPages={listData.totalPages}
          currentPage={listData.currentPage}
          Wrapper={FlatList}
          data={listData.list}
          renderItem={this.renderItem}
          numColumns={2}
          onEndReached={this.loadMore}
        />
        <BottomPay text="确认购买" needManagementNum={1} price={(currentItem || data).price} onPress={this.toPay} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  haizaimai: {
    fontSize: 12,
    marginTop: 13.5,
    fontFamily: YaHei,
    marginLeft: MARGIN_HORIZONTAL,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 8,
    marginRight: 8,
    borderRadius: 2,
    overflow: 'hidden',
  },
  title: {
    fontSize: 12,
    textAlign: 'justify',
    flex: 1,
  },
  priceWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  vendor: {
    height: 64,
    width: getScreenWidth() - 18,
    backgroundColor: '#fff',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginLeft: MARGIN_HORIZONTAL,
  },
  vendorRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    height: '100%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FreeTradeBuy);
