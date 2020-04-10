import React,{useState} from "react";
import {StyleSheet,View,Text} from "react-native";
import {Input,Button} from "react-native-elements";
import * as firebase from "firebase";

 export default function ChangeDisplayNameForm(props){
     const {displayName,setIsVisibleModal,setReloadData,toastRef} = props;
     const [newDisplayName, setNewDisplayName] = useState(null);
     const [error, setError] = useState(null);
     const [isLoading,SetIsLoading] = useState(false);

    const updateDisplayName = () =>{
        setError(null);
        if (!newDisplayName){
            setError("El nombre de usuario no ha cambiado")
        }
        else{
            SetIsLoading(true);
            const Update = {
                displayName: newDisplayName
            }
            firebase.auth().currentUser.updateProfile(Update).then(() =>{
                SetIsLoading(false);
                setReloadData(true);
                toastRef.current.show("Nombre actualizado correcamente");
                setIsVisibleModal(false);
            }).catch(() => {
                setError("Error al actuaizar el nombre");
                SetIsLoading(false);
            });

        }
    };

    return(
        <View style = {styles.view}>
            <Input
            placeholder ="Nombre"
            containerStyle={styles.input}
            defaultValue={displayName && displayName}
            onChange={e => setNewDisplayName(e.nativeEvent.text)}
            rightIcon={{
                type: "material-community",
                name: "account-circle-outline",
                color: "#c2c2c2"
            }}
            errorMessage={error}
            />
            <Button
            title="Actualizar"
            containerStyle={styles.btnContainer}
            buttonStyle = {styles.btn}
            onPress={updateDisplayName}
            loading={isLoading}
            />

        </View>

    )
}
const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer:{
        marginTop:20,
        width: "90%"
    },
    btn:{
        backgroundColor:"#009688"
    }
})