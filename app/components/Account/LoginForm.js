import React,{useState} from "react";
import {StyleSheet,View} from "react-native";
import {Input,Icon, Button} from "react-native-elements";
import {validateEmail} from "../../utils/Validation"
import {withNavigation} from "react-navigation"
import * as firebase from "firebase";
import Loading from "../Loading";

function LoginForm (props){
    const {toastRef,navigation} = props;
    const [HidePassword,setHidePassword] = useState(true);
    const [isVisibleLoading,setIsVisibleLoading] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState ("");


    const login = async () => {
        setIsVisibleLoading(true);
        if (!email || !password){
            toastRef.current.show("Debe llenar todos los campos")
        }
        else{
            if(!validateEmail(email)){
                toastRef.current.show("Email NO valido")
            }
            else{
                await firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
                    navigation.navigate("Account");
                })
                .catch(() => {
                    toastRef.current.show("Email o contraeña incorrectos")
                });
            }
        }

        setIsVisibleLoading(false);
};
    return (
        <View style= {styles.formContainer}>
            <Input
                placeholder="Correo electronico"
                containerStyle = {styles.inputForm}
                onChange={e => setEmail(e.nativeEvent.text)}
                rightIcon={
                    <Icon 
                        type = "material-community"
                        name = "account"
                        iconStyle = {styles.iconRight}
                    />
                }
            />
            <Input
                placeholder="Contraseña"
                containerStyle = {styles.inputForm}
                secureTextEntry = {HidePassword}
                onChange={ e => setPassword(e.nativeEvent.text)}
                
                rightIcon={
                    <Icon
                        type = "material-community"
                        name = {HidePassword ? "eye-outline":"eye-off-outline"}
                        iconStyle = {styles.iconRight}
                        onPress = {() => setHidePassword(!HidePassword)}
                    />
                }
            />
            <Button
                title= "Iniciar Sesion"
                buttonStyle = {styles.btnLogin}
                containerStyle = {styles.btnContainer}
                onPress= {login}
            />
            <Loading text = "Iniciando sesion" isVisible={isVisibleLoading}/>
        </View>
    )
}

export default withNavigation(LoginForm);

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems:"center",
        justifyContent: "center",
        marginTop: 30

    },
    inputForm: {
        width: "100%",
        marginTop: 20
    },
    iconRight:{
        color: "#c1c1c1"

    },
    btnLogin: {
        backgroundColor:"#009688"

    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
    }
}
)