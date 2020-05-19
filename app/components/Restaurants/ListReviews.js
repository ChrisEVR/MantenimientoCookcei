import React, {useState,useEffect} from "react";
import {StyleSheet, View,Text,FlatList} from "react-native";
import {Button,Avatar,Rating} from "react-native-elements";

import {firebaseApp} from "../../utils/FireBase"
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function ListReviews(props){
    const {navigation,idRestaurant,setRating} = props;
    const [review, setReview] = useState([]);
    const [reviewsReload, setReviewsReload] = useState(false)
    const [userLogged, setUserLogged] = useState(false);

    firebase.auth().onAuthStateChanged(user => {
        user ? setUserLogged(true) : setUserLogged(false);
    })

    useEffect (() => {
        (async => {
            const resultReviews = [];
            const arrayRating = [];

            db.collection("reviews").where("idRestaurant","==",idRestaurant).get().then(response => {
                response.forEach(doc => {
                    const review = doc.data();
                    resultReviews.push(review);
                    arrayRating.push(review.rating)
                });
                let numSum = 0;
                arrayRating.map(value => {
                    numSum  = numSum +value;
                });
                const countRating = arrayRating.length;
                const resulRating = numSum / countRating;
                const resulRatingFinish = resulRating ? resulRating : 0;

                setReview(resultReviews);
                setRating(resulRatingFinish);
            })

            setReviewsReload(false);
        })()
    },[reviewsReload])

     return(
        <View>

            {userLogged ? (
                <Button 
                buttonStyle ={styles.btnAddReview}
                titleStyle = {styles.btnTitleAddReview}
                title="Escribir una opinion"
                icon={{
                    type: "material-community",
                    name: "square-edit-outline",
                    color: "#fcc11e"
                }}
                onPress={() => navigation.navigate("AddReviewRestaurant", {
                    idRestaurant: idRestaurant,
                    setReviewsReload: setReviewsReload
                })}
                />
            ) : (
                <View style ={{flex: 1}}>
                    <Text style={{textAlign:"center", color:"#fcc11e", padding: 20}}
                    onPress={() => navigation.navigate("Login")}
                    >
                    Para Escribir un comentario u ordenar comida{"\n"}es necesario Iniciar Sesion{"\n"}
                    <Text style={{fontWeight: "bold"}}>Pulse aquí para iniciar sesion</Text>
                    </Text>
                </View>
                
            )}
            
            <FlatList
            data = {review} 
            renderItem={review => <Review review={review}/>}
            keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

function Review(props){
    const {title,review,rating,createAt,avatarUser} = props.review.item;
    const createDateReview = new Date(createAt.seconds * 1000);
    console.log (avatarUser);

    return(
        <View style ={styles.viewReview}>
            <View style={styles.ImageAvatar}>
                <Avatar
                size = "large"
                rounded
                containerStyle={styles.imageAvatarUser}
                source={{uri: avatarUser
                     ? avatarUser
                      : "https://res.cloudinary.com/teepublic/image/private/s--ZbGHwjhv--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_080b1f,e_outline:48/co_080b1f,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1566275484/production/designs/5665954_2.jpg"
                    }}
                    
                    
                 />
            </View>
            <View style={styles.viewInfo}> 
            <Text style={styles.reviewTitle}>{title}
            <Text style={styles.reviewData}> {createDateReview.getDate()}
            /{createDateReview.getMonth() + 1}/{createDateReview.getFullYear()}
            </Text>
            </Text>
            <Rating style ={styles.rating} imageSize={15} startingValue={rating} readonly />
            <Text style={styles.reviewText}>{review}</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    btnAddReview:{
        backgroundColor: "transparent"
    },
    btnTitleAddReview:{
        color:"#fcc11e"
    },
    viewReview: {
        flexDirection: "row",
        margin: 10,
        paddingBottom: 10,
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1
    },ImageAvatar:{
        marginRight: 15
    },
    imageAvatarUser: {
        width: 50,
        height: 50
    },
    viewInfo: {
        flex: 1,
        alignItems: "flex-start"
    },
    reviewTitle:{
        fontWeight: "bold"
    },
    reviewText:{
        paddingTop: 2,
        color: "grey",
        marginBottom: 5
    },
    rating: {
        marginTop: 8
    },
    reviewData: {
        marginTop: 5,
        color: "grey",
        fontSize: 12,
        position: "relative",
        right: 0,
        bottom: 10
    }

})