import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PullToRefresh } from '../../components';
import { getOrderStateList } from '../../redux/reselect/orderState';
import { fetchOrderStateList } from '../../redux/actions/orderState';
import ListItem from './ListItem';

function mapStateToProps() {
  return (state, props) => ({
    orderStateList: getOrderStateList(state, props.type) || {},
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
    const {
      fetchOrderStateList, api, params, type,
    } = this.props;
    fetchOrderStateList(api, params, type, fetchMore);
  }

  renderItem = ({ item }) => {
    const { type } = this.props;
    return <ListItem type={type} item={item} />;
  }

  render() {
    const { orderStateList } = this.props;
    // 1期货 2现货（已鉴定或从平台购买的） 2发布（未填写物流）3发布（已填写物流及鉴定中） 4鉴定（未通过）
    return (
      <PullToRefresh
        totalPages={orderStateList.totalPages}
        currentPage={orderStateList.currentPage}
        Wrapper={FlatList}
        data={orderStateList.list}
        refresh={this.fetchData}
        renderItem={this.renderItem}
        onEndReached={this.loadMore}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
