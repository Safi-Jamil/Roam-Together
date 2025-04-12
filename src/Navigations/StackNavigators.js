import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import RequestScreen from '../../src/Screens/RequestScreen';
import DestinationScreen from '../../src/Screens/DestinationScreen'

export const HomeStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="RequestScreen" component={RequestScreen} options={{headerShown: false}} />  
      <Stack.Screen name="DestinationScreen" component={DestinationScreen} options={{headerShown: false}} />    
    </Stack.Navigator>
  );
};
