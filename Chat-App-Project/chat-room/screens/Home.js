import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo, FontAwesome } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';
import WebView from 'react-native-webview';
import colors from './colors';


const Home = () => {

    const navigation = useNavigation();

    useEffect(()=>{
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name='search' size={24} style={{marginLeft: 10, margin: 10}} color={colors.grey}/>
            ),
            headerRight: () => (
                <Image 
                source={require('../assets/crying-cat.jpg')}
                style={{width: 40, height: 40, marginRight: 15}}/>
            ),
        });
    }, [navigation])
    
  return (
    <SafeAreaView style={styles.flexContainer}>
    <StatusBar translucent={false} backgroundColor='#ffffff'/>

    <View style={styles.videoContainer}>
      <WebView 
        source={{ uri: 'https://www.youtube.com/watch?v=Nqk_nWAjBus' }} 
        style={styles.video}
        javaScriptEnabled={true}
        allowsInlineMediaPlayback={true}
      />
    </View>

    <View style={styles.container}>

        <TouchableOpacity 
        onPress={() => navigation.navigate('Chat')}
        style={styles.chatBtn}>
            <Entypo name='chat' size={30} color={colors.lightGrey} style={{marginTop: 11}}/>
        </TouchableOpacity>

    </View>

    
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    flexContainer:{
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    chatBtn:{
        backgroundColor: colors.primary,
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: .9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 50,
    },

    videoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        width: '100%',
        height: 400,
      },
      video: {
        width: 320,
      },
})