import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import ListTransitaires from '../screens/ListTransitaires';
import Login from '../screens/transitaire/Login';
import Register from '../screens/transitaire/Register';

interface TabBarButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const TabBarButton: React.FC<TabBarButtonProps> = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabButton}>
      <Text style={[styles.tabLabel]}>{label}</Text>
    </TouchableOpacity>
  );
};

const Tab = createBottomTabNavigator();

const BottomBar = () => {
  const [selectedTab, setSelectedTab] = useState('Home');

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarStyle: [
              { display: 'flex' },
              null
            ],
            tabBarButton: (props) => (
              <TabBarButton
                label={route.name}
                selected={selectedTab === route.name}
                onPress={() => setSelectedTab(route.name)}
                {...props}
              />
            ),
          })}
      >
        <Tab.Screen options={{headerShown: false}} name="Home" component={Home} />
        <Tab.Screen options={{headerShown: false, tabBarIcon: () => null}} name="Transitaires" component={ListTransitaires} />
        <Tab.Screen options={{headerShown: false, tabBarIcon: () => null}} name="Register" component={Register} />
        <Tab.Screen options={{headerShown: false}}  name="Login" component={Login} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    tabBar: {
      borderTopWidth: 1,
      borderTopColor: '#ddd',
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabLabel: {
      color: '#333',
      fontSize: 16,
    },
    screen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default BottomBar;
