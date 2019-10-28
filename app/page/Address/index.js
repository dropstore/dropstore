import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Colors from '../../res/Colors';
import { PADDING_TAB } from '../../common/Constant';
import { YaHei } from '../../res/FontFamily';
import { delAddress, editAddress, setChoosedAddress } from '../../redux/actions/address';
import { ModalNormal, BtnGroup } from '../../components';
import { getAddress } from '../../redux/reselect/address';
import { showModalbox, closeModalbox } from '../../utils/MutualUtil';

function mapStateToProps() {
  return state => ({
    address: getAddress(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    delAddress, editAddress, setChoosedAddress,
  }, dispatch);
}

class Address extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('AddressEdit', { title: '添加收货地址' })}>
        <Text style={{ marginRight: 12 }}>新增</Text>
      </TouchableOpacity>
    ),
  });

  toAdd = () => {
    const { navigation } = this.props;
    navigation.navigate('AddressEdit', {
      title: '添加收货地址',
    });
  }

  choose = (address) => {
    const { navigation, setChoosedAddress } = this.props;
    setChoosedAddress(address);
    navigation.navigate('PickUp', {
      title: '支付运费',
      address,
    });
  }

  toEdit = (address) => {
    const { navigation } = this.props;
    navigation.navigate('AddressEdit', { title: '修改收货地址', address });
  }

  toDel = (address) => {
    const { delAddress } = this.props;
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
          backgroundColor: 'transparent',
        },
      },
    });
  }

  setDefault = (address) => {
    const { editAddress } = this.props;
    editAddress(address.address, address.link_name, address.mobile, '1', address.id);
  }

  render() {
    const { address } = this.props;
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: PADDING_TAB + 50 }} style={styles.container} showsVerticalScrollIndicator={false}>
        {
          address.list.sort((a, b) => b.is_default - a.is_default).map((v) => {
            const btns = [
              { onPress: () => this.toEdit(v), color: '#000', text: '编辑' },
              { onPress: () => this.toDel(v), text: '删除' },
            ];
            return (
              <TouchableOpacity onPress={() => this.choose(v)} key={v.id} style={styles.item}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                  <Text style={styles.shouhuoren}>{`收货人：${v.link_name}`}</Text>
                  <Text style={styles.shouhuoren}>{v.mobile}</Text>
                </View>
                <Text style={styles.address}>{v.address}</Text>
                <BtnGroup btns={btns} />
              </TouchableOpacity>
            );
          })
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
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    paddingTop: 12,
    paddingBottom: 14,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderRadius: 2,
    overflow: 'hidden',
    borderBottomColor: '#C7C7C7',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  addWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 85,
    borderRadius: 2,
    overflow: 'hidden',
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
    fontSize: 13,
    color: '#fff',
    lineHeight: 13.5,
    fontWeight: 'bold',
  },
  shouhuoren: {
    color: '#212121',
    fontFamily: YaHei,
  },
  address: {
    fontSize: 13,
    lineHeight: 15,
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
  yuandian: {
    height: 12,
    width: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yuandian1: {
    backgroundColor: Colors.YELLOW,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    width: 4,
  },
  defaultBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Address);