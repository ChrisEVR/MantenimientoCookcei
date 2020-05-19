import React, {useState,useRef} from "react";
import {StyleSheet,View} from "react-native";
import {AirbnbRating,Button, Input, Avatar} from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";

import {firebaseApp} from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
import Restaurant from "./Restaurant";
const db = firebase.firestore(firebaseApp);

export default function AddReviewRestaurant(props){
     const {navigation} = props;
     const {idRestaurant, setReviewsReload} = navigation.state.params;
     const [rating,setRating] = useState(null);
     const [title,setTitle] = useState("");
     const [review, setReview] = useState("");
     const toastRef = useRef();
     const [isLoding, setIsLoading] = useState(false);

     const addReview = () =>{
         if (rating === null){
             if (!title || !review){
                toastRef.current.show("Debe llenar TODOS los campos");
            }
            else{
                toastRef.current.show("Tienes que dar una puntiacion");
            }
        }
        else if (!title || !review){
            toastRef.current.show("Aun hay campos vacios")
        }
        else {
            const user = firebase.auth().currentUser;
            setIsLoading(true);
            const payload = {
                idUser: user.uid,
                avatarUser: user.photoURL,
                idRestaurant: idRestaurant,
                title: title,
                review : review,
                rating: rating,
                createAt: new Date()
            };
            db.collection("reviews").add(payload).then(() =>{
                updateRestaurant();
            }).catch(() => {
                setIsLoading(false);
                toastRef.current.show("Error al comentar, intentelo mas tarde");
            })
        
    }

    };

    const updateRestaurant = () => {
        const restaurantRef = db.collection("restaurants").doc(idRestaurant);

        restaurantRef.get().then(response => {
            const restaurantData = response.data();
            const ratingTotal = restaurantData.ratingTotal + rating;
            const quantityVoting = restaurantData.quantityVoting + 1;
            const ratingResult = ratingTotal/quantityVoting;

            restaurantRef.update({rating: ratingResult, ratingTotal, quantityVoting}).then(() => {
                setIsLoading(false);
                setReviewsReload(true);
                navigation.goBack();
            })

        })
    }

     return(
         <View style={styles.viewBody}>
             <View style ={styles.viewRating}>
                <AirbnbRating
                count={5}
                reviews={["Pesimo","Deficiente","Bueno","Muy Bueno","Excelente"]}
                defaultRating ={0}
                size={35}
                onFinishRating={value => setRating(value)}
                 />
            </View>
            <View style ={styles.formReview}>
                <Input
                placeholder ="Titulo"
                containerStyle={styles.input}
                onChange={e => setTitle(e.nativeEvent.text)}
                 />
                 <Input
                 placeholder="Opinion"
                 multiline={true}
                 inputContainerStyle={styles.textArea}
                 onChange={e =>setReview(e.nativeEvent.text) }
                  />
                <Button 
                title="Comentar"
                onPress={addReview}
                containerStyle={styles.btnContainer}
                buttonStyle = {styles.btn}
                />
             </View>
             <Toast ref={toastRef} position="center" opacity={0.5}/>
             <Loading isVisible={isLoding} text="Enviando Comentario"/>
         </View>
     )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "white"
    },
    viewRating:{
        height: 110,
        backgroundColor: "white"
    },
    formReview:{
        margin: 10,
        marginTop: 40,
        flex: 1,
        alignItems:"center"
    },
    input:{
        marginBottom: 10
    },
    textArea:{
        height: 150,
        width: "100%",
        padding: 0,
        margin: 0
    },
    btnContainer: {
        flex: 1,
        justifyContent: "flex-end",
        marginTop: 20,
        marginBottom: 10,
        width: "95%"
    },
    btn :{
        backgroundColor: "#fcc11e"
    }

})