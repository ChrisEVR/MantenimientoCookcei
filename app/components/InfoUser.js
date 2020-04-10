import React from "react";
import {StyleSheet,View,Text} from "react-native";
import {Avatar} from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-easy-toast";

export default function InfoUser(props){
    const {userInfo: {uid,displayName,email,photoURL},setReloadData,toastRef,setIsLoading,setTextLoading} = props;

    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;

        if (resultPermissionCamera === "denied"){
            toastRef.current.show("Es necesario aceptar los permisos")
        }
        else{
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3]
            });
        
        if(result.cancelled){
            toastRef.current.show("Ha cerrado la galeria sin seleccionar niguna imagen")
        }
        else{
            uploadImage(result.uri, uid).then(() => {
                toastRef.current.show("Se a actualizado correctamente")
                updatePhotoUrl(uid);
            });
        }
        }
};

    const uploadImage = async (uri,nameImage) => {
        setTextLoading("Acualizando Avatar");
        setIsLoading(true);
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`Avatar/${nameImage}`);
        return ref.put(blob);

    };

    const updatePhotoUrl = uid => {
        firebase.storage().ref(`Avatar/${uid}`).getDownloadURL().then(async result => {
            const update = {
                photoURL: result
            } 
            await firebase.auth().currentUser.updateProfile(update);
            setReloadData(true);
            setIsLoading(false);
        }).catch(() => {
            toastRef.current.show("Error al recueperar la imagen del servidor")
        });

    };

    return (
        <View style={styles.viewUserInfor}>
            <Avatar 
            rounded
            size="large"
            showEditButton
            onEditPress={changeAvatar}
            containerStyle = {styles.userInfoAvatar}
            source={{
                uri: photoURL ? photoURL : "https://res.cloudinary.com/teepublic/image/private/s--1yHLv054--/c_fit,g_north_west,h_840,w_803/co_080b1f,e_outline:40/co_080b1f,e_outline:inner_fill:1/co_ffffff,e_outline:40/co_ffffff,e_outline:inner_fill:1/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1566275484/production/designs/5665954_2.jpg"
                
            }}
            />
            <View>
                <Text style={styles.displayName}>
                {displayName ? displayName: "User" }
                </Text>
                <Text>{email ? email : "Facebook LogIn"}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfor: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor:"#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight: 20,
        marginLeft: "-20%"
    },
    displayName: {
        fontWeight:"bold"
    }
})