import React, { Component } from 'react';
import {
  FlatList, View, Text, StyleSheet, StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PullToRefresh } from '../../components';
import { fetchListData } from '../../redux/actions/listData';
import { getListData } from '../../redux/reselect/listData';
import Colors from '../../res/Colors';
import { formatDate } from '../../utils/commonUtils';

const LIST = [
  {
    add_time: Date.now() / 1000,
    text: '亲爱的用户，JFGH SQIOFH FHISA OHDIOS DSIA FHIHF OIAS，SIOAS FDOIAH FAO ISFAS HIO AHFA OIS WOIDFJWEF HOIEWFHIOEWFHIOWEFI！',
  },
  {
    add_time: Date.now() / 1000,
    text: '亲爱的用户，JFGH SQIOFH FHISA OHDIOS DSIA FHIHF OIAS，SIOAS FDOIAH FAO ISFAS HIO AHFA OIS WOIDFJWEF HOIEWFHIOEWFHIOWEFI！',
  },
];

function mapStateToProps() {
  return state => ({
    listData: getListData(state),
  });
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchListData,
  }, dispatch);
}

class Message extends Component {
  constructor(props) {
    super(props);
    this.fetchData();
  }

  fetchData = (fetchMore) => {
    // const { fetchListData } = this.props;
    // fetchListData(TYPE, { type: 1 }, fetchMore);
  }

  loadMore = () => {
    this.fetchData(true);
  }

  renderItem = ({ item }) => (
    <View>
      <Text style={styles.date}>{formatDate(item.add_time, '/')}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  )

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.MAIN_BACK }}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <PullToRefresh
          Wrapper={FlatList}
          totalPages={1}
          currentPage={1}
          refresh={this.fetchData}
          data={LIST}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    color: '#B6B6B6',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 2,
  },
  text: {
    backgroundColor: '#fff',
    marginHorizontal: 9,
    paddingHorizontal: 10,
    textAlign: 'justify',
    borderRadius: 2,
    overflow: 'hidden',
    fontSize: 12,
    paddingVertical: 6,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
