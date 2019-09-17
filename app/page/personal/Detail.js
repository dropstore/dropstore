import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar,
} from 'react-native';
import { YaHei } from '../../res/FontFamily';
import { PullToRefresh } from '../../components';
import { request } from '../../http/Axios';
import { formatDate } from '../../utils/commonUtils';

export default class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: -1,
      currentPage: 1,
      list: [],
      isFetching: false,
    };
    this.fetchData();
  }

  fetchData = (fetchMore) => {
    const { currentPage, isFetching, totalPages } = this.state;
    if (isFetching || (currentPage >= totalPages && fetchMore)) {
      return;
    }
    const page = fetchMore ? currentPage + 1 : 1;
    request('/user/user_balance', {
      params: {
        pn: page,
        limit: 10,
      },
    }, fetchMore).then((res) => {
      this.setState({
        list: res.data.list,
        totalPages: res.data.number,
        currentPage: page,
      });
    });
  }

  loadMore = () => {
    this.fetchData(true);
  }

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <View>
        <Text style={{ fontFamily: YaHei }}>{item.reason}</Text>
        <Text style={{ fontSize: 13, color: '#666' }}>{formatDate(item.add_time)}</Text>
      </View>
      <View>
        <Text style={{ fontSize: 17, fontFamily: YaHei }}>{`${item.type === '1' ? '- ' : '+ '}${item.price / 100}`}</Text>
      </View>
    </TouchableOpacity>
  )

  render() {
    const { totalPages, currentPage, list } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <PullToRefresh
          totalPages={totalPages}
          currentPage={currentPage}
          Wrapper={FlatList}
          data={list}
          refresh={this.fetchData}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
