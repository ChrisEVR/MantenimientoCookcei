import {createStackNavigator} from "react-navigation-stack";
import AccountScreen from "../screen/MyAccount/Account";
import LoginScreen from "../screen/MyAccount/Login"
import RegisterScreen from "../screen/MyAccount/Register";

const AccountScreenStacks = createStackNavigator({
    
    Account: {
        screen:AccountScreen,
        navigationOptions: () => ({title:"Cuenta"})
    },
    Login: {
        screen: LoginScreen,
        navigationOptions:()=> ({title: "Perfil"})
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: () => ({title: "Registro"})
    }

});

export default AccountScreenStacks;