/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  ScrollView, View, Text, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getListData } from '../../redux/reselect/listData';
import { fetchListData } from '../../redux/actions/listData';
import { getScreenWidth } from '../../common/Constant';
import Colors from '../../res/Colors';
import { ScaleView } from '../../components';

const TYPE = 'freeTradeSearchUser';

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

class UserList extends PureComponent {
  loadMore = () => {
    this.fetchData('more');
  }

  fetchData = (fetchType, params) => {
    const { fetchListData } = this.props;
    fetchListData(TYPE, params, fetchType);
  }

  render() {
    const { listData } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, backgroundColor: Colors.MAIN_BACK }} contentContainerStyle={styles.container}>
          { [1, 2, 3, 5, 4, 6].map((v, i) => (
            <ScaleView key={i} style={styles.item}>
              <Text>123</Text>
            </ScaleView>
          )) }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: (getScreenWidth() - 15) / 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: (getScreenWidth() - 15) / 4,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginRight: 3,
    marginTop: 3,
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(UserList);
