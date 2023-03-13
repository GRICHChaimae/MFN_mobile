import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapboxGL from "@rnmapbox/maps";
import axios from 'axios';

const tokenmapbox = "pk.eyJ1IjoicG90YXRvc3BhdGF0YWp1bmlvciIsImEiOiJjbGYyZGUwa3AwaDdjM3RsY2EzbHhubmk3In0.isRq2dDPJuNxfU-10k2ajQ"
MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(tokenmapbox);

const Register = () => {
  const navigation = useNavigation();

  const [completeName, setCompleteName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAdress, setAdress] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    await axios.post("http://192.168.1.10:3000/api/v1/user/register",{
      completeName,
      companyName,
      companyAdress,
      phoneNumber,
      longitude,
      latitude,
      email,
      password,
    }).then(()=>{
      setCompleteName('');
      setCompanyName('');
      setAdress('');
      setPhone('');
      setEmail('');
      setPassword('');
      navigation.navigate('Login');
    }).catch((error)=>{console.log(error)
      console.log("object")
    })
  };

  var longitude: number = 0.0;
  var latitude: number = 0.0;

  const handleMapPress = (event: MapboxGL.GeometryPressEvent) => {
    const coordinates = event.geometry.coordinates;
    console.log(`Latitude: ${coordinates[1]}, Longitude: ${coordinates[0]}`);
    longitude = coordinates[0];
    latitude = coordinates[1];
    console.log(latitude, longitude)
  };

  return (
    <View style={styles.container}>
      <Text>{errorMessage}</Text>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Complete Name"
        onChangeText={(text) => setCompleteName(text)}
        value={completeName}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Company Name"
        onChangeText={(text) => setCompanyName(text)}
        value={companyName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Company Address"
        onChangeText={(text) => setAdress(text)}
        value={companyAdress}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={(text) => setPhone(text)}
        value={phoneNumber}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <MapboxGL.MapView style={{ flex: 1, width: 300, height:90 }} onPress={handleMapPress}>
        <MapboxGL.Camera
          zoomLevel={2}
          centerCoordinate={[longitude, latitude]}
        />
      </MapboxGL.MapView >
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingLeft: 16,
    marginBottom: 10,
  },
  button: {
    width: '80%',
    height: 48,
    backgroundColor: '#4f98ff',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default Register;
