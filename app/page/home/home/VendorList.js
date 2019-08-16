import React, { PureComponent } from 'react';
import {
  FlatList, RefreshControl, ActivityIndicator, View, Text, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Image from '../../../components/Image';
import { fetchVendors } from '../../../redux/actions/test';
import { getVendors } from '../../../redux/reselect/test';
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
    const { fetchVendors } = this.props;
    fetchVendors();
  }

  loadMore = () => {
    const { fetchVendors } = this.props;
    fetchVendors(true);
  }

  renderFooter = () => {
    const { vendors } = this.props;
    if (vendors.totalPages === vendors.currentPage && vendors.totalPages > 0) {
      return (
        <View style={styles.loadingFooter}>
          <Text style={styles.loadingText}>没有更多了</Text>
        </View>
      );
    }
    return (
      <View style={styles.loadingFooter}>
        <Text style={styles.loadingText}>加载中</Text>
        <Image source={require('../../../res/image/loading.gif')} style={styles.loadingGif} />
      </View>
    );
  }

  renderItem = ({ item }) => <VendorListItem vendor={item} />

  render() {
    const { vendors } = this.props;
    if (vendors.isFetching && vendors.totalPages < 0) {
      return <ActivityIndicator style={{ marginTop: 50 }} />;
    }
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={5}
        initialNumToRender={3}
        style={{ flex: 1 }}
        // ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
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

const styles = StyleSheet.create({
  loadingFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 40,
    borderTopColor: '#e5e5e5',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  loadingText: {
    fontSize: 12,
    color: '#666666',
  },
  loadingGif: {
    width: 23,
    height: 5,
    marginLeft: 6,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
