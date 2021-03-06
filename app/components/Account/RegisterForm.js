import React,{useState} from "react";
import {StyleSheet,View,Number} from "react-native";
import {Button,Input,Icon} from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import {withNavigation} from "react-navigation"
import Loading from "../Loading";

 function RegisterForm (props){
    const {toastRef,navigation} = props;
    const [hidePassword,setHidePassword] = useState(true);
    const [hideRepeatPassword,setHideRepeatPassword] = useState(true);
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const register = async () => {
        setIsVisibleLoading (true);
        if (!email || !password || !repeatPassword){
            toastRef.current.show("*Hay campos sin llenar")
        }
        else{
            if (!validateEmail(email)){
                toastRef.current.show("El email no es correcto")
            }
            else{
                if (password !== repeatPassword){
                    toastRef.current.show("Las contraseñas no coinciden")
                }
                else{
                    if(password.length < 6){
                        toastRef.current.show("la contraseña debe ser mayo a 6 caracteres")
                    }
                    else{
                    await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        navigation.navigate("Account")

                    })
                    .catch(() => {
                        toastRef.current.show("ERROR/ CORREO YA REGISTRADO")
                    });
                }
                    
                }
            }
        }
    setIsVisibleLoading(false);
};
    return (
        
        <View style = {styles.formCotainer} behavior="padding" enabled> 
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
            placeholder="contraseña(mayo a 6 caracteres)"
            password = {true}
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
            password = {true}
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
            <Loading text="creando cuenta" isVisible={isVisibleLoading}/>
        </View>
    );
}

export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
    formCotainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50
    },
    inputForm:{
        width: "100%",
        marginTop: 20,
    },
    iconRight:{
        color: "#c1c1c1"
    },
    btnContainerRegister: {
        marginTop: 70,
        width: "95%"
    },
    btnRegister: {
        backgroundColor:"#be1e2d"
    }
})