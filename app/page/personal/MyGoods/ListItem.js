import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Image, Price } from '../../../components';
import Images from '../../../res/Images';
import { showModalbox, closeModalbox } from '../../../redux/actions/component';
import { YaHei } from '../../../res/FontFamily';
import { wPx2P } from '../../../utils/ScreenUtil';
import Modal from './Modal';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    showModalbox, closeModalbox,
  }, dispatch);
}

class ListItem extends PureComponent {
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
            <View style={[styles.tag, item.type === 0 ? styles.qihuo : styles.xianhuo]} />
            <Text style={styles.shopTitle}>
              <Text style={styles.tagText}>{item.type === 0 ? '期货 ' : '现货 '}</Text>
              {item.title}
            </Text>
          </View>
          <View style={styles.middle}>
            <Price price={item.price} />
            <Text style={{ fontSize: 11 }}>{item.subTitle}</Text>
          </View>
          {
            type === 'onSale' && (
            <View style={styles.btnGroup}>
              <TouchableOpacity onPress={() => this.onPress('edit')} style={[styles.btn, { backgroundColor: '#FFA700' }]}>
                <Text style={styles.text}>编辑</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onPress('cancel')} style={[styles.btn, { backgroundColor: '#EF4444' }]}>
                <Text style={styles.text}>取消</Text>
              </TouchableOpacity>
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
    marginTop: 9,
  },
  btn: {
    height: 25,
    width: 52,
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
});

export default connect(null, mapDispatchToProps)(withNavigation(ListItem));
