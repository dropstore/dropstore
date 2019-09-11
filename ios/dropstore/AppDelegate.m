/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <AlipaySDK/AlipaySDK.h>
#import "RNSplashScreen.h"
#import <React/RCTLinkingManager.h>
#import "RNUMConfigure.h"
#import <UMShare/UMShare.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"dropstore"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [RNSplashScreen show];
  [UMConfigure setLogEnabled:YES];
  [RNUMConfigure initWithAppkey:@"5d5393a1570df324ba000e51" channel:@"AppStore"];
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:@"wx4def04c004d5c07d" appSecret:@"de810c561534f71384850e79a7455ecb" redirectURL:nil];
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_QQ appKey:@"110233248545" appSecret:nil redirectURL:@"http://mobile.umeng.com/social"];
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Sina appKey:@"27239964"  appSecret:@"fac50980a44sdsdsssdsc968ea572887" redirectURL:@"http://sns.whalecloud.com"];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// 支持所有iOS系统
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  //6.3的新的API调用，是为了兼容国外平台(例如:新版facebookSDK,VK等)的调用[如果用6.2的api调用会没有回调],对国内平台没有影响
  BOOL result = [[UMSocialManager defaultManager] handleOpenURL:url sourceApplication:sourceApplication annotation:annotation];
  if (!result) {
    if ([url.host isEqualToString:@"safepay"]) {
      //跳转支付宝钱包进行支付，处理支付结果
      [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
        NSNotification * notification = [NSNotification notificationWithName:@"Alipay" object:nil userInfo:resultDic];
        [[NSNotificationCenter defaultCenter] postNotification:notification];
      }];
      return YES;
    }
    return [WXApi handleOpenURL:url delegate:self];
  }
  return result;
}

//支付回调9以后
//- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary*)options {
//
//  if ([url.host isEqualToString:@"safepay"]) {
//    //跳转支付宝钱包进行支付，处理支付结果
//    [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
//      NSNotification * notification = [NSNotification notificationWithName:@"Alipay" object:nil userInfo:resultDic];
//      [[NSNotificationCenter defaultCenter] postNotification:notification];
//    }];
//  }
//  return  [WXApi handleOpenURL:url delegate:self];
//}

- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}

#pragma mark - wx callback

- (void) onReq:(BaseReq*)req
{
  // TODO Something
}

- (void)onResp:(BaseResp *)resp
{
  //判断是否是微信支付回调 (注意是PayResp 而不是PayReq)
  if ([resp isKindOfClass:[PayResp class]])
  {
    //发出通知 从微信回调回来之后,发一个通知,让请求支付的页面接收消息,并且展示出来,或者进行一些自定义的展示或者跳转
    NSNotification * notification = [NSNotification notificationWithName:@"WXPay" object:nil userInfo:@{@"errCode":@(resp.errCode)}];
    [[NSNotificationCenter defaultCenter] postNotification:notification];
  }
}

@end
