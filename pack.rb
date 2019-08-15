#!/usr/bin/env ruby
channel = ARGV[0]
action = ARGV[1] || 'pack'
extras = ARGV[2]
# android_channels = %w(xiaomi oppo vivo huawei ludashi sogou yyb ywn zte 360 zhuoyi wandoujia qinpeng qinpeng2 sogou-2 sogou-xun sogou-fei dngj baidu ynw jrtt)
android_channels = %w(360 yyb xiaomi sogou huawei oppo vivo meizu wandoujia h5)
ios_channels = %w(appstore)
valid_channels = android_channels + ios_channels + ['version', 'all', 'android']
STDERR.puts "N/A source ID, should be #{valid_channels}" unless valid_channels.include? channel

def upload_dysm
  dysm_path = ''
  ` curl https://upload.bugsnag.com/ \
    -F apiKey=961283162e19a612f4bcb06a1d20a806 \
    -F dsym=@#{dysm_path}/Contents/Resources/DWARF/waitpay \
    -F projectRoot=/Users/jasper_fu/Work/waitpay`
end

def upload_sourcemap(platform, version)
  puts `react-native bundle \
      --platform #{platform} \
      --dev false \
      --entry-file index.js \
      --bundle-output #{platform}-release.bundle \
      --sourcemap-output #{platform}-release.bundle.map`

  puts `bugsnag-sourcemaps upload \
      --api-key 961283162e19a612f4bcb06a1d20a806 \
      --overwrite \
      --app-version #{version} \
      --minified-file #{platform}-release.bundle \
      --source-map #{platform}-release.bundle.map \
      --minified-url index.#{platform}.bundle \
      --upload-sources`
end

def update_version
  short_version = ARGV[1]
  bundle_version = ARGV[2]
  new_content = File.read("ios/waitpay/Info.plist")
  new_content.gsub!(/<key>CFBundleShortVersionString<\/key>\s+<string>(.*?)<\/string>/m,
    "<key>CFBundleShortVersionString<\/key>\n       <string>#{short_version}<\/string>")
  new_content.gsub!(/<key>CFBundleVersion<\/key>\s+<string>(\d+)<\/string>/m,
    "<key>CFBundleVersion<\/key>\n       <string>#{bundle_version}<\/string>")
  File.open("ios/waitpay/Info.plist", "w") { |f| f.write new_content }

  # new_content = File.read("android/app/src/main/AndroidManifest.xml")
  # new_content.gsub!(/<key>CFBundleShortVersionString<\/key>\s+<string>(.*?)<\/string>/m,
  #   "<key>CFBundleShortVersionString<\/key>\n       <string>#{short_version}<\/string>")
  # new_content.gsub!(/<key>CFBundleVersion<\/key>\s+<string>(\d+)<\/string>/m,
  #   "<key>CFBundleVersion<\/key>\n       <string>#{bundle_version}<\/string>")
  # File.open("ios/waitpay/Info.plist", "w") { |f| f.write new_content }

  # new_content = File.read("android/app/build.gradle")
  # new_content.gsub!(/(?<=^\s+versionCode\s+)\d+/, short_version.gsub(/\./, ''))
  # new_content.gsub!(/(?<=^\s+versionName\s+").*?(?="\s*)/, short_version)
  # File.open("android/app/build.gradle", "w") { |f| f.write new_content }
end

def pack_n_upload_all_testing
  export_appstore
  export_android(:xiaomi)

end

def upload(path)
  puts "curl -F 'file=@#{path}' -F 'uKey=33753cf844acaeef74f843a6caa3007a' -F '_api_key=5be81ac686e016577a03059986df702d' https://www.pgyer.com/apiv1/app/upload"
  puts "uploading #{path}........"
  puts `curl -F "file=@#{path}" -F "uKey=33753cf844acaeef74f843a6caa3007a" -F "_api_key=5be81ac686e016577a03059986df702d" https://www.pgyer.com/apiv1/app/upload`
  puts "finish uploading #{path}........"
end

def export_appstore
  puts "---------- packing ios ------------"
  edit_modules()
  puts `cd ios &&
    rm -rf build/* &&
    xcodebuild clean -workspace dropstore.xcworkspace -scheme dropstore -configuration Release &&
    xcodebuild archive -workspace dropstore.xcworkspace -scheme dropstore -archivePath build/dropstore.xcarchive &&
    rvm use system &&
    xcrun xcodebuild -exportArchive -archivePath build/dropstore.xcarchive -exportPath build -exportOptionsPlist adhoc.plist &&
    rvm use 2.3.7
  `
  # `git checkout js/config.js`
  puts "---------- finish packing ios ------------"
  return true
end

def edit_modules()
  result3 = File.read('./edit_node_modules/metro/DependencyGraph.js')
  File.write('./node_modules/metro/src/node-haste/DependencyGraph.js', result3)
end

def bundleVersion(version)
  puts "---------- packing android: #{version} ------------"
  new_content = File.read("ios/waitpay/Info.plist")
  new_content.gsub!(/<key>CFBundleVersion<\/key>\s+<string>(\d+)<\/string>/m,
    "<key>CFBundleVersion<\/key>\n       <string>#{version}<\/string>")
  File.open("ios/waitpay/Info.plist", "w") { |f| f.write new_content }
end

def export_android(channel)
  edit_modules()
  puts "---------- packing android: #{channel} ------------"
  puts `cd android &&
    rm -f app/build/outputs/apk/release/app-release.apk &&
    ./gradlew assembleRelease &&
    mv app/build/outputs/apk/release/app-release.apk app/build/outputs/apk/#{channel}.apk
  `
  puts "---------- finish packing android: #{channel} ------------"
  return true
end

def version(channel, version)
  version, build = version.split(':')
  if channel == :appstore
    result = File.read('./ios/waitpay/Info.plist')
    current_version = result.match(/CFBundleShortVersionString\<\/key\>\s+\<string\>(\d+\.\d+.\d+)/)[1]
    result = result.gsub(current_version, version)
    File.write('./ios/waitpay/Info.plist', result)

    result = File.read('./ios/today/Info.plist')
    current_version = result.match(/CFBundleShortVersionString\<\/key\>\s+\<string\>(\d+\.\d+.\d+)/)[1]
    result = result.gsub(current_version, version)
    File.write('./ios/today/Info.plist', result)
  else
    result = File.read('./android/app/build.gradle')
    result = result.gsub(/(?<=versionCode\s)\d+/, version.gsub(/\./, ''))
    result = result.gsub(/(?<=versionName\s")\d+\.\d+.\d+/, version)
    File.write('./android/app/build.gradle', result)
  end
  result = File.read('./package.json')
  File.write('./package.json', result.gsub(/(?<=version": ").*?(?=",)/, version))
end

if action == 'pack'
  case channel
  when "appstore" then export_appstore
  when "android" then android_channels.each { |c| export_android(c) }
  when "all" then export_appstore && android_channels.each { |c| export_android(c) }
  else export_android(channel)
  end
elsif action == 'upload'
  case channel
  when "appstore" then upload(File.absolute_path('./ios/build/waitpay.ipa'))
  when /android|xiaomi/ then upload(File.absolute_path('./android/app/build/outputs/apk/xiaomi.apk'))
  when "all" then upload(File.absolute_path('./ios/build/waitpay.ipa')) && upload(File.absolute_path('./android/app/build/outputs/apk/xiaomi.apk'))
  end
elsif action == 'pnu'
  case channel
  when "appstore" then export_appstore && upload(File.absolute_path('./ios/build/waitpay.ipa'))
  when "xiaomi" then export_android('xiaomi') && upload(File.absolute_path('./android/app/build/outputs/apk/xiaomi.apk'))
  when "shengdian" then export_android('shengdian') && upload(File.absolute_path('./android/app/build/outputs/apk/shengdian.apk'))
  end
elsif action == 'version'
  case channel
  when "appstore" then version(:appstore, extras)
  when "android" then version(:android, extras)
  when "all" then version(:appstore, extras) && version(:android, extras)
  end
elsif action == 'sourcemap'
  case channel
  when "appstore" then upload_sourcemap(:ios, extras)
  when "android" then upload_sourcemap(:android, extras)
  when "all" then upload_sourcemap(:ios, extras) && upload_sourcemap(:android, extras)
  end
elsif action == 'bundleVersion'
  case channel
  when channel then bundleVersion(extras)
  end
elsif action == 'install'
  case channel
  when "shengdian" then export_android('shengdian') && `adb install android/app/build/outputs/apk/shengdian.apk`
  end
end
