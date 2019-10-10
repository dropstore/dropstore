import React from 'react';
import { View, RefreshControl, StyleSheet } from 'react-native';
import ScrollableTabView from 'rn-collapsing-tab-bar';
import Colors from '../../res/Colors';
import Header from './Header';
import TabBar from '../../components/TabBar';
import { getScreenHeight, STATUSBAR_AND_NAV_HEIGHT } from '../../common/Constant';
import List from './List';

const routes = [
  { key: 'freeTradeGoodsPrice', title: '询价' },
  { key: 'freeTradeGoodsDetail', title: '概述' },
  { key: 'freeTradeHistory', title: '交易历史' },
];

export default class Collapse extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.goods = navigation.getParam('item');
    this.state = {
      index: 0,
      tabHeight0: getScreenHeight() - STATUSBAR_AND_NAV_HEIGHT,
      tabHeight1: getScreenHeight() - STATUSBAR_AND_NAV_HEIGHT,
      tabHeight2: getScreenHeight() - STATUSBAR_AND_NAV_HEIGHT,
    };
  }

  loadMore = () => {
    console.log(123);
  }

  onRefresh = () => {
    console.log(456);
  }

  onChangeTab = (index) => {
    const nextIndex = typeof index === 'number' ? index : index.i;
    const { index: lastIndex } = this.state;
    if (nextIndex !== lastIndex) {
      this.setState({ index: nextIndex });
    }
  }

  measure = (event, i) => {
    this.setState({
      [`tabHeight${i}`]: event.nativeEvent.layout.height,
    });
  }

  render() {
    const {
      index, tabHeight0, tabHeight1, tabHeight2,
    } = this.state;
    const { navigation } = this.props;
    return (
      <ScrollableTabView
        collapsableBar={<Header item={this.goods} />}
        tabContentHeights={[tabHeight0, tabHeight1, tabHeight2]}
        scrollEnabled
        page={index}
        refreshControl={(
          <RefreshControl
            progressViewOffset={20}
            tintColor={Colors.OTHER_BACK}
            onRefresh={this.onRefresh}
            refreshing={false}
          />
          )}
        prerenderingSiblingsNumber={Infinity}
        onChangeTab={this.onChangeTab}
        showsVerticalScrollIndicator={false}
        loadMore={this.loadMore}
        renderTabBar={() => (
          <TabBar
            style={styles.tabBar}
            routes={routes}
            index={index}
            itemMargin={20}
            onIndexChange={this.onChangeTab}
          />
        )}
      >
        {
          routes.map((v, i) => (
            <View key={v.key} onLayout={event => this.measure(event, i)}>
              <List navigation={navigation} type={v.key} goods={this.goods} />
            </View>
          ))
        }
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    height: 50,
    flexDirection: 'row',
    paddingBottom: 6,
    paddingHorizontal: 9,
  },
});
