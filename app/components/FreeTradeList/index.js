import React, { PureComponent } from 'react';
import {
  FlatList, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PullToRefresh from '../PullToRefresh';
import { getListData } from '../../redux/reselect/listData';
import { fetchListData } from '../../redux/actions/listData';
import ListItem from './ListItem';
import { getScreenWidth } from '../../common/Constant';
import Colors from '../../res/Colors';

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
  }

  itemOnPress = (item) => {
    const { navigation } = this.props;
    navigation.navigate('FreeTradeDetail', {
      title: '商品详情',
      item,
    });
  }

  loadMore = () => {
    this.fetchData('more');
  }

  fetchData = (fetchType, params) => {
    const { fetchListData, type } = this.props;
    fetchListData(type, { type: 1, ...params }, fetchType);
  }

  renderItem = ({ item }) => <ListItem showPrice onPress={this.itemOnPress} item={item} />

  render() {
    const { listData, style } = this.props;
    return (
      <PullToRefresh
        style={{ backgroundColor: Colors.MAIN_BACK, ...style }}
        totalPages={listData.totalPages}
        currentPage={listData.currentPage}
        Wrapper={FlatList}
        data={listData.list}
        refresh={this.fetchData}
        contentContainerStyle={styles.list}
        renderItem={this.renderItem}
        numColumns={2}
        onEndReached={this.loadMore}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingLeft: 9,
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

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(List);
