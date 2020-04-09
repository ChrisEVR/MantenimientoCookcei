import React,{useState} from "react";
import {SocialIcon} from "react-native-elements";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import Loading from "../Loading";

export default function LoginFacebook(props){
    const {toasRef,navigation} = props;
    const [isLoading,setIsLoading] =useState(false);
    
    async function logIn() {
        try {
          await Facebook.initializeAsync("2285994225036592");
          const {type,token,expires,permissions,declinedPermissions
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ["public_profile"]
          });

          if (type === "success") {
              setIsLoading(true);
            console.log(token);
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            await firebase.auth().signInWithCredential(credentials).then(() => {
                navigation.navigate("Account");
              })
              .catch(() => {
                toasRef.current.show("Error desconocido, intenetelo mas tarde");
              });
          } else if (type === "cancel") {
            toasRef.current.show("Inicio de sesion cancelado");
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
        setIsLoading(false);
};
     return (
        <> 
        <SocialIcon 
        title= "Iniciar con Facebook" 
        button
        type = "facebook"
        onPress={logIn}
        />
        <Loading isVisible={isLoading} text="iniciando sesion"/>
        </>

     );
}