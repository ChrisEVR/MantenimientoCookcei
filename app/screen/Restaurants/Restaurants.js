import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet} from "react-native";
import ActionButton from "react-native-action-button";
import AddRestaurant from "./AddRestaurant";
import * as firebase from "firebase";

export default function Restaurants(props){
    const {navigation} = props;
    const [user,setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(userInfo => {
            setUser(userInfo);
        })
    }, [])

    if (user !== null){

        var admin = user.email;
        
        if(admin === "admin@gmail.com"){

        return (
            <View style = {styles.viewBody}>
            <Text>
                Estamos en Restaurants
            </Text>
            <AddRestaurantButton navigation={navigation} />
        </View>

        );
        } else{
            return (
                <View style = {styles.viewBody}>
                    <Text>
                        Estamos en Restaurants
                    </Text>
                </View>
            );
          }
        
    }
    else {
    return (
        <View style = {styles.viewBody}>
            <Text>
                Estamos en Restaurants
            </Text>
        </View>
    );
  }
}

function AddRestaurantButton(props){
    const {navigation} =props;
    return (
        <ActionButton
        buttonColor= "#009688"
        onPress = {() => navigation.navigate("AddRestaurant")}
        />
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    }

})