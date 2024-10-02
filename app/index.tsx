import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import TabMenu from '../components/TabMenu';
import TaskList from '../components/TaskList';
import colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SQLite from 'react-native-sqlite-storage';

export default function Index() {
  const [selectedTab, setSelectedTab] = useState<string>('Ongoing');
  const [tasks, setTasks] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    const initializeAndFetch = async () => {
      const database = await initializeDB(); // Wait for the database to initialize
      if (database) {
        fetchTasks(); // Only fetch tasks if database is successfully initialized
      }
    };
  
    initializeAndFetch();
  }, [selectedTab]);
  

  const fetchTasks = () => {
    getTasks(selectedTab, (fetchedTasks) => {
      setTasks(fetchedTasks);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.darkBackground} />
      <TabMenu selectedTab={selectedTab} onTabPress={setSelectedTab} />
      <TaskList tasks={tasks} selectedStatus={selectedTab} />
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/AddTaskScreen')}>
        <AntDesign name="plus" size={24} color={colors.whiteText} />
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
    backgroundColor: colors.primaryGreen,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
