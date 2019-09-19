import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PullToRefresh } from '../../components';
import { getList } from '../../redux/reselect/list';
import { fetchList } from '../../redux/actions/list';
import ListItemDetail from './ListItemDetail';
import ListItemHistory from './ListItemHistory';
import ListItemPrice from './ListItemPrice';
import Header from './component/Header';

function mapStateToProps() {
  return (state, props) => ({
    list: getList(state, props.type) || {},
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchList,
  }, dispatch);
}

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.fetchData();
    this.filterParams = {};
  }

  loadMore = () => {
    this.fetchData(true);
  }

  fetchData = (fetchMore) => {
    const { fetchList, type, goods: { goods_id } } = this.props;
    fetchList(type, {
      goods_id,
      ...this.filterParams,
    }, fetchMore);
  }

  filter = (params) => {
    this.filterParams = { ...this.filterParams, ...params };
    for (const i in this.filterParams) {
      if (this.filterParams[i] === 'all') {
        delete this.filterParams[i];
      }
    }
    console.log(this.filterParams);
    // this.fetchData();
  }

  renderItem = ({ item }) => {
    const { type } = this.props;
    if (type === 'freeTradeGoodsPrice') {
      return <ListItemPrice item={item} />;
    }
    return <ListItemHistory item={item} />;
  }

  render() {
    const { list, type } = this.props;
    if (type === 'freeTradeGoodsDetail') {
      return <ListItemDetail />;
    }
    return (
      <View style={{ flex: 1 }}>
        <Header type={type} filter={this.filter} />
        <PullToRefresh
          totalPages={list.totalPages}
          currentPage={list.currentPage}
          Wrapper={FlatList}
          data={list.list}
          refresh={this.fetchData}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
