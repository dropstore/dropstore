import React, { PureComponent } from 'react';
import {
  FlatList, View, Text, StyleSheet, ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Image from '../../../components/Image';
import OrderListItem from './OrderListItem';
import Colors from '../../../res/Colors';
import Images from '../../../res/Images';
import { getOrderStateList } from '../../../redux/reselect/orderState';
import { fetchOrderStateList } from '../../../redux/actions/orderState';

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

class OrderList extends PureComponent {
  constructor(props) {
    super(props);
    const { fetchOrderStateList, type } = this.props;
    fetchOrderStateList(type);
  }

  loadMore = () => {
    const { fetchOrderStateList, type } = this.props;
    fetchOrderStateList(type, true);
  }

  renderFooter = () => {
    const { orderStateList } = this.props;
    if (orderStateList.totalPages === orderStateList.currentPage && orderStateList.totalPages > 0) {
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

  renderItem = ({ item }) => {
    const { type } = this.props;
    return <OrderListItem type={type} item={item} />;
  }

  render() {
    const { orderStateList } = this.props;
    if (orderStateList.isFetching && orderStateList.totalPages < 0) {
      return <ActivityIndicator style={{ marginTop: 30 }} />;
    }
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={5}
        initialNumToRender={3}
        style={{ flex: 1, backgroundColor: Colors.MAIN_BACK }}
        // ListHeaderComponent={this.renderHeader}
        // ListFooterComponent={this.renderFooter}
        ref={(l) => { this.innerList = l; }}
        data={orderStateList.list}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => `${item.source_id}-${index}`}
        onEndReached={this.loadMore}
        removeClippedSubviews={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  loadingFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 40,
    borderTopColor: Colors.NORMAL_TEXT_E5,
    borderTopWidth: StyleSheet.hairlineWidth,
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
