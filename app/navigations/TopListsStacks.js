import {createStackNavigator} from "react-navigation-stack";
import TopListScreen from "../screen/TopRestaurants";

const TopListScreenStacks = createStackNavigator({
    topRestaurants: {
        screen: TopListScreen,
        navigationOptions: () => ({
            title: "Top de las cocinas de CUCEI"
        })

    }
});

export default TopListScreenStacks;

