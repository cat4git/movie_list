import { GoogleSigninButton } from '@react-native-community/google-signin'
import React, { Component } from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import { Strings } from "../i18n/i18n"
import { movieServise, googleLoginServise } from "../services"
import { color, spacing } from "../theme"
import { Button, } from 'react-native-elements';
import { flexDirection } from '../style/rtl'

export class WelcomeScreen extends Component<any, any> {  

  constructor(props) {
    super(props);
    // state
    this.state = {
      userInfo:undefined
    };
  }

  componentDidMount= async()=>{
    const isSignedIn =await googleLoginServise.isSignedIn()
    this.setState({isSignedIn:isSignedIn})
  }

  nextScreen = () => {
    const {navigation}=this.props
     movieServise.getFirestPage(); 
     navigation.navigate("movieList")
  }

  signIn =async ()=>{
    const userInfo = await googleLoginServise.signIn()
    console.log(userInfo)
    this.setState({userInfo:userInfo.user})
  }

  loginButton(){
    return(
      <View style={styles.loginButton}>
      <GoogleSigninButton
      style={{ width: 192, height: 48 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={this.signIn}
      disabled={this.state.isSigninInProgress} />
      
      </View>
    )
  }
  renderMovieListButton(){
    return(
      <View style={[styles.fullScreen,]}>
        <View>
        <View style={[flexDirection(Strings.isRTL),styles.fons,{justifyContent: 'center'}]}>
          <Text >{`${Strings.welcomeScreen.welcomeText} `}</Text>
          <Text >{this.state.userInfo.name}</Text>
        </View>
        <Image
              style={styles.image}
              source={{
                uri: this.state.userInfo.photo,
              }}
            />
        </View>
      <Button
        style={styles.movieListButton}
        textStyle={[styles.fons,styles.movieListButtonText]}
        title={Strings.welcomeScreen.movieList}
        onPress={this.nextScreen}
      />
      </View>
    )
  }

  render(){
    if (this.state.userInfo){
      return (
        this.renderMovieListButton()
      ) 
    }
    return(
      this.loginButton()
    )
  }
}

const styles = StyleSheet.create({
  fullScreen:{
    flex: 1,
    justifyContent:"space-between",
    flexDirection:"column"
  },
  movieListButton:{
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    backgroundColor: "#5D2555",
  },
  fons:{
    fontFamily: "Montserrat",
    fontWeight: "bold" ,
    fontSize: 13,
    letterSpacing: 2,
  },
  movieListButtonText:{
    color: color.palette.white,
  },

  loginButton:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  image:{
    width:350,
    height:350,
    alignSelf:"center",
    display:"flex",
  },


})

