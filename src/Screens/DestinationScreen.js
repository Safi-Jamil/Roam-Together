import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useRef} from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { colors } from '../Global/Styles';
import { Icon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const DestinationScreen = () => {
  const textInput1 = useRef(4);
  const textInput2 = useRef(5);

  return (
      <View style={styles.container}>
      
            {/* Top White Section */}
            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={30} color="#000" />
              </TouchableOpacity>    
      
      <View style={styles.fromContainer}>
        <TouchableOpacity style={styles.View6}>
          <Text style={styles.text1}>From ... </Text>
        </TouchableOpacity>
        <GooglePlacesAutocomplete 
          nearbyPlacesAPI='GooglePlaceSearch'
          placeholder = "Going To..."
          listViewDisplayed= "auto"
          debounce={400}
          currentLocation = {true}
          ref = {textInput1}
          minLength={2}
          enablePoweredByContainer = {false}
          fetchDetails = {false}
          autoFocus = {true}
          styles={autoComplete}
          query= {{
            key: GOOGLE_MAPS_APIKEY,
            language: "en"
          }}
          />
        </View>
        {/* Second From Where container */}
       <View style = {styles.fromContainer}  >
         <TouchableOpacity style={styles.view7}>
          <Text style={styles.text10}>To ...</Text>
        </TouchableOpacity>
        </View>
    </View>
    </View>

  )
}

export default DestinationScreen

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            
        },
        
        view1:{
          position:"absolute",
          top:25,
          left:12,
          backgroundColor:colors.white,
          height:40,
          width:40,
          borderRadius:20,
          justifyContent:"center",
          alignItems:"center",
          marginTop:2, 
          zIndex: 10
          
        },
        
        view3:{
          flexDirection:"row",
          alignItems:"center",
          marginTop:2,   
          marginBottom:10,
          backgroundColor: colors.white,
          height:30,
          zIndex: 10
        },
        
        view2:{backgroundColor:colors.white,
              zIndex:4,
              paddingBottom:10,
              
            },
        
            container: {
                flex: 1,
              },
            
              inputContainer: {
                backgroundColor: 'white',
                padding: 16,
                height: SCREEN_HEIGHT * 0.25,
                justifyContent: 'center',
                elevation: 5,
              },
            
              transitIcon: {
                width: 40,
                height: 100,
                marginRight: 4,
                resizeMode: 'contain',
              },
            
              rowContainer: {
                flexDirection: 'column',  // Stacked vertically
                alignItems: 'center',     // Center elements horizontally
                marginTop: 40,            // Adjust top margin for spacing
                justifyContent: 'space-around',
              },
            
              transitIcon: {
                width: 40,
                height: 100,               // Reduced height for better alignment
                marginBottom: -100,         // Reduced bottom margin to bring it closer to "From Where" boxes
                marginRight: 280,
                resizeMode: 'contain',
              },
            
              fromContainer: {
                width: '75%',             // Make sure the containers are not too wide
                backgroundColor: '#f0f0f0',
                padding: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#ccc',
                justifyContent: 'center',
                marginBottom: 10,         // Reduced margin to bring boxes closer
              },
            
              fromTextBox: {
                width: '80%',            // Take up full width
              },
            
              fromText: {
                fontSize: 14,
                color: colors.grey2,
                textAlign: 'center',      // Center text inside the box
              },
            
              plusIcon: {
                paddingBottom: 50,
                marginLeft: 280,
              },
            
              backButton: {
                position: 'absolute',
                top: 23,
                left: 0,
                zIndex: 10,
                padding: 5,
              },
            
              map: {
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT * 0.7,
              },
            
              buttonContainer: {
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 20,
              },
            
              requestButton: {
                backgroundColor: colors.blue,
                padding: 10,
                borderRadius: 5,
              },
            
              offerButton: {
                backgroundColor: colors.black,
                padding: 10,
                borderRadius: 5,
              },
            
              label: {
                fontSize: 16,
                fontWeight: 'bold',
                marginVertical: 8,
              },
            
              buttonText: {
                color: colors.white,
                fontSize: 16,
              },
              
            backButton: {
                position: 'absolute',
                top: 23,
                left: -150,
                zIndex: 10,
                padding: 5,
              },
              
            view24:{
              flexDirection:"row",
              justifyContent:"space-between",
             marginVertical:15,
              paddingHorizontal:20   
          }, 
          
          view25:{
              flexDirection:'row',
             alignItems:"baseline"
          },
          
          flatlist:{
              marginTop:20,
              zIndex:17,
              elevation:8
          },    
        
        });
        
        
        const autoComplete = {
        
            textInput:{
                backgroundColor: colors.grey6,
                height: 50,
                borderRadius: 5,
                paddingVertical: 5,
                paddingHorizontal: 10,
                fontSize: 15,
                flex: 1,
                borderWidth:1,
                marginHorizontal:15,
            },
            container: {
               paddingTop:20,
              flex: 1,
              backgroundColor:colors.white
                  },
          
                  inputContainer: {
                    backgroundColor: 'white',
                    padding: 16,
                    height: SCREEN_HEIGHT * 0.25,
                    justifyContent: 'center',
                    elevation: 5,
                  },

            textInputContainer: {
              flexDirection: 'row',
            },
      
      }
      
/* module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'], // <-- wrap this in quotes
      plugins: [
        [
          'module:react-native-dotenv',
          {
            moduleName: '@env',
            path: '.env',
          },
        ],
        'react-native-reanimated/plugin',
      ],
    };
  };
  */