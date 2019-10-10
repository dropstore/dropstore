import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, StatusBar,
} from 'react-native';
import { bindActionCreators } from 'redux';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import {
  Image, ModalNormal, ActionSheet, ChangeSize, ImageBackground,
} from '../../components';
import Images from '../../res/Images';
import Colors from '../../res/Colors';
import { updateUser } from '../../redux/actions/userInfo';
import { getUserInfo } from '../../redux/reselect/userInfo';
import { getScreenWidth, PADDING_TAB } from '../../common/Constant';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import { showToast, showModalbox, closeModalbox } from '../../utils/MutualUtil';
import { upload } from '../../http/Axios';

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

const options = ['相册', '相机', '取消'];

class Setting extends PureComponent {
  constructor(props) {
    super(props);
    const { userInfo } = this.props;
    this.state = {
      list: [
        { title: '头像', name: 'avatar', value: userInfo.avatar },
        { title: '昵称', name: 'name', value: userInfo.user_name },
        { title: '性别', name: 'sex', value: userInfo.sex },
        { title: '年龄', name: 'age', value: userInfo.age },
        { title: '鞋码', name: 'size', value: userInfo.size },
      ],
    };
  }

  submit = () => {
    const { updateUser, navigation } = this.props;
    const { list } = this.state;
    updateUser({
      size: list[4].value === '0.0' ? -1 : list[4].value,
      sex: { 男: 1, 女: 2 }[list[2].value] || -1,
      age: list[3].value === '0' ? -1 : list[3].value,
      user_name: list[1].value,
      avatar: list[0].value,
    }).then(() => {
      showToast('资料修改成功');
      navigation.pop();
    });
  }

  sizeChange = (size) => {
    this.size = size;
  }

  onPress = (item) => {
    const { userInfo } = this.props;
    this.name = userInfo.user_name;
    this.sex = userInfo.sex;
    this.age = userInfo.age;
    this.size = userInfo.size;
    if (item.name === 'avatar') {
      this.actionSheet.show();
    } else if (item.name !== 'sex') {
      const customText = item.name === 'size' ? <ChangeSize onChange={this.sizeChange} initSize={item.value === '0.0' ? 42 : item.value} /> : (
        <View style={styles.inputWrapper}>
          <TextInput
            maxLength={item.name === 'name' ? 12 : 3}
            keyboardType={item.name === 'name' ? null : 'number-pad'}
            placeholder={item.name === 'name' ? '输入昵称' : '输入年龄'}
            placeholderTextColor="#d3d3d3"
            underlineColorAndroid="transparent"
            style={styles.input}
            defaultValue={item.name !== 'age' || item.value !== '0' ? item.value : ''}
            clearButtonMode="while-editing"
            onChangeText={(text) => { this[item.name] = text; }}
          />
        </View>
      );
      showModalbox({
        element: (<ModalNormal
          sure={() => {
            if (this.name.length < 1) {
              showToast('请输入昵称');
              return;
            }
            this.changeValue(item.name, this[item.name]);
            closeModalbox();
          }}
          closeModalbox={closeModalbox}
          customText={customText}
          title={`修改${item.title}`}
        />),
        options: {
          style: {
            height: 250,
            width: 265,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          },
        },
      });
    }
  }

  openPicker = (i) => {
    if ([0, 1].includes(i)) {
      ImagePicker[['openPicker', 'openCamera'][i]]({
        width: getScreenWidth(),
        height: getScreenWidth(),
        cropping: true,
        freeStyleCropEnabled: true,
        useFrontCamera: true,
        mediaType: 'photo',
        cropperChooseText: '选择',
        cropperCancelText: '取消',
        loadingLabelText: '加载中...',
      }).then((image) => {
        upload('/user/up_avatar', {
          type: 1,
          avatar: image.path,
        }).then((res) => {
          this.changeValue('avatar', res.data);
        });
      });
    }
  }

  changeValue = (key, value) => {
    const { list } = this.state;
    this.setState({
      list: list.map((v) => {
        if (v.name === key) {
          return ({ ...v, value });
        }
        return v;
      }),
    });
  }

  changeSex = () => {
    const { list } = this.state;
    const sex = list[2].value === '男' ? '女' : '男';
    this.changeValue('sex', sex);
  }

  render() {
    const { list } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        {
          list.map((v) => {
            const Wrapper = v.name === 'sex' ? View : TouchableOpacity;
            return (
              <Wrapper onPress={() => this.onPress(v)} key={v.name} style={[styles.itemWrapper, { marginBottom: v.name === 'avatar' ? 7 : 2 }]}>
                <Text style={styles.text}>{v.title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {
                      v.name === 'avatar'
                        ? (
                          <View style={styles.imageWrapper}>
                            <Image
                              source={v.value ? { uri: v.value } : list[2].value === '女' ? Images.iconGirl : Images.iconBoy}
                              style={{ ...styles.image, height: v.value ? wPx2P(40) : wPx2P(34), width: v.value ? wPx2P(40) : wPx2P(34) }}
                            />
                          </View>
                        )
                        : v.name === 'sex'
                          ? (
                            <ImageBackground
                              source={v.value === '女' ? Images.chooseGirl : v.value === '男' ? Images.chooseBoy : Images.nosex}
                              style={styles.sexBtnWrapper}
                              onPress={this.changeSex}
                            />
                          )
                          : <Text style={styles.text}>{['0', '0.0'].includes(v.value) ? '未设置' : v.value}</Text>
                    }
                  <Image source={Images.iconRight} style={styles.right} />
                </View>
              </Wrapper>
            );
          })
        }
        <TouchableOpacity style={styles.btn} onPress={this.submit}>
          <Text style={{ color: '#fff', fontSize: 16 }}>确认修改</Text>
        </TouchableOpacity>
        <ActionSheet
          ref={(o) => { this.actionSheet = o; }}
          options={options}
          cancelButtonIndex={2}
          onPress={this.openPicker}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sexBtnWrapper: {
    flexDirection: 'row',
    width: 55,
    height: 23,
    overflow: 'hidden',
    borderRadius: 2,
  },
  sexBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    height: 46,
    width: wPx2P(265),
    backgroundColor: Colors.OTHER_BACK,
    overflow: 'hidden',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: hPx2P(PADDING_TAB + 30),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.MAIN_BACK,
  },
  inputWrapper: {
    height: 26,
    width: 200,
    overflow: 'hidden',
    borderRadius: 2,
    borderColor: '#8F8F8F',
    borderWidth: 0.5,
    paddingLeft: 7,
  },
  input: {
    flex: 1,
    fontSize: 12,
    padding: 0,
    includeFontPadding: false,
  },
  image: {
    overflow: 'hidden',
    borderRadius: wPx2P(20),
  },
  imageWrapper: {
    height: wPx2P(40),
    width: wPx2P(40),
    borderRadius: wPx2P(23.5),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(166, 166, 166)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 5,
      },
      android: {
        elevation: 100,
        position: 'relative',
      },
    }),
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: wPx2P(19),
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  text: {
    color: '#333',
    fontSize: 13,
  },
  frameAvatar: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    height: 7.5,
    width: 5,
    marginLeft: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
