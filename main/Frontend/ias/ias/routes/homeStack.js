import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
// import Header from '../shared/header';
import Home from '../screens/home';
import Login from '../screens/login';
import Payment from '../screens/payments'
import Transaction from '../screens/transaction'
// import ReviewDetails from '../screens/reviewDetails';

const screens = {
    // Home: {
    //     screen: Home,
    //     navigationOptions: ({ navigation }) => {
    //         return {
    //             headerTitle: () => <Header title='GameZonee' navigation={navigation} />
    //         }
    //     },
    // },
    // ReviewDetails: {
    //     screen: ReviewDetails,
    //     navigationOptions: {
    //         title: 'Review Details',
    //     }
    // },
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Login',
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home',
        }
    },
    Payment: {
        screen: Payment,
        navigationOptions: {
            title: 'Payment'
        }
    },
    Transaction: {
        screen: Transaction,
        navigationOptions: {
            title: 'Transaction'
        }
    }

};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
    }
});

export default HomeStack;


