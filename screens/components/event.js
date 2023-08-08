import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import format from 'date-fns/format';

export default function Event(props) {
    
    let membreInterrested= props.data.users.interUsers.length;
    
   
    // if pour les color si cest past or futur 
    let now = new Date();
    let date = new Date(props.data.date)
    let color = "black";
    if(date<now){
        color="#d9d9d9";
    }



    // todo faire un switch pour les color des events




    return (
        <View>
        
        <View style={styles.separatorLine}></View>
            <View style={{...styles.event }}> 


                
                <View >

                    <Text style={styles.text}>{props.data.eventName}</Text>
                    <Text style={styles.text}>{props.data.address}</Text>
                    <Text style={styles.text}>{format(new Date(props.data.hourStart), "HH'h'mm")} {format(new Date(props.data.hourEnd), "HH'h'mm")}</Text>
                    <Text style={styles.text}> {membreInterrested} intéressé(s)</Text>
                </View>

                
               
            </View>

         
           
        </View>
    );
    }    


const styles = StyleSheet.create({


  
    // ! EVENTS


    event:{
    
        height:'auto',
    
        flexDirection:"row",
        alignItems:"center",
 
        marginTop: 10,
        marginBottom:10,

        
    },
    text:{
        color:"white",

    },

    separatorLine: {
    
        borderBottomWidth: 1,
        borderBottomColor: 'white',
     
    }

})