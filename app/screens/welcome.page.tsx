import { useNavigation } from "@react-navigation/native"
import React, { Component } from "react"
import { Button, SafeAreaView, StyleSheet, View } from "react-native"
import { Strings } from "../i18n/i18n"
import { movieServise } from "../services"
import { color, spacing } from "../theme"


export class WelcomeScreen extends Component<any, any> {
// export const WelcomeScreen: Component = observer(function WelcomeScreen() {
  
  nextScreen = () => {
    const {navigation}=this.props
     movieServise.getFirestPage(); 
     navigation.navigate("movieList")
    }

  render(){
  return (
    <View style={styles.FULL}>
      <SafeAreaView style={styles.FOOTER}>
        <View style={styles.FOOTER_CONTENT}>
          <Button
            style={styles.CONTINUE}
            textStyle={styles.CONTINUE_TEXT}
            title={Strings.welcomeScreen.movieList}
            onPress={this.nextScreen}
          />
        </View>
      </SafeAreaView>
    </View>
  )
  }
}
// })

const styles = StyleSheet.create({
  FULL:{
    flex: 1
  },
  FOOTER: {
    backgroundColor: "#20162D" 
  },
  FOOTER_CONTENT:{
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
  },
  CONTINUE:{
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    backgroundColor: "#5D2555",
  },
  CONTINUE_TEXT:{
    color: color.palette.white,
    fontFamily: "Montserrat",
    fontWeight: "bold" ,
    fontSize: 13,
    letterSpacing: 2,
  }


})

