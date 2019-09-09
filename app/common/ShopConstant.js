/**
 * @file 商品业务模块常量类
 * @date 2019/8/19 15:18
 * @author ZWW
 */
// 分享BaseURL
const SHARE_BASE_URL="http://m.dropstore.cn/index.html#/panicbuyingWithFriend" ;
// 首页
const HOME = 'all';
// 原价发售
const ORIGIN_CONST = '1';
// Drop自营
const SELF_SUPPORT = '2';
// 球鞋锦鲤
const LUCKY_CHARM = '3';
// 球鞋预定
const RESERVE = '4';
// 抽签
const DRAW = '1';
// 抢购
const BUY = '2';
// 未参加
const NOT_JOIN = 0;
// 已参加，团长
const LEADING = 1;
// 已参加，团员
const MEMBER = 2;

// 支付订单
const PAY_ORDER = 1;
// 支付佣金
const PAY_COMMISSION = 2;
// 支付邮费
const PAY_POSTAGE = 3;

// 支付方式
// 支付宝
const ALIPAY = 0;
// 微信
const WECHATPAY = 1;
// Drop平台
const DROPPAY = 2;

// 支付完成
const FINISHPAY = 'finish_pay';

// DeviceEventEmitter.key
const REFRESH_SHOP_DETAIL_INFO = 'REFRESH_SHOP_DETAIL_INFO';
export default {
  SHARE_BASE_URL,
  HOME,
  ORIGIN_CONST,
  SELF_SUPPORT,
  LUCKY_CHARM,
  RESERVE,
  DRAW,
  BUY,
  NOT_JOIN,
  LEADING,
  MEMBER,
  PAY_COMMISSION,
  PAY_ORDER,
  PAY_POSTAGE,
  ALIPAY,
  WECHATPAY,
  DROPPAY,
  REFRESH_SHOP_DETAIL_INFO,
  FINISHPAY,
};
