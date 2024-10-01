import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import colors from '../constants/Colors';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [expirationDate, setExpirationDate] = useState(new Date());

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: expirationDate,
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setExpirationDate(selectedDate);
        }
      },
      mode: 'date',
      is24Hour: true,
      display: 'calendar',
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        placeholderTextColor={colors.lightGrey}
        value={title}
        onChangeText={setTitle}
        cursorColor={colors.lightGrey}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor={colors.lightGrey}
        value={description}
        onChangeText={setDescription}
        cursorColor={colors.lightGrey}
      />
      
      <TouchableOpacity style={buttonStyle} onPress={showDatePicker}>
        <Text style={buttonTextStyle}>Pick Expiration Date</Text>
      </TouchableOpacity>

      <Text style={styles.dateText}>
        {formatDate(expirationDate)}
      </Text>


      <TextInput
        style={styles.input}
        placeholder="Location"
        placeholderTextColor={colors.lightGrey}
        value={location}
        onChangeText={setLocation}
        cursorColor={colors.lightGrey}
      />
      
      <TouchableOpacity style={styles.addButton} onPress={() => { /* Add Task Action */ }}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
  const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
  return `${year}.${month}.${day}`;
};


const buttonStyle = {
  backgroundColor: colors.primaryGreen,
  borderRadius: 10,
  paddingVertical: 15,
  alignItems: 'center',
  marginBottom: 10,
}

const buttonTextStyle = {
  color: colors.whiteText,
  fontSize: 16,
  fontWeight: 'normal',
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: colors.darkBackground,
  },
  input: {
    backgroundColor: colors.darkGrey,
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    color: colors.whiteText,
    fontSize: 16,
  },
  dateText: {
    color: colors.whiteText,
    marginBottom: 16,
    fontSize: 16,
  },
  addButton: {
    ...buttonStyle,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    justifyContent: 'flex-end',
  },
  addButtonText: {
    ...buttonTextStyle,
    fontWeight: 'bold',
  }
});
