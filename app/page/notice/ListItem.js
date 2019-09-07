import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Image, CountdownCom } from '../../components';
import Images from '../../res/Images';
import { showModalbox, closeModalbox } from '../../redux/actions/component';
import { YaHei } from '../../res/FontFamily';
import Colors from '../../res/Colors';
import { wPx2P } from '../../utils/ScreenUtil';
import TitleWithTag from './TitleWithTag';
import { formatDate } from '../../utils/commonUtils';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    showModalbox, closeModalbox,
  }, dispatch);
}

class ListItem extends PureComponent {
  finish = () => {

  }

  toPay = () => {

  }

  render() {
    const { item } = this.props;
    return (
      <View>
        <Text style={styles.date}>{formatDate(item.time, '/')}</Text>
        <View style={styles.container}>
          <View style={{ justifyContent: 'space-between', marginRight: 15 }}>
            {/* <Image source={{ uri: item.image }} style={styles.shoe} /> */}
            <Image source={Images.shoe} style={styles.shoe} />
            {/* <Text style={styles.id}>{`编号: ${item.order_id}`}</Text> */}
          </View>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <TitleWithTag text={item.activity_name} type={item.type} />
            {
            item.type !== '6' && (
            <View style={styles.timeWrapper}>
              <Text style={styles.time}>待付款</Text>
              <CountdownCom
                finish={this.finish}
                style={{ ...styles.time, width: 50 }}
                time={item.end_time}
              />
            </View>
            )
          }
            {
            item.type !== '6'
            && (
            <TouchableOpacity onPress={this.toPay} style={styles.btn}>
              <Text style={styles.fukuan}>付款</Text>
            </TouchableOpacity>
            )
          }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginHorizontal: 9,
    flexDirection: 'row',
  },
  date: {
    color: '#B6B6B6',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 2,
  },
  shoe: {
    width: wPx2P(113),
    height: wPx2P(65),
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    overflow: 'hidden',
    marginLeft: 9,
    backgroundColor: '#EF4444',
    width: 115,
    height: 25,
    alignSelf: 'flex-end',
  },
  fukuan: {
    fontSize: 10,
    color: '#fff',
    fontFamily: YaHei,
  },
  time: {
    fontSize: 11,
    color: Colors.OTHER_BACK,
  },
  timeWrapper: {
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6,
  },
});

export default connect(null, mapDispatchToProps)(withNavigation(ListItem));
