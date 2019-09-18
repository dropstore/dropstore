import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LargeList } from 'react-native-largelist-v3';
import { ChineseWithLastDateHeader } from 'react-native-spring-scrollview/Customize';
import Image from './Image';
import Colors from '../res/Colors';
import Images from '../res/Images';

export default class PullToRefresh extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const { listData } = this.props;
    if (listData.totalPages === -1 && nextProps.listData.totalPages > -1) {
      this.largeList.endRefresh();
    }
    // else if (listData.totalPages === -1 && nextProps.listData.totalPages > -1) {
    //   this.largeList.endLoading();
    // }
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

  render() {
    const { listData, ListItem } = this.props;
    return (
      <LargeList
        ref={(v) => { this.largeList = v; }}
        renderIndexPath={({ row }) => <ListItem item={listData.list[row]} />}
        data={[{ items: listData.list }]}
        showsVerticalScrollIndicator={false}
        refreshHeader={ChineseWithLastDateHeader}
        loadingFooter={this.renderFooter}
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
