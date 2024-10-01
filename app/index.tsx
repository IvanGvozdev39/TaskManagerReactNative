import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import TabMenu from '../components/TabMenu';
import TaskList from '../components/TaskList';
import colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons'; // Using Expo Vector Icons
import { useRouter } from 'expo-router'; // Import useRouter


interface Task {
  id: string;
  title: string;
  description: string;
  expirationDate: Date;
  location: string;
  status: string;
}

const placeholderTasks: Task[] = [
  {
    id: '1',
    title: 'Buy Groceries in that one store across the city where i saw those things',
    description: 'Milk, Bread, Eggs, Butter',
    expirationDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    location: 'Supermarket',
    status: 'Ongoing',
  },
  {
    id: '2',
    title: 'Meeting with Team',
    description: 'Discuss project milestones',
    expirationDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    location: 'Office',
    status: 'Completed',
  },
  {
    id: '3',
    title: 'Workout',
    description: 'Gym session',
    expirationDate: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
    location: 'Gym',
    status: 'Cancelled',
  },
];

export default function Index() {
  const [selectedTab, setSelectedTab] = useState<string>('Ongoing');

  const filterTasks = (status: string) => {
    if (status === 'All') return placeholderTasks;
    return placeholderTasks.filter((task) => task.status === status);
  };

  const router = useRouter(); // Initialize useRouter


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.darkBackground} />
      <TabMenu selectedTab={selectedTab} onTabPress={setSelectedTab} />
      <TaskList tasks={filterTasks(selectedTab)} />
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
