// import externe
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";

//import interne 

//local storage
import event, { setEvent } from "../reducers/event";
import { storeResearch, resetResearch } from "../reducers/list";

// import gestion des filtres 
import dateList from "./components/dateList";
import formatDate from "./components/formatDate";
import formatDateToFrenchLocale from "./components/formatageList";
import ForFilterCreator from "./components/ForFilterCreator";
import ForFilterType from "./components/ForFilterType";
import ForFilterEventName from "./components/ForFilterEventName";

//import pour filtre Date
import DateTimePicker from "@react-native-community/datetimepicker";
import ForFilterDate from "./components/ForFilterDate";
import { setOpenModal } from "../reducers/openModal";
import Modale from "./components/Modale";



export default function ListScreen({ navigation }) {
  
  // gestion de la recherche
  const [research, setResearch] = useState(""); 
  const [isResearch, setIsResearch] = useState(false); 
  const [searchFilter, setSearchFilter] = useState("Créateur");

  // gestion des dates / Datetimepicker
  const [dateText, setDateText] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);


  const [timeToFilter, setTimeToFilter] = useState("today");

  // gestion des dates / Format
  const [selectedDate, setSelectedDate] = useState(new Date());

  // gestion du local storage / Redux
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.openModal.value);
  const reduxResearch = useSelector((state) => state.list.value);
  const researchLowerCase = reduxResearch.toLowerCase();
  const dataDynamic = useSelector((state) => state.events.value);
  const user = useSelector((state) => state.user.value);

  // const globale
  let finalDataBase = [];

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

  const hideDatePicker = () => {
    setShowDatePicker(false);

    //!filtre actif ---------------------------------------------------------------------------------------------------
  };

  // navigation to map
    const handleMap = () => {
      navigation.navigate("TabNavigator", { screen: "TabNavigator" });
    };
  
  // open Modal
    
    const handlePress = (data) => {
      if (user === null) {
        dispatch(setOpenModal(!isModalOpen));
      } else {
        navigation.navigate("Event", { screen: "EventScreen" });
        dispatch(setEvent(data));
      }
    };

  // Recherche
  const handleSearch = () => {
    dispatch(storeResearch(research));
    setResearch("");
    setIsResearch(true);
  
  };

  // Initialise les filtres / Ferme la recherhe
  const handleCloseFilter = () => {
    dispatch(resetResearch());
    setIsResearch(false);
  };

  // 
  const handleFilterType = (data) => {
    setSearchFilter("Type");
    dispatch(storeResearch(data.type));
    setIsResearch(true);
  };

  // switch filter
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

  // trier la data en fonction des conditions
  
  if (!isResearch || searchFilter !== "Date") {
    finalDataBase = dataDynamic;
  }
  if (!isResearch || searchFilter === "Date") {
    if (timeToFilter === "today") {
      finalDataBase = dataDynamic;
    } else {
      finalDataBase = ForFilterDate(dataDynamic, timeToFilter);
    }
  } else {
    if (searchFilter === "Créateur") {
      finalDataBase = ForFilterCreator(dataDynamic, researchLowerCase);
    }
    if (searchFilter === "Type") {
      finalDataBase = ForFilterType(dataDynamic, researchLowerCase);
    }
    if (searchFilter === "Nom") {
      finalDataBase = ForFilterEventName(dataDynamic, researchLowerCase);
    }
  }

  // afficher la croix de reset de la recherche & le date picker en fonction des conditions 

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

  // classer les dates de façon croissante

  let sortedEvents = finalDataBase
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));


   // formater les dates dans sortedEvents 

  let dateAllEvent = [];

  for (let i = 0; i < sortedEvents.length; i++) {
    dateAllEvent.push(sortedEvents[i].date.slice(0, 10));
  }

  // trier pour n'afficher que les events présent ou futur 
  
  const today = new Date();
  
  const dateEvents = [...new Set(dateAllEvent)].filter(
    (date) => date >= formatDate(today)
  );



  const dayList = dateEvents.map((data, i) => { // mapping pour afficher les dates dans l'ordre 
    return (
      <View style={styles.scrollContainer} key={i}>
        <Text style={styles.textStyle}>{formatDateToFrenchLocale(data)}</Text> 
        <View>
          {dateList(sortedEvents, data).map((data, i) => { // mapping pour afficher les évents corespondant à chaque date
            if (data.type === "Music") {
              stringStyle = "rgba(89, 215, 207, 1)";
              colorFont = "white";
              imageType = require("../assets/marcela-laskoski-YrtFlrLo2DQ-unsplash.jpg");
            }
            if (data.type === "Art") {
              stringStyle = "rgba(255, 141, 141, 1)";
              colorFont = "white";
              imageType = require("../assets/sebastian-svenson-d2w-_1LJioQ-unsplash.jpg");
            }
            if (data.type === "Food") {
              stringStyle = "rgba(243, 200, 243, 1)";
              colorFont = "black";
              imageType = require("../assets/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg");
            }
            if (data.type === "Nature") {
              stringStyle = "rgba(133, 244, 150, 1)";
              colorFont = "black";
              imageType = require("../assets/tim-swaan-eOpewngf68w-unsplash.jpg");
            }
            if (data.type === "Science") {
              stringStyle = "rgba(140, 178, 255, 1)";
              colorFont = "black";
              imageType = require("../assets/milad-fakurian-58Z17lnVS4U-unsplash.jpg");
            }
            if (data.type === "Sport") {
              stringStyle = "rgba(250, 189, 132, 1)";
              colorFont = "black";
              imageType = require("../assets/august-phlieger-CREqtqgBFcU-unsplash.jpg");
            }

            return (
              <TouchableOpacity
                key={i}
                onPress={() => handlePress(data)}
                
                style={{
                  backgroundColor: "white",
                  borderWidth: 3,
                  width: 300,
                  height: "auto",
                  borderRadius: 20,
                  padding: 20,
                  margin: 20,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <Image source={{uri:data.eventCover}} style={styles.eventImage} />
                <View style={styles.containerTop}>
                  <TouchableOpacity onPress={() => handleFilterType(data)}>
                    <Text style={styles.eventName}>
                      <FontAwesome
                        name={"circle"}
                        size={20}
                        color={stringStyle}
                      />{" "}
                      {data.eventName}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.eventView}>
                  <Text style={styles.eventDate}>
                    {formatDateToFrenchLocale(data.date.slice(0, 10))} {""}
                  </Text>
                  <Text>
                    Entre {format(new Date(data.hourStart), "HH'h'mm")} et{" "}
                    {format(new Date(data.hourEnd), "HH'h'mm")}
                  </Text>
                  <Text style={styles.eventAddress}>
                    Point de rdv: {data.address}
                  </Text>
                </View>

                <Text style={styles.eventCreator}>
                  Événement organisé par {data.creatorName.username}
                </Text>

                <View style={styles.partUsers}>
                  <Text style={styles.eventCreator}>
                    Interresé.e.s : {data.users.interUsers.length}{" "}
                  </Text>
                  <Text style={styles.eventCreator}>
                    Participant.e.s : {data.users.partUsers.length}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        barStyle="light-content" 
        backgroundColor="white" 
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Modale></Modale>
        <View>
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
        <ScrollView>
          <View style={styles.scrollContainer}>{dayList}</View>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity onPress={() => handleMap()} style={styles.mapButton}>
        <FontAwesome name={"globe"} size={40} color={"rgba(22, 21, 25, 1)"} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleFilter()}
        style={styles.filterButton}
      >
        <FontAwesome name={"filter"} size={20} />
        <Text> {searchFilter}</Text>

        {/* <FontAwesome name={"circle"} size={20} color={stringStyle} /> for filter*/}
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
            top: 600,
            height: 40,
            width: 100,
          }}
          value={selectedDate}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
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
          top: 600,
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 10,
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#161519",
  },

  input: {
    borderWidth: 2,
    height: 50,
    padding: 12,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
    borderRadius: 20,
    backgroundColor: "white",
  },
  dataHide: {
    opacity: 0,
  },
  searchButton: {
    position: "absolute",
    top: 38,
    right: 30,
    padding: 10,
  },

  scrollContainer: {
    backgroundColor: "#161519",
    alignItems: "center",
  },

  textStyle: {
    color: "white",
  },

  mapButton: {
    position: "absolute",
    borderWidth: 1,
    bottom: 20,
    right: 30,
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

  datePicker: {},

  filterButton: {
    flexDirection: "row",
    borderWidth: 1,
    position: "absolute",
    top: 117,
    left: 20,
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

  //style import_______________________________________________________
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
    marginTop: 2,
    marginBottom: 2,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  eventName: {
    marginBottom: 2,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  eventCreator: {
    fontSize: 14,
    color: "grey",
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
  eventView: {},

  containerTop: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
});
