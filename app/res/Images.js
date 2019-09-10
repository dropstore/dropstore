/**
 * @file 图片统一导出
 * @date 2019/8/17 10:30
 * @author ZWW
 */
const IMAGES = {
  drop: require('./image/drop.png'),
  message: require('./image/message.png'),
  personal: require('./image/personal.png'),
  identify: require('./image/identify.png'),
  freeTrade: require('./image/freeTrade.png'),
  messageInactive: require('./image/message-inactive.png'),
  personalInactive: require('./image/personal-inactive.png'),
  identifyInactive: require('./image/identify-inactive.png'),
  freeTradeInactive: require('./image/freeTrade-inactive.png'),
  back: require('./image/back.png'),
  ic_back_gray: require('./image/ic-back-gray.png'),
  instructions: require('./image/instructions.png'),
  loading: require('./image/loading.gif'),
  xh: require('./image/xh.png'),
  xm: require('./image/xm.png'),
  qe: require('./image/qe.png'),
  qr: require('./image/qr.png'),
  shape: require('./image/Shape.png'),
  bn: require('./image/bn.png'),
  ht: require('./image/ht.png'),
  jc: require('./image/jc.png'),
  lot_win_rate: require('./image/lot_win_rate.png'),
  hk: require('./image/hkhk.png'),
  jth: require('./image/jth.png'),

  // 底部button
  tzw: require('./image/tzw.png'),
  fx_hd: require('./image/fxhd.png'),
  bg_left: require('./image/bg_left.png'),
  bg_right: require('./image/bg_right.png'),
  // 分享相关
  fx: require('./image/fx.png'),
  fxt: require('./image/fxtszql.png'),
  fxt_dd: require('./image/fxtszqldd.png'),
  wx: require('./image/wx.png'),
  pyq: require('./image/pyq.png'),
  wb: require('./image/wb.png'),
  qq: require('./image/qq.png'),
  // 登陆相关
  wxLogin: require('./image/wxlogin.png'),
  wxLoginGray: require('./image/wx-login.png'),
  qqLoginGray: require('./image/qq-login.png'),
  wbLoginGray: require('./image/wb-login.png'),
  nameAge: require('./image/name-age.png'),
  sizeGender: require('./image/size-gender.png'),
  boy: require('./image/boy.png'),
  girl: require('./image/girl.png'),
  iconBoy: require('./image/icon-boy.png'),
  iconGirl: require('./image/icon-girl.png'),
  iconUp: require('./image/icon-up.png'),
  iconDown: require('./image/icon-down.png'),
  framePhoneInput: require('./image/frame-phone-input.png'),
  sendVerifiCode: require('./image/send-verifi-code.png'),
  inSendVerifiCode: require('./image/insendVerifiCode.png'),
  verifiCode: require('./image/verifi-code.png'),
  frameLogin: require('./image/login.png'),
  frameInLogin: require('./image/inlogin.png'),
  frameNickname: require('./image/frame-nickname.png'),
  frameRed: require('./image/frame-red.png'),
  frameBlack: require('./image/frame-black.png'),
  frameSize: require('./image/frame-size.png'),
  sexText: require('./image/sex-text.png'),
  phoneNum: require('./image/phoneNum.png'),

  // 抽签或抢鞋流程图标 -- 1、2、3、4
  ex1: require('./image/ex1.png'),
  ex2: require('./image/ex2.png'),
  ex3: require('./image/ex3.png'),
  ex4: require('./image/ex4.png'),

  // 选择鞋码
  shoe_zjt: require('./image/shoe_zjt.png'),
  shoe_zjr: require('./image/shoe_zjr.png'),
  shoe_hth: require('./image/shoe_hth.png'),
  close_shoe: require('./image/chazi.png'),

  // 支付界面
  pay_wx: require('./image/pay_wx.png'),
  pay_zfb: require('./image/pay_zfb.png'),
  pay_drop: require('./image/pay_drop.png'),
  sel: require('./image/sel.png'),
  unSel: require('./image/unsel.png'),

  // 支付及购买
  gm_cg: require('./image/gmcg.png'),
  gx_zq: require('./image/gxzq.png'),
  qx_sb: require('./image/qxsb.png'),
  zf_cg: require('./image/zfcg.png'),
  zf_sb: require('./image/zfsb.png'),
  got_em: require('./image/got_em.png'),
  // 活动成员列表
  xt_xn: require('./image/xtxn.png'),
  nh_tx: require('./image/nhtx.png'),
  shape_1_ji3: require('./image/shape_1_ji3.png'),
  tx: require('./image/tx.png'),
  // 个人中心
  frameHead: require('./image/frame-head.png'),
  frameWallet: require('./image/frame-wallet.png'),
  wallet: require('./image/wallet.png'),
  uncomplete: require('./image/uncomplete.png'),
  daishouhuo: require('./image/daishouhuo.png'),
  completed: require('./image/completed.png'),
  myActivity: require('./image/myActivity.png'),
  myWarehouse: require('./image/myWarehouse.png'),
  extract: require('./image/extract.png'),
  myGoods: require('./image/myGoods.png'),
  helper: require('./image/helper.png'),
  fashounotice: require('./image/fashounotice.png'),
  activitynotice: require('./image/activitynotice.png'),
  systemnotice: require('./image/systemnotice.png'),
  setting: require('./image/setting.png'),
  address: require('./image/address.png'),
  illustration: require('./image/illustration.png'),
  safesetting: require('./image/safesetting.png'),
  littleBoy: require('./image/little-boy.png'),
  littleGirl: require('./image/little-girl.png'),
  // 个人设置
  frameAvatar: require('./image/frameAvatar.png'),
  iconRight: require('./image/icon-arrow-right.png'),
  chooseBoy: require('./image/choose-boy.png'),
  chooseGirl: require('./image/choose-girl.png'),
  // 地址
  xiaoJiaHao: require('./image/xiaojiah.png'),
  chooseCircle: require('./image/chooseCircle.png'),
  frameAddressEdit: require('./image/frame-address-edit.png'),
  shanchu: require('./image/shanchu.png'),
  bianji: require('./image/bianji.png'),
  frameAddres: require('./image/frameAddres.png'),
  // 提现
  extractRed: require('./image/extract-red.png'),
  extractWhite: require('./image/extract-white.png'),
  arrowRed: require('./image/arrow-red.png'),
  salou: require('./image/salou.png'),
  sanjiaotanhao: require('./image/sanjiaotanhao.png'),

  // 自由贸易
  freeTradePlaceholder: require('./image/freeTrade-placeholder.png'),
  cha: require('./image/cha.png'),
  wenhao: require('./image/wenhao.png'),
  // 鉴定
  identifyPlaceholder: require('./image/identify-placeholder.png'),
  price: require('./image/price.png'),
  choose: require('./image/choose.png'),
  unchoose: require('./image/unchoose.png'),

  // 测试图片
  test1: require('./image/test1.png'),
  test2: require('./image/test2.png'),
};

export default IMAGES;
