#!/bin/sh
VERSION=`grep -e "widget.*version" config.xml | sed "s/.*version=\"\([0-9.]*\)\".*/\1/;s/\./_/g"`
APPNAME=`grep "<name>" config.xml | sed "s/.*<name>\(.*\)<\/name>.*/\1/"`
PROJNAME=${PWD##*/}
PROJNAME=ferda

security unlock-keychain -p h
cordova build --device ios
mv "platforms/ios/build/device/$APPNAME.ipa" $PROJNAME-$VERSION-$BUILD_NUMBER.ipa
