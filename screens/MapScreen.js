import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { DatePickerAndroid } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";

import ForFilterCreator from "./components/ForFilterCreator";
import ForFilterType from "./components/ForFilterType";
import ForFilterEventName from "./components/ForFilterEventName";
import ForFilterDate from "./components/ForFilterDate";
import formatDate from "./components/formatDate";
import formatDateToFrenchLocale from "./components/formatageList";
import { format } from "date-fns";
import Modale from "./components/Modale";


import { setEvent } from "../reducers/event";
import { storeResearch, resetResearch } from "../reducers/list";
import { setOpenModal } from "../reducers/openModal";


import { useIsFocused } from '@react-navigation/native';

const BACKEND_ADDRESS = "https://backend-tendance.vercel.app";
import { adress } from "../adress";

export default function MapScreen(props) {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.value);
  const reduxResearch = useSelector((state) => state.list.value);
  const researchLowerCase = reduxResearch.toLowerCase();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [research, setResearch] = useState(""); // état de la recherche en Input
  const [isResearch, setIsResearch] = useState(true); // état recherche active/inactive
  const [searchFilter, setSearchFilter] = useState("Type");
  const [timeToFilter, setTimeToFilter] = useState("today");
  const [dateText, setDateText] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [currentPosition, setCurrentPosition] = useState(null);
  const currentPositionMarker = require("../assets/photoProfile.jpg");
  const [initialRegion, setInitialRegion] = useState(null);
  const mapRef = useRef(null); 
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {

          setCurrentPosition(location.coords);
        });
      }

      fetch(`http://${adress}/events/events`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const filteredEvents = data.filter((event) => new Date(event.date) >= new Date());

        }

      });


    })();

    
  }, [isFocused]);

  //se centrer sur l'event qui pop up
  const handleMarkerPress = (event) => {


    mapRef.current.animateToRegion({
      latitude: event.latitude + 0.05,
      longitude: event.longitude,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    });
  };


  const toggleDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selected) => {
    if (selected) {
      setSelectedDate(selected);
      const Formatage = formatDate(selected);

      setTimeToFilter(Formatage);

      const formattedDate = selected.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setDateText(formattedDate);
      setShowDatePicker(false);

    }
  };

  //Affichage du calendrier en Android

  const hideDatePicker = () => {
    setShowDatePicker(false);

    
  };

  const handleSearch = () => {
    dispatch(storeResearch(research));
    setResearch("");
    setIsResearch(true);
  };

  const handlePress = (data) => {
    if (user === null) {

      dispatch(setOpenModal(!isModalOpen));
    } else {

      props.navigation.navigate("Event", { screen: "EventScreen" });
      dispatch(setEvent(data));
    }
  };
  const handleCloseFilter = () => {
    dispatch(resetResearch());
    setIsResearch(false);

  };

  const handleFilterType = (data) => {
    setSearchFilter("Type");
    dispatch(storeResearch(data.type));
    setIsResearch(true);
  };

  const handleFilter = () => {
    if (searchFilter === "Créateur") {
      setSearchFilter("Type");
      dispatch(resetResearch());
      setIsResearch(false);
    }
    if (searchFilter === "Type") {
      setSearchFilter("Nom");
      dispatch(resetResearch());
      setIsResearch(false);
    }

    if (searchFilter === "Nom") {
      setSearchFilter("Date");
      dispatch(resetResearch());
      setIsResearch(false);
      Opaque = 1;
    }

    if (searchFilter === "Date") {
      setSearchFilter("Créateur");
      dispatch(resetResearch());
      setIsResearch(false);
      setTimeToFilter("today");
      Opaque = 0;
    }
  };

  if (!isResearch || searchFilter !== "Date") {
    finalDataBase = events;
    positionBottom = -50

  }
  if (!isResearch || searchFilter === "Date") {
    if (timeToFilter === "today") {
      finalDataBase = events;
      positionBottom = -50
      
    } else {
      finalDataBase = ForFilterDate(events, timeToFilter);
      positionBottom = -50;
      
    }
  } else {
    if (searchFilter === "Créateur") {
      finalDataBase = ForFilterCreator(events, researchLowerCase);
      positionBottom = 20
      
    }
    if (searchFilter === "Type") {
      finalDataBase = ForFilterType(events, researchLowerCase);
      positionBottom = 20
     
    }
    if (searchFilter === "Nom") {
      finalDataBase = ForFilterEventName(events, researchLowerCase);
      positionBottom = 20
      
    }
  }
  if (isResearch) {
    opacityChange = 1;
  } else {
    opacityChange = 0;
  }
  if (searchFilter === "Date") {
    opacityValue = 1;
  } else {
    opacityValue = 0;
  }

  //Bouton vers screen list
  const handleSubmit = () => {
    props.navigation.navigate("List", { screen: "ListScreen" });
  };

  const user = useSelector((state) => state.user.value);
  const isModalOpen = useSelector((state) => state.openModal.value);



  const handleInitialRegion = (region) => {
    if (!initialRegion) {
      setInitialRegion(region);
    }
  };

  const handleSatellite = () => {
    mapRef.current.animateToRegion({
      latitude: currentPosition.latitude,
      longitude: currentPosition.longitude,
      latitudeDelta: 100,
      longitudeDelta: 100,
    });
  }

  const handleCrash = () => {
    mapRef.current.animateToRegion({
      latitude: currentPosition.latitude,
      longitude: currentPosition.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  }


  //Fond de carte personnalisé
  const mapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#181818",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1b1b1b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#2c2c2c",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8a8a8a",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#373737",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#3c3c3c",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#4e4e4e",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3d3d3d",
        },
      ],
    },
  ];

  const foodIcon = require("../assets/food_icon.png");
  const musicIcon = require("../assets/music_icon.png");
  const natureIcon = require("../assets/nature_icon.png");
  const scienceIcon = require("../assets/science_icon.png");
  const artIcon = require("../assets/art_icon.png");
  const sportIcon = require("../assets/sport_icon.png");

  const getMarkerIconByType = (eventType) => {
    switch (eventType) {
      case "Food":
        return foodIcon;
      case "Music":
        return musicIcon;
      case "Nature":
        return natureIcon;
      case "Science":
        return scienceIcon;
      case "Art":
        return artIcon;
      case "Sport":
        return sportIcon;
    }
  };

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
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content" // Change to "light-content" if you need white status bar content
        backgroundColor="white" // Set the background color of the status bar
      />
      <Modale></Modale>
      <View style={styles.researchContainer}>
        <TextInput
          placeholder="Recherche"
          onChangeText={(value) => setResearch(value)}
          value={research}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => handleSearch()}
          style={styles.searchButton}
        >
          <FontAwesome name={"search"} size={30} color={"black"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCloseFilter()}
          style={{
            position: "absolute",
            top: 90,
            right: 40,
            opacity: opacityChange,
          }}
        >
          <FontAwesome name={"times"} size={30} color={"white"} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => handleFilter()}
        style={styles.filterButton}
      >
        <FontAwesome name={"filter"} size={20} />
        <Text> {searchFilter}</Text>

      </TouchableOpacity>

      {/* condition de rendu du date picker en fonction du système ios ou android */}
      {Platform.OS === "ios" && (
        <DateTimePicker
          style={{
            opacity: opacityValue,
            position: "absolute",
            backgroundColor: "white",
            borderRadius: 5,
            borderColor: "#C5C5C5",
            borderWidth: 1,
            left: 20,
            top: 555,
            height: 40,
            width: 100,
          }}
          value={selectedDate}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
          onDismiss={hideDatePicker}
        />
      )}

      {Platform.OS === "android" && (
        <DateTimePicker
        style={{
          opacity: opacityValue,
          position: "absolute",
          backgroundColor: "white",
          borderRadius: 5,
          borderColor: "#C5C5C5",
          borderWidth: 1,
          left: 20,
          top: 555,
          height: 40,
          width: 100,
        }}
        value={selectedDate}
        mode="date"
        display="calendar"
        onChange={handleDateChange}
          onDismiss={hideDatePicker}
        />
      )}

      <MapView
        ref={mapRef} 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}

        initialRegion={
          currentPosition
            ? {
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }
            : null
        }
        handleInitialRegion={handleInitialRegion}
      >
        {currentPosition && (
          <Marker
            coordinate={currentPosition}
            title={'David?'}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <Image
              source={currentPositionMarker}
              style={styles.currentPositionIcon}
            />
          </Marker>
        )}

        {finalDataBase.map((event, i) => (
          <Marker
            key={i}
            coordinate={{
              latitude: event.latitude,
              longitude: event.longitude,
            }}
            title={event.eventName}
            onPress={() => handleMarkerPress(event)}
          >
            <Image
              source={getMarkerIconByType(event.type)}
              style={styles.markerImage}
            />

            <Callout tooltip onPress={() => handlePress(event)} title="Event">
              <View>
                <View style={styles.bubble}>
                  <Image
                    source={{uri:event.eventCover}}
                    style={styles.bubbleImage}
                  />
                  <Text style={styles.eventName}>{event.eventName}</Text>

                  <Text style={styles.typeEvent}>
                    {event.type}{" "}
                    <FontAwesome
                      name={"circle"}
                      size={15}
                      color={getColorIconByType(event.type)}
                    />
                  </Text>

                  <Text style={styles.textStyle}>
                    {formatDateToFrenchLocale(event.date)}
                  </Text>
                  <Text style={styles.hours}>
                    {format(new Date(event.hourStart), "HH'h'mm")}-
                    {format(new Date(event.hourEnd), "HH'h'mm")}
                  </Text>
                  <Text style={styles.priceEvent}>Prix : {event.price} €</Text>
                  <TouchableOpacity style={styles.goToEvent}></TouchableOpacity>
                </View>

              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.pressableButton}
      >
        <FontAwesome name={"bars"} size={30} color={"#b2b2b2"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleSatellite()}
        style={{    position: "absolute",
        bottom: positionBottom,
        right: 110,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 50,}}
      >
        <FontAwesome name={"rocket"} size={30} color={"#b2b2b2"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleCrash()}
        style={{  position: "absolute",
        bottom: positionBottom, 
        right: 215,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 50,}}
      >
        <FontAwesome name={"sort-down"} size={30} color={"#b2b2b2"} />
      </TouchableOpacity>

      <View></View>
    </View>
  );
}

//STYLE

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    zIndex: -1,
  },
  input: {
    borderWidth: 2,
    height: 40,
    padding: 12,
    marginTop: 24,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 12,
    borderRadius: 20,
  },
  searchButton: {
    position: "absolute",
    top: 18,
    right: 30,
    padding: 10,
  },

  pressableButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
  },
  pressableButtonFusee: {
    position: "absolute",
    bottom: -50, 
    right: 110,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
  },

  pressableButtonDown: {
    position: "absolute",
    bottom: -50, 
    right: 215,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
  },
  selectDate: {
    borderWidth: 3,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    bottom: 35,
    left: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  ButtonDate: {
    borderWidth: 1,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    top: 110,
    right: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  datePicker: {
    backgroundColor: "rgba(155, 130, 255, 1)",
    borderRadius: 5,
    borderColor: "#C5C5C5",
    borderWidth: 1,
    left: 20,
    top: 400,
    opacity: 1,
    height: 40,
    width: 100,
  },

  filterButton: {
    flexDirection: "row",
    borderWidth: 1,
    position: "absolute",
    top: 100,
    left: 15,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  markerImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  currentPositionIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    resizeMode: "contain",
    borderWidth: 3,
    borderColor: "white",
  },
  bubble: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    width: 250,
    height: "auto",
    minHeight: 250,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderColor: "#ccc",
    borderWidth: 0.5,
    paddingBottom: 10,
    marginBottom: 20,
    borderWidth: 2,
  },
  bubbleImage: {
    width: 250,
    height: "auto",
    minHeight: 130,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 20,
    color: "#1E064E",
    textAlign: "center",
  },
  typeEvent: {
    fontSize: 14,
    marginBottom: 5,
    alignItems: "center",
  },

  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,

  },
  goToEvent: {

    alignContent: "center",
    justifyContent: "center",

  },
});
