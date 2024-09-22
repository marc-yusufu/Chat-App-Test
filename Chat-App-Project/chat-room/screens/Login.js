import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react'

import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Signup from './Signup';

const Login = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () =>{
        if (email !== '' && password !== ''){
            signInWithEmailAndPassword(auth, email, password)
            .then(() => console.log('Login worked'))
            .catch((err) => Alert.alert('Login Error', err.message));
        }
    };

  return (
    <SafeAreaView style={styles.flexContainer}>
    <StatusBar translucent={false} backgroundColor='#ffffff'/>

    <View style={styles.container}>

        <Text style={styles.title}>Log In</Text>

        <TextInput 
        placeholder='Email'
        placeholderTextColor="#aaa"
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
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

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
            <Text style={{fontSize: 17}}>Don't have an account? <Text style={styles.signUpText} onPress={() => navigation.navigate('Sign Up')}>Sign up</Text></Text>
        </View>

    </View>    


    </SafeAreaView>
  )
}

export default Login

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
    }
})