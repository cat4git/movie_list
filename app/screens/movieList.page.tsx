import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { FunctionComponent as Component } from "react"
import { FlatList, Platform, StyleSheet, View } from "react-native"
import { Header, Icon, ListItem } from "react-native-elements"
import { Strings } from "../i18n/i18n"
import { movieServise } from "../services"
import { textAlign } from "../style/rtl"



 export const MovieList: Component = observer(function DemoScreen() {

  
  
  
  const endOfList=()=>{
    movieServise.getNextPage();

  }
  const navigation = useNavigation()
  const navigate=(item,index)=>{
    navigation.navigate("movieDetails",{item:item,index:index})
  }
  
  const  renderBack=()=>{

    const navigation = useNavigation()
    const goBack = () => navigation.goBack()
    const icon=Strings.isRTL?"arrow-forward":"arrow-back";
    return <Icon name={icon} onPress={goBack} color="white" />
  }
  const renderHeader=()=>{
    const leftComponent= !Strings.isRTL?renderBack():null
    const rightComponent=Strings.isRTL?renderBack():null
    return (
      <Header
      leftComponent={leftComponent}
      centerComponent={{ text: Strings.movieScreen.movieList, style: { color: '#fff' } }}
      rightComponent={rightComponent}
      statusBarProps={{ translucent: true }}
      containerStyle={Platform.select({
        android: Platform.Version <= 20 ? { paddingTop: 0, height: 56 } : {},
      })}
    />
    )
  }
  
  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item,index}) => (
    <ListItem
      title={item.title}
      style={{backgroundColor:"red"}}
      titleStyle={textAlign(Strings.isRTL)}
      onPress={()=>{navigate(item,index)}}
    />
  )
  const renderList=()=>{

    const list =movieServise.movieLiset
    
    return(
    list &&<View>
    {
    <FlatList
      keyExtractor={keyExtractor}
      data={list}
      renderItem={renderItem}
      style={styles.flatList}
      onEndReached={endOfList}

    />
    }
  </View>

    )
  }
    return (
      <View style={styles.fullScreen}>
       {renderHeader()}
       {renderList()}
      </View>
    )

})
/*********** style ************* */
const styles = StyleSheet.create({
  fullScreen:{flex:1},
  flatList:{marginBottom: 24}
})
  


