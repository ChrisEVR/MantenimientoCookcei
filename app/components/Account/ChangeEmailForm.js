import React,{useState} from "react";
import {StyleSheet,View} from "react-native";
import {Input,Button} from "react-native-elements";
import * as firebase from "firebase";
import {reauthenticate} from "../../utils/Api";

export default function ChangeEmailForm(props){
    const {email,setIsVisibleModal,setReloadData,toastRef} = props;
    const [newEmail,SetNewEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState({});
    const [hidePassword,SetHidePassword] = useState(true);
    const [isLoading,setIsLoading] = useState(false);

    const updateEmail = () => {
        setError({});

        if (!newEmail || email === newEmail){
            setError({email: "El email no puede ser igual o estar vacio"});
        }
        else{
            setIsLoading(true);
            reauthenticate(password).then(() => {
                firebase.auth().currentUser.updateEmail(newEmail).then(()=> {
                    setIsLoading(false);
                    setReloadData(true);
                    toastRef.current.show("Email actualizado correctamente");
                    setIsVisibleModal(false);
                })
                .catch(() => {
                    setError({email: "Error al actualizar el email"})
                    setIsLoading(false);
                })

            })
            .catch(() => {
                setError({password: "La contraseña no es correcta"})
                setIsLoading(false);
            });
        }

};
    return (
        <View styles={styles.view}>
            <Input
            placeholder ="Correo Electronico"
            containerStyle = {styles.input}
            defaultValue ={email && email}
            onChange ={e => SetNewEmail(e.nativeEvent.text)}
            rightIcon= {{
                type: "material-community",
                name: "at",
                color: "#c2c2c2"
            }}
            errorMessage={error.email}
            />
            <Input
            placeholder = "Ingresa su contraseña"
            containerStyle = {styles.input}
            secureTextEntry={hidePassword}
            onChange={e => setPassword(e.nativeEvent.text)}
            rightIcon= {{
                type: "material-community",
                name: hidePassword ? "eye-outline" : "eye-off-outline",
                color: "#c2c2c2",
                onPress: () => SetHidePassword(!hidePassword)
            }}
            errorMessage={error.password}
             />
             <Button
             title = "Actualizar"
             containerStyle = {styles.btnContainer}
             buttonStyle = {styles.btn}
             onPress ={updateEmail}
             loading ={isLoading}
             
             />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingBottom: 10,
        paddingTop: 10

    },
    input:{
        marginBottom: 10,
        marginTop: 10
    },
    btnContainer:{
        marginTop: 20,
        width: "95%"
        
    },
    btn :{
        backgroundColor: "#009688"
    }

})