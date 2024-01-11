import React, { useState, useEffect } from "react";
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
  SafeAreaView,
  StatusBar,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import photoProfile from "../assets/photoProfile.jpg";
import photoBack from "../assets/photoBack.jpg";

import Event from "./components/event";

//Modal
import { setOpenModal } from "../reducers/openModal";
import Modale from "./components/Modale";
import { login, logout } from "../reducers/user";

import { useDispatch, useSelector } from "react-redux";
import { setEvent } from "../reducers/event";
import { adress } from "../adress";

export default function ProfileScreen(props) {


  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [futurEvents, setFuturEvents] = useState([]);
  const isFocused = useIsFocused();

  // Joyeux anniversaire Jojo la Disco signé Tone le mega chad

  useEffect(() => {
    if (user) {
      fetch(`http://${adress}/user/mesEvents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUser: user._id }),
      })
        .then((response) => response.json())
        .then((data) => {
          const eventsFutur = data
            .filter((event) => new Date(event.date) >= new Date())
            .slice()
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((data, index) => (
              <TouchableOpacity
                onPress={() => handlePress(data)}
                key={`futur-${index}`}
              >
                <Event data={data} />
              </TouchableOpacity>
            ));
          setFuturEvents(eventsFutur);
        });
    }
    if (!user) {
      dispatch(setOpenModal(true));
    }
  }, [user, isFocused]);

  //! Function _____________________________________________________________________________________________________________________________

  const isModalOpen = useSelector((state) => state.openModal.value);
  //! code pour les autres screen

  const handlePress = (data) => {
    if (user === null) {
      dispatch(setOpenModal(!isModalOpen));
    } else {
      props.navigation.navigate("Event", { screen: "EventScreen" });
      dispatch(setEvent(data));
    }
  };

  const handleMesAmis = () => {
    props.navigation.navigate("Amis", { screen: "AmisScreen" });
  };

  // ! Return ___________________________________________________________________________________________________________________________

  return user ? (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content" // Change to "light-content" if you need white status bar content
        backgroundColor="white" // Set the background color of the status bar
      />
      <View style={styles.background}>
        <View style={styles.viewPhotoBack}>
          <Image source={photoBack} style={styles.photoBack} size={100} />
          <Image source={photoProfile} style={styles.photoProfile} size={100} />
        </View>

        <View style={styles.viewParam}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => dispatch(logout())}
          >
            <FontAwesome name="sign-out" size={30} color={"white"} />
            <Text style={styles.textIcon}>Déconnexion</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.viewGear
      }>
        <FontAwesome
          style={styles.viewPar}
          name="gears"
          size={30}
          color={"white"}
        />
      </View> */}

        <View style={styles.viewName}>
          <Text style={styles.titleName}>@{user.username}</Text>
        </View>

        <View style={styles.viewIcon}>
          <TouchableOpacity style={styles.icon} onPress={() => handleMesAmis()}>
            <FontAwesome name="users" size={25} color={"white"} />
            <Text style={styles.textIcon}>Mes amis</Text>
          </TouchableOpacity>

          {/* <View style={styles.icon}>
                     <FontAwesome name="rocket" size={30} color={"#161519"} />
                     <Text style={styles.textIcon}>Messagerie</Text>
                 </View>  */}

          {/* <View style={styles.icon}>
          <FontAwesome name="heart" size={25} color={"white"} />
           <Text style={styles.textIcon}>Mes Favoris</Text> 
        </View> */}
        </View>

        <ScrollView style={styles.events}>
          <View style={styles.futurEvents}>
            <Text style={styles.text}>Évènement à venir</Text>
            {futurEvents}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  ) : (
    <View>
      <Modale></Modale>
    </View>
  );
}

//! Style __________________________________________________________________________________________________________________________

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#161519",
  },

  viewGear: {
    top: 120,
    left: 20,
    position: "absolute",
    margin: 10,
    borderRadius: 10,
  },

  background: {
    backgroundColor: "#161519",
  },

  photoBack: {
    width: "100%",
    height: 150,
  },
  photoProfile: {
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
    top: 100,
  },

  viewName: {
    alignSelf: "center",
  },
  viewLogout: {
    position: "absolute",
    left: 70,
    bottom: -10,
    padding: 5,
    borderRadius: 20,
  },
  textLogout: {
    color: "#161519",
    fontWeight: "thin",
  },
  viewParam: {
    position: "absolute",
    justifyContent: "space-around",
    left: 10,
    top: 130,
    borderRadius: 50,
  },
  viewPar: {
    margin: 10,
  },
  viewIcon: {
    position: "absolute",
    justifyContent: "space-around",
    left: 300,
    top: 135,
    borderRadius: 50,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
  textIcon: {
    color: "white",
  },
  // ! EVENTS

  events: {
    width: "100%",
    height: 380,
    backgroundColor: "#161519",
    padding: 10,
  },
  event: {
    backgroundColor: "blue",
    height: 50,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 10,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },

  titleName: {
    height: 70,
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
