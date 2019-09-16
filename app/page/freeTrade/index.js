import React, { PureComponent } from 'react';
import {
  FlatList, View, TextInput, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PullToRefresh, NavigationBarCom, Image } from '../../components';
import { getOrderStateList } from '../../redux/reselect/orderState';
import { fetchOrderStateList } from '../../redux/actions/orderState';
import ListItem from './ListItem';
import { STATUSBAR_AND_NAV_HEIGHT } from '../../common/Constant';
import { debounceDelay } from '../../utils/commonUtils';
import Images from '../../res/Images';

function mapStateToProps() {
  return state => ({
    orderStateList: getOrderStateList(state, 'uncomplete') || {},
  });
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchOrderStateList,
  }, dispatch);
}

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.fetchData();
  }

  loadMore = () => {
    this.fetchData(true);
  }

  fetchData = (fetchMore) => {
    const { fetchOrderStateList } = this.props;
    fetchOrderStateList('/order/order_list', { status: 0 }, 'uncomplete', fetchMore);
  }

  onChangeText = (text) => {
    console.log(text);
  }

  renderItem = ({ item }) => <ListItem item={item} />

  render() {
    const { orderStateList } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <NavigationBarCom title="自由交易" />
        <View style={{ marginTop: STATUSBAR_AND_NAV_HEIGHT, flex: 1 }}>
          <View style={{ height: 46, backgroundColor: '#fff' }}>
            <View style={styles.searchWrapper}>
              <Image source={Images.search} style={styles.search} />
              <TextInput
                onChangeText={debounceDelay(this.onChangeText)}
                underlineColorAndroid="transparent"
                returnKeyType="search"
                placeholder="搜索"
                placeholderTextColor="#9F9F9F"
                style={styles.searchTextInput}
                onSubmitEditing={this.onChangeText}
                clearButtonMode="while-editing"
              />
            </View>
          </View>
          <PullToRefresh
            totalPages={orderStateList.totalPages}
            currentPage={orderStateList.currentPage}
            Wrapper={FlatList}
            data={orderStateList.list}
            refresh={this.fetchData}
            keyboardDismissMode="on-drag"
            style={{ paddingLeft: 9, flex: 1 }}
            renderItem={this.renderItem}
            numColumns={2}
            onEndReached={this.loadMore}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
