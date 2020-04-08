import React,{useState} from "react";
import {StyleSheet,View,Number} from "react-native";
import {Button,Input,Icon} from "react-native-elements";
import { validateEmail,validateUdgCode } from "../../utils/Validation";

export default function RegisterForm (){

    const [hidePassword,setHidePassword] = useState(true);
    const [hideRepeatPassword,setHideRepeatPassword] = useState(true);
    const [userName, setUserName] = useState("");
    const [udgCode, setUdgCode] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const register = () => {
        if (!userName||!udgCode||!email || !password || !repeatPassword){
            console.log("Todos los campos deben llenarse");
        }
        else{
            if (!validateEmail(email)){
                console.log("el email no es correcto");
            }
            else{
                if (password !== repeatPassword){
                    console.log("las contraseñas no son iguales");
                }
                else{
                    console.log("todo correcto");
                }
            }
        }
}
    return (
        
        <View style = {styles.formCotainer} behavior="padding" enabled>
            <Input 
            placeholder = "Nombre de Usuario"
            containerStyle={styles.inputForm}
            onChange = {e => setUserName(e.nativeEvent.text)}
            rightIcon = {
                <Icon 
                type= "material-community"
                name="account-plus"
                iconStyle={styles.iconRight}/>
            }
            />
             <Input 
            placeholder = "Codigo UDG"
            keyboardType="numeric"
            containerStyle={styles.inputForm}
            onChange = {e => setUdgCode(e.nativeEvent.text)}
            rightIcon = {
                <Icon 
                type= "material-community"
                name="school"
                iconStyle={styles.iconRight}/>
            }
            />
            <Input 
            placeholder = "Correo electronico"
            containerStyle={styles.inputForm}
            onChange = {e => setEmail(e.nativeEvent.text)}
            rightIcon = {
                <Icon 
                type= "material-community"
                name="at"
                iconStyle={styles.iconRight}/>
            }
            />
            <Input 
            placeholder="contraseña"
            //password = {true}
            secureTextEntry = {hidePassword}
            containerStyle={styles.inputForm}
            onChange ={e => setPassword(e.nativeEvent.text)}
            rightIcon ={
                <Icon 
                type= "material-community"
                name= {hidePassword ? "eye-outline" : "eye-off-outline"}
                iconStyle={styles.iconRight}
                onPress = {() => setHidePassword(!hidePassword)}
                />
            }
            />
            <Input 
            placeholder="Repetir contraseña"
            //password = {true}
            secureTextEntry = {hideRepeatPassword}
            containerStyle={styles.inputForm}
            onChange ={e => setRepeatPassword(e.nativeEvent.text)}
            rightIcon ={
                <Icon 
                type= "material-community"
                name= {hideRepeatPassword ? "eye-outline" : "eye-off-outline"}
                iconStyle={styles.iconRight}
                onPress = {() => setHideRepeatPassword(!hideRepeatPassword)}
                />
            }
            />
            <Button
               title="Registrarse"
               containerStyle={styles.btnContainerRegister}
               buttonStyle={styles.btnRegister} 
               onPress = {register}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    formCotainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    inputForm:{
        width: "100%",
        marginTop: 20,
    },
    iconRight:{
        color: "#c1c1c1"
    },
    btnContainerRegister: {
        marginTop: 20,
        width: "95%"
    },
    btnRegister: {
        backgroundColor:"#009688"
    }
})