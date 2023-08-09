import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import photoEvent from '../assets/event.jpg'
import { useSelector,useDispatch } from 'react-redux';
import { resetEvent } from '../reducers/event';
import {setOpenModal} from "../reducers/openModal";
import { format } from 'date-fns'
import formatDateToFrenchLocale from './components/formatageList';


import {addParticipant,removeParticipant,addInter,removeInter} from '../reducers/user';
import { adress } from "../adress";

export default function EventScreen({ navigation: { goBack } }) {

//todo ajouter les bonnes images de fond
// todo a verifier si les dispatch de user marche lorquon met en place le backEnds et les logins



//! Constant __________________________________________________________________________________________________________________________

const isModalOpen = useSelector((state)=>state.openModal.value)

const [isParticiped,setIsParticiped]=useState(false); // todo Verifier si le user se trouve dans les particpant si oui mettre deja en true
const [isInterrested,setIsInterrested]=useState(false); // todo Verifier si le user se trouve dans les interresé si oui mettre deja en true
const [isAddingFriend, setIsAddingFriend] = useState(false);
const dispatch=useDispatch();

const dataEvent = useSelector((state) => state.event.value);

const date = dataEvent.date.slice(0,10)
// const date = "bite!"

const user = useSelector((state) => state.user.value); 

// On verifie si le user participe deja oui ou non a l'event
    useEffect(() => {
    
    if(user.events.interEvents.includes(dataEvent._id)){
        setIsInterrested(true)
    }
    if(user.events.partEvents.includes(dataEvent._id)){
        setIsParticiped(true)
    }
    }, []);






//! Function_________________________________________________________________________________________________________________________________

    const handleQuit = ()=>{
        dispatch(resetEvent())
        goBack();
    }


    const handleParticipate = ()=>{
        setIsParticiped(!isParticiped)
        if(!isParticiped){
            dispatch(removeParticipant(dataEvent.id));
            fetch(`http://${adress}/user/participated`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idUser:user._id, idEvent:dataEvent._id }),
                }).then(response => response.json()).then(data => {
                    console.log("add participant ");
                })
        }else{
            dispatch(addParticipant(dataEvent.id))
            fetch(`http://${adress}/user/notParticipated`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idUser:user._id, idEvent:dataEvent._id }),
                }).then(response => response.json()).then(data => {
                    console.log("delete participant ");
                })
        }
        
    }


    const handleInterrested = ()=>{
        setIsInterrested(!isInterrested)
        if(!isInterrested){
            dispatch(removeInter(dataEvent.id));
            fetch(`http://${adress}/user/interested`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idUser:user._id, idEvent:dataEvent._id }),
                }).then(response => response.json()).then(data => {
                    console.log("add intérresent ");
                })
        }else{
            dispatch(addInter(dataEvent.id))
            fetch(`http://${adress}/user/notInterested`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idUser:user._id, idEvent:dataEvent._id }),
                }).then(response => response.json()).then(data => {
                    console.log("delete intérresent ");
                })
        }
    }

    const handleAjouterUnAmi = () =>{
        console.log('user._id :>> ', user._id);
        console.log('dataEvent._id :>> ', dataEvent._id);
        setIsAddingFriend(true);
        fetch(`http://${adress}/messagerie/ajouterUnAmi`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idUser:user._id, idEvent:dataEvent._id }),
                }).then(response => response.json()).then(data => {
                    console.log("post add un ami",data);
                })
    }




// ! Return_____________________________________________________________________________________________________________________________________

    return (
        <View style={styles.container}>



            <View style={styles.viewIcon}>
            <FontAwesome name="user" size={30} color={"#1e064e"} /> 
                <Pressable onPress={()=>handleQuit()}><FontAwesome name="times" size={30} color={"#1e064e"} /></Pressable> 
            </View>
            

            <Image source={photoEvent} style={styles.photoEvent} />

            <View style={styles.viewText}>
                
                <View>
                        <Text style={styles.textajoutButton}>{dataEvent.creator}</Text>
                        <TouchableOpacity disabled={isAddingFriend} onPress={()=>handleAjouterUnAmi()} style={styles.ajoutButton}>
                            <Text style={styles.text}>Ajouter le creator comme ami</Text>
                        </TouchableOpacity>
                     </View>   

                        
                

                <Text style={styles.site}>{dataEvent.website}</Text> 
                <Text style={styles.type}>{dataEvent.type}</Text>
                <Text style={styles.date}>{formatDateToFrenchLocale(date)}</Text>
                <Text style={styles.horraire}>{format(new Date (dataEvent.hourStart), "HH'h'mm")}-{format(new Date (dataEvent.hourEnd), "HH'h'mm")}</Text>
                <Text style={styles.adresse}>{dataEvent.address}</Text>
                <Text style={styles.prix}>Entrée : {dataEvent.price}$</Text>
            </View>

            <View style={styles.viewButton}>
                <Pressable style={{ ...styles.button,backgroundColor: isParticiped ? 'white' : '#1e064e'}} onPress={()=>handleParticipate()}>
                    <Text style={{color: isParticiped ?  '#1e064e': 'white',fontWeight:"bold",fontSize:20}}>Je participe</Text>
                </Pressable>
                
                <Pressable style={{ ...styles.button,backgroundColor: isInterrested ? 'white' : '#1e064e'}} onPress={()=>handleInterrested()}>
                    <Text style={{color: isInterrested ?  '#1e064e': 'white',fontWeight:"bold",fontSize:20}}>Interressé</Text>
                </Pressable>
            </View>
            
        </View>
    );
}



//! Style ___________________________________________________________________________________________________________________________________
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f2f2f2",
    },
    photoEvent:{
        width:"100%",
        height:250
    },
    viewIcon:{
        flexDirection:"row",
        justifyContent:"space-between",
        margin:20
    },
    viewText:{
        margin:10,
        alignItems:"center"
    },
    name:{
        fontWeight:"bold",
        fontSize:40,
        margin:5,
        },
    site : {
        fontWeight:"bold",
        color:"#b77fff",
        margin:5,
    },
    type:{
        fontWeight:"bold",
        fontSize:20,
        margin:5,
    },
    date:{
        fontWeight:"bold",
        fontSize:20,
        margin:5,
    },
    adresse:{
        fontWeight:"bold",
        fontSize:20,
        margin:5
    },
    prix:{
        fontWeight:"bold",
        fontSize:20,
        margin:5,
    },
    horraire:{
        fontWeight:"bold",
        fontSize:20,
        margin:5,
    },
    viewButton:{
        flexDirection:"row",
        alignItems:"center",
        alignContent:"center",
        justifyContent:'center'
    },
    button : {
        textAlign:"center",
        alignContent:"center",
        justifyContent:"center",
        width:130,
        height:40,
        
        margin:10,
        borderRadius:10
    },
    ajoutButton:{
        backgroundColor:"pink",
        padding:15,
        borderRadius:10,
    },
    text:{
        color:"white",
        fontWeight:"bold"
    },
})