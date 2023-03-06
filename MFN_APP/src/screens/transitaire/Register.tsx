import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, } from 'react-native';

export default function Register() {

  const [completeName, setCompleteName] = useState('');
  const [entrepriseName, setEntrepriseName] = useState('');
  const [adress, setAdress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const regissterTransitaire = async () => {
  }

  return (
    <View style={styles.container}>
      <Text>{errorMessage}</Text>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>MFN</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Complete Name"
          onChangeText={(text) => setCompleteName(text)}
          value={completeName}
        />
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          onChangeText={(text) => setEntrepriseName(text)}
          value={entrepriseName}
        />
        <TextInput
          style={styles.input}
          placeholder="Company Address"
          onChangeText={(text) => setAdress(text)}
          value={adress}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={(text) => setPhone(text)}
          value={phone}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={()=>regissterTransitaire()}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 20,
    padding: 10,
    color: '#000',
    borderRadius: 5,
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});