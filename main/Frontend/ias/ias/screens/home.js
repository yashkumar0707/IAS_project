import React, { useState } from 'react';
import axios from 'axios'
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, FlatList, Modal } from 'react-native';
import { globalStyles } from '../styles/global';
import { Card } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';

// const ReviewSchema = yup.object({
//     title: yup.string().required().min(4),
//     body: yup.string().required().min(8),
//     rating: yup.string().required().test('is-num-1-5', 'Rating must be a number from 1-5', (val) => {
//         return parseInt(val) < 6 && parseInt(val) > 0;
//     })
// })
// componentDidMount(){

// }


export default function Home({ navigation }) {
    const [balance, setBalance] = useState(0)
    const [associated_bank, setassociated_bank] = useState('')
    let username = ''
    const handlePayment = () => {
        navigation.navigate('Payment', { username: username })
    }

    console.log(navigation.getParam('username'))

    username = navigation.getParam('username')
    // let balance
    // let associated_bank

    axios.get('http://192.168.0.159:8080/customers/' + username).then(res => {
        console.log(res.data.data)
        // associated_bank = res.data.data.associated_bank
        // balance = res.data.data.balance
        setBalance(res.data.data.balance)
        setassociated_bank(res.data.data.associated_bank)
        console.log(balance, 'yash')
        // console.log('uiuiu')
        // navigation.navigate('Home', { userID: 'A1' })
    })

    // this.getvalue()
    console.log(balance, 'yash')
    return (
        <View style={globalStyles.container}>
            <Card style={styles.card}>
                <Card.Title>{username}</Card.Title>
                <Text>Balance:- {balance} </Text>
                <Text>Associated Bank:- {associated_bank} {"\n"}</Text>
            </Card>


            <Button style={styles.button} title='Make Payment' color='maroon' onPress={handlePayment}></Button>
            <Text style={styles.titleText}>Transaction History a</Text>
            <Card>
                <Card.Title>Transaction1</Card.Title>
            </Card>
        </View>
    );
}


const styles = StyleSheet.create({
    modalToggle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
    },
    modalContent: {
        flex: 1,
    },
    container: {
        marginTop: '60%'
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        // paddingBottom: '10%',
        paddingTop: '10%'
    },
    button: {
        paddingTop: '10%'
    },
    card: {
        paddingBottom: '10%'
    }
});