import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
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
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const renderItem = ({ item }: { item: Task }) => <TaskItem task={item} />;
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
  
  noTasksText: {
    color: colors.whiteText,
    fontSize: 14,
    marginVertical: 10,
  },
});

export default TaskList;
