import React, {useState,useEffect} from "react";
import {View,Text, Dimensions,StyleSheet,ScrollView} from "react-native";
import {Rating,ListItem,Button} from "react-native-elements";
import CarouselImages from "../../components/CarouselImages"
import Map from "../../components/Map";
import ListReviews from "../../components/Restaurants/ListReviews"
import * as firebase from "firebase";

const screenWidth = Dimensions.get("window").width;

export default function Restaurant(props){
    const { navigation } = props;
    const { restaurant } = navigation.state.params.restaurant.item;
    const [imagesRestaurant, setImagesRestaurant] = useState([]);
    const [rating, setRating] = useState(restaurant.rating);


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
      console.log(setImagesRestaurant);


    return (
        <ScrollView style = {styles.viewBody}>
            <CarouselImages arrayImages={imagesRestaurant} height={250} width={screenWidth} />
            <TitleRestaurant name={restaurant.name} description={restaurant.description} rating={rating} />
            <RestaurantInfo location ={restaurant.location} name={restaurant.name} address={restaurant.address}/>
            <MenuBtn navigation ={navigation} idRestaurant={restaurant.id}/>
            <ListReviews navigation={navigation} idRestaurant={restaurant.id} setRating={setRating}/>
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
                    color: "#009688"
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
                color: "#009688"
            }}
            onPress ={() => navigation.navigate("Menu", {
                idRestaurant: idRestaurant
            })}
        />
        </View>
    )

}

const styles = StyleSheet.create({
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
        color:"#009688"
    }
})