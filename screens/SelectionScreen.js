//import externe
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//store
import { useDispatch } from "react-redux";
import { storeResearch } from "../reducers/list";

//import interne
import fetchData from "../services/fetchData";

//constante globale
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


export default function SelectionScreen({ navigation }) {
  
  const dispatch = useDispatch();
  
  fetchData(); //appel de la data

  return (
    <SafeAreaView contentContainerStyle={styles.container}>
       <StatusBar
        barStyle="dark-content" 
        backgroundColor="white" 
      />
      <ScrollView contentContainerStyle={styles.container}>

        
        <TouchableOpacity
          style={[styles.block, { backgroundColor: "rgba(255, 141, 141, 1)" }]}
          activeOpacity={0.8}
          onPress={() => {
            dispatch(storeResearch("art"));
            navigation.navigate("TabNavigator", { screen: "TabNavigator" });
          }}
        >
          <ImageBackground
            source={require("../assets/sebastian-svenson-d2w-_1LJioQ-unsplash.jpg")}
            style={[
              styles.imageContainer,
              { width: windowWidth * 0.9, height: windowWidth * 0.9 * (3 / 4) },
            ]}
            resizeMode="cover"
            borderRadius={20}
          >
            <Text style={styles.title}>Art</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.block, { backgroundColor: "rgba(89, 215, 207, 1)" }]}
          activeOpacity={0.8}
          onPress={() => {
            dispatch(storeResearch("music"));
            navigation.navigate("TabNavigator", { screen: "TabNavigator" });
          }}
        >
          <ImageBackground
            source={require("../assets/marcela-laskoski-YrtFlrLo2DQ-unsplash.jpg")}
            style={[
              styles.imageContainer,
              { width: windowWidth * 0.9, height: windowWidth * 0.9 * (3 / 4) },
            ]}
            resizeMode="cover"
            borderRadius={20}
          >
            <Text style={styles.title}>Music</Text>
          </ImageBackground>
        </TouchableOpacity>

   
        <TouchableOpacity
          style={[styles.block, { backgroundColor: "rgba(243, 200, 243, 1)" }]}
          activeOpacity={0.8}
          onPress={() => {
            dispatch(storeResearch("food"));
            navigation.navigate("TabNavigator", { screen: "TabNavigator" });
          }}
        >
          <ImageBackground
            source={require("../assets/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg")}
            style={[
              styles.imageContainer,
              { width: windowWidth * 0.9, height: windowWidth * 0.9 * (3 / 4) },
            ]}
            resizeMode="cover"
            borderRadius={20}
          >
            <Text style={styles.title}>Food</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.block, { backgroundColor: "rgba(133, 244, 150, 1)" }]}
          activeOpacity={0.8}
          onPress={() => {
            dispatch(storeResearch("nature"));
            navigation.navigate("TabNavigator", { screen: "TabNavigator" });
          }}
        >
          <ImageBackground
            source={require("../assets/tim-swaan-eOpewngf68w-unsplash.jpg")}
            style={[
              styles.imageContainer,
              { width: windowWidth * 0.9, height: windowWidth * 0.9 * (3 / 4) },
            ]}
            resizeMode="cover"
            borderRadius={20}
          >
            <Text style={styles.title}>Nature</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.block, { backgroundColor: "rgba(140, 178, 255, 1)" }]}
          activeOpacity={0.8}
          onPress={() => {
            dispatch(storeResearch("sport"));
            navigation.navigate("TabNavigator", { screen: "TabNavigator" });
          }}
        >
          <ImageBackground
            source={require("../assets/milad-fakurian-58Z17lnVS4U-unsplash.jpg")}
            style={[
              styles.imageContainer,
              { width: windowWidth * 0.9, height: windowWidth * 0.9 * (3 / 4) },
            ]}
            resizeMode="cover"
            borderRadius={20}
          >
            <Text style={styles.title}>Science</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.block, { backgroundColor: "rgba(250, 189, 132, 1)" }]}
          activeOpacity={0.8}
          onPress={() => {
            dispatch(storeResearch("sport"));
            navigation.navigate("TabNavigator", { screen: "TabNavigator" });
          }}
        >
          <ImageBackground
            source={require("../assets/august-phlieger-CREqtqgBFcU-unsplash.jpg")}
            style={[
              styles.imageContainer,
              { width: windowWidth * 0.9, height: windowWidth * 0.9 * (3 / 4) },
            ]}
            resizeMode="cover"
            borderRadius={20}
          >
            <Text style={styles.title}>Sport</Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Ajout de flexGrow pour permettre le scrolling
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#161519",
  },
  block: {
    width: windowWidth / 1.1,
    height: windowHeight / 5,
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: 10,
    borderRadius: 20,
  },
});
