import React, { useEffect, useState } from 'react';
import MapboxGL from "@rnmapbox/maps";
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, Image } from 'react-native';
import GetLocation from 'react-native-get-location';
import Icon from 'react-native-vector-icons/FontAwesome5';

const tokenmapbox = "pk.eyJ1IjoicG90YXRvc3BhdGF0YWp1bmlvciIsImEiOiJjbGYyZGUwa3AwaDdjM3RsY2EzbHhubmk3In0.isRq2dDPJuNxfU-10k2ajQ"
MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(tokenmapbox);

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default function Home() {
const [coordinate, setCoordinates] = useState([32.309879, -9.232620]);
const [currentCoordinate, setCurrentCoordinates] = useState([32.309879, -9.232620]);
const [zoomLevel, setZoomLevel] = useState(10);


const handleZoomIn = () => {
  setZoomLevel(zoomLevel + 1);
};

const handleZoomOut = () => {
  setZoomLevel(zoomLevel - 1);
};

useEffect(() => {
  handleGetCurrentLocation();
}, []);

const handleGetCurrentLocation = () => {
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
  .then(location => {
      setCurrentCoordinates([location.longitude, location.latitude]);
      setCoordinates([location.longitude, location.latitude]);
      setZoomLevel(12);
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })
};

  return (
    <View style={styles.screen}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          zoomLevel={zoomLevel}
          centerCoordinate={coordinate}
      />
        <MapboxGL.PointAnnotation coordinate={currentCoordinate}>
        </MapboxGL.PointAnnotation>
      </MapboxGL.MapView>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleZoomIn}>
            <Image
              style={styles.currentLocationIcon}
              source={require('../assets/images/zoomIn.svg')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleZoomOut}>
          <Image
              style={styles.currentLocationIcon}
              source={require('../assets/images/zoomOut.svg')}
            />
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    width: width,
    height: height,
  },
  page: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'column',
    gap: 10,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    elevation: 5,
  },
  locationMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
  },
  currentLocationButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    position: 'absolute',
    bottom: 130,
    right: 20,
    elevation: 5,
  },
  currentLocationIcon: {
    width: 30,
    height: 30,
  },
  buttonIcon: {
    width: 20,
    height: 20,
  },

});