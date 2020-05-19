import React from "react";
import {StyleSheet, View, ScrollView, Text, Image} from "react-native";
import {Button} from "react-native-elements";
import {withNavigation} from "react-navigation"

function UserGuest(props){
    const {navigation} = props;
    return (
      <ScrollView style= {styles.viewBody} centerContent ={true}>
          <Image 
            source ={require("../../../assets/img/original.jpg")}
            style={styles.image}
            resizeMode= "contain"      
          />
          <Text style = {styles.tittle}>consulta tu perfil de CookCei !!! :D</Text>
          <Text style = {styles.description}> Encuentra tu mejor opcion para comer en cucei y ahorrar tiempo.{"\n"}Como a todos nos interesa tu opinion 
          cuentanos tu experincia en los locales de cucei y ¡ vota por el mejor ! </Text>
          <View style = {styles.viewBtn}>
              <Button
                  buttonStyle = {styles.btnStyle}
                  containerStyle = {styles.btnContainer}
                  title= "Ver perfil"
                  onPress= {() => navigation.navigate("Login")}
                />
          </View>
      </ScrollView>
    );
}

export default withNavigation(UserGuest);

const styles = StyleSheet.create ({
    viewBody:{
        marginLeft: 30,
        marginRight: 30
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 40
    },
    tittle: {
        fontWeight:"bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center"
    },
    description: {
        textAlign: "center",
        marginBottom: 20
    },
    viewBtn: {
        flex: 1,
        alignItems: "center"
    },
    btnStyle: {
        backgroundColor: "#be1e2d"  
    },
    btnContainer:{
        width: "70%"
    }
})