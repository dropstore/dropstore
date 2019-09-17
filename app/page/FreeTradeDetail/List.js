import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PullToRefresh } from '../../components';
import { getOrderStateList } from '../../redux/reselect/orderState';
import { fetchOrderStateList } from '../../redux/actions/orderState';
import ListItemDetail from './ListItemDetail';
import ListItemHistory from './ListItemHistory';
import ListItemPrice from './ListItemPrice';
import Header from './component/Header';

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

  filter = (params) => {
    console.log(params);
  }

  renderItem = ({ item }) => {
    const { type } = this.props;
    if (type === 'price') {
      return <ListItemPrice item={item} />;
    }
    return <ListItemHistory item={item} />;
  }

  render() {
    const { orderStateList, type } = this.props;
    if (type === 'detail') {
      return <ListItemDetail />;
    }
    return (
      <View style={{ flex: 1 }}>
        <Header type={type} filter={this.filter} />
        <PullToRefresh
          totalPages={orderStateList.totalPages}
          currentPage={orderStateList.currentPage}
          Wrapper={FlatList}
          data={orderStateList.list}
          refresh={this.fetchData}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
