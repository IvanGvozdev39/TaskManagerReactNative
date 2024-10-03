import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import TabMenu from '../components/TabMenu';
import TaskList from '../components/TaskList';
import colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getTasks } from '../database/db';
import { useFocusEffect } from '@react-navigation/native';
import strings from '@/constants/Strings';

export default function Index() {
  const [selectedTab, setSelectedTab] = useState<string>('Ongoing');
  const [tasks, setTasks] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<string>('Date');

  const router = useRouter();

  const fetchTasks = useCallback(async () => {
    const fetchedTasks = await getTasks(selectedTab);
    setTasks(fetchedTasks);
  }, [selectedTab]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [fetchTasks])
  );

  const sortTasks = (tasks: any[]) => {
    if (sortBy === 'Date') {
      return tasks.sort((a, b) => {
        if (a.date === b.date) {
          return a.time.localeCompare(b.time);
        }
        return a.date.localeCompare(b.date);
      });
    } else if (sortBy === 'Status') {
      const statusOrder = ['Ongoing', 'Completed', 'Cancelled'];
      return tasks.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
    }
    return tasks;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor={colors.darkBackground} />
      <TabMenu selectedTab={selectedTab} onTabPress={setSelectedTab} />
      <View style={styles.filterContainer}>
      <Text style={styles.filterLabel}>{strings.filterBy}</Text>
        <Picker
          selectedValue={sortBy}
          style={styles.picker}
          onValueChange={(itemValue) => setSortBy(itemValue)}
        >
          <Picker.Item label={strings.date} value={strings.date} />
          <Picker.Item label={strings.status} value={strings.status} />
        </Picker>
      </View>

      <TaskList tasks={sortTasks(tasks)} selectedStatus={selectedTab} reloadTasks={fetchTasks} />

      <TouchableOpacity style={styles.fab} onPress={() => router.push('/AddTaskScreen')}>
        <AntDesign name='plus' size={24} color={colors.whiteText} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: colors.darkBackground,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.green,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  filterContainer: {
    left: 30,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  filterLabel: {
    color: colors.whiteText,
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    width: 130,
    color: colors.whiteText,
  },
});
