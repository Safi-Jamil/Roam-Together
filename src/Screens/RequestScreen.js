import React, { useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../Global/Styles';
import { Icon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function RequestScreen() {
  const navigation = useNavigation();  // Use useNavigation hook here
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);

  return (
    <View style={styles.container}>

      {/* Top White Section */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>

        {/* From Section with Transit Icon, Text, and Plus Icon */}
        <View style={styles.rowContainer}>
          <Image
            source={require("../../assets/images/transit.png")}
            style={styles.transitIcon}
          />

          <View style={styles.fromContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("DestinationScreen")} style={styles.View6}>
              <Text style={styles.text1}>From ... </Text>
            </TouchableOpacity>
          </View>
          {/* Second From Where container */}
          <View style={styles.fromContainer}>
            <TouchableOpacity style={styles.view7}>
              <Text style={styles.text10}>To ...</Text>
            </TouchableOpacity>
          </View>

          {/* Plus Icon at Right End */}
        </View>
      </View>

      {/* Map View */}
      <MapView
        showsUserLocation
        followsUserLocation
        style={styles.map}
        initialRegion={{
          latitude: fromLocation ? fromLocation.latitude : 33.78825,
          longitude: fromLocation ? fromLocation.longitude : 72.933708,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {fromLocation && <Marker coordinate={fromLocation} title="From" />}
        {toLocation && <Marker coordinate={toLocation} title="To" />}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputContainer: {
    backgroundColor: 'white',
    padding: 16,
    height: SCREEN_HEIGHT * 0.25,
    justifyContent: 'center',
    elevation: 5,
  },

  transitIcon: {
    width: 40,
    height: 100,
    marginRight: 4,
    resizeMode: 'contain',
  },

  rowContainer: {
    flexDirection: 'column',  // Stacked vertically
    alignItems: 'center',     // Center elements horizontally
    marginTop: 40,            // Adjust top margin for spacing
    justifyContent: 'space-around',
  },

  transitIcon: {
    width: 40,
    height: 100,               // Reduced height for better alignment
    marginBottom: -100,         // Reduced bottom margin to bring it closer to "From Where" boxes
    marginRight: 280,
    resizeMode: 'contain',
  },

  fromContainer: {
    width: '75%',             // Make sure the containers are not too wide
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    marginBottom: 10,         // Reduced margin to bring boxes closer
  },

  fromTextBox: {
    width: '80%',            // Take up full width
  },

  fromText: {
    fontSize: 14,
    color: colors.grey2,
    textAlign: 'center',      // Center text inside the box
  },

  plusIcon: {
    paddingBottom: 50,
    marginLeft: 280,
  },

  backButton: {
    position: 'absolute',
    top: 23,
    left: 0,
    zIndex: 10,
    padding: 5,
  },

  map: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },

  requestButton: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 5,
  },

  offerButton: {
    backgroundColor: colors.black,
    padding: 10,
    borderRadius: 5,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
  },
});
