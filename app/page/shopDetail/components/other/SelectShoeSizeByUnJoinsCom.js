import React, { Component } from 'react';
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Image from '../../../../components/Image';
import { hitSlop, SCREEN_WIDTH } from '../../../../common/Constant';
import { BottomBtnGroup } from '../../../../components';
import { commonStyle } from '../../../../res/style/CommonStyle';
import Images from '../../../../res/Images';
import Colors from '../../../../res/Colors';
import { YaHei } from '../../../../res/FontFamily';
import { debounce } from '../../../../utils/commonUtils';
import { doBuyNow } from '../../../../redux/actions/shopDetailInfo';

export default class SelectShoeSizeByUnJoinsCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseId: '-1',
      shoesList: [],
    };
  }

  componentDidMount() {
    const { shoesList } = this.props;
    const _shoesList = JSON.parse(JSON.stringify(shoesList));
    for (let i = 0; i < _shoesList.length; i++) {
      _shoesList[i].isSelect = false;
    }
    this.setState({ shoesList: _shoesList });
  }

  changeChooseStatus = (item) => {
    const { shoesList } = this.state;
    let{ chooseId } = this.state;
    for (let i = 0; i < shoesList.length; i++) {
      const _shoeData = shoesList[i];
      if (_shoeData.id === item.id) {
        _shoeData.isSelect = !_shoeData.isSelect;
        chooseId = _shoeData.isSelect ? item.id : '-1';
      } else {
        _shoeData.isSelect = false;
      }
    }
    this.setState({ shoesList, chooseId });
  };

  _confirmChoose = () => {
    const {
      shopId, closeBox, navigation, shopInfo,
    } = this.props;
    const { chooseId } = this.state;
    closeBox();
    doBuyNow(shopId, chooseId, navigation, shopInfo);
  };

  render() {
    const { shoesList, closeBox } = this.props;
    const { shoesList: _shoesList, chooseId } = this.state;
    const showShoesLit = _shoesList.length !== 0 ? _shoesList : shoesList;
    return (
      <View style={_style.container}>
        <View style={{ flex: 1, height: 400 }}>
          <View style={commonStyle.row}>
            <View style={_style.mainView}>
              <Text style={_style.title}>鞋码选择</Text>
            </View>
            <TouchableOpacity hitSlop={hitSlop} style={_style.close} onPress={() => closeBox()}>
              <Image style={_style.close} source={Images.close_shoe} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={_style.centerView}>
              {
                showShoesLit.map(item => (
                  <TouchableOpacity key={item.id} onPress={() => this.changeChooseStatus(item)}>
                    <View style={_style.itemView}>
                      <View style={{
                        width: '90%',
                        height: '90%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Colors.WHITE_COLOR,
                        borderColor: item.isSelect ? Colors.OTHER_BACK : '#fff',
                        borderWidth: StyleSheet.hairlineWidth,
                      }}
                      >
                        <Text style={[_style.sizeAndCount, { color: item.isSelect ? Colors.OTHER_BACK : '#000' }]}>{item.size}</Text>
                        <Text style={[_style.price, { color: item.isSelect ? Colors.OTHER_BACK : '#000' }]}>{`￥${item.price / 100}`}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              }
            </View>
          </ScrollView>
        </View>
        <BottomBtnGroup btns={[{
          text: '确认',
          onPress: debounce(this._confirmChoose),
          disabled: chooseId === '-1',
        }]}
        />
      </View>
    );
  }
}

const _style = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE_COLOR,
    height: 400,
  },
  mainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 23,
  },
  close: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
    top: 5,
    marginLeft: 10,
  },
  alreadyChoose: {
    fontSize: 15,
    color: Colors.NORMAL_TEXT_0,
    fontFamily: YaHei,
    fontWeight: '300',
    marginLeft: 20,
  },
  centerView: {
    marginTop: 28,
    height: 250,
    backgroundColor: Colors.NORMAL_TEXT_F2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
  },
  itemView: {
    width: SCREEN_WIDTH / 4.3,
    height: 68,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.NORMAL_TEXT_F2,
  },
  rightView: {
    position: 'absolute',
    right: 46,
    top: 0,
  },
  sizeAndCount: {
    fontFamily: YaHei,
    fontWeight: 'bold',
    fontSize: 18,
  },
  price: {
    fontSize: 15,
  },
  lrImage: {
    width: 6,
    height: 8,
  },
  line: {
    width: 340,
    height: 1,
    marginTop: 12,
    marginBottom: 19,
    marginLeft: 26,
  },
});
