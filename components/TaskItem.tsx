import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../constants/Colors';
import strings from '../constants/Strings';
import { Task } from '@/models/Task';
import { deleteTask, updateTaskStatus } from '../database/db';
import TaskDialog from './TaskDialog';
import ConfirmationDialog from '../components/ConfirmationDialog';

interface TaskItemProps {
  task: Task;
  reloadTasks: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, reloadTasks }) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const getTimeTillExpiration = (dateString: string, timeString: string): string => {
    if (task.status !== strings.statusOngoing) return `${dateString}\n${timeString}`;
    
    const [year, month, day] = dateString.split('.').map(Number);
    const [hours, minutes] = timeString.split(':').map(Number);
    
    const expirationDate = new Date(year, month - 1, day, hours, minutes);
    const now = new Date();
    const diff = expirationDate.getTime() - now.getTime();

    const minutesDiff = Math.floor(diff / (1000 * 60));
    const hoursDiff = Math.floor(minutesDiff / 60);
    const daysDiff = Math.floor(hoursDiff / 24);

    const strEnder = `${strings.left}`;

    if (daysDiff > 0) return `${daysDiff} day${daysDiff > 1 ? 's' : ''} ${strEnder}`;
    if (hoursDiff > 0) return `${hoursDiff} hour${hoursDiff > 1 ? 's' : ''} ${strEnder}`;
    if (minutesDiff > 0) return `${minutesDiff} minute${minutesDiff > 1 ? 's' : ''} ${strEnder}`;
    
    return strings.expired;
  };

  const [timeTillExpiration, setTimeTillExpiration] = useState<string>(getTimeTillExpiration(task.date, task.time));


  useEffect(() => {
    const interval = setInterval(() => {
      setTimeTillExpiration(getTimeTillExpiration(task.date, task.time));
    }, 20000); //recalculates the remaining time every 20 seconds 

    return () => clearInterval(interval);
  }, [task.date, task.time]);

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

  const handleStatusChange = async (newStatus: string) => {
    await updateTaskStatus(task.id, newStatus);
    reloadTasks();
  };

  const handleDelete = () => {
    setDialogVisible(false);
    setConfirmationVisible(true);
  };

  const confirmDelete = async () => {
    await deleteTask(task.id);
    setConfirmationVisible(false);
    reloadTasks();
  };

  return (
    <TouchableOpacity onPress={() => setDialogVisible(true)}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.time}>{timeTillExpiration}</Text>
        </View>
        <Text style={styles.description}>{task.description}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.location}>{task.location}</Text>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(task.status) }]} />
        </View>
      </View>

      <TaskDialog
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        onChangeStatus={handleStatusChange}
        onDelete={handleDelete}
      />

      <ConfirmationDialog
        visible={confirmationVisible}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmationVisible(false)}
        message={`Are you sure you want to delete '${task.title}'?`}
      />
    </TouchableOpacity>
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
    color: colors.whiteText,
    marginEnd: 10,
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  time: {
    color: colors.whiteText,
    fontSize: 14,
    textAlign: 'right',
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
