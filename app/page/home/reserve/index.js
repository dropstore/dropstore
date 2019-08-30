import React, { PureComponent } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import TopCom from '../components/TopCom';
import VendorSection from './VendorSection';
import Colors from '../../../res/Colors';
import Images from '../../../res/Images';
import { px2Dp } from '../../../utils/ScreenUtil';

export default class Reserve extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shopList: {
        'MAY 5月': [{
          a_price: '3434300',
          activity_name: '现货抢购  AJ JODAN 1 全球限量 1000000双',
          add_time: '1567073369',
          b_type: '1',
          create_admin: '1',
          describe: '而非',
          end_time: '0',
          goods_id: '5',
          goods_type: '2',
          id: '19',
          image: 'http://res.dropstore.cn/tower/goods/image/5d679cf10afb5695121.webp',
          is_del: '0',
          is_follow: 0,
          is_shelf: '1',
          l_time: '10',
          min_price: '0',
          price: '23300',
          start_time: '1569924480',
          type: '1',
          white: '',
        }, {
          a_price: '3434300',
          activity_name: '现货抢购  AJ JODAN 1 全球限量 1000000双',
          add_time: '1567073369',
          b_type: '1',
          create_admin: '1',
          describe: '而非',
          end_time: '0',
          goods_id: '5',
          goods_type: '2',
          id: '19',
          image: 'http://res.dropstore.cn/tower/goods/image/5d679cf10afb5695121.webp',
          is_del: '0',
          is_follow: 0,
          is_shelf: '1',
          l_time: '10',
          min_price: '0',
          price: '23300',
          start_time: '1569924480',
          type: '1',
          white: '',
        }, {
          leftImage: Images.xh,
          shoe: Images.shoe,
          shopTitle: 'CLOT x AIR JORDAN 13 2018版',
          shopSubTitle: '"BLACK INFREAD" EDC 黑红',
          price: 1999,
          time: '2019/01/06 21:00',
          endTime: '10:56:27',
          perCount: 999,
          status: 2,
        }, {
          a_price: '3434300',
          activity_name: '现货抢购  AJ JODAN 1 全球限量 1000000双',
          add_time: '1567073369',
          b_type: '1',
          create_admin: '1',
          describe: '而非',
          end_time: '0',
          goods_id: '5',
          goods_type: '2',
          id: '19',
          image: 'http://res.dropstore.cn/tower/goods/image/5d679cf10afb5695121.webp',
          is_del: '0',
          is_follow: 0,
          is_shelf: '1',
          l_time: '10',
          min_price: '0',
          price: '23300',
          start_time: '1569924480',
          type: '1',
          white: '',
        }],
        'JUN 6月': [{
          a_price: '3434300',
          activity_name: '现货抢购  AJ JODAN 1 全球限量 1000000双',
          add_time: '1567073369',
          b_type: '1',
          create_admin: '1',
          describe: '而非',
          end_time: '0',
          goods_id: '5',
          goods_type: '2',
          id: '19',
          image: 'http://res.dropstore.cn/tower/goods/image/5d679cf10afb5695121.webp',
          is_del: '0',
          is_follow: 0,
          is_shelf: '1',
          l_time: '10',
          min_price: '0',
          price: '23300',
          start_time: '1569924480',
          type: '1',
          white: '',
        }, {
          a_price: '3434300',
          activity_name: '现货抢购  AJ JODAN 1 全球限量 1000000双',
          add_time: '1567073369',
          b_type: '1',
          create_admin: '1',
          describe: '而非',
          end_time: '0',
          goods_id: '5',
          goods_type: '2',
          id: '19',
          image: 'http://res.dropstore.cn/tower/goods/image/5d679cf10afb5695121.webp',
          is_del: '0',
          is_follow: 0,
          is_shelf: '1',
          l_time: '10',
          min_price: '0',
          price: '23300',
          start_time: '1569924480',
          type: '1',
          white: '',
        }, {
          a_price: '3434300',
          activity_name: '现货抢购  AJ JODAN 1 全球限量 1000000双',
          add_time: '1567073369',
          b_type: '1',
          create_admin: '1',
          describe: '而非',
          end_time: '0',
          goods_id: '5',
          goods_type: '2',
          id: '19',
          image: 'http://res.dropstore.cn/tower/goods/image/5d679cf10afb5695121.webp',
          is_del: '0',
          is_follow: 0,
          is_shelf: '1',
          l_time: '10',
          min_price: '0',
          price: '23300',
          start_time: '1569924480',
          type: '1',
          white: '',
        }, {
          a_price: '3434300',
          activity_name: '现货抢购  AJ JODAN 1 全球限量 1000000双',
          add_time: '1567073369',
          b_type: '1',
          create_admin: '1',
          describe: '而非',
          end_time: '0',
          goods_id: '5',
          goods_type: '2',
          id: '19',
          image: 'http://res.dropstore.cn/tower/goods/image/5d679cf10afb5695121.webp',
          is_del: '0',
          is_follow: 0,
          is_shelf: '1',
          l_time: '10',
          min_price: '0',
          price: '23300',
          start_time: '1569924480',
          type: '1',
          white: '',
        }],
      },
    };
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: Colors.NORMAL_TEXT_F6, flex: 1 }}>
        <TopCom imageSource={Images.bn} />
        <View style={_styles.listContainer}>
          {
            Object.keys(this.state.shopList).map((key, index) => <VendorSection key={index} title={key} shopList={this.state.shopList[key]} />)
          }
        </View>
      </ScrollView>
    );
  }
}

const _styles = StyleSheet.create({
  listContainer: {
    marginTop: px2Dp(26),
    marginLeft: px2Dp(15),
    marginRight: px2Dp(18),
    flex: 1,
  },
});
