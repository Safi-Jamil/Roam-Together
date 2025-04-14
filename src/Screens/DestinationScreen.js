import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { colors } from '../Global/Styles';
import { Icon } from 'react-native-elements';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { OriginContext, DestinationContext } from '../../src/Context/Context';
import * as Location from 'expo-location';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const DestinationScreen = ({ navigation }) => {

  console.log("GOOGLE_MAPS_APIKEY:", GOOGLE_MAPS_APIKEY);

  const {Origin,dispatchOrigin} = useContext(OriginContext)
  const {Destination,dispatchDestination} = useContext(DestinationContext)
  const [location, setLocation] = useState(null);
  const textInput1 = useRef(4);
  const textInput2 = useRef(5);

  const [destination,setDestination] = useState(false)

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    };

    getLocation();
  }, []);

  return (
    <View style={{ backgroundColor: 'white' }}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>

      {/* Google Places Input */}
      <View style={styles.goingto}>

                {/* -------- FROM Field -------- */}
                {destination === false && (
                  <GooglePlacesAutocomplete
                    nearbyPlacesAPI="GooglePlaceSearch"
                    placeholder="From..."
                    listViewDisplayed="auto"
                    debounce={400}
                    currentLocation={true}
                    currentLocationWithinRadius={2000}
                    ref={textInput1}
                    minLength={2}
                    enablePoweredByContainer={false}
                    fetchDetails={true}
                    autoFocus={true}
                    styles={autoComplete}
                    query={{
                      key: GOOGLE_MAPS_APIKEY,
                      language: 'en',
                    }}
                    location={location}
                    onPress={(data, details = null) => {
                      dispatchOrigin({
                        type: "ADD_ORIGIN",
                        payload: {
                          latitude: details.geometry.location.lat,
                          longitude: details.geometry.location.lng,
                          address: details.formatted_address,
                          name: details.name,
                        },
                      });
                      setDestination(true);
                    }}
                  />
                )}

                {/* -------- TO Field -------- */}
                {location && ( destination === true &&
                  <GooglePlacesAutocomplete
                    nearbyPlacesAPI="GooglePlaceSearch"
                    placeholder="Going To..."
                    listViewDisplayed="auto"
                    debounce={400}
                    currentLocation={true}
                    currentLocationWithinRadius={2000}
                    ref={textInput2}
                    minLength={2}
                    enablePoweredByContainer={false}
                    fetchDetails={true}
                    autoFocus={false}
                    styles={autoComplete}
                    query={{
                      key: GOOGLE_MAPS_APIKEY,
                      language: 'en',
                    }}
                    location={location}
                    onPress={(data, details = null) => {
                      dispatchDestination({
                        type: "ADD_Destination",
                        payload: {
                          latitude: details.geometry.location.lat,
                          longitude: details.geometry.location.lng,
                          address: details.formatted_address,
                          name: details.name,
                        },
                      });
                      navigation.goBack();
                    }}
                  />
                )}

                </View>

    </View>
  );
};

export default DestinationScreen;

const styles = StyleSheet.create({
  goingto: {
    marginTop: 37,
  },

  backButton: {
    position: 'absolute',
    top: 23,
    left: 8,  // Visible left position for the back button
    zIndex: 10,
    padding: 5,
  },

  // You can keep the rest of your styles here as needed...
});

const autoComplete = {
  textInput: {
    backgroundColor: colors.grey6,
    height: 50,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    borderWidth: 1,
    marginHorizontal: 15,
  },
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: colors.white,
  },
  textInputContainer: {
    flexDirection: 'row',
  },
};
