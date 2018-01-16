#!/bin/sh
VERSION=`grep -e "widget.*version" config.xml | sed "s/.*version=\"\([0-9.]*\)\".*/\1/;s/\./_/g"`
APPNAME=`grep "<name>" config.xml | sed "s/.*<name>\(.*\)<\/name>.*/\1/"`
PROJNAME=${PWD##*/}
PROJNAME=ferda

cordova build --device android
mv platforms/android/build/outputs/apk/android-debug.apk $PROJNAME-$VERSION-$BUILD_NUMBER.apk
