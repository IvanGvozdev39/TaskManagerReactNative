import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import TabMenu from '../components/TabMenu';
import TaskList from '../components/TaskList';
import colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getTasks } from '../database/db';
import { useFocusEffect } from '@react-navigation/native';


export default function Index() {
  const [selectedTab, setSelectedTab] = useState<string>('Ongoing');
  const [tasks, setTasks] = useState<any[]>([]);

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor={colors.darkBackground} />
      <TabMenu selectedTab={selectedTab} onTabPress={setSelectedTab} />
      <TaskList tasks={tasks} selectedStatus={selectedTab} reloadTasks={fetchTasks} />
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
    backgroundColor: colors.primaryGreen,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
