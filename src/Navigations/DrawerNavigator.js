import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeStack } from '../../src/Navigations/StackNavigators';
import { colors } from '../Global/Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: 'Home',
          drawerIcon: ({ focused, size }) => (
            <Icon name="home" color={focused ? '#7cc' : colors.grey2} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
