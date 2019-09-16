import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PullToRefresh, NavigationBarCom } from '../../components';
import { getOrderStateList } from '../../redux/reselect/orderState';
import { fetchOrderStateList } from '../../redux/actions/orderState';
import ListItem from './ListItem';
import { STATUSBAR_AND_NAV_HEIGHT } from '../../common/Constant';

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

  renderItem = ({ item }) => <ListItem item={item} />

  render() {
    const { orderStateList } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <NavigationBarCom title="自由交易" />
        <View style={{ height: 46 }}>
          {/* < */}
        </View>
        <PullToRefresh
          totalPages={orderStateList.totalPages}
          currentPage={orderStateList.currentPage}
          Wrapper={FlatList}
          data={orderStateList.list}
          refresh={this.fetchData}
          style={{ marginTop: STATUSBAR_AND_NAV_HEIGHT, paddingLeft: 9, flex: 1 }}
          renderItem={this.renderItem}
          numColumns={2}
          onEndReached={this.loadMore}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
