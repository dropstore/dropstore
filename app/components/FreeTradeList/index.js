import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PullToRefresh from '../PullToRefresh';
import { getListData } from '../../redux/reselect/listData';
import { fetchListData } from '../../redux/actions/listData';
import ListItem from './ListItem';
import Colors from '../../res/Colors';

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
  }

  itemOnPress = (item) => {
    const { navigation } = this.props;
    navigation.navigate('FreeTradeDetail', {
      title: '商品详情',
      item,
    });
  }

  loadMore = () => {
    this.fetchData('more');
  }

  fetchData = (fetchType, params) => {
    const { fetchListData, type } = this.props;
    fetchListData(type, { type: 1, ...params }, fetchType);
  }

  renderItem = ({ item, index }) => <ListItem index={index} showPrice onPress={this.itemOnPress} item={item} />

  render() {
    const { listData, style } = this.props;
    return (
      <PullToRefresh
        style={{ backgroundColor: Colors.MAIN_BACK, ...style }}
        totalPages={listData.totalPages}
        currentPage={listData.currentPage}
        Wrapper={FlatList}
        data={listData.list}
        refresh={this.fetchData}
        renderItem={this.renderItem}
        numColumns={2}
        onEndReached={this.loadMore}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(List);
