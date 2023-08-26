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
import {login,logout} from "../reducers/user"

import { useDispatch, useSelector } from 'react-redux';
import { setEvent } from '../reducers/event';
import photoProfile from "../assets/photoProfile.jpg"

import io from 'socket.io-client';

// export default function MessageScreen(props) {
    
    
    
// //! Constante
//     const [addMessage,setAddMessage]=useState("");
//     const [messageDisplay,setMessageDisplay]=useState([])

//     const [room,setRoom]=useState("")
    
//     const conversation = useSelector((state)=>state.conversation.value);
//     const socket = io('ws://172.20.10.11:3000');

// //! UseEffect
//     useEffect(() => {
        
        
//         socket.on('connect', () => {
//             console.log('Connecté au serveur Socket.io');
            
//         });
//         fetch('http://172.20.10.11:3000/messagerie/conversation', {  
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({idUser:conversation.idUser,idAmi:conversation.idAmi}),
//         })
//         .then(response => response.json())
//         .then(data => {

//             setRoom(data.id);
//             const room = data.id;
//             socket.emit("joinRoom", room);

//             if(data.messages!==null){
//                 const lastmessages = data.messages.map((data,index)=>{
//                     if(data.idSenter===conversation.idUser){
//                         return (
//                             <View key={index} style={{backgroundColor:"blue"}}><Text>{data.message}</Text></View>
//                         )
//                     }else{
//                         return (
//                             <View key={index} style={{backgroundColor:"red"}}><Text>{data.message}</Text></View>
//                         )
//                     }
//                 })
//                 setMessageDisplay([...messageDisplay,lastmessages])
                
//             }
            
//         })
        
        

//         return () => {
//             // Nettoyage : déconnectez le socket lorsque le composant est démonté
//             socket.disconnect();
//         };
//     }, []);



// // ! Function   
//     const handleBack = ()=>{
//         //! quitter les rooms
//         socket.emit("leaveRoom", room);
//         props.navigation.goBack()
//     }

    


//     const handleSendAMessage = ()=>{
    
//         //!on envoie dans le back 
//         if(addMessage){
//             console.log("sent");
//             fetch('http://172.20.10.11:3000/messagerie/addMessage', {  
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({idConv:room,message : {idSenter:conversation.idUser,message:addMessage}}),
//             })
//             .then(response => response.json())
//             .then(data => {
//                 console.log('result add  :>> ',data );
//                 socket.emit("messageSentToBack",addMessage,room);
//             })
//         }
//     }
    


//     //! on recupere dans le frontend et on affiche
    
//     socket.on("messageReceivedToFront",(data)=>{
//         console.log("messageReceivedToFront",data);
//         //todo condition pour verifier qui a envoyer le message
//         const newMessage = <View><Text>{data}</Text></View>;
//         // setMessageDisplay([...messageDisplay,newMessage])
//         setMessageDisplay(prevMessages => [...prevMessages, newMessage]);
//         console.log("message Display",messageDisplay);
        

//     })





// //! Return
//     return(
//         <View style={styles.container}>

//             <TouchableOpacity onPress={()=>handleBack()} style={styles.goBack}>
//                 <Text>RETOUR mes Amis</Text>
//             </TouchableOpacity>

//             <Text>Discussion avec JOJO</Text>
//             <View style={{backgroundColor:"blue",margin:10}}>
//             {messageDisplay.length > 0 ? (
//                 messageDisplay
//             ) : (
//                 <Text>Vous n'avez pas de message</Text>
//             )}
//             </View>
//             <TextInput placeholder="Enter Your Message" onChangeText={(value) => setAddMessage(value)} value={addMessage} style={styles.input} />
//             <TouchableOpacity style={styles.sendAMessage} onPress={()=>handleSendAMessage()}><Text>Envoyer un message</Text></TouchableOpacity>
//         </View>
//     )
// }


// //! Style
// const styles = StyleSheet.create({
//     container: {
//       flexGrow: 1,
//       backgroundColor: '#F9F9F9',
//       paddingHorizontal: 16,
//       paddingTop: Platform.OS === 'ios' ? 40 : 20,
//       alignItems: "center",
//       justifyContent: "center"
//     },
//     goBack: {
//       alignSelf: "flex-start",
//       margin: 20
//     },
//     messageContainer: {
//       backgroundColor: "blue",
//       margin: 10,
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center'
//     },
//     friendMessage: {
//       backgroundColor: "red",
//       marginVertical: 5,
//       padding: 10,
//       borderRadius: 10,
//       alignSelf: 'flex-start'
//     },
//     userMessage: {
//       backgroundColor: "blue",
//       marginVertical: 5,
//       padding: 10,
//       borderRadius: 10,
//       alignSelf: 'flex-end'
//     },
//     input: {
//       backgroundColor: "yellow",
//       height: 30,
//       width: 130,
//       margin: 10
//     },
//     sendAMessage: {
//       width: 150,
//       height: 30,
//       alignItems: 'center',
//       backgroundColor: '#ec6e5b',
//       borderRadius: 10,
//     }
//   });

// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import io from 'socket.io-client';
import { adress } from "../adress";

export default function MessageScreen(props) {
  const [addMessage, setAddMessage] = useState("");
  const [messageDisplay, setMessageDisplay] = useState([]);
  const [room, setRoom] = useState("");
  
  const conversation = useSelector((state) => state.conversation.value);
  const socket = io(`ws://${adress}`);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connecté au serveur Socket.io');
    });

    fetch(`http://${adress}/messagerie/conversation`, {  
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idUser: conversation.idUser, idAmi: conversation.idAmi }),
    })
    .then(response => response.json())
    .then(data => {
      setRoom(data.id);
      const room = data.id;
      socket.emit("joinRoom", room);
      console.log(data.messages);
      if (data.messages) {
        const lastMessages = data.messages.map((message, index) => (
          <View key={index} style={message.idSenter === conversation.idUser ? styles.userMessage: styles.friendMessage}>
            <Text  style={message.idSenter === conversation.idUser ? styles.textGoback: styles.textGoback2}>{message.message}</Text>
          </View>
        ));
        setMessageDisplay(lastMessages);
      }
    });

    return () => {
      socket.emit("leaveRoom", room);
      socket.disconnect();
    };
  }, []);

  const handleBack = () => {
    socket.emit("leaveRoom", room);
    props.navigation.goBack();
  }

  const handleSendAMessage = () => {
    
    if (addMessage) {
      let obj = { id: conversation.idUser, message: addMessage }
      console.log('obj.id :>> ', obj.id);
      socket.emit("messageSentToBack", obj, room);
      fetch(`http://${adress}/messagerie/addMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idConv: room, message: { idSenter: conversation.idUser, message: addMessage } }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAddMessage("");
      });
    }
  }
  //
  socket.on("messageReceivedToFront", (data) => {
    const newMessage = (
      <View key={messageDisplay.length} style={data.id===conversation.idUser?styles.userMessage:styles.friendMessage}>
        {/* <Text style={styles.textGoback}>{data.message}</Text> */}
        <Text  style={data.id === conversation.idUser ? styles.textGoback: styles.textGoback2}>{data.message}</Text>
      </View>
    );
    setMessageDisplay(prevMessages => [...prevMessages, newMessage]);
  });
//
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
       <TouchableOpacity onPress={()=>handleBack()} style={styles.goBack}>
            <FontAwesome name="arrow-left" size={20} color={"white"} />
                <Text style={styles.textGoback}>Amis</Text>
            </TouchableOpacity>
      
      <ScrollView style={styles.messageContainer}>
      {messageDisplay.length > 0 ? messageDisplay : <Text>Vous n'avez pas de message</Text>}
      </ScrollView> 
      <View style={styles.SentmessageContainer}>
        <TextInput
        placeholder="Enter Your Message"
        onChangeText={(value) => setAddMessage(value)}
        value={addMessage}
        style={styles.input}
      />
      <TouchableOpacity style={styles.sendAMessage} onPress={handleSendAMessage}>
        <Text style={styles.textGoback}>Envoyer</Text>
      </TouchableOpacity>
      </View>
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(255, 204, 204, 1)',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    alignItems: "center",
    justifyContent: "center"
  },
  goBack: {
    alignSelf: "flex-start",
    margin: 20
  },
  messageContainer: {
    backgroundColor: "rgba(255, 204, 204, 1)",
    margin: 10,
    flex: 1,
    width:"95%"
  },
  friendMessage: {
    backgroundColor: "white",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginLeft:4
  },
  userMessage: {
    backgroundColor: "black",
    marginVertical: 5,
    marginRight:4,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-end'
  },
  SentmessageContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    width:"95%",
    backgroundColor:"black",
    margin:10,
    borderRadius:10
  },
  input: {
    paddingLeft: 10,
    backgroundColor: "#e8e8e9",
    height: 30,
    width: 200,
    margin: 10,
    borderRadius:10
  },
  sendAMessage: {
    margin:10,
    width: 80,
    height: 30,
    alignItems: 'center',
    alignContent:"center",
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 204, 204, 1)',
    borderRadius: 10,
  },
  goBack:{
    justifyContent:"space-between",
    alignSelf:"flex-start",
    alignContent:"center",
    alignItems:"center",
    flexDirection:"row",
    margin:20,
    backgroundColor:"black",
    padding:10,
    borderRadius:20,
    
},
textGoback:{
    color:"white",
    fontWeight:"bold",
    
    flexDirection:'row',
},
textGoback2:{
  color:"black",
  fontWeight:"bold"
},
});
