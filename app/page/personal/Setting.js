import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import { bindActionCreators } from 'redux';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import {
  ActionSheet, ImageBackground, KeyboardDismiss, AvatarWithShadow,
} from '../../components';
import Images from '../../res/Images';
import Colors from '../../res/Colors';
import { updateUser } from '../../redux/actions/userInfo';
import { getUserInfo } from '../../redux/reselect/userInfo';
import { getScreenWidth, PADDING_TAB, getScreenHeight } from '../../common/Constant';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import { showToast, closeModalbox } from '../../utils/MutualUtil';
import { upload } from '../../http/Axios';
import { showChooseSize } from '../../utils/commonUtils';

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
      modalIsOpen: false,
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
    } else if (item.name === 'size') {
      const { modalIsOpen } = this.state;
      if (!modalIsOpen) {
        this.sizeWrapper.measure((x, y, w, h, px, py) => {
          this.setState({ modalIsOpen: true });
          showChooseSize(getScreenHeight() - py - 50, this.chooseSize, () => this.setState({ modalIsOpen: false }));
        });
      } else {
        this.closeModal();
      }
    }
  }

  chooseSize = (size) => {
    this.changeValue('size', size);
    this.closeModal();
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
    closeModalbox();
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
    const { list, modalIsOpen } = this.state;
    return (
      <KeyboardDismiss style={styles.container}>
        {
          list.map((v) => {
            const Wrapper = ['sex', 'age', 'name'].includes(v.name) ? View : TouchableOpacity;
            return (
              <Wrapper
                onPress={() => this.onPress(v)}
                key={v.name}
                style={[styles.itemWrapper, { marginBottom: v.name === 'avatar' ? 7 : 2, height: v.name === 'avatar' ? 64 : 56 }]}
              >
                <Text style={styles.text}>{v.title}</Text>
                <View style={styles.itemRight}>
                  {
                    v.name === 'avatar' ? <AvatarWithShadow source={{ uri: v.value }} size={40} />
                      : v.name === 'sex' ? (
                        <ImageBackground
                          source={v.value === '女' ? Images.chooseGirl : v.value === '男' ? Images.chooseBoy : Images.nosex}
                          style={styles.sexBtnWrapper}
                          onPress={this.changeSex}
                        />
                      ) : v.name === 'size' ? (
                        <View style={{ flexDirection: 'row' }} ref={(v) => { this.sizeWrapper = v; }}>
                          <Text style={{ color: '#DEDEDE', fontSize: 12, marginRight: 5 }}>{v.value}</Text>
                          <View style={styles.arrow}>
                            <View style={modalIsOpen ? styles.arrowUp : styles.arrowDown} />
                          </View>
                        </View>
                      ) : (
                        <TextInput
                          style={styles.input}
                          placeholder={['0', '0.0'].includes(v.value) ? '未设置' : v.value}
                          selectionColor="#00AEFF"
                          placeholderTextColor="#DEDEDE"
                          underlineColorAndroid="transparent"
                          keyboardType={v.name === 'age' ? 'number-pad' : null}
                          onChangeText={(text) => { this.changeValue(v.name, text); }}
                        />
                      )
                  }
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
      </KeyboardDismiss>
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
  btn: {
    height: 46,
    width: wPx2P(265),
    backgroundColor: Colors.YELLOW,
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
  input: {
    flex: 1,
    fontSize: 12,
    padding: 0,
    includeFontPadding: false,
    textAlign: 'right',
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
  right: {
    height: 7.5,
    width: 5,
    marginLeft: 10,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  arrow: {
    height: 17,
    width: 17,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: Colors.YELLOW,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowUp: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderBottomWidth: 5,
    borderRightWidth: 3,
    borderLeftWidth: 3,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: '#fff',
    borderRightColor: 'transparent',
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 5,
    borderBottomWidth: 0,
    borderRightWidth: 3,
    borderLeftWidth: 3,
    borderTopColor: '#fff',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
