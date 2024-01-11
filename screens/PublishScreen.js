import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DatePickerAndroid } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modale from "./components/Modale";
import { setOpenModal } from "../reducers/openModal";
import { adress } from "../adress";



import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator';

export default function PublishScreen() {


  const [name, setName] = useState("");
  const [addresse, setAdresse] = useState("");
  const [hourStart, setHourStart] = useState(new Date());
  const [hourEnd, setHourEnd] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimeStartPicker, setShowTimeStartPicker] = useState(false);
  const [showTimeEndPicker, setShowTimeEndPicker] = useState(false);
  const [selectedOptionType, setSelectedOptionType] = useState(null);
  const [selectedOptionAccess, setSelectedOptionAccess] = useState(null);

  const [picture, setPicture] = useState(null);


  const [affiche, setAffiche] = useState(true);

  const handlePictureImport = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Permission denied')
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1
    })

    

    

    const formData= new FormData();
  

    formData.append('photoFromFront', {
    uri: result.assets[0].uri,
    name: 'photo.jpg',
    type: 'image/jpeg',
    });

    fetch(`http://${adress}/events/upload`, {
    method: 'POST',
    body: formData,
    }).then((response) => response.json())
    .then((data) => {
      
      setPicture(data.url)
    });
  }

  


  const handleResetAll = () => {
    setAffiche(true);
    setName("");
    setAdresse("");
    setHourStart(new Date());
    setHourEnd(new Date());
    setShowDatePicker(false);
    setShowTimeStartPicker(false);
    setShowTimeEndPicker(false);
    setPrice("");
    setDescription("");
    setSelectedOptionType(null);
    setSelectedOptionAccess(null);
  };

  const dispatch = useDispatch();


  useEffect(() => {
    if (user) {

    } else {

      dispatch(setOpenModal(true));
    }
  }, [user]);

  const optionsType = [
    { id: 1, label: "Art" },
    { id: 2, label: "Music" },
    { id: 3, label: "Food" },
    { id: 4, label: "Nature" },
    { id: 5, label: "Science" },
  ];
  const optionsAccess = [
    { id: 1, label: "Prive" },
    { id: 2, label: "Public" },
  ];

  const handleoptionsTypeSelect = (optionId) => {
    setSelectedOptionType(optionId);
  };
  const handleoptionsAccessSelect = (optionId) => {
    setSelectedOptionAccess(optionId);
  };


  const [selectedDate, setSelectedDate] = useState(new Date());

  const toggleDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selected) => {
    if (selected) {
      setSelectedDate(selected);
      const formattedDate = selected.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setDateText(formattedDate);
      setShowDatePicker(false);
    }
  };


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

    }
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };


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



  const user = useSelector((state) => state.user.value);

  const handlePublish = () => {
    let type;
    switch (selectedOptionType) {
      case 1:
        type = "Art";

        break;
      case 2:
        type = "Music";
        break;
      case 3:
        type = "Food";
        break;
      case 4:
        type = "Nature";
        break;
      case 5:
        type = "Science";
        break;
    }
    let access;
    switch (selectedOptionAccess) {
      case 1:
        access = "Privée";
        break;
      case 2:
        access = "Public";
        break;
    }

    let event = {
      creatorName: user._id,
      eventName: name,
      type: type,
      access: access,
      date: selectedDate,
      hourStart: hourStart,
      hourEnd: hourEnd,
      address: addresse,
      price: price,
      description: description,
      eventCover: picture,
      amis: "",
      latitude: null,
      longitude: null,
    };

  
    setAffiche(false);

    fetch(`http://${adress}/events/publishEvent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    })
      .then((response) => response.json())
      .then((data) => {
        

      });


  };
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (!response.didCancel && !response.error) {
        setSelectedImage(response.uri);
      }
    });
  };

  return !user ? (
    <View>
      <Modale></Modale>
    </View>
  ) : affiche ? (
    
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    > 
      <StatusBar backgroundColor="#f1f1f1" barStyle="dark-content" />
      
      <Text style={styles.title}><FontAwesome name="rocket" size={10} color={"rgba(22, 21, 25, 1)"} /> Créer un event <FontAwesome name="circle" size={10} color={"rgba(22, 21, 25, 1)"} /></Text>

      <View style={styles.viewAccess}>
        {optionsAccess.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => handleoptionsAccessSelect(option.id)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View
              style={{
                height: 18,
                width: 18,
                borderRadius: 12,
                borderWidth: 2,
                borderColor:
                  selectedOptionAccess === option.id
                    ? "rgba(22, 21, 25, 1)"
                    : "rgba(22, 21, 25, 1)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {selectedOptionAccess === option.id && (
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: "rgba(22, 21, 25, 1)",
                  }}
                />
              )}
            </View>

            <Text>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.textStyleLine}>
        _________________________________
      </Text>

      <View style={styles.viewType}>
        {optionsType.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => handleoptionsTypeSelect(option.id)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View
              style={{
                height: 18,
                width: 18,
                borderRadius: 12,
                borderWidth: 2,
                borderColor:
                  selectedOptionType === option.id
                    ? "rgba(22, 21, 25, 1)"
                    : "rgba(22, 21, 25, 1)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {selectedOptionType === option.id && (
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: "rgba(22, 21, 25, 1)",
                  }}
                />
              )}
            </View>

            <Text>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.containerInput}>
        <View>
          <TextInput
            placeholder="Name"
            onChangeText={(value) => setName(value)}
            value={name}
            style={styles.input}
          />
        </View>

        <View>
          <TextInput
            placeholder="Adresse"
            onChangeText={(value) => setAdresse(value)}
            value={addresse}
            style={styles.input}
          />
        </View>

        <View style={styles.containerDate}>
          <View >
       

            {Platform.OS === "ios" && (
              <DateTimePicker
                style={styles.datePicker}
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            {Platform.OS === "android" && (
              <DateTimePicker
                style={styles.datePicker}
                value={selectedDate}
                mode="date"
                display="calendar"
                onChange={handleDateChange}
                onDismiss={hideDatePicker}
              />
            )}

            <View style={styles.containerDateTwo}>
              <View style={styles.selectTime}>
                <TouchableOpacity onPress={toggleTimeStartPicker}>
                
                </TouchableOpacity>
              </View>

     
              <DateTimePicker
                style={styles.datePickerStart}
                value={hourStart || new Date()}
                mode="time"
                display="default"
                onChange={handleTimeStartChange}
              />
      

              <View style={styles.selectTime}>
                <TouchableOpacity onPress={toggleTimeEndPicker}>
                  <Text style={styles.hourFin}>
                 
                  </Text>
                </TouchableOpacity>
              </View>

           
              <DateTimePicker
                style={styles.datePickerEnd}
                value={hourEnd || new Date()}
                mode="time"
                display="default"
                onChange={handleTimeEndChange}
              />
            
            </View>
          </View>
        </View>

        <View>
          <TextInput
            placeholder="price"
            onChangeText={(value) => setPrice(value)}
            value={price}
            style={styles.input}
          />
        </View>

        <View style={styles.description}>
          <TextInput
            placeholder="description"
            onChangeText={(value) => setDescription(value)}
            value={description}
          />
        </View>
      </View>

      <View style={styles.viewAjout}>
        <TouchableOpacity style={styles.btnAjout}>
          <View style={styles.plus}>
            <FontAwesome name="plus" size={15} color={"white"} />
          </View>
          <Text>Ajouter des amis</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.btnAjout} onPress={()=>handlePictureImport()}>
          <View style={styles.plus}>
            <FontAwesome name="plus" size={15} color={"white"} />
          </View>
          <Text>Ajouter une photo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.btnPublier}
        onPress={() => handlePublish()}
        disabled={picture?false:true}
      >
        <Text style={styles.textStylePublish}>Publier</Text>
      </TouchableOpacity>
    
    </KeyboardAvoidingView>
    
  ) : (
    <View style={styles.container}>
      <Text>Évènement créé d^_^b</Text>
      <TouchableOpacity
        onPress={() => {handleResetAll();setPicture(null)}}
        style={styles.btnRePublier}
        
      >
        <Text style={styles.textStylePublish}>Publier de nouveau !</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingBottom: 50,
    paddingTop: 50,
    backgroundColor: "rgba(255, 204, 204, 1)",
    alignItems: "center",
    justifyContent: "center", 
  },
  hourFin: {
    marginBottom: 5,
  },

  containerDate: {
    flexDirection: "row",
 
    justifyContent: "space-between",
    marginBottom: 10,
  },


  containerDateTwo: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },

  datePicker: {
    position: "absolute",
    borderRadius: 5,
    borderColor: "rgba(22, 21, 25, 1)",
    borderWidth: 1,
    height: 40,
    width: 100,
    marginLeft: 10,
  },

  datePickerStart: {
    position: "absolute",
    borderRadius: 5,
    borderColor: "rgba(22, 21, 25, 1)",
    borderWidth: 1,
    height: 40,
    marginLeft: 140,
    marginTop: -10,
    width: 70,
  },

  datePickerEnd: {
    position: "absolute",
    borderRadius: 5,
    borderColor: "rgba(22, 21, 25, 1)",
    borderWidth: 1,
    height: 40,
    marginLeft: 240,
    marginTop: -10,
    width: 70,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgba(22, 21, 25, 1)",
  },
  viewAccess: {
    width: "80%",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-around",
  },
  viewType: {
    width: "90%",
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-around",
  },

  input: {
    width: 300,
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "rgba(22, 21, 25, 1)",
    borderRadius: 5,
    backgroundColor: 'white',
  },

  description: {
    height: 70,
    width: 300,
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "rgba(22, 21, 25, 1)",
    backgroundColor: 'white',
  },
  viewAjout: {
    flexDirection: "row",
  },
  btnAjout: {
    margin: 5,
    padding: 5,
    alignItems: "center",
    borderRadius: 8,
  },
  plus: {
    backgroundColor: "rgba(22, 21, 25, 1)",
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
  btnPublier: {
    backgroundColor: "rgba(22, 21, 25, 1)",
    marginBottom: 30,
    height: 40,
    width: 120,
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  btnRePublier: {
    backgroundColor: "rgba(22, 21, 25, 1)",
    marginTop: 10,
    marginBottom: 30,
    height: 40,
    width: 150,
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  textStylePublish: {
    color: "#ffffff",
  },

  textStyleLine: {
    color: "rgba(22, 21, 25, 1)",
  },

  date: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
    margin: 10,
  },
  dateInput: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 16,
  },

  imageBackground: {
    // flex: 1,
    height: 1000,
    width: 400,
    alignItems: "center",
    justifyContent: "center",
    // resizeMode: 'cover', // ou 'stretch' en fonction de votre préférence
  },
});
