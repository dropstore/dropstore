import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LargeList } from 'react-native-largelist-v3';
import { ChineseWithLastDateHeader } from 'react-native-spring-scrollview/Customize';
import Image from './Image';
import Colors from '../res/Colors';
import Images from '../res/Images';
import { SCREEN_HEIGHT } from '../common/Constant';

export default class CustomLargeList extends PureComponent {
  constructor(props) {
    super(props);
    this.loadedHeight = 0;
  }

  componentWillReceiveProps(nextProps) {
    const { listData } = this.props;
    if (listData.totalPages === -1 && nextProps.listData.totalPages > -1) {
      this.largeList.endRefresh();
      this.loadedHeight = 0;
    }
  }

  onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    if (this.scrollViewHeight - y - this.containerHeight < SCREEN_HEIGHT * 0.3 && this.scrollViewHeight > this.loadedHeight) {
      this.loadedHeight = this.scrollViewHeight;
      const { loadMore } = this.props;
      loadMore();
    }
  }

  onContentSizeChange = ({ height }) => {
    this.scrollViewHeight = height;
  }

  onSizeChange = ({ height }) => {
    this.containerHeight = height;
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
        onSizeChange={this.onSizeChange}
        onContentSizeChange={this.onContentSizeChange}
        onScroll={this.onScroll}
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
