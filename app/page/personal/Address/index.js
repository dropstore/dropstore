/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImageBackground from '../../../components/ImageBackground';
import Image from '../../../components/Image';
import ScaleView from '../../../components/ScaleView';
import Images from '../../../res/Images';
import Colors from '../../../res/Colors';
import { YaHei } from '../../../res/FontFamily';
import { wPx2P } from '../../../utils/ScreenUtil';
import { updateUser } from '../../../redux/actions/userInfo';
import { getUserInfo } from '../../../redux/reselect/userInfo';
import { showModal } from '../../../utils/MutualUtil';

const address = [{
  name: '张超',
  address: '北京市朝阳区佳汇国际中心A座509',
  mobile: '17554265585',
  default: true,
}, {
  name: '张超',
  address: '北京市朝阳区佳汇国际中心A座509',
  mobile: '17554265585',
  default: false,
}, {
  name: '张超',
  address: '北京市朝阳区佳汇国际中心A座509',
  mobile: '17554265585',
  default: false,
}];

function mapStateToProps() {
  return state => ({
    userInfo: getUserInfo(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUser,
  }, dispatch);
}

class Address extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    navigation.setParams({
      headerRight: (
        <TouchableOpacity onPress={this.add} style={styles.rightWrapper}>
          <Image source={Images.xiaoJiaHao} style={{ width: 9, height: 9 }} />
        </TouchableOpacity>
      ),
    });
  }

  setDefault = (address) => {

  }

  delete = (address) => {
    showModal('确认删除该地址吗？', () => {

    }, { title: '' });
  }

  add = () => {
    const { navigation } = this.props;
    navigation.navigate('AddressEdit');
  }

  edit = (address) => {
    const { navigation } = this.props;
    navigation.navigate('AddressEdit', { title: '编辑地址', address });
  }

  render() {
    // const {  } = this.props;
    return (
      <ScrollView style={styles.container}>
        {
          address.map((v, i) => (
            <ScaleView key={`address${i}`} style={styles.item} onPress={() => this.edit(v)}>
              <View style={styles.nameWrapper}>
                <Text style={styles.nameText}>{`收货人: ${v.name}`}</Text>
                <Text style={styles.nameText}>{v.mobile}</Text>
              </View>
              <Text style={styles.address}>{v.address}</Text>
              <View style={styles.bottom}>
                <TouchableOpacity style={styles.choose} onPress={() => this.setDefault(v)}>
                  <ImageBackground style={styles.chooseCircle} source={Images.chooseCircle}>
                    {v.default && <View style={styles.default} />}
                  </ImageBackground>
                  <Text style={styles.address}>默认地址</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={styles.btnWrapper} onPress={() => this.edit(v)}>
                    <ImageBackground style={styles.btn} source={Images.frameAddressEdit}>
                      <Image source={Images.bianji} style={styles.bianji} />
                      <Text style={styles.deleteText}>编辑</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.btnWrapper, { marginLeft: 7 }]} onPress={() => this.delete(v)}>
                    <ImageBackground style={styles.btn} source={Images.frameAddressEdit}>
                      <Image source={Images.shanchu} style={styles.shanchu} />
                      <Text style={styles.deleteText}>删除</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
            </ScaleView>
          ))
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  default: {
    width: wPx2P(5),
    height: wPx2P(5),
    backgroundColor: Colors.OTHER_BACK,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.MAIN_BACK,
    paddingTop: wPx2P(20),
  },
  item: {
    backgroundColor: '#fff',
    marginHorizontal: wPx2P(12),
    borderRadius: wPx2P(5),
    marginBottom: wPx2P(10),
    paddingTop: wPx2P(12),
    paddingHorizontal: wPx2P(15),
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(211, 211, 211)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 5,
      },
      android: {
        elevation: 1.5,
        position: 'relative',
      },
    }),
  },
  rightWrapper: {
    paddingRight: 12,
    height: '100%',
    paddingLeft: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: wPx2P(7),
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 14,
    fontFamily: YaHei,
  },
  address: {
    fontSize: 11,
  },
  btnWrapper: {
    paddingTop: wPx2P(15),
    paddingBottom: wPx2P(13),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    width: wPx2P(53),
    height: wPx2P(17),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  choose: {
    paddingTop: wPx2P(15),
    paddingBottom: wPx2P(13),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chooseCircle: {
    width: wPx2P(16),
    height: wPx2P(16),
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bianji: {
    width: wPx2P(13),
    height: wPx2P(10),
  },
  shanchu: {
    width: wPx2P(10),
    height: wPx2P(12),
  },
  deleteText: {
    fontSize: wPx2P(10),
    color: '#fff',
    marginLeft: 2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Address);
