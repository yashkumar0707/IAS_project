import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, View, Image, Text, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, FlatList, Modal } from 'react-native';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import NetInfo from "@react-native-community/netinfo";

var conn = ''
// const unsubscribe = NetInfo.addEventListener(state => {
//     console.log("Connection type", state.type);
//     console.log("Is connected?", state.isConnected);
//     conn = state.isConnected
// });

// unsubscribe()
export default function Transaction({ navigation }) {
    let getinfo = navigation.getParam('sendinfo')
    console.disableYellowBox = true;
    const loginHandleOffline = async (values) => {
        console.log(values)
    }
    setTimeout(() => { navigation.navigate('Home') }, 5000)
    return (
        <View style={globalStyles.container}>
            <View style={styles.container}>
                <View>
                    {getinfo == "successful" && < Image style={styles.tinyLogo} source={require('../assets/success.png')}></Image>}
                    {getinfo == "unsuccessful" && < Image style={styles.tinyLogo} source={require('../assets/failed.png')}></Image>}
                    <Text style={styles.titleText}> Transaction {getinfo}! a</Text>
                    <Text style={styles.titleText}> You will be redirected to the Home Page a</Text>
                </View>
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
    tinyLogo: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        // alignItems: 'left'
    },
});