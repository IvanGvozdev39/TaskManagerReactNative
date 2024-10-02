import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Dimensions, Modal } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import colors from '../constants/Colors';
import { addTask } from '../database/db'; 
import { useRouter } from 'expo-router';
import strings from '@/constants/Strings';


export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [expirationTime, setExpirationTime] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
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
    if (!title.trim() || !description.trim() || !location.trim()) {
      setModalMessage(strings.allFieldsRequired);
      setModalVisible(true);
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
    
      router.back();
    } catch (error) {
      setModalMessage(strings.failedToAddTask);
      setModalVisible(true);
      console.error('Failed to add task: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={strings.title}
        selectionColor={colors.lightGrey}
        placeholderTextColor={colors.lightGrey}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder={strings.description}
        selectionColor={colors.lightGrey}
        placeholderTextColor={colors.lightGrey}
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={showDatePicker}>
          <Text style={styles.buttonText}>{strings.expirationDate}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={showTimePicker}>
          <Text style={styles.buttonText}>{strings.expirationTime}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rowDateTimeText}>
        <Text style={styles.dateText}>{formatDate(expirationDate)}</Text>
        <Text style={styles.dateText}>{formatTime(expirationTime)}</Text>
      </View>

      <TextInput
        style={styles.input}
        selectionColor={colors.lightGrey}
        placeholder={strings.location}
        placeholderTextColor={colors.lightGrey}
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>{strings.addTask}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType='none'
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const formatTime = (time: Date): string => {
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
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
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.whiteText,
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: colors.darkGrey,
    borderRadius: 10,
    padding: 20,
    width: width - 40,
    alignItems: 'center',
  },
  modalText: {
    color: colors.whiteText,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: colors.lightGrey,
    borderRadius: 10,
    padding: 14,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: colors.whiteText,
    fontSize: 16,
  },
});
