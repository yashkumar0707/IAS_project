import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, FlatList, Modal } from 'react-native';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
const ReviewSchema = yup.object({
    username: yup.string().required().min(4),
    password: yup.string().required().min(4),
    // rating: yup.string().required().test('is-num-1-5', 'Rating must be a number from 1-5', (val) => {
    //     return parseInt(val) < 6 && parseInt(val) > 0;
    // })
})

var conn = ''
const unsubscribe = NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    conn = state.isConnected
});
// let sendinfo = []
// sendinfo.conn = conn
// sendinfo.username = this.state.username
unsubscribe()
export default function Login({ navigation }) {
    console.disableYellowBox = true;
    const loginHandle = async (values) => {
        console.log(values)
        try {
            // let ans = await fetch('http://192.168.0.159:8080/customers/login/', {
            //     method: 'POST',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         username: 'Girish',
            //         password: 'yash123'
            //     })
            // })
            //     .then(
            //         console.log(ans),
            //         navigation.navigate('Home', { userID: 'A1' }
            //         )
            //     )
            // axios.get('http://192.168.0.159:8080/customers/').then(res => {
            //     console.log(res.data)
            //     // console.log('uiuiu')
            //     // navigation.navigate('Home', { userID: 'A1' })
            // })

            axios.post('http://192.168.0.159:8080/customers/login', { username: values.username, password: values.password }).then(res => {
                console.log(res.data)
                if (res.data.message == "Customer Found")
                    navigation.navigate('Home', { username: values.username, password: values.password })
                else
                    console.log('Inavlid Cred')
                // console.log('posrt')
            })
            // console.log(ans[0])

            // fetch('https://jsonplaceholder.typicode.com/todos/1')
            //     .then(response => response.json())
            //     .then(json => console.log(json))
        }
        catch (err) {
            console.log(err)
            // console.log('opopopop')
        }

        // console.log('yash')

    }

    const loginHandleOffline = async (values) => {
        console.log(values)
        try {
            // let ans = await fetch('http://192.168.0.159:8080/customers/login/', {
            //     method: 'POST',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         username: 'Girish',
            //         password: 'yash123'
            //     })
            // })
            //     .then(
            //         console.log(ans),
            //         navigation.navigate('Home', { userID: 'A1' }
            //         )
            //     )
            // axios.get('http://192.168.0.159:8080/customers/').then(res => {
            //     console.log(res.data)
            //     // console.log('uiuiu')
            //     // navigation.navigate('Home', { userID: 'A1' })
            // })
            let user = await AsyncStorage.getItem("username");
            let pass = await AsyncStorage.getItem("password");
            if (values.username == user && pass == values.password)
                navigation.navigate('Home', { username: values.username })
            else {
                console.log('not hgapp')
            }
            // axios.post('http://192.168.0.159:8080/customers/login', { username: values.username, password: values.password }).then(res => {
            //     console.log(res.data)
            //     navigation.navigate('Home', { username: values.username })
            //     // console.log('posrt')
            // })
            // console.log(ans[0])

            // fetch('https://jsonplaceholder.typicode.com/todos/1')
            //     .then(response => response.json())
            //     .then(json => console.log(json))
        }
        catch (err) {
            console.log(err)
            // console.log('opopopop')
        }

        // console.log('yash')

    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.container}>
                <Formik initialValues={{ username: '', password: '', rating: '' }}
                    validationSchema={ReviewSchema}
                    onSubmit={(values) => {
                        //actions.resetForm()
                        loginHandle(values)
                    }}>
                    {props => (
                        <View>
                            <Text style={styles.titleText}> </Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='Username'
                                onChangeText={props.handleChange('username')}
                                value={props.values.username}
                            >
                            </TextInput>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='Password'
                                secureTextEntry={true}
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                            >
                            </TextInput>
                            {conn == true &&
                                <Button title='Submit' color='maroon' onPress={() => loginHandle(props.values)}></Button>
                            }
                            {conn == false &&
                                <Button title='Submit' color='maroon' onPress={() => loginHandleOffline(props.values)}></Button>
                            }
                        </View>
                    )}
                </Formik>
            </View>
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
        paddingBottom: '10%'
    },
});