import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListItem from './ListItem';
import { NavigationBarCom, PullToRefresh } from '../../components';
import { STATUSBAR_AND_NAV_HEIGHT } from '../../common/Constant';
import { fetchListData } from '../../redux/actions/listData';
import { getListData } from '../../redux/reselect/listData';

const TYPE = 'activityNotice';

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

class Activity extends Component {
  constructor(props) {
    super(props);
    this.fetchData();
  }

  fetchData = (fetchMore) => {
    const { fetchListData } = this.props;
    fetchListData(TYPE, { type: 1 }, fetchMore);
  }

  loadMore = () => {
    this.fetchData(true);
  }

  renderItem = ({ item }) => <ListItem item={item} />

  render() {
    const { listData } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <NavigationBarCom title="活动通知" />
        <PullToRefresh
          Wrapper={FlatList}
          totalPages={listData.totalPages}
          currentPage={listData.currentPage}
          refresh={this.fetchData}
          style={{ marginTop: STATUSBAR_AND_NAV_HEIGHT }}
          data={listData.list}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
