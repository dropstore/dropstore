import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  FlatList, View, Text, StyleSheet, Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import {
  PullToRefresh, FadeImage, Price, Image, BottomPay,
} from '../../components';
import ListItem from '../../components/FreeTradeList/ListItem';
import { getListData } from '../../redux/reselect/listData';
import { fetchListData } from '../../redux/actions/listData';
import { getSimpleData } from '../../redux/reselect/simpleData';
import { fetchSimpleData } from '../../redux/actions/simpleData';
import Colors from '../../res/Colors';
import { wPx2P } from '../../utils/ScreenUtil';
import { SCREEN_WIDTH, PADDING_TAB } from '../../common/Constant';
import Images from '../../res/Images';
import { YaHei } from '../../res/FontFamily';
import { formatDate } from '../../utils/commonUtils';


const TYPE = 'freeTradeUserRecommend';
const VENDOR_TYPE = 'freeTradeBuyChooseSize';

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
    this.item = navigation.getParam('item');
    const { price, goods_name, image } = navigation.getParam('goods');
    this.free_id = this.item.id;
    this.state = {
      cuurentItem: {
        image,
        goods_name,
        size: this.item.size,
        price,
      },
    };
    fetchSimpleData(VENDOR_TYPE, { id: this.item.id });
    this.fetchData();
  }

  loadMore = () => {
    this.fetchData(true);
  }

  fetchData = (fetchMore) => {
    const { fetchListData } = this.props;
    fetchListData(TYPE, { free_id: this.free_id, is_stock: '1', user_id: this.item.user_id }, fetchMore);
  }

  onPress = (item) => {
    this.free_id = item.id;
    this.setState({ cuurentItem: item });
    this.fetchData();
  }

  toPay = (price) => {
    const { navigation } = this.props;
    navigation.navigate('pay', {
      title: '选择支付账户',
      type: '1',
      payData: {
        order_id: this.item.id,
        price,
      },
    });
  }

  listHeaderComponent = () => {
    const { vendorInfo: { data } } = this.props;
    const { cuurentItem } = this.state;
    return (
      <View>
        <View style={styles.header}>
          <FadeImage resizeMode="contain" source={{ uri: cuurentItem.image }} style={{ width: wPx2P(166), height: wPx2P(97) }} />
          <View style={{ flex: 1, justifyContent: 'space-between', marginLeft: 10 }}>
            <Text style={styles.title}>{cuurentItem.goods_name}</Text>
            <View style={styles.priceWrapper}>
              <Text style={{ fontSize: 11, color: '#333' }}>{`SIZE：${cuurentItem.size}`}</Text>
              <Price price={cuurentItem.price} />
            </View>
          </View>
        </View>
        {
          data ? (
            <View style={styles.vendor}>
              <View style={styles.imageWrapper}>
                <FadeImage source={{ uri: data.avatar }} style={styles.avatar} />
              </View>
              <View style={styles.vendorRight}>
                <View style={{ marginLeft: 10, marginTop: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15 }}>{data.user_name}</Text>
                    <Image style={{ height: 12, width: 12, marginLeft: 5 }} source={data.sex === '2' ? Images.littleGirl : Images.littleBoy} />
                  </View>
                  <Text style={{ fontSize: 11, color: '#696969' }}>
                    {'累计成交订单：'}
                    <Text style={{ fontSize: 11, color: '#37B6EB', fontFamily: YaHei }}>{data.goods_number}</Text>
                  </Text>
                </View>
                <Text style={{ fontSize: 9, color: '#696969', marginTop: 15 }}>{`入驻平台时间：${formatDate(data.user_time)}`}</Text>
              </View>
            </View>
          ) : <View style={styles.vendor} />
        }
        <Text style={{ fontSize: 12, color: '#272727', marginTop: 20 }}>卖家还在卖</Text>
      </View>
    );
  }

  renderItem = ({ item }) => <ListItem onPress={this.onPress} notShowCount item={item} />

  render() {
    const { listData } = this.props;
    const { cuurentItem } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <PullToRefresh
          style={{
            flex: 1, backgroundColor: Colors.MAIN_BACK, paddingLeft: 9, paddingRight: 1, marginBottom: 66 + PADDING_TAB,
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
        <BottomPay price={cuurentItem.price} onPress={this.toPay} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    width: SCREEN_WIDTH - 18,
    backgroundColor: '#fff',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  vendorRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    height: '100%',
  },
  imageWrapper: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(166, 166, 166)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 5,
      },
      android: {
        elevation: 100,
        position: 'relative',
      },
    }),
  },
  avatar: {
    overflow: 'hidden',
    borderRadius: 22.5,
    width: 45,
    height: 45,
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(FreeTradeBuy);
