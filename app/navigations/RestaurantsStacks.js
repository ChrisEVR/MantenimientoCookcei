import {createStackNavigator} from "react-navigation-stack";
import RestaurantsScreen from "../screen/Restaurants/Restaurants";
import AddRestaurantScreen from "../screen/Restaurants/AddRestaurant";
import RestaurantScreen from "../screen/Restaurants/Restaurant";

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
    }

});

export default RestaurantsScreenStacks;