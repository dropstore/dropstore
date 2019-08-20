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
  [UMConfigure setLogEnabled:YES];
  [RNUMConfigure initWithAppkey:@"5d5393a1570df324ba000e51" channel:@"AppStore"];
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:@"wx179afsafasw23b54ae" appSecret:@"5a4142fsdsfswe9a40e93fc" redirectURL:nil];
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

@end
