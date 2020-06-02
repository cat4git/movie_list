import { GoogleSigninButton } from '@react-native-community/google-signin'
import React, { Component } from "react"
import { Button, StyleSheet, View } from "react-native"
import { Strings } from "../i18n/i18n"
import { movieServise, googleLoginServise } from "../services"
import { color, spacing } from "../theme"


export class WelcomeScreen extends Component<any, any> {  

  constructor(props) {
    super(props);
    // state
    this.state = {
      isSignedIn:false
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
    this.setState({userInfo:userInfo})
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
      <Button
        style={styles.MovieListButton}
        textStyle={styles.MovieListButtonText}
        title={Strings.welcomeScreen.movieList}
        onPress={this.nextScreen}
      />
    )
  }

  render(){
    if (this.state.isSignedIn){
      return (
        <View style={styles.fullScreen}>
          {this.renderMovieListButton()}
        </View>
      ) 
    }
    return(
      this.loginButton()
    )
  }
}

const styles = StyleSheet.create({
  fullScreen:{
    flex: 1
  },
  MovieListButton:{
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    backgroundColor: "#5D2555",
  },
  MovieListButtonText:{
    color: color.palette.white,
    fontFamily: "Montserrat",
    fontWeight: "bold" ,
    fontSize: 13,
    letterSpacing: 2,
  },
  loginButton:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }


})

