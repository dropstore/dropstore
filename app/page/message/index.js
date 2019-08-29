import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import ListItem from './ListItem';
import Images from '../../res/Images';
import NavigationBarCom from '../../components/NavigationBarCom';
import { STATUSBAR_AND_NAV_HEIGHT } from '../../common/Constant';

const LIST = [
  {
    title: 'AIR JORDAN 1 HIGH OG 2018版 “ORIGIN STORY”蜘蛛侠',
    image: Images.shoe,
    price: 1999,
    type: 0,
    hint: '请在规定内时间完成支付，错过将失去中奖资格。',
    id: 'D537639998765663425',
    date: Date.now() + 1000 * 60 * 12,
    creat: Date.now() - 1000 * 60 * 12,
  }, {
    title: 'AIR JORDAN 1 HIGH OG 2018版 “ORIGIN STORY”蜘蛛侠',
    image: Images.shoe,
    price: 1999,
    type: 1,
    id: 'D537639998765663425',
    date: Date.now() + 1000 * 60 * 60 * 5,
    creat: Date.now() - 1000 * 60 * 12,
  },
];

export default class MessageCenterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loadMore = () => {

  }

  renderItem = ({ item }) => <ListItem item={item} />

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationBarCom headerTitle="系统通知" isShowLeftView={false} />
        <FlatList
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={5}
          initialNumToRender={3}
          style={{ flex: 1, marginTop: STATUSBAR_AND_NAV_HEIGHT }}
        // ListHeaderComponent={this.renderHeader}
        // ListFooterComponent={this.renderFooter}
          data={LIST}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${item.source_id}-${index}`}
          onEndReached={this.loadMore}
          removeClippedSubviews={false}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}
