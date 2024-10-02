import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from '@/constants/Strings';
import { Task } from '@/models/Task';

const TASKS_KEY = '@tasks';

const getNextId = async (): Promise<number> => {
  const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
  const tasks = storedTasks ? JSON.parse(storedTasks) : [];
  return tasks.length ? Math.max(...tasks.map((task: Task) => task.id)) + 1 : 1;
};

export const getTasks = async (status: string): Promise<Task[]> => {
  try {
    const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    if (status === strings.tabs[2])
      return tasks;
    return tasks.filter((task: Task) => task.status === status);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const addTask = async (task: { title: string; description: string; date: string; time: string; location: string; status?: string }) => {
  try {
    const taskId = await getNextId();
    const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    
    const newTask: Task = {
      id: taskId,
      title: task.title,
      description: task.description,
      date: task.date,
      time: task.time,
      location: task.location,
      status: 'Ongoing',
    };

    tasks.push(newTask);
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    console.log('Task added successfully');
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    
    const updatedTasks = tasks.filter((task: Task) => task.id !== taskId);
    
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
    console.log('Task deleted successfully');
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

export const updateTaskStatus = async (taskId: number, newStatus: string) => {
  try {
    const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];

    const taskIndex = tasks.findIndex((task: Task) => task.id === taskId);
    
    if (taskIndex === -1) {
      console.error('Task not found');
      return;
    }
    tasks[taskIndex].status = newStatus;

    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    console.log('Task status updated successfully');
  } catch (error) {
    console.error('Error updating task status:', error);
  }
};
