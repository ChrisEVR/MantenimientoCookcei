import {createStackNavigator} from "react-navigation-stack";
import SearchScreen from "../screen/Search";

const SearchScreenStacks = createStackNavigator({

    search: {
        screen: SearchScreen,
        navigationOptions: () => ({
            title: "Busquedas"
        })

    }

});

export default SearchScreenStacks;