import React, {useState,useEffect,useRef} from "react";
import {View,Text, Dimensions,StyleSheet,ScrollView} from "react-native";
import {Rating,ListItem,Button, Icon} from "react-native-elements";
import CarouselImages from "../../components/CarouselImages"
import Map from "../../components/Map";
import ListReviews from "../../components/Restaurants/ListReviews";
import Toast from "react-native-easy-toast"; 

import {firebaseApp} from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp)

const screenWidth = Dimensions.get("window").width;

export default function Restaurant(props){
    const { navigation } = props;
    const { restaurant } = navigation.state.params;
    const [imagesRestaurant, setImagesRestaurant] = useState([]);
    const [rating, setRating] = useState(restaurant.rating);
    const [isFavorite,setIsFavorite] = useState(false);
    const [userLogged, setUserLogged] = useState(false);
    const toasRef = useRef();

    firebase.auth().onAuthStateChanged(user => {
        user ? setUserLogged(true) : setUserLogged(false);
    })


    useEffect(() => {
        const arrayUrls = [];
        (async () => {
          await Promise.all(
            restaurant.images.map(async idImage => {
              await firebase
                .storage()
                .ref(`restaurant-images/${idImage}`)
                .getDownloadURL()
                .then(imageUrl => {
                  arrayUrls.push(imageUrl);
                });
            })
          );
          setImagesRestaurant(arrayUrls);
          
        })();
      }, []);

      useEffect (() => {
          if (userLogged === true){
        db.collection("favorites").where("idRestaurant", "==", restaurant.id)
        .where("idUser", "==" , firebase.auth().currentUser.uid).get().then(response => {
            if(response.docs.length === 1){
                setIsFavorite(true);
            }
        })
    }
      },[userLogged])

      const addFavorite = () => {

      if (userLogged === false){
          toasRef.current.show("Para añadir este restaurante a favoritos debes iniciar sesion",2000);
      }
      else {
        const payload = {
            idUser: firebase.auth().currentUser.uid,
            idRestaurant: restaurant.id
        }
        db.collection("favorites").add(payload).then(() => {
            setIsFavorite(true);
            toasRef.current.show("Restaurante añadido a la lista de favoritos")
        }).catch(() => {
            toasRef.current.show("Error al añadir al restaurante a la lista de favoritos")
        });
    }
};
      const removeFavorite = () =>{
          db.collection("favorites").where("idRestaurant", "==", restaurant.id)
          .where("idUser", "==", firebase.auth().currentUser.uid)
          .get().then(response => {
            response.forEach(doc => {
                const idFavorite = doc.id;
                db.collection("favorites").doc(idFavorite).delete().then(() =>{
                    setIsFavorite(false);
                    toasRef.current.show("Restaurante eliminado de la lista de favoritos")
                }).catch(() =>{
                    toasRef.current.show("No se ha podido eliminar, intentelo mas tarde")
                });
            });
          });
      };
    return (
        <ScrollView style = {styles.viewBody}>
            <View style ={styles.viewFavorite}>
                <Icon
                type="material-community"
                name={isFavorite  ? "heart" : "heart"}
                onPress={isFavorite ? removeFavorite : addFavorite}
                color ={isFavorite ? "#B03A2E" : "#BDC3C7"}
                size={35}
                underlayColor="transparent"
                />
            </View>
            <CarouselImages arrayImages={imagesRestaurant} height={250} width={screenWidth} />
            <TitleRestaurant name={restaurant.name} description={restaurant.description} rating={rating} />
            <RestaurantInfo location ={restaurant.location} name={restaurant.name} address={restaurant.address}/>
            <MenuBtn navigation ={navigation} idRestaurant={restaurant.id}/>
            <ListReviews navigation={navigation} idRestaurant={restaurant.id} setRating={setRating}/>
            <Toast ref={toasRef} position="center" opacity ={0.5} />
        </ScrollView>
        
    );
}

function TitleRestaurant(props){
    const {name,description,rating} = props;

    return(
        <View style={styles.viewRestaurantTitle}>
            <View style ={{flexDirection: "row"}}> 
            <Text style={styles.nameRestaurant}>{name}</Text>
            <Rating style={styles.rating}
            imageSize={20}
            readonly
            startingValue={parseFloat(rating)}
            />
            </View>
        <Text style={styles.descriptionRestaurant}>{description}</Text> 
        </View>
    )

}

function RestaurantInfo(props){
    const {location,name,address} = props;
    const listInfo =[
        {

        text: address,
        iconName: "map-marker",
        iconType: "material-community",
        action: null
    }
    ];

    return(
        <View style={styles.viewRestaurantInfo}>
            <Text style={styles.restaurantInfoTitle}>Informacion sobre el restaurante</Text>
            <Map location={location} name={name} height={100}/>
            {listInfo.map((item,index) => (
                <ListItem 
                key={index}
                title={item.text}
                leftIcon={{
                    name: item.iconName,
                    type: item.iconType,
                    color: "#be1e2d"
                }}
                containerStyle={styles.containerListItem}
                />
            ))}
        </View>
    )
}

function MenuBtn(props){
    const {navigation, idRestaurant} = props;

    return(
        <View >
        <Button 
            title="Ver Menu"
            buttonStyle ={styles.menuBtn}
            titleStyle = {styles.btnTitleMenu}
            icon={{
                type: "material-community",
                name: "food",
                color: "#fcc11e"
            }}
            onPress ={() => navigation.navigate("Menu", {
                idRestaurant: idRestaurant
            })}
        />
        </View>
    )

}

const styles = StyleSheet.create({
    viewFavorite:{
        position: "absolute",
        top: 0,
        right:0,
        zIndex: 2,
        backgroundColor:"#fff",
        borderBottomLeftRadius: 100,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 5
    },
    viewBody: {
        flex:1,
        backgroundColor: "white"
    },
    viewRestaurantTitle: {
        margin:15
    },
    nameRestaurant:{
        fontSize:20,
        fontWeight: "bold"
    },
    rating: {
        position: "absolute",
        right:0
    },
    descriptionRestaurant:{
        marginTop: 5,
        color: "grey"
    },
    viewRestaurantInfo:{
        margin: 15,
        marginTop:25
    },
    restaurantInfoTitle:{
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    containerListItem:{
        borderBottomColor: "#d8d8d8",
        borderBottomWidth: 1
    },
    menuBtn: {
        backgroundColor: "transparent"
    },
    btnTitleMenu:{
        color: "#fcc11e"

    }
})