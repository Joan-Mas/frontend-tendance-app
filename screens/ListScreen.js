import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { setEvent } from "../reducers/event";
import { storeResearch, resetResearch } from "../reducers/list";
import { format } from "date-fns";

import dateList from "./components/dateList";
import formatDate from "./components/formatDate";
import formatDateToFrenchLocale from "./components/formatageList";
import ForFilterCreator from "./components/ForFilterCreator";
import ForFilterType from "./components/ForFilterType";
import ForFilterEventName from "./components/ForFilterEventName";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { adress } from "../adress";
//!import pour filtre Date
import { DatePickerAndroid } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import ForFilterDate from "./components/ForFilterDate";
import { setOpenModal } from "../reducers/openModal";
import Modale from "./components/Modale";

//ToDo
//- function pour trier la data des events par Date et la classer dans des tableaux
//- faire un mapping des tableaux des Date

//data ------------------------

// const eventData = [
//   {
//     creator: "joan",
//     eventName: "SJparty",
//     type: "music",
//     date: "2023-07-01",
//     hourStart: "22:45",
//     hourEnd: "01:45",
//     address: "35 rue de Marseille 69007 Lyon",
//     price: "Gratuit",
//     website: "linktr.ee/sacrejojo69",
//     description:
//       "Lorem ipsum dolor sit amet. Qui voluptates internos nam inventore atque aut culpa repellendus ut velit officia. Et velit vero sed velit reiciendis ut accusantium dolorem cum voluptates corporis sit quidem architecto.",
//     eventCover: "",
//     users: {
//       interUsers: ["001", "002", "003", "004"],
//       partUsers: ["005", "006", "007", "008"],
//     },
//   },
//   {
//     creator: "nico",
//     eventName: "TacosMania",
//     type: "food",
//     date: "2023-08-09",
//     hourStart: "19:45",
//     hourEnd: "22:45",
//     address: "26 Rue de Marseille 69007 Lyon",
//     price: "10",
//     website: "https://www.kebab-frites.com/kebab/uskudar-lyon-7.html",
//     description:
//       "Lorem ipsum dolor sit amet. Qui voluptates internos nam inventore atque aut culpa repellendus ut velit officia. Et velit vero sed velit reiciendis ut accusantium dolorem cum voluptates corporis sit quidem architecto.",
//     eventCover: "",
//     users: {
//       interUsers: ["001", "002", "003", "004"],
//       partUsers: ["005", "006", "007", "008", "09", "10"],
//     },
//   },
//   {
//     creator: "mich",
//     eventName: "ExpoMeme23",
//     type: "art",
//     date: "2023-08-01",
//     hourStart: "22:45",
//     hourEnd: "05:45",
//     address: "20 Place des Terreaux 69001 Lyon",
//     price: "5",
//     website: "https://www.mba-lyon.fr/fr",
//     description:
//       "Lorem ipsum dolor sit amet. Qui voluptates internos nam inventore atque aut culpa repellendus ut velit officia. Et velit vero sed velit reiciendis ut accusantium dolorem cum voluptates corporis sit quidem architecto.",
//     eventCover: "",
//     users: {
//       interUsers: ["001", "002"],
//       partUsers: ["003", "004", "005", "009"],
//     },
//   },
//   {
//     creator: "adri",
//     eventName: "Marathon de Lyon",
//     type: "sport",
//     date: "2023-09-13",
//     hourStart: "05:45",
//     hourEnd: "22:45",
//     address: "Place Bellecour 69002 Lyon",
//     price: "25",
//     website: "https://www.runinlyon.com/fr",
//     description:
//       "Lorem ipsum dolor sit amet. Qui voluptates internos nam inventore atque aut culpa repellendus ut velit officia. Et velit vero sed velit reiciendis ut accusantium dolorem cum voluptates corporis sit quidem architecto.",
//     eventCover: "",
//     users: {
//       interUsers: ["001", "002"],
//       partUsers: ["003", "004", "005", "006", "008"],
//     },
//   },
//   {
//     creator: "ines",
//     eventName: "Les Matins de la Cartographie",
//     type: "science",
//     date: "2023-09-13",
//     hourStart: "05:45",
//     hourEnd: "11:45",
//     address: "Place de la Nation, 69120 Vaulx-en-Velin",
//     price: "10",
//     website: "https://www.planetariumvv.com/",
//     description:
//       "Lorem ipsum dolor sit amet. Qui voluptates internos nam inventore atque aut culpa repellendus ut velit officia. Et velit vero sed velit reiciendis ut accusantium dolorem cum voluptates corporis sit quidem architecto.",
//     eventCover: "",
//     users: {
//       interUsers: ["001", "002"],
//       partUsers: ["003", "004", "005", "006"],
//     },
//   },
//   {
//     creator: "tone",
//     eventName: "La Pêche au Harpon",
//     type: "nature",
//     date: "2023-08-24",
//     hourStart: "05:45",
//     hourEnd: "00:45",
//     address: "Rue de Créqui 69006 Lyon",
//     price: "55",
//     website:
//       "https://www.snsm.org/conseils/conseils-loisirs-nautiques/peche-sous-marine-pratique-et-reglementation",
//     description:
//       "Lorem ipsum dolor sit amet. Qui voluptates internos nam inventore atque aut culpa repellendus ut velit officia. Et velit vero sed velit reiciendis ut accusantium dolorem cum voluptates corporis sit quidem architecto.",
//     eventCover: "",
//     users: {
//       interUsers: ["001", "002"],
//       partUsers: ["003", "004", "005", "006"],
//     },
//   },
//   {
//     creator: "max",
//     eventName: "DemodayBatch89-LaCapsuleGrooveCamp",
//     type: "science",
//     date: "2033-01-11",
//     hourStart: "14:45",
//     hourEnd: "16:45",
//     address: "35 rue de Marseille 69007 Lyon",
//     price: "10",
//     website: "https://now-coworking.com/",
//     description:
//       "Lorem ipsum dolor sit amet. Qui voluptates internos nam inventore atque aut culpa repellendus ut velit officia. Et velit vero sed velit reiciendis ut accusantium dolorem cum voluptates corporis sit quidem architecto.",
//     eventCover: "",
//     users: {
//       interUsers: ["001", "002", "009", "010"],
//       partUsers: ["003", "004", "005", "006", "007", "008"],
//     },
//   },
//   {
//     creator: "user",
//     eventName: "???",
//     type: "science",
//     date: "2024-01-11",
//     hourStart: "00:45",
//     hourEnd: "03:45",
//     address: "35 rue de Marseille 69007 Lyon",
//     price: "Gratuit",
//     website: "",
//     description:
//       "Lorem ipsum dolor sit amet. Qui voluptates internos nam inventore atque aut culpa repellendus ut velit officia. Et velit vero sed velit reiciendis ut accusantium dolorem cum voluptates corporis sit quidem architecto.",
//     eventCover: "",
//     users: {
//       interUsers: [
//         "003",
//         "004",
//         "005",
//         "006",
//         "007",
//         "008",
//         "001",
//         "002",
//         "009",
//         "010",
//       ],
//       partUsers: [],
//     },
//   },
//   {
//     creator: "user",
//     eventName: "TekTek69event",
//     type: "music",
//     date: "2023-12-11",
//     hourStart: "21:45",
//     hourEnd: "03:45",
//     address: "rue de Sèze 69006 Lyon",
//     price: "3",
//     website: "",
//     description:
//       "Lorem ipsum dolor sit amet. Qui voluptates internos nam inventore atque aut culpa repellendus ut velit officia. Et velit vero sed velit reiciendis ut accusantium dolorem cum voluptates corporis sit quidem architecto.",
//     eventCover: "",
//     users: {
//       interUsers: [
//         "003",
//         "004",
//         "005",
//         "006",
//         "007",
//         "008",
//         "001",
//         "002",
//         "009",
//         "010",
//       ],
//       partUsers: [],
//     },
//   },
//   {
//     creator: "user",
//     eventName: "GymTonic2000",
//     type: "sport",
//     date: "2023-11-11",
//     hourStart: "07:45",
//     hourEnd: "08:45",
//     address: "rue de Sèze 69006 Lyon",
//     price: "3",
//     website: "",
//     description:
//       "Lorem ipsum dolor sit amet. Qui voluptates internos nam inventore atque aut culpa repellendus ut velit officia. Et velit vero sed velit reiciendis ut accusantium dolorem cum voluptates corporis sit quidem architecto.",
//     eventCover: "",
//     users: {
//       interUsers: ["003", "004", "005", "006", "002", "009", "010"],
//       partUsers: ["007", "008", "001"],
//     },
//   },
// ];

//-------------------------------- début de la fonction

export default function ListScreen({ navigation }) {
  const [research, setResearch] = useState(""); // état de la recherche en Input
  //const [dataDynamic, setdataDynamic] = useState(eventData); // état de la data en réception
  const [isResearch, setIsResearch] = useState(false); // état recherche active/inactive
  const [searchFilter, setSearchFilter] = useState("creator");

  const [dateText, setDateText] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimeStartPicker, setShowTimeStartPicker] = useState(false);
  const [showTimeEndPicker, setShowTimeEndPicker] = useState(false);
  const [timeToFilter, setTimeToFilter] = useState("today");

  //---------------------------------------------------------------------

  const dispatch = useDispatch();
  const reduxResearch = useSelector((state) => state.list.value);
  const researchLowerCase = reduxResearch.toLowerCase();

  const dataDynamic = useSelector((state) => state.events.value);
  const user = useSelector((state) => state.user.value);

  console.log(dataDynamic);
  let finalDataBase = [];

  //! DATE (plus mon code)
  const [selectedDate, setSelectedDate] = useState(new Date());

  const toggleDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selected) => {
    if (selected) {
      setSelectedDate(selected);
      const Formatage = formatDate(selected);
      console.log(Formatage);
      setTimeToFilter(Formatage);

      const formattedDate = selected.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setDateText(formattedDate);
      setShowDatePicker(false);
      //console.log(dateText);
      //console.log(selected)
    }
  };
  // let Log = timeToFilter.slice(0,10);
  // console.log(Log);
  //Affichage du calendrier en Android
  const showAndroidDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: selectedDate,
        mode: "calendar",
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const selectedDate = new Date(year, month, day);
        handleDateChange(null, selectedDate);
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);

    //!filtre actif ---------------------------------------------------------------------------------------------------
  };

  //! timeeeeeeeeeeeeeeeeeeeeeeeee
  const toggleTimeStartPicker = () => {
    setShowTimeStartPicker(true);
  };

  const handleTimeStartChange = (event, selected) => {
    if (selected) {
      setHourStart(selected);
    }
    setShowTimeStartPicker(false);
  };

  const toggleTimeEndPicker = () => {
    setShowTimeEndPicker(true);
  };

  const handleTimeEndChange = (event, selected) => {
    if (selected) {
      setHourEnd(selected);
    }
    setShowTimeEndPicker(false);
  };

  const hideTimePicker = () => {
    setShowTimeStartPicker(false);
    setShowTimeEndPicker(false);
  };

  //! END DATE

  // Lance la recherhce ---------------------------------------
  const handleSearch = () => {
    dispatch(storeResearch(research));
    setResearch("");
    setIsResearch(true);
    //console.log(isResearch);
    // if(searchFilter === "date") {
    //   console.log("Time");
    //   finalDataBase = ForFilterDate(eventData, timeToFilter);
    // }
    // console.log(finalDataBase);
    //  return finalDataBase
  };

  // Initialise les filtres / Ferme la recherhe
  const handleCloseFilter = () => {
    dispatch(resetResearch());
    setIsResearch(false);

    //console.log(isResearch);
  };

  const handleFilterType = (data) => {
    setSearchFilter("type");
    dispatch(storeResearch(data.type));
    setIsResearch(true);
  };

  // constante pour rejoindre la map au onPress---------------------------------------------
  const handleMap = () => {
    navigation.navigate("TabNavigator", { screen: "TabNavigator" });
  };

  // constante pour rejoindre l'évent sélectionné au onPress---------------------------------------------
  const handlePress = (data) => {
    if (user === null) {
      console.log("null");
      dispatch(setOpenModal(!isModalOpen));
    } else {
      //console.log(data);
      navigation.navigate("Event", { screen: "EventScreen" });
      dispatch(setEvent(data));
    }
  };

  const handleFilter = () => {
    if (searchFilter === "creator") {
      setSearchFilter("type");
      dispatch(resetResearch());
      setIsResearch(false);
    }
    if (searchFilter === "type") {
      setSearchFilter("eventName");
      dispatch(resetResearch());
      setIsResearch(false);
    }

    if (searchFilter === "eventName") {
      setSearchFilter("date");
      dispatch(resetResearch());
      setIsResearch(false);
      Opaque = 1;
    }

    if (searchFilter === "date") {
      setSearchFilter("creator");
      dispatch(resetResearch());
      setIsResearch(false);
      setTimeToFilter("today");
      Opaque = 0;
    }

    //console.log(searchFilter);
  };

  //console.log({HandleFilter : finalDataBase})

  let newDataBase;

  if (!isResearch || searchFilter !== "date") {
    finalDataBase = dataDynamic;
  }
  if (!isResearch || searchFilter === "date") {
    if (timeToFilter === "today") {
      finalDataBase = dataDynamic;
    } else {
      finalDataBase = ForFilterDate(dataDynamic, timeToFilter);
    }
  } else {
    if (searchFilter === "creator") {
      finalDataBase = ForFilterCreator(dataDynamic, researchLowerCase);
    }
    if (searchFilter === "type") {
      finalDataBase = ForFilterType(dataDynamic, researchLowerCase);
    }
    if (searchFilter === "eventName") {
      finalDataBase = ForFilterEventName(dataDynamic, researchLowerCase);
    }
  }

  // console.log({ BeforeFiltre: finalDataBase });
  // const test = finalDataBase[0].date;
  // console.log({BeforeFiltre : test});

  let sortedEvents = finalDataBase
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  //console.log({ sortedEvents: sortedEvents });
  //console.log(dates.includes(sortedEvents[0].date));
  //console.log(dates[0]);
  //console.log((sortedEvents[0].date));

  //!

  const today = new Date();

  let dateAllEvent = [];
  for (let i = 0; i < sortedEvents.length; i++) {
    dateAllEvent.push(sortedEvents[i].date.slice(0, 10));
  }
  console.log({ MesDates: dateAllEvent });
  // constante pour obtenir la date du jour

  //renvoie toutes dates des évents à partir de la date du jour et élimine les doublons-------------------------------------------------------

  const dateEvents = [...new Set(dateAllEvent)].filter(
    (date) => date >= formatDate(today)
  );

  console.log({ MesDates: dateAllEvent });
  //fonction principale renvoie toute les views avec le bon style en fonction du type---------------------------------------------------------

  const dayList = dateEvents.map((data, i) => {
    return (
      <View style={styles.scrollContainer} key={i}>
        <Text style={styles.textStyle}>{formatDateToFrenchLocale(data)}</Text>
        <View>
          {dateList(sortedEvents, data).map((data, i) => {
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

            // const DateStart = formatDate(data.hourStart);

            return (
              <TouchableOpacity
                key={i}
                onPress={() => handlePress(data)}
                //style={styles.eventBlock}
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
                <Image source={imageType} style={styles.eventImage} />
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
  // style pour le times des filtres
  if (isResearch) {
    opacityChange = 1;
  } else {
    opacityChange = 0;
  }
  if (searchFilter === "date") {
    opacityValue = 1;
  } else {
    opacityValue = 0;
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        barStyle="light-content" // Change to "light-content" if you need white status bar content
        backgroundColor="white" // Set the background color of the status bar
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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

// style -------------------------------------------------------------------
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
    // alignContent: 'center',
    // justifyContent: 'center',
    // alignItems: "center",
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
