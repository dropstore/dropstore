import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, RefreshControl,
} from 'react-native';
import Image from './Image';
import Colors from '../res/Colors';
import Images from '../res/Images';

export default class PullToRefresh extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { totalPages } = this.props;
    if (totalPages === -1 && nextProps.totalPages > -1) {
      this.setState({ refreshing: false });
    }
  }

  renderFooter = () => {
    const { totalPages, currentPage } = this.props;
    if (totalPages === currentPage || totalPages === 0) {
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

  onRefresh = () => {
    const { refresh } = this.props;
    this.setState({ refreshing: true });
    refresh();
  }

  render() {
    const { renderFooter, Wrapper } = this.props;
    const { refreshing } = this.state;
    return (
      <Wrapper
        ListFooterComponent={renderFooter || this.renderFooter}
        refreshControl={<RefreshControl tintColor="#c20000" refreshing={refreshing} onRefresh={this.onRefresh} />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        removeClippedSubviews={false}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        initialNumToRender={8}
        maxToRenderPerBatch={6}
        {...this.props}
      />
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
