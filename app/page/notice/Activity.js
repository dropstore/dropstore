import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListItem from './ListItem';
import { NavigationBarCom, PullToRefresh } from '../../components';
import { STATUSBAR_AND_NAV_HEIGHT } from '../../common/Constant';
import { fetchList } from '../../redux/actions/list';
import { getList } from '../../redux/reselect/list';

const TYPE = 'activityNotice';

function mapStateToProps() {
  return state => ({
    list: getList(state, TYPE),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchList,
  }, dispatch);
}

class Activity extends Component {
  constructor(props) {
    super(props);
    this.fetchData();
  }

  fetchData = (fetchMore) => {
    const { fetchList } = this.props;
    fetchList(TYPE, { type: 1 }, fetchMore);
  }

  loadMore = () => {
    this.fetchData(true);
  }

  renderItem = ({ item }) => <ListItem item={item} />

  render() {
    const { list } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <NavigationBarCom title="活动通知" />
        <PullToRefresh
          Wrapper={FlatList}
          totalPages={list.totalPages}
          currentPage={list.currentPage}
          refresh={this.fetchData}
          style={{ marginTop: STATUSBAR_AND_NAV_HEIGHT }}
          data={list.list}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
