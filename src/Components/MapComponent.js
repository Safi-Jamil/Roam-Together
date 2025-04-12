import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { mapStyle } from '../Global/mapStyle';
import MapView from 'react-native-maps';

export default class MapComponent extends Component {
  render() {
    return (
      <View style={styles.container}> 
        <MapView
          style={styles.map}  
          customMapStyle={mapStyle}
          showsUserLocation
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures MapView takes full space
  },
  map: {
    flex: 1, // MapView should fill the container
    height: '100%',
    width: '100%',
  },
});
