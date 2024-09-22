import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react'

import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const Signup = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = () =>{
        if (email !== '' && password !== ''){
            createUserWithEmailAndPassword(auth, email, password)
            .then(() => console.log('Sign up worked'))
            .catch((err) => Alert.alert('Sign up Error', err.message))
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

  return (
    <SafeAreaView style={styles.flexContainer}>
    <StatusBar translucent={false} backgroundColor='#ffffff'/>

    <View style={styles.container}>

        <Text style={styles.title}>Sign Up</Text>

        <TextInput 
        placeholder='Email'
        placeholderTextColor="#aaa"
        autoCapitalize='none'
        textContentType='emailAddress'
        keyboardType='email-address'
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.inputs}/>

        <TextInput 
        placeholder='Password'
        placeholderTextColor="#aaa"
        textContentType='password'
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.inputs}/>

        <MaterialCommunityIcons
        name={showPassword ? 'eye-off' : 'eye'}
        size={24}
        color="#aaa"
        style={styles.icon}
        onPress={toggleShowPassword}
        />

        <TouchableOpacity style={styles.btn} onPress={handleSignup}>
            <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
            <Text style={{fontSize: 17}}>Already have an account? <Text style={styles.signUpText} onPress={() => navigation.navigate('Log In')}>Log in</Text></Text>
        </View>

    </View>    


    </SafeAreaView>
  )
}

export default Signup

const styles = StyleSheet.create({

    flexContainer:{
        flex: 1,
        backgroundColor: '#ffffff'
    },

    container:{
        margin: 'auto',
        marginVertical: 110,
        width: '90%',
        alignItems: 'center',
    },

    title:{
        fontSize: 30,
        fontWeight: '900',
        margin: 30,
    },

    inputs:{
        backgroundColor: '#eeeeee',
        width: '90%',
        margin: 10,
        padding: 15,
        borderRadius: 15,
    },

    btn:{
        width: '90%',
        backgroundColor: '#ff8200',
        alignItems: 'center',
        padding: 15,
        marginTop: 50,
        borderRadius: 15,
    },

    btnText:{
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    footer:{
        marginTop: 10,
    },

    signUpText:{
        fontWeight: 'bold',
        color: '#ff8200',
        textDecorationLine: 'underline',
    },

})