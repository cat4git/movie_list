@echo off

call react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res || (PAUSE && EXIT /B 1)
cd android 
call gradlew clean || (PAUSE && EXIT /B 1)
call gradlew assembleDebug || (PAUSE && EXIT /B 1)
call gradlew assembleRelease || (PAUSE && EXIT /B 1)
cd .. 
copy android\app\build\outputs\apk\release\app-release.apk


set theValue=
for /f "delims=" %%a in ('git rev-parse --abbrev-ref HEAD') do @set theValue=%%a
echo theValue=%theValue%

ren app-release.apk %theValue%.apk

start .
