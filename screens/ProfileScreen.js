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
import photoProfile from "../assets/photoProfile.jpg"
import photoBack from "../assets/photoBack.jpg"


import Event from './components/event';

//Modal
import {setOpenModal} from "../reducers/openModal"
import Modale from './components/Modale';
import {login,logout} from "../reducers/user"

import { useDispatch, useSelector } from 'react-redux';
import { setEvent } from '../reducers/event';
import { adress } from "../adress";


export default function ProfileScreen(props) {
// todo Gerer AMIS/MESSAGERIE/FAVORIS/PARAMETRE
    
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user.value); 


 const [futurEvents, setFuturEvents] = useState([]);


useEffect(() => {
  if (user) {
    console.log("useEffect parti1");
    fetch(`http://${adress}/user/mesEvents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idUser: user._id }),
    })
    .then(response => response.json())
    .then(data => {
        //todo caler une condition
      const eventsFutur = data.map((data, index) => (
        <Pressable onPress={() => handlePress(data)} key={`futur-${index}`}>
          <Event data={data} />
        </Pressable>
      ));

      setFuturEvents(eventsFutur);
    });
  } else {
    console.log("useEffect parti2");
    dispatch(setOpenModal(true));
  }
}, [user]);


        

//! Function _____________________________________________________________________________________________________________________________


 
    const isModalOpen = useSelector((state)=>state.openModal.value)
    //! code pour les autres screen

    const handlePress = (data)=>{
        if(user===null){
            dispatch(setOpenModal(!isModalOpen))
        }else{
            props.navigation.navigate('Event', { screen: 'EventScreen' });
            dispatch(setEvent(data))
        } 
    }

    const handleMesAmis = ()=>{
        props.navigation.navigate('Amis', { screen: 'AmisScreen' });
    }


    


// ! Return ___________________________________________________________________________________________________________________________
    
    return (
        user?(<View style={styles.container}>
            

           
             <View style={styles.viewPhotoBack}>
                 <Image source={photoBack} style={styles.photoBack} size={100} />
                 <Image source={photoProfile} style={styles.photoProfile} size={100} />
             </View>


 
           
             <View style={styles.viewParam}>
                
                 <FontAwesome name="gears" size={30} color={"#161519"} />
            </View>
            
             <View style={styles.viewName}>
                 <Text>{user.username}</Text>
             </View>
            

          
             <View style={styles.viewIcon}>

    
                 <TouchableOpacity onPress={()=>dispatch(logout())}><Text>LOGOUT</Text></TouchableOpacity>

  
                 <TouchableOpacity style={styles.icon} onPress={()=>handleMesAmis()}>
                    <FontAwesome name="users" size={30} color={"#1e064e"} />
                    <Text style={styles.textIcon}>Mes amis</Text>
                </TouchableOpacity>
              
          
                 <View style={styles.icon}>
                     <FontAwesome name="rocket" size={30} color={"#161519"} />
                     <Text style={styles.textIcon}>Messagerie</Text>
                 </View>
                
                 <View style={styles.icon}>
                     <FontAwesome name="heart" size={25}  color={"#161519"}/>
                     <Text style={styles.textIcon}>Mes Favoris</Text>
                 </View>
    
         </View>
            
            <ScrollView style={styles.events}>

                 <View style={styles.futurEvents}>
                     <Text style={styles.text}> ____________________ Events ______________________</Text>
                    {futurEvents}
                </View>
             </ScrollView> 
            

            
            
        </View>):(<View><Modale></Modale></View>)
    );
}



//! Style __________________________________________________________________________________________________________________________


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f2f2f2",
    
    },
    photoBack:{
        width:"100%",
        height:200
    },
    photoProfile:{
        alignSelf:"center",
        width:100,
        height:100,
        borderRadius:50,
        position:"absolute",
        top:145

    },
    viewName:{
        alignSelf:"center",
        marginTop:15
    },
    viewParam:{
        alignSelf:"flex-end",
        margin:5
    },
    viewIcon: {
        flexDirection:"row",
        justifyContent:"space-around",
        marginBottom:15,
        marginTop:20
    },
    icon : {
        alignItems:"center",
        justifyContent:"center"
    },
    textIcon : {
        color:"#161519"
    },
    // ! EVENTS

    events:{
        width:"100%",
        height:"auto",
        backgroundColor:"#161519",
        padding:10
    },
    event:{
        backgroundColor:"blue",
        height:50,
        borderRadius:20,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        margin:10
    },
    text:{
        color:"white",
        fontWeight:"bold"
    }

})