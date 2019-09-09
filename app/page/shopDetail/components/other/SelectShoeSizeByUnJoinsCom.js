/**
 * @file 未参团抢购鞋组件
 * @date 2019/9/8 11:40
 * @author ZWW
 */
import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Image from '../../../../components/Image';
import {hitSlop, SCREEN_WIDTH} from '../../../../common/Constant';
import ImageBackground from '../../../../components/ImageBackground';
import {commonStyle} from '../../../../res/style/CommonStyle';
import Images from '../../../../res/Images';
import Colors from '../../../../res/Colors';
import {YaHei} from "../../../../res/FontFamily";
import {bottomStyle} from '../../../../res/style/BottomStyle';
import {debounce} from "../../../../utils/commonUtils";
import {doBuyNow, startGroup} from "../../../../redux/actions/shopDetailInfo";
import {showToast} from "../../../../utils/MutualUtil";


export default class SelectShoeSizeByUnJoinsCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseId: '-1',
      shoesList: [],
    }
  }

  componentDidMount() {
    const {shoesList} = this.props;
    let _shoesList = JSON.parse(JSON.stringify(shoesList));
    for (let i = 0; i < _shoesList.length; i++) {
      _shoesList[i].isSelect = false;
    }
    this.setState({shoesList: _shoesList});
  }

  changeChooseStatus = (item) => {
    let shoesList = this.state.shoesList;
    let chooseId = this.state.chooseId;
    for (let i = 0; i < shoesList.length; i++) {
      let _shoeData = shoesList[i];
      if (_shoeData.id === item.id) {
        _shoeData.isSelect = !_shoeData.isSelect;
        chooseId = _shoeData.isSelect ? item.id : '-1';
      } else {
        _shoeData.isSelect = false;
      }
    }
    this.setState({shoesList: shoesList, chooseId: chooseId});
  };

  _confirmChoose = () => {
    const {shopId, closeBox, navigation, shopInfo} = this.props;
    closeBox();
    doBuyNow(shopId, this.state.chooseId, navigation, shopInfo);
  };

  render() {
    const {shoesList, closeBox} = this.props;
    let _shoesList = this.state.shoesList;
    let showShoesLit = _shoesList.length !== 0 ? _shoesList : shoesList;
    return (
      <View style={_style.container}>
        <View style={{flex: 1, height: 400}}>
          <View style={commonStyle.row}>
            <View style={_style.mainView}>
              <Text style={_style.title}>鞋码选择</Text>
            </View>
            <TouchableOpacity hitSlop={hitSlop} style={_style.close} onPress={() => closeBox()}>
              <Image style={_style.close} source={Images.close_shoe}/>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={_style.centerView}>
              {
                showShoesLit.map((item, index) => (
                  <TouchableOpacity onPress={() => this.changeChooseStatus(item)}>
                    <View key={index} style={_style.itemView}>
                      <View style={{
                        width: "90%",
                        height: '90%',
                        justifyContent: "center",
                        alignItems: 'center',
                        backgroundColor: item.isSelect ? Colors.NORMAL_TEXT_F0 : Colors.WHITE_COLOR
                      }}>
                        <Text style={_style.sizeAndCount}>{item.size}</Text>
                        <Text style={_style.price}>￥{item.price / 100}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              }
            </View>
          </ScrollView>
        </View>
        <View style={bottomStyle.bottomView}>
          <ImageBackground
            hitSlop={hitSlop}
            style={bottomStyle.buttonOnlyOneChildView}
            source={Images.bg_right}
            disabled={this.state.chooseId == -1}
            onPress={debounce(this._confirmChoose)}
          >
            <Text style={bottomStyle.buttonText}>确认</Text>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const _style = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE_COLOR,
    height: 400
  },
  mainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  title: {
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 23
  },
  close: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
    top: 5,
    marginLeft: 10
  },
  alreadyChoose: {
    fontSize: 15,
    color: Colors.NORMAL_TEXT_0,
    fontFamily: YaHei,
    fontWeight: '300',
    marginLeft: 20
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
    backgroundColor: Colors.NORMAL_TEXT_F2
  },
  rightView: {
    position: 'absolute',
    right: 46,
    top: 0,
  },
  sizeAndCount: {
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    fontWeight: 'bold',
    fontSize: 18
  },
  price: {
    color: 'rgba(0,0,0,1)',
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
    marginLeft: 26
  }
});




