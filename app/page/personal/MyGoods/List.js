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
    const { fetchOrderStateList, id } = this.props;
    // fetchOrderStateList(id, fetchMore);
  }

  renderItem = ({ item }) => {
    const { type } = this.props;
    return <ListItem type={type} item={item} />;
  }

  render() {
    const { route, type } = this.props;
    // 0期货 1现货（已鉴定或从平台购买的） 2发布（未填写物流）3发布（已填写物流及鉴定中） 4鉴定（未通过）
    const list = {
      list: route === 'Goods' ? [{
        title: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
        type: 1,
        price: '3231500',
        subTitle: '已入库',
        add_time: parseInt(Date.now() / 1000),
        id: '4208 3456789',
        size: 43,
      }, {
        title: 'OFF-WHITH x NIKE 联名AIRFORCE 1 LOW 2018版',
        type: 0,
        price: '2222200',
        subTitle: '到货时间 2019-03-06',
        id: '4208 3456789',
        add_time: parseInt(Date.now() / 1000),
        size: 43,
      }, {
        title: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
        type: 0,
        price: '6596600',
        subTitle: '到货时间 2019-03-06',
        id: '4208 3456789',
        add_time: parseInt(Date.now() / 1000),
        size: 43,
      }, {
        title: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
        type: 1,
        price: '32500',
        subTitle: '已入库',
        size: 43,
        add_time: parseInt(Date.now() / 1000),
        id: '4208 3456789',
      }] : type === 'intoWarehouse' ? [{
        title: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
        type: 0,
        price: '3231500',
        size: 43,
        add_time: parseInt(Date.now() / 1000),
        subTitle: '到货时间 2019-03-06',
        id: '4208 3456789',
      }, {
        title: 'OFF-WHITH x NIKE 联名AIRFORCE 1 LOW 2018版',
        type: 1,
        price: '2222200',
        subTitle: '已入库',
        size: 43,
        add_time: parseInt(Date.now() / 1000),
        id: '4208 3456789',
      }, {
        title: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
        type: 2,
        price: '6596600',
        subTitle: '创建时间 2019-03-06',
        id: '4208 3456789',
        add_time: parseInt(Date.now() / 1000),
        size: 43,
      }, {
        title: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
        type: 3,
        price: '3231500',
        subTitle: '已入库',
        id: '4208 3456789',
        add_time: parseInt(Date.now() / 1000),
        size: 43,
      }, {
        title: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
        type: 4,
        price: '3231500',
        subTitle: '已入库',
        id: '4208 3456789',
        add_time: parseInt(Date.now() / 1000),
        size: 43,
      }] : type === 'uncomplete' ? [{
        title: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
        type: 4,
        price: '6596600',
        size: 43,
        add_time: parseInt(Date.now() / 1000),
        time: parseInt(Date.now() / 1000),
        id: '4208 3456789',
      }, {
        title: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
        type: 4,
        price: '3231500',
        size: 43,
        time: parseInt(Date.now() / 1000 - 162),
        add_time: parseInt(Date.now() / 1000),
        id: '4208 3456789',
      }] : [{
        title: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
        type: 4,
        price: '6596600',
        add_time: parseInt(Date.now() / 1000),
        size: 43,
        subTitle: '创建时间 2019-03-06',
        yundanhao: 1351652365912,
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
        data={list.list}
        refresh={this.fetchData}
        renderItem={this.renderItem}
        onEndReached={this.loadMore}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
