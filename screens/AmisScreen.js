import React, { useState,useEffect } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import photoProfil from "../assets/photoProfile.jpg"
import photoBack from "../assets/photoBack.jpg"


import Event from './components/event';

//Modal
import {setOpenModal} from "../reducers/openModal"
import Modale from './components/Modale';
import {login,logout} from "../reducers/user";

import { useDispatch, useSelector } from 'react-redux';
import { setEvent } from '../reducers/event';
import photoProfile from "../assets/photoProfile.jpg"
import { setConversation } from '../reducers/conversation';

const amis = [{username:"Jojo",photo:""},{username:"Ines",photo:""},{username:"Aaron",photo:""},{username:"MaxLeGrand",photo:""},
{username:"MaxLePetit",photo:""},{username:"Nicos",photo:""},{username:"Micky",photo:""}]

export default function AmisScreen(props) {
    const dispatch=useDispatch();

    const user = useSelector((state)=>state.user.value);

    const [amis, setAmis] = useState([]);
    const [loading, setLoading] = useState(true);

    const openARoom = (idAmi)=>{
        dispatch(setConversation({idUser:user._id,idAmi}))
        props.navigation.navigate('Message', { screen: 'MessageScreen' });
    }
   
    handleBack = ()=>{
        props.navigation.goBack()
    }

 

    useEffect(() => {
        console.log("fetch");
        fetch('http://172.20.10.11:3000/messagerie/amis', { //! a changer dans le back a push 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idUser: user._id }),
          })
          .then(response => response.json())
          .then(data => {
            
            const mesAmis = data.map((data, i) => (
                <View key={i} style={styles.friend}>
                    <Image source={photoProfil} style={styles.image} />
                    <Text>{data.username}</Text>
                    <TouchableOpacity style={styles.sendAMessage} onPress={() => openARoom(data)}><Text>Envoyer un message</Text></TouchableOpacity>
                </View>
            ));
            setAmis(mesAmis);
            setLoading(false);
          })
        
        }, []);

    

    return(
        <View style={styles.container}>

            <TouchableOpacity onPress={()=>handleBack()} style={styles.goBack}>
                <Text>RETOUR Profile</Text>
            </TouchableOpacity>

            <Text>Mes Amis</Text>
            <ScrollView style={styles.listFriend}>
                
            {loading ? <Text>Chargement...</Text> : (amis.length > 0 ? amis : <Text>Pas d'amis miskine</Text>)}
         
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#F9F9F9',
      paddingHorizontal: 16,
      paddingTop: Platform.OS === 'ios' ? 40 : 20,
       alignItems:"center",
        justifyContent:"center"
    },
    goBack:{
        justifyContent:"flex-start",
        alignSelf:"flex-start",
        margin:20
    },
    friend:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:'space-between',
        backgroundColor:"red",
        margin:10,
        width:"90%"
    },
    image:{
        width:50,
        height:50,
        borderRadius:30,
        
    },
    sendAMessage:{
        width: 150,
        height:30,
        alignItems: 'center',
        backgroundColor: '#ec6e5b',
        borderRadius: 10,
        
    }
})