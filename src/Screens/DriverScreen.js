import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { colors, parameters } from '../Global/Styles';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const DriverScreen = () => {
  const navigation = useNavigation();
  const [latlng, setLatLng] = useState(null);
  const _map = useRef(null);

  const checkPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  };

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;

      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      setLatLng({ latitude, longitude });
    } catch (err) {
      console.error('Error fetching location:', err);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const permissionGranted = await checkPermission();
      if (permissionGranted) {
        await getLocation();
      }
    };
    fetchLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon1}>
          <Icon name="menu" color={colors.white} size={40} />
        </View>
      </View>

      <ScrollView bounces={false}>
        <View style={styles.home}>
          <Text style={styles.text1}>Offer carpool and share your expense</Text>

          <View style={styles.view1}>
            <View style={styles.view8}>
              <Text style={styles.text2}>Join people along the route</Text>
              <TouchableOpacity onPress={() => navigation.navigate("OfferingCarpool")}>
                <View style={styles.button1}>
                  <Text style={styles.button1Text}>Offer Carpool</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Image style={styles.image1} source={require('../../assets/images/Car.png')} />
            </View>
          </View>
          </View>

          {/* Carpool History Section */}
          <View style={styles.historySection}>
            <Text style={styles.historyTitle}>Carpool History</Text>
            <View style={styles.historyItem}>
              <Text style={styles.historyText}>Carpool 1 - Location A to Location B</Text>
            </View>
            <View style={styles.historyItem}>
              <Text style={styles.historyText}>Carpool 2 - Location C to Location D</Text>
            </View>
            <View style={styles.historyItem}>
              <Text style={styles.historyText}>Carpool 2 - Location E to Location F</Text>
            </View>
            <View style={styles.historyItem}>
              <Text style={styles.historyText}>Carpool 2 - Location G to Location H</Text>
            </View>
            {/* Add more history items here as required */}
          </View>

     

        <StatusBar barStyle="light-content" backgroundColor="#2058c0" />
      </ScrollView>
    </View>
  );
};

export default DriverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 30,
    paddingTop: parameters.statusBarHeight,
  },
  header: {
    backgroundColor: colors.blue,
    height: parameters.headerHeight,
    alignItems: 'flex-start',
  },
  image1: {
    height: 100,
    width: 100,
  },
  home: {
    paddingLeft: 20,
    backgroundColor: colors.blue,  // Blue background is kept for the main section
  },
  text1: {
    color: colors.white,
    fontSize: 21,
    fontFamily: 'Times New Roman',
    paddingBottom: 20,
    paddingTop: 20,
  },
  text2: {
    color: colors.white,
    fontFamily: 'Times New Roman',
    fontSize: 16,
  },
  view1: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 30,
  },
  button1: {
    height: 40,
    width: 150,
    backgroundColor: colors.black,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button1Text: {
    color: colors.white,
    fontSize: 17,
    marginTop: -2,
  },
  icon1: {
    marginLeft: 10,
    marginTop: 5,
  },
  view8: {
    flex: 4,
    marginTop: -25,
  },
  historySection: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'transparent',  // Transparent background for the history section
  },
  historyTitle: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  historyText: {
    fontSize: 16,
    color: '#333',
  },
});
