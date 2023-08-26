import React, { useEffect, useState } from "react";
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
  Modal,
  SafeAreaView,
  StatusBar,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import photoEvent from "../assets/event.jpg";
import { useSelector, useDispatch } from "react-redux";
import { resetEvent } from "../reducers/event";
import { setOpenModal } from "../reducers/openModal";
import { format } from "date-fns";
import formatDateToFrenchLocale from "./components/formatageList";

import {
  addParticipant,
  removeParticipant,
  addInter,
  removeInter,
} from "../reducers/user";
import { adress } from "../adress";

export default function EventScreen({ navigation: { goBack } }) {
  //todo ajouter les bonnes images de fond
  // todo a verifier si les dispatch de user marche lorquon met en place le backEnds et les logins

  //! Constant __________________________________________________________________________________________________________________________

  const isModalOpen = useSelector((state) => state.openModal.value);

  const [isParticiped, setIsParticiped] = useState(false); // todo Verifier si le user se trouve dans les particpant si oui mettre deja en true
  const [isInterrested, setIsInterrested] = useState(false); // todo Verifier si le user se trouve dans les interresé si oui mettre deja en true
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const dispatch = useDispatch();

  const dataEvent = useSelector((state) => state.event.value);

  const date = dataEvent.date.slice(0, 10);
  // const date = "bite!"

  const user = useSelector((state) => state.user.value);

  // On verifie si le user participe deja oui ou non a l'event
  useEffect(() => {
    if (user.events.interEvents.includes(dataEvent._id)) {
      setIsInterrested(true);
    }
    if (user.events.partEvents.includes(dataEvent._id)) {
      setIsParticiped(true);
    }
  }, []);

  //! Function_________________________________________________________________________________________________________________________________

  const handleQuit = () => {
    dispatch(resetEvent());
    goBack();
  };

  const handleParticipate = () => {
    setIsParticiped(!isParticiped);
    if (!isParticiped) {
      // todo dispatch(addParticipant(dataEvent.id));
      fetch(`http://${adress}/user/participated`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUser: user._id, idEvent: dataEvent._id }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("add participant ");
        });
    } else {
      // todo dispatch(addParticipant(dataEvent.id))
      fetch(`http://${adress}/user/notParticipated`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUser: user._id, idEvent: dataEvent._id }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("delete participant ");
        });
    }
  };

  const handleInterrested = () => {
    setIsInterrested(!isInterrested);
    if (!isInterrested) {
      fetch(`http://${adress}/user/interested`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUser: user._id, idEvent: dataEvent._id }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("add intérresent ");
        });
    } else {
      fetch(`http://${adress}/user/notInterested`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUser: user._id, idEvent: dataEvent._id }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("delete intérresent ");
        });
    }
  };

  const handleAjouterUnAmi = () => {
    console.log("user._id :>> ", user._id);
    console.log("dataEvent._id :>> ", dataEvent._id);
    setIsAddingFriend(true);
    fetch(`http://${adress}/messagerie/ajouterUnAmi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idUser: user._id, idEvent: dataEvent._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data);
        }
      });
  };

  // ! Return_____________________________________________________________________________________________________________________________________
  //console.log("dataEvent.eventCover :>> ", dataEvent.eventCover);
  console.log(dataEvent);
  let membreInterrested = dataEvent.users.interUsers.length;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content" // Change to "light-content" if you need white status bar content
        backgroundColor="white" // Set the background color of the status bar
      />
      <View>
        <View style={styles.viewIcon}>
          {/* <FontAwesome name="user" size={30} color={"#1e064e"} />  */}
          <TouchableOpacity onPress={() => handleQuit()}>
            <FontAwesome name="times" size={30} color={"white"} />
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: dataEvent.eventCover }}
          style={styles.photoEvent}
        />

        <View style={styles.viewText}>
          <View>
            <Text style={styles.name}>
              {dataEvent.eventName} par {dataEvent.creatorName.username}{' '}
              <FontAwesome name="circle-thin" size={15} color={"white"} /> {format(new Date(dataEvent.date),'dd/MM/yy')}
            </Text>
            <Text style={styles.date}></Text>
            <View>
              <Text style={styles.text}>
                <FontAwesome
                  style={styles.viewPar}
                  name="map-pin"
                  size={15}
                  color={"white"}
                />{"  "}
                {dataEvent.address}
              </Text>
              <View style={styles.row}>
                <Text style={styles.text}>
                  <FontAwesome
                    style={styles.viewPar}
                    name="clock-o"
                    size={15}
                    color={"white"}
                  />
                  {"  "} 
                  {format(new Date(dataEvent.hourStart), "HH'h'mm")} -{" "}
                  {format(new Date(dataEvent.hourEnd), "HH'h'mm")}{" "}
                </Text>
                <Text style={styles.text}>
                  <FontAwesome
                    style={styles.viewPar}
                    name="user"
                    size={15}
                    color={"white"}
                  />{"  "}
                  {membreInterrested} intéressés Entrée : {dataEvent.price}€
                </Text>
              </View>

              {/* <Text style={styles.site}>{dataEvent.website}</Text>
          <Text style={styles.type}>{dataEvent.type}</Text>
          <Text style={styles.date}>{formatDateToFrenchLocale(date)}</Text>
          <Text style={styles.horraire}>
            {format(new Date(dataEvent.hourStart), "HH'h'mm")}-
            {format(new Date(dataEvent.hourEnd), "HH'h'mm")}
          </Text>
          <Text style={styles.adresse}>{dataEvent.address}</Text>
          <Text style={styles.prix}>Entrée : {dataEvent.price}€</Text> */}

              <View style={styles.viewButton}>
                <Pressable
                  style={{
                    ...styles.button,
                    backgroundColor: isParticiped
                      ? "white"
                      : "rgba(255, 204, 204, 1)",
                  }}
                  onPress={() => handleParticipate()}
                >
                  <Text
                    style={{
                      color: isParticiped ? "rgba(255, 204, 204, 1)" : "white",
                      fontWeight: "bold",
                      fontSize: 18,
                      textAlign: "center",
                    }}
                  >
                    Je participe
                  </Text>
                </Pressable>

                <Pressable
                  style={{
                    ...styles.button,
                    backgroundColor: isInterrested
                      ? "white"
                      : "rgba(255, 204, 204, 1)",
                  }}
                  onPress={() => handleInterrested()}
                >
                  <Text
                    style={{
                      color: isInterrested ? "rgba(255, 204, 204, 1)" : "white",
                      fontWeight: "bold",
                      fontSize: 18,
                      textAlign: "center",
                    }}
                  >
                    Intéressé.e
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          width: 200,
          marginTop: 590,
          alignSelf: 'center',
        }}
      >
        <TouchableOpacity
          disabled={isAddingFriend}
          onPress={() => handleAjouterUnAmi()}
          style={styles.ajoutButton}
        >
          <Text style={styles.text}>
            Ajouter le créateur à la liste d'ami.e.s
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

//! Style ___________________________________________________________________________________________________________________________________
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161519",
    padding: 20,
  },
  photoEvent: {
    width: "100%",
    borderRadius: 5,
    height: 200,
  },
  viewIcon: {
    position: "absolute",
    zIndex: 1,
    right: 20,
    bottom: 420,
    marginBottom: 10,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: '#161519',
    borderWidth: 2,
    height: 35,
    width: 35,
    borderRadius: 40,
  },
  viewText: {
    backgroundColor: "#161519",
    paddingHorizontal: 30,
    borderWidth: 2,
    color: "rgba(255, 204, 204, 1)",
    borderRadius: 5,
    borderColor: "white",
    margin: 20,
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 20,
    paddingLeft: 10,
  },
  site: {
    color: "white",
    margin: 5,
  },
  type: {
    color: "white",

    margin: 5,
  },
  date: {
    color: "white",
    fontSize: 14,
    paddingLeft: 8,
    
  },
  adresse: {
    color: "white",

    margin: 5,
  },
  prix: {
    color: "white",

    margin: 5,
  },
  horraire: {
    color: "white",

    margin: 5,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    width: 120,
    height: 40,
    borderWidth: 2,
    borderRadius: 10,

    margin: 10,
    borderRadius: 10,
  },
  ajoutButton: {
    backgroundColor: "rgba(255, 204, 204, 1)",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    paddingLeft: 10,
    color: "white",
    // fontWeight: "bold",
  },
});
