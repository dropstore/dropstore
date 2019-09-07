import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import Image from '../../components/Image';
import ScaleViewWithFrame from '../../components/ScaleViewWithFrame';
import { YaHei, Mario } from '../../res/FontFamily';

class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      date: item.date - Date.now(),
    };
  }

  componentDidMount() {
    const { item } = this.props;
    this.timeInterval = setInterval(() => {
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
    const creat = new Date(item.creat);
    return (
      <ScaleViewWithFrame style={styles.container} containerStyle={styles.containerStyle}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.dateText}>{`${item.type === 0 ? '即将发售' : ''}`}</Text>
          </View>
          {
            item.hint && <Text style={styles.hint}>{item.hint}</Text>
          }
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
      </ScaleViewWithFrame>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 13,
  },
  containerStyle: {
    backgroundColor: '#fff',
    paddingBottom: 8,
    paddingHorizontal: 13,
  },
  header: {
    height: 22,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  dateText: {
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
    marginTop: 5,
  },
  price: {
    fontFamily: YaHei,
    fontSize: 15,
    marginTop: 20,
  },
});

export default withNavigation(ListItem);
