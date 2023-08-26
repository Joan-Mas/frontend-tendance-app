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
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import photoProfil from "../assets/photoProfile.jpg";
import photoBack from "../assets/photoBack.jpg";

import Event from "./components/event";

//Modal
import { setOpenModal } from "../reducers/openModal";
import Modale from "./components/Modale";
import { login, logout } from "../reducers/user";

import { useDispatch, useSelector } from "react-redux";
import { setEvent } from "../reducers/event";
import photoProfile from "../assets/photoProfile.jpg";
import { setConversation } from "../reducers/conversation";
import { adress } from "../adress";
const amis = [
  { username: "Jojo", photo: "" },
  { username: "Ines", photo: "" },
  { username: "Aaron", photo: "" },
  { username: "MaxLeGrand", photo: "" },
  { username: "MaxLePetit", photo: "" },
  { username: "Nicos", photo: "" },
  { username: "Micky", photo: "" },
];

export default function AmisScreen(props) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);

  const [amis, setAmis] = useState([]);
  const [loading, setLoading] = useState(true);

  const openARoom = (idAmi) => {
    dispatch(setConversation({ idUser: user._id, idAmi }));
    props.navigation.navigate("Message", { screen: "MessageScreen" });
  };

  handleBack = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    fetch(`http://${adress}/messagerie/amis`, {
      //! a changer dans le back a push
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idUser: user._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        const mesAmis = data.map((data, i) => (
          <TouchableOpacity onPress={() => openARoom(data)} key={i}>
            <View style={styles.friend}>
              <Image source={photoProfil} style={styles.image} />
              <Text style={styles.textGoback}>{data.username}</Text>
            </View>
          </TouchableOpacity>
        ));
        setAmis(mesAmis);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleBack()} style={styles.goBack}>
        <FontAwesome name="arrow-left" size={20} color={"white"} />
        <Text style={styles.textGoback}>Profile</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Mes Amis</Text>
      <ScrollView style={styles.listFriend}>
        {loading ? (
          <Text>Chargement...</Text>
        ) : amis.length > 0 ? (
          amis
        ) : (
          <Text style={styles.textGoback}>    Pas d'amis miskine 😵‍💫</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 40 : 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  goBack: {
    justifyContent: "space-between",
    alignSelf: "flex-start",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: 20,
    backgroundColor: "rgba(255, 204, 204, 1)",
    padding: 2,
    borderRadius: 20,
  },
  textGoback: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    padding: 10,
    
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "rgba(255, 204, 204, 1)",
  },
  friend: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-around",
    backgroundColor: "rgba(255, 204, 204, 1)",
    margin: 10,
    width: 300,
    height: 80,
    padding: 10,
    // margin: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "white",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  sendAMessage: {
    width: 150,
    height: 35,
    alignItems: "center",
    backgroundColor: "rgba(255, 204, 204, 1)",
    borderRadius: 10,
    margin: 10,
  },
});
