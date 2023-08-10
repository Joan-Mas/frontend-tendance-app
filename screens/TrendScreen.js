import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import format from "date-fns/format";
import fr from "date-fns/locale";

//modale
import { setOpenModal } from "../reducers/openModal";
import Modale from "./components/Modale";
import formatDateToFrenchLocale from "./components/formatageList";
import { adress } from "../adress";
import { login, logout } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { setEvent } from "../reducers/event";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TrendScreen(props) {
  const [top, setTop] = useState("");

  //! on gere la modale connection en dessous_____________________________________________________________________
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const isModalOpen = useSelector((state) => state.openModal.value);

  const handlePress = (data) => {
    if (user === null) {
      dispatch(setOpenModal(!isModalOpen));
    } else {
      props.navigation.navigate("Event", { screen: "EventScreen" });
      dispatch(setEvent(data));
    }
  };
  //! on gere la modale connection au dessus_____________________________________________________________________

  //! on fetch les events (normalement fais des le depart)
  //! on modifie on gere le reducer par ordre
  const events = useSelector((state) => state.events.value);

  const foodImg = require("../assets/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg");
  const musicImg = require("../assets/marcela-laskoski-YrtFlrLo2DQ-unsplash.jpg");
  const natureImg = require("../assets/tim-swaan-eOpewngf68w-unsplash.jpg");
  const scienceImg = require("../assets/milad-fakurian-58Z17lnVS4U-unsplash.jpg");
  const artImg = require("../assets/sebastian-svenson-d2w-_1LJioQ-unsplash.jpg");
  const sportImg = require("../assets/august-phlieger-CREqtqgBFcU-unsplash.jpg");

  const getImageByType = (eventType) => {
    switch (eventType) {
      case 'Food':
        return foodImg;
      case 'Music':
        return musicImg;
      case 'Nature':
        return natureImg;
      case 'Science':
        return scienceImg;
      case 'Art':
        return artImg;
      case 'Sport':
        return sportImg;
    }
  };


  useEffect(() => {
    //! qui va trier les events 10 les plus cotés

    const sortedEvents = events.slice().sort(function (a, b) {
      console.log("a :", a.users.interUsers.length);
      console.log("b :", b.users.interUsers.length);
      return b.users.interUsers.length - a.users.interUsers.length;
    });

    // Garde les 10 premiers éléments triés
    const resultat = sortedEvents.slice(0, 10);
    // console.log("resultat",resultat);
    setTop(resultat);

    // Affiche la longueur de "partUsers" pour les 10 premiers éléments triés
    console.log("_______________________________");

    // sortedEvents.forEach(data => {
    //   console.log(data.users.partUsers.length);
    // });
  }, []);

  return (

    
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
      <Modale></Modale>
      <View>
          <Text style={styles.styleTop}>TENDANCE</Text>
        </View>
      {!top ? (
        <View>
          <Text>Nite</Text>
        </View>
      ) : (
        
        top.map((event, index) => (
          <View key={index}>
            
            <Text style={styles.styleTopTitle}>#{index+1}.</Text>
          <TouchableOpacity
            onPress={() => handlePress(event)}
            
            style={styles.eventBlock}
          >
            <Image
              
              source={{uri:event.eventCover}}
              style={styles.eventImage}
            />
            <View style={styles.containerTop}>
              <Text style={styles.eventName}>{event.eventName}</Text>
            </View>

            <View style={styles.eventView}>
              <Text style={styles.eventDate}>
                {formatDateToFrenchLocale(event.date.slice(0, 10))}{" "}
                {""}
              </Text>
              <Text>
                Entre {format(new Date(event.hourStart), "HH'h'mm")} et
                {" "}{format(new Date(event.hourEnd), "HH'h'mm")} 
              </Text>
              <Text style={styles.eventAddress}>
                Point de rdv : {event.address}</Text>
            </View>

            <Text style={styles.eventCreator}>
              Événement organisé par {event.creatorName.username}
            </Text>

            

            <View style={styles.partUsers}>
              <Text style={styles.eventCreator}>Interresé.e.s : {event.users.interUsers.length} </Text>
              {/* <Text style={styles.eventCreator}>Participant.e.s : {event.users.partUsers.length}</Text> */}
            </View>
          </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "rgba(255, 204, 204, 1)",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 40 : 20,
  },
  eventBlock: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventImage: {
    width: "100%",
    height: 200, // Ajustez la hauteur de l'image selon vos besoins
    resizeMode: "cover",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  eventName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  eventCreator: {
    fontSize: 14,
    color: "#666",
  },
  eventAddress: {
    fontSize: 14,
    color: "#333",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  interestedButton: {
    flex: 1,
    backgroundColor: "#E91E63",
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 5,
  },
  participateButton: {
    flex: 1,
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
  },
  partUsers: {
    flexDirection: "row",

  },
  eventView: {
  },

  containerTop: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },

  styleTopTitle: {
    // flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(22, 21, 25, 1)',
    marginBottom: 10,
  },
  styleTop: {
    flex: 1,
    
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(22, 21, 25, 1)',
    marginBottom: 30,
  },
});
