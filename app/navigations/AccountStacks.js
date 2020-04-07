import {createStackNavigator} from "react-navigation-stack";
import AccountScreen from "../screen/Account";
import Navigation from "./Navigation";

const AccountScreenStacks = createStackNavigator({
    
    Account: {
        screen:AccountScreen,
        navigationOptions: () => ({title:"Cuenta"})
    
    }


});

export default AccountScreenStacks;