import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function ListTransitaires() {
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
const [companies, setCompanies] = useState<companies[]>([])

const getCompnies = async () => {
  await axios.get("http://192.168.1.10:3000/api/v1/user/allUsers")
    .then((res) => {
      setCompanies(res.data)
      console.log(companies)
    }).catch((err) => console.log(err))
}

  useEffect(() => {
    getCompnies()
  }, []);

  const [searchText, setSearchText] = useState('');
  const filterCompanies = companies.filter(company => company.companyName.toLowerCase().includes(searchText.toLocaleLowerCase()));

  return (
    <View style={styles.container}>
      <TextInput
          style={styles.searchBar}
          placeholder="Search"
          onChangeText={text => setSearchText(text)}
          value={searchText}
      />
      <FlatList
          data={filterCompanies}
          renderItem={({ item }) => (
              <TouchableOpacity style={styles.company}>
                  <Text style={styles.companyTiltle}>{item.companyName}</Text>
                  <Text style={styles.title}> <Text style={{ fontWeight: 'bold' }}>Comapany Manager : </Text>{item.completeName}</Text>
                  <Text style={styles.title}> <Text style={{ fontWeight: 'bold' }}>Company Adress: </Text>{item.companyAdress}</Text>
                  <Text style={styles.title}> <Text style={{ fontWeight: 'bold' }}>Phone Number : </Text>{item.phoneNumber}</Text>
                  <Text style={styles.title}> <Text style={{ fontWeight: 'bold' }}>Email: </Text>{item.email}</Text>
              </TouchableOpacity>
          )}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={styles.comanyList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  searchBar: {
      height: 40,
      marginHorizontal: 10,
      marginTop: 10,
      borderRadius: 10,
      paddingHorizontal: 10,
      backgroundColor: '#f2f2f2',
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
  image: {
      width: 150,
      height: 200 * 0.75,
  },
  companyTiltle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    marginTop: 14,
    marginBottom: 10,
  },
  title: {
      fontSize: 14,
      color: 'black',
      margin: 10,
  },
  span: {
    fontWeight: 'bold',
  }
});