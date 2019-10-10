import React, { PureComponent } from 'react';
import {
  FlatList, View, StyleSheet, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getListData } from '../../redux/reselect/listData';
import { fetchListData } from '../../redux/actions/listData';
import ListItemHistory from './ListItemHistory';
import ListItemPrice from './ListItemPrice';
import Header from './component/Header';
import { Image } from '../../components';
import Images from '../../res/Images';
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
    this.filterParams = {};
  }

  componentWillReceiveProps(nextProps) {
    const { listData, finishRefresh } = this.props;
    if (listData.totalPages === -1 && nextProps.listData.totalPages > -1) {
      finishRefresh();
    }
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

  refresh = () => {
    this.fetchData('refresh');
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

  renderFooter = () => {
    const { listData } = this.props;
    if (listData.totalPages === listData.currentPage || listData.totalPages === 0) {
      return (
        <View style={styles.loadingFooter}>
          <Text style={styles.loadingText}>没有更多了</Text>
        </View>
      );
    }
    return (
      <View style={styles.loadingFooter}>
        <Text style={styles.loadingText}>加载中</Text>
        <Image source={Images.loading} style={styles.loadingGif} />
      </View>
    );
  }

  render() {
    const {
      listData, type, goods: { id },
    } = this.props;
    return (
      <View>
        { type !== 'freeTradeGoodsDetail' && <Header count={listData.count || 0} id={id} type={type} filter={this.filter} /> }
        <FlatList
          data={listData.list}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={this.renderItem}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 60,
    paddingBottom: 20,
  },
  loadingText: {
    fontSize: 12,
    color: Colors.NORMAL_TEXT_6,
  },
  loadingGif: {
    width: 23,
    height: 5,
    marginLeft: 6,
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(List);
