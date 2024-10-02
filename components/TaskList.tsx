import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import TaskItem from './TaskItem';
import colors from '../constants/Colors';
import strings from '../constants/Strings';

interface Task {
  id: string;
  title: string;
  description: string;
  expirationDate: Date;
  location: string;
  status: 'Completed' | 'Ongoing' | 'Cancelled';
}

interface TaskListProps {
  tasks: Task[];
  selectedStatus: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, selectedStatus }) => {
  const renderItem = ({ item }: { item: Task }) => <TaskItem task={item} />;

  if (tasks.length === 0) {
    return (
      <View style={styles.noTasksContainer}>
        <Text style={styles.noTasksText}>
          {selectedStatus === 'Ongoing' ? strings.noOngoing : strings.noTasksYet} 
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 16,
    paddingBottom: 100, // To ensure FAB doesn't cover items
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 50,
  },
  noTasksText: {
    color: colors.whiteText,
    fontSize: 16,
    marginVertical: 10,
  },
});

export default TaskList;
