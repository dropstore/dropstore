import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Colors from '../../../res/Colors';
import { PADDING_TAB } from '../../../common/Constant';
import { YaHei } from '../../../res/FontFamily';
import { fetchAddress, delAddress } from '../../../redux/actions/address';
import { ModalNormal } from '../../../components';
import { showModalbox, closeModalbox } from '../../../redux/actions/component';
import { getAddress } from '../../../redux/reselect/address';

function mapStateToProps() {
  return state => ({
    address: getAddress(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAddress, showModalbox, closeModalbox, delAddress,
  }, dispatch);
}

class ChooseAddress extends PureComponent {
  constructor(props) {
    super(props);
    const { fetchAddress } = this.props;
    fetchAddress();
  }

  toAdd = () => {
    const { navigation } = this.props;
    navigation.navigate('AddressEdit', {
      title: '添加收货地址',

    });
  }

  choose = (address) => {
    const { navigation } = this.props;
    navigation.pop();
  }

  toEdit = (address) => {
    const { navigation } = this.props;
    navigation.navigate('AddressEdit', { title: '修改收货地址', address });
  }

  toDel = (address) => {
    const { showModalbox, closeModalbox, delAddress } = this.props;
    showModalbox({
      element: (<ModalNormal
        sure={() => {
          delAddress(address.id).then(() => {
            closeModalbox();
          });
        }}
        closeModalbox={closeModalbox}
        text="确认删除该地址？"
      />),
      options: {
        style: {
          height: 197,
          width: 265,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    });
  }

  render() {
    const { address } = this.props;
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: PADDING_TAB + 50 }} style={styles.container} showsVerticalScrollIndicator={false}>
        {
          address.map(v => (
            <TouchableOpacity onPress={() => this.choose(v)} key={v.id} style={styles.item}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text style={styles.shouhuoren}>{`收货人：${v.link_name}`}</Text>
                <Text style={styles.shouhuoren}>{v.mobile}</Text>
              </View>
              <Text style={styles.address}>{v.address}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={() => this.toEdit(v)} style={[styles.btn, { backgroundColor: '#FFA700' }]}>
                  <Text style={styles.edit}>编辑</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.toDel(v)} style={[styles.btn, { backgroundColor: '#EF4444', marginLeft: 9 }]}>
                  <Text style={styles.edit}>删除</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        }
        <TouchableOpacity style={styles.addWrapper} onPress={this.toAdd}>
          <View style={styles.addIcon}>
            <Text style={styles.plus}>+</Text>
          </View>
          <Text style={styles.add}>添加收货地址</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.MAIN_BACK,
    flex: 1,
    paddingHorizontal: 9,
  },
  item: {
    height: 85,
    paddingTop: 6,
    paddingBottom: 14,
    justifyContent: 'space-between',
    paddingHorizontal: 11,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginTop: 7,
  },
  addWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 85,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginTop: 7,
    flexDirection: 'row',
  },
  add: {
    color: '#8E8D8D',
  },
  addIcon: {
    backgroundColor: '#BCBCBC',
    width: 13,
    height: 13,
    borderRadius: 6.5,
    overflow: 'hidden',
    alignItems: 'center',
    marginRight: 5,
  },
  plus: {
    fontSize: 12,
    color: '#fff',
    lineHeight: 13.5,
    fontWeight: 'bold',
  },
  shouhuoren: {
    color: '#212121',
    fontFamily: YaHei,
  },
  address: {
    fontSize: 12,
  },
  edit: {
    fontSize: 10,
    color: '#fff',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    width: 53,
    borderRadius: 2,
    overflow: 'hidden',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseAddress);
