import {createStackNavigator} from "react-navigation-stack";
import RestaurantsScreen from "../screen/Restaurants/Restaurants";
import AddRestaurantScreen from "../screen/Restaurants/AddRestaurant";

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
    }
});

export default RestaurantsScreenStacks;