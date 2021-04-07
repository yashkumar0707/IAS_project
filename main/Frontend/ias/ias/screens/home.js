import React, { useState, useEffect, Component } from 'react';
import axios from 'axios'
import { StyleSheet, View, Text, Image, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, FlatList, Modal } from 'react-native';
import { globalStyles } from '../styles/global';
// import { useIsFocused } from "@react-navigation/native";
import { Card } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import NetInfo from "@react-native-community/netinfo";
import { Cache } from "react-native-cache";
import AsyncStorage from '@react-native-community/async-storage';
import io from "socket.io-client"

export default class Home extends Component {

    state = {
        //     const[trans, setTrans] = useState([])
        // const[balance, setBalance] = useState(0)
        transaction: [],
        // const[associated_bank, setassociated_bank] = useState('')
        username: '',
        conn: '',
        balance: '',
        associated_bank: '',
        forceUpdateHandler: ''
    }
    // constructor() {
    //     super();
    //     this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    // };
    componentWillMount() {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            this.state.conn = state.isConnected
        });
        unsubscribe()
        this.setState({ username: this.props.navigation.state.params.username })
        this.props.navigation.addListener('didFocus', () => {
            console.log('comp will mount')
            if (this.state.conn) {
                this.fetchData()
            }
            else {
                this.getfromAsync()
            }
        }
        )


    }
    // forceUpdateHandler() {
    //     this.forceUpdate();
    // };
    fetchData = async () => {
        console.log(this.state.conn + 'checking new connextion')
        await axios.get('http://192.168.0.159:8080/customers/' + this.state.username).then(async (res) => {
            // console.log(res.data.data)
            // associated_bank = res.data.data.associated_bank
            // balance = res.data.data.balance
            // setBalance(res.data.data.balance)
            // setassociated_bank(res.data.data.associated_bank)
            this.setState({ balance: res.data.data.balance })
            this.setState({ associated_bank: res.data.data.associated_bank })
            await AsyncStorage.setItem("balance", this.state.balance + "");
            await AsyncStorage.setItem("bank", this.state.associated_bank);
            // console.log(balance, 'yash')
            // console.log('uiuiu')
            // navigation.navigate('Home', { userID: 'A1' })
        })
        // console.log(this.state.username + 'kokokok')
        await axios.get('http://192.168.0.159:8080/transactions/' + this.state.username).then(res => {
            console.log(res.data.data.length + ' transacxtion response')
            // for (i = 0; i < res.data.data.length; i++) {
            //     console.log(res.data.data[i])
            //     var add = []
            //     add.merchant_phone = res.data.data[i].merchant_phone
            //     add.username = res.data.data[i].username
            //     add.amount = res.data.data[i].amount
            //     add.key = i + 1 + ''
            //     console.log(add.merchant_phone)

            //     transaction.push(add)
            //     // console.log(trans[0].merchant_phone + 'yashhhshsh')
            //     // console.log('yaayayayaya')
            // }
            this.setState({ transaction: res.data.data })
            console.log(this.state.transaction)

        })


        try {
            let value = await AsyncStorage.getItem("trans");
            if (value !== null && this.state.conn) {
                // We have data!!
                const socket = io("http://192.168.0.159:3001")
                // values.username = 'Yash'
                //console.log('uash')
                value = await JSON.parse(value)
                socket.emit('chat message', value)
                socket.on("message", async data => {
                    if (data == "successful") {
                        // navigation.navigate('Home')
                        // console.log('here')
                        value = await AsyncStorage.removeItem("trans");
                        value = await AsyncStorage.getItem("trans");
                        await AsyncStorage.setItem("trans_status", '0');
                        console.log(value + "checing delete")
                        await socket.close()
                        setTimeout(() => {
                            this.fetchData()
                        }, 1500)
                        // this.forceUpdate()
                        // await axios.get('http://192.168.0.159:8080/customers/' + this.state.username).then(async (res) => {

                        //     this.setState({ balance: res.data.data.balance })
                        //     this.setState({ associated_bank: res.data.data.associated_bank })
                        //     await AsyncStorage.setItem("balance", this.state.balance + "");
                        //     await AsyncStorage.setItem("bank", this.state.associated_bank);
                        //     console.log('from upadte' + this.state.balance)

                        // })
                        // // console.log(this.state.username + 'kokokok')
                        // await axios.get('http://192.168.0.159:8080/transactions/' + this.state.username).then(res => {
                        //     console.log(res.data.data.length + ' transacxtion response')

                        //     this.setState({ transaction: res.data.data })
                        //     console.log('from upadte' + this.state.transaction)

                        // })
                        // this.props.navigation.navigate('Home')
                    }
                })
                console.log(value);

                // navigation.navigate('Home')
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    getfromAsync = async () => {
        let bal = await AsyncStorage.getItem("balance");
        let bank = await AsyncStorage.getItem("bank")
        this.setState({ balance: bal })
        this.setState({ associated_bank: bank })
    }
    render() {
        console.log(this.props.navigation.state.params.username)
        let conn = ''

        let sendinfo = []
        sendinfo.conn = this.state.conn
        sendinfo.username = this.state.username
        // unsubscribe()
        // const cache = new Cache({
        //     namespace: "myapp",
        //     policy: {
        //         maxEntries: 50000
        //     },
        //     backend: AsyncStorage
        // });
        const handlePayment = async () => {
            try {
                await AsyncStorage.setItem("username", "Olan");
                await AsyncStorage.setItem("password", "olan");
            }
            catch (err) {
                console.log(err)
            }
            // const value = await cache.get("key1");
            // console.log(value + 'yashh');
            // 'hello'

            // try {
            //     const value = await AsyncStorage.getItem("hello");
            //     if (value !== null) {
            //         // We have data!!
            //         console.log(value);
            //     }
            // } catch (error) {
            //     // Error retrieving data
            // }
            // try {
            //     const value = await AsyncStorage.getItem("trans");
            //     if (value !== null) {
            //         // We have data!!
            //         console.log(value);
            //         navigation.navigate('Home')
            //     }
            // } catch (error) {
            //     // Error retrieving data
            // }

            // console.log()
            this.props.navigation.navigate('Payment', { sendinfo: sendinfo })
        }
        return (
            <View style={globalStyles.container} >
                <Card style={styles.card}>
                    <Card.Title>{this.state.username}</Card.Title>
                    <Text>Balance:- {this.state.balance} </Text>
                    <Text>Associated Bank:- {this.state.associated_bank} {"\n"}</Text>
                </Card>


                <Button style={styles.button} title='Make Payment' color='maroon' onPress={handlePayment}></Button>
                <Text style={styles.titleText}>Transaction History a</Text>
                {/* <Card>
                <Card.Title>{trans[0].merchant_phone}</Card.Title>
            </Card> */}
                {!this.state.conn &&
                    <Card>
                        <Text style={styles.transText}>Transaction history available only in online mode.</Text>
                    </Card>}
                <FlatList data={this.state.transaction} renderItem={({ item }) => (
                    // <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', item)}>
                    <Card>

                        {/* <Text style={globalStyles.titleText}>{item.username}</Text> */}
                        {/* <CallMadeIcon></CallMadeIcon> */}
                        {this.state.username == item.username &&
                            <View style={styles.parent}>
                                <Image style={styles.tinyLogo} source={require('../assets/red.jpg')}></Image>
                                <Text style={styles.transText}>{item.merchant_username}</Text>
                                <Text style={styles.transText}>{item.amount}</Text>
                            </View>
                        }
                        {this.state.username != item.username &&
                            <View style={styles.parent}>
                                < Image style={styles.tinyLogo} source={require('../assets/green.jpg')}></Image>

                                <Text style={styles.transText}>{item.username}</Text>
                                <Text style={styles.transText}>{item.amount}</Text>
                            </View>
                        }



                    </Card>
                    // </TouchableOpacity>
                )
                } />
            </View >)
    }
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
    },
    tinyLogo: {
        width: 65,
        height: 50,
        // alignItems: 'left'
    },
    parent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    transText: {
        fontSize: 16,
        // fontWeight: 'bold',
        // color: '#333',
        // alignItems: 'center',
        // justifyContent: 'center',
        // alignSelf: 'center',
        // // paddingBottom: '10%',
        paddingTop: '5%'
    }
});





// const ReviewSchema = yup.object({
//     title: yup.string().required().min(4),
//     body: yup.string().required().min(8),
//     rating: yup.string().required().test('is-num-1-5', 'Rating must be a number from 1-5', (val) => {
//         return parseInt(val) < 6 && parseInt(val) > 0;
//     })
// })
// componentDidMount(){

// }


// export default function Home({ navigation }) {
//     // const isFocused = useIsFocused();
//     //const [modalOpen, setModalOpen] = useState(false);
//     const [reviews, setReviews] = useState([
//         { title: 'Zelda, Breath of Fresh Air', rating: 5, body: 'lorem ipsum', key: '1' },
//         { title: 'Gotta Catch Them All (again)', rating: 4, body: 'lorem ipsum', key: '2' },
//         { title: 'Not So "Final" Fantasy', rating: 3, body: 'lorem ipsum', key: '3' },
//     ]);
//     const [trans, setTrans] = useState([])
//     const [balance, setBalance] = useState(0)
//     var transaction = []
//     const [associated_bank, setassociated_bank] = useState('')
//     let username = ''
//     let conn = ''
//     const unsubscribe = NetInfo.addEventListener(state => {
//         console.log("Connection type", state.type);
//         console.log("Is connected?", state.isConnected);
//         conn = state.isConnected
//     });
//     username = navigation.getParam('username')
//     let sendinfo = []
//     sendinfo.username = username
//     sendinfo.conn = conn
//     const handlePayment = () => {
//         navigation.navigate('Payment', { sendinfo: sendinfo })
//     }

//     console.log(navigation.getParam('username'), 'usernmae check')

//     const transget = (async () => {


//     })
//     transget()
//     // let balance
//     // let associated_bank

//     useEffect(() => {
//         const aunsubscribe = navigation.addListener('didFocus', () => {
//             console.log('Refreshed!');
//             console.log('bbahbahbahbahbahbhbh')
//             username = navigation.getParam('username')
//             axios.get('http://192.168.0.159:8080/customers/' + username).then(res => {
//                 // console.log(res.data.data)
//                 // associated_bank = res.data.data.associated_bank
//                 // balance = res.data.data.balance
//                 setBalance(res.data.data.balance)
//                 setassociated_bank(res.data.data.associated_bank)
//                 // console.log(balance, 'yash')
//                 // console.log('uiuiu')
//                 // navigation.navigate('Home', { userID: 'A1' })
//             })
//             axios.get('http://192.168.0.159:8080/transactions/' + username).then(res => {
//                 console.log(res.data.data.length)
//                 for (i = 0; i < res.data.data.length; i++) {
//                     console.log(res.data.data[i])
//                     var add = []
//                     add.merchant_phone = res.data.data[i].merchant_phone
//                     add.username = res.data.data[i].username
//                     add.amount = res.data.data[i].amount
//                     add.key = i + 1 + ''
//                     console.log(add.merchant_phone)
//                     setTrans([...trans, add])
//                     transaction.push(add)
//                     // console.log(trans[0].merchant_phone + 'yashhhshsh')
//                     // console.log('yaayayayaya')
//                 }
//                 console.log(transaction[3].amount)
//             })

//             console.log(trans[4])
//         });

//     }, [navigation])
//     // Subscribe


//     // Unsubscribe
//     unsubscribe();
//     // this.getvalue()
//     console.log(balance, 'yash')
//     return (
//         <View style={globalStyles.container}>
//             <Card style={styles.card}>
//                 <Card.Title>{username}</Card.Title>
//                 <Text>Balance:- {balance} </Text>
//                 <Text>Associated Bank:- {associated_bank} {"\n"}</Text>
//             </Card>


//             <Button style={styles.button} title='Make Payment' color='maroon' onPress={handlePayment}></Button>
//             <Text style={styles.titleText}>Transaction History a</Text>
//             {/* <Card>
//                 <Card.Title>{trans[0].merchant_phone}</Card.Title>
//             </Card> */}

//             <FlatList data={trans} renderItem={({ item }) => (
//                 // <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', item)}>
//                 <Card>
//                     {/* <Text style={globalStyles.titleText}>{item.username}</Text> */}
//                     <Text style={globalStyles.titleText}>{item.amount}</Text>
//                 </Card>
//                 // </TouchableOpacity>
//             )} />
//         </View>
//     );
// }