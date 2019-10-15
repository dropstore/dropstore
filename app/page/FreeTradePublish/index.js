import React, { PureComponent } from 'react';
import {
  FlatList, View, TextInput, StyleSheet, Animated,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getListData } from '../../redux/reselect/listData';
import { fetchListData } from '../../redux/actions/listData';
import { getScreenWidth } from '../../common/Constant';
import { debounceDelay } from '../../utils/commonUtils';
import Images from '../../res/Images';
import Colors from '../../res/Colors';
import { Image, PullToRefresh } from '../../components';
import ListItem from '../../components/FreeTradeList/ListItem';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const HeaderHeight = 46;
const TYPE = 'freeTradePublishList';

function mapStateToProps() {
  return state => ({
    listData: getListData(state, TYPE),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchListData,
  }, dispatch);
}

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.filterParams = {};
    this.fetchData();
    this.translateY = new Animated.Value(0);
  }

  itemOnPress = (item) => {
    const { navigation } = this.props;
    navigation.navigate('ChooseSize', {
      title: '选择鞋码',
      item,
    });
  }

  loadMore = () => {
    this.fetchData('more');
  }

  fetchData = (fetchType) => {
    const { fetchListData, params } = this.props;
    fetchListData(TYPE, { ...this.filterParams, ...params }, fetchType);
  }

  onChangeText = (goods_name) => {
    this.filterParams = { goods_name };
    this.fetchData();
  }

  onScroll = (e) => {
    const y = e.nativeEvent.contentOffset.y;
    if (y < 0) {
      this.translateY.setValue(y);
      return;
    }
    this.lastTriggerAnimatedY = this.lastTriggerAnimatedY || y;
    this.diff = this.lastTriggerAnimatedY - y;
    if (this.diff < -36) {
      this.lastTriggerAnimatedY = y;
      if (this.drogDirection !== 'up') {
        this.drogDirection = 'up';
        Animated.timing(
          this.translateY,
          {
            toValue: -HeaderHeight,
            duration: 300,
            useNativeDriver: true,
          },
        ).start();
      }
    } else if (this.diff > 36) {
      this.lastTriggerAnimatedY = y;
      if (this.drogDirection !== 'down') {
        this.drogDirection = 'down';
        Animated.timing(
          this.translateY,
          {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          },
        ).start();
      }
    }
  }

  renderItem = ({ item }) => <ListItem showPrice={false} onPress={this.itemOnPress} item={item} />

  render() {
    const { listData } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <PullToRefresh
          style={{ flex: 1, backgroundColor: Colors.MAIN_BACK }}
          totalPages={listData.totalPages}
          currentPage={listData.currentPage}
          Wrapper={AnimatedFlatList}
          onScroll={this.onScroll}
          data={listData.list}
          refresh={this.fetchData}
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.list}
          renderItem={this.renderItem}
          numColumns={2}
          scrollEventThrottle={1}
          onEndReached={this.loadMore}
        />
        <Animated.View style={[styles.header, { transform: [{ translateY: this.translateY }] }]}>
          <View style={styles.searchWrapper}>
            <Image source={Images.search} style={styles.search} />
            <TextInput
              onChangeText={debounceDelay(this.onChangeText)}
              underlineColorAndroid="transparent"
              returnKeyType="search"
              placeholder="搜索"
              placeholderTextColor="#9F9F9F"
              style={styles.searchTextInput}
              onSubmitEditing={e => this.onChangeText(e.nativeEvent.text)}
              clearButtonMode="while-editing"
            />
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingLeft: 9,
    paddingTop: HeaderHeight,
    paddingRight: 1,
  },
  header: {
    height: HeaderHeight,
    backgroundColor: '#fff',
    position: 'absolute',
    width: getScreenWidth(),
  },
  searchWrapper: {
    flex: 1,
    marginTop: 6,
    marginHorizontal: 9,
    marginBottom: 10,
    borderRadius: 2,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  searchTextInput: {
    flex: 1,
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 0,
  },
  search: {
    width: 12,
    height: 12,
    marginLeft: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
