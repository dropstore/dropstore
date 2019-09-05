import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Clipboard,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Image, Price, CountdownCom } from '../../../components';
import Images from '../../../res/Images';
import { showModalbox, closeModalbox } from '../../../redux/actions/component';
import { YaHei } from '../../../res/FontFamily';
import Colors from '../../../res/Colors';
import { wPx2P } from '../../../utils/ScreenUtil';
import { showToast } from '../../../utils/MutualUtil';
import Modal from './Modal';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    showModalbox, closeModalbox,
  }, dispatch);
}

class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    const { item, type } = this.props;
    // 0期货 1现货（已鉴定或从平台购买的）2发布（未填写物流）3发布（已填写物流及鉴定中） 4鉴定（未通过）
    this.btns = [];
    if (type === 'onSale') {
      this.btns = [
        { title: '编辑', backgroundColor: '#FFA700', key: 'edit' },
        { title: '取消', backgroundColor: '#EF4444', key: 'cancel' },
      ];
    } else if (type === 'intoWarehouse') {
      if (item.type === 0) {
        this.btns = [
          { title: '发布', backgroundColor: '#FFA700', key: 'publish' },
        ];
      } else if (item.type === 1) {
        this.btns = [
          { title: '发布', backgroundColor: '#FFA700', key: 'publish' },
          { title: '提货', backgroundColor: '#EF4444', key: 'pickUp' },
        ];
      } else if (item.type === 2) {
        this.btns = [
          { title: '填写物流信息', backgroundColor: '#FFA700', key: 'express' },
        ];
      } else if ([3, 4].includes(item.type)) {
        this.btns = [
          { title: '寄回', backgroundColor: '#EF4444', key: 'sendBack' },
        ];
      }
    } else if (type === 'uncomplete') {
      this.btns = [
        { title: '付款', backgroundColor: '#EF4444', key: 'pay' },
      ];
    }
  }

  onPress = (type) => {
    const { showModalbox, navigation, closeModalbox } = this.props;
    showModalbox({
      element: (<Modal
        navigation={navigation}
        closeModalbox={closeModalbox}
        type={type}
        editCallback={this.editCallback}
        cancelCallback={this.cancelCallback}
      />),
      options: {
        style: {
          height: type === 'edit' ? 287 : 197,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    });
  }

  editCallback = () => new Promise((resolve, reject) => {
    resolve();
  })

  cancelCallback = () => new Promise((resolve, reject) => {
    resolve();
  })

  finish = () => {

  }

  copy = () => {
    const { item } = this.props;
    Clipboard.setString(item.yundanhao);
    showToast('运单号已复制');
  }

  render() {
    const { item, type } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'space-between', marginRight: 15 }}>
          <Image source={Images.shoe} style={styles.shoe} />
          <Text style={styles.id}>{`编号: ${item.id}`}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.tag, item.type === 0 ? styles.qihuo : [2, 3, 4].includes(item.type) ? styles.fabu : styles.xianhuo]} />
            <Text style={styles.shopTitle}>
              <Text style={styles.tagText}>{item.type === 0 ? '期货 ' : [2, 3, 4].includes(item.type) ? '发布 ' : '现货 '}</Text>
              {item.title}
            </Text>
          </View>
          <View style={styles.middle}>
            <Price price={item.price} />
            {
              type === 'uncomplete' ? (
                <View style={styles.timeWrapper}>
                  <Text style={styles.time}>待付款</Text>
                  <CountdownCom
                    finish={this.finish}
                    style={{ ...styles.time, width: 50 }}
                    time={item.time + 15 * 60}
                  />
                </View>

              ) : <Text style={{ fontSize: 11 }}>{item.subTitle}</Text>
            }
          </View>
          { type === 'uncomplete' && <Text style={styles.cuoguo}>请在规定时间内完成支付，错过将失去购买资格</Text>}
          { type === 'sendOut' && <Text onPress={this.copy} style={styles.yundanhao}>{`运单号：${item.yundanhao}`}</Text>}
          {
            this.btns.length > 0 && (
            <View style={[styles.btnGroup, { marginTop: type === 'uncomplete' ? 3 : 9 }]}>
              {
              this.btns.map(v => (
                <TouchableOpacity key={v.key} onPress={() => this.onPress(v.key)} style={[styles.btn, { backgroundColor: v.backgroundColor }]}>
                  <Text style={styles.text}>{v.title}</Text>
                </TouchableOpacity>
              ))
            }
            </View>
            )
          }
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
    marginTop: 7,
    flexDirection: 'row',
  },
  shoe: {
    width: wPx2P(113),
    height: wPx2P(65),
  },
  id: {
    fontSize: 12,
    marginTop: 15,
  },
  tagText: {
    color: '#fff',
    fontSize: 10.5,
  },
  qihuo: {
    backgroundColor: '#B4DE2A',
  },
  xianhuo: {
    backgroundColor: '#FFA700',
  },
  fabu: {
    backgroundColor: '#EF4444',
  },
  shopTitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    textAlign: 'justify',
  },
  tag: {
    height: 13,
    width: 23.5,
    overflow: 'hidden',
    borderRadius: 2,
    top: 2.5,
    left: -1.25,
    position: 'absolute',
  },
  middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  btnGroup: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    width: 115,
    height: 25,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    overflow: 'hidden',
    marginLeft: 9,
  },
  text: {
    color: '#fff',
    fontSize: 10,
  },
  cuoguo: {
    color: Colors.OTHER_BACK,
    fontSize: 10,
    marginTop: 2,
    letterSpacing: -0.1,
  },
  time: {
    fontSize: 11,
    color: Colors.OTHER_BACK,
  },
  timeWrapper: {
    flexDirection: 'row',
  },
  yundanhao: {
    color: '#0A8CCF',
    fontSize: 10,
    marginTop: 8,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
});

export default connect(null, mapDispatchToProps)(withNavigation(ListItem));
