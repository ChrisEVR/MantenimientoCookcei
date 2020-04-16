import {createStackNavigator} from "react-navigation-stack";
import RestaurantsScreen from "../screen/Restaurants/Restaurants";
import AddRestaurantScreen from "../screen/Restaurants/AddRestaurant";
import RestaurantScreen from "../screen/Restaurants/Restaurant";
import AddReviewRestaurantScreen from "../screen/Restaurants/AddReviewRestaurant";
import MenuScreen from "../screen/Restaurants/Menu";

const RestaurantsScreenStacks = createStackNavigator({
    Restaurants: {
        screen: RestaurantsScreen,
        navigationOptions: () => ({
            title: "Restaurantes"
        })

    },
    AddRestaurant: {
        screen: AddRestaurantScreen,
        navigationOptions: () => ({
            title: "Nuevo restaurante"
        })
    },
    Restaurant: {
        screen: RestaurantScreen,
        navigationOptions: (props) =>({
            title: props.navigation.state.params.restaurant.item.restaurant.name
        })
    },
    AddReviewRestaurant:{
        screen: AddReviewRestaurantScreen,
        navigationOptions: () => ({
            title: "Nuevo Comentario"
        })
    },
    Menu:{
        screen: MenuScreen,
        navigationOptions: () => ({
            title: "MENU"
        })
    }

});

export default RestaurantsScreenStacks;