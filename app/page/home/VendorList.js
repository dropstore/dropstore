/*
 * @Author: Lsfern
 * @Date: 2019-08-10 23:48:28
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 18:36:37
 * @Description: 首页
 */
import React, { PureComponent } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchVendors } from '../../redux/actions/test';
import { getVendors } from '../../redux/reselect/test';
import VendorListItem from './VendorListItem';

function mapStateToProps() {
  return state => ({
    vendors: getVendors(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchVendors,
  }, dispatch);
}

class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    const { fetchVendors } = this.props;
    fetchVendors();
    this.state = {};
  }

  onRefresh = () => {

  }

  loadMore = () => {

  }

  renderItem = ({ item }) => <VendorListItem vendor={item} />

  render() {
    const { vendors } = this.props;
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={5}
        initialNumToRender={3}
        // ListHeaderComponent={this.renderHeader}
        // ListFooterComponent={this.renderFooter}
        ref={(l) => { this.innerList = l; }}
        data={vendors.list}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => `${item.source_id}-${index}`}
        onEndReached={this.loadMore}
        removeClippedSubviews={false}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl progressViewOffset={20} tintColor="#F65440" onRefresh={this.onRefresh} refreshing={false} />}
      />
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
