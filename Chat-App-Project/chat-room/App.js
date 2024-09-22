import React, { useState, createContext, useContext, useEffect } from 'react';

import { View, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { onAuthStateChanged } from 'firebase/auth';

import Login from './screens/Login';
import Signup from './screens/Signup';
import Chat from './screens/Chat';
import Home from './screens/Home';
import { auth } from './firebase/firebaseConfig';

const Stack = createNativeStackNavigator();

const Auth_user_context = createContext({});

const Auth_user_provider = ({ children }) => {
  const [user, setUser] = useState(null);
  return(
    <Auth_user_context.Provider value={{user, setUser}}>
      {children}
    </Auth_user_context.Provider>
  )
}

function ChatStack () {
  return(
    <Stack.Navigator defaultScreenOption={Home}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Chat' component={Chat} />
    </Stack.Navigator>
  )
}

function AuthStack () {
  return(
    <Stack.Navigator defaultScreenOption={Login} screenOptions={{headerShown: false}}>
      <Stack.Screen name='Log In' component={Login} />
      <Stack.Screen name='Sign Up' component={Signup} />
    </Stack.Navigator>
  )
}

function RootNavigator () {
  const {user, setUser} = useContext(Auth_user_context);
  const [check, setCheck] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, 
      async auth_user => {auth_user ? setUser(auth_user) : setUser(null); 
        setCheck(false); 
      }
    );
    return () => unsubscribe();
  }, [user]);

  if(check) {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large'/>
      </View>
    )
  }

  return(
    <NavigationContainer>
      { user? <ChatStack /> : <AuthStack /> }
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <Auth_user_provider>
      <RootNavigator />
    </Auth_user_provider>
  );
}


