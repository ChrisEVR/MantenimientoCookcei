import React from "react";
import {Icon} from "react-native-elements";
import {createAppContainer} from "react-navigation";
import {createBottomTabNavigator} from "react-navigation-tabs";

import RestaurantsScreenStacks from "./RestaurantsStacks";
import TopListScreenStacks from "./TopListsStacks";
import SearchScreenStacks from "./SearchStacks";
import AccountScreenStacks from "./AccountStacks";

const NavigationStacks = createBottomTabNavigator({
    Restaurants: {
        screen: RestaurantsScreenStacks,
        navigationOptions: () => ({
            tabBarLabel: "Restaurantes",
            tabBarIcon: ({tintColor}) => (
            <Icon
            type = "material-community"
            name = "silverware-fork-knife"
            size={22}
            color={tintColor}
            />
            )
        })
    },
    TopLists:{
        screen: TopListScreenStacks,
        navigationOptions: ()=> ({
            tabBarLabel: "Ranking",
            tabBarIcon: ({tintColor}) =>(
                <Icon
                type = "material-community"
                name = "star-half"
                size={22}
                color = {tintColor}
                />
            )
        })

    },
    Searchs:{
        screen: SearchScreenStacks,
        navigationOptions: ()=> ({
            tabBarLabel: "Busquedas",
            tabBarIcon: ({tintColor}) =>(
                <Icon
                type = "material-community"
                name = "magnify"
                size={22}
                color = {tintColor}
                />
            )
        })

    },
    Accounts:{
        screen: AccountScreenStacks,
        navigationOptions: ()=> ({
            tabBarLabel: "Cuenta",
            tabBarIcon: ({tintColor}) =>(
                <Icon
                type = "material-community"
                name = "account-circle-outline"
                size={22}
                color = {tintColor}
                />
            )
        })

    }

},
{
    initialRouteName: "Restaurants",
    order: ["Restaurants","TopLists","Searchs","Accounts"],
    tabBarOptions: {
        inactiveTintColor: "#646464",
        activeTintColor: "#009688"
    }
}
);


export default createAppContainer(NavigationStacks);