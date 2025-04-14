import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView, Platform, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../Global/Styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

const OfferingCarpool = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [seats, setSeats] = useState('');
  const [fare, setFare] = useState('');
  const [error, setError] = useState('');
  const [isAM, setIsAM] = useState(true); // State to toggle AM/PM

  const handleDateChange = useCallback((text) => {
    let cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length > 4 && cleaned.length <= 6) {
      cleaned = `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
    } else if (cleaned.length > 6) {
      cleaned = `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}-${cleaned.slice(6, 8)}`;
    }
    setDate(cleaned);

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (cleaned && !datePattern.test(cleaned)) {
      setError('Use format: YYYY-MM-DD');
    } else {
      setError('');
    }
  }, []);

  const handleTimeChange = useCallback((text) => {
    let cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length > 2) {
      cleaned = `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
    }
    setTime(cleaned);

    const timePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
    if (cleaned && !timePattern.test(cleaned)) {
      setError('Use format: hh:mm');
    } else {
      setError('');
    }
  }, []);

  const handleSeatsChange = useCallback((text) => {
    setSeats(text);
    setError('');
  }, []);

  const handleFareChange = useCallback((text) => {
    setFare(text);
    setError('');
  }, []);

  // Toggle AM/PM
  const toggleAMPM = () => {
    setIsAM(!isAM);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
      style={styles.container}
    >
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={{ alignItems: 'center', flexGrow: 1, paddingBottom: 20 }}
      >
        {/* Header Button Style Title */}
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>Offer Carpool</Text>
        </View>

        {/* Input Fields */}
        <GlassInput label="From" placeholder="Enter starting point" />
        <GlassInput label="Via" placeholder="Enter preferred route" />
        <GlassInput label="To" placeholder="Enter destination" />
        <GlassInput label="Date" placeholder="YYYY-MM-DD" keyboardType="numeric" value={date} onChangeText={handleDateChange} />
        <GlassInput 
          label="Time" 
          placeholder="hh:mm" 
          keyboardType="numeric" 
          value={time} 
          onChangeText={handleTimeChange} 
          showAmPmToggle
          isAM={isAM} 
          toggleAMPM={toggleAMPM}  // Pass the toggle function to the input field
        />
        <GlassInput label="Seats Available" placeholder="Enter number of seats" keyboardType="numeric" value={seats} onChangeText={handleSeatsChange} />
        <GlassInput label="Total Fare" placeholder="Enter total fare" keyboardType="numeric" value={fare} onChangeText={handleFareChange} />

        {/* Create Carpool Button */}
        <TouchableOpacity
          onPress={() => { alert('Carpool offered successfully!'); }} // Show dialog box on click
          disabled={!date || !time || !seats || !fare}
          style={[styles.button, { backgroundColor: !date || !time || !seats || !fare ? '#ddd' : '#2058c0' }]}
        >
          <Text style={[styles.buttonText, { color: !date || !time || !seats || !fare ? '#aaa' : '#fff' }]}>Create Carpool</Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const GlassInput = ({ label, placeholder, keyboardType = 'default', showAmPmToggle = false, value, onChangeText, isAM, toggleAMPM }) => {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <BlurView intensity={100} tint="light" style={styles.inputBox}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#cce0ff"
          style={styles.inputText}
          keyboardType={keyboardType}
        />
        {showAmPmToggle && (
          <TouchableOpacity style={styles.amPmButton} onPress={toggleAMPM}>
            <Text style={styles.amPmText}>{isAM ? 'AM' : 'PM'}</Text>
          </TouchableOpacity>
        )}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 20,  // Removed paddingTop to raise the header to the top of the screen
  },

  headerBox: {
    backgroundColor: '#2058c0',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 20, // Reduced margin from 30 to 20 for closer alignment
    marginTop: 0, // No margin at the top, keeps header aligned with the top of the screen
  },

  headerText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  inputWrapper: {
    width: SCREEN_WIDTH * 0.9,
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2058c0',
    marginBottom: 8,
  },

  inputBox: {
    backgroundColor: 'rgba(32, 88, 192, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputText: {
    fontSize: 16,
    color: '#003366',
    flex: 1,
  },

  amPmButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#2058c0',
    borderRadius: 15,
    marginLeft: 10,
  },

  amPmText: {
    color: '#fff',
    fontWeight: '600',
  },

  button: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 10, // Adjust to raise the button slightly
    marginBottom: 20, // Add space to avoid bottom bar overlap
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH * 0.9,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
});

export default OfferingCarpool;
