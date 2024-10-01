import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/Colors';
import strings from '../constants/Strings';

interface Task {
  title: string;
  description: string;
  expirationDate: Date;
  location: string;
  status: 'Completed' | 'Ongoing' | 'Cancelled';
}

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}.${month}.${day}`;
  };

  const getTimeTillExpiration = (date: Date): string => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const strEnder = `${strings.left}`;

    if (task.status !== strings.statusOngoing) {
      return formatDate(date);
    }

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ${strEnder}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ${strEnder}`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ${strEnder}`;
    return 'Expired';
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Completed':
        return colors.green;
      case 'Ongoing':
        return colors.yellow;
      case 'Cancelled':
        return colors.red;
      default:
        return colors.grey;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.time}>{getTimeTillExpiration(task.expirationDate)}</Text>
      </View>
      <Text style={styles.description}>{task.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.location}>{task.location}</Text>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(task.status) }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.grey,
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    width: 200,
    color: colors.whiteText,
    fontSize: 18,
    fontWeight: '700',
  },
  time: {
    color: colors.whiteText,
    fontSize: 14,
  },
  description: {
    color: colors.whiteText,
    fontSize: 14,
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    width: 240,
    color: colors.whiteText,
    fontSize: 14,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default TaskItem;