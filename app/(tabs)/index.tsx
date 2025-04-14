import * as React from 'react';
import 'react-native-get-random-values';
import Geolocation from '@react-native-community/geolocation';
import {OriginContextProvider, DestinationContextProvider} from '../../src/Context/Context'

import RootNavigator from '../../src/Navigations/RootNavigators'; // Ensure the correct path

export default function App() {
  return <DestinationContextProvider>
              <OriginContextProvider> 
                <RootNavigator />
              </OriginContextProvider>
        </DestinationContextProvider>
}
