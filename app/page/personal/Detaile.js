import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Colors from '../../res/Colors';
import { YaHei } from '../../res/FontFamily';
import { updateUser } from '../../redux/actions/userInfo';
import { getUserInfo } from '../../redux/reselect/userInfo';

function mapStateToProps() {
  return state => ({
    userInfo: getUserInfo(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUser,
  }, dispatch);
}

class Detaile extends PureComponent {
  renderItem = () => (
    <TouchableOpacity style={styles.item}>
      <View>
        <Text style={{ fontFamily: YaHei }}>提现</Text>
        <Text style={{ fontSize: 13, color: '#666' }}>2019-08-28 16:25:06</Text>
      </View>
      <View>
        <Text style={{ fontSize: 17, fontFamily: YaHei }}>+ 2600</Text>
      </View>
    </TouchableOpacity>
  )

  renderFooter = () => {
    // const { vendors } = this.props;
    // if (vendors.totalPages === vendors.currentPage && vendors.totalPages > 0) {
    //   return (
    //     <View style={styles.loadingFooter}>
    //       <Text style={styles.loadingText}>没有更多了</Text>
    //     </View>
    //   );
    // }
    // return (
    //   <View style={styles.loadingFooter}>
    //     <Text style={styles.loadingText}>加载中</Text>
    //     <Image source={Images.loading} style={styles.loadingGif} />
    //   </View>
    // );
  }

  loadMore = () => {

  }

  render() {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={5}
        initialNumToRender={3}
        style={{ flex: 1 }}
        // ListFooterComponent={this.renderFooter}
        data={Array(50).fill('')}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => `${item.source_id}-${index}`}
        onEndReached={this.loadMore}
        removeClippedSubviews={false}
        onEndReachedThreshold={0.5}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Detaile);
