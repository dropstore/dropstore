import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PullToRefresh } from '../../components';
import { getListData } from '../../redux/reselect/listData';
import { fetchListData } from '../../redux/actions/listData';
import ListItemHistory from './ListItemHistory';
import ListItemPrice from './ListItemPrice';
import Header from './component/Header';

function mapStateToProps() {
  return (state, props) => ({
    listData: getListData(state, props.type),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchListData,
  }, dispatch);
}

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.fetchData();
    this.filterParams = {};
  }

  loadMore = () => {
    this.fetchData('more');
  }

  fetchData = (fetchType) => {
    const { fetchListData, type, goods: { goods_id } } = this.props;
    fetchListData(type, {
      goods_id,
      ...this.filterParams,
    }, fetchType);
  }

  filter = (params) => {
    this.filterParams = { ...this.filterParams, ...params };
    for (const i in this.filterParams) {
      if (this.filterParams[i] === 'all') {
        delete this.filterParams[i];
      }
    }
    this.fetchData();
  }

  renderItem = ({ item }) => {
    const { type, goods, navigation } = this.props;
    if (type === 'freeTradeGoodsPrice') {
      return <ListItemPrice navigation={navigation} goods={goods} item={item} />;
    }
    return <ListItemHistory navigation={navigation} item={item} />;
  }

  render() {
    const { listData, type, goods: { id } } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header count={listData.count || 0} id={id} type={type} filter={this.filter} />
        <PullToRefresh
          totalPages={listData.totalPages}
          currentPage={listData.currentPage}
          Wrapper={FlatList}
          data={listData.list}
          refresh={this.fetchData}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
