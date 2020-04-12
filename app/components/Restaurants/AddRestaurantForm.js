import React,{useState,useEffect} from "react";
import {StyleSheet,View,ScrollView,Alert,Dimensions} from "react-native";
import {Icon,Avatar,Image,Button,Input} from "react-native-elements";
import * as permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker"
import * as Location from "expo-location"
import MapView from "react-native-maps";
import Modal from "../Modal";
import uuid from "uuid/v4";

import {firebaseApp} from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const widthScreen = Dimensions.get("window").width;

export default function AddRestaurantForm(props){
    const {toastRef,setIsLoading,navigation} = props;
    const [imagesSelected,setImageSelected] = useState([]);
    const [restaurantName,setRestaurantName] = useState("");
    const [restaurantAddress,setRestauranAddress] = useState("");
    const [restauranteDescription,setRestauranDescription] = useState("");
    const [isVisibleMap,setIsVisibleMap] = useState(false);
    const [locationRestaurant,setLocationRestaurant] =useState(null);

    const addRestaurant = () => {
        if(!restaurantName || !restaurantAddress || !restauranteDescription){
            toastRef.current.show("Debes llenar todos los campos")
        } else if (imagesSelected.length ===0 ) {
            toastRef.current.show ("Debe de agregar al menos una imagen")
        }else if (!locationRestaurant){
            toastRef.current.show("Debes agregar la localizacion del restaurante")
        } else {
            setIsLoading(true);
            uploadImageStorage(imagesSelected).then(arrayImages => {
                db.collection("restaurants").add({
                    name: restaurantName,
                    address: restaurantAddress,
                    description: restauranteDescription,
                    location: locationRestaurant,
                    images: arrayImages,
                    rating: 0,
                    ratingTotal: 0,
                    quantityVoting:0,
                    createAt: new Date(),
                    createBy: firebase.auth().currentUser.uid
                }).then( () => {
                    setIsLoading(false);
                    navigation.navigate("Restaurants");
                }).catch(() => {
                    setIsLoading(false);
                    toastRef.current.show("Error al subir el restaurante, intentelo mas tarde");
                })
            });

        }
    };

    const uploadImageStorage  = async imageArray => {
        const imageBlob = []
        await Promise.all(
            imageArray.map(async image => {
                const response = await fetch(image);
                const blob = await response.blob()
                const ref = firebase.storage().ref("restaurant-images").child(uuid());
                await ref.put(blob).then(result => {
                    imageBlob.push(result.metadata.name)
                })
            })
        );
        return imageBlob;
    };

    return(
        <ScrollView>
            <ImageRestaurant 
            imageRestaurant={imagesSelected[0]}
            />
            <FormAdd 
            setRestaurantName={setRestaurantName} 
            setRestauranAddress={setRestauranAddress} 
            setRestauranDescription={setRestauranDescription}
            setIsVisibleMap ={setIsVisibleMap}
            locationRestaurant={locationRestaurant}
            />
            <UploadImage 
            imagesSelected={imagesSelected}
            setImageSelected={setImageSelected}
            toastRef={toastRef}
             />
             <Button 
              title = "Crear Restaurante"
              onPress= {addRestaurant}
              buttonStyle = {styles.btnAddRestaurant}
             />
            <Map 
            isVisibleMap={isVisibleMap}
            setIsVisibleMap={setIsVisibleMap}
            setLocationRestaurant={setLocationRestaurant}
            toastRef={toastRef}
            />
        </ScrollView>
    )
}

function ImageRestaurant(props){
    const {imageRestaurant} =props;

    return (
        <View styles ={styles.viewPhoto}>
            {imageRestaurant ? (
                <Image 
                source={{uri: imageRestaurant}}
                style= {{width:widthScreen, height:200}}
                />
            ) : ( <Image 
                    source = {require("../../../assets/img/no-image.png")}
                    style= {{width:widthScreen, height:200}}
                  />
            )}
        </View>
    )

}

function UploadImage(props){
    const {imagesSelected,setImageSelected,toastRef} = props;

    const imagesSelect = async () => {
        const resultPermissions = await permissions.askAsync(permissions.CAMERA_ROLL);
        const resultPermissionsCamera = resultPermissions.permissions.cameraRoll.status;

        if (resultPermissionsCamera === "denied"){
            toastRef.current.show("debes aceptar los permisos de la galeria")
        }
        else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [5,5]
            })
            if (result.cancelled){
                toastRef.current.show("Ha cerrado la galeria sin seleccionar nada")
            }
            else {
                setImageSelected([...imagesSelected,result.uri]);
            }
        }
    };

    const removeImage = image => {

        const arrayImages = imagesSelected;

        Alert.alert("ELIMINAR IMAGEN!","¿Esta seguro que desea eliminar esta imagen?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },

          { 
             text: "Eliminar",
             onPress: () => 
             setImageSelected
             (
                 arrayImages.filter(imageUrl => imageUrl !== image)
             )
          }
        ],

        {cancelable: false}
        );
    };

    return (
        <View style={styles.vieImage}>

            {imagesSelected.length < 4 && (
            <Icon
            type ="material-community"
            name ="camera"
            color ="#7a7a7a"
            containerStyle = {styles.containerIcon}
            onPress = {imagesSelect}
             />
            )}

             {imagesSelected.map(imageRestaurant => (
                 <Avatar
                 key ={imageRestaurant}
                 onPress={() => removeImage(imageRestaurant)}
                 style = {styles.miniatureStyle}
                 source= {{uri: imageRestaurant}}
                 />
             ))}
        </View>
    );

};

function FormAdd (props){
    const {setRestaurantName,setRestauranAddress,setRestauranDescription,setIsVisibleMap,
        locationRestaurant} = props;

    return (
        <View style ={styles.viewForm}>
            <Input
              placeholder="Nombre de la ventana"
              containerStyle = {styles.input}
              onChange={e => setRestaurantName(e.nativeEvent.text)}
             />
             <Input
              placeholder="Ubicacion"
              containerStyle={styles.input}
              rightIcon ={{
                  type: "material-community",
                  name: "google-maps",
                  color: locationRestaurant ? "#00a680": "#c2c2c2",
                  onPress: () => setIsVisibleMap(true)
              }}
              onChange={e => setRestauranAddress(e.nativeEvent.text)}
              />
              <Input 
                placeholder="Descripcion del restaurante"
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={e => setRestauranDescription(e.nativeEvent.text)}
              />


        </View>
    )
} 

function Map(props){
    const {isVisibleMap, setIsVisibleMap,setLocationRestaurant,toastRef} = props;
    const [location,setLocation] =useState(null);


    useEffect (() => {
        (async () => {
            const resultPermissions = await permissions.askAsync(permissions.LOCATION);
            const statusPermissions = resultPermissions.permissions.location.status

            if(statusPermissions !== "granted"){
                toastRef.current.show("Tienes que aceptar los permisos de localizacion para crear un restaurante")

            } else{
                const loc = await Location.getCurrentPositionAsync({});
                setLocation ({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                })
            }

        })()

    },[])

    const confirmLocation = () =>{
        setLocationRestaurant(location);
        toastRef.current.show("Localizacion guardara correctamente");
        setIsVisibleMap(false);
    }

    return(
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <View>
                {location && (
                    <MapView 
                    style={styles.mapStyle}
                    initialRegion={location}
                    showsUserLocation={true}
                    onRegionChange={region => setLocation(region)}
                    >
                        <MapView.Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude
                        }}
                        draggable
                         />

                    </MapView>
                )}
                <View style={styles.viewMapBtn} >
                    <Button
                    title = "Guardar ubicacion"
                    onPress ={confirmLocation}
                    containerStyle ={styles.viewMapBtnContainerSave}
                    buttonStyle ={styles.viewMapBtnSave}
                    />
                    <Button
                    title ="Cancelar ubicacion"
                    onPress = {() => setIsVisibleMap(false)}
                    containerStyle ={styles.viewMapBtnContainerCancel}
                    buttonStyle = {styles.viewMapBtnCancel}

                     />
                </View>
            </View>
        </Modal>
    )

}

const styles = StyleSheet.create({
    viewPhoto:{
        alignItems: "center",
        height: 200,
        marginBottom:20
    },
    vieImage: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight:10,
        height: 70,
        width:70,
        backgroundColor:"#e3e3e3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10
    },
    viewForm: {
        marginLeft: 10,
        marginRight:10
    },
    input:{
        marginBottom:10
    },
    textArea: {
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0
    },
    mapStyle:{
        width: "100%",
        height: 400
    },
    viewMapBtn:{
        flexDirection:"row",
        justifyContent: "center",
        marginTop: 10
    },
    viewMapBtnContainerSave:{
        paddingRight: 5
    },
    viewMapBtnSave: {
        backgroundColor: "#009688"
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5
    },
    viewMapBtnCancel: {
        backgroundColor: "#a60d0d"
    },
    btnAddRestaurant: {
        backgroundColor: "#009688",
        margin: 20
    }


});