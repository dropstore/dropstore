#!/usr/bin/env ruby
channel = ARGV[0]
action = ARGV[1] || 'pack'
extras = ARGV[2]

def upload_dysm
  dysm_path = ''
  ` curl https://upload.bugsnag.com/ \
    -F apiKey=961283162e19a612f4bcb06a1d20a806 \
    -F dsym=@#{dysm_path}/Contents/Resources/DWARF/dropstore \
    -F projectRoot=/Users/jasper_fu/Work/dropstore`
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
  new_content = File.read("ios/dropstore/Info.plist")
  new_content.gsub!(/<key>CFBundleShortVersionString<\/key>\s+<string>(.*?)<\/string>/m,
    "<key>CFBundleShortVersionString<\/key>\n       <string>#{short_version}<\/string>")
  new_content.gsub!(/<key>CFBundleVersion<\/key>\s+<string>(\d+)<\/string>/m,
    "<key>CFBundleVersion<\/key>\n       <string>#{bundle_version}<\/string>")
  File.open("ios/dropstore/Info.plist", "w") { |f| f.write new_content }

  # new_content = File.read("android/app/src/main/AndroidManifest.xml")
  # new_content.gsub!(/<key>CFBundleShortVersionString<\/key>\s+<string>(.*?)<\/string>/m,
  #   "<key>CFBundleShortVersionString<\/key>\n       <string>#{short_version}<\/string>")
  # new_content.gsub!(/<key>CFBundleVersion<\/key>\s+<string>(\d+)<\/string>/m,
  #   "<key>CFBundleVersion<\/key>\n       <string>#{bundle_version}<\/string>")
  # File.open("ios/dropstore/Info.plist", "w") { |f| f.write new_content }

  # new_content = File.read("android/app/build.gradle")
  # new_content.gsub!(/(?<=^\s+versionCode\s+)\d+/, short_version.gsub(/\./, ''))
  # new_content.gsub!(/(?<=^\s+versionName\s+").*?(?="\s*)/, short_version)
  # File.open("android/app/build.gradle", "w") { |f| f.write new_content }
end

def upload(path)
  puts "curl -F 'file=@#{path}' -F 'uKey=4e45feb8976a5ae625c779f71b84c8b1' -F '_api_key=de51f4ca847c0ba629d3080b8cfc7ab9' https://www.pgyer.com/apiv1/app/upload"
  puts "uploading #{path}........"
  puts `curl -F "file=@#{path}" -F "uKey=4e45feb8976a5ae625c779f71b84c8b1" -F "_api_key=de51f4ca847c0ba629d3080b8cfc7ab9" https://www.pgyer.com/apiv1/app/upload`
  puts "finish uploading #{path}........"
end

def export_appstore
  puts "---------- packing ios ------------"
  puts `yarn i`
  new_content = File.read("ios/dropstore/Info.plist")
  new_content = new_content.gsub(/<key>CFBundleDevelopmentRegion<\/key>/,
    "<key>method<\/key>\n  <string>ad-hoc<\/string>\n  <key>CFBundleDevelopmentRegion<\/key>")
  File.write("ios/adhoc.plist", new_content)
  puts `cd ios &&
    rm -rf build/* &&
    xcodebuild clean -workspace dropstore.xcworkspace -scheme dropstore -configuration Release &&
    xcodebuild archive -workspace dropstore.xcworkspace -scheme dropstore -archivePath build/dropstore.xcarchive &&
    rvm use system &&
    xcodebuild -exportArchive -archivePath build/dropstore.xcarchive -exportPath build -exportOptionsPlist adhoc.plist
  `
  puts "---------- finish packing ios ------------"
  return true
end

def edit_modules
  result1 = File.read('./edit_node_modules/react-native-clear-cache/build.gradle')
  File.write('./node_modules/react-native-clear-cache/android/build.gradle', result1)
  result3 = File.read('./edit_node_modules/metro/DependencyGraph.js')
  File.write('./node_modules/metro/src/node-haste/DependencyGraph.js', result3)
  puts "---------- finish install and edit node_modules ------------"
end

def bundleVersion(version)
  puts "---------- packing android: #{version} ------------"
  new_content = File.read("ios/dropstore/Info.plist")
  new_content.gsub!(/<key>CFBundleVersion<\/key>\s+<string>(\d+)<\/string>/m,
    "<key>CFBundleVersion<\/key>\n       <string>#{version}<\/string>")
  File.open("ios/dropstore/Info.plist", "w") { |f| f.write new_content }
end

def export_android(channel)
  puts `yarn i`
  puts "---------- packing android: #{channel} ------------"
  result1 = File.read('./android/app/build.gradle')
  File.write('./android/app/build.gradle', File.read('./node_modules/android/build.gradle'))
  puts "---------- finish install and edit node_modules ------------"
  puts `cd android &&
    rm -f app/build/outputs/apk/release/app-release.apk &&
    ./gradlew assembleRelease &&
    mv app/build/outputs/apk/release/app-release.apk app/build/outputs/apk/#{channel}.apk
  `
  File.write('./android/app/build.gradle', result1)
  puts "---------- finish packing android: #{channel} ------------"
  return true
end

def version(channel, version)
  version, build = version.split(':')
  if channel == :appstore
    result = File.read('./ios/dropstore/Info.plist')
    current_version = result.match(/CFBundleShortVersionString\<\/key\>\s+\<string\>(\d+\.\d+.\d+)/)[1]
    result = result.gsub(current_version, version)
    File.write('./ios/dropstore/Info.plist', result)

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
  when "ios" then export_appstore()
  when "android" then export_android('dropstore')
  end
elsif action == 'pnu'
  case channel
  when "ios" then export_appstore() && upload(File.absolute_path('./ios/build/dropstore.ipa'))
  when "android" then export_android('dropstore') && upload(File.absolute_path('./android/app/build/outputs/apk/dropstore.apk'))
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
elsif action == 'edit'
  case channel
  when channel then edit_modules()
  end
end
