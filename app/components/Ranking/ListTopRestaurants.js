import React, {useEffect,useState}  from "react";
import {View,Text,StyleSheet,ScrollView,ActivityIndicator,TouchableOpacity,FlatList} from "react-native";
import {Card, Image, Icon,Rating} from "react-native-elements";
import * as firebase from "firebase";

export default function ListTopRestaurants(props) {

    const {restaurants,navigation} = props;

    return (
        <FlatList
        data = {restaurants}
        renderItem={restaurants => <Restaurant restaurant={restaurants} navigation={navigation}/>}
        keyExtractor={(item,index) => index.toString()}
         />

    )

}

function Restaurant(props){
    const {restaurant,navigation} = props;
    const {name,description,images,rating} = restaurant.item;
    const [imageRestaurant,setImageRestaurant] = useState(null);
    const [iconColor,setIconColor] = useState("#D50000");
    const [icon,SetIcon] = useState(false);

    useEffect(() =>{
        const image = images[0];
        firebase.storage().ref(`restaurant-images/${image}`).getDownloadURL().then(response => {
            setImageRestaurant(response);
        })
    },[])

    useEffect (() =>{
        if (restaurant.index === 0){
            setIconColor("#B7950B");
            SetIcon(true);
        }
        else if (restaurant.index === 1){
            setIconColor("#90A4AE");
            SetIcon(true);
        }
        else if (restaurant.index === 2){
            setIconColor("#cd7f32");
            SetIcon(true);
        }
        else if (restaurant.index === 3){
            setIconColor("#1F618D");
            SetIcon(false);
        }
    },[])


    return(
        <TouchableOpacity onPress={() => navigation.navigate("Restaurant", {restaurant: restaurant.item})}>
            <Card containerStyle={styles.containerCard}>
                <Icon 
                type="material-community"
                name={icon  ? "chess-queen" : "medal"}
                color = {iconColor}
                size ={40}
                containerStyle={styles.containerIcon}
                 />
                <Image
                style={styles.restaurantImage}
                resizeMode="cover"
                source={{uri: imageRestaurant}}
                />
                <View style={styles.titleRating}>
                    <Text style={styles.title}>{name}</Text>
                    <Rating
                    imageSize={20}
                    startingValue={rating}
                    readonly
                    style={styles.rating}
                    />
                </View>
                <Text style={styles.description}>{description}</Text>
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containerCard: {
        marginBottom: 30,
        borderWidth: 0
    },
    restaurantImage:{
        width: "100%",
        height: 200
    },
    titleRating: {
        flexDirection: "row",
        marginTop: 10
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    rating:{
        position: "absolute",
        right: 0
    },
    description: {
        color: "grey",
        marginTop: 0,
        textAlign: "justify"
    },
    containerIcon:{
        position: "absolute",
        top: -30,
        left: -30,
        zIndex: 1,
    }
})