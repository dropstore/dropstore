import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PullToRefresh } from '../../components';
import { fetchListData } from '../../redux/actions/listData';
import { getListData } from '../../redux/reselect/listData';
import Warehouse from './Warehouse';
import SelledItem from './SelledItem';
import OnsaleItem from './OnsaleItem';
import SendOutItem from './SendOutItem';
import UncompleteItem from './UncompleteItem';

function mapStateToProps() {
  return (state, props) => ({
    listData: getListData(state, props.apiType),
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
  }

  loadMore = () => {
    this.fetchData('more');
  }

  fetchData = (fetchType) => {
    const { fetchListData, apiType } = this.props;
    fetchListData(apiType, {}, fetchType);
  }

  renderItem = ({ item }) => {
    const {
      type, navigation, route, itemAction,
    } = this.props;
    if (type === 'selled') {
      return <SelledItem itemAction={itemAction} item={item} />;
    } if (type === 'onSale') {
      return <OnsaleItem itemAction={itemAction} route={route} refresh={this.fetchData} type={type} navigation={navigation} item={item} />;
    } if (type === 'sendOut') {
      return <SendOutItem itemAction={itemAction} item={item} />;
    } if (type === 'uncomplete') {
      return <UncompleteItem itemAction={itemAction} route={route} refresh={this.fetchData} type={type} navigation={navigation} item={item} />;
    }
    return <Warehouse itemAction={itemAction} route={route} refresh={this.fetchData} type={type} navigation={navigation} item={item} />;
  }

  render() {
    const { listData } = this.props;
    return (
      <PullToRefresh
        totalPages={listData.totalPages}
        currentPage={listData.currentPage}
        Wrapper={FlatList}
        data={listData.list}
        refresh={this.fetchData}
        renderItem={this.renderItem}
        onEndReached={this.loadMore}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
