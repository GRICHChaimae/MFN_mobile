import React, { useEffect, useState } from 'react';
import MapboxGL from "@rnmapbox/maps";
import { StyleSheet, View, Dimensions, TouchableOpacity, Image, Text, FlatList } from 'react-native';
import GetLocation from 'react-native-get-location';
import axios from 'axios'

const tokenmapbox = "pk.eyJ1IjoicG90YXRvc3BhdGF0YWp1bmlvciIsImEiOiJjbGYyZGUwa3AwaDdjM3RsY2EzbHhubmk3In0.isRq2dDPJuNxfU-10k2ajQ"
MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(tokenmapbox);

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default function Home() {
  interface companies {
    _id: string,
    completeName: string,
    companyName: string,
    companyAdress: string,
    phoneNumber: number,
    longitude: number,
    latitude: number,
    email: string,
  }
const [coordinate, setCoordinates] = useState([32.309879, -9.232620]);
const [currentCoordinate, setCurrentCoordinates] = useState([32.309879, -9.232620]);
const [zoomLevel, setZoomLevel] = useState(10);
const [companies, setCompanies] = useState<companies[]>([])

const getCompnies = async () => {
  await axios.get("http://192.168.1.10:3000/api/v1/user/allUsers")
        .then((res) => {
          setCompanies(res.data)
          console.log(companies)
        }).catch((err) => console.log(err))
}

const handleZoomIn = () => {
  setZoomLevel(zoomLevel + 1);
};

const handleZoomOut = () => {
  setZoomLevel(zoomLevel - 1);
};

useEffect(() => {
  handleGetCurrentLocation();
  getCompnies()
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
          <View style={styles.locationMarker}/>
        </MapboxGL.PointAnnotation>

        {companies.map((company, index) => (
          <MapboxGL.PointAnnotation
            key={index}
            id={company._id}
            coordinate={[company.longitude, company.latitude]}
          >
            <MapboxGL.Callout>
              <View style={styles.Callout}>
                <Text>Company Name: {company.companyName}</Text>
                <Text>Company Manager: {company.completeName}</Text>
                <Text>Phone Number: {company.phoneNumber}</Text>
                <Text>email : {company.email}</Text>
              </View>
            </MapboxGL.Callout>

          </MapboxGL.PointAnnotation>
        ))}
        
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
  Callout: {
    backgroundColor: 'white',
  },
  comanyList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
},
  company: {
    width: '90%',
    height: 'auto',
    marginHorizontal: '5%',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
},
  page: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
  },
  locationMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
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