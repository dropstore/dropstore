import React, { PureComponent } from 'react';
import {
  FlatList, View, Text, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PullToRefresh, Image } from '../../components';
import { getOrderStateList } from '../../redux/reselect/orderState';
import { fetchOrderStateList } from '../../redux/actions/orderState';
import ListItemDetail from './ListItemDetail';
import ListItemHistory from './ListItemHistory';
import ListItemPrice from './ListItemPrice';
import Images from '../../res/Images';
import { YaHei } from '../../res/FontFamily';
import Dropdown from './component/Dropdown';

function mapStateToProps() {
  return state => ({
    orderStateList: getOrderStateList(state, 'uncomplete') || {},
  });
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchOrderStateList,
  }, dispatch);
}

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.fetchData();
  }

  loadMore = () => {
    this.fetchData(true);
  }

  fetchData = (fetchMore) => {
    const { fetchOrderStateList } = this.props;
    fetchOrderStateList('/order/order_list', { status: 0 }, 'uncomplete', fetchMore);
  }

  renderItem = ({ item }) => {
    const { type } = this.props;
    if (type === 'price') {
      return <ListItemPrice item={item} />;
    }
    return <ListItemHistory item={item} />;
  }

  ListHeaderComponent = () => {
    const { type } = this.props;
    if (type === 'price') {
      const sizeOptions = [
        { title: '全部尺码', key: 'all' },
        { key: '36', title: '36' },
        { key: '36.5', title: '36.5' },
        { key: '37', title: '37' },
        { key: '37.5', title: '37.5' },
        { key: '38', title: '38' },
        { key: '38.5', title: '38.5' },
        { key: '39', title: '39' },
        { key: '39.5', title: '39.5' },
        { key: '40', title: '40' },
        { key: '40.5', title: '40.5' },
      ];
      const typeOptions = [
        { key: 'all', title: '全部' },
        { key: 'futures', title: '现货' },
        { key: 'inStock', title: '期货' },
      ];
      return (
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <Text style={styles.outPrice}>
              {'共 : '}
              <Text style={{ fontSize: 12, color: '#37B6EB', fontFamily: YaHei }}>15721</Text>
              {' 人出价'}
            </Text>
            <Dropdown options={sizeOptions} defaultValue={sizeOptions[0]} width={80} />
          </View>
          <View style={styles.bottom}>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Text>综合</Text>
              </View>
              <View>
                <Text>价格</Text>
              </View>
            </View>
            <Dropdown options={typeOptions} defaultValue={typeOptions[0]} width={60} />
          </View>
        </View>
      );
    }
    return (
      <View>
        <Text>456</Text>
      </View>
    );
  }

  render() {
    const { orderStateList, type } = this.props;
    if (type === 'detail') {
      return <ListItemDetail />;
    }
    return (
      <PullToRefresh
        totalPages={orderStateList.totalPages}
        currentPage={orderStateList.currentPage}
        Wrapper={FlatList}
        ListHeaderComponent={this.ListHeaderComponent}
        data={orderStateList.list}
        refresh={this.fetchData}
        renderItem={this.renderItem}
        onEndReached={this.loadMore}
      />
    );
  }
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 2,
    marginHorizontal: 10,
  },
  header: {
    paddingHorizontal: 10,
    borderBottomColor: '#E3E3E3',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 36,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  outPrice: {
    fontSize: 12,
    color: '#272727',
  },
  arrowDownRed: {
    height: 17,
    width: 17,
    marginLeft: 13,
  },
  bottom: {
    height: 36,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
