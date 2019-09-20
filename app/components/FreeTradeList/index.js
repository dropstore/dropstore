import React, { PureComponent } from 'react';
import {
  FlatList, View, TextInput, StyleSheet, Animated,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PullToRefresh from '../PullToRefresh';
import Image from '../Image';
import { getListData } from '../../redux/reselect/listData';
import { fetchListData } from '../../redux/actions/listData';
import ListItem from './ListItem';
import { SCREEN_WIDTH } from '../../common/Constant';
import { debounceDelay } from '../../utils/commonUtils';
import Images from '../../res/Images';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const HeaderHeight = 46;

function mapStateToProps() {
  return (state, props) => ({
    listData: getListData(state, props.type),
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
    this.fetchData();
    this.translateY = new Animated.Value(0);
  }

  loadMore = () => {
    this.fetchData(true);
  }

  fetchData = (fetchMore) => {
    const { fetchListData, type } = this.props;
    fetchListData(type, { type: 1 }, fetchMore);
  }

  onChangeText = (text) => {
    console.log(text);
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

  renderItem = ({ item }) => {
    const { itemOnPress } = this.props;
    return <ListItem onPress={itemOnPress} item={item} />;
  }

  render() {
    const { listData, style } = this.props;
    return (
      <View style={style}>
        <PullToRefresh
          style={{ flex: 1 }}
          iosOffsetY={HeaderHeight / 2}
          progressViewOffset={HeaderHeight}
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
    width: SCREEN_WIDTH,
  },
  searchWrapper: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 9,
    borderRadius: 2,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DBDBDB',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#F5F5F5',
  },
  searchTextInput: {
    height: '100%',
    flex: 1,
    lineHeight: 34,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 0,
  },
  search: {
    width: 19.5,
    height: 19,
    marginLeft: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
