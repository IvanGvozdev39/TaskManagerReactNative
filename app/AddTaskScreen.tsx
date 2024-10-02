import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Dimensions, Alert } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import colors from '../constants/Colors';
import { addTask } from '../database/db'; // import the updated addTask
import { useRouter } from 'expo-router';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [expirationTime, setExpirationTime] = useState(new Date());

  const router = useRouter();

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
      display: 'spinner',
    });
  };

  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: expirationTime,
      onChange: (event, selectedTime) => {
        if (selectedTime) {
          setExpirationTime(selectedTime);
        }
      },
      mode: 'time',
      is24Hour: true,
      display: 'spinner',
    });
  };

  const handleAddTask = async () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Task Title is required.');
      return;
    }

    const formattedDate = formatDate(expirationDate);
    const formattedTime = formatTime(expirationTime);

    try {
      await addTask({
        title,
        description,
        date: formattedDate,
        time: formattedTime,
        location,
      });

      Alert.alert('Success', 'Task added successfully!');
      router.back(); // Navigate back to the main screen
    } catch (error) {
      Alert.alert('Error', 'Failed to add task. Please try again.');
      console.error('Error adding task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        placeholderTextColor={colors.lightGrey}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor={colors.lightGrey}
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={showDatePicker}>
          <Text style={styles.buttonText}>Expiration Date</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={showTimePicker}>
          <Text style={styles.buttonText}>Expiration Time</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rowDateTimeText}>
        <Text style={styles.dateText}>{formatDate(expirationDate)}</Text>
        <Text style={styles.dateText}>{formatTime(expirationTime)}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Location"
        placeholderTextColor={colors.lightGrey}
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
  const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
  return `${year}.${month}.${day}`;
};

const formatTime = (time: Date): string => {
  const hours = time.getHours().toString().padStart(2, '0'); // Add leading zero if needed
  const minutes = time.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed
  return `${hours}:${minutes}`;
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: colors.darkBackground,
  },
  input: {
    backgroundColor: colors.darkGrey,
    padding: 12,
    marginTop: 16,
    borderRadius: 10,
    color: colors.whiteText,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  rowDateTimeText: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: colors.primaryGreen,
    borderRadius: 10,
    paddingVertical: 16,
    width: (width / 2) - 28,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.whiteText,
    fontSize: 16,
  },
  dateText: {
    color: colors.whiteText,
    marginTop: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: colors.primaryGreen,
    borderRadius: 10,
    paddingVertical: 16,
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.whiteText,
    fontSize: 18,
  },
});
