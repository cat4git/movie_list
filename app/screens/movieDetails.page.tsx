import React, { Component } from "react"
import { Platform, StyleSheet, View, Image, ScrollView } from "react-native"
import { Header, Icon,Text, Rating ,Badge  } from "react-native-elements"
import { Strings } from "../i18n/i18n"
import { textAlign, flexDirection } from "../style/rtl"
import { movieServise } from "../services"
import { urlFormat } from "../services/movie.servise"
import { observer } from "mobx-react-lite"



 const Favorites = observer(({index})=> {
    const addRemoveFavorites=()=>{
      console.log("addRemoveFavorites")
      movieServise.addRemoveFavorites(index)
    }

    const displayFavorites=()=>{
      console.log("displayFavorites")
    }
    const icon=movieServise.favorites.indexOf(index)>-1?"remove-circle":"add-circle";
    console.log(index)
    console.log(movieServise.favorites)

    console.log("renderFavorites")
    return (
        <View style={[flexDirection(!Strings.isRTL)]}> 
         <Icon name={icon} onPress={addRemoveFavorites} color="white" />
         <View style={{marginHorizontal:7}}>
            <Icon name={"videocam"} color="white" onPress={displayFavorites}></Icon>
            <Badge value={movieServise.favorites.length} containerStyle={{ position: 'absolute', top: -4, right: -4 }} badgeStyle={{backgroundColor:"gray"}}  ></Badge>
          </View>
        </View>
    )
 })

  export class MovieDetails extends Component<any, any> {
  
    componentDidMount(){
      console.log(this.props)
      console.log(this.props.route.params)
    }

    goBack = () => {
      const { navigation } = this.props;
      navigation && navigation.goBack()
    }
    renderBack(){
      
      const icon=Strings.isRTL?"arrow-forward":"arrow-back";
      return <Icon name={icon} onPress={this.goBack} color="white" />
    }
    renderFavorites(){
      const {index}=this.props.route.params
      return(
        <View style={[flexDirection(Strings.isRTL),styles.favorites]}>
        <Favorites index={index}/>
      </View>
      )
    }
    renderHeader(){
      
      const {title} =this.props.route.params.item
      const leftComponent= !Strings.isRTL?this.renderBack():this.renderFavorites()
      const rightComponent=Strings.isRTL?this.renderBack():this.renderFavorites()
      return (
        <Header
        leftComponent={leftComponent}
        centerComponent={{ text:title , style: { color: '#fff' } }}
        rightComponent={rightComponent}
        statusBarProps={{ translucent: true }}
        containerStyle={Platform.select({
          android: Platform.Version <= 20 ? { paddingTop: 0, height: 56 } : {},
        })}
      />
      )
    }
    renderContent(){
      const {overview,vote_average,poster_path,id} =this.props.route.params.item
      return (
        <ScrollView style={styles.fullScreen}>
            <Image
              style={styles.image}
              source={{
                uri: `${urlFormat}${poster_path}`,
              }}
            />
          
          <View >
          <Text h4>{Strings.movieScreen.summary}</Text>
          <Text >{overview}</Text>
          <View style={flexDirection(Strings.isRTL)}>
            <Text h4>{Strings.movieScreen.rating}</Text>
            <Rating
              type="heart"
              ratingCount={10}
              fractions={2}
              startingValue={vote_average}
              imageSize={20}
              ratingColor="#3D6DCC"
              ratingBackgroundColor='#c8c7c8'
              style={styles.rating}
              readonly
            
            />
          </View>
          </View>


        </ScrollView >
      )
    }
    render(){
    return (
      <View style={styles.fullScreen}>
      {this.renderHeader()}
      {this.renderContent()}
      </View>
    )
    }
  }
// })
/*********** style ************* */
const styles = StyleSheet.create({
  fullScreen:{
    flex:1,
  },
  image:{
    width:300/2,
    height:450/2,
    alignSelf:"center",
    display:"flex",
  },
  favorites:{
    justifyContent:'space-between',
    width:60,
   
  },
  rating:{
    paddingVertical: 10
  },
})
  


