import * as RNLocalize from "react-native-localize"
const en = require("./en")
const he = require("./he")


export let Strings={}

export function setText(){
  const languageTag = RNLocalize.findBestAvailableLanguage(["he", "iw", "en"]).languageTag
  if (languageTag=="he" || languageTag=="iw" ){
    Strings= he
  }
  else{
    Strings= en
  }
}

