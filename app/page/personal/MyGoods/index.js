import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import List from './List';
import TabBar from '../../../components/TabBar';
import { SCREEN_WIDTH } from '../../../common/Constant';
import Colors from '../../../res/Colors';
import { YaHei } from '../../../res/FontFamily';

const ROUTES = [
  { key: 'onSale', title: '销售中' },
  { key: 'selled', title: '已卖出' },
];

class MyGoods extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    navigation.setParams({
      headerRight: (
        <TouchableOpacity onPress={this.add} style={styles.rightWrapper}>
          <Text style={{ color: '#fff', fontSize: 13 }}>发布</Text>
        </TouchableOpacity>
      ),
    });
    this.state = {
      index: 0,
      routes: ROUTES,
    };
  }

  onIndexChange = (index) => {
    this.setState({ index });
  }

  add = () => {
    const { navigation } = this.props;
    navigation.navigate('OrderState', {
      url: 'http://m.dropstore.cn/index.html#/help',
      title: '我的库房',
      type: 'intoWarehouse',
    });
  }

  renderScene = ({ route }) => <List type={route.key} />;

  render() {
    const { routes, index } = this.state;
    return (
      <View style={styles.tabView}>
        <View style={styles.header}>
          <TabBar
            style={styles.tabBar}
            routes={routes}
            index={index}
            onIndexChange={this.onIndexChange}
          />
          <View style={styles.textWrapper}>
            <Text style={styles.text1}>{`${index === 0 ? '销售中: ' : '已卖出: '}`}</Text>
            <Text style={[styles.text2, { color: index === 0 ? '#C81919' : '#37B6EB' }]}>5722</Text>
            <Text style={styles.text1}> 双</Text>
          </View>
        </View>

        <TabView
          style={{ flex: 1 }}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={() => null}
          onIndexChange={this.onIndexChange}
          useNativeDriver
          initialLayout={{ width: SCREEN_WIDTH }}
          lazy
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    backgroundColor: Colors.MAIN_BACK,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabBar: {
    height: 57,
    flexDirection: 'row',
    paddingBottom: 9,
    width: 140,
    justifyContent: 'space-between',
    paddingHorizontal: 9,
  },
  rightWrapper: {
    paddingRight: 12,
    height: '100%',
    paddingLeft: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    color: '#272727',
    fontSize: 12,
    fontFamily: YaHei,
    marginBottom: 3.5,
  },
  text2: {
    fontSize: 20,
    fontFamily: YaHei,
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 9,
    marginRight: 8,
  },
});

export default MyGoods;
