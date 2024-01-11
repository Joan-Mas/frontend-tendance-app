import React, { useState } from "react";
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
} from "react-native";

import format from "date-fns/format";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Event(props) {
  let membreInterrested = props.data.users.interUsers.length;


  let now = new Date();
  let date = new Date(props.data.date);
  let color = "black";
  if (date < now) {
    color = "#d9d9d9";
  }



  const foodColor = "rgba(243, 200, 243, 1)";
  const musicColor = "rgba(89, 215, 207, 1)";
  const natureColor = "rgba(133, 244, 150, 1)";
  const scienceColor = "rgba(140, 178, 255, 1)";
  const artColor = "rgba(255, 141, 141, 1)";
  const sportColor = "rgba(250, 189, 132, 1)";

  const getColorIconByType = (eventType) => {
    switch (eventType) {
      case "Food":
        return foodColor;
      case "Music":
        return musicColor;
      case "Nature":
        return natureColor;
      case "Science":
        return scienceColor;
      case "Art":
        return artColor;
      case "Sport":
        return sportColor;
    }
  };

  return (
    <View>
      <View style={styles.separatorLine}></View>
      
        <View style={{height: "auto",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(22, 21, 25, 1)",
    borderWidth: 2,
    borderColor: getColorIconByType(props.data.type),
    marginTop: 15,
    padding: 5,
    marginBottom: 10 }}>
          <Image style={styles.img} source={{ uri: props.data.eventCover }} />
          <View>
            <Text style={styles.title}>{props.data.eventName}</Text>
            <Text style={styles.text}>
              <FontAwesome
                style={styles.viewPar}
                name="map-pin"
                size={15}
                color={"white"}
              />{" "}
              {props.data.address}
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
                {format(new Date(props.data.hourStart), "HH'h'mm")} -{" "}
                {format(new Date(props.data.hourEnd), "HH'h'mm")}{" "}
              </Text>
              <Text style={styles.text}>
                <FontAwesome
                  style={styles.viewPar}
                  name="user"
                  size={15}
                  color={"white"}
                />{" "}
                {membreInterrested} intéressé(s)
              </Text>
            </View>
          </View>
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
 

  img: {
    width: 70,
    height: 70,
    marginRight: 10,
    marginLeft: 5,
    borderRadius: 5,
  },

  row: {
    flexDirection: "row",
  },

  text: {
    color: "white",
    maxWidth: 200,
    marginBottom: 5,
    paddingRight: 5,
  },

  title: {
    color: "white",
    maxWidth: 280,
    marginBottom: 5,
    marginTop: 5,
    marginRight: 5,
  },

  separatorLine: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
});
