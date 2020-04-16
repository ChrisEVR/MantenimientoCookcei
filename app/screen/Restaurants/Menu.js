import React from "react";
import {StyleSheet,View,Text} from "react-native";

export default function AddReviewRestaurant(props){
    const {navigation}=props;
    const {idRestaurant} = navigation.state.params;


    console.log(props)
     return(
         <View>
             <Text>
                 Estamos en menu :D!
             </Text>
         </View>
     )
}