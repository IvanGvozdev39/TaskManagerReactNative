import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import colors from '../constants/Colors';
import strings from '@/constants/Strings';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, selectedStatus, reloadTasks }: { tasks: any[]; selectedStatus: string; reloadTasks: () => void }) => {
  if (!tasks.length) {
    let noTasksText = selectedStatus === strings.statusOngoing ? strings.noOngoing : strings.noTasksYet;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.noTasksText}>{noTasksText}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: any }) => <TaskItem task={item} reloadTasks={reloadTasks} />;

  return (
    <View style={styles.container}>
      <FlatList data={tasks} renderItem={renderItem} keyExtractor={(item) => item.title} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    backgroundColor: colors.darkBackground,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTasksText: {
    color: colors.lightGrey,
    fontSize: 14,
    bottom: 40,
    textAlign: 'center',
  },
});

export default TaskList;
