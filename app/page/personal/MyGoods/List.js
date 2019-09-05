import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PullToRefresh } from '../../../components';
import { getOrderStateList } from '../../../redux/reselect/orderState';
import { fetchOrderStateList } from '../../../redux/actions/orderState';
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
    const { fetchOrderStateList, type } = this.props;
    // fetchOrderStateList(type, fetchMore);
  }

  renderItem = ({ item }) => {
    const { type } = this.props;
    return <ListItem type={type} item={item} />;
  }

  render() {
    const list = {
      list: [{
        title: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
        type: 1,
        price: '3231500',
        subTitle: '已入库',
        id: '4208 3456789',
      }, {
        title: 'OFF-WHITH x NIKE 联名AIRFORCE 1 LOW 2018版',
        type: 0,
        price: '2222200',
        subTitle: '到货时间  2019-03-06',
        id: '4208 3456789',
      }, {
        title: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
        type: 0,
        price: '6596600',
        subTitle: '入库时间  2019-03-06',
        id: '4208 3456789',
      }, {
        title: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
        type: 1,
        price: '32500',
        subTitle: '已入库',
        id: '4208 3456789',
      }],
      totalPages: 1,
      currentPage: 1,
    };
    return (
      <PullToRefresh
        totalPages={list.totalPages}
        currentPage={list.currentPage}
        Wrapper={FlatList}
        style={{ paddingTop: 5 }}
        data={list.list}
        refresh={this.fetchData}
        renderItem={this.renderItem}
        onEndReached={this.loadMore}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
