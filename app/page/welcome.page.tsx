import React, { Component } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { Button, } from 'react-native-elements'
import { GraphRequest, GraphRequestManager, LoginManager ,LoginButton} from 'react-native-fbsdk'
import { Strings } from "../i18n/i18n"
import { movieServise } from "../services"
import { flexDirection } from '../style/rtl'
import { color, spacing } from "../theme"
import Icon from 'react-native-vector-icons/FontAwesome';

export class WelcomeScreen extends Component<any, any> {  

  constructor(props) {
    super(props);
    // state
    this.state = {
      userInfo: undefined
     
    };
  }

  nextScreen = () => {
    const {navigation}=this.props
     movieServise.getFirestPage(); 
     navigation.navigate("movieList")
  }


  // If it was more than two functions, I would move to a separate file
  get_Response_Info = (error, result) => {
    if (error) {
      //Alert for the Error
      console.log('Error fetching data: ' + error.toString());
    } else {
      //response alert
      
      this.setState({userInfo:{ user_name: result.name,profile_pic: result.picture.data.url}})
    }
  };
  
  loginFacebook=()=>{
    LoginManager.logInWithPermissions(["public_profile"]).then(
      (result)=> {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
              result.grantedPermissions.toString()
          );

          const processRequest = new GraphRequest(
            '/me?fields=name,picture.type(large)',
            null,
            this.get_Response_Info
          );
          // Start the graph request.
          new GraphRequestManager().addRequest(processRequest).start();
          
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      })
  }
  loginButton(){
    return(
      <View style={styles.loginButton}>
        <Button 
          onPress={this.loginFacebook}
          title={`${Strings.welcomeScreen.loginText}  `}
          color={"#4267B2"}
          icon={
            <Icon
              name="facebook"
              size={15}
              color="white"
            />
          }

        />
      </View>
    )
  }
  renderMovieListButton(){
    return(
      <View style={[styles.fullScreen,]}>
        <View>
        <View style={[flexDirection(Strings.isRTL),styles.fons,{justifyContent: 'center',marginBottom:15}]}>
          <Text style={styles.fons}  >{`${Strings.welcomeScreen.welcomeText} `}</Text>
          <Text style={styles.fons}  >{this.state.userInfo.user_name}</Text>
        </View>
        <Image
              style={styles.image}
              source={{
                uri: this.state.userInfo.profile_pic,
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
    fontSize: 15,
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

