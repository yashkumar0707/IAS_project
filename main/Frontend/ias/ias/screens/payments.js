import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, FlatList, Modal } from 'react-native';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import io from "socket.io-client"
// import { w3cwebsocket as W3CWebSocket } from "websocket";
const ReviewSchema = yup.object({
    amount: yup.string().required().min(1),
    number: yup.string().required().min(10),
    // rating: yup.string().required().test('is-num-1-5', 'Rating must be a number from 1-5', (val) => {
    //     return parseInt(val) < 6 && parseInt(val) > 0;
    // })
})
// const client = new W3CWebSocket('ws://192.168.0.159:3000');

export default function Payment({ navigation }) {

    const loginHandle = (values) => {
        const socket = io("http://192.168.0.159:3001")
        values.username = 'Yash'
        //console.log('uash')
        socket.emit('chat message', values)
        socket.on("message", data => {
            if (data == "successful") {
                navigation.navigate('Home')
                // console.log('here')
                socket.close()
            }
        });

        // navigation.navigate('Home', { userID: 'A1' })
        // client.onopen = () => {
        //     console.log('WebSocket Client Connected');
        // };
    }
    return (
        <View style={globalStyles.container}>
            <View style={styles.container}>
                <Formik initialValues={{ amount: '', number: '' }}
                    validationSchema={ReviewSchema}
                    onSubmit={(values) => {
                        //actions.resetForm()
                        loginHandle
                    }}>
                    {props => (
                        <View>
                            <Text style={styles.titleText}>Make Payment a</Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='Enter Amount'
                                onChangeText={props.handleChange('amount')}
                                value={props.values.amount}
                                keyboardType='numeric'
                            >
                            </TextInput>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='Recepient Mobile Number'
                                secureTextEntry={true}
                                onChangeText={props.handleChange('number')}
                                value={props.values.mobile}
                                keyboardType='numeric'
                            >
                            </TextInput>
                            <Button title='Send' color='maroon' onPress={() => loginHandle(props.values)}></Button>
                        </View>
                    )}
                </Formik>
            </View>
        </View >
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