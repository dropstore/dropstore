import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Image from '../../../components/Image';
import ScaleView from '../../../components/ScaleView';
import Images from '../../../res/Images';
import { removeOrderStateListItem } from '../../../redux/actions/orderState';
import { YaHei, Mario } from '../../../res/FontFamily';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removeOrderStateListItem,
  }, dispatch);
}

class OrderListItem extends PureComponent {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      date: item.date - Date.now(),
    };
  }

  componentDidMount() {
    const { item, removeOrderStateListItem, type } = this.props;
    this.timeInterval = setInterval(() => {
      const { date } = this.state;
      if (date < 1000) {
        removeOrderStateListItem(item.id, type);
        return;
      }
      this.setState({ date: item.date - Date.now() });
    }, 1000);
  }

  componentWillUnmount() {
    this.timeInterval && clearInterval(this.timeInterval);
  }

  toVendorPage = () => {
    const { navigation } = this.props;
    navigation.push('vendorDetail', {
      title: '详情页',
    });
  }

  render() {
    const { item } = this.props;
    const { date } = this.state;
    const time = `${parseInt(date / 3600000).toString().padStart(2, 0)}:${
      parseInt((date % 3600000) / 60000).toString().padStart(2, 0)}:${
      parseInt((date % 60000) / 1000).toString().padStart(2, 0)}`;
    const creat = new Date(item.creat);
    return (
      <ScaleView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image style={{ width: 10, height: 13 }} source={Images.salou} />
            <Text style={styles.dateText}>待付款 </Text>
            <Text style={styles.date}>{time}</Text>
          </View>
          <Text style={styles.hint}>请在规定内时间完成支付，错过将失去中奖资格。</Text>
        </View>
        <View style={styles.middle}>
          <Text style={styles.creat}>
            {`创建日期: ${creat.getFullYear()}-${creat.getMonth().toString().padStart(2, 0)}-${creat.getDate().toString().padStart(2, 0)}`}
          </Text>
          <Text style={styles.creat}>{`订单编号: ${item.id}`}</Text>
        </View>
        <View style={styles.middle}>
          <View style={{ flex: 1 }}>
            <Text>{item.title}</Text>
            <Text style={styles.price}>{`${item.price}￥`}</Text>
          </View>
          <Image resizeMode="contain" style={{ width: 92, height: 50 }} source={item.image} />
        </View>
      </ScaleView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 8,
    marginTop: 14,
    paddingBottom: 10,
  },
  header: {
    height: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#c20000',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
  },
  dateText: {
    marginLeft: 5,
    color: '#fff',
    fontFamily: YaHei,
    lineHeight: 17.5,
    fontSize: 12,
  },
  date: {
    color: '#fff',
    fontFamily: Mario,
    lineHeight: 17.5,
    fontSize: 12,
  },
  hint: {
    fontSize: 10,
    color: '#fff',
  },
  creat: {
    fontSize: 10,
  },
  middle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 5,
  },
  price: {
    fontFamily: YaHei,
    fontSize: 15,
    marginTop: 20,
  },
});

export default connect(null, mapDispatchToProps)(withNavigation(OrderListItem));
