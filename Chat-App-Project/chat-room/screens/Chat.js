import { View, Text, TouchableOpacity } from 'react-native';
import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from './colors';

import { GiftedChat } from 'react-native-gifted-chat'

const Chat = () => {

  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const onSignOut = () =>{
    signOut(auth).catch(error => console.log(error));
  };

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 10}} onPress={onSignOut}>
          <AntDesign name = 'logout' size={24} color={colors.primary} style={{marginRight: 10}}/>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useLayoutEffect(()=>{
    const collectionRef = collection(database, 'chat_messages');
    const q = query(collectionRef, orderBy('createdAt, desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      console.log('snapshot');
      setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.id,
          createdAt: doc.data().createdAt,
          text: doc.data().text,
          user: doc.data().user
        }))
      )
    });
    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) =>{
    setMessages(prevousMessages => GiftedChat.append(prevousMessages, messages));

    const {_id, createdAt, text, user} = messages[0];
    addDoc(collection(database, 'chat_messages'), {
      _id,
      createdAt,
      text,
      user
    });
  }, []);

  return (
    <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{
      id: auth?.currentUser?.email,
      avatar: 'https://i.pravatar.cc/300'
    }}
    messagesContainerStyle={{backgroundColor: '#ffffff'}}
    />
  )
}

export default Chat