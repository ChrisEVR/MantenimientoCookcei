import React, {useRef} from "react";
import {StyleSheet,View,ScrollView,Text,Image, Button} from "react-native";
import {Divider} from "react-native-elements";
import LoginForm from "../../components/Account/LoginForm";
import Toast from "react-native-easy-toast"; 
import LoginFacebook from "./../../components/Account/LoginFacebook";


export default function Login(props){
    const {navigation} = props
    const toastRef = useRef()
    return (
        <ScrollView>
        <Image 
            source = {require("../../../assets/img/logo-provicional.png")}
            style = {styles.logo}
            resizeMode= "contain"
        />
        <View style={styles.viewContainer}>
            <LoginForm toastRef={toastRef} />
            <CreateAccount navigation = {navigation}/>
        </View>
        <Divider style = {styles.divider} />
        <View style = {styles.viewContainer} >
        <LoginFacebook toastRef={toastRef} navigation={navigation}/>
        </View>
        <Toast ref = {toastRef} position ="center" opacity ={0.5}/>
        </ScrollView>
    );
}
function CreateAccount(props){
    const {navigation} = props
    return (
        <Text style= {styles.textRegister}>
            ¿ Aun no tienes cuenta ?{" "}
            <Text style={styles.btnRegister} 
            onPress = {() => navigation.navigate("Register")}>
            Registrate </Text>
        </Text>
    )
}
const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20,
    },
    viewContainer: {
        marginRight: 40,
        marginLeft: 40
    },
    textRegister: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10
        
    },
    btnRegister:{
        color:"#009688",
        fontWeight: 'bold'
    },
    divider: {
        backgroundColor:"#009688",
        margin: 40

    }
    
});
